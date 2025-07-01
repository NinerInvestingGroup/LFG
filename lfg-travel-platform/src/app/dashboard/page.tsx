import { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'
import { ActiveTrips } from '@/components/dashboard'
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
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto container-padding section-padding">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
          <p className="text-neutral-600">
            Welcome back! Here&apos;s what&apos;s happening with your adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<DashboardLoading />}>
              <ActiveTrips />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg border-0 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Active Trips</span>
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Total Destinations</span>
                  <span className="text-2xl font-bold text-secondary">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Travel Buddies</span>
                  <span className="text-2xl font-bold text-accent">26</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-lg border-0 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">Flight Booking</p>
                    <p className="text-sm text-neutral-600">Southeast Asia Trip</p>
                  </div>
                  <span className="text-xs bg-secondary text-white px-2 py-1 rounded-full">
                    3 days
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">Hotel Booking</p>
                    <p className="text-sm text-neutral-600">Europe Festival Tour</p>
                  </div>
                  <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
                    1 week
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}