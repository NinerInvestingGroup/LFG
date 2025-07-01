import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/shared/types/database'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured')
    // Return a mock client for development when Supabase is not configured
    return null as any
  }

  try {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null as any
  }
}

// For use in client components
export const supabase = createClient()