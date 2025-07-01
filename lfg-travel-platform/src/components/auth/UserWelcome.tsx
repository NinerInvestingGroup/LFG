'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogoutButton } from './LogoutButton'

export function UserWelcome() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-neutral-200 rounded animate-pulse w-48" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-32" />
        </div>
        <div className="h-10 bg-neutral-200 rounded animate-pulse w-24" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg border border-neutral-200">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Welcome back, {displayName}! 👋
        </h2>
        <p className="text-sm text-neutral-600">
          {user.email}
          {user.email_confirmed_at ? (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Unverified
            </span>
          )}
        </p>
      </div>
      <LogoutButton />
    </div>
  )
}