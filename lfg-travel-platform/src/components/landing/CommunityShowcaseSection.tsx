"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { MapPin, Users, Calendar, Heart, MessageCircle, Share2, Trophy, Camera, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CommunityShowcaseSection() {
  const [activeTab, setActiveTab] = useState("trips")

  const featuredTrips = [
    {
      id: 1,
      title: "Epic Southeast Asia Adventure",
      location: "Thailand, Vietnam, Cambodia",
      image: "/images/travel-background.jpg",
      travelers: 8,
      duration: "14 days",
      status: "Active",
      organizer: {
        name: "Alex Chen",
        avatar: "/images/avatars/alex.jpg",
      },
      likes: 124,
      comments: 23,
    },
    {
      id: 2,
      title: "European Summer Festival Tour",
      location: "Spain, France, Netherlands",
      image: "/images/travel-background.jpg",
      travelers: 12,
      duration: "21 days",
      status: "Planning",
      organizer: {
        name: "Maria Santos",
        avatar: "/images/avatars/maria.jpg",
      },
      likes: 89,
      comments: 15,
    },
    {
      id: 3,
      title: "African Safari Experience",
      location: "Kenya, Tanzania",
      image: "/images/travel-background.jpg",
      travelers: 6,
      duration: "10 days",
      status: "Completed",
      organizer: {
        name: "David Kim",
        avatar: "/images/avatars/david.jpg",
      },
      likes: 256,
      comments: 42,
    },
  ]

  const achievements = [
    {
      icon: Trophy,
      title: "Top Travel Organizer",
      description: "Organized 15+ successful group trips",
      user: "Sarah Johnson",
      avatar: "/images/avatars/sarah.jpg",
    },
    {
      icon: Camera,
      title: "Photography Master",
      description: "Shared 500+ travel photos",
      user: "Mike Rodriguez",
      avatar: "/images/avatars/mike.jpg",
    },
    {
      icon: Star,
      title: "Community Helper",
      description: "Helped 100+ travelers plan trips",
      user: "Emma Wilson",
      avatar: "/images/avatars/emma.jpg",
    },
  ]

  const successStories = [
    {
      title: "From Strangers to Best Friends",
      description: "How LFG helped me find my travel family in Japan",
      author: "Jessica Park",
      avatar: "/images/avatars/jessica.jpg",
      image: "/images/travel-background.jpg",
      readTime: "3 min read",
    },
    {
      title: "Planning a 20-Person Wedding Trip",
      description: "Coordinating our dream destination wedding with LFG",
      author: "Tom & Lisa",
      avatar: "/images/avatars/couple.jpg",
      image: "/images/travel-background.jpg",
      readTime: "5 min read",
    },
  ]

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-accent-100 text-accent-700 mb-4">Community</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Discover amazing trips from our community
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Get inspired by real travelers sharing their epic adventures and planning new ones
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab("trips")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "trips" ? "bg-primary text-white" : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Featured Trips
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "achievements" ? "bg-primary text-white" : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "stories" ? "bg-primary text-white" : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Success Stories
            </button>
          </div>
        </div>

        {/* Featured Trips */}
        {activeTab === "trips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="relative">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/travel-background.jpg'
                    }}
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${
                      trip.status === "Active"
                        ? "bg-accent text-white"
                        : trip.status === "Planning"
                          ? "bg-secondary text-white"
                          : "bg-neutral-500 text-white"
                    }`}
                  >
                    {trip.status}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{trip.title}</h3>

                  <div className="flex items-center text-sm text-neutral-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trip.location}
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
                        <AvatarImage src={trip.organizer.avatar} alt={trip.organizer.name} />
                        <AvatarFallback>
                          {trip.organizer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{trip.organizer.name}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-neutral-600">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-neutral-600 mb-4">{achievement.description}</p>

                    <div className="flex items-center justify-center gap-2">
                      <Avatar>
                        <AvatarImage src={achievement.avatar} alt={achievement.user} />
                        <AvatarFallback>
                          {achievement.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{achievement.user}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Success Stories */}
        {activeTab === "stories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                <Image
                  src={story.image}
                  alt={story.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/travel-background.jpg'
                  }}
                />

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                  <p className="text-neutral-600 mb-4">{story.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={story.avatar} alt={story.author} />
                        <AvatarFallback>
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
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

        {/* Social Media Integration */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Share your adventures with the world</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Connect your social media accounts and automatically share your travel highlights with friends and the LFG
              community
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

            <Button className="bg-white text-primary hover:bg-white/90 font-semibold">Connect Social Accounts</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}