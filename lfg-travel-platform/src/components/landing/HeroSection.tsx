"use client"

import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Plane, Users, MapPin, Play } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const [activeUsers, setActiveUsers] = useState(12847)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleStartPlanning = () => {
    router.push('/signup')
  }

  const handleJoinCommunity = () => {
    router.push('/discover')
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary-600 to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className="space-y-8 text-white">
            {/* Badge */}
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Users className="w-3 h-3 mr-1" />
                {activeUsers.toLocaleString()}+ Active Travelers
              </Badge>
              <Badge className="bg-accent/20 text-white border-accent/30 backdrop-blur-sm">
                <MapPin className="w-3 h-3 mr-1" />
                Live Trip Planning
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your one-stop shop for all your <span className="text-secondary-200">traveling coordination</span> with
                friends to plan your <span className="text-secondary-200">epic trip</span>
              </h1>

              <h2 className="text-xl sm:text-2xl font-semibold text-white/90">
                Join the world&apos;s first unified social travel ecosystem that replaces fragmented planning with epic
                adventures
              </h2>
            </div>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              Plan, coordinate, and experience travel with your squad while building lasting travel communities
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4 h-auto min-h-[56px] shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleStartPlanning}
              >
                <Plane className="w-5 h-5 mr-2" />
                Start Planning Free
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-4 h-auto min-h-[56px] bg-transparent backdrop-blur-sm transition-all duration-200"
                onClick={handleJoinCommunity}
              >
                <Play className="w-5 h-5 mr-2" />
                Join the Community
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">100K+</div>
                <div className="text-sm text-white/70">Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/70">Trips Planned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-white/70">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-white/70">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/travel-background.jpg"
                alt="Happy diverse group of friends celebrating their travel adventure"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/travel-background.jpg'
                }}
              />

              {/* Floating Elements */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Trip Active</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">8 Travelers</span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-white/10 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-secondary/20 rounded-2xl -z-20"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}