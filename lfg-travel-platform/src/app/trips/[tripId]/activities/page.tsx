'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowLeft, Calendar, Users, DollarSign, MapPin } from 'lucide-react'
import { ItineraryInterface } from '@/components/activities/ItineraryInterface'
import { useTrip } from '@/hooks/useTrips'

/**
 * TRIP ACTIVITIES PAGE
 * 
 * This page provides complete activity planning and itinerary management for a specific trip.
 * It shows the trip context and includes the full activity interface.
 * 
 * Simple explanation: Like having a dedicated page for planning what you'll do on your trip
 */
export default function TripActivitiesPage() {
  const params = useParams()
  const router = useRouter()
  const tripId = params.tripId as string

  const { trip, loading: tripLoading, error: tripError } = useTrip(tripId)

  if (tripLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Loading skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (tripError || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Trip Not Found</h2>
              <p className="text-red-600 mb-4">
                {tripError || 'The trip you\'re looking for doesn\'t exist or you don\'t have access to it.'}
              </p>
              <Button 
                onClick={() => router.push('/dashboard')}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getTripDuration = () => {
    const start = new Date(trip.start_date)
    const end = new Date(trip.end_date)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header with trip context */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => router.push(`/trips/${tripId}`)}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trip
          </Button>
          <div className="text-sm text-gray-500">
            Trip Activities
          </div>
        </div>

        {/* Trip Overview */}
        <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold mb-2 truncate">{trip.title}</h1>
                <p className="text-blue-100 mb-4 line-clamp-2">{trip.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-200" />
                    <span className="text-blue-100">{trip.destination}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-200" />
                    <span className="text-blue-100">
                      {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-200" />
                    <span className="text-blue-100">
                      {trip.current_participants} of {trip.max_participants} travelers
                    </span>
                  </div>
                  
                  {(trip.budget_min || trip.budget_max) && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-200" />
                      <span className="text-blue-100">
                        {trip.budget_min && trip.budget_max 
                          ? `${formatCurrency(trip.budget_min)} - ${formatCurrency(trip.budget_max)}`
                          : trip.budget_min 
                            ? `From ${formatCurrency(trip.budget_min)}`
                            : `Up to ${formatCurrency(trip.budget_max!)}`
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold">{getTripDuration()}</div>
                <div className="text-sm text-blue-200">Days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Planning Guidelines */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🗓️ Activity Planning Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <strong>📍 Plan by location:</strong> Group activities by area to minimize travel time
              </div>
              <div>
                <strong>⏰ Set realistic times:</strong> Include buffer time between activities
              </div>
              <div>
                <strong>👥 Consider the group:</strong> Check if activities suit everyone's interests
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Activity Interface */}
        <ItineraryInterface tripId={tripId} />

        {/* Activity Best Practices */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">✨ Activity Planning Best Practices</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">📋 Planning Tips</h4>
                <ul className="space-y-2">
                  <li>• Research opening hours and booking requirements</li>
                  <li>• Check weather forecasts for outdoor activities</li>
                  <li>• Consider dietary restrictions for food activities</li>
                  <li>• Plan backup indoor activities for bad weather</li>
                  <li>• Leave some free time for spontaneous exploration</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">💰 Budget Management</h4>
                <ul className="space-y-2">
                  <li>• Add all costs including tips and taxes</li>
                  <li>• Check if group discounts are available</li>
                  <li>• Consider transportation costs between activities</li>
                  <li>• Look for free alternatives and local recommendations</li>
                  <li>• Set a daily spending limit per person</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">🎯 Activity Categories Guide</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                <div>🏨 <strong>Accommodation:</strong> Check-in/out, hotel bookings</div>
                <div>🚗 <strong>Transport:</strong> Flights, trains, car rentals</div>
                <div>🍽️ <strong>Food:</strong> Restaurants, food tours, cooking classes</div>
                <div>🏛️ <strong>Sightseeing:</strong> Museums, landmarks, guided tours</div>
                <div>🛍️ <strong>Shopping:</strong> Markets, malls, souvenir hunting</div>
                <div>🎭 <strong>Entertainment:</strong> Shows, concerts, nightlife</div>
                <div>📋 <strong>Other:</strong> Miscellaneous activities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS PAGE DOES:
 * 
 * TripActivitiesPage is like having a dedicated activity planning workspace for your trip:
 * 
 * 1. TRIP CONTEXT - Shows trip information:
 *    - Trip title, destination, and dates
 *    - Participant count and budget
 *    - Trip duration and overview
 *    - Visual trip header with key details
 * 
 * 2. ACTIVITY INTERFACE - Complete activity management:
 *    - Daily itinerary view with timeline
 *    - Activity creation and management
 *    - Search and filtering capabilities
 *    - Statistics and cost tracking
 * 
 * 3. PLANNING GUIDANCE - Helpful tips and guidelines:
 *    - Activity planning best practices
 *    - Budget management advice
 *    - Category explanations
 *    - Location and timing recommendations
 * 
 * 4. NAVIGATION - Easy movement:
 *    - Back to main trip page
 *    - Error handling for invalid trips
 *    - Loading states for better UX
 *    - Trip access validation
 * 
 * Key Features:
 * - Beautiful trip context header
 * - Comprehensive activity planning tools
 * - Educational content and tips
 * - Responsive design for all devices
 * - Error handling and loading states
 * - Trip-specific activity management
 * 
 * User Experience:
 * - Clear visual hierarchy
 * - Contextual information at the top
 * - Helpful planning guidance
 * - Professional, travel-focused design
 * - Easy navigation between sections
 * 
 * It's like having a professional trip planning workspace that shows everything you need
 * to plan activities for your specific trip!
 */