import { Metadata } from 'next'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { LoginForm } from './components/LoginForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your LFG account and continue your travel journey',
}

function LoginFallback() {
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

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome Back, Adventurer!" 
      subtitle="Sign in to continue your travel journey"
    >
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  )
}