import { supabase } from './supabase'
import type { AuthError } from '@supabase/supabase-js'

export interface SignupData {
  email: string
  password: string
  fullName: string
  travelStyle?: string
}

export interface AuthResponse {
  success: boolean
  error?: string
  data?: any
}

export async function signUp(userData: SignupData): Promise<AuthResponse> {
  try {
    if (!supabase) {
      return {
        success: false,
        error: 'Authentication service is not available. Please contact support.'
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: userData.fullName,
          travel_style: userData.travelStyle,
        }
      }
    })

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error)
      }
    }

    return {
      success: true,
      data: data
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    if (!supabase) {
      return {
        success: false,
        error: 'Authentication service is not available. Please contact support.'
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error)
      }
    }

    return {
      success: true,
      data: data
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function signOut(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error)
      }
    }

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during sign out.'
    }
  }
}

export async function resetPassword(email: string): Promise<AuthResponse> {
  try {
    if (!supabase) {
      return {
        success: false,
        error: 'Authentication service is not available. Please contact support.'
      }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error)
      }
    }

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function resendVerificationEmail(email: string): Promise<AuthResponse> {
  try {
    if (!supabase) {
      return {
        success: false,
        error: 'Authentication service is not available. Please contact support.'
      }
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error)
      }
    }

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return null
    }
    
    return user
  } catch (error) {
    return null
  }
}

function getAuthErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password. Please check your credentials and try again.'
    case 'Email not confirmed':
      return 'Please check your email and click the confirmation link before signing in.'
    case 'User already registered':
      return 'An account with this email already exists. Please sign in instead.'
    case 'Password should be at least 6 characters':
      return 'Password must be at least 6 characters long.'
    case 'Invalid email':
      return 'Please enter a valid email address.'
    case 'Signup is disabled':
      return 'Account registration is currently disabled. Please contact support.'
    case 'Email rate limit exceeded':
      return 'Too many emails sent. Please wait a few minutes before trying again.'
    default:
      // Return a generic message for unknown errors, but log the specific error
      console.error('Auth error:', error.message)
      return error.message || 'An authentication error occurred. Please try again.'
  }
}