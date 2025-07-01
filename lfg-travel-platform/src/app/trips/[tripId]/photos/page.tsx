'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  AlertCircle,
  Loader2,
  ImageIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PhotoInterface } from '@/components/photos/PhotoInterface'
import { useTrip } from '@/hooks/useTrips'

interface TripPhotosPageProps {
  params: {
    tripId: string
  }
}

/**
 * TRIP PHOTOS PAGE
 * 
 * Dedicated page for viewing and managing photos for a specific trip
 * Simple explanation: Like having a photo album page for each trip
 */
export default function TripPhotosPage({ params }: TripPhotosPageProps) {
  const router = useRouter()
  const { tripId } = params
  
  const { trip, loading, error } = useTrip(tripId)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Loading trip photos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Alert className="border-red-200 bg-red-50 max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              {error || 'Trip not found'}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const organizerIds = [trip.organizer_id]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link 
              href="/dashboard" 
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <span>•</span>
            <Link 
              href={`/trips/${tripId}`} 
              className="hover:text-blue-600 transition-colors"
            >
              {trip.title}
            </Link>
            <span>•</span>
            <span className="text-gray-900 font-medium">Photos</span>
          </div>

          {/* Trip Info Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Trip Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <Camera className="h-8 w-8 text-blue-600" />
                        {trip.title} - Photos
                      </h1>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Share and view photos from your amazing trip to{' '}
                        <span className="font-semibold text-blue-600">{trip.destination}</span>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.back()}
                      className="flex-shrink-0"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Trip
                    </Button>
                  </div>

                  {/* Trip Meta Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>
                        {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>{trip.current_participants} participants</span>
                    </div>
                    {trip.budget_min && trip.budget_max && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <DollarSign className="h-4 w-4 text-orange-600" />
                        <span>${trip.budget_min} - ${trip.budget_max}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-start">
                  <Badge 
                    variant={
                      trip.status === 'active' ? 'default' :
                      trip.status === 'completed' ? 'secondary' :
                      trip.status === 'draft' ? 'outline' : 'destructive'
                    }
                    className="text-sm px-3 py-1"
                  >
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Photo Interface */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-xl p-6">
          <PhotoInterface 
            tripId={tripId}
            tripTitle="Trip Photos"
            organizerIds={organizerIds}
          />
        </div>

        {/* Photo Sharing Tips */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <ImageIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  📸 Make the Most of Your Trip Photos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="font-medium text-blue-700">✨ Best Practices:</p>
                    <ul className="space-y-1">
                      <li>• Upload photos daily while memories are fresh</li>
                      <li>• Add captions with interesting details and stories</li>
                      <li>• Include location tags for context</li>
                      <li>• Share group photos that everyone will love</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-green-700">🎯 Pro Tips:</p>
                    <ul className="space-y-1">
                      <li>• Use high-quality images for best results</li>
                      <li>• Photos are automatically optimized for fast loading</li>
                      <li>• Only trip participants can see these photos</li>
                      <li>• You can edit captions and delete your photos anytime</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href={`/trips/${tripId}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Trip Overview
            </Button>
          </Link>
          <Link href={`/trips/${tripId}/activities`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Trip Itinerary
            </Button>
          </Link>
          <Link href={`/trips/${tripId}/expenses`}>
            <Button variant="outline" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Expenses
            </Button>
          </Link>
          <Link href={`/trips/${tripId}/chat`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Group Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS PAGE DOES:
 * 
 * TripPhotosPage is like having a dedicated photo album page for each trip:
 * 
 * 1. TRIP CONTEXT - Shows trip details:
 *    - Trip title and destination
 *    - Travel dates and participants
 *    - Budget and status information
 *    - Beautiful header with trip info
 * 
 * 2. NAVIGATION - Easy movement between features:
 *    - Breadcrumb navigation
 *    - Back to trip button
 *    - Quick links to other trip features
 *    - Integration with trip ecosystem
 * 
 * 3. PHOTO INTERFACE - Complete photo management:
 *    - Full PhotoInterface component
 *    - Upload, view, and manage photos
 *    - Search and filter capabilities
 *    - Statistics and analytics
 * 
 * 4. USER GUIDANCE - Helpful tips and information:
 *    - Photo sharing best practices
 *    - Pro tips for better photo organization
 *    - Clear guidelines and expectations
 *    - Encouraging photo sharing behavior
 * 
 * Key Features:
 * - Beautiful trip-themed design
 * - Responsive layout for all devices
 * - Integration with trip management
 * - Clear navigation and user flow
 * - Helpful guidance and tips
 * - Professional photo gallery experience
 * 
 * User Experience:
 * - Seamless integration with trip features
 * - Clear context about which trip photos belong to
 * - Easy navigation between trip functions
 * - Beautiful, modern interface design
 * - Encouraging and helpful guidance
 * 
 * Think of it as having a dedicated photo section for each trip,
 * like flipping to the photo pages in a travel scrapbook!
 */
