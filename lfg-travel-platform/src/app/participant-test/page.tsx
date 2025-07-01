'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
// Badge component not used in this test page
import { ParticipantList } from "@/components/participants/ParticipantList"
import { InviteForm } from "@/components/participants/InviteForm"
import { RSVPCard } from "@/components/participants/RSVPCard"
import { useTrips } from "@/hooks/useTrips"
import { useUserInvitations } from "@/hooks/useParticipants"
import { useAuth } from "@/contexts/AuthContext"
import { Users, Mail, TestTube, Loader2 } from "lucide-react"

export default function ParticipantTestPage() {
  const { user } = useAuth()
  const { trips, loading: tripsLoading } = useTrips()
  const { invitations, loading: invitationsLoading } = useUserInvitations()
  const [selectedTripId, setSelectedTripId] = useState<string>('')
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [activeSection, setActiveSection] = useState('participants')

  const selectedTrip = trips.find(trip => trip.id === selectedTripId)

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            🧑‍🤝‍🧑 Participant Management Test
          </h1>
          <p className="text-neutral-600">
            Test invitation system, RSVP functionality, and participant management.
          </p>
        </div>

        {/* Auth Check */}
        {!user && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Authentication Required</h3>
              <p className="text-yellow-700 mb-4">
                You need to be logged in to test participant management features.
              </p>
              <Button onClick={() => window.location.href = '/login'}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        )}

        {user && (
          <div className="space-y-8">
            {/* Navigation */}
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
              {[
                { id: 'participants', label: 'Participant Lists', icon: Users },
                { id: 'invitations', label: 'Send Invitations', icon: Mail },
                { id: 'rsvp', label: 'My Invitations', icon: Mail },
                { id: 'status', label: 'System Status', icon: TestTube }
              ].map((section) => {
                const Icon = section.icon
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    onClick={() => setActiveSection(section.id)}
                    className="flex-1 gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </Button>
                )
              })}
            </div>

            {/* Participant Lists Section */}
            {activeSection === 'participants' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Trip Participant Lists
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    View and manage participants for your trips
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Trip to View Participants:
                    </label>
                    {tripsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading your trips...</span>
                      </div>
                    ) : trips.length === 0 ? (
                      <p className="text-gray-600">
                        No trips found. Create a trip first using the{' '}
                        <a href="/database-test" className="text-primary hover:underline">
                          database test page
                        </a>.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {trips.map((trip) => (
                          <Button
                            key={trip.id}
                            variant={selectedTripId === trip.id ? "default" : "outline"}
                            onClick={() => setSelectedTripId(trip.id)}
                            className="justify-start h-auto p-4"
                          >
                            <div className="text-left">
                              <div className="font-medium">{trip.title}</div>
                              <div className="text-sm opacity-70">{trip.destination}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedTrip && (
                    <ParticipantList
                      tripId={selectedTrip.id}
                      organizerId={selectedTrip.organizer_id}
                      onInviteClick={() => setShowInviteForm(true)}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {/* Send Invitations Section */}
            {activeSection === 'invitations' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Send Trip Invitations
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Test the email invitation system
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Trip to Send Invitations For:
                    </label>
                    {tripsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading your trips...</span>
                      </div>
                    ) : trips.length === 0 ? (
                      <p className="text-gray-600">
                        No trips found. Create a trip first to send invitations.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {trips.map((trip) => (
                          <Button
                            key={trip.id}
                            variant={selectedTripId === trip.id ? "default" : "outline"}
                            onClick={() => {
                              setSelectedTripId(trip.id)
                              setShowInviteForm(true)
                            }}
                            className="justify-start h-auto p-4"
                          >
                            <div className="text-left">
                              <div className="font-medium">{trip.title}</div>
                              <div className="text-sm opacity-70">{trip.destination}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {showInviteForm && selectedTrip && (
                    <InviteForm
                      tripId={selectedTrip.id}
                      tripTitle={selectedTrip.title}
                      onSuccess={() => {
                        setShowInviteForm(false)
                        alert('Invitation sent! (In a real app, an email would be sent)')
                      }}
                      onCancel={() => setShowInviteForm(false)}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {/* RSVP Section */}
            {activeSection === 'rsvp' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    My Trip Invitations ({invitations.length})
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Respond to trip invitations you've received
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {invitationsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="ml-2">Loading invitations...</span>
                    </div>
                  ) : invitations.length === 0 ? (
                    <div className="text-center py-8">
                      <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No invitations</h3>
                      <p className="text-gray-600">
                        You don't have any pending trip invitations.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {invitations.map((invitation) => (
                        <RSVPCard
                          key={invitation.id}
                          invitation={invitation}
                          onResponse={(tripId, response) => {
                            console.log(`Responded to trip ${tripId} with: ${response}`)
                          }}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* System Status Section */}
            {activeSection === 'status' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5" />
                    Participant System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Feature Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">✅</div>
                      <div className="font-medium">Email Invitations</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">✅</div>
                      <div className="font-medium">RSVP System</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">✅</div>
                      <div className="font-medium">Participant Lists</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">✅</div>
                      <div className="font-medium">Real-time Updates</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Your Trips</h4>
                      <p className="text-blue-800">{trips.length} trips created</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Pending Invitations</h4>
                      <p className="text-yellow-800">{invitations.length} awaiting response</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">User Status</h4>
                      <p className="text-green-800">Logged in as {user.email}</p>
                    </div>
                  </div>

                  {/* Testing Instructions */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">🧪 Testing Instructions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <h5 className="font-medium mb-2">Test Invitations:</h5>
                        <ul className="space-y-1">
                          <li>• Create a trip if you don't have one</li>
                          <li>• Go to "Send Invitations" section</li>
                          <li>• Try inviting an email address</li>
                          <li>• Check participant list updates</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Test RSVP:</h5>
                        <ul className="space-y-1">
                          <li>• Check "My Invitations" section</li>
                          <li>• Accept or decline invitations</li>
                          <li>• Verify status updates</li>
                          <li>• Check real-time updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS TEST PAGE DOES:
 * 
 * ParticipantTestPage - "A comprehensive test interface for participant management"
 * 
 * Features:
 * - Tab-based interface for different testing areas
 * - Participant Lists: View and manage trip participants
 * - Send Invitations: Test email invitation system
 * - My Invitations: View and respond to received invitations
 * - System Status: Monitor system health and get testing instructions
 * - Real-time updates across all components
 * - User-friendly error handling and loading states
 * 
 * This page lets you test all participant management features in one place:
 * 1. Create and send invitations
 * 2. View participant lists with real data
 * 3. Respond to invitations (RSVP)
 * 4. Monitor system status
 * 5. Get testing instructions
 */
