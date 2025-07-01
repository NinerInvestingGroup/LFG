import { useState, useEffect, useCallback } from 'react'
import { participantService, ParticipantWithProfile, InvitationData } from '@/services/participantService'

/**
 * PARTICIPANT MANAGEMENT HOOKS
 * 
 * These hooks make participant operations easy to use in your React components.
 * They handle loading states, errors, and real-time updates automatically.
 */

/**
 * USE TRIP PARTICIPANTS HOOK
 * 
 * This hook loads and manages all participants for a specific trip.
 * It separates confirmed participants from pending invitations.
 * 
 * Usage:
 * const { participants, pendingInvites, loading, error, refetch } = useTripParticipants(tripId)
 */
export function useTripParticipants(tripId: string | null) {
  const [participants, setParticipants] = useState<ParticipantWithProfile[]>([])
  const [pendingInvites, setPendingInvites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchParticipants = useCallback(async () => {
    if (!tripId) {
      setParticipants([])
      setPendingInvites([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await participantService.getTripParticipants(tripId)
    
    if (fetchError) {
      setError(fetchError)
      setParticipants([])
      setPendingInvites([])
    } else if (data) {
      setParticipants(data.participants)
      setPendingInvites(data.pendingInvites)
    }
    
    setLoading(false)
  }, [tripId])

  // Load participants when component mounts or tripId changes
  useEffect(() => {
    fetchParticipants()
  }, [fetchParticipants])

  // Set up real-time updates for participant changes
  useEffect(() => {
    if (!tripId) return

    const unsubscribe = participantService.subscribeToParticipants(tripId, (payload) => {
      console.log('Participant change detected:', payload)
      // Refresh participants when database changes
      fetchParticipants()
    })

    return unsubscribe
  }, [tripId, fetchParticipants])

  return {
    participants,        // Array of confirmed participants
    pendingInvites,      // Array of pending email invitations
    loading,             // true when loading, false when done
    error,               // Error message if something went wrong
    refetch: fetchParticipants, // Function to manually reload participants
  }
}

/**
 * USE SEND INVITATION HOOK
 * 
 * This hook provides a function to send email invitations to join a trip.
 * 
 * Usage:
 * const { sendInvitation, loading, error, success } = useSendInvitation()
 * const handleInvite = () => sendInvitation({ tripId, email, message })
 */
export function useSendInvitation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const sendInvitation = useCallback(async (invitationData: InvitationData): Promise<boolean> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error: inviteError, success: inviteSuccess } = await participantService.inviteByEmail(invitationData)
    
    if (inviteError) {
      setError(inviteError)
      setLoading(false)
      return false
    }

    setSuccess(!!inviteSuccess)
    setLoading(false)
    return true
  }, [])

  const clearState = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return {
    sendInvitation,      // Function to send an invitation
    loading,             // true when sending, false when done
    error,               // Error message if invitation failed
    success,             // true if invitation was sent successfully
    clearState,          // Function to clear error and success states
  }
}

/**
 * USE RSVP HOOK
 * 
 * This hook provides functions to accept or decline trip invitations.
 * 
 * Usage:
 * const { respondToInvitation, loading, error } = useRSVP()
 * const handleAccept = () => respondToInvitation(tripId, 'approved')
 * const handleDecline = () => respondToInvitation(tripId, 'declined')
 */
export function useRSVP() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const respondToInvitation = useCallback(async (tripId: string, response: 'approved' | 'declined'): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: rsvpError } = await participantService.respondToInvitation(tripId, response)
    
    if (rsvpError) {
      setError(rsvpError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [])

  return {
    respondToInvitation, // Function to accept or decline invitation
    loading,             // true when responding, false when done
    error,               // Error message if response failed
    clearError: () => setError(null), // Function to clear error
  }
}

/**
 * USE USER INVITATIONS HOOK
 * 
 * This hook loads all pending invitations for the current user.
 * These are trips they've been invited to but haven't responded to yet.
 * 
 * Usage:
 * const { invitations, loading, error, refetch } = useUserInvitations()
 */
export function useUserInvitations() {
  const [invitations, setInvitations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInvitations = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await participantService.getUserInvitations()
    
    if (fetchError) {
      setError(fetchError)
      setInvitations([])
    } else {
      setInvitations(data || [])
    }
    
    setLoading(false)
  }, [])

  // Load invitations when component mounts
  useEffect(() => {
    fetchInvitations()
  }, [fetchInvitations])

  return {
    invitations,         // Array of pending invitations
    loading,             // true when loading, false when done
    error,               // Error message if something went wrong
    refetch: fetchInvitations, // Function to manually reload invitations
  }
}

/**
 * USE PARTICIPANT ACTIONS HOOK
 * 
 * This hook provides functions for participant management actions
 * like removing participants (organizer only).
 * 
 * Usage:
 * const { removeParticipant, loading, error } = useParticipantActions()
 */
export function useParticipantActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const removeParticipant = useCallback(async (tripId: string, participantId: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: removeError } = await participantService.removeParticipant(tripId, participantId)
    
    if (removeError) {
      setError(removeError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [])

  return {
    removeParticipant,   // Function to remove a participant
    loading,             // true when removing, false when done
    error,               // Error message if removal failed
    clearError: () => setError(null), // Function to clear error
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THESE HOOKS DO:
 * 
 * useTripParticipants(tripId) - "Show me everyone in this trip"
 * - Loads confirmed participants and pending invitations
 * - Updates automatically when people join/leave
 * - Separates real participants from email invites
 * 
 * useSendInvitation() - "Give me a function to invite people"
 * - Handles sending email invitations
 * - Shows loading state while sending
 * - Returns success or error feedback
 * 
 * useRSVP() - "Give me functions to accept/decline invitations"
 * - Handles accepting or declining trip invitations
 * - Updates participant status in database
 * - Shows loading and error states
 * 
 * useUserInvitations() - "Show me all trips I've been invited to"
 * - Loads all pending invitations for current user
 * - Updates when new invitations arrive
 * - Used for notification/invitation dashboard
 * 
 * useParticipantActions() - "Give me functions to manage participants"
 * - Remove participants (organizer only)
 * - Future: promote to co-organizer, etc.
 * - Handles permissions and error states
 */