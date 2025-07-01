'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Header } from '@/components/navigation/Header'

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [error, setError] = useState<string | null>(null)
  const [userCount, setUserCount] = useState<number | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('testing')
      setError(null)
      
      const supabase = createClient()
      
      // Test basic connection by trying to access the profiles table
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        throw error
      }
      
      setConnectionStatus('connected')
      setUserCount(count || 0)
    } catch (err) {
      setConnectionStatus('error')
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    }
  }

  const testAuth = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        throw error
      }
      
      alert(`Auth test successful! Current session: ${data.session ? 'Logged in' : 'Not logged in'}`)
    } catch (err) {
      alert(`Auth test failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto container-padding section-padding">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
          
          <div className="space-y-6">
            {/* Connection Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Database Connection</CardTitle>
                <CardDescription>
                  Testing connection to your Supabase database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    connectionStatus === 'testing' ? 'bg-yellow-500 animate-pulse' :
                    connectionStatus === 'connected' ? 'bg-green-500' :
                    'bg-red-500'
                  }`} />
                  <span className="font-medium">
                    {connectionStatus === 'testing' && 'Testing connection...'}
                    {connectionStatus === 'connected' && 'Connected successfully!'}
                    {connectionStatus === 'error' && 'Connection failed'}
                  </span>
                </div>
                
                {connectionStatus === 'connected' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ Database connection is working!
                      <br />
                      📊 Current profiles in database: {userCount}
                    </p>
                  </div>
                )}
                
                {connectionStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      ❌ Connection failed: {error}
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={testConnection} 
                  className="mt-4"
                  disabled={connectionStatus === 'testing'}
                >
                  {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                </Button>
              </CardContent>
            </Card>

            {/* Environment Variables Card */}
            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>
                  Checking if your environment variables are set up correctly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                    <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
                      {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                    <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
                      {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_APP_URL:</span>
                    <span className={process.env.NEXT_PUBLIC_APP_URL ? 'text-green-600' : 'text-red-600'}>
                      {process.env.NEXT_PUBLIC_APP_URL ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                </div>
                
                {process.env.NEXT_PUBLIC_SUPABASE_URL && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      🔗 Connected to: {process.env.NEXT_PUBLIC_SUPABASE_URL}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Authentication Test Card */}
            <Card>
              <CardHeader>
                <CardTitle>Authentication Test</CardTitle>
                <CardDescription>
                  Test Supabase authentication functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={testAuth} variant="outline">
                  Test Authentication
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  This will test if the authentication system is working properly.
                </p>
              </CardContent>
            </Card>

            {/* Next Steps Card */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>
                  What to do after your connection is working
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>✅ 1. Set up your database tables (see README.md)</p>
                  <p>✅ 2. Configure Row Level Security (RLS) policies</p>
                  <p>✅ 3. Test user registration and login</p>
                  <p>✅ 4. Start building your trip features!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}