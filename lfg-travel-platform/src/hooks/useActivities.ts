import { useState, useEffect, useCallback } from 'react'
import { 
  activityService, 
  ActivityWithDetails, 
  CreateActivityData, 
  ItineraryDay,
  ActivityStats
} from '@/services/activityService'

/**
 * ACTIVITY MANAGEMENT HOOKS
 * 
 * These hooks provide easy-to-use React state management for activity features.
 * Each hook handles loading, error states, and automatic updates.
 */

/**
 * HOOK: useTripActivities
 * 
 * Loads and manages activity list for a trip
 * Simple explanation: Like having a list of all planned activities that updates automatically
 */
export function useTripActivities(tripId: string) {
  const [activities, setActivities] = useState<ActivityWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadActivities = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: activityError } = await activityService.getTripActivities(tripId)
    
    if (activityError) {
      setError(activityError)
      setActivities([])
    } else {
      setActivities(data || [])
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadActivities()
  }, [loadActivities])

  return {
    activities,
    loading,
    error,
    refetch: loadActivities,
    isEmpty: !loading && activities.length === 0
  }
}

/**
 * HOOK: useTripItinerary
 * 
 * Organizes activities into daily itinerary
 * Simple explanation: Like having a day-by-day schedule that shows what happens when
 */
export function useTripItinerary(tripId: string) {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadItinerary = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: itineraryError } = await activityService.getTripItinerary(tripId)
    
    if (itineraryError) {
      setError(itineraryError)
      setItinerary([])
    } else {
      setItinerary(data || [])
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadItinerary()
  }, [loadItinerary])

  // Calculate totals across all days
  const totalActivities = itinerary.reduce((sum, day) => sum + day.activities.length, 0)
  const totalCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0)
  const averageCostPerDay = itinerary.length > 0 ? totalCost / itinerary.length : 0

  return {
    itinerary,
    loading,
    error,
    refetch: loadItinerary,
    isEmpty: !loading && itinerary.length === 0,
    totalActivities,
    totalCost: Math.round(totalCost * 100) / 100,
    averageCostPerDay: Math.round(averageCostPerDay * 100) / 100,
    totalDays: itinerary.length
  }
}

/**
 * HOOK: useAddActivity
 * 
 * Provides function to add new activities with loading states
 * Simple explanation: Like having an "Add to Itinerary" button that handles everything
 */
export function useAddActivity() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addActivity = useCallback(async (activityData: CreateActivityData) => {
    setLoading(true)
    setError(null)

    const result = await activityService.createActivity(activityData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true, data: result.data }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    addActivity,
    loading,
    error,
    clearError
  }
}

/**
 * HOOK: useActivityActions
 * 
 * Provides actions for managing activities (join, leave, update, delete)
 * Simple explanation: Like having activity management tools
 */
export function useActivityActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const joinActivity = useCallback(async (activityId: string) => {
    setLoading(true)
    setError(null)

    const result = await activityService.joinActivity(activityId)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true }
  }, [])

  const leaveActivity = useCallback(async (activityId: string) => {
    setLoading(true)
    setError(null)

    const result = await activityService.leaveActivity(activityId)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true }
  }, [])

  const updateActivity = useCallback(async (activityId: string, updates: Partial<CreateActivityData>) => {
    setLoading(true)
    setError(null)

    const result = await activityService.updateActivity(activityId, updates)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true }
  }, [])

  const deleteActivity = useCallback(async (activityId: string) => {
    setLoading(true)
    setError(null)

    const result = await activityService.deleteActivity(activityId)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    joinActivity,
    leaveActivity,
    updateActivity,
    deleteActivity,
    loading,
    error,
    clearError
  }
}

/**
 * HOOK: useActivityStats
 * 
 * Calculates and tracks activity statistics
 * Simple explanation: Like having a dashboard showing activity metrics
 */
export function useActivityStats(tripId: string) {
  const [stats, setStats] = useState<ActivityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: statsError } = await activityService.getActivityStats(tripId)
    
    if (statsError) {
      setError(statsError)
      setStats(null)
    } else {
      setStats(data)
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  return {
    stats,
    loading,
    error,
    refetch: loadStats,
    isEmpty: !loading && !stats
  }
}

/**
 * HOOK: useActivityCategories
 * 
 * Provides activity categories for forms and displays
 * Simple explanation: Like having preset activity types for organization
 */
export function useActivityCategories() {
  const categories = activityService.getActivityCategories()
  
  const getCategoryById = useCallback((categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)
  }, [categories])

  const getCategoryColor = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.color || 'bg-gray-100 text-gray-800'
  }, [getCategoryById])

  const getCategoryIcon = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.icon || '📋'
  }, [getCategoryById])

  const getCategoryLabel = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.label || 'Other'
  }, [getCategoryById])

  const getCategoryDescription = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.description || 'Miscellaneous activities'
  }, [getCategoryById])

  return {
    categories,
    getCategoryById,
    getCategoryColor,
    getCategoryIcon,
    getCategoryLabel,
    getCategoryDescription
  }
}

/**
 * HOOK: useActivityValidation
 * 
 * Provides validation functions for activity forms
 * Simple explanation: Like having form validation that catches mistakes
 */
export function useActivityValidation() {
  const validateActivityData = useCallback((data: Partial<CreateActivityData>) => {
    const errors: Record<string, string> = {}

    if (!data.title || data.title.trim().length === 0) {
      errors.title = 'Activity title is required'
    } else if (data.title.trim().length > 100) {
      errors.title = 'Title must be less than 100 characters'
    }

    if (!data.startDate) {
      errors.startDate = 'Start date is required'
    } else {
      const startDate = new Date(data.startDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (startDate < today) {
        errors.startDate = 'Start date cannot be in the past'
      }
    }

    if (data.endDate && data.startDate) {
      const startDate = new Date(data.startDate)
      const endDate = new Date(data.endDate)
      
      if (endDate < startDate) {
        errors.endDate = 'End date cannot be before start date'
      }
    }

    if (data.startTime && data.endTime && data.startDate === data.endDate) {
      if (data.endTime <= data.startTime) {
        errors.endTime = 'End time must be after start time'
      }
    }

    if (!data.category) {
      errors.category = 'Activity category is required'
    }

    if (data.costPerPerson !== undefined && data.costPerPerson < 0) {
      errors.costPerPerson = 'Cost cannot be negative'
    }

    if (data.maxParticipants !== undefined && data.maxParticipants < 1) {
      errors.maxParticipants = 'Maximum participants must be at least 1'
    }

    if (!data.tripId) {
      errors.tripId = 'Trip ID is required'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }, [])

  return {
    validateActivityData
  }
}

/**
 * HOOK: useActivitySearch
 * 
 * Provides search and filtering functionality for activities
 * Simple explanation: Like having a search bar for your itinerary
 */
export function useActivitySearch(activities: ActivityWithDetails[]) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')

  const filteredActivities = useCallback(() => {
    let filtered = activities

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(term) ||
        activity.description?.toLowerCase().includes(term) ||
        activity.location?.toLowerCase().includes(term)
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(activity => activity.category === selectedCategory)
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(activity => activity.start_date === selectedDate)
    }

    return filtered
  }, [activities, searchTerm, selectedCategory, selectedDate])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedDate('')
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
    filteredActivities: filteredActivities(),
    clearFilters,
    hasActiveFilters: Boolean(searchTerm || selectedCategory || selectedDate)
  }
}

/**
 * COMBINED HOOK: useActivityManager
 * 
 * Combines all activity functionality for a trip
 * Simple explanation: Like having a complete activity management dashboard
 */
export function useActivityManager(tripId: string) {
  const activities = useTripActivities(tripId)
  const itinerary = useTripItinerary(tripId)
  const stats = useActivityStats(tripId)
  const addActivity = useAddActivity()
  const actions = useActivityActions()
  const categories = useActivityCategories()
  const validation = useActivityValidation()
  const search = useActivitySearch(activities.activities)

  // Refresh all data after changes
  const refreshAll = useCallback(async () => {
    await Promise.all([
      activities.refetch(),
      itinerary.refetch(),
      stats.refetch()
    ])
  }, [activities.refetch, itinerary.refetch, stats.refetch])

  // Add activity with auto-refresh
  const addActivityWithRefresh = useCallback(async (activityData: CreateActivityData) => {
    const result = await addActivity.addActivity(activityData)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [addActivity.addActivity, refreshAll])

  // Join activity with auto-refresh
  const joinActivityWithRefresh = useCallback(async (activityId: string) => {
    const result = await actions.joinActivity(activityId)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [actions.joinActivity, refreshAll])

  // Leave activity with auto-refresh
  const leaveActivityWithRefresh = useCallback(async (activityId: string) => {
    const result = await actions.leaveActivity(activityId)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [actions.leaveActivity, refreshAll])

  // Update activity with auto-refresh
  const updateActivityWithRefresh = useCallback(async (activityId: string, updates: Partial<CreateActivityData>) => {
    const result = await actions.updateActivity(activityId, updates)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [actions.updateActivity, refreshAll])

  // Delete activity with auto-refresh
  const deleteActivityWithRefresh = useCallback(async (activityId: string) => {
    const result = await actions.deleteActivity(activityId)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [actions.deleteActivity, refreshAll])

  const loading = activities.loading || itinerary.loading || stats.loading
  const hasData = activities.activities.length > 0

  return {
    // Data
    activities: activities.activities,
    itinerary: itinerary.itinerary,
    stats: stats.stats,
    
    // States
    loading,
    hasData,
    
    // Totals
    totalActivities: itinerary.totalActivities,
    totalCost: itinerary.totalCost,
    averageCostPerDay: itinerary.averageCostPerDay,
    totalDays: itinerary.totalDays,
    
    // Actions
    addActivity: addActivityWithRefresh,
    joinActivity: joinActivityWithRefresh,
    leaveActivity: leaveActivityWithRefresh,
    updateActivity: updateActivityWithRefresh,
    deleteActivity: deleteActivityWithRefresh,
    refreshAll,
    
    // Search and filtering
    search,
    
    // Utilities
    categories: categories.categories,
    getCategoryColor: categories.getCategoryColor,
    getCategoryIcon: categories.getCategoryIcon,
    getCategoryLabel: categories.getCategoryLabel,
    getCategoryDescription: categories.getCategoryDescription,
    validateActivityData: validation.validateActivityData,
    
    // Individual hook states
    addActivityLoading: addActivity.loading,
    addActivityError: addActivity.error,
    clearAddActivityError: addActivity.clearError,
    
    actionLoading: actions.loading,
    actionError: actions.error,
    clearActionError: actions.clearError,
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THESE HOOKS DO:
 * 
 * useTripActivities() - "Show me all activities for this trip"
 * - Loads activity list with automatic loading and error states
 * - Shows who created and who's joining each activity
 * - Automatically refreshes when needed
 * 
 * useTripItinerary() - "Organize activities into daily schedule"
 * - Groups activities by date to create day-by-day itinerary
 * - Shows activities in chronological order within each day
 * - Calculates costs and statistics for each day
 * 
 * useAddActivity() - "Let me add a new activity"
 * - Provides function to create activities with validation
 * - Handles loading states during creation
 * - Shows success/error feedback
 * 
 * useActivityActions() - "Give me activity management tools"
 * - Join/leave activities
 * - Update activity details (if creator)
 * - Delete activities (if creator)
 * - All with proper loading and error handling
 * 
 * useActivityManager() - "Give me everything for activity management"
 * - Combines all hooks into one complete system
 * - Handles auto-refresh after changes
 * - Provides all tools needed for activity planning
 * 
 * These hooks make it super easy to use activities in React components:
 * - No need to manage loading states manually
 * - Automatic error handling
 * - Data stays in sync across components
 * - Clean, predictable API for all activity operations
 * - Search and filtering built-in
 * - Complete itinerary management
 */
