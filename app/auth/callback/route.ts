import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle error case
  if (error) {
    console.error('Email confirmation error:', error, errorDescription)
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(errorDescription || 'Email confirmation failed')}`, requestUrl.origin)
    )
  }

  if (code) {
    try {
      const cookieStore = await cookies()
      
      // Create Supabase client for server-side
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options })
            },
            remove(name: string, options: any) {
              cookieStore.set({ name, value: '', ...options })
            },
          },
        }
      )
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent('Email confirmation failed. Please try again.')}`, requestUrl.origin)
        )
      }

      if (data.user) {
        // Email confirmed successfully - redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard?confirmed=true', requestUrl.origin))
      }
    } catch (error) {
      console.error('Callback processing error:', error)
      return NextResponse.redirect(
        new URL(`/auth/login?error=${encodeURIComponent('An error occurred during email confirmation.')}`, requestUrl.origin)
      )
    }
  }

  // If no code or error, redirect to login
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
}