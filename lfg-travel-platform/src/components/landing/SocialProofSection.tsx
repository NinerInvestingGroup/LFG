"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
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
      avatar: "/images/avatars/sarah.jpg",
      content: "LFG transformed how we plan group trips. No more endless group chats and confusion!",
      rating: 5,
      location: "Bali, Indonesia",
    },
    {
      name: "Marcus Johnson",
      role: "Travel Blogger",
      avatar: "/images/avatars/marcus.jpg",
      content: "The community aspect is incredible. I've met lifelong travel buddies through LFG.",
      rating: 5,
      location: "Tokyo, Japan",
    },
    {
      name: "Elena Rodriguez",
      role: "Digital Nomad",
      avatar: "/images/avatars/elena.jpg",
      content: "Finally, a platform that gets group travel. The coordination tools are game-changing.",
      rating: 5,
      location: "Barcelona, Spain",
    },
  ]

  const integrations = [
    { name: "Stripe", logo: "/images/logos/stripe.svg" },
    { name: "Google Maps", logo: "/images/logos/google-maps.svg" },
    { name: "Instagram", logo: "/images/logos/instagram.svg" },
    { name: "WhatsApp", logo: "/images/logos/whatsapp.svg" },
    { name: "Airbnb", logo: "/images/logos/airbnb.svg" },
    { name: "Booking.com", logo: "/images/logos/booking.svg" },
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
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                Active Trips Planning
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-secondary-100 hover:border-secondary-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-secondary mb-2">{liveUsers.toLocaleString()}</div>
              <div className="text-sm text-neutral-600 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                Online Now
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-accent-100 hover:border-accent-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-accent mb-2">4.9</div>
              <div className="text-sm text-neutral-600 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-secondary text-secondary" />
                Average Rating
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-secondary-100 hover:border-secondary-200 transition-colors">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-secondary mb-2">150+</div>
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
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>

                  <p className="text-neutral-700 italic">&quot;{testimonial.content}&quot;</p>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
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
                  &quot;LFG has revolutionized group travel coordination. It&apos;s the platform we recommend to all our clients
                  for seamless trip planning.&quot;
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
                <div className="w-24 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-neutral-600">{integration.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}