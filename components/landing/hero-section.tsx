"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, MapPin, Calendar, Star } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const heroImages = ["/images/hero-adventure-1.jpg", "/images/hero-adventure-2.jpg", "/images/hero-adventure-3.png"]

  const floatingStats = [
    { icon: Users, label: "Squad Size", value: "6 friends", color: "bg-blue-500" },
    { icon: MapPin, label: "Destination", value: "Bali, Indonesia", color: "bg-green-500" },
    { icon: Calendar, label: "Duration", value: "7 days", color: "bg-purple-500" },
    { icon: Star, label: "Vibe Check", value: "Epic AF", color: "bg-yellow-500" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Adventure ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Floating UI Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {floatingStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className={`absolute ${
                index === 0
                  ? "top-20 left-8"
                  : index === 1
                    ? "top-32 right-12"
                    : index === 2
                      ? "bottom-40 left-16"
                      : "bottom-24 right-8"
              } transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">{stat.label}</p>
                    <p className="text-sm font-bold text-neutral-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Badge */}
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-6 px-6 py-2 text-lg font-bold">
            <Star className="w-5 h-5 mr-2" />
            #1 Group Travel App
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Epic Adventures
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Start Here
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
            Turn friends into travel squad. Plan trips that actually happen. Create memories that last forever.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-12 py-6 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Adventure
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white"
                  ></div>
                ))}
              </div>
              <span className="font-medium">50K+ travelers</span>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-medium">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
