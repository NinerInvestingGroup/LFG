"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { AuthLayout } from "@/components/layouts/AuthLayout"
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from '@/lib/supabase'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const supabase = createClient()

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

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setIsSuccess(true)
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setEmail(value)
    if (error) {
      setError("")
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout title="Check Your Email" subtitle="We've sent password reset instructions to your email">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>

          <div className="space-y-2">
            <p className="text-neutral-600">We&apos;ve sent a password reset link to:</p>
            <p className="font-medium text-neutral-900">{email}</p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
            <p className="mb-2">Didn&apos;t receive the email? Check your spam folder or:</p>
            <Button variant="secondary" className="p-0 h-auto text-primary" onClick={() => setIsSuccess(false)}>
              Try a different email address
            </Button>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary-600 text-white font-semibold min-h-[44px]"
              onClick={() => window.open("mailto:", "_blank")}
            >
              Open Email App
            </Button>

            <Link href="/login">
              <Button variant="outline" className="w-full min-h-[44px] border-2 bg-transparent">
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
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`pl-10 min-h-[44px] ${error ? "border-danger-500 focus:ring-danger-500" : ""}`}
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-danger-600">{error}</p>}
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
          <p>
            We&apos;ll send you an email with instructions to reset your password. The link will expire in 24 hours for
            security.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-600 text-white font-semibold min-h-[44px]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Reset Link...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
