"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, Heart, MessageCircle, Share2, Trophy, Camera, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CommunityShowcaseSection() {
  const [activeTab, setActiveTab] = useState("trips")

  const trendingTrips = [
    {
      id: 1,
      title: "Bali Squad Goals",
      location: "Bali, Indonesia",
      image: "/placeholder.svg?height=300&width=400&text=Bali+Beach+Vibes",
      travelers: 8,
      duration: "10 days",
      status: "🔥 Trending",
      organizer: {
        name: "Alex & Crew",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 324,
      comments: 67,
      vibe: "🏝️ Beach + Culture",
      savings: "$2,400 saved",
    },
    {
      id: 2,
      title: "European Festival Run",
      location: "Amsterdam → Berlin → Barcelona",
      image: "/placeholder.svg?height=300&width=400&text=Festival+Lights",
      travelers: 12,
      duration: "21 days",
      status: "⚡ Live Planning",
      organizer: {
        name: "Maria's Squad",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 189,
      comments: 43,
      vibe: "🎵 Music + Vibes",
      savings: "Group rates locked",
    },
    {
      id: 3,
      title: "Safari Adventure",
      location: "Kenya → Tanzania",
      image: "/placeholder.svg?height=300&width=400&text=Safari+Wildlife",
      travelers: 6,
      duration: "12 days",
      status: "✨ Just Finished",
      organizer: {
        name: "David's Crew",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 456,
      comments: 89,
      vibe: "🦁 Wildlife + Adventure",
      savings: "Once in a lifetime",
    },
  ]

  const communityStats = [
    {
      icon: Trophy,
      title: "Squad Master",
      stat: "15 Epic Trips",
      user: "Sarah J.",
      avatar: "/placeholder.svg?height=48&width=48",
      badge: "🏆",
    },
    {
      icon: Camera,
      title: "Memory Maker",
      stat: "500+ Photos Shared",
      user: "Mike R.",
      avatar: "/placeholder.svg?height=48&width=48",
      badge: "📸",
    },
    {
      icon: Star,
      title: "Travel Guru",
      stat: "4.9★ Trip Rating",
      user: "Emma W.",
      avatar: "/placeholder.svg?height=48&width=48",
      badge: "⭐",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-primary to-secondary text-white mb-6 px-6 py-2 text-lg font-bold">
            <TrendingUp className="w-5 h-5 mr-2" />
            Community Vibes
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            Epic Adventures
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-4">
              Happening Now
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
            Real trips, real people, real magic ✨
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border">
            <button
              onClick={() => setActiveTab("trips")}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "trips"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              🔥 Trending Trips
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "stats"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              🏆 Community Stars
            </button>
          </div>
        </div>

        {/* Trending Trips */}
        {activeTab === "trips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {trendingTrips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-0 group hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <Badge className="absolute top-3 left-3 bg-white/90 text-neutral-900 border-0 font-bold">
                    {trip.status}
                  </Badge>

                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-bold">
                    {trip.vibe}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-xl p-3 text-white">
                      <div className="text-xs opacity-80 mb-1">💰 {trip.savings}</div>
                      <div className="font-bold">{trip.title}</div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-neutral-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{trip.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {trip.travelers} squad
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {trip.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={trip.organizer.avatar || "/placeholder.svg"} alt={trip.organizer.name} />
                        <AvatarFallback className="bg-primary text-white text-xs">
                          {trip.organizer.name.split(" ")[0][0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold">{trip.organizer.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        {trip.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {trip.comments}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Community Stats */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {communityStats.map((stat, index) => (
              <Card
                key={index}
                className="p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border-0 group hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-125">
                    {stat.badge}
                  </div>

                  <h3 className="font-black text-xl mb-2">{stat.title}</h3>
                  <div className="text-2xl font-black text-primary mb-4">{stat.stat}</div>

                  <div className="flex items-center justify-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={stat.avatar || "/placeholder.svg"} alt={stat.user} />
                      <AvatarFallback className="bg-primary text-white">{stat.user.split(" ")[0][0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{stat.user}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Join Community CTA */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-3xl font-black mb-4">Ready to Join the Adventure?</h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              Your squad is waiting. Your next epic trip is one click away.
            </p>

            <div className="flex justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            <Button className="bg-white text-primary hover:bg-neutral-100 font-black px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Epic Journey ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
