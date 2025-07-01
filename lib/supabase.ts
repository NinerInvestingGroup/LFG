import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return null if environment variables are not set (during build or development)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// For use in client components
export const supabase = createClient()