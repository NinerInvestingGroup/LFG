"use client"

import { LoginPage } from "@/components/auth/login-page"
import { Suspense } from "react"

function LoginContent() {
  return <LoginPage />
}

export default function AuthLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
