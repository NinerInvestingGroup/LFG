import { Metadata } from 'next'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your LFG account and start planning amazing group adventures',
}

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join the LFG community and start planning epic group adventures"
    >
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-neutral-700 mb-2">
              First name
            </label>
            <Input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              required
              placeholder="First name"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-neutral-700 mb-2">
              Last name
            </label>
            <Input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Last name"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Create a password"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-700 mb-2">
            Confirm password
          </label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Confirm your password"
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
            I agree to the{' '}
            <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>

        <div className="text-center">
          <span className="text-sm text-neutral-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  )
}