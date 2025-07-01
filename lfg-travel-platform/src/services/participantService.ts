import { createClient } from '@/lib/supabase'
import { Tables, TablesInsert } from '@/shared/types/database'

// Type aliases for easier use
export type TripParticipant = Tables<'trip_participants'>
export type TripParticipantInsert = TablesInsert<'trip_participants'>

// Enhanced participant type with profile information
export interface ParticipantWithProfile extends TripParticipant {
  profile: {
    id: string
    full_name: string | null
    avatar_url: string | null
    email: string
  }
}

// Invitation data for sending invites
export interface InvitationData {
  tripId: string
  email: string
  message?: string
}

/**
 * PARTICIPANT MANAGEMENT SERVICE
 * 
 * This service handles all participant-related operations:
 * - Sending invitations via email
 * - Managing RSVP responses
 * - Displaying participant lists
 * - Managing participant roles
 */

export const participantService = {
  /**
   * SEND EMAIL INVITATION
   * 
   * This function invites someone to a trip via email.
   * Since you want to keep it simple, this creates a pending invitation
   * that the person can accept when they sign up or log in.
   */
  async inviteByEmail(invitationData: InvitationData): Promise<{ error: string | null; success?: boolean }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in and can invite
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to send invitations' }
      }

      // Check if user is the trip organizer
      const { data: trip } = await supabase
        .from('trips')
        .select('organizer_id, title, destination')
        .eq('id', invitationData.tripId)
        .single()

      if (!trip) {
        return { error: 'Trip not found' }
      }

      if (trip.organizer_id !== user.id) {
        return { error: 'Only the trip organizer can send invitations' }
      }

      // Check if this email is already invited
      const { data: existingInvite } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', invitationData.tripId)
        .eq('user_id', invitationData.email) // We'll use email as temporary user_id for invites
        .single()

      if (existingInvite) {
        return { error: 'This person has already been invited to this trip' }
      }

      // For now, we'll create a "pending" participant entry with email as user_id
      // In a real app, you'd also send an actual email here
      const { error: inviteError } = await supabase
        .from('trip_participants')
        .insert({
          trip_id: invitationData.tripId,
          user_id: invitationData.email, // Temporary - will be updated when they join
          status: 'pending',
          message: invitationData.message || `You're invited to join "${trip.title}" - ${trip.destination}!`,
          joined_at: new Date().toISOString(),
        })

      if (inviteError) {
        console.error('Error sending invitation:', inviteError)
        return { error: inviteError.message }
      }

      // TODO: In a real app, you would send an actual email here
      // For now, we'll just log it
      console.log(`Email invitation sent to ${invitationData.email} for trip "${trip.title}"`)

      return { error: null, success: true }
    } catch (error) {
      console.error('Unexpected error sending invitation:', error)
      return { error: 'Failed to send invitation. Please try again.' }
    }
  },

  /**
   * GET TRIP PARTICIPANTS
   * 
   * This function gets all participants for a trip with their profile info.
   * It separates confirmed participants from pending invitations.
   */
  async getTripParticipants(tripId: string): Promise<{ 
    data: { 
      participants: ParticipantWithProfile[], 
      pendingInvites: TripParticipant[] 
    } | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      // Get all participants for this trip
      const { data: participants, error } = await supabase
        .from('trip_participants')
        .select(`
          *,
          profile:profiles (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('trip_id', tripId)
        .neq('status', 'left') // Don't show people who left

      if (error) {
        console.error('Error fetching participants:', error)
        return { data: null, error: error.message }
      }

      // Separate real participants from pending email invites
      const confirmedParticipants: ParticipantWithProfile[] = []
      const pendingInvites: TripParticipant[] = []

      participants?.forEach(p => {
        if (p.profile && p.status !== 'pending') {
          // This is a real user who has joined
          confirmedParticipants.push(p as ParticipantWithProfile)
        } else {
          // This is a pending email invitation
          pendingInvites.push(p)
        }
      })

      return { 
        data: { 
          participants: confirmedParticipants, 
          pendingInvites 
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Unexpected error fetching participants:', error)
      return { data: null, error: 'Failed to load participants. Please try again.' }
    }
  },

  /**
   * RESPOND TO INVITATION (RSVP)
   * 
   * This function handles when someone accepts or declines a trip invitation.
   * It updates their participant status.
   */
  async respondToInvitation(tripId: string, response: 'approved' | 'declined'): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to respond to invitations' }
      }

      // Find the participant record for this user and trip
      const { data: participant, error: findError } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .single()

      if (findError || !participant) {
        return { error: 'Invitation not found' }
      }

      if (participant.status !== 'pending') {
        return { error: 'You have already responded to this invitation' }
      }

      // Update the participant status
      const { error: updateError } = await supabase
        .from('trip_participants')
        .update({ 
          status: response,
          joined_at: response === 'approved' ? new Date().toISOString() : participant.joined_at
        })
        .eq('id', participant.id)

      if (updateError) {
        console.error('Error updating invitation response:', updateError)
        return { error: updateError.message }
      }

      // If approved, update the trip's current participant count
      if (response === 'approved') {
        const { error: countError } = await supabase.rpc('increment', {
          table_name: 'trips',
          row_id: tripId,
          column_name: 'current_participants',
          x: 1
        })

        // If the RPC doesn't work, do it manually
        if (countError) {
          const { data: trip } = await supabase
            .from('trips')
            .select('current_participants')
            .eq('id', tripId)
            .single()

          if (trip) {
            await supabase
              .from('trips')
              .update({ current_participants: trip.current_participants + 1 })
              .eq('id', tripId)
          }
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error responding to invitation:', error)
      return { error: 'Failed to respond to invitation. Please try again.' }
    }
  },

  /**
   * REMOVE PARTICIPANT
   * 
   * This function removes someone from a trip (organizer only).
   */
  async removeParticipant(tripId: string, participantId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to remove participants' }
      }

      // Check if user is the trip organizer
      const { data: trip } = await supabase
        .from('trips')
        .select('organizer_id')
        .eq('id', tripId)
        .single()

      if (!trip || trip.organizer_id !== user.id) {
        return { error: 'Only the trip organizer can remove participants' }
      }

      // Update participant status to 'left'
      const { error } = await supabase
        .from('trip_participants')
        .update({ status: 'left' })
        .eq('id', participantId)

      if (error) {
        console.error('Error removing participant:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error removing participant:', error)
      return { error: 'Failed to remove participant. Please try again.' }
    }
  },

  /**
   * GET USER'S INVITATIONS
   * 
   * This function gets all pending invitations for the current user.
   */
  async getUserInvitations(): Promise<{ data: any[] | null; error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to view invitations' }
      }

      const { data: invitations, error } = await supabase
        .from('trip_participants')
        .select(`
          *,
          trip:trips (
            id,
            title,
            destination,
            start_date,
            end_date,
            organizer_profile:profiles!trips_organizer_id_fkey (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'pending')

      if (error) {
        console.error('Error fetching user invitations:', error)
        return { data: null, error: error.message }
      }

      return { data: invitations || [], error: null }
    } catch (error) {
      console.error('Unexpected error fetching invitations:', error)
      return { data: null, error: 'Failed to load invitations. Please try again.' }
    }
  },

  /**
   * SUBSCRIBE TO PARTICIPANT CHANGES
   * 
   * This function sets up real-time updates for participant changes.
   */
  subscribeToParticipants(tripId: string, callback: (payload: any) => void) {
    const supabase = createClient()

    const subscription = supabase
      .channel(`participants-${tripId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trip_participants',
          filter: `trip_id=eq.${tripId}`,
        },
        callback
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  },
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS SERVICE DOES:
 * 
 * participantService.inviteByEmail() - "Send an invitation to someone's email"
 * - Creates a pending invitation in the database
 * - Only trip organizers can send invites
 * - Prevents duplicate invitations
 * 
 * participantService.getTripParticipants() - "Get all people in this trip"
 * - Shows confirmed participants with their profile info
 * - Shows pending email invitations separately
 * - Excludes people who have left the trip
 * 
 * participantService.respondToInvitation() - "Accept or decline an invitation"
 * - Let invited users accept or decline trips
 * - Updates participant count when someone joins
 * - Prevents responding twice
 * 
 * participantService.removeParticipant() - "Remove someone from the trip"
 * - Only organizers can remove people
 * - Sets participant status to 'left'
 * 
 * participantService.getUserInvitations() - "Get my pending invitations"
 * - Shows all trips the user has been invited to
 * - Only shows pending invitations
 * 
 * participantService.subscribeToParticipants() - "Watch for participant changes"
 * - Real-time updates when people join/leave
 * - Updates UI automatically
 */
