'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail, CheckCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

interface EmailVerificationFormProps {
  email?: string
}

export function EmailVerificationForm({ email: initialEmail }: EmailVerificationFormProps) {
  const [email, setEmail] = useState(initialEmail || '')
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Check if this is a verification callback
  useEffect(() => {
    const checkVerification = async () => {
      try {
        // Check if user is already verified
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user?.email_confirmed_at) {
          setIsVerified(true)
          setEmail(user.email || '')
        } else if (user?.email) {
          setEmail(user.email)
        }

        // Handle email verification from URL
        const token = searchParams.get('token')
        const type = searchParams.get('type')
        
        if (token && type === 'email') {
          setIsLoading(true)
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email'
          })
          
          if (error) {
            setError('Verification failed. The link may be expired or invalid.')
          } else {
            setIsVerified(true)
            setSuccessMessage('Email verified successfully!')
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          }
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Verification check error:', err)
        setError('An error occurred while checking verification status.')
        setIsLoading(false)
      }
    }

    checkVerification()
  }, [searchParams, supabase.auth, router])

  const handleResendEmail = async () => {
    if (!email) {
      setError('No email address found. Please sign up again.')
      return
    }

    setIsResending(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccessMessage('Verification email resent! Please check your inbox.')
      }
    } catch {
      setError('Failed to resend email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const handleCheckVerification = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Refresh the session to get latest user data
      const { data: { session }, error } = await supabase.auth.refreshSession()
      
      if (error) {
        setError('Failed to check verification status.')
      } else if (session?.user?.email_confirmed_at) {
        setIsVerified(true)
        setSuccessMessage('Email verified successfully!')
      } else {
        setError('Email not yet verified. Please check your email and click the verification link.')
      }
    } catch {
      setError('An error occurred while checking verification status.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !isResending) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-neutral-900">Verifying your email...</p>
          <p className="text-sm text-neutral-600">Please wait a moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Email Icon */}
      <div className="flex justify-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isVerified ? 'bg-green-100' : 'bg-primary-100'
        }`}>
          {isVerified ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : (
            <Mail className="w-8 h-8 text-primary-600" />
          )}
        </div>
      </div>

      {/* Email Address Display */}
      {email && (
        <div className="text-center">
          <p className="text-sm text-neutral-600 mb-2">
            {isVerified ? 'Verified email:' : 'We sent a verification email to:'}
          </p>
          <p className="font-medium text-neutral-900 text-lg">
            {email}
          </p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {!isVerified && !error && (
        <>
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Next steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here to access your account</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Verification pending</p>
                <p className="text-sm text-yellow-700">Please check your email and click the verification link.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Verification Success */}
      {isVerified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Email verified!</p>
              <p className="text-sm text-green-700">Your account is now active.</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {isVerified ? (
          <Button asChild className="w-full">
            <Link href="/dashboard">
              Continue to Dashboard
            </Link>
          </Button>
        ) : (
          <>
            {/* Resend Email Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleResendEmail}
              disabled={isResending || !email}
            >
              {isResending ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {isResending ? 'Sending...' : 'Resend verification email'}
            </Button>

            {/* Check Verification Status */}
            <Button 
              variant="secondary"
              className="w-full"
              onClick={handleCheckVerification}
              disabled={isLoading}
            >
              I&apos;ve verified my email
            </Button>
          </>
        )}
      </div>

      {/* Help Text */}
      {!isVerified && (
        <div className="text-center space-y-2">
          <p className="text-sm text-neutral-600">
            Didn&apos;t receive the email?
          </p>
          <div className="text-xs text-neutral-500 space-y-1">
            <p>• Check your spam or junk folder</p>
            <p>• Make sure {email} is correct</p>
            <p>• Wait a few minutes and try again</p>
          </div>
        </div>
      )}

      {/* Contact Support */}
      <div className="text-center pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          Still having trouble?{' '}
          <Link href="/contact" className="font-medium text-primary-600 hover:text-primary-500">
            Contact support
          </Link>
        </p>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
          ← Back to login
        </Link>
      </div>
    </div>
  )
}