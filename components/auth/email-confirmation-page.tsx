"use client"

import { AuthLayout } from "./auth-layout"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export function EmailConfirmationPage() {
  return (
    <AuthLayout
      title="Check Your Email"
      subtitle="We've sent you a verification link"
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <p className="text-neutral-600">
            Please check your email and click the verification link to activate your account.
          </p>
          <p className="text-sm text-neutral-500">
            Make sure to check your spam folder if you don't see the email in your inbox.
          </p>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-neutral-900">Next Steps:</h4>
          <div className="text-sm text-neutral-600 space-y-1">
            <p>1. Open the verification email</p>
            <p>2. Click "Verify Email Address"</p>
            <p>3. Return here to sign in</p>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/auth/login">
            <button className="w-full bg-primary hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              Continue to Login
              <ArrowRight className="w-4 h-4" />
            </button>
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