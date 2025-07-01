"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Star, MapPin, Users, TrendingUp, Heart, MessageSquare, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function SocialProofSection() {
  const [activeTrips, setActiveTrips] = useState(1247)
  const [liveUsers, setLiveUsers] = useState(3892)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrips((prev) => prev + Math.floor(Math.random() * 2) + 1)
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 5) + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Maya P.",
      role: "Marketing Manager, 28",
      avatar: "/placeholder.svg?height=48&width=48",
      content:
        "Literally saved my friend group. We went from 'maybe we should plan something' to booking flights in 2 days. GAME CHANGER! 🔥",
      rating: 5,
      location: "Tulum, Mexico",
      likes: 47,
      verified: true,
    },
    {
      name: "Jake M.",
      role: "Software Engineer, 31",
      avatar: "/placeholder.svg?height=48&width=48",
      content:
        "As the 'planner friend' I was DONE with spreadsheets and group chats. This app gave me my life back and made everyone actually contribute!",
      rating: 5,
      location: "Tokyo, Japan",
      likes: 89,
      verified: true,
    },
    {
      name: "Priya & Squad",
      role: "Teacher, 26 + 7 friends",
      avatar: "/placeholder.svg?height=48&width=48",
      content:
        "Planned our girls trip to Europe in under a week. Split costs, booked everything, zero drama. My friends think I'm a wizard now ✨",
      rating: 5,
      location: "Barcelona, Spain",
      likes: 156,
      verified: true,
    },
  ]

  const painPoints = [
    {
      icon: MessageSquare,
      problem: "Endless group chats",
      solution: "One organized space",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Users,
      problem: "Someone always flakes",
      solution: "Commitment tracking",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: MapPin,
      problem: "Can't agree on anything",
      solution: "Smart voting system",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Zap,
      problem: "Planning takes forever",
      solution: "AI-powered suggestions",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-primary-100 text-primary-700 mb-4 text-sm px-3 py-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            Real People, Real Results
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Join 127,000+ travelers who stopped stressing and started exploring
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            See why everyone's switching from chaotic group chats to organized adventures
          </p>
        </div>

        {/* Pain Points vs Solutions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {painPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Card key={index} className={`${point.bgColor} border-0 hover:shadow-lg transition-shadow duration-200`}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Icon className={`w-8 h-8 ${point.color} mx-auto mb-3`} />
                  <div className="space-y-2">
                    <div className="text-sm text-neutral-600 line-through">{point.problem}</div>
                    <div className="font-semibold text-neutral-900">{point.solution}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16">
          <Card className="text-center p-4 sm:p-6 border-2 border-primary-100 hover:border-primary-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{activeTrips.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-neutral-600 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Trips Being Planned
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 border-2 border-secondary-100 hover:border-secondary-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">{liveUsers.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-neutral-600 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Online Now
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 border-2 border-success-100 hover:border-success-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-success mb-2">4.8</div>
              <div className="text-xs sm:text-sm text-neutral-600 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-warning text-warning" />
                App Store Rating
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 border-2 border-warning-100 hover:border-warning-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-warning mb-2">2.3M</div>
              <div className="text-xs sm:text-sm text-neutral-600">Hours Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Real User Testimonials */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">What real travelers are saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 border-l-primary"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge className="bg-success-100 text-success-700 text-xs px-2 py-1">Verified Trip</Badge>
                    )}
                  </div>

                  <p className="text-neutral-700 font-medium leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary text-white">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                        <div className="text-sm text-neutral-600">{testimonial.role}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Heart className="w-3 h-3" />
                        {testimonial.likes}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* App Store Reviews */}
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-warning text-warning" />
                  ))}
                </div>
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                "Finally, an app that gets group travel right"
              </h3>
              <p className="text-neutral-700 mb-4">
                Rated #1 Travel Planning App by 50,000+ reviews on App Store and Google Play
              </p>
              <div className="text-sm text-neutral-600">
                "Best travel app investment I've ever made" - Featured Review
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}