'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AuthTestPage() {
  const { user, profile, loading, session } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p>Loading authentication status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">🔐 Authentication Test Page</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Authentication Status */}
            <div className="space-y-6">
              <div className="bg-neutral-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${user ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  Authentication Status
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Logged In:</span>
                    <span className={user ? 'text-green-600' : 'text-red-600'}>
                      {user ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Email Verified:</span>
                    <span className={user?.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}>
                      {user?.email_confirmed_at ? '✅ Yes' : '⚠️ No'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Session Active:</span>
                    <span className={session ? 'text-green-600' : 'text-red-600'}>
                      {session ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Profile Loaded:</span>
                    <span className={profile ? 'text-green-600' : 'text-yellow-600'}>
                      {profile ? '✅ Yes' : '⚠️ No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Information */}
              {user && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">👤 User Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>ID:</strong> {user.id}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</div>
                    {user.last_sign_in_at && (
                      <div><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Information */}
              {profile && (
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">📋 Profile Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Full Name:</strong> {profile.full_name || 'Not set'}</div>
                    <div><strong>Username:</strong> {profile.username || 'Not set'}</div>
                    <div><strong>Bio:</strong> {profile.bio || 'Not set'}</div>
                    <div><strong>Location:</strong> {profile.location || 'Not set'}</div>
                    <div><strong>Travel Preferences:</strong> {profile.travel_preferences ? JSON.stringify(profile.travel_preferences) : 'Not set'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-6">
              <div className="bg-neutral-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">🎯 Quick Actions</h2>
                
                <div className="space-y-3">
                  {!user ? (
                    <>
                      <Link href="/login" className="block">
                        <Button className="w-full">Go to Login</Button>
                      </Link>
                      <Link href="/signup" className="block">
                        <Button variant="outline" className="w-full">Go to Signup</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" className="block">
                        <Button className="w-full">Go to Dashboard</Button>
                      </Link>
                      {!user.email_confirmed_at && (
                        <Link href="/verify-email" className="block">
                          <Button variant="outline" className="w-full">Verify Email</Button>
                        </Link>
                      )}
                      <LogoutButton className="w-full" />
                    </>
                  )}
                </div>
              </div>

              {/* Debug Information */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">🐛 Debug Information</h3>
                <div className="space-y-3">
                  <details className="text-sm">
                    <summary className="font-medium cursor-pointer">Raw User Object</summary>
                    <pre className="mt-2 bg-white p-3 rounded border text-xs overflow-auto">
                      {JSON.stringify(user, null, 2)}
                    </pre>
                  </details>
                  
                  <details className="text-sm">
                    <summary className="font-medium cursor-pointer">Raw Profile Object</summary>
                    <pre className="mt-2 bg-white p-3 rounded border text-xs overflow-auto">
                      {JSON.stringify(profile, null, 2)}
                    </pre>
                  </details>
                  
                  <details className="text-sm">
                    <summary className="font-medium cursor-pointer">Raw Session Object</summary>
                    <pre className="mt-2 bg-white p-3 rounded border text-xs overflow-auto">
                      {JSON.stringify(session, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
