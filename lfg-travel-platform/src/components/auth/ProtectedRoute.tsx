'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string          // Where to redirect if not logged in
  requireEmailVerification?: boolean  // Whether email must be verified
}

// This component protects pages that require authentication
export function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  requireEmailVerification = false 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Don't do anything while still loading
    if (loading) return

    // If no user is logged in, redirect to login page
    if (!user) {
      router.push(redirectTo)
      return
    }

    // If email verification is required but user hasn't verified email
    if (requireEmailVerification && !user.email_confirmed_at) {
      router.push('/verify-email')
      return
    }
  }, [user, loading, router, redirectTo, requireEmailVerification])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If no user, don't render anything (redirect will happen)
  if (!user) {
    return null
  }

  // If email verification is required but not verified
  if (requireEmailVerification && !user.email_confirmed_at) {
    return null
  }

  // User is authenticated, render the protected content
  return <>{children}</>
}
