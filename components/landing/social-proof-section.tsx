"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

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
      name: "Sarah Chen",
      role: "Adventure Enthusiast",
      avatar: "/placeholder.svg?height=48&width=48",
      content: "LFG transformed how we plan group trips. No more endless group chats and confusion!",
      rating: 5,
      location: "Bali, Indonesia",
    },
    {
      name: "Marcus Johnson",
      role: "Travel Blogger",
      avatar: "/placeholder.svg?height=48&width=48",
      content: "The community aspect is incredible. I've met lifelong travel buddies through LFG.",
      rating: 5,
      location: "Tokyo, Japan",
    },
    {
      name: "Elena Rodriguez",
      role: "Digital Nomad",
      avatar: "/placeholder.svg?height=48&width=48",
      content: "Finally, a platform that gets group travel. The coordination tools are game-changing.",
      rating: 5,
      location: "Barcelona, Spain",
    },
  ]

  const integrations = [
    { name: "Stripe", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Google Maps", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Instagram", logo: "/placeholder.svg?height=40&width=120" },
    { name: "WhatsApp", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Airbnb", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Booking.com", logo: "/placeholder.svg?height=40&width=120" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary-100 text-primary-700 mb-4">
            <TrendingUp className="w-4 h-4 mr-1" />
            Growing Community
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Join 100,000+ travelers in the LFG community
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Trusted by adventure seekers worldwide to plan unforgettable experiences
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center p-6 border-2 border-primary-100 hover:border-primary-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary mb-2">{activeTrips.toLocaleString()}</div>
              <div className="text-sm text-neutral-600 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Active Trips Planning
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-secondary-100 hover:border-secondary-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-secondary mb-2">{liveUsers.toLocaleString()}</div>
              <div className="text-sm text-neutral-600 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Online Now
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-success-100 hover:border-success-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-success mb-2">4.9</div>
              <div className="text-sm text-neutral-600 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-warning text-warning" />
                Average Rating
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-warning-100 hover:border-warning-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-warning mb-2">150+</div>
              <div className="text-sm text-neutral-600">Countries Covered</div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What travelers are saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>

                  <p className="text-neutral-700 italic">"{testimonial.content}"</p>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600">{testimonial.role}</div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Travel Advisor Endorsement */}
        <Card className="mb-16 bg-gradient-to-r from-primary-50 to-secondary-50 border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Endorsed by Professional Travel Advisors</h3>
                <p className="text-neutral-700">
                  "LFG has revolutionized group travel coordination. It's the platform we recommend to all our clients
                  for seamless trip planning."
                </p>
                <div className="mt-3 text-sm text-neutral-600">- Travel Professionals Association</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Logos */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-700 mb-8">
            Trusted integrations with your favorite platforms
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-80 transition-opacity">
            {integrations.map((integration, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={integration.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
