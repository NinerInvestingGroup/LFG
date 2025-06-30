"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActiveTrips } from "@/components/dashboard/active-trips"
import { CommunityFeed } from "@/components/dashboard/community-feed"
import { Recommendations } from "@/components/dashboard/recommendations"
import { TravelIntelligence } from "@/components/dashboard/travel-intelligence"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DashboardPage() {
  const user = {
    name: "Alex Rodriguez",
    firstName: "Alex",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  }

  return (
    <div className="min-h-screen bg-neutral-50">
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
