"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActiveTrips } from "@/components/dashboard/active-trips"
import { CommunityFeed } from "@/components/dashboard/community-feed"
import { Recommendations } from "@/components/dashboard/recommendations"
import { TravelIntelligence } from "@/components/dashboard/travel-intelligence"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { CheckCircle, X } from "lucide-react"

function DashboardContent() {
  const searchParams = useSearchParams()
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const user = {
    name: "Alex Rodriguez",
    firstName: "Alex",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  }

  useEffect(() => {
    // Check if user just confirmed their email
    if (searchParams.get('confirmed') === 'true') {
      setShowConfirmation(true)
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowConfirmation(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Email Confirmation Success Banner */}
      {showConfirmation && (
        <div className="bg-success text-white p-4 text-center relative">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">
              Welcome to LFG! Your email has been confirmed successfully. 🎉
            </span>
          </div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <DashboardHeader user={user} notifications={7} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Actions */}
            <QuickActions />

            {/* Active Trips */}
            <ActiveTrips />

            {/* Two Column Layout for Feed and Recommendations */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <CommunityFeed />
              <Recommendations />
            </div>

            {/* Travel Intelligence */}
            <TravelIntelligence />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DashboardSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
