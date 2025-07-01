"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { MapPin, Users, Calendar, Heart, MessageCircle, Share2, Trophy, Camera, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CommunityShowcaseSection() {
  const [activeTab, setActiveTab] = useState("trips")

  const featuredTrips = [
    {
      id: 1,
      title: "Epic Southeast Asia Squad Trip",
      location: "Thailand → Vietnam → Cambodia",
      image: "/placeholder.svg?height=300&width=400",
      travelers: 8,
      duration: "14 days",
      status: "Just Finished",
      organizer: {
        name: "Alex & Crew",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 324,
      comments: 67,
      highlight: "Saved $2,400 per person with group bookings",
      vibe: "🏝️ Beach + Culture + Nightlife",
    },
    {
      id: 2,
      title: "European Festival Hopping",
      location: "Amsterdam → Berlin → Barcelona",
      image: "/placeholder.svg?height=300&width=400",
      travelers: 12,
      duration: "21 days",
      status: "Planning Now",
      organizer: {
        name: "Maria's Squad",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 189,
      comments: 43,
      highlight: "3 festivals, 12 friends, zero drama",
      vibe: "🎵 Music + Art + Good Vibes",
    },
    {
      id: 3,
      title: "African Safari Adventure",
      location: "Kenya → Tanzania",
      image: "/placeholder.svg?height=300&width=400",
      travelers: 6,
      duration: "10 days",
      status: "Life Changed",
      organizer: {
        name: "David's Crew",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 456,
      comments: 89,
      highlight: "Once-in-a-lifetime experience",
      vibe: "🦁 Wildlife + Adventure + Photography",
    },
  ]

  const achievements = [
    {
      icon: Trophy,
      title: "Squad Goals Master",
      description: "Organized 15+ epic group trips without losing friends",
      user: "Sarah J., 29",
      avatar: "/placeholder.svg?height=48&width=48",
      stat: "15 trips, 127 happy travelers",
    },
    {
      icon: Camera,
      title: "Memory Maker",
      description: "Captured and shared 500+ travel moments",
      user: "Mike R., 34",
      avatar: "/placeholder.svg?height=48&width=48",
      stat: "500+ photos, 50K+ likes",
    },
    {
      icon: Star,
      title: "Travel Guru",
      description: "Helped 100+ people plan their dream trips",
      user: "Emma W., 26",
      avatar: "/placeholder.svg?height=48&width=48",
      stat: "100+ trips advised, 4.9★ rating",
    },
  ]

  const successStories = [
    {
      title: "From Tinder Match to Travel Squad",
      description: "How I found my travel family through LFG and we've been exploring the world together for 2 years",
      author: "Jessica P., 28",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "3 min read",
      category: "Friendship",
    },
    {
      title: "Planning Our Dream Wedding Trip",
      description:
        "Coordinating 20 people across 3 countries for our destination wedding (and everyone actually showed up!)",
      author: "Tom & Lisa, 31 & 29",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min read",
      category: "Wedding",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-success-100 text-success-700 mb-4 text-sm px-3 py-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            Real Trips, Real People
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Get inspired by epic adventures happening right now
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            See what's possible when group travel actually works. These are real trips from real people in our
            community.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab("trips")}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === "trips" ? "bg-primary text-white" : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Live Trips
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === "achievements" ? "bg-primary text-white" : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Community Stars
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === "stories" ? "bg-primary text-white" : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Success Stories
            </button>
          </div>
        </div>

        {/* Featured Trips */}
        {activeTab === "trips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredTrips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 group"
              >
                <div className="relative">
                  <Image
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <Badge
                    className={`absolute top-3 left-3 text-xs px-2 py-1 ${
                      trip.status === "Just Finished"
                        ? "bg-success text-white"
                        : trip.status === "Planning Now"
                          ? "bg-warning text-white"
                          : "bg-primary text-white"
                    }`}
                  >
                    {trip.status}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs">
                    {trip.vibe}
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg mb-2">{trip.title}</h3>

                  <div className="flex items-center text-sm text-neutral-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{trip.location}</span>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-3 mb-4">
                    <div className="text-sm font-medium text-primary">{trip.highlight}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {trip.travelers} travelers
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
                          {trip.organizer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{trip.organizer.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
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

        {/* Achievements */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card
                  key={index}
                  className="p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-neutral-600 mb-4">{achievement.description}</p>

                    <div className="bg-neutral-50 rounded-lg p-3 mb-4">
                      <div className="text-sm font-medium text-neutral-700">{achievement.stat}</div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <Avatar>
                        <AvatarImage src={achievement.avatar || "/placeholder.svg"} alt={achievement.user} />
                        <AvatarFallback className="bg-primary text-white">
                          {achievement.user.split(" ")[0].split("")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{achievement.user}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Success Stories */}
        {activeTab === "stories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />

                <CardContent className="p-4 sm:p-6">
                  <Badge className="bg-primary-100 text-primary-700 text-xs px-2 py-1 mb-3">{story.category}</Badge>
                  <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                  <p className="text-neutral-600 mb-4">{story.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.author} />
                        <AvatarFallback className="bg-primary text-white text-xs">
                          {story.author.split(" ")[0].split("")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{story.author}</span>
                    </div>

                    <span className="text-sm text-neutral-500">{story.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Social Media Integration CTA */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to create your own epic story?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who've transformed their group trips from stressful to spectacular. Your
              adventure starts here.
            </p>

            <div className="flex justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
              Start Your Epic Trip
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
