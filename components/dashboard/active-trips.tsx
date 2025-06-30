"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Eye, MessageCircle, Plus, Calendar, MapPin, Users, ArrowRight, Plane, PlusCircle } from "lucide-react"
import Image from "next/image"

interface Trip {
  id: string
  title: string
  destination: string
  coverImage: string
  dateRange: string
  countdown: string
  participants: Array<{
    id: string
    name: string
    avatar: string
  }>
  totalParticipants: number
  progress: number
  status: "Planning" | "Confirmed" | "Active"
}

export function ActiveTrips() {
  const [trips] = useState<Trip[]>([
    {
      id: "1",
      title: "Epic Southeast Asia Adventure",
      destination: "Thailand, Vietnam, Cambodia",
      coverImage: "/placeholder.svg?height=200&width=300",
      dateRange: "Mar 15-28, 2024",
      countdown: "42 days to go",
      participants: [
        { id: "1", name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "2", name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "3", name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "4", name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      totalParticipants: 8,
      progress: 75,
      status: "Planning",
    },
    {
      id: "2",
      title: "European Summer Festival Tour",
      destination: "Spain, France, Netherlands",
      coverImage: "/placeholder.svg?height=200&width=300",
      dateRange: "Jun 10-25, 2024",
      countdown: "128 days to go",
      participants: [
        { id: "5", name: "Alex Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "6", name: "Lisa Park", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "7", name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      totalParticipants: 12,
      progress: 45,
      status: "Confirmed",
    },
    {
      id: "3",
      title: "African Safari Experience",
      destination: "Kenya, Tanzania",
      coverImage: "/placeholder.svg?height=200&width=300",
      dateRange: "Aug 5-15, 2024",
      countdown: "185 days to go",
      participants: [
        { id: "8", name: "Maria Santos", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "9", name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      totalParticipants: 6,
      progress: 20,
      status: "Active",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-warning text-white"
      case "Confirmed":
        return "bg-success text-white"
      case "Active":
        return "bg-primary text-white"
      default:
        return "bg-neutral-500 text-white"
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-neutral-900">Active Trips</CardTitle>
            <p className="text-neutral-600 mt-1">Your upcoming adventures</p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary-600">
            View All Trips
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {trips.map((trip) => (
          <Card
            key={trip.id}
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary-200 overflow-hidden"
          >
            <div className="relative">
              <Image
                src={trip.coverImage || "/placeholder.svg"}
                alt={trip.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Status Badge */}
              <Badge className={`absolute top-3 left-3 ${getStatusColor(trip.status)}`}>{trip.status}</Badge>

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
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
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
                        <span className="text-xs font-medium text-neutral-600">+{trip.totalParticipants - 4}</span>
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
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
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
            <Button className="bg-primary hover:bg-primary-600 text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Your First Trip
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
