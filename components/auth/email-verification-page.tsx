"use client"

import { AuthLayout } from "./auth-layout"
import { Mail, ArrowRight, Loader2, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { resendVerificationEmail } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EmailVerificationPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [showResendForm, setShowResendForm] = useState(false)

  useEffect(() => {
    // Get email from URL params if available
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const result = await resendVerificationEmail(email)
      
      if (result.success) {
        setMessage("Verification email sent! Please check your inbox and spam folder.")
        setShowResendForm(false)
      } else {
        setError(result.error || "Failed to send verification email. Please try again.")
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Complete your account setup"
    >
      <div className="text-center space-y-6">
        {/* Email Icon */}
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        {/* Success Message */}
        {message && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-sm text-success font-medium">{message}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-destructive-50 border border-destructive-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900">
            Check Your Email
          </h3>
          <p className="text-neutral-600">
            We've sent a verification link to your email address. Please click the link to verify your account.
          </p>
          <p className="text-sm text-neutral-500">
            Make sure to check your spam folder if you don't see the email in your inbox.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-neutral-900">Next Steps:</h4>
          <div className="text-sm text-neutral-600 space-y-1">
            <p>1. Open the verification email</p>
            <p>2. Click "Verify Email Address"</p>
            <p>3. You'll be redirected to your dashboard</p>
          </div>
        </div>

        {/* Resend Email Section */}
        {!showResendForm ? (
          <div className="space-y-3">
            <p className="text-sm text-neutral-600">
              Didn't receive the email?
            </p>
            <Button
              variant="outline"
              onClick={() => setShowResendForm(true)}
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Resend Verification Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResendEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError("")
                }}
                className={`${error ? "border-destructive focus:ring-destructive" : ""}`}
                required
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowResendForm(false)
                  setError("")
                }}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-600"
                disabled={isLoading || !validateEmail(email)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Navigation Links */}
        <div className="space-y-3 pt-4 border-t border-neutral-200">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              Back to Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <p className="text-sm text-neutral-500">
            Need help?{" "}
            <a href="mailto:support@lfgetaway.com" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
