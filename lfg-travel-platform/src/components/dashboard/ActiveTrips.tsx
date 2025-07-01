"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Progress } from "@/components/ui/Progress"
import { Eye, MessageCircle, Plus, Calendar, MapPin, Users, ArrowRight, Plane, PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useTrips } from '@/hooks/useTrips'
import { TripWithParticipants } from '@/services/tripService'
import { format, differenceInDays } from 'date-fns'

interface TripParticipant {
  id: string
  name: string
  avatar: string
}

interface Trip {
  id: string
  title: string
  destination: string
  coverImage: string
  dateRange: string
  countdown: string
  participants: TripParticipant[]
  totalParticipants: number
  progress: number
  status: "Planning" | "Confirmed" | "Active"
}

interface ActiveTripsProps {
  className?: string
}

// Helper function to convert database trip to display format
function convertDatabaseTripToDisplayTrip(dbTrip: TripWithParticipants): Trip {
  const startDate = new Date(dbTrip.start_date)
  const endDate = new Date(dbTrip.end_date)
  
  // Calculate countdown
  const now = new Date()
  const diffTime = startDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  let countdown = "Trip in progress"
  if (diffDays < 0) countdown = "Trip in progress"
  else if (diffDays === 0) countdown = "Departure today!"
  else if (diffDays === 1) countdown = "1 day to go"
  else countdown = `${diffDays} days to go`
  
  // Format date range
  const dateRange = `${format(startDate, "MMM d")}-${format(endDate, "d, yyyy")}`
  
  // Convert participants
  const participants: TripParticipant[] = dbTrip.participants
    .filter(p => p.status === 'approved')
    .slice(0, 4)
    .map(p => ({
      id: p.profile.id,
      name: p.profile.full_name || 'Unknown',
      avatar: p.profile.avatar_url || '/images/avatars/default.jpg'
    }))
  
  // Calculate progress (this is a rough estimate based on trip creation date)
  const daysSinceCreation = differenceInDays(now, new Date(dbTrip.created_at))
  const daysUntilTrip = Math.max(0, diffDays)
  const totalPlanningTime = daysSinceCreation + daysUntilTrip
  const progress = totalPlanningTime > 0 ? Math.min(100, Math.round((daysSinceCreation / totalPlanningTime) * 100)) : 0
  
  return {
    id: dbTrip.id,
    title: dbTrip.title,
    destination: dbTrip.destination,
    coverImage: (dbTrip.images && dbTrip.images.length > 0) ? dbTrip.images[0] : '/images/travel-background.jpg',
    dateRange,
    countdown,
    participants,
    totalParticipants: dbTrip.max_participants,
    progress: Math.max(progress, 20), // Minimum 20% progress
    status: dbTrip.status === 'active' ? 'Active' : dbTrip.status === 'draft' ? 'Planning' : 'Confirmed'
  }
}

export function ActiveTrips({ className }: ActiveTripsProps) {
  const router = useRouter()
  
  // Use our database hook to get real trips
  const { trips: dbTrips, loading: isLoading, error, refetch } = useTrips()
  
  // Convert database trips to display format
  const trips = dbTrips?.map(convertDatabaseTripToDisplayTrip) || []



  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-secondary text-white"
      case "Confirmed":
        return "bg-accent text-white"
      case "Active":
        return "bg-primary text-white"
      default:
        return "bg-neutral-500 text-white"
    }
  }

  const handleViewTrip = (tripId: string) => {
    router.push(`/trips/${tripId}`)
  }

  const handleChatTrip = (tripId: string) => {
    router.push(`/trips/${tripId}/chat`)
  }

  const handleAddToTrip = (tripId: string) => {
    router.push(`/trips/${tripId}/invite`)
  }

  const handleCreateTrip = () => {
    router.push('/dashboard/create-trip')
  }

  const handleViewAllTrips = () => {
    router.push('/trips')
  }

  if (isLoading) {
    return (
      <Card className={`shadow-lg border-0 ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">Active Trips</CardTitle>
              <p className="text-neutral-600 mt-1">Your upcoming adventures</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-neutral-200 animate-pulse" />
                <CardContent className="p-4 space-y-4">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
                  <div className="h-2 bg-neutral-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`shadow-lg border-0 ${className}`}>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-danger-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Unable to load trips</h3>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`shadow-lg border-0 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-neutral-900">Active Trips</CardTitle>
            <p className="text-neutral-600 mt-1">Your upcoming adventures</p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary-600" onClick={handleViewAllTrips}>
            View All Trips
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {trips.map((trip) => (
          <Card
            key={trip.id}
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary-200 overflow-hidden cursor-pointer"
            onClick={() => handleViewTrip(trip.id)}
          >
            <div className="relative">
                             <Image
                 src={trip.coverImage}
                 alt={trip.title}
                 width={300}
                 height={200}
                 className="w-full h-48 object-cover"
                 onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                   const target = e.target as HTMLImageElement
                   target.src = '/images/travel-background.jpg'
                 }}
               />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Status Badge */}
              <Badge className={`absolute top-3 left-3 ${getStatusColor(trip.status)}`}>
                {trip.status}
              </Badge>

              {/* Trip Info Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-lg mb-1">{trip.title}</h3>
                <div className="flex items-center text-sm opacity-90">
                  <MapPin className="w-4 h-4 mr-1" />
                  {trip.destination}
                </div>
              </div>
            </div>

            <CardContent className="p-4 space-y-4">
              {/* Date and Countdown */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-neutral-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {trip.dateRange}
                </div>
                <div className="text-primary font-medium">{trip.countdown}</div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Planning Progress</span>
                  <span className="font-medium">{trip.progress}%</span>
                </div>
                <Progress value={trip.progress} className="h-2" />
              </div>

              {/* Participants */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {trip.participants.slice(0, 4).map((participant) => (
                                             <Avatar key={participant.id} className="w-8 h-8 border-2 border-white">
                         <AvatarImage 
                           src={participant.avatar} 
                           alt={participant.name}
                         />
                         <AvatarFallback className="text-xs">
                           {participant.name
                             .split(" ")
                             .map((n) => n[0])
                             .join("")}
                         </AvatarFallback>
                       </Avatar>
                    ))}
                    {trip.totalParticipants > 4 && (
                      <div className="w-8 h-8 bg-neutral-100 border-2 border-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-neutral-600">
                          +{trip.totalParticipants - 4}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Users className="w-4 h-4 mr-1" />
                    {trip.totalParticipants} travelers
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewTrip(trip.id)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleChatTrip(trip.id)
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToTrip(trip.id)
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {trips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No active trips yet</h3>
            <p className="text-neutral-600 mb-4">Ready to plan your first epic adventure?</p>
            <Button className="bg-primary hover:bg-primary-600 text-white" onClick={handleCreateTrip}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Your First Trip
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}