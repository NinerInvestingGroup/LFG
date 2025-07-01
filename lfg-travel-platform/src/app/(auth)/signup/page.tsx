import { Metadata } from 'next'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { SignupForm } from './components/SignupForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Join the LFG Adventure Community and start planning epic trips with friends',
}

function SignupFallback() {
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

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Join the LFG Adventure Community" 
      subtitle="Start planning epic trips with friends around the world"
    >
      <Suspense fallback={<SignupFallback />}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  )
}