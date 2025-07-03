"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, Sparkles, ArrowRight, Play, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [activeUsers, setActiveUsers] = useState(12847)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const heroPhotos = [
    "/placeholder.svg?height=800&width=1200&text=Epic+Beach+Squad",
    "/placeholder.svg?height=800&width=1200&text=Mountain+Adventure",
    "/placeholder.svg?height=800&width=1200&text=City+Exploration",
    "/placeholder.svg?height=800&width=1200&text=Festival+Vibes",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % heroPhotos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background Photos */}
      <div className="absolute inset-0">
        {heroPhotos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentPhoto ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={photo || "/placeholder.svg"}
              alt="Epic travel adventure"
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-bounce delay-1000 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-bold text-sm">Trip Saved!</span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-20 animate-pulse hidden lg:block">
        <div className="bg-primary/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl text-white">
          <div className="text-xs opacity-80">Next Adventure</div>
          <div className="font-bold">Bali in 23 days! 🏝️</div>
        </div>
      </div>

      <div className="absolute bottom-32 right-16 animate-bounce delay-500 hidden lg:block">
        <div className="bg-success/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl text-white">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="font-bold text-sm">Squad Assembled!</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Live Badge */}
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <Badge className="bg-red-500 text-white border-0 px-4 py-2 text-sm font-bold animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                LIVE
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                {activeUsers.toLocaleString()}+ Planning Now
              </Badge>
            </div>

            {/* Main Headlines */}
            <div className="space-y-6 mb-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
                Epic Adventures
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 to-warning-300">
                  Start Here
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90 max-w-2xl">
                Turn friends into travel squad. Turn plans into memories.
              </h2>
            </div>

            {/* Quick Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Sparkles className="w-6 h-6 text-warning-300 mb-2" />
                <div className="text-white font-bold">Plan in Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Users className="w-6 h-6 text-secondary-200 mb-2" />
                <div className="text-white font-bold">Squad Goals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Plane className="w-6 h-6 text-primary-200 mb-2" />
                <div className="text-white font-bold">Zero Drama</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/auth/signup" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-bold text-lg px-8 py-6 h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plane className="w-6 h-6 mr-3" />
                  Start Your Adventure
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-6 h-auto rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch Magic Happen
              </Button>
            </div>

            {/* Social Proof Numbers */}
            <div className="flex flex-wrap gap-6 text-white">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black">127K+</div>
                <div className="text-sm opacity-80">Epic Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black">4.9★</div>
                <div className="text-sm opacity-80">Pure Magic</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black">89K+</div>
                <div className="text-sm opacity-80">Happy Squads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll for more magic</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
