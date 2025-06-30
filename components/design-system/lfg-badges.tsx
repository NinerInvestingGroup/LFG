"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, MapPin, Calendar, Users } from "lucide-react"

export function LFGBadges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Status Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Status Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-success text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
            <Badge className="bg-warning text-white">Planning</Badge>
            <Badge className="bg-neutral-500 text-white">Completed</Badge>
            <Badge className="bg-destructive text-white">Cancelled</Badge>
            <Badge className="bg-primary text-white">Featured</Badge>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Verification Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary text-primary">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
            <Badge variant="outline" className="border-secondary text-secondary">
              <Star className="w-3 h-3 mr-1" />
              Top Rated
            </Badge>
            <Badge variant="outline" className="border-success text-success">
              Trusted Host
            </Badge>
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Premium</Badge>
          </div>
        </div>

        {/* Count Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Count Badges</h3>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
              <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                3
              </Badge>
            </div>

            <div className="relative">
              <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
              <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                12
              </Badge>
            </div>

            <div className="relative">
              <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
              <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                99+
              </Badge>
            </div>
          </div>
        </div>

        {/* Category Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Category Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary-100 text-primary-700">
              <MapPin className="w-3 h-3 mr-1" />
              Adventure
            </Badge>
            <Badge variant="secondary" className="bg-secondary-100 text-secondary-700">
              <Calendar className="w-3 h-3 mr-1" />
              Weekend Trip
            </Badge>
            <Badge variant="secondary" className="bg-success-100 text-success-700">
              <Users className="w-3 h-3 mr-1" />
              Group Travel
            </Badge>
            <Badge variant="secondary" className="bg-warning-100 text-warning-700">
              Budget Friendly
            </Badge>
            <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">
              Family Friendly
            </Badge>
          </div>
        </div>

        {/* Size Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Size Variants</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Badge className="bg-primary text-white text-xs px-2 py-1">Small</Badge>
            <Badge className="bg-primary text-white text-sm px-3 py-1">Medium</Badge>
            <Badge className="bg-primary text-white text-base px-4 py-2">Large</Badge>
          </div>
        </div>

        {/* Interactive Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              className="bg-primary text-white cursor-pointer hover:bg-primary-600 transition-colors"
              onClick={() => console.log("Badge clicked")}
            >
              Clickable
            </Badge>
            <Badge
              variant="outline"
              className="border-primary text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Filter: Asia
              <button className="ml-2 hover:bg-white/20 rounded-full p-0.5">×</button>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
