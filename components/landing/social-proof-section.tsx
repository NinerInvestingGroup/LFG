"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, MessageCircle, MapPin, Users } from "lucide-react"
import { useState, useEffect } from "react"

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah & Squad",
      location: "Tokyo, Japan",
      image: "/images/social-proof-1.jpg",
      text: "LFG turned our chaotic group chat into the most organized trip ever!",
      likes: 247,
      comments: 18,
      savings: "$1,200",
      groupSize: 5,
      rating: 5,
    },
    {
      name: "Mike's Crew",
      location: "Bali, Indonesia",
      image: "/images/social-proof-2.jpg",
      text: "From planning to splitting bills - everything just worked perfectly.",
      likes: 189,
      comments: 23,
      savings: "$890",
      groupSize: 4,
      rating: 5,
    },
    {
      name: "The Adventure Gang",
      location: "Swiss Alps",
      image: "/images/social-proof-3.jpg",
      text: "Best travel app ever! Our Swiss Alps trip was absolutely legendary.",
      likes: 312,
      comments: 31,
      savings: "$1,500",
      groupSize: 6,
      rating: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-success text-white mb-6 px-6 py-2 text-lg font-bold">
            <Heart className="w-5 h-5 mr-2" />
            Loved by Travelers
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-6">
            Real Adventures,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-4">
              Real Stories
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
            See how LFG is transforming group travel around the world
          </p>
        </div>

        {/* Instagram-style Testimonial Carousel */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="relative">
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Stats */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {testimonials[currentTestimonial].location}
                  </Badge>
                  <Badge className="bg-success/90 text-white backdrop-blur-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {testimonials[currentTestimonial].groupSize} friends
                  </Badge>
                </div>

                {/* Savings Badge */}
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-primary text-white font-bold px-3 py-2">
                    Saved {testimonials[currentTestimonial].savings}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                {/* User Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonials[currentTestimonial].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">{testimonials[currentTestimonial].name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-neutral-700 mb-4 font-medium">{testimonials[currentTestimonial].text}</p>

                {/* Social Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      <span className="text-sm font-medium">{testimonials[currentTestimonial].likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5 text-neutral-500" />
                      <span className="text-sm font-medium">{testimonials[currentTestimonial].comments}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Verified Trip
                  </Badge>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-primary" : "bg-neutral-300"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50K+", label: "Happy Travelers", emoji: "✈️" },
            { number: "15K+", label: "Epic Trips", emoji: "🌍" },
            { number: "$2M+", label: "Money Saved", emoji: "💰" },
            { number: "4.9★", label: "App Rating", emoji: "⭐" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div className="text-3xl font-black text-neutral-900 mb-1">{stat.number}</div>
              <div className="text-neutral-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
