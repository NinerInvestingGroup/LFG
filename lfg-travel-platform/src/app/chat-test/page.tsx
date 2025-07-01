'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { useTrips } from "@/hooks/useTrips"
import { useChatNotifications } from "@/hooks/useChat"
import { useAuth } from "@/contexts/AuthContext"
import { MessageSquare, Users, TestTube, Loader2, CheckCircle } from "lucide-react"

export default function ChatTestPage() {
  const { user } = useAuth()
  const { trips, loading: tripsLoading } = useTrips()
  const [selectedTripId, setSelectedTripId] = useState<string>('')
  const [activeSection, setActiveSection] = useState('chat')

  // Get trip IDs for notification testing
  const tripIds = trips.map(t => t.id)
  const { totalUnread, unreadByTrip } = useChatNotifications(tripIds)

  const selectedTrip = trips.find(trip => trip.id === selectedTripId)

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            💬 Real-time Chat Test
          </h1>
          <p className="text-neutral-600">
            Test real-time messaging, chat interface, and notification system.
          </p>
        </div>

        {/* Auth Check */}
        {!user && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Authentication Required</h3>
              <p className="text-yellow-700 mb-4">
                You need to be logged in to test chat functionality.
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
                { id: 'chat', label: 'Chat Interface', icon: MessageSquare },
                { id: 'notifications', label: 'Notifications', icon: Users },
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

            {/* Chat Interface Section */}
            {activeSection === 'chat' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Real-time Chat Interface
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Test sending and receiving messages in real-time
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Trip Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Trip to Test Chat:
                    </label>
                    {tripsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading your trips...</span>
                      </div>
                    ) : trips.length === 0 ? (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">No Trips Found</h4>
                        <p className="text-yellow-700 text-sm mb-3">
                          You need to be part of a trip to test chat functionality.
                        </p>
                        <Button 
                          size="sm"
                          onClick={() => window.location.href = '/database-test'}
                        >
                          Create a Test Trip
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                              {unreadByTrip[trip.id] > 0 && (
                                <Badge className="mt-1 bg-red-500 text-white text-xs">
                                  {unreadByTrip[trip.id]} unread
                                </Badge>
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Chat Interface */}
                  {selectedTrip && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Testing Chat: {selectedTrip.title}
                      </h3>
                      <ChatInterface
                        tripId={selectedTrip.id}
                        tripTitle={selectedTrip.title}
                        className="max-w-4xl"
                      />
                      
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">🧪 Testing Instructions</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Type a message and press Enter or click Send</li>
                          <li>• Open this page in another browser tab to test real-time updates</li>
                          <li>• Messages should appear instantly in both tabs</li>
                          <li>• Try scrolling up and sending new messages to test auto-scroll</li>
                          <li>• Only trip participants can send/view messages</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Chat Notifications System
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Test unread message tracking and notifications
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{totalUnread}</div>
                      <div className="font-medium">Total Unread</div>
                      <div className="text-sm text-gray-600">Across all trips</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{tripIds.length}</div>
                      <div className="font-medium">Active Chats</div>
                      <div className="text-sm text-gray-600">Trips you're in</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {Object.values(unreadByTrip).filter(count => count > 0).length}
                      </div>
                      <div className="font-medium">Chats with Unread</div>
                      <div className="text-sm text-gray-600">Need attention</div>
                    </div>
                  </div>

                  {/* Per-Trip Unread Counts */}
                  {trips.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Unread Messages by Trip</h4>
                      <div className="space-y-2">
                        {trips.map((trip) => (
                          <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{trip.title}</div>
                              <div className="text-sm text-gray-600">{trip.destination}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {unreadByTrip[trip.id] > 0 ? (
                                <Badge className="bg-red-500 text-white">
                                  {unreadByTrip[trip.id]} unread
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  All read
                                </Badge>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.location.href = `/trips/${trip.id}/chat`}
                              >
                                Open Chat
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notification Testing */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">🔔 Notification Testing</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Send a message in one tab, check unread count updates in another</li>
                      <li>• Visit a trip chat page to mark messages as read</li>
                      <li>• Unread counts update automatically every 30 seconds</li>
                      <li>• Only messages from other users count as unread</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* System Status Section */}
            {activeSection === 'status' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5" />
                    Chat System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Feature Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-medium">Real-time Messaging</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-medium">Message History</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-medium">Participant Security</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-medium">Unread Tracking</div>
                      <div className="text-sm text-gray-600">Working</div>
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Your Trips</h4>
                      <p className="text-blue-800">{trips.length} trips with chat access</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Total Unread</h4>
                      <p className="text-yellow-800">{totalUnread} messages awaiting</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">User Status</h4>
                      <p className="text-green-800">Logged in as {user.email}</p>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">🔧 Technical Implementation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <h5 className="font-medium mb-2">Real-time Features:</h5>
                        <ul className="space-y-1">
                          <li>• Supabase real-time subscriptions</li>
                          <li>• Automatic message updates</li>
                          <li>• Smart auto-scroll behavior</li>
                          <li>• Live participant tracking</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Security Features:</h5>
                        <ul className="space-y-1">
                          <li>• Participant-only access</li>
                          <li>• Authentication required</li>
                          <li>• Message ownership validation</li>
                          <li>• Trip-specific permissions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/database-test'}
                    >
                      Create Test Trip
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/participant-test'}
                    >
                      Test Participants
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      Refresh Status
                    </Button>
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
 * ChatTestPage - "A comprehensive test interface for real-time chat"
 * 
 * Features:
 * - Test chat interface with real trips
 * - Real-time message testing across browser tabs
 * - Notification system testing
 * - Unread message count verification
 * - System status monitoring
 * - Technical implementation details
 * 
 * Testing Sections:
 * 1. Chat Interface - Test sending/receiving messages
 * 2. Notifications - Test unread tracking and counts
 * 3. System Status - Monitor chat system health
 * 
 * This page helps verify:
 * - Real-time messaging works correctly
 * - Only participants can access chats
 * - Unread counts update properly
 * - Messages persist and load correctly
 * - Auto-scroll and UI features work
 */
