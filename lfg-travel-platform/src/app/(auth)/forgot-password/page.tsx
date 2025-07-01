import { Metadata } from 'next'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your LFG account password to regain access to your travel adventures',
}

function ForgotPasswordFallback() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-primary-600 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-neutral-900">Loading...</p>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordFallback />}>
      <ForgotPasswordForm />
    </Suspense>
  )
}