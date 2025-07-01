"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Users, UserPlus, Clock, Trophy, Phone, CheckCircle, X, Calendar, MapPin } from "lucide-react"
// import { createClient } from '@/lib/supabase' // TODO: Uncomment when implementing real data fetching
import { useRouter } from 'next/navigation'

interface PendingInvitation {
  id: string
  tripTitle: string
  organizer: string
  destination: string
  dates: string
  participants: number
  deadline: string
}

interface FriendRequest {
  id: string
  name: string
  avatar: string
  mutualFriends: number
  location: string
}

interface UserStats {
  tripsPlanned: number
  friendsConnected: number
  achievements: number
  countriesVisited: number
}

interface EmergencyContact {
  name: string
  phone: string
}

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [stats, setStats] = useState<UserStats>({
    tripsPlanned: 0,
    friendsConnected: 0,
    achievements: 0,
    countriesVisited: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  // const supabase = createClient() // TODO: Uncomment when implementing real data fetching

  // Mock data for development - replace with real Supabase queries
  const mockInvitations: PendingInvitation[] = [
    {
      id: "1",
      tripTitle: "Morocco Desert Adventure",
      organizer: "Lisa Park",
      destination: "Marrakech, Morocco",
      dates: "Apr 20-27, 2024",
      participants: 6,
      deadline: "2 days left",
    },
    {
      id: "2",
      tripTitle: "Greek Island Hopping",
      organizer: "Tom Wilson",
      destination: "Santorini, Greece",
      dates: "Jun 15-22, 2024",
      participants: 8,
      deadline: "5 days left",
    },
  ]

  const mockFriendRequests: FriendRequest[] = [
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/images/avatars/maria.jpg",
      mutualFriends: 3,
      location: "Barcelona, Spain",
    },
    {
      id: "2",
      name: "James Chen",
      avatar: "/images/avatars/james.jpg",
      mutualFriends: 7,
      location: "Singapore",
    },
  ]

  const mockStats: UserStats = {
    tripsPlanned: 12,
    friendsConnected: 48,
    achievements: 8,
    countriesVisited: 15,
  }

  const emergencyContacts: EmergencyContact[] = [
    { name: "Travel Insurance", phone: "+1-800-TRAVEL" },
    { name: "Embassy Hotline", phone: "+1-800-EMBASSY" },
    { name: "LFG Support", phone: "+1-800-LFG-HELP" },
  ]

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setIsLoading(true)
        
        // TODO: Replace with actual Supabase queries
        // const { data: { user } } = await supabase.auth.getUser()
        // if (!user) {
        //   router.push('/login')
        //   return
        // }

        // const { data: invitationsData, error: invitationsError } = await supabase
        //   .from('trip_invitations')
        //   .select(`
        //     *,
        //     trips (title, destination, start_date, end_date),
        //     profiles!organizer_id (full_name)
        //   `)
        //   .eq('status', 'pending')
        //   .eq('invited_user_id', user.id)

        // const { data: friendRequestsData, error: friendRequestsError } = await supabase
        //   .from('friend_requests')
        //   .select(`
        //     *,
        //     profiles!requester_id (full_name, avatar_url, location)
        //   `)
        //   .eq('status', 'pending')
        //   .eq('requested_user_id', user.id)

        // const { data: userStatsData, error: statsError } = await supabase
        //   .from('user_stats')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .single()

        // For now, use mock data
        setPendingInvitations(mockInvitations)
        setFriendRequests(mockFriendRequests)
        setStats(mockStats)
      } catch (err) {
        setError('Failed to load sidebar data')
        console.error('Error fetching sidebar data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSidebarData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleInvitationResponse = async (id: string, response: "accept" | "decline") => {
    try {
      // TODO: Implement actual Supabase mutation
      // const { error } = await supabase
      //   .from('trip_invitations')
      //   .update({ status: response === 'accept' ? 'accepted' : 'declined' })
      //   .eq('id', id)

      // if (error) throw error

      // Remove invitation from list
      setPendingInvitations(prev => prev.filter(inv => inv.id !== id))
      
      // Show success message or redirect
      if (response === 'accept') {
        console.log(`Accepted invitation ${id}`)
        // Could redirect to trip details
      } else {
        console.log(`Declined invitation ${id}`)
      }
    } catch (error) {
      console.error(`Error ${response}ing invitation:`, error)
    }
  }

  const handleFriendRequest = async (id: string, response: "accept" | "decline") => {
    try {
      // TODO: Implement actual Supabase mutation
      // const { error } = await supabase
      //   .from('friend_requests')
      //   .update({ status: response === 'accept' ? 'accepted' : 'declined' })
      //   .eq('id', id)

      // if (error) throw error

      // Remove friend request from list
      setFriendRequests(prev => prev.filter(req => req.id !== id))
      
      // Update stats if accepted
      if (response === 'accept') {
        setStats(prev => ({ ...prev, friendsConnected: prev.friendsConnected + 1 }))
        console.log(`Accepted friend request from ${id}`)
      } else {
        console.log(`Declined friend request from ${id}`)
      }
    } catch (error) {
      console.error(`Error ${response}ing friend request:`, error)
    }
  }

  const handleEmergencyCall = (phone: string) => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${phone}`, "_self")
    }
  }

  const handleViewAllInvitations = () => {
    router.push('/invitations')
  }

  const handleViewAllFriendRequests = () => {
    router.push('/friends/requests')
  }

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <div className="h-6 bg-neutral-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="shadow-lg border-0">
          <CardContent className="text-center py-8">
            <p className="text-danger-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Pending Invitations */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Pending Invitations</span>
            {pendingInvitations.length > 0 && (
              <Badge className="bg-danger-500 text-white">{pendingInvitations.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingInvitations.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
              <p className="text-neutral-500 text-sm">No pending invitations</p>
            </div>
          ) : (
            <>
              {pendingInvitations.map((invitation) => (
                <Card key={invitation.id} className="border border-neutral-200">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-neutral-900">{invitation.tripTitle}</h4>
                      <p className="text-sm text-neutral-600">by {invitation.organizer}</p>
                    </div>

                    <div className="space-y-1 text-sm text-neutral-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{invitation.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{invitation.dates}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{invitation.participants} travelers</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-secondary text-secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {invitation.deadline}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary-600 text-white"
                        onClick={() => handleInvitationResponse(invitation.id, "accept")}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-2 bg-transparent"
                        onClick={() => handleInvitationResponse(invitation.id, "decline")}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {pendingInvitations.length > 2 && (
                <Button 
                  variant="ghost" 
                  className="w-full text-primary" 
                  onClick={handleViewAllInvitations}
                >
                  View All Invitations
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Friend Requests */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-secondary" />
            <span>Friend Requests</span>
            {friendRequests.length > 0 && (
              <Badge className="bg-secondary text-white">{friendRequests.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {friendRequests.length === 0 ? (
            <div className="text-center py-6">
              <UserPlus className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
              <p className="text-neutral-500 text-sm">No pending friend requests</p>
            </div>
          ) : (
            <>
              {friendRequests.map((request) => (
                <Card key={request.id} className="border border-neutral-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback>
                          {request.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900">{request.name}</h4>
                        <p className="text-sm text-neutral-600">{request.location}</p>
                        <p className="text-xs text-neutral-500">{request.mutualFriends} mutual friends</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-secondary hover:bg-secondary-600 text-white"
                        onClick={() => handleFriendRequest(request.id, "accept")}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-2 bg-transparent"
                        onClick={() => handleFriendRequest(request.id, "decline")}
                      >
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {friendRequests.length > 2 && (
                <Button 
                  variant="ghost" 
                  className="w-full text-secondary" 
                  onClick={handleViewAllFriendRequests}
                >
                  View All Requests
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-secondary" />
            <span>Your Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.tripsPlanned}</div>
              <div className="text-xs text-neutral-600">Trips Planned</div>
            </div>
            <div className="text-center p-3 bg-secondary-50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">{stats.friendsConnected}</div>
              <div className="text-xs text-neutral-600">Friends</div>
            </div>
            <div className="text-center p-3 bg-secondary-50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">{stats.achievements}</div>
              <div className="text-xs text-neutral-600">Achievements</div>
            </div>
            <div className="text-center p-3 bg-accent-50 rounded-lg">
              <div className="text-2xl font-bold text-accent">{stats.countriesVisited}</div>
              <div className="text-xs text-neutral-600">Countries</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Phone className="w-5 h-5 text-danger-500" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">{contact.name}</span>
              <Button
                size="sm"
                variant="ghost"
                className="text-danger-500 hover:text-danger-600 hover:bg-danger-50"
                onClick={() => handleEmergencyCall(contact.phone)}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
