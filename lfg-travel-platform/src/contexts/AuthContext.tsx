'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'
import { Profile } from '@/shared/types'

// Extended signup data that includes fields not in Profile
interface SignUpData {
  full_name?: string
  username?: string
  bio?: string
  avatar_url?: string
  location?: string
  travel_style?: string[]
  languages?: string[]
  website?: string
}

// This defines what information our authentication system will track
interface AuthContextType {
  user: User | null              // The user from Supabase (contains email, id, etc.)
  profile: Profile | null        // The user's profile from our database
  session: Session | null        // The authentication session
  loading: boolean              // Whether we're still checking if user is logged in
  signUp: (email: string, password: string, userData?: SignUpData) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (profileData: Partial<Profile>) => Promise<void>
}

// Create the context (think of this as a shared storage space for auth info)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// This is what wraps your entire app to provide authentication everywhere
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // These are like variables that remember the user's login status
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  // If Supabase is not configured, just set loading to false and continue
  if (!supabase) {
    if (loading) {
      setLoading(false)
    }
    const value = {
      user: null,
      profile: null,
      session: null,
      loading: false,
      signUp: async () => { throw new Error('Supabase not configured') },
      signIn: async () => { throw new Error('Supabase not configured') },
      signOut: async () => { throw new Error('Supabase not configured') },
      updateProfile: async () => { throw new Error('Supabase not configured') },
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  // Function to get user's profile from the database
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data as Profile
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Function to create a new user account
  const signUp = async (email: string, password: string, userData?: SignUpData) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) throw error

      // If signup successful, create profile in database
      if (data.user && !error) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: userData?.full_name || '',
            username: userData?.username || '',
            bio: userData?.bio || '',
            avatar_url: userData?.avatar_url || '',
            location: userData?.location || '',
            travel_preferences: userData ? {
              travel_style: userData.travel_style || [],
              languages: userData.languages || [],
              website: userData.website || ''
            } : null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        
        if (profileError) {
          console.error('Error creating profile:', profileError)
          throw profileError
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Function to log in existing user
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } finally {
      setLoading(false)
    }
  }

  // Function to log out user
  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear user data
      setUser(null)
      setProfile(null)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  // Function to update user profile
  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) throw new Error('No authenticated user')

    const { error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (error) throw error

    // Update local profile state
    setProfile(prev => prev ? { ...prev, ...profileData } : null)
  }

  // This runs when the component first loads and sets up auth listening
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile)
      }
      
      setLoading(false)
    })

    // Listen for changes in authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const profile = await fetchProfile(session.user.id)
          setProfile(profile)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    // Cleanup function
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // This is what gets shared with the rest of your app
  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use authentication anywhere in your app
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}