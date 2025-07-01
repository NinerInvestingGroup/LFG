'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Users, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ExpenseInterface } from '@/components/expenses/ExpenseInterface'
import { useTrip } from '@/hooks/useTrips'
import { format } from 'date-fns'

/**
 * TRIP EXPENSE PAGE
 * 
 * This page shows the expense tracking interface for a specific trip.
 * It includes trip context and the full expense management system.
 * 
 * Simple explanation: Like having a dedicated expense tracking page for your trip
 */
export default function TripExpensePage() {
  const params = useParams()
  const router = useRouter()
  const tripId = params.tripId as string

  const { trip, loading, error } = useTrip(tripId)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-96 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The trip you are looking for does not exist or you do not have access to it.'}
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => router.push(`/trips/${tripId}`)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Trip
          </Button>

          {/* Trip Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {trip.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{trip.destination}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{trip.current_participants} participants</span>
                  </div>
                </div>
              </div>

              {/* Trip Budget Info */}
              {(trip.budget_min || trip.budget_max) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-1">Trip Budget</h4>
                  <p className="text-blue-800">
                    {trip.budget_min && trip.budget_max
                      ? `$${trip.budget_min} - $${trip.budget_max}`
                      : trip.budget_min
                      ? `From $${trip.budget_min}`
                      : `Up to $${trip.budget_max}`
                    } per person
                  </p>
                </div>
              )}
            </div>

            {/* Trip Description */}
            {trip.description && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700">{trip.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Expense Interface */}
        <ExpenseInterface tripId={tripId} />

        {/* Expense Guidelines */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Expense Tracking Guidelines</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How It Works</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Anyone can add expenses for the group</li>
                <li>• All expenses are automatically split equally</li>
                <li>• Track who paid and who owes money</li>
                <li>• Get settlement suggestions to even out balances</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Add expenses as soon as possible</li>
                <li>• Use clear, descriptive names</li>
                <li>• Choose the right category for better tracking</li>
                <li>• Keep receipts for larger expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS PAGE DOES:
 * 
 * TripExpensePage is like having a dedicated expense management center for your trip:
 * 
 * 1. TRIP CONTEXT - Shows which trip you're managing expenses for
 *    - Trip title, destination, dates
 *    - Number of participants
 *    - Budget information if available
 * 
 * 2. EXPENSE INTERFACE - Complete expense management system
 *    - Add new expenses
 *    - View expense history
 *    - Track participant balances
 *    - Get settlement suggestions
 * 
 * 3. NAVIGATION - Easy ways to get around
 *    - Back button to trip details
 *    - Clear page structure
 *    - Loading and error states
 * 
 * 4. HELPFUL GUIDELINES - Instructions for users
 *    - How the system works
 *    - Best practices for expense tracking
 *    - Tips for better organization
 * 
 * Key Features:
 * - Responsive design for all devices
 * - Loading states while data loads
 * - Error handling for invalid trips
 * - Clear trip context and information
 * - Professional, user-friendly interface
 * 
 * It's like having a professional expense tracking app page built into your travel platform!
 */
