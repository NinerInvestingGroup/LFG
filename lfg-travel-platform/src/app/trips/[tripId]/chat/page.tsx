'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowLeft, MapPin, Calendar, Users, AlertCircle, Loader2 } from "lucide-react"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { ParticipantList } from "@/components/participants/ParticipantList"
import { useTrips } from "@/hooks/useTrips"
import { useTripParticipants } from "@/hooks/useParticipants"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { format } from "date-fns"

export default function TripChatPage() {
  const params = useParams()
  const tripId = params.tripId as string
  const { user } = useAuth()
  const { trips, loading: tripsLoading } = useTrips()
  const { participants, loading: participantsLoading } = useTripParticipants(tripId)
  const [showParticipants, setShowParticipants] = useState(false)

  // Find the current trip
  const trip = trips.find(t => t.id === tripId)
  
  // Check if user is a participant
  const isParticipant = participants.some(p => p.user_id === user?.id && p.status === 'approved')

  if (tripsLoading || participantsLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Loading trip chat...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="mt-8">
            <CardContent className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h2>
              <p className="text-gray-600 mb-6">
                The trip you're looking for doesn't exist or you don't have access to it.
              </p>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="mt-8">
            <CardContent className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to access trip chat.
              </p>
              <Button onClick={() => window.location.href = '/login'}>
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isParticipant) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="mt-8">
            <CardContent className="text-center py-16">
              <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Participants Only</h2>
              <p className="text-gray-600 mb-6">
                Only trip participants can access the group chat. Join this trip to start chatting!
              </p>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trip
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const formatDateRange = () => {
    const startDate = new Date(trip.start_date)
    const endDate = new Date(trip.end_date)
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {trip.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDateRange()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {participants.length} participants
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                {trip.status}
              </Badge>
              <Button
                variant="outline"
                onClick={() => setShowParticipants(!showParticipants)}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                {showParticipants ? 'Hide' : 'Show'} Participants
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className={`${showParticipants ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <ChatInterface 
              tripId={tripId}
              tripTitle={trip.title}
              className="h-[600px]"
            />
          </div>

          {/* Participants Panel */}
          {showParticipants && (
            <div className="lg:col-span-1">
              <ParticipantList
                tripId={tripId}
                organizerId={trip.organizer_id}
                className="h-[600px] overflow-y-auto"
              />
            </div>
          )}
        </div>

        {/* Trip Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Trip Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">
                  {trip.description || 'No description provided'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Budget Range</h4>
                <p className="text-gray-600">
                  {trip.budget_min && trip.budget_max 
                    ? `$${trip.budget_min} - $${trip.budget_max}`
                    : 'Budget not specified'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Trip Type</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{trip.trip_type}</Badge>
                  <Badge variant="outline">{trip.difficulty_level}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Guidelines */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Chat Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Be respectful and kind to all trip participants</li>
                  <li>• Use this chat to coordinate trip plans and activities</li>
                  <li>• Share important travel information and updates</li>
                  <li>• Keep conversations relevant to the trip</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS PAGE DOES:
 * 
 * TripChatPage - "A dedicated page for trip group chat"
 * 
 * Features:
 * - Shows trip details in header (title, destination, dates)
 * - Chat interface for real-time messaging
 * - Participant list (can be shown/hidden)
 * - Access control (only participants can chat)
 * - Trip information display
 * - Chat guidelines for users
 * - Back navigation to previous page
 * - Responsive design for mobile and desktop
 * 
 * Security:
 * - Requires user authentication
 * - Only approved trip participants can access
 * - Proper error states for invalid access
 * 
 * URL Format: /trips/[tripId]/chat
 * Example: /trips/123/chat
 */
