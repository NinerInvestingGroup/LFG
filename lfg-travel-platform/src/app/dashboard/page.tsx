import { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'
import { ActiveTrips, DashboardSidebar, QuickActions, Recommendations, TravelIntelligence } from '@/components/dashboard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { UserWelcome } from '@/components/auth/UserWelcome'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your travel dashboard - Manage your active trips and plan new adventures',
}

function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-neutral-200 rounded-lg animate-pulse w-48" />
      <div className="h-64 bg-neutral-200 rounded-lg animate-pulse" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50">
        <Header notifications={5} />
        <main className="container mx-auto container-padding section-padding">
          <UserWelcome />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
            <p className="text-neutral-600">
              Here&apos;s what&apos;s happening with your adventures.
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<DashboardLoading />}>
              <QuickActions />
            </Suspense>
            <Suspense fallback={<DashboardLoading />}>
              <ActiveTrips />
            </Suspense>
            <Suspense fallback={<DashboardLoading />}>
              <Recommendations />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Suspense fallback={<DashboardLoading />}>
              <TravelIntelligence />
            </Suspense>
            <Suspense fallback={<DashboardLoading />}>
              <DashboardSidebar />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  )
}
