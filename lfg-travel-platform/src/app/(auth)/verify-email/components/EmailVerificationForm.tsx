"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Mail, CheckCircle, Loader2, RefreshCw } from "lucide-react"
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export function EmailVerificationForm() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Check verification status and handle email verification tokens
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
          
          if (!error) {
            setIsVerified(true)
            // Auto-redirect to dashboard after verification
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          }
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Verification check error:', error)
        setIsLoading(false)
      }
    }

    checkVerification()
  }, [searchParams, supabase.auth, router])

  const handleResendEmail = async () => {
    if (!email) {
      return
    }

    setIsResending(true)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (!error) {
        setResendSuccess(true)
        // Reset success message after 3 seconds
        setTimeout(() => setResendSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Resend error:', error)
    } finally {
      setIsResending(false)
    }
  }

  const handleContinueToApp = () => {
    router.push('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <div>
          <p className="text-lg font-medium text-neutral-900">Verifying your email...</p>
          <p className="text-sm text-neutral-600">Please wait a moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-4">
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-accent-700 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Account Created Successfully!</span>
          </div>
          <p className="text-sm text-accent-600">
            Welcome to the LFG community! Please verify your email to get started.
          </p>
        </div>

        <div className="text-left bg-neutral-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-neutral-900">Next Steps:</h4>
          <ol className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                1
              </span>
              Check your email inbox (and spam folder)
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                2
              </span>
              Click the verification link in the email
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                3
              </span>
              Start planning your first epic adventure!
            </li>
          </ol>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleResendEmail}
          variant="outline"
          className="w-full min-h-[44px] border-2 bg-transparent"
          disabled={isResending}
        >
          {isResending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Email...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Resend Verification Email
            </>
          )}
        </Button>

        {resendSuccess && (
          <div className="text-sm text-accent-600 bg-accent-50 rounded-lg p-3">
            ✓ Verification email sent successfully!
          </div>
        )}

        <Button
          onClick={handleContinueToApp}
          className="w-full bg-primary hover:bg-primary-600 text-white font-semibold min-h-[44px]"
        >
          Continue to LFG
        </Button>
      </div>

      <div className="text-xs text-neutral-500 bg-neutral-50 rounded-lg p-3">
        <p>
          <strong>Having trouble?</strong> Contact our support team at{" "}
          <a href="mailto:support@lfgtravel.com" className="text-primary hover:underline">
            support@lfgtravel.com
          </a>
        </p>
      </div>
    </div>
  )
}