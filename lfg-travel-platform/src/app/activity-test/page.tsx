'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  BarChart3,
  CalendarDays,
  Activity,
  Plus
} from 'lucide-react'
import { useActivityManager } from '@/hooks/useActivities'
import { ItineraryInterface } from '@/components/activities/ItineraryInterface'

/**
 * ACTIVITY PLANNING TEST PAGE
 * 
 * This page demonstrates the complete activity planning and itinerary system.
 * It provides testing tools and examples to show how the system works.
 * 
 * Simple explanation: Like having a playground to test activity planning features
 */
export default function ActivityTestPage() {
  const [selectedTripId, setSelectedTripId] = useState<string>('')

  // Sample trip IDs for testing (you can replace with real ones)
  const sampleTrips = [
    { id: 'trip-1', name: 'Tokyo Adventure (7 days)', destination: 'Tokyo, Japan' },
    { id: 'trip-2', name: 'Paris Culture Trip (5 days)', destination: 'Paris, France' },
    { id: 'trip-3', name: 'Bali Relaxation (10 days)', destination: 'Bali, Indonesia' },
    { id: 'test-trip', name: 'Test Trip (3 days)', destination: 'Test City' }
  ]

  const {
    activities,
    itinerary,
    stats,
    loading,
    hasData,
    totalActivities,
    totalCost,
    averageCostPerDay,
    totalDays,
    addActivity,
    joinActivity,
    leaveActivity,
    deleteActivity,
    categories,
    getCategoryColor,
    getCategoryIcon,
    getCategoryLabel,
    addActivityLoading,
    addActivityError,
    actionLoading
  } = useActivityManager(selectedTripId)

  // Sample activities for quick testing
  const sampleActivities = [
    {
      title: 'Hotel Check-in',
      description: 'Check into accommodation and get settled',
      location: 'Downtown Hotel',
      category: 'accommodation' as const,
      startDate: '2024-03-15',
      startTime: '15:00',
      costPerPerson: 0,
      maxParticipants: undefined
    },
    {
      title: 'Welcome Dinner',
      description: 'Group dinner at local restaurant to kick off the trip',
      location: 'Riverside Restaurant',
      category: 'food' as const,
      startDate: '2024-03-15',
      startTime: '19:00',
      endTime: '21:00',
      costPerPerson: 45,
      maxParticipants: 8
    },
    {
      title: 'City Walking Tour',
      description: 'Guided tour of historic downtown area',
      location: 'City Center',
      category: 'sightseeing' as const,
      startDate: '2024-03-16',
      startTime: '10:00',
      endTime: '13:00',
      costPerPerson: 25,
      maxParticipants: 15
    },
    {
      title: 'Local Market Visit',
      description: 'Explore traditional market and shop for souvenirs',
      location: 'Central Market',
      category: 'shopping' as const,
      startDate: '2024-03-16',
      startTime: '15:00',
      endTime: '17:00',
      costPerPerson: 20,
      maxParticipants: undefined
    },
    {
      title: 'Evening Entertainment',
      description: 'Live music and cultural performance',
      location: 'Cultural Center',
      category: 'entertainment' as const,
      startDate: '2024-03-16',
      startTime: '20:00',
      endTime: '22:30',
      costPerPerson: 35,
      maxParticipants: 20
    }
  ]

  const handleQuickTest = async (activityIndex: number) => {
    if (!selectedTripId) {
      alert('Please select a trip first')
      return
    }

    const activity = sampleActivities[activityIndex]
    
    try {
      const result = await addActivity({
        tripId: selectedTripId,
        ...activity
      })
      
      if (result.success) {
        console.log('Activity added successfully:', result.data)
      } else {
        console.error('Failed to add activity:', result.error)
      }
    } catch (error) {
      console.error('Error adding activity:', error)
    }
  }

  const handleAddMultipleActivities = async () => {
    if (!selectedTripId) {
      alert('Please select a trip first')
      return
    }

    // Add all sample activities
    for (const activity of sampleActivities) {
      try {
        await addActivity({
          tripId: selectedTripId,
          ...activity
        })
        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error('Error adding activity:', error)
      }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">🗓️ Activity Planning System</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test and explore the complete activity planning and itinerary management system.
            Add activities, organize them by day, and see how the timeline view works.
          </p>
        </div>

        {/* Trip Selection */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Select a Trip to Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 max-w-md">
                <Select value={selectedTripId} onValueChange={setSelectedTripId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trip to test with..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleTrips.map(trip => (
                      <SelectItem key={trip.id} value={trip.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{trip.name}</span>
                          <span className="text-sm text-gray-500">{trip.destination}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedTripId && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Trip Selected
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Show interface only when trip is selected */}
        {selectedTripId ? (
          <Tabs defaultValue="testing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="testing">Quick Testing</TabsTrigger>
              <TabsTrigger value="itinerary">Live Itinerary</TabsTrigger>
              <TabsTrigger value="activities">Activity List</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Quick Testing Tab */}
            <TabsContent value="testing" className="space-y-6">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalActivities}</div>
                      <div className="text-sm text-gray-600">Total Activities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{totalDays}</div>
                      <div className="text-sm text-gray-600">Days Planned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalCost)}</div>
                      <div className="text-sm text-gray-600">Total Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {loading ? '...' : hasData ? '✅' : '❌'}
                      </div>
                      <div className="text-sm text-gray-600">System Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Test Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Quick Test Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sampleActivities.map((activity, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getCategoryColor(activity.category)}>
                                  {getCategoryIcon(activity.category)} {getCategoryLabel(activity.category)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-xs text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {activity.startDate} at {activity.startTime}
                            </div>
                            {activity.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </div>
                            )}
                            {activity.costPerPerson && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {formatCurrency(activity.costPerPerson)}
                              </div>
                            )}
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => handleQuickTest(index)}
                            disabled={addActivityLoading || actionLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Activity
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleAddMultipleActivities}
                      disabled={addActivityLoading || actionLoading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Add All Sample Activities
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      This will add all sample activities to create a complete test itinerary
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Error Display */}
              {addActivityError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800">
                    {addActivityError}
                  </AlertDescription>
                </Alert>
              )}

              {/* Testing Information */}
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">🧪 Testing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What This Tests:</h4>
                      <ul className="space-y-1">
                        <li>• Activity creation with validation</li>
                        <li>• Automatic itinerary organization</li>
                        <li>• Real-time cost calculations</li>
                        <li>• Category-based organization</li>
                        <li>• Timeline view generation</li>
                        <li>• Participant management</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How to Test:</h4>
                      <ul className="space-y-1">
                        <li>1. Select a trip from the dropdown</li>
                        <li>2. Click individual "Add Activity" buttons</li>
                        <li>3. Or use "Add All" for complete test</li>
                        <li>4. Check the "Live Itinerary" tab</li>
                        <li>5. View organized activities by day</li>
                        <li>6. Test search and filtering</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Live Itinerary Tab */}
            <TabsContent value="itinerary">
              <ItineraryInterface tripId={selectedTripId} />
            </TabsContent>

            {/* Activity List Tab */}
            <TabsContent value="activities" className="space-y-4">
              {!hasData ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Activities Yet</h3>
                    <p className="text-gray-600">
                      Use the "Quick Testing" tab to add sample activities and see how they appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.map(activity => (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <Badge className={getCategoryColor(activity.category)}>
                            {getCategoryIcon(activity.category)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(activity.start_date).toLocaleDateString()}
                            {activity.start_time && ` at ${activity.start_time}`}
                          </div>
                          {activity.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {activity.location}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {activity.current_participants} participant(s)
                          </div>
                          {activity.cost_per_person && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {formatCurrency(activity.cost_per_person)} per person
                            </div>
                          )}
                        </div>
                        
                        {activity.description && (
                          <p className="text-sm text-gray-700">{activity.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Overview Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Activity Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Activities</span>
                        <span className="font-semibold">{stats.totalActivities}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cost</span>
                        <span className="font-semibold">{formatCurrency(stats.totalCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average per Day</span>
                        <span className="font-semibold">{formatCurrency(stats.averageCostPerDay)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Participation Rate</span>
                        <span className="font-semibold">{Math.round(stats.participationRate * 100)}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(stats.categoryCounts).map(([categoryId, count]) => (
                        <div key={categoryId} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span>{getCategoryIcon(categoryId)}</span>
                            <span className="text-gray-700">{getCategoryLabel(categoryId)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(count / stats.totalActivities) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-8 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Available</h3>
                    <p className="text-gray-600">Add some activities to see detailed analytics and statistics.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          /* No Trip Selected */
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Trip to Begin Testing</h2>
              <p className="text-gray-600">
                Choose a trip from the dropdown above to start testing the activity planning system.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS TEST PAGE DOES:
 * 
 * ActivityTestPage is like having a complete testing playground for activities:
 * 
 * 1. TRIP SELECTION - Choose which trip to test with:
 *    - Dropdown with sample trips
 *    - Visual confirmation when selected
 *    - Trip context for testing
 * 
 * 2. QUICK TESTING - Easy ways to add test data:
 *    - Individual activity test buttons
 *    - "Add All" for complete test scenario
 *    - Pre-configured sample activities
 *    - Real-time system status monitoring
 * 
 * 3. LIVE ITINERARY - See the system in action:
 *    - Complete ItineraryInterface component
 *    - Daily timeline organization
 *    - Activity management tools
 *    - Search and filtering capabilities
 * 
 * 4. ACTIVITY LIST - Browse all activities:
 *    - Grid view of all activities
 *    - Activity details and metadata
 *    - Category and cost information
 *    - Participant tracking
 * 
 * 5. ANALYTICS - View system insights:
 *    - Activity statistics and totals
 *    - Category breakdown with charts
 *    - Cost analysis and averages
 *    - Participation metrics
 * 
 * Key Features:
 * - Comprehensive testing tools
 * - Real-time data monitoring
 * - Live activity system demonstration
 * - Analytics and statistics
 * - Professional test interface
 * - Complete activity lifecycle testing
 * 
 * User Experience:
 * - Clear step-by-step testing flow
 * - Visual feedback for all actions
 * - Professional dashboard layout
 * - Comprehensive system overview
 * - Easy-to-understand test scenarios
 * 
 * It's like having a complete testing suite for the activity planning system
 * that shows everything working together in real-time!
 */
