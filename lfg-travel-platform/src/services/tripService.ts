import { createClient } from '@/lib/supabase'
import { Tables, TablesInsert, TablesUpdate } from '@/shared/types/database'

// Type aliases for easier use
export type Trip = Tables<'trips'>
export type TripInsert = TablesInsert<'trips'>
export type TripUpdate = TablesUpdate<'trips'>
export type TripParticipant = Tables<'trip_participants'>

// Enhanced trip type that includes participant information
export interface TripWithParticipants extends Trip {
  participants: {
    id: string
    status: string
    profile: {
      id: string
      full_name: string | null
      avatar_url: string | null
    }
  }[]
  organizer_profile: {
    id: string
    full_name: string | null
    avatar_url: string | null
  }
}

/**
 * TRIP SERVICE FUNCTIONS
 * 
 * These functions handle all database operations for trips.
 * Think of them as "helpers" that know how to save, load, and update trip data.
 */

export const tripService = {
  /**
   * CREATE A NEW TRIP
   * 
   * This function saves a new trip to the database.
   * - Takes trip data from your creation form
   * - Saves it to the 'trips' table in Supabase
   * - Returns the created trip or an error
   */
  async createTrip(tripData: TripInsert): Promise<{ data: Trip | null; error: string | null }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to create a trip' }
      }

      // Add the user as the trip organizer and set defaults
      const tripToInsert: TripInsert = {
        ...tripData,
        organizer_id: user.id,
        current_participants: 1, // Creator is always the first participant
        status: tripData.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Save the trip to database
      const { data, error } = await supabase
        .from('trips')
        .insert(tripToInsert)
        .select()
        .single()

      if (error) {
        console.error('Error creating trip:', error)
        return { data: null, error: error.message }
      }

      // Add creator as the first participant
      await supabase
        .from('trip_participants')
        .insert({
          trip_id: data.id,
          user_id: user.id,
          status: 'approved',
          joined_at: new Date().toISOString(),
        })

      return { data, error: null }
    } catch (error) {
      console.error('Unexpected error creating trip:', error)
      return { data: null, error: 'Failed to create trip. Please try again.' }
    }
  },

  /**
   * GET ALL TRIPS FOR A USER
   * 
   * This function loads all trips that a user is involved in.
   * - Gets trips where user is organizer OR participant
   * - Includes participant information and organizer profile
   * - Returns formatted data ready for display
   */
  async getUserTrips(userId?: string): Promise<{ data: TripWithParticipants[] | null; error: string | null }> {
    try {
      const supabase = createClient()

      // Get current user if not provided
      let currentUserId = userId
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return { data: null, error: 'You must be logged in to view trips' }
        }
        currentUserId = user.id
      }

      // Get trips where user is organizer OR participant
      const { data: tripsData, error: tripsError } = await supabase
        .from('trips')
        .select(`
          *,
          organizer_profile:profiles!trips_organizer_id_fkey (
            id,
            full_name,
            avatar_url
          ),
          participants:trip_participants (
            id,
            status,
            profile:profiles (
              id,
              full_name,
              avatar_url
            )
          )
        `)
        .or(`organizer_id.eq.${currentUserId},id.in.(${await getUserParticipantTripIds(currentUserId)})`)
        .order('created_at', { ascending: false })

      if (tripsError) {
        console.error('Error fetching trips:', tripsError)
        return { data: null, error: tripsError.message }
      }

      return { data: tripsData as TripWithParticipants[], error: null }
    } catch (error) {
      console.error('Unexpected error fetching trips:', error)
      return { data: null, error: 'Failed to load trips. Please try again.' }
    }
  },

  /**
   * GET A SINGLE TRIP BY ID
   * 
   * This function loads detailed information about one specific trip.
   * - Gets trip data including all participants
   * - Includes organizer profile information
   * - Used for trip detail pages
   */
  async getTripById(tripId: string): Promise<{ data: TripWithParticipants | null; error: string | null }> {
    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          organizer_profile:profiles!trips_organizer_id_fkey (
            id,
            full_name,
            avatar_url
          ),
          participants:trip_participants (
            id,
            status,
            profile:profiles (
              id,
              full_name,
              avatar_url
            )
          )
        `)
        .eq('id', tripId)
        .single()

      if (error) {
        console.error('Error fetching trip:', error)
        return { data: null, error: error.message }
      }

      return { data: data as TripWithParticipants, error: null }
    } catch (error) {
      console.error('Unexpected error fetching trip:', error)
      return { data: null, error: 'Failed to load trip. Please try again.' }
    }
  },

  /**
   * UPDATE AN EXISTING TRIP
   * 
   * This function updates trip information in the database.
   * - Only the trip organizer can update trip details
   * - Updates the 'updated_at' timestamp automatically
   */
  async updateTrip(tripId: string, updates: TripUpdate): Promise<{ data: Trip | null; error: string | null }> {
    try {
      const supabase = createClient()

      // Verify user has permission to update this trip
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to update a trip' }
      }

      // Check if user is the organizer
      const { data: trip } = await supabase
        .from('trips')
        .select('organizer_id')
        .eq('id', tripId)
        .single()

      if (!trip || trip.organizer_id !== user.id) {
        return { data: null, error: 'You can only update trips you organized' }
      }

      // Update the trip
      const { data, error } = await supabase
        .from('trips')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', tripId)
        .select()
        .single()

      if (error) {
        console.error('Error updating trip:', error)
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Unexpected error updating trip:', error)
      return { data: null, error: 'Failed to update trip. Please try again.' }
    }
  },

  /**
   * DELETE A TRIP
   * 
   * This function removes a trip from the database.
   * - Only the trip organizer can delete trips
   * - Also removes all participants and related data
   */
  async deleteTrip(tripId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      // Verify user has permission to delete this trip
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to delete a trip' }
      }

      // Check if user is the organizer
      const { data: trip } = await supabase
        .from('trips')
        .select('organizer_id')
        .eq('id', tripId)
        .single()

      if (!trip || trip.organizer_id !== user.id) {
        return { error: 'You can only delete trips you organized' }
      }

      // Delete trip participants first (due to foreign key constraints)
      await supabase
        .from('trip_participants')
        .delete()
        .eq('trip_id', tripId)

      // Delete the trip
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId)

      if (error) {
        console.error('Error deleting trip:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error deleting trip:', error)
      return { error: 'Failed to delete trip. Please try again.' }
    }
  },

  /**
   * JOIN A TRIP
   * 
   * This function adds a user to a trip as a participant.
   * - Adds user to trip_participants table
   * - Updates participant count on the trip
   */
  async joinTrip(tripId: string, message?: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to join a trip' }
      }

      // Check if user is already a participant
      const { data: existingParticipant } = await supabase
        .from('trip_participants')
        .select('id')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .single()

      if (existingParticipant) {
        return { error: 'You are already a participant in this trip' }
      }

      // Add as participant
      const { error: participantError } = await supabase
        .from('trip_participants')
        .insert({
          trip_id: tripId,
          user_id: user.id,
          status: 'pending',
          joined_at: new Date().toISOString(),
          message,
        })

      if (participantError) {
        console.error('Error joining trip:', participantError)
        return { error: participantError.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error joining trip:', error)
      return { error: 'Failed to join trip. Please try again.' }
    }
  },

  /**
   * LEAVE A TRIP
   * 
   * This function removes a user from a trip.
   * - Updates participant status to 'left'
   * - Updates participant count on the trip
   */
  async leaveTrip(tripId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to leave a trip' }
      }

      // Update participant status to 'left'
      const { error } = await supabase
        .from('trip_participants')
        .update({ status: 'left' })
        .eq('trip_id', tripId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error leaving trip:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error leaving trip:', error)
      return { error: 'Failed to leave trip. Please try again.' }
    }
  },

  /**
   * SUBSCRIBE TO TRIP CHANGES
   * 
   * This function sets up real-time updates for trip changes.
   * - Listens for database changes using Supabase real-time
   * - Calls your callback function when data changes
   * - Returns a function to unsubscribe when component unmounts
   */
  subscribeToTrips(callback: (payload: any) => void) {
    const supabase = createClient()

    const subscription = supabase
      .channel('trips-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'trips',
        },
        callback
      )
      .subscribe()

    // Return unsubscribe function
    return () => {
      subscription.unsubscribe()
    }
  },

  /**
   * SUBSCRIBE TO TRIP PARTICIPANTS CHANGES
   * 
   * This function sets up real-time updates for participant changes.
   * - Listens for when people join/leave trips
   * - Updates your UI automatically
   */
  subscribeToTripParticipants(tripId: string, callback: (payload: any) => void) {
    const supabase = createClient()

    const subscription = supabase
      .channel(`trip-participants-${tripId}`)
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
 * HELPER FUNCTION: Get Trip IDs where user is a participant
 * 
 * This is used internally to find trips where the user is a participant
 * (not the organizer).
 */
async function getUserParticipantTripIds(userId: string): Promise<string> {
  const supabase = createClient()
  
  const { data } = await supabase
    .from('trip_participants')
    .select('trip_id')
    .eq('user_id', userId)
    .neq('status', 'left')

  if (!data || data.length === 0) {
    return 'none' // Return something that won't match any IDs
  }

  return data.map(p => p.trip_id).join(',')
}

/**
 * SERVER-SIDE FUNCTIONS
 * 
 * These functions are for use in server components or API routes
 * where you need to access the database from the server side.
 * 
 * Note: Server-side functions have been temporarily removed to avoid build issues.
 * They can be re-added when needed for server-side rendering.
 */