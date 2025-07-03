"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react"
import Image from "next/image"

export function CommunityShowcaseSection() {
  const trendingTrips = [
    {
      id: 1,
      title: "Bali Squad Goals",
      destination: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      participants: 8,
      duration: "10 days",
      budget: "$1,200",
      savings: "$400",
      likes: 234,
      comments: 18,
      tags: ["Beach", "Culture", "Adventure"],
      status: "Planning",
      organizer: "Sarah M.",
    },
    {
      id: 2,
      title: "Tokyo Neon Nights",
      destination: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      participants: 6,
      duration: "7 days",
      budget: "$1,800",
      savings: "$600",
      likes: 189,
      comments: 24,
      tags: ["City", "Food", "Culture"],
      status: "Active",
      organizer: "Mike K.",
    },
    {
      id: 3,
      title: "European Adventure",
      destination: "Multi-City Europe",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      participants: 12,
      duration: "14 days",
      budget: "$2,500",
      savings: "$800",
      likes: 312,
      comments: 31,
      tags: ["Backpacking", "History", "Culture"],
      status: "Planning",
      organizer: "Emma L.",
    },
  ]

  const communityStats = [
    { label: "Active Trips", value: "1,247", trend: "+12%", icon: TrendingUp },
    { label: "Countries", value: "89", trend: "+5", icon: MapPin },
    { label: "Travel Squads", value: "15K+", trend: "+23%", icon: Users },
    { label: "Money Saved", value: "$2.1M", trend: "+45%", icon: DollarSign },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-warning text-white mb-6 px-6 py-2 text-lg font-bold">
            <TrendingUp className="w-5 h-5 mr-2" />
            Community Spotlight
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            Join the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning to-primary ml-4">
              Movement
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-medium">
            Discover trending trips, connect with fellow adventurers, and get inspired by the LFG community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="text-center p-6 border-2 border-primary-100 hover:border-primary-200 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-neutral-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600 mb-2">{stat.label}</div>
                  <Badge className="bg-success-100 text-success-700 text-xs">{stat.trend} this month</Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trending Trips Showcase */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="trending" className="text-lg font-semibold">
              🔥 Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="text-lg font-semibold">
              ✨ New
            </TabsTrigger>
            <TabsTrigger value="featured" className="text-lg font-semibold">
              ⭐ Featured
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingTrips.map((trip) => (
                <Card
                  key={trip.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <div className="relative">
                    <Image
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Status Badge */}
                    <Badge
                      className={`absolute top-4 left-4 ${
                        trip.status === "Active" ? "bg-success text-white" : "bg-warning text-white"
                      }`}
                    >
                      {trip.status}
                    </Badge>

                    {/* Savings Badge */}
                    <Badge className="absolute top-4 right-4 bg-primary text-white font-bold">
                      Saved {trip.savings}
                    </Badge>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                        <Heart className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Trip Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-black text-neutral-900 mb-1">{trip.title}</h3>
                        <div className="flex items-center gap-1 text-neutral-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{trip.destination}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{trip.participants} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span>{trip.budget}/person</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-warning" />
                        <span>by {trip.organizer}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {trip.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {trip.comments}
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-white">
                        Join Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">New Trips Coming Soon!</h3>
            <p className="text-neutral-600">Fresh adventures are being planned every day.</p>
          </TabsContent>

          <TabsContent value="featured" className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Featured Adventures</h3>
            <p className="text-neutral-600">Hand-picked epic trips by our travel experts.</p>
          </TabsContent>
        </Tabs>

        {/* Community CTA */}
        <Card className="mt-16 bg-gradient-to-r from-primary to-secondary border-0 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-black mb-4">Ready to Start Your Own Epic Adventure?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of travelers creating unforgettable memories together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-4">
                Create Your Trip
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-8 py-4 bg-transparent"
              >
                Explore Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
