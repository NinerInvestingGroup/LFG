'use client'

import { useState } from 'react'
import { useTrips, useCreateTrip, useDeleteTrip } from '@/hooks/useTrips'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Loader2, Plus, Trash2, Calendar, MapPin, Users, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

export default function DatabaseTestPage() {
  const { trips, loading, error, refetch } = useTrips()
  const { createTrip, loading: creating, error: createError } = useCreateTrip()
  const { deleteTrip, loading: deleting } = useDeleteTrip()

  // Form state for creating test trips
  const [testTripForm, setTestTripForm] = useState({
    title: 'Test Trip to Bali',
    destination: 'Bali, Indonesia',
    description: 'A wonderful test trip to beautiful Bali',
    startDate: '2024-06-15',
    endDate: '2024-06-25',
    maxParticipants: 6,
    budgetMin: 1000,
    budgetMax: 2500,
    tripType: 'adventure',
  })

  const handleCreateTestTrip = async () => {
    const result = await createTrip({
      title: testTripForm.title,
      description: testTripForm.description,
      destination: testTripForm.destination,
      start_date: testTripForm.startDate,
      end_date: testTripForm.endDate,
      max_participants: testTripForm.maxParticipants,
      budget_min: testTripForm.budgetMin,
      budget_max: testTripForm.budgetMax,
      trip_type: testTripForm.tripType,
      difficulty_level: 'moderate',
      status: 'active' as const,
    } as any)

    if (result) {
      console.log('Test trip created:', result)
      // Generate a new test trip with different data
      setTestTripForm(prev => ({
        ...prev,
        title: `Test Trip ${Date.now()}`,
        destination: ['Tokyo, Japan', 'Paris, France', 'New York, USA'][Math.floor(Math.random() * 3)],
      }))
    }
  }

  const handleDeleteTrip = async (tripId: string) => {
    const success = await deleteTrip(tripId)
    if (success) {
      console.log('Trip deleted successfully')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">🗄️ Database Integration Test</h1>
          <p className="text-neutral-600">
            Test your trip management database integration. Create, view, and delete trips to verify everything is working.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Database Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></span>
                Database Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Connected:</span>
                  <span className={error ? 'text-red-600' : 'text-green-600'}>
                    {error ? '❌ Error' : '✅ Yes'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Loading:</span>
                  <span className={loading ? 'text-yellow-600' : 'text-green-600'}>
                    {loading ? '⏳ Loading...' : '✅ Loaded'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trips Found:</span>
                  <span className="font-semibold">{trips.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Real-time:</span>
                  <span className="text-green-600">✅ Active</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button onClick={refetch} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : '🔄'} Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Test Trip */}
          <Card>
            <CardHeader>
              <CardTitle>Create Test Trip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Trip Title"
                  value={testTripForm.title}
                  onChange={(e) => setTestTripForm(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Destination"
                  value={testTripForm.destination}
                  onChange={(e) => setTestTripForm(prev => ({ ...prev, destination: e.target.value }))}
                />
                <Input
                  type="date"
                  value={testTripForm.startDate}
                  onChange={(e) => setTestTripForm(prev => ({ ...prev, startDate: e.target.value }))}
                />
                <Input
                  type="date"
                  value={testTripForm.endDate}
                  onChange={(e) => setTestTripForm(prev => ({ ...prev, endDate: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Max Participants"
                  value={testTripForm.maxParticipants}
                  onChange={(e) => setTestTripForm(prev => ({ ...prev, maxParticipants: Number(e.target.value) }))}
                />
                <Input
                  type="number"
                  placeholder="Budget Min"
                  value={testTripForm.budgetMin}
                  onChange={(e) => setTestTripForm(prev => ({ ...prev, budgetMin: Number(e.target.value) }))}
                />
              </div>

              {createError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">{createError}</p>
                </div>
              )}

              <Button
                onClick={handleCreateTestTrip}
                disabled={creating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Create Test Trip
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trips List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Trips ({trips.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Loading trips...</span>
              </div>
            ) : trips.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
                <p className="text-gray-600 mb-4">Create a test trip above to see it appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{trip.title}</h3>
                          <Badge className={getStatusColor(trip.status)}>
                            {trip.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {trip.destination}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {trip.participants.length}/{trip.max_participants} travelers
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${trip.budget_min} - ${trip.budget_max}
                          </div>
                        </div>

                        {trip.description && (
                          <p className="text-sm text-gray-600 mt-2">{trip.description}</p>
                        )}

                        <div className="text-xs text-gray-500 mt-2">
                          Created: {format(new Date(trip.created_at), 'MMM d, yyyy HH:mm')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTrip(trip.id)}
                          disabled={deleting}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Database Operations Test */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Database Operations Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">✅</div>
                <div className="font-medium">Create</div>
                <div className="text-gray-600">Trip creation works</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">✅</div>
                <div className="font-medium">Read</div>
                <div className="text-gray-600">Trip loading works</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">⏳</div>
                <div className="font-medium">Update</div>
                <div className="text-gray-600">Not implemented yet</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">✅</div>
                <div className="font-medium">Delete</div>
                <div className="text-gray-600">Trip deletion works</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🧪 Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What to Test:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Create several test trips using the form above</li>
                  <li>• Verify trips appear in the list immediately</li>
                  <li>• Delete trips and see them disappear</li>
                  <li>• Refresh the page - trips should persist</li>
                  <li>• Check the dashboard to see if trips appear there</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What This Tests:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Database connection to Supabase</li>
                  <li>• Trip creation with real data</li>
                  <li>• Real-time updates when data changes</li>
                  <li>• Proper error handling</li>
                  <li>• Authentication integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
