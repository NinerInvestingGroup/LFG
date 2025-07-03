"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthLayout } from "./auth-layout"
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight, X, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [callbackError, setCallbackError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string>("")
  const [showVerificationHelper, setShowVerificationHelper] = useState(false)

  useEffect(() => {
    // Check for callback error from email confirmation
    const error = searchParams.get('error')
    if (error) {
      setCallbackError(decodeURIComponent(error))
    }
  }, [searchParams])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (authError) {
      setAuthError("")
      setShowVerificationHelper(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setAuthError("")
    setShowVerificationHelper(false)

    try {
      const result = await signIn(formData.email, formData.password)

      if (result.success) {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      } else {
        setAuthError(result.error || "An error occurred during login")
        
        // Check if error is about email confirmation
        if (result.error?.includes("email") && result.error?.includes("confirm")) {
          setShowVerificationHelper(true)
        }
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setAuthError(`${provider} login is coming soon! Please use email login for now.`)
  }

  return (
    <AuthLayout title="Welcome Back, Adventurer!" subtitle="Sign in to continue your travel journey">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Callback Error Message */}
        {callbackError && (
          <div className="bg-destructive-50 border border-destructive-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive font-medium">{callbackError}</p>
              <button
                type="button"
                onClick={() => setCallbackError(null)}
                className="ml-auto text-destructive hover:text-destructive/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Auth Error Message */}
        {authError && (
          <div className="bg-destructive-50 border border-destructive-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive font-medium">{authError}</p>
            </div>
          </div>
        )}

        {/* Email Verification Helper */}
        {showVerificationHelper && (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-warning-800 font-medium mb-2">
                  Email verification required
                </p>
                <p className="text-sm text-warning-700 mb-3">
                  Please verify your email address to access your account.
                </p>
                <Link href={`/auth/verify-email?email=${encodeURIComponent(formData.email)}`}>
                  <Button 
                    type="button" 
                    size="sm" 
                    className="bg-warning text-white hover:bg-warning/90"
                  >
                    Verify Email
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`pl-10 min-h-[44px] ${errors.email ? "border-destructive focus:ring-destructive" : ""}`}
              autoFocus
            />
          </div>
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`pl-10 pr-10 min-h-[44px] ${errors.password ? "border-destructive focus:ring-destructive" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
          />
          <Label htmlFor="rememberMe" className="text-sm">
            Remember me for 30 days
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-600 text-white font-semibold min-h-[44px] group"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full min-h-[44px] border-2 hover:bg-neutral-50 bg-transparent"
            onClick={() => handleSocialLogin("Google")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full min-h-[44px] border-2 hover:bg-neutral-50 bg-transparent"
            onClick={() => handleSocialLogin("Facebook")}
          >
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full min-h-[44px] border-2 hover:bg-neutral-50 bg-transparent"
            onClick={() => handleSocialLogin("Apple")}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C8.396 0 8.025.044 8.025.044c0 0-.396.044-.396.044C3.521.088 0 3.609 0 8.017c0 4.408 3.521 7.929 7.629 7.973 0 0 .396.044.396.044s.396-.044.396-.044C12.529 15.946 16.05 12.425 16.05 8.017 16.05 3.609 12.529.088 8.421.044c0 0-.396-.044-.396-.044S8.396 0 12.017 0zm2.706 16.746c-.935 1.045-2.749 1.045-4.056 0L7.337 13.1c-.935-1.045-.935-2.749 0-3.794l3.33-3.646c.935-1.045 2.749-1.045 4.056 0l3.33 3.646c.935 1.045.935 2.749 0 3.794l-3.33 3.646z" />
            </svg>
            Continue with Apple
          </Button>
        </div>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            New to LFG?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
