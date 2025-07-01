import { useState, useEffect, useCallback } from 'react'
import { tripService, Trip, TripInsert, TripUpdate, TripWithParticipants } from '@/services/tripService'

/**
 * CUSTOM REACT HOOKS FOR TRIP MANAGEMENT
 * 
 * These hooks make it easy to use trip data in your React components.
 * They handle loading states, errors, and automatic updates for you.
 * 
 * Think of hooks as "smart helpers" that:
 * - Load data from the database
 * - Track if data is loading or if there's an error
 * - Provide functions to create, update, delete trips
 * - Automatically refresh when data changes
 */

/**
 * USE TRIPS HOOK
 * 
 * This hook loads and manages all trips for the current user.
 * It automatically handles loading states and errors.
 * 
 * Usage in a component:
 * const { trips, loading, error, refetch } = useTrips()
 */
export function useTrips() {
  const [trips, setTrips] = useState<TripWithParticipants[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to load trips from database
  const fetchTrips = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await tripService.getUserTrips()
    
    if (fetchError) {
      setError(fetchError)
      setTrips([])
    } else {
      setTrips(data || [])
    }
    
    setLoading(false)
  }, [])

  // Load trips when component first mounts
  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  // Set up real-time updates
  useEffect(() => {
    const unsubscribe = tripService.subscribeToTrips((payload) => {
      console.log('Trip change detected:', payload)
      // Refresh trips when database changes
      fetchTrips()
    })

    // Clean up subscription when component unmounts
    return unsubscribe
  }, [fetchTrips])

  return {
    trips,          // Array of trip data
    loading,        // true when loading, false when done
    error,          // Error message if something went wrong
    refetch: fetchTrips, // Function to manually reload trips
  }
}

/**
 * USE SINGLE TRIP HOOK
 * 
 * This hook loads and manages data for one specific trip.
 * 
 * Usage:
 * const { trip, loading, error, refetch } = useTrip(tripId)
 */
export function useTrip(tripId: string | null) {
  const [trip, setTrip] = useState<TripWithParticipants | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrip = useCallback(async () => {
    if (!tripId) {
      setTrip(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await tripService.getTripById(tripId)
    
    if (fetchError) {
      setError(fetchError)
      setTrip(null)
    } else {
      setTrip(data)
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetchTrip()
  }, [fetchTrip])

  // Set up real-time updates for this specific trip
  useEffect(() => {
    if (!tripId) return

    const unsubscribe = tripService.subscribeToTripParticipants(tripId, (payload) => {
      console.log('Trip participant change detected:', payload)
      fetchTrip()
    })

    return unsubscribe
  }, [tripId, fetchTrip])

  return {
    trip,
    loading,
    error,
    refetch: fetchTrip,
  }
}

/**
 * USE CREATE TRIP HOOK
 * 
 * This hook provides a function to create new trips.
 * It handles loading states and errors during creation.
 * 
 * Usage:
 * const { createTrip, loading, error } = useCreateTrip()
 * const handleSubmit = () => createTrip(tripData)
 */
export function useCreateTrip() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTrip = useCallback(async (tripData: TripInsert): Promise<Trip | null> => {
    setLoading(true)
    setError(null)

    const { data, error: createError } = await tripService.createTrip(tripData)
    
    if (createError) {
      setError(createError)
      setLoading(false)
      return null
    }

    setLoading(false)
    return data
  }, [])

  return {
    createTrip,     // Function to create a new trip
    loading,        // true when creating, false when done
    error,          // Error message if creation failed
    clearError: () => setError(null), // Function to clear error
  }
}

/**
 * USE UPDATE TRIP HOOK
 * 
 * This hook provides a function to update existing trips.
 * 
 * Usage:
 * const { updateTrip, loading, error } = useUpdateTrip()
 * const handleUpdate = () => updateTrip(tripId, updates)
 */
export function useUpdateTrip() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateTrip = useCallback(async (tripId: string, updates: TripUpdate): Promise<Trip | null> => {
    setLoading(true)
    setError(null)

    const { data, error: updateError } = await tripService.updateTrip(tripId, updates)
    
    if (updateError) {
      setError(updateError)
      setLoading(false)
      return null
    }

    setLoading(false)
    return data
  }, [])

  return {
    updateTrip,
    loading,
    error,
    clearError: () => setError(null),
  }
}

/**
 * USE DELETE TRIP HOOK
 * 
 * This hook provides a function to delete trips.
 * 
 * Usage:
 * const { deleteTrip, loading, error } = useDeleteTrip()
 * const handleDelete = () => deleteTrip(tripId)
 */
export function useDeleteTrip() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteTrip = useCallback(async (tripId: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: deleteError } = await tripService.deleteTrip(tripId)
    
    if (deleteError) {
      setError(deleteError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [])

  return {
    deleteTrip,
    loading,
    error,
    clearError: () => setError(null),
  }
}

/**
 * USE TRIP ACTIONS HOOK
 * 
 * This hook provides functions for common trip actions like joining and leaving.
 * 
 * Usage:
 * const { joinTrip, leaveTrip, loading, error } = useTripActions()
 */
export function useTripActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const joinTrip = useCallback(async (tripId: string, message?: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: joinError } = await tripService.joinTrip(tripId, message)
    
    if (joinError) {
      setError(joinError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [])

  const leaveTrip = useCallback(async (tripId: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: leaveError } = await tripService.leaveTrip(tripId)
    
    if (leaveError) {
      setError(leaveError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [])

  return {
    joinTrip,
    leaveTrip,
    loading,
    error,
    clearError: () => setError(null),
  }
}

/**
 * USE OPTIMISTIC TRIPS HOOK
 * 
 * This is an advanced hook that provides "optimistic updates".
 * When you create/update/delete a trip, it immediately updates the UI
 * while saving to the database in the background.
 * 
 * Usage:
 * const { trips, createTrip, updateTrip, deleteTrip, loading, error } = useOptimisticTrips()
 */
export function useOptimisticTrips() {
  const { trips: dbTrips, loading: dbLoading, error: dbError, refetch } = useTrips()
  const [optimisticTrips, setOptimisticTrips] = useState<TripWithParticipants[]>([])
  const [pendingActions, setPendingActions] = useState<Set<string>>(new Set())

  // Use optimistic trips when we have pending actions, otherwise use database trips
  const trips = pendingActions.size > 0 ? optimisticTrips : dbTrips

  const createTrip = useCallback(async (tripData: TripInsert): Promise<Trip | null> => {
    // Create a temporary trip for immediate UI update
    const tempTrip: TripWithParticipants = {
      id: `temp-${Date.now()}`,
      ...tripData,
      organizer_id: 'current-user', // This would be the actual user ID
      current_participants: 1,
      status: tripData.status || 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      participants: [],
      organizer_profile: {
        id: 'current-user',
        full_name: 'You',
        avatar_url: null,
      },
    } as TripWithParticipants

    // Add to optimistic trips immediately
    setOptimisticTrips(prev => [tempTrip, ...prev])
    setPendingActions(prev => new Set(prev).add('create'))

    try {
      // Save to database
      const { data, error } = await tripService.createTrip(tripData)
      
      if (error) {
        // Remove from optimistic trips if failed
        setOptimisticTrips(prev => prev.filter(t => t.id !== tempTrip.id))
        throw new Error(error)
      }

      // Refresh from database to get real data
      await refetch()
      
      return data
    } finally {
      setPendingActions(prev => {
        const newSet = new Set(prev)
        newSet.delete('create')
        return newSet
      })
    }
  }, [refetch])

  return {
    trips,
    createTrip,
    loading: dbLoading,
    error: dbError,
    refetch,
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THESE HOOKS DO:
 * 
 * useTrips() - "Give me all trips for this user"
 * - Loads trips when component starts
 * - Shows loading spinner while fetching
 * - Shows error message if something goes wrong
 * - Automatically updates when trips change
 * 
 * useTrip(id) - "Give me details for one specific trip"
 * - Same as useTrips but for one trip
 * - Updates when participants join/leave
 * 
 * useCreateTrip() - "Give me a function to create new trips"
 * - Handles the complex database saving
 * - Shows loading state while saving
 * - Returns success or error
 * 
 * useUpdateTrip() - "Give me a function to update trips"
 * - Same as create but for updating existing trips
 * 
 * useDeleteTrip() - "Give me a function to delete trips"
 * - Safely removes trips from database
 * 
 * useTripActions() - "Give me functions to join/leave trips"
 * - Handles participant management
 * 
 * useOptimisticTrips() - "Advanced: Update UI immediately, save in background"
 * - Makes the app feel faster
 * - Shows changes instantly while saving
 */
