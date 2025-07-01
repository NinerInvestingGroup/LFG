/**
 * Google Places API Service for Travel Destinations
 * Provides autocomplete search, destination details, and photos
 */

import { Client } from '@googlemaps/google-maps-services-js'

// Types for our destination system
export interface Destination {
  id: string
  name: string
  description: string
  type: 'city' | 'country' | 'landmark' | 'region'
  coordinates: {
    lat: number
    lng: number
  }
  country: string
  region?: string
  photos: string[]
  placeId?: string
  formatted_address?: string
}

export interface DestinationSearchResult {
  destinations: Destination[]
  hasMore: boolean
  source: 'google' | 'fallback'
}

// Travel-specific place types that we want to include
const TRAVEL_PLACE_TYPES = [
  'locality',           // Cities
  'country',           // Countries
  'administrative_area_level_1', // States/Provinces
  'tourist_attraction', // Tourist spots
  'natural_feature',   // Natural landmarks
  'point_of_interest', // Points of interest
  'airport',           // Airports
  'establishment'      // Businesses/landmarks
]

// Place types to exclude (too specific for travel planning)
const EXCLUDED_PLACE_TYPES = [
  'street_address',
  'route',
  'street_number',
  'postal_code',
  'plus_code'
]

class GooglePlacesService {
  private client: Client
  private apiKey: string
  private requestCount: number = 0
  private dailyLimit: number
  private perMinuteLimit: number
  private lastMinute: number = 0
  private minuteRequestCount: number = 0

  constructor() {
    this.client = new Client({})
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || ''
    this.dailyLimit = parseInt(process.env.GOOGLE_PLACES_DAILY_LIMIT || '1000')
    this.perMinuteLimit = parseInt(process.env.GOOGLE_PLACES_PER_MINUTE_LIMIT || '100')

    if (!this.apiKey || this.apiKey === 'your_google_places_api_key_here') {
      console.warn('Google Places API key not configured. Using fallback destinations only.')
    }
  }

  /**
   * Check if we're within API usage limits
   */
  private checkRateLimit(): boolean {
    const currentMinute = Math.floor(Date.now() / 60000)
    
    if (currentMinute !== this.lastMinute) {
      this.lastMinute = currentMinute
      this.minuteRequestCount = 0
    }

    if (this.minuteRequestCount >= this.perMinuteLimit) {
      console.warn('Google Places API: Per-minute rate limit reached')
      return false
    }

    if (this.requestCount >= this.dailyLimit) {
      console.warn('Google Places API: Daily rate limit reached')
      return false
    }

    return true
  }

  /**
   * Increment request counters
   */
  private incrementCounters() {
    this.requestCount++
    this.minuteRequestCount++
  }

  /**
   * Check if a place is suitable for travel destinations
   */
  private isTravelDestination(place: any): boolean {
    const types = place.types || []
    
    // Exclude unwanted types
    if (types.some((type: string) => EXCLUDED_PLACE_TYPES.includes(type))) {
      return false
    }

    // Include if it has any travel-related types
    return types.some((type: string) => TRAVEL_PLACE_TYPES.includes(type))
  }

  /**
   * Determine destination type from Google Places types
   */
  private getDestinationType(types: string[]): Destination['type'] {
    if (types.includes('country')) return 'country'
    if (types.includes('locality') || types.includes('administrative_area_level_1')) return 'city'
    if (types.includes('tourist_attraction') || types.includes('natural_feature')) return 'landmark'
    return 'region'
  }

  /**
   * Search for destinations using Google Places Autocomplete
   */
  async searchDestinations(query: string, limit: number = 10): Promise<DestinationSearchResult> {
    // Return fallback if no API key or rate limited
    if (!this.apiKey || this.apiKey === 'your_google_places_api_key_here' || !this.checkRateLimit()) {
      return this.getFallbackDestinations(query, limit)
    }

    try {
      this.incrementCounters()

      const response = await this.client.placeAutocomplete({
        params: {
          input: query,
          key: this.apiKey,
          language: 'en',
        }
      })

      const destinations: Destination[] = []

      for (const prediction of response.data.predictions.slice(0, limit)) {
        // Filter for travel destinations
        if (!this.isTravelDestination(prediction)) {
          continue
        }

        try {
          // Get place details for coordinates and photos
          const detailsResponse = await this.client.placeDetails({
            params: {
              place_id: prediction.place_id,
              key: this.apiKey,
              fields: ['geometry', 'photos', 'types', 'address_components', 'formatted_address']
            }
          })

          const details = detailsResponse.data.result
          const photos = await this.getPlacePhotos(details.photos || [])

          // Extract country and region from address components
          const addressComponents = details.address_components || []
          let country = ''
          let region = ''

          for (const component of addressComponents) {
            if (component.types.includes('country' as any)) {
              country = component.long_name
            }
            if (component.types.includes('administrative_area_level_1' as any)) {
              region = component.long_name
            }
          }

          const destination: Destination = {
            id: prediction.place_id,
            name: prediction.structured_formatting?.main_text || prediction.description,
            description: prediction.description,
            type: this.getDestinationType(details.types || []),
            coordinates: {
              lat: details.geometry?.location.lat || 0,
              lng: details.geometry?.location.lng || 0
            },
            country,
            region,
            photos,
            placeId: prediction.place_id,
            formatted_address: details.formatted_address
          }

          destinations.push(destination)

        } catch (detailsError) {
          console.warn('Failed to get place details:', detailsError)
          // Add without detailed info
          destinations.push({
            id: prediction.place_id,
            name: prediction.structured_formatting?.main_text || prediction.description,
            description: prediction.description,
            type: 'city',
            coordinates: { lat: 0, lng: 0 },
            country: '',
            photos: [],
            placeId: prediction.place_id
          })
        }
      }

      return {
        destinations,
        hasMore: response.data.predictions.length >= limit,
        source: 'google'
      }

    } catch (error) {
      console.error('Google Places API error:', error)
      return this.getFallbackDestinations(query, limit)
    }
  }

  /**
   * Get photos from Google Places
   */
  private async getPlacePhotos(photos: any[], maxPhotos: number = 3): Promise<string[]> {
    if (!photos.length || !this.checkRateLimit()) {
      return []
    }

    const photoUrls: string[] = []

    for (const photo of photos.slice(0, maxPhotos)) {
      try {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${this.apiKey}`
        photoUrls.push(photoUrl)
      } catch (error) {
        console.warn('Failed to get photo URL:', error)
      }
    }

    return photoUrls
  }

  /**
   * Fallback destinations for when API is unavailable
   */
  private getFallbackDestinations(query: string, limit: number): DestinationSearchResult {
    const popularDestinations: Destination[] = [
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
        id: 'new-york-usa',
        name: 'New York',
        description: 'New York, NY, USA',
        type: 'city',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        country: 'United States',
        region: 'New York',
        photos: []
      },
      {
        id: 'bangkok-thailand',
        name: 'Bangkok',
        description: 'Bangkok, Thailand',
        type: 'city',
        coordinates: { lat: 13.7563, lng: 100.5018 },
        country: 'Thailand',
        region: 'Bangkok',
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
        id: 'sydney-australia',
        name: 'Sydney',
        description: 'Sydney, NSW, Australia',
        type: 'city',
        coordinates: { lat: -33.8688, lng: 151.2093 },
        country: 'Australia',
        region: 'New South Wales',
        photos: []
      },
      {
        id: 'dubai-uae',
        name: 'Dubai',
        description: 'Dubai, UAE',
        type: 'city',
        coordinates: { lat: 25.2048, lng: 55.2708 },
        country: 'United Arab Emirates',
        region: 'Dubai',
        photos: []
      },
      {
        id: 'rome-italy',
        name: 'Rome',
        description: 'Rome, Italy',
        type: 'city',
        coordinates: { lat: 41.9028, lng: 12.4964 },
        country: 'Italy',
        region: 'Lazio',
        photos: []
      }
    ]

    const filtered = popularDestinations.filter(dest =>
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase()) ||
      dest.country.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit)

    return {
      destinations: filtered,
      hasMore: false,
      source: 'fallback'
    }
  }

  /**
   * Get detailed information about a specific destination
   */
  async getDestinationDetails(placeId: string): Promise<Destination | null> {
    if (!this.apiKey || this.apiKey === 'your_google_places_api_key_here' || !this.checkRateLimit()) {
      return null
    }

    try {
      this.incrementCounters()

      const response = await this.client.placeDetails({
        params: {
          place_id: placeId,
          key: this.apiKey,
          fields: ['name', 'geometry', 'photos', 'types', 'address_components', 'formatted_address']
        }
      })

      const place = response.data.result
      const photos = await this.getPlacePhotos(place.photos || [])

      // Extract address information
      const addressComponents = place.address_components || []
      let country = ''
      let region = ''

             for (const component of addressComponents) {
         if (component.types.includes('country' as any)) {
           country = component.long_name
         }
         if (component.types.includes('administrative_area_level_1' as any)) {
           region = component.long_name
         }
       }

      return {
        id: placeId,
        name: place.name || '',
        description: place.formatted_address || '',
        type: this.getDestinationType(place.types || []),
        coordinates: {
          lat: place.geometry?.location.lat || 0,
          lng: place.geometry?.location.lng || 0
        },
        country,
        region,
        photos,
        placeId,
        formatted_address: place.formatted_address
      }

    } catch (error) {
      console.error('Failed to get destination details:', error)
      return null
    }
  }

  /**
   * Get current API usage statistics
   */
  getUsageStats() {
    return {
      requestsToday: this.requestCount,
      requestsThisMinute: this.minuteRequestCount,
      dailyLimit: this.dailyLimit,
      perMinuteLimit: this.perMinuteLimit,
      apiConfigured: this.apiKey !== '' && this.apiKey !== 'your_google_places_api_key_here'
    }
  }
}

// Export a singleton instance
export const googlePlacesService = new GooglePlacesService()
export default googlePlacesService