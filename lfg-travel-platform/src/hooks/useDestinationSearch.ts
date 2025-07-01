/**
 * React Hook for Destination Search
 * Provides debounced search, loading states, and error handling
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { Destination, DestinationSearchResult } from '@/services/googlePlacesService'

// API endpoint (we'll create this next)
const searchDestinations = async (query: string): Promise<DestinationSearchResult> => {
  const response = await fetch('/api/destinations/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, limit: 10 }),
  })

  if (!response.ok) {
    throw new Error('Failed to search destinations')
  }

  return response.json()
}

export interface UseDestinationSearchProps {
  debounceMs?: number
  minQueryLength?: number
  autoSearch?: boolean
}

export interface UseDestinationSearchReturn {
  // Search state
  query: string
  setQuery: (query: string) => void
  isLoading: boolean
  error: string | null
  
  // Results
  destinations: Destination[]
  hasMore: boolean
  source: 'google' | 'fallback'
  
  // Selected destination
  selectedDestination: Destination | null
  selectDestination: (destination: Destination | null) => void
  
  // Actions
  search: (query: string) => Promise<void>
  clearResults: () => void
  clearError: () => void
  
  // Popular destinations
  popularDestinations: Destination[]
  showPopular: boolean
}

export function useDestinationSearch({
  debounceMs = 300,
  minQueryLength = 2,
  autoSearch = true
}: UseDestinationSearchProps = {}): UseDestinationSearchReturn {
  
  // Search state
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Results state
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [source, setSource] = useState<'google' | 'fallback'>('fallback')
  
  // Selected destination
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  
  // Popular destinations (shown when no query)
  const [popularDestinations] = useState<Destination[]>([
    {
      id: 'paris-france',
      name: 'Paris',
      description: 'Paris, France',
      type: 'city',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      country: 'France',
      region: 'Île-de-France',
      photos: []
    },
    {
      id: 'london-uk',
      name: 'London',
      description: 'London, United Kingdom',
      type: 'city',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      country: 'United Kingdom',
      region: 'England',
      photos: []
    },
    {
      id: 'tokyo-japan',
      name: 'Tokyo',
      description: 'Tokyo, Japan',
      type: 'city',
      coordinates: { lat: 35.6762, lng: 139.6503 },
      country: 'Japan',
      region: 'Kantō',
      photos: []
    },
    {
      id: 'bali-indonesia',
      name: 'Bali',
      description: 'Bali, Indonesia',
      type: 'region',
      coordinates: { lat: -8.3405, lng: 115.0920 },
      country: 'Indonesia',
      region: 'Bali',
      photos: []
    },
    {
      id: 'barcelona-spain',
      name: 'Barcelona',
      description: 'Barcelona, Spain',
      type: 'city',
      coordinates: { lat: 41.3851, lng: 2.1734 },
      country: 'Spain',
      region: 'Catalonia',
      photos: []
    }
  ])

  // Refs for debouncing
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Search function
  const search = useCallback(async (searchQuery: string) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Don't search if query is too short
    if (searchQuery.length < minQueryLength) {
      setDestinations([])
      setHasMore(false)
      setSource('fallback')
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    // Create new abort controller
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const result = await searchDestinations(searchQuery)
      
      // Only update if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setDestinations(result.destinations)
        setHasMore(result.hasMore)
        setSource(result.source)
      }
    } catch (err) {
      // Only show error if this request wasn't aborted
      if (!abortController.signal.aborted) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to search destinations')
        }
        setDestinations([])
        setHasMore(false)
      }
    } finally {
      // Only update loading if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [minQueryLength])

  // Debounced search effect
  useEffect(() => {
    if (!autoSearch) return

    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      search(query)
    }, debounceMs)

    // Cleanup
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [query, search, debounceMs, autoSearch])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Actions
  const selectDestination = useCallback((destination: Destination | null) => {
    setSelectedDestination(destination)
    if (destination) {
      setQuery(destination.name)
    }
  }, [])

  const clearResults = useCallback(() => {
    setDestinations([])
    setHasMore(false)
    setSource('fallback')
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const showPopular = query.length < minQueryLength && destinations.length === 0

  return {
    // Search state
    query,
    setQuery,
    isLoading,
    error,
    
    // Results
    destinations,
    hasMore,
    source,
    
    // Selected destination
    selectedDestination,
    selectDestination,
    
    // Actions
    search,
    clearResults,
    clearError,
    
    // Popular destinations
    popularDestinations,
    showPopular
  }
}
