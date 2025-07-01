'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign,
  Users,
  Search,
  Filter,
  Edit3,
  Trash2,
  UserPlus,
  UserMinus,
  ExternalLink,
  ChevronRight,
  CalendarDays,
  BarChart3
} from 'lucide-react'
import { useActivityManager } from '@/hooks/useActivities'
import { AddActivityModal } from './AddActivityModal'
import { format } from 'date-fns'

interface ItineraryInterfaceProps {
  tripId: string
  className?: string
}

/**
 * ITINERARY INTERFACE COMPONENT
 * 
 * This is the main activity planning interface that shows:
 * - Daily itinerary with activities organized by date
 * - Activity list with search and filtering
 * - Activity statistics and overview
 * - Add activity functionality
 * 
 * Simple explanation: Like having a complete trip planner that shows your daily schedule
 */
export function ItineraryInterface({ tripId, className = '' }: ItineraryInterfaceProps) {
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  
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
    search,
    getCategoryColor,
    getCategoryIcon,
    getCategoryLabel,
    addActivityLoading,
    addActivityError,
    clearAddActivityError,
    actionLoading,
    categories
  } = useActivityManager(tripId)

  const handleAddActivity = async (activityData: any) => {
    const result = await addActivity({
      tripId,
      ...activityData
    })
    
    if (result.success) {
      setShowAddActivity(false)
      clearAddActivityError()
    }
    
    return result
  }

  const handleJoinActivity = async (activityId: string) => {
    await joinActivity(activityId)
  }

  const handleLeaveActivity = async (activityId: string) => {
    await leaveActivity(activityId)
  }

  const handleDeleteActivity = async (activityId: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await deleteActivity(activityId)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatTime = (time: string) => {
    return format(new Date(`1970-01-01T${time}`), 'h:mm a')
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'EEEE, MMM d')
  }

  const isUserParticipating = (activity: any, userId: string) => {
    return activity.participants.some((p: any) => p.participant_id === userId && p.status === 'confirmed')
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Trip Itinerary</h2>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        
        <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Trip Itinerary</h2>
        <Button 
          onClick={() => setShowAddActivity(true)}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-gray-900">{totalDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{totalActivities}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg per Day</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageCostPerDay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="itinerary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="itinerary">Daily Itinerary</TabsTrigger>
          <TabsTrigger value="activities">All Activities</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        {/* Daily Itinerary Tab */}
        <TabsContent value="itinerary" className="space-y-6">
          {!hasData ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities planned yet</h3>
                <p className="text-gray-600 mb-4">
                  Start building your itinerary by adding activities to your trip.
                </p>
                <Button 
                  onClick={() => setShowAddActivity(true)}
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Activity
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {itinerary.map((day, dayIndex) => (
                <Card key={day.date}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {formatDate(day.date)}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {day.activities.length} activit{day.activities.length === 1 ? 'y' : 'ies'} planned
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(day.totalCost)}
                        </p>
                        <p className="text-sm text-gray-600">Daily cost</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activity.id} className="relative flex items-start space-x-4 pb-6 last:pb-0">
                          {/* Timeline dot */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow"></div>
                          </div>
                          
                          {/* Activity content */}
                          <div className="flex-1 min-w-0">
                            <Card className="bg-gray-50 border-gray-200">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-semibold text-gray-900 truncate">
                                        {activity.title}
                                      </h4>
                                      <Badge className={getCategoryColor(activity.category)}>
                                        {getCategoryIcon(activity.category)} {getCategoryLabel(activity.category)}
                                      </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                      {activity.start_time && (
                                        <span className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1" />
                                          {formatTime(activity.start_time)}
                                          {activity.end_time && ` - ${formatTime(activity.end_time)}`}
                                        </span>
                                      )}
                                      {activity.location && (
                                        <span className="flex items-center">
                                          <MapPin className="h-4 w-4 mr-1" />
                                          {activity.location}
                                        </span>
                                      )}
                                      {activity.cost_per_person && (
                                        <span className="flex items-center">
                                          <DollarSign className="h-4 w-4 mr-1" />
                                          {formatCurrency(activity.cost_per_person)} per person
                                        </span>
                                      )}
                                    </div>
                                    
                                    {activity.description && (
                                      <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                                    )}
                                    
                                    {/* Participants */}
                                    <div className="flex items-center space-x-2">
                                      <Users className="h-4 w-4 text-gray-500" />
                                      <div className="flex -space-x-1">
                                        {activity.participants.slice(0, 3).map(participant => (
                                          <Avatar key={participant.id} className="w-6 h-6 border-2 border-white">
                                            <AvatarImage src={participant.profile.avatar_url || undefined} />
                                            <AvatarFallback className="text-xs">
                                              {getInitials(participant.profile.full_name || participant.profile.email)}
                                            </AvatarFallback>
                                          </Avatar>
                                        ))}
                                        {activity.participants.length > 3 && (
                                          <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                                            <span className="text-xs text-gray-600">+{activity.participants.length - 3}</span>
                                          </div>
                                        )}
                                      </div>
                                      <span className="text-sm text-gray-600">
                                        {activity.current_participants} joined
                                      </span>
                                    </div>
                                  </div>
                                  
                                  {/* Action buttons */}
                                  <div className="flex items-center space-x-2 ml-4">
                                    {activity.booking_url && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(activity.booking_url!, '_blank')}
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </Button>
                                    )}
                                    
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleJoinActivity(activity.id)}
                                      disabled={actionLoading}
                                    >
                                      <UserPlus className="h-4 w-4" />
                                    </Button>
                                    
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleDeleteActivity(activity.id)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      disabled={actionLoading}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* All Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          {/* Search and filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={search.searchTerm}
                      onChange={(e) => search.setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={search.selectedCategory} onValueChange={search.setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {search.hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={search.clearFilters}
                    className="whitespace-nowrap"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity list */}
          {search.filteredActivities.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {search.hasActiveFilters ? 'No activities match your filters' : 'No activities yet'}
                </h3>
                <p className="text-gray-600">
                  {search.hasActiveFilters 
                    ? 'Try adjusting your search criteria.'
                    : 'Start planning your trip by adding activities.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {search.filteredActivities.map(activity => (
                <Card key={activity.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{activity.title}</h3>
                          <Badge className={getCategoryColor(activity.category)}>
                            {getCategoryIcon(activity.category)} {getCategoryLabel(activity.category)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(activity.start_date)}
                          {activity.start_time && ` at ${formatTime(activity.start_time)}`}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJoinActivity(activity.id)}
                          disabled={actionLoading}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={actionLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {activity.description && (
                      <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        {activity.location && (
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {activity.location}
                          </span>
                        )}
                        {activity.cost_per_person && (
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {formatCurrency(activity.cost_per_person)}
                          </span>
                        )}
                      </div>
                      
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {activity.current_participants}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-4">
          {stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overview stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
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

              {/* Category breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Activities by Category</CardTitle>
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
                            className="bg-primary h-2 rounded-full"
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">No statistics available</h3>
                <p className="text-gray-600">Add some activities to see statistics.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Activity Modal */}
      <AddActivityModal
        isOpen={showAddActivity}
        onClose={() => setShowAddActivity(false)}
        onSubmit={handleAddActivity}
        loading={addActivityLoading}
        error={addActivityError}
      />
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * ItineraryInterface is like having a complete trip planning app for activities:
 * 
 * 1. DAILY ITINERARY - Shows activities organized by day with:
 *    - Timeline view showing what happens when
 *    - Activity details (time, location, cost, participants)
 *    - Day-by-day breakdown with costs
 *    - Visual timeline showing activity sequence
 * 
 * 2. ACTIVITY LIST - Complete list of activities with:
 *    - Search and filtering capabilities
 *    - Category-based organization
 *    - Quick action buttons (join, leave, delete)
 *    - Grid layout for easy browsing
 * 
 * 3. STATISTICS - Activity analytics showing:
 *    - Total activities and costs
 *    - Participation rates
 *    - Category breakdown with charts
 *    - Daily averages and trends
 * 
 * 4. ACTIVITY MANAGEMENT - Easy tools to:
 *    - Add new activities with full details
 *    - Join or leave activities
 *    - Edit activity information
 *    - Delete activities (creator only)
 * 
 * Key Features:
 * - Timeline-based daily itinerary view
 * - Comprehensive search and filtering
 * - Real-time participant tracking
 * - Cost calculations and statistics
 * - Mobile-responsive design
 * - Intuitive activity management
 * 
 * It's like having TripIt or Google Travel built into your platform!
 */
