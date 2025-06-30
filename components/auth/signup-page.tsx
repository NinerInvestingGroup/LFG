"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AuthLayout } from "./auth-layout"
import { Eye, EyeOff, Mail, User, Lock, Check, X, Loader2, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"

export function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    travelStyle: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const travelStyles = [
    "Adventure Seeker",
    "Luxury Traveler",
    "Budget Explorer",
    "Cultural Explorer",
    "Business Traveler",
  ]

  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score < 2) return { strength: "weak", color: "destructive", text: "Weak" }
    if (score < 4) return { strength: "medium", color: "warning", text: "Medium" }
    return { strength: "strong", color: "success", text: "Strong" }
  }

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
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.travelStyle) {
      newErrors.travelStyle = "Please select your travel style"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    // Handle successful signup
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`)
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <AuthLayout
      title="Join the LFG Adventure Community"
      subtitle="Start planning epic trips with friends around the world"
    >
      {/* Benefits Callouts */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <Shield className="w-5 h-5 text-success mx-auto mb-1" />
          <div className="text-xs font-medium text-success-700">Free Forever</div>
        </div>
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
          <div className="text-xs font-medium text-primary-700">Instant Creation</div>
        </div>
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Globe className="w-5 h-5 text-secondary mx-auto mb-1" />
          <div className="text-xs font-medium text-secondary-700">Global Community</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`pl-10 min-h-[44px] ${errors.fullName ? "border-destructive focus:ring-destructive" : ""}`}
              autoFocus
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.fullName}
            </p>
          )}
        </div>

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
            />
            {formData.email && validateEmail(formData.email) && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-success w-4 h-4" />
            )}
          </div>
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
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

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength.strength === "weak"
                        ? "w-1/3 bg-destructive"
                        : passwordStrength.strength === "medium"
                          ? "w-2/3 bg-warning"
                          : "w-full bg-success"
                    }`}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    passwordStrength.color === "destructive"
                      ? "border-destructive text-destructive"
                      : passwordStrength.color === "warning"
                        ? "border-warning text-warning"
                        : "border-success text-success"
                  }`}
                >
                  {passwordStrength.text}
                </Badge>
              </div>
            </div>
          )}

          {errors.password && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`pl-10 pr-10 min-h-[44px] ${errors.confirmPassword ? "border-destructive focus:ring-destructive" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 text-success w-4 h-4" />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Travel Style */}
        <div className="space-y-2">
          <Label htmlFor="travelStyle">Travel Style</Label>
          <Select value={formData.travelStyle} onValueChange={(value) => handleInputChange("travelStyle", value)}>
            <SelectTrigger className={`min-h-[44px] ${errors.travelStyle ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Select your travel style" />
            </SelectTrigger>
            <SelectContent>
              {travelStyles.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.travelStyle && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.travelStyle}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm leading-5">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.agreeToTerms}
            </p>
          )}
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
              Creating Account...
            </>
          ) : (
            "Create Account"
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

        {/* Social Signup */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full min-h-[44px] border-2 hover:bg-neutral-50 bg-transparent"
            onClick={() => handleSocialSignup("Google")}
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
            onClick={() => handleSocialSignup("Facebook")}
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
            onClick={() => handleSocialSignup("Apple")}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C8.396 0 8.025.044 8.025.044c0 0-.396.044-.396.044C3.521.088 0 3.609 0 8.017c0 4.408 3.521 7.929 7.629 7.973 0 0 .396.044.396.044s.396-.044.396-.044C12.529 15.946 16.05 12.425 16.05 8.017 16.05 3.609 12.529.088 8.421.044c0 0-.396-.044-.396-.044S8.396 0 12.017 0zm2.706 16.746c-.935 1.045-2.749 1.045-4.056 0L7.337 13.1c-.935-1.045-.935-2.749 0-3.794l3.33-3.646c.935-1.045 2.749-1.045 4.056 0l3.33 3.646c.935 1.045.935 2.749 0 3.794l-3.33 3.646z" />
            </svg>
            Continue with Apple
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
