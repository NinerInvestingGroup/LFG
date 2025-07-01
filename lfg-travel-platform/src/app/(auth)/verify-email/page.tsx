import { Metadata } from 'next'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { EmailVerificationForm } from './components/EmailVerificationForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address to activate your LFG account',
}

function EmailVerificationFallback() {
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

export default function VerifyEmailPage() {
  return (
    <AuthLayout 
      title="Check Your Email" 
      subtitle="We've sent a verification link to your email address"
    >
      <Suspense fallback={<EmailVerificationFallback />}>
        <EmailVerificationForm />
      </Suspense>
    </AuthLayout>
  )
}
