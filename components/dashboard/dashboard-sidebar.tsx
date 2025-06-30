"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Clock, Trophy, Phone, CheckCircle, X, Calendar, MapPin } from "lucide-react"

interface PendingInvitation {
  id: string
  tripTitle: string
  organizer: string
  destination: string
  dates: string
  participants: number
  deadline: string
}

interface FriendRequest {
  id: string
  name: string
  avatar: string
  mutualFriends: number
  location: string
}

export function DashboardSidebar() {
  const [pendingInvitations] = useState<PendingInvitation[]>([
    {
      id: "1",
      tripTitle: "Morocco Desert Adventure",
      organizer: "Lisa Park",
      destination: "Marrakech, Morocco",
      dates: "Apr 20-27, 2024",
      participants: 6,
      deadline: "2 days left",
    },
    {
      id: "2",
      tripTitle: "Greek Island Hopping",
      organizer: "Tom Wilson",
      destination: "Santorini, Greece",
      dates: "Jun 15-22, 2024",
      participants: 8,
      deadline: "5 days left",
    },
  ])

  const [friendRequests] = useState<FriendRequest[]>([
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 3,
      location: "Barcelona, Spain",
    },
    {
      id: "2",
      name: "James Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 7,
      location: "Singapore",
    },
  ])

  const stats = {
    tripsPlanned: 12,
    friendsConnected: 48,
    achievements: 8,
    countriesVisited: 15,
  }

  const emergencyContacts = [
    { name: "Travel Insurance", phone: "+1-800-TRAVEL" },
    { name: "Embassy Hotline", phone: "+1-800-EMBASSY" },
    { name: "LFG Support", phone: "+1-800-LFG-HELP" },
  ]

  const handleInvitationResponse = (id: string, response: "accept" | "decline") => {
    console.log(`${response} invitation ${id}`)
  }

  const handleFriendRequest = (id: string, response: "accept" | "decline") => {
    console.log(`${response} friend request ${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Pending Invitations */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Pending Invitations</span>
            <Badge className="bg-destructive text-white">{pendingInvitations.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingInvitations.map((invitation) => (
            <Card key={invitation.id} className="border border-neutral-200">
              <CardContent className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-neutral-900">{invitation.tripTitle}</h4>
                  <p className="text-sm text-neutral-600">by {invitation.organizer}</p>
                </div>

                <div className="space-y-1 text-sm text-neutral-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{invitation.destination}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{invitation.dates}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{invitation.participants} travelers</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-warning text-warning">
                    <Clock className="w-3 h-3 mr-1" />
                    {invitation.deadline}
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary-600 text-white"
                    onClick={() => handleInvitationResponse(invitation.id, "accept")}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-2 bg-transparent"
                    onClick={() => handleInvitationResponse(invitation.id, "decline")}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Friend Requests */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-secondary" />
            <span>Friend Requests</span>
            <Badge className="bg-secondary text-white">{friendRequests.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {friendRequests.map((request) => (
            <Card key={request.id} className="border border-neutral-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                    <AvatarFallback>
                      {request.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900">{request.name}</h4>
                    <p className="text-sm text-neutral-600">{request.location}</p>
                    <p className="text-xs text-neutral-500">{request.mutualFriends} mutual friends</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-secondary hover:bg-secondary-600 text-white"
                    onClick={() => handleFriendRequest(request.id, "accept")}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-2 bg-transparent"
                    onClick={() => handleFriendRequest(request.id, "decline")}
                  >
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-warning" />
            <span>Your Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.tripsPlanned}</div>
              <div className="text-xs text-neutral-600">Trips Planned</div>
            </div>
            <div className="text-center p-3 bg-secondary-50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">{stats.friendsConnected}</div>
              <div className="text-xs text-neutral-600">Friends</div>
            </div>
            <div className="text-center p-3 bg-warning-50 rounded-lg">
              <div className="text-2xl font-bold text-warning">{stats.achievements}</div>
              <div className="text-xs text-neutral-600">Achievements</div>
            </div>
            <div className="text-center p-3 bg-success-50 rounded-lg">
              <div className="text-2xl font-bold text-success">{stats.countriesVisited}</div>
              <div className="text-xs text-neutral-600">Countries</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Phone className="w-5 h-5 text-destructive" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">{contact.name}</span>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive-600 hover:bg-destructive-50"
                onClick={() => window.open(`tel:${contact.phone}`, "_self")}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
