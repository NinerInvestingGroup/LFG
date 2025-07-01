'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Calendar, MapPin, Users, Check, X, Loader2, Plane } from "lucide-react"
import { useRSVP } from "@/hooks/useParticipants"
import { useState } from "react"
import { format } from "date-fns"

interface RSVPCardProps {
  invitation: {
    id: string
    trip: {
      id: string
      title: string
      destination: string
      start_date: string
      end_date: string
      organizer_profile: {
        full_name: string | null
        avatar_url: string | null
      }
    }
    message?: string | null
  }
  onResponse?: (tripId: string, response: 'approved' | 'declined') => void
  className?: string
}

export function RSVPCard({ invitation, onResponse, className = "" }: RSVPCardProps) {
  const { respondToInvitation, loading, error } = useRSVP()
  const [hasResponded, setHasResponded] = useState(false)
  const [response, setResponse] = useState<'approved' | 'declined' | null>(null)

  const handleResponse = async (responseType: 'approved' | 'declined') => {
    const success = await respondToInvitation(invitation.trip.id, responseType)
    
    if (success) {
      setHasResponded(true)
      setResponse(responseType)
      onResponse?.(invitation.trip.id, responseType)
    }
  }

  const formatDateRange = () => {
    const startDate = new Date(invitation.trip.start_date)
    const endDate = new Date(invitation.trip.end_date)
    
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
  }

  if (hasResponded) {
    return (
      <Card className={`${className} ${response === 'approved' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            response === 'approved' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {response === 'approved' ? (
              <Check className="w-8 h-8 text-green-600" />
            ) : (
              <X className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {response === 'approved' ? 'Trip Accepted!' : 'Invitation Declined'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {response === 'approved' 
              ? `You've successfully joined "${invitation.trip.title}". Check your dashboard for trip details.`
              : `You've declined the invitation to "${invitation.trip.title}".`
            }
          </p>
          
          {response === 'approved' && (
            <Button 
              onClick={() => window.location.href = `/trips/${invitation.trip.id}`}
              className="bg-primary hover:bg-primary-600"
            >
              <Plane className="w-4 h-4 mr-2" />
              View Trip Details
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className} border-2 border-primary-200 shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage 
              src={invitation.trip.organizer_profile.avatar_url || undefined} 
              alt={invitation.trip.organizer_profile.full_name || 'Organizer'} 
            />
            <AvatarFallback className="bg-primary text-white">
              {invitation.trip.organizer_profile.full_name
                ?.split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase() || 'O'}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <CardTitle className="text-xl text-gray-900">
              You're Invited to Join!
            </CardTitle>
            <p className="text-sm text-gray-600">
              From {invitation.trip.organizer_profile.full_name || 'Trip Organizer'}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Trip Details */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {invitation.trip.title}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{invitation.trip.destination}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDateRange()}</span>
            </div>
          </div>
        </div>

        {/* Personal Message */}
        {invitation.message && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Personal Message</h4>
            <p className="text-blue-800 text-sm italic">"{invitation.message}"</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* RSVP Actions */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Will you join this trip?</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleResponse('approved')}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white h-12"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Accept Invitation
                </>
              )}
            </Button>
            
            <Button
              onClick={() => handleResponse('declined')}
              disabled={loading}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 h-12"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Decline
                </>
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            You can change your mind later by contacting the trip organizer
          </p>
        </div>

        {/* Trip Info */}
        <div className="border-t pt-4">
          <div className="text-center">
            <Badge className="bg-primary-100 text-primary-800">
              <Users className="w-3 h-3 mr-1" />
              Group Trip Invitation
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * RSVPCard - "Shows a trip invitation that someone can accept or decline"
 * 
 * Features:
 * - Shows trip details (title, destination, dates)
 * - Shows who invited them (organizer info)
 * - Shows personal message if included
 * - Accept/Decline buttons with loading states
 * - Success state after responding
 * - Error handling
 * - Beautiful card design with proper styling
 * 
 * Props:
 * - invitation: Trip invitation data from database
 * - onResponse: Called when user accepts/declines
 * - className: CSS styling
 * 
 * Usage:
 * <RSVPCard 
 *   invitation={invitationData}
 *   onResponse={(tripId, response) => handleResponse(tripId, response)}
 * />
 */
