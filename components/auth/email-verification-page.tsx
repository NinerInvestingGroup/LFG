"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "./auth-layout"
import { Mail, CheckCircle, Loader2, RefreshCw } from "lucide-react"

export function EmailVerificationPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsResending(false)
    setResendSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => setResendSuccess(false), 3000)
  }

  const handleContinueToApp = () => {
    // Navigate to app dashboard
    console.log("Continuing to app...")
  }

  return (
    <AuthLayout title="Verify Your Email" subtitle="We've sent a verification link to your email address">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-success-700 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Account Created Successfully!</span>
            </div>
            <p className="text-sm text-success-600">
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
            <div className="text-sm text-success-600 bg-success-50 rounded-lg p-3">
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
    </AuthLayout>
  )
}
