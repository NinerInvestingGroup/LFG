"use client"

import { EmailVerificationPage } from "@/components/auth/email-verification-page"
import { Suspense } from "react"

function VerifyEmailContent() {
  return <EmailVerificationPage />
}

export default function AuthVerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}