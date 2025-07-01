'use client'

import { useState, useEffect } from 'react'
import { db } from '@/shared/services/database'
import { Trip, Profile, TripParticipant, Message, Review } from '@/shared/types'

// Hook for managing loading states and errors
export function useAsync<T>(asyncFunction: () => Promise<{ data: T | null; error: any }>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const execute = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      
      if (result.error) {
        setError(result.error.message || 'An error occurred')
        setData(null)
      } else {
        setData(result.data)
        setError(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    execute()
  }, [])

  return { data, loading, error, refetch: execute }
}

// Trips hooks
export function useTrips(limit: number = 20, offset: number = 0) {
  return useAsync(() => db.trips.getAll(limit, offset))
}

export function useTrip(tripId: string) {
  return useAsync(() => db.trips.getById(tripId))
}

export function useUserTrips(userId: string) {
  return useAsync(() => db.trips.getUserTrips(userId))
}

export function useSearchTrips(filters: {
  destination?: string
  startDate?: string
  endDate?: string
  tripType?: string
  maxBudget?: number
}) {
  return useAsync(() => db.trips.search(filters))
}

// Profile hooks
export function useProfile(userId: string) {
  return useAsync(() => db.profiles.getById(userId))
}

export function useSearchProfiles(query: string) {
  return useAsync(() => db.profiles.search(query))
}

// Trip participation hooks
export function useTripParticipants(tripId: string) {
  return useAsync(() => db.participation.getTripParticipants(tripId))
}

// Messaging hooks
export function useTripMessages(tripId: string) {
  return useAsync(() => db.messages.getTripMessages(tripId))
}

export function useDirectMessages(userId1: string, userId2: string) {
  return useAsync(() => db.messages.getDirectMessages(userId1, userId2))
}

// Reviews hooks
export function useUserReviews(userId: string) {
  return useAsync(() => db.reviews.getUserReviews(userId))
}

export function useTripReviews(tripId: string) {
  return useAsync(() => db.reviews.getTripReviews(tripId))
}

// Mutation hooks (for creating, updating, deleting)
export function useMutation<TInput, TOutput>(
  mutationFn: (input: TInput) => Promise<{ data: TOutput | null; error: any }>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (input: TInput): Promise<{ data: TOutput | null; success: boolean }> => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await mutationFn(input)
      
      if (result.error) {
        setError(result.error.message || 'An error occurred')
        return { data: null, success: false }
      }
      
      return { data: result.data, success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { data: null, success: false }
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}

// Specific mutation hooks
export function useCreateTrip() {
  return useMutation(db.trips.create)
}

export function useUpdateTrip() {
  return useMutation(({ id, updates }: { id: string; updates: Partial<Trip> }) => 
    db.trips.update(id, updates)
  )
}

export function useJoinTrip() {
  return useMutation(({ tripId, userId, message }: { tripId: string; userId: string; message?: string }) =>
    db.participation.joinTrip(tripId, userId, message)
  )
}

export function useCreateProfile() {
  return useMutation(db.profiles.create)
}

export function useUpdateProfile() {
  return useMutation(({ id, updates }: { id: string; updates: Partial<Profile> }) =>
    db.profiles.update(id, updates)
  )
}

export function useSendMessage() {
  return useMutation(db.messages.send)
}

export function useCreateReview() {
  return useMutation(db.reviews.create)
}

// Real-time hooks (for live updates)
export function useRealtimeTrips() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load initial trips
    db.trips.getAll().then(({ data, error }) => {
      if (!error && data) {
        setTrips(data)
      }
      setLoading(false)
    })

    // Set up real-time subscription
    // This will be implemented when we add real-time features
    // const subscription = supabase
    //   .channel('trips')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'trips' }, (payload) => {
    //     // Handle real-time updates
    //   })
    //   .subscribe()

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, [])

  return { trips, loading }
}

export function useRealtimeMessages(tripId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load initial messages
    db.messages.getTripMessages(tripId).then(({ data, error }) => {
      if (!error && data) {
        setMessages(data)
      }
      setLoading(false)
    })

    // Set up real-time subscription for new messages
    // This will be implemented when we add real-time features
  }, [tripId])

  return { messages, loading }
}