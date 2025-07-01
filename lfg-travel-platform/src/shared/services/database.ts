import { createClient } from '@/lib/supabase'
import { createClient as createServerClient } from '@/lib/supabase-server'
import { Trip, Profile, TripParticipant, Message, Review, TripInsert, ProfileInsert } from '@/shared/types'

// Client-side database operations (for use in components)
export const db = {
  // Profile operations
  profiles: {
    async create(profileData: ProfileInsert) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single()
      
      return { data, error }
    },

    async getById(id: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()
      
      return { data, error }
    },

    async update(id: string, updates: Partial<Profile>) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      return { data, error }
    },

    async search(query: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
        .limit(10)
      
      return { data, error }
    }
  },

  // Trip operations
  trips: {
    async create(tripData: TripInsert) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trips')
        .insert(tripData)
        .select(`
          *,
          organizer:profiles!organizer_id(*)
        `)
        .single()
      
      return { data, error }
    },

    async getAll(limit: number = 20, offset: number = 0) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          organizer:profiles!organizer_id(*),
          participants:trip_participants(
            *,
            profile:profiles(*)
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      
      return { data, error }
    },

    async getById(id: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          organizer:profiles!organizer_id(*),
          participants:trip_participants(
            *,
            profile:profiles(*)
          )
        `)
        .eq('id', id)
        .single()
      
      return { data, error }
    },

    async getUserTrips(userId: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          organizer:profiles!organizer_id(*),
          participants:trip_participants(
            *,
            profile:profiles(*)
          )
        `)
        .eq('organizer_id', userId)
        .order('created_at', { ascending: false })
      
      return { data, error }
    },

    async update(id: string, updates: Partial<Trip>) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trips')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          organizer:profiles!organizer_id(*)
        `)
        .single()
      
      return { data, error }
    },

    async delete(id: string) {
      const supabase = createClient()
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', id)
      
      return { error }
    },

    async search(filters: {
      destination?: string
      startDate?: string
      endDate?: string
      tripType?: string
      maxBudget?: number
    }) {
      const supabase = createClient()
      let query = supabase
        .from('trips')
        .select(`
          *,
          organizer:profiles!organizer_id(*),
          participants:trip_participants(
            *,
            profile:profiles(*)
          )
        `)
        .eq('status', 'active')

      if (filters.destination) {
        query = query.ilike('destination', `%${filters.destination}%`)
      }
      if (filters.startDate) {
        query = query.gte('start_date', filters.startDate)
      }
      if (filters.endDate) {
        query = query.lte('end_date', filters.endDate)
      }
      if (filters.tripType) {
        query = query.eq('trip_type', filters.tripType)
      }
      if (filters.maxBudget) {
        query = query.lte('budget_max', filters.maxBudget)
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50)
      
      return { data, error }
    }
  },

  // Trip participation operations
  participation: {
    async joinTrip(tripId: string, userId: string, message?: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trip_participants')
        .insert({
          trip_id: tripId,
          user_id: userId,
          message,
          status: 'pending'
        })
        .select(`
          *,
          profile:profiles(*),
          trip:trips(*)
        `)
        .single()
      
      return { data, error }
    },

    async updateStatus(participantId: string, status: 'approved' | 'declined') {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trip_participants')
        .update({ status })
        .eq('id', participantId)
        .select(`
          *,
          profile:profiles(*),
          trip:trips(*)
        `)
        .single()
      
      return { data, error }
    },

    async leaveTrip(tripId: string, userId: string) {
      const supabase = createClient()
      const { error } = await supabase
        .from('trip_participants')
        .delete()
        .eq('trip_id', tripId)
        .eq('user_id', userId)
      
      return { error }
    },

    async getTripParticipants(tripId: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('trip_participants')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('trip_id', tripId)
        .order('joined_at', { ascending: true })
      
      return { data, error }
    }
  },

  // Messaging operations
  messages: {
    async send(messageData: {
      tripId?: string
      senderId: string
      recipientId?: string
      content: string
      messageType: 'direct' | 'trip_chat' | 'system'
    }) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('messages')
        .insert({
          trip_id: messageData.tripId,
          sender_id: messageData.senderId,
          recipient_id: messageData.recipientId,
          content: messageData.content,
          message_type: messageData.messageType
        })
        .select(`
          *,
          sender:profiles!sender_id(*),
          recipient:profiles!recipient_id(*)
        `)
        .single()
      
      return { data, error }
    },

    async getTripMessages(tripId: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(*)
        `)
        .eq('trip_id', tripId)
        .eq('message_type', 'trip_chat')
        .order('created_at', { ascending: true })
      
      return { data, error }
    },

    async getDirectMessages(userId1: string, userId2: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(*),
          recipient:profiles!recipient_id(*)
        `)
        .eq('message_type', 'direct')
        .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
        .order('created_at', { ascending: true })
      
      return { data, error }
    },

    async markAsRead(messageId: string) {
      const supabase = createClient()
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
      
      return { error }
    }
  },

  // Review operations
  reviews: {
    async create(reviewData: {
      tripId: string
      reviewerId: string
      revieweeId: string
      rating: number
      comment?: string
    }) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select(`
          *,
          reviewer:profiles!reviewer_id(*),
          reviewee:profiles!reviewee_id(*),
          trip:trips(*)
        `)
        .single()
      
      return { data, error }
    },

    async getUserReviews(userId: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles!reviewer_id(*),
          trip:trips(*)
        `)
        .eq('reviewee_id', userId)
        .order('created_at', { ascending: false })
      
      return { data, error }
    },

    async getTripReviews(tripId: string) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles!reviewer_id(*),
          reviewee:profiles!reviewee_id(*)
        `)
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false })
      
      return { data, error }
    }
  }
}

// Server-side database operations (for use in API routes and Server Components)
export const serverDb = {
  async getClient() {
    return await createServerClient()
  },

  // Add server-side operations here when needed
  // They follow the same pattern but use createServerClient()
}
