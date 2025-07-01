import { createClient } from './supabase'
import { createClient as createServerClient } from './supabase-server'
import { User } from '@supabase/supabase-js'
import { Profile } from '@/shared/types'

export interface AuthUser extends User {
  profile?: Profile
}

// Client-side auth functions
export const auth = {
  async signUp(email: string, password: string, userData?: Partial<Profile>) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    if (error) throw error

    // Create profile if user was created
    if (data.user && !error) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: userData?.full_name,
          username: userData?.username,
        })
      
      if (profileError) {
        console.error('Error creating profile:', profileError)
      }
    }

    return { data, error }
  },

  async signIn(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { data, error }
  },

  async signOut() {
    const supabase = createClient()
    return await supabase.auth.signOut()
  },

  async resetPassword(email: string) {
    const supabase = createClient()
    
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
  },

  async updatePassword(password: string) {
    const supabase = createClient()
    
    return await supabase.auth.updateUser({
      password,
    })
  },

  async getUser() {
    const supabase = createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return { user: null, profile: null, error }
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      user,
      profile: profile || null,
      error: profileError,
    }
  },

  async updateProfile(profileData: Partial<Profile>) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    return { data, error }
  },
}

// Server-side auth functions
export const serverAuth = {
  async getUser() {
    const supabase = await createServerClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return { user: null, profile: null, error }
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      user,
      profile: profile || null,
      error: profileError,
    }
  },

  async requireAuth() {
    const { user, profile, error } = await this.getUser()
    
    if (!user) {
      throw new Error('Authentication required')
    }

    return { user, profile, error }
  },
}

// Auth state management hook (for client components)
export const useAuth = () => {
  // This will be implemented with Zustand store later
  // For now, return basic structure
  return {
    user: null as AuthUser | null,
    loading: false,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    updateProfile: auth.updateProfile,
  }
}