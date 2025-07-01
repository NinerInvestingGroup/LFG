"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError("Email is required")
      return
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent password reset instructions to your email address"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          
          <div className="space-y-2">
            <p className="text-neutral-600">
              If an account with <strong>{email}</strong> exists, you'll receive password reset instructions shortly.
            </p>
            <p className="text-sm text-neutral-500">
              Don't see the email? Check your spam folder or try again.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setEmail("")
              }}
              variant="outline"
              className="w-full"
            >
              Try Different Email
            </Button>
            
            <Link href="/auth/login">
              <Button className="w-full bg-primary hover:bg-primary-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email address and we'll send you instructions to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError("")
              }}
              className={`pl-10 min-h-[44px] ${error ? "border-destructive focus:ring-destructive" : ""}`}
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-600 text-white font-semibold min-h-[44px]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Instructions...
            </>
          ) : (
            "Send Reset Instructions"
          )}
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </form>

      {/* Help Section */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-neutral-900">Need Help?</h3>
          <div className="space-y-2 text-sm text-neutral-600">
            <p>
              Having trouble? Contact our support team at{" "}
              <a href="mailto:support@lfgetaway.com" className="text-primary hover:underline">
                support@lfgetaway.com
              </a>
            </p>
            <p>
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
