"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, MessageCircle, TrendingUp, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function SocialProofSection() {
  const [activeTrips, setActiveTrips] = useState(1247)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const visualTestimonials = [
    {
      name: "Maya & Squad",
      handle: "@mayaadventures",
      avatar: "/placeholder.svg?height=60&width=60",
      image: "/placeholder.svg?height=400&width=600&text=Tulum+Beach+Vibes",
      content: "LFG turned our chaotic group chat into the most epic Tulum trip ever! 🏝️",
      likes: 247,
      location: "Tulum, Mexico",
      verified: true,
    },
    {
      name: "Jake's Crew",
      handle: "@jakesquad",
      avatar: "/placeholder.svg?height=60&width=60",
      image: "/placeholder.svg?height=400&width=600&text=Tokyo+Neon+Nights",
      content: "From planning disaster to Tokyo magic in 48 hours. This app is INSANE! ⚡",
      likes: 189,
      location: "Tokyo, Japan",
      verified: true,
    },
    {
      name: "Priya's Girls",
      handle: "@priyastravel",
      avatar: "/placeholder.svg?height=60&width=60",
      image: "/placeholder.svg?height=400&width=600&text=Barcelona+Squad+Goals",
      content: "8 girls, 3 countries, ZERO drama. LFG is pure magic! ✨",
      likes: 356,
      location: "Barcelona, Spain",
      verified: true,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrips((prev) => prev + Math.floor(Math.random() * 2) + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % visualTestimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-success text-white mb-6 px-6 py-2 text-lg font-bold">
            <TrendingUp className="w-5 h-5 mr-2" />
            Social Proof
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            Real Squads,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-primary ml-4">
              Real Adventures
            </span>
          </h2>
        </div>

        {/* Live Stats Bar */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-16 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black mb-1">{activeTrips.toLocaleString()}</div>
              <div className="text-sm opacity-80 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Planning Right Now
              </div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1">4.9★</div>
              <div className="text-sm opacity-80">App Store Rating</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1">127K+</div>
              <div className="text-sm opacity-80">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1">2.3M</div>
              <div className="text-sm opacity-80">Hours Saved</div>
            </div>
          </div>
        </div>

        {/* Visual Testimonials Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-3xl">
            {visualTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentTestimonial
                    ? "opacity-100 translate-x-0"
                    : index < currentTestimonial
                      ? "opacity-0 -translate-x-full absolute inset-0"
                      : "opacity-0 translate-x-full absolute inset-0"
                }`}
              >
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <div className="relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`${testimonial.name} adventure`}
                      width={600}
                      height={400}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Social Media Style Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12 border-2 border-white">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary text-white">
                            {testimonial.name.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white">{testimonial.name}</span>
                            {testimonial.verified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                            <span className="text-white/70 text-sm">{testimonial.handle}</span>
                          </div>
                          <p className="text-white font-medium mb-2">{testimonial.content}</p>
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {testimonial.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {Math.floor(testimonial.likes / 5)}
                            </div>
                            <span>{testimonial.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {visualTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-primary scale-125" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* App Store Reviews */}
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-0 p-8">
          <CardContent className="p-0 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-3xl font-black">4.9</span>
            </div>
            <h3 className="text-2xl font-black text-neutral-900 mb-2">"This app is pure travel magic! ✨"</h3>
            <p className="text-neutral-700 mb-4 text-lg">50,000+ five-star reviews can't be wrong</p>
            <Badge className="bg-success text-white px-4 py-2">
              <Zap className="w-4 h-4 mr-1" />
              #1 Travel App
            </Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
