import { createClient } from '@/lib/supabase'
import { Tables, TablesInsert } from '@/shared/types/database'

// Type aliases for easier use
export type Activity = Tables<'activities'>
export type ActivityInsert = TablesInsert<'activities'>
export type ActivityParticipant = Tables<'activity_participants'>
export type ActivityParticipantInsert = TablesInsert<'activity_participants'>

// Enhanced activity type with creator and participant information
export interface ActivityWithDetails extends Activity {
  creator: {
    id: string
    full_name: string | null
    avatar_url: string | null
    email: string
  }
  participants: (ActivityParticipant & {
    profile: {
      id: string
      full_name: string | null
      avatar_url: string | null
      email: string
    }
  })[]
}

// Activity creation data
export interface CreateActivityData {
  tripId: string
  title: string
  description?: string
  location?: string
  category: 'accommodation' | 'transport' | 'food' | 'sightseeing' | 'shopping' | 'entertainment' | 'other'
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  costPerPerson?: number
  maxParticipants?: number
  bookingUrl?: string
  notes?: string
}

// Itinerary day structure
export interface ItineraryDay {
  date: string
  dayOfWeek: string
  activities: ActivityWithDetails[]
  totalCost: number
  participantCount: number
}

// Activity statistics
export interface ActivityStats {
  totalActivities: number
  totalCost: number
  averageCostPerDay: number
  categoryCounts: Record<string, number>
  participationRate: number
}

/**
 * ACTIVITY PLANNING & ITINERARY SERVICE
 * 
 * This service handles all activity and itinerary operations:
 * - Creating and managing trip activities
 * - Organizing activities into daily itineraries
 * - Managing activity participation
 * - Calculating costs and statistics
 * - Timeline-based activity display
 */

export const activityService = {
  /**
   * CREATE ACTIVITY
   * 
   * This function creates a new activity for a trip.
   * 
   * Simple explanation: Like adding an event to your trip calendar
   */
  async createActivity(activityData: CreateActivityData): Promise<{ error: string | null; data?: Activity }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to create activities' }
      }

      // Check if user is a trip participant
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', activityData.tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { error: 'Only trip participants can create activities' }
      }

      // Validate dates are within trip dates
      const { data: trip } = await supabase
        .from('trips')
        .select('start_date, end_date')
        .eq('id', activityData.tripId)
        .single()

      if (trip) {
        const activityStart = new Date(activityData.startDate)
        const tripStart = new Date(trip.start_date)
        const tripEnd = new Date(trip.end_date)

        if (activityStart < tripStart || activityStart > tripEnd) {
          return { error: 'Activity date must be within trip dates' }
        }
      }

      // Create the activity
      const { data: activity, error: activityError } = await supabase
        .from('activities')
        .insert({
          trip_id: activityData.tripId,
          creator_id: user.id,
          title: activityData.title,
          description: activityData.description,
          location: activityData.location,
          category: activityData.category,
          start_date: activityData.startDate,
          end_date: activityData.endDate,
          start_time: activityData.startTime,
          end_time: activityData.endTime,
          cost_per_person: activityData.costPerPerson,
          max_participants: activityData.maxParticipants,
          current_participants: 1, // Creator is automatically participating
          booking_url: activityData.bookingUrl,
          notes: activityData.notes,
          status: 'planned',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (activityError) {
        console.error('Error creating activity:', activityError)
        return { error: activityError.message }
      }

      // Add creator as participant
      const { error: participantError } = await supabase
        .from('activity_participants')
        .insert({
          activity_id: activity.id,
          participant_id: user.id,
          status: 'confirmed',
          joined_at: new Date().toISOString(),
        })

      if (participantError) {
        console.error('Error adding creator as participant:', participantError)
        // Try to clean up the activity if participant creation failed
        await supabase.from('activities').delete().eq('id', activity.id)
        return { error: 'Error setting up activity participation' }
      }

      return { error: null, data: activity }
    } catch (error) {
      console.error('Unexpected error creating activity:', error)
      return { error: 'Failed to create activity. Please try again.' }
    }
  },

  /**
   * GET TRIP ACTIVITIES WITH DETAILS
   * 
   * This function loads all activities for a trip with participant information.
   */
  async getTripActivities(tripId: string): Promise<{ 
    data: ActivityWithDetails[] | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to view activities' }
      }

      // Check if user is a trip participant
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { data: null, error: 'Only trip participants can view activities' }
      }

      // Get all activities for this trip with creator information
      const { data: activities, error } = await supabase
        .from('activities')
        .select(`
          *,
          creator:profiles!activities_creator_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('trip_id', tripId)
        .order('start_date', { ascending: true })
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error fetching activities:', error)
        return { data: null, error: error.message }
      }

      // Get participants for all activities
      const activityIds = activities?.map(a => a.id) || []
      if (activityIds.length === 0) {
        return { data: [], error: null }
      }

      const { data: participants, error: participantsError } = await supabase
        .from('activity_participants')
        .select(`
          *,
          profile:profiles!activity_participants_participant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .in('activity_id', activityIds)

      if (participantsError) {
        console.error('Error fetching activity participants:', participantsError)
        return { data: null, error: participantsError.message }
      }

      // Combine activities with their participants
      const activitiesWithDetails: ActivityWithDetails[] = activities?.map(activity => ({
        ...activity,
        participants: participants?.filter(p => p.activity_id === activity.id) || []
      })) || []

      return { data: activitiesWithDetails, error: null }
    } catch (error) {
      console.error('Unexpected error fetching activities:', error)
      return { data: null, error: 'Failed to load activities. Please try again.' }
    }
  },

  /**
   * ORGANIZE ACTIVITIES INTO DAILY ITINERARY
   * 
   * This function organizes activities by date to create a daily itinerary.
   * 
   * Simple explanation: Like organizing your activities into a day-by-day schedule
   */
  async getTripItinerary(tripId: string): Promise<{ 
    data: ItineraryDay[] | null
    error: string | null 
  }> {
    try {
      const { data: activities, error } = await this.getTripActivities(tripId)
      
      if (error || !activities) {
        return { data: null, error: error || 'Error loading activities' }
      }

      // Group activities by date
      const activityGroups: Record<string, ActivityWithDetails[]> = {}
      
      activities.forEach(activity => {
        const date = activity.start_date
        if (!activityGroups[date]) {
          activityGroups[date] = []
        }
        activityGroups[date].push(activity)
      })

      // Create itinerary days
      const itineraryDays: ItineraryDay[] = Object.entries(activityGroups)
        .map(([date, dayActivities]) => {
          // Sort activities by start time within each day
          dayActivities.sort((a, b) => {
            if (!a.start_time && !b.start_time) return 0
            if (!a.start_time) return 1
            if (!b.start_time) return -1
            return a.start_time.localeCompare(b.start_time)
          })

          // Calculate day statistics
          const totalCost = dayActivities.reduce((sum, activity) => 
            sum + ((activity.cost_per_person || 0) * activity.current_participants), 0
          )

          const participantCount = Math.max(...dayActivities.map(a => a.current_participants), 0)

          return {
            date,
            dayOfWeek: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
            activities: dayActivities,
            totalCost: Math.round(totalCost * 100) / 100,
            participantCount
          }
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      return { data: itineraryDays, error: null }
    } catch (error) {
      console.error('Unexpected error generating itinerary:', error)
      return { data: null, error: 'Failed to generate itinerary. Please try again.' }
    }
  },

  /**
   * JOIN ACTIVITY
   * 
   * This function allows a participant to join an activity.
   */
  async joinActivity(activityId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to join activities' }
      }

      // Get activity details
      const { data: activity } = await supabase
        .from('activities')
        .select('trip_id, max_participants, current_participants')
        .eq('id', activityId)
        .single()

      if (!activity) {
        return { error: 'Activity not found' }
      }

      // Check if user is a trip participant
      const { data: tripParticipant } = await supabase
        .from('trip_participants')
        .select('id')
        .eq('trip_id', activity.trip_id)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!tripParticipant) {
        return { error: 'Only trip participants can join activities' }
      }

      // Check if already participating
      const { data: existingParticipant } = await supabase
        .from('activity_participants')
        .select('id, status')
        .eq('activity_id', activityId)
        .eq('participant_id', user.id)
        .single()

      if (existingParticipant) {
        if (existingParticipant.status === 'confirmed') {
          return { error: 'You are already participating in this activity' }
        }
        // Update existing participation
        const { error: updateError } = await supabase
          .from('activity_participants')
          .update({ status: 'confirmed' })
          .eq('id', existingParticipant.id)

        if (updateError) {
          return { error: updateError.message }
        }
      } else {
        // Check capacity
        if (activity.max_participants && activity.current_participants >= activity.max_participants) {
          return { error: 'Activity is at maximum capacity' }
        }

        // Add new participant
        const { error: insertError } = await supabase
          .from('activity_participants')
          .insert({
            activity_id: activityId,
            participant_id: user.id,
            status: 'confirmed',
            joined_at: new Date().toISOString(),
          })

        if (insertError) {
          return { error: insertError.message }
        }
      }

      // Update activity participant count
      const { error: countError } = await supabase
        .from('activities')
        .update({ 
          current_participants: activity.current_participants + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', activityId)

      if (countError) {
        console.error('Error updating participant count:', countError)
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error joining activity:', error)
      return { error: 'Failed to join activity. Please try again.' }
    }
  },

  /**
   * LEAVE ACTIVITY
   * 
   * This function allows a participant to leave an activity.
   */
  async leaveActivity(activityId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to leave activities' }
      }

      // Get activity details
      const { data: activity } = await supabase
        .from('activities')
        .select('current_participants')
        .eq('id', activityId)
        .single()

      if (!activity) {
        return { error: 'Activity not found' }
      }

      // Remove participation
      const { error: deleteError } = await supabase
        .from('activity_participants')
        .delete()
        .eq('activity_id', activityId)
        .eq('participant_id', user.id)

      if (deleteError) {
        return { error: deleteError.message }
      }

      // Update activity participant count
      const { error: countError } = await supabase
        .from('activities')
        .update({ 
          current_participants: Math.max(0, activity.current_participants - 1),
          updated_at: new Date().toISOString()
        })
        .eq('id', activityId)

      if (countError) {
        console.error('Error updating participant count:', countError)
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error leaving activity:', error)
      return { error: 'Failed to leave activity. Please try again.' }
    }
  },

  /**
   * UPDATE ACTIVITY
   * 
   * This function updates an existing activity (only creator can update).
   */
  async updateActivity(activityId: string, updates: Partial<CreateActivityData>): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to update activities' }
      }

      // Check if user is the creator
      const { data: activity } = await supabase
        .from('activities')
        .select('creator_id')
        .eq('id', activityId)
        .single()

      if (!activity || activity.creator_id !== user.id) {
        return { error: 'Only the activity creator can make updates' }
      }

      // Update the activity
      const { error: updateError } = await supabase
        .from('activities')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', activityId)

      if (updateError) {
        console.error('Error updating activity:', updateError)
        return { error: updateError.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error updating activity:', error)
      return { error: 'Failed to update activity. Please try again.' }
    }
  },

  /**
   * DELETE ACTIVITY
   * 
   * This function deletes an activity (only creator can delete).
   */
  async deleteActivity(activityId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to delete activities' }
      }

      // Check if user is the creator
      const { data: activity } = await supabase
        .from('activities')
        .select('creator_id')
        .eq('id', activityId)
        .single()

      if (!activity || activity.creator_id !== user.id) {
        return { error: 'Only the activity creator can delete this activity' }
      }

      // Delete activity participants first (due to foreign key constraints)
      const { error: participantsError } = await supabase
        .from('activity_participants')
        .delete()
        .eq('activity_id', activityId)

      if (participantsError) {
        console.error('Error deleting activity participants:', participantsError)
        return { error: participantsError.message }
      }

      // Delete the activity
      const { error: activityError } = await supabase
        .from('activities')
        .delete()
        .eq('id', activityId)

      if (activityError) {
        console.error('Error deleting activity:', activityError)
        return { error: activityError.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error deleting activity:', error)
      return { error: 'Failed to delete activity. Please try again.' }
    }
  },

  /**
   * GET ACTIVITY STATISTICS
   * 
   * This function calculates statistics for trip activities.
   */
  async getActivityStats(tripId: string): Promise<{ 
    data: ActivityStats | null
    error: string | null 
  }> {
    try {
      const { data: activities, error } = await this.getTripActivities(tripId)
      
      if (error || !activities) {
        return { data: null, error: error || 'Error loading activities' }
      }

      // Get trip participant count for participation rate
      const supabase = createClient()
      const { data: tripParticipants } = await supabase
        .from('trip_participants')
        .select('id')
        .eq('trip_id', tripId)
        .eq('status', 'approved')

      const tripParticipantCount = tripParticipants?.length || 1

      // Calculate statistics
      const totalActivities = activities.length
      const totalCost = activities.reduce((sum, activity) => 
        sum + ((activity.cost_per_person || 0) * activity.current_participants), 0
      )

      // Get unique dates for average cost per day
      const uniqueDates = new Set(activities.map(a => a.start_date))
      const averageCostPerDay = uniqueDates.size > 0 ? totalCost / uniqueDates.size : 0

      // Count activities by category
      const categoryCounts: Record<string, number> = {}
      activities.forEach(activity => {
        categoryCounts[activity.category] = (categoryCounts[activity.category] || 0) + 1
      })

      // Calculate participation rate
      const totalParticipations = activities.reduce((sum, activity) => sum + activity.current_participants, 0)
      const maxPossibleParticipations = totalActivities * tripParticipantCount
      const participationRate = maxPossibleParticipations > 0 ? totalParticipations / maxPossibleParticipations : 0

      const stats: ActivityStats = {
        totalActivities,
        totalCost: Math.round(totalCost * 100) / 100,
        averageCostPerDay: Math.round(averageCostPerDay * 100) / 100,
        categoryCounts,
        participationRate: Math.round(participationRate * 100) / 100
      }

      return { data: stats, error: null }
    } catch (error) {
      console.error('Unexpected error calculating activity stats:', error)
      return { data: null, error: 'Failed to calculate statistics. Please try again.' }
    }
  },

  /**
   * GET ACTIVITY CATEGORIES
   * 
   * This function returns available activity categories.
   */
  getActivityCategories(): Array<{
    id: string
    label: string
    icon: string
    color: string
    description: string
  }> {
    return [
      { id: 'accommodation', label: 'Accommodation', icon: '🏨', color: 'bg-purple-100 text-purple-800', description: 'Hotels, hostels, check-in/out' },
      { id: 'transport', label: 'Transportation', icon: '🚗', color: 'bg-blue-100 text-blue-800', description: 'Flights, trains, taxis, car rentals' },
      { id: 'food', label: 'Food & Dining', icon: '🍽️', color: 'bg-orange-100 text-orange-800', description: 'Restaurants, cafes, food tours' },
      { id: 'sightseeing', label: 'Sightseeing', icon: '🏛️', color: 'bg-green-100 text-green-800', description: 'Museums, landmarks, tours' },
      { id: 'shopping', label: 'Shopping', icon: '🛍️', color: 'bg-pink-100 text-pink-800', description: 'Markets, malls, souvenirs' },
      { id: 'entertainment', label: 'Entertainment', icon: '🎭', color: 'bg-red-100 text-red-800', description: 'Shows, concerts, nightlife' },
      { id: 'other', label: 'Other', icon: '📋', color: 'bg-gray-100 text-gray-800', description: 'Miscellaneous activities' },
    ]
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS SERVICE DOES:
 * 
 * activityService.createActivity() - "Add an activity to the trip itinerary"
 * - Creates activity record with date, time, and details
 * - Automatically adds creator as participant
 * - Validates activity dates are within trip dates
 * - Sets up participation tracking
 * 
 * activityService.getTripActivities() - "Get all activities for a trip"
 * - Loads activities with creator and participant information
 * - Shows who's joining each activity
 * - Sorted by date and time for chronological order
 * - Only participants can view activities
 * 
 * activityService.getTripItinerary() - "Organize activities into daily schedule"
 * - Groups activities by date to create day-by-day itinerary
 * - Sorts activities by time within each day
 * - Calculates daily costs and participation
 * - Shows activities in timeline format
 * 
 * activityService.joinActivity() - "Join an activity"
 * - Allows participants to join activities
 * - Checks capacity limits
 * - Updates participation counts
 * - Manages participant status
 * 
 * Activity Scheduling Logic:
 * 1. Activities are scheduled for specific dates and times
 * 2. System organizes them chronologically into daily itineraries
 * 3. Each day shows activities in time order (morning to evening)
 * 4. Participants can join/leave activities independently
 * 5. System tracks costs and participation for each activity
 * 6. Timeline view shows the complete trip schedule
 */