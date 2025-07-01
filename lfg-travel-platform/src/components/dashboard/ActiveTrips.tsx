"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Progress } from "@/components/ui/Progress"
import { Eye, MessageCircle, Plus, Calendar, MapPin, Users, ArrowRight, Plane, PlusCircle } from "lucide-react"
import Image from "next/image"
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

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

export function ActiveTrips({ className }: ActiveTripsProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  // const supabase = createClient() // TODO: Uncomment when implementing real data fetching

  // Calculate countdown from date range
  const calculateCountdown = (dateRange: string): string => {
    try {
      // Extract start date from range (e.g., "Mar 15-28, 2024" -> "Mar 15, 2024")
      const startDateStr = dateRange.split('-')[0] + ', ' + dateRange.split(', ')[1]
      const startDate = new Date(startDateStr)
      const now = new Date()
      const diffTime = startDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 0) return "Trip in progress"
      if (diffDays === 0) return "Departure today!"
      if (diffDays === 1) return "1 day to go"
      return `${diffDays} days to go`
    } catch {
      return "Date TBD"
    }
  }

  // Mock data for development - replace with real Supabase query
  const mockTrips: Trip[] = [
    {
      id: "1",
      title: "Epic Southeast Asia Adventure",
      destination: "Thailand, Vietnam, Cambodia",
      coverImage: "/images/trips/southeast-asia.jpg",
      dateRange: "Mar 15-28, 2024",
      countdown: "42 days to go",
      participants: [
        { id: "1", name: "Sarah Chen", avatar: "/images/avatars/sarah.jpg" },
        { id: "2", name: "Mike Johnson", avatar: "/images/avatars/mike.jpg" },
        { id: "3", name: "Emma Wilson", avatar: "/images/avatars/emma.jpg" },
        { id: "4", name: "David Kim", avatar: "/images/avatars/david.jpg" },
      ],
      totalParticipants: 8,
      progress: 75,
      status: "Planning",
    },
    {
      id: "2",
      title: "European Summer Festival Tour",
      destination: "Spain, France, Netherlands",
      coverImage: "/images/trips/europe-festivals.jpg",
      dateRange: "Jun 10-25, 2024",
      countdown: "128 days to go",
      participants: [
        { id: "5", name: "Alex Rodriguez", avatar: "/images/avatars/alex.jpg" },
        { id: "6", name: "Lisa Park", avatar: "/images/avatars/lisa.jpg" },
        { id: "7", name: "Tom Brown", avatar: "/images/avatars/tom.jpg" },
      ],
      totalParticipants: 12,
      progress: 45,
      status: "Confirmed",
    },
    {
      id: "3",
      title: "African Safari Experience",
      destination: "Kenya, Tanzania",
      coverImage: "/images/trips/african-safari.jpg",
      dateRange: "Aug 5-15, 2024",
      countdown: "185 days to go",
      participants: [
        { id: "8", name: "Maria Santos", avatar: "/images/avatars/maria.jpg" },
        { id: "9", name: "James Wilson", avatar: "/images/avatars/james.jpg" },
      ],
      totalParticipants: 6,
      progress: 20,
      status: "Active",
    },
  ]

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setIsLoading(true)
        
        // TODO: Replace with actual Supabase query
        // const { data: { user } } = await supabase.auth.getUser()
        // if (!user) {
        //   router.push('/login')
        //   return
        // }

        // const { data: tripsData, error: tripsError } = await supabase
        //   .from('trips')
        //   .select(`
        //     *,
        //     trip_participants (
        //       profiles (id, full_name, avatar_url)
        //     )
        //   `)
        //   .eq('status', 'active')
        //   .order('created_at', { ascending: false })

        // For now, use mock data with calculated countdowns
        const tripsWithCountdown = mockTrips.map(trip => ({
          ...trip,
          countdown: calculateCountdown(trip.dateRange)
        }))

        setTrips(tripsWithCountdown)
      } catch (err) {
        setError('Failed to load trips')
        console.error('Error fetching trips:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrips()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    router.push('/trips/create')
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