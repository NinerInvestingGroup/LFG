'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Crown, Mail, UserMinus, Users, UserPlus, Loader2 } from "lucide-react"
import { useTripParticipants, useParticipantActions } from "@/hooks/useParticipants"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

interface ParticipantListProps {
  tripId: string
  organizerId: string
  onInviteClick?: () => void
  className?: string
}

export function ParticipantList({ tripId, organizerId, onInviteClick, className = "" }: ParticipantListProps) {
  const { user } = useAuth()
  const { participants, pendingInvites, loading, error } = useTripParticipants(tripId)
  const { removeParticipant, loading: removing } = useParticipantActions()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const isOrganizer = user?.id === organizerId
  
  const handleRemoveParticipant = async (participantId: string) => {
    if (!confirm('Are you sure you want to remove this participant?')) return
    
    setRemovingId(participantId)
    const success = await removeParticipant(tripId, participantId)
    if (success) {
      // Participant list will update automatically via real-time subscription
    }
    setRemovingId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'declined': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Trip Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2">Loading participants...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Trip Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error loading participants: {error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Trip Participants ({participants.length + pendingInvites.length})
          </CardTitle>
          {isOrganizer && (
            <Button onClick={onInviteClick} size="sm" className="bg-primary hover:bg-primary-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite People
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Confirmed Participants */}
        {participants.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Confirmed Participants ({participants.length})
            </h4>
            <div className="space-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage 
                        src={participant.profile.avatar_url || undefined} 
                        alt={participant.profile.full_name || 'User'} 
                      />
                      <AvatarFallback>
                        {participant.profile.full_name
                          ?.split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {participant.profile.full_name || 'Unknown User'}
                        </span>
                        {participant.user_id === organizerId && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-600">{participant.profile.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(participant.status)}>
                      {participant.status}
                    </Badge>
                    
                    {isOrganizer && participant.user_id !== organizerId && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveParticipant(participant.id)}
                        disabled={removing || removingId === participant.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {removingId === participant.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <UserMinus className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Invitations */}
        {pendingInvites.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Pending Invitations ({pendingInvites.length})
            </h4>
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-yellow-200 text-yellow-800">
                        <Mail className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <span className="font-medium text-gray-900">{invite.user_id}</span>
                      <div className="text-sm text-gray-600">Invitation sent</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Pending
                    </Badge>
                    
                    {isOrganizer && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveParticipant(invite.id)}
                        disabled={removing || removingId === invite.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {removingId === invite.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <UserMinus className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {participants.length === 0 && pendingInvites.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No participants yet</h3>
            <p className="text-gray-600 mb-4">
              {isOrganizer 
                ? "Start inviting people to join your epic adventure!" 
                : "The organizer hasn't invited anyone yet."}
            </p>
            {isOrganizer && (
              <Button onClick={onInviteClick} className="bg-primary hover:bg-primary-600">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Your First Participant
              </Button>
            )}
          </div>
        )}

        {/* Participant Summary */}
        {(participants.length > 0 || pendingInvites.length > 0) && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-semibold text-green-600">{participants.length}</div>
                <div className="text-gray-600">Confirmed</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-600">{pendingInvites.length}</div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div>
                <div className="font-semibold text-blue-600">{participants.length + pendingInvites.length}</div>
                <div className="text-gray-600">Total</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * ParticipantList - "Shows everyone who's part of this trip"
 * 
 * Features:
 * - Shows confirmed participants with their profile pictures and names
 * - Shows pending email invitations separately
 * - Highlights the trip organizer with a crown icon
 * - Allows organizers to remove participants
 * - Shows participant status badges (approved, pending, etc.)
 * - Real-time updates when people join or leave
 * - Invite button for organizers
 * - Empty state when no participants yet
 * - Summary counts at the bottom
 * 
 * Props:
 * - tripId: Which trip to show participants for
 * - organizerId: Who owns this trip (gets special permissions)
 * - onInviteClick: What to do when "Invite People" is clicked
 * - className: CSS styling
 */
