"use client"

import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Plane, Users, Play, Sparkles, Calendar, DollarSign } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const [activeUsers, setActiveUsers] = useState(12847)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const router = useRouter()

  const testimonials = [
    "Finally! No more 47 group chats for one trip 🙌",
    "Turned our chaotic friend group into travel pros ✈️",
    "Best investment for my sanity and friendships 💯",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleStartPlanning = () => {
    router.push('/signup')
  }

  const handleSeeDemo = () => {
    // You can implement a demo modal or navigate to a demo page
    router.push('/demo')
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary-600 to-secondary overflow-hidden">
      {/* Background Pattern - Hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8 text-white text-center lg:text-left">
            {/* Rotating Testimonial */}
            <div className="h-8 flex items-center justify-center lg:justify-start">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-all duration-500">
                {testimonials[currentTestimonial]}
              </div>
            </div>

            {/* Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1">
                <Users className="w-3 h-3 mr-1" />
                {activeUsers.toLocaleString()}+ Planning Right Now
              </Badge>
              <Badge className="bg-success/20 text-white border-success/30 backdrop-blur-sm text-sm px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                #1 Group Travel App
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Stop the group chat chaos.
                <br />
                <span className="text-secondary-200">Start the adventure.</span>
              </h1>

              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/90 max-w-2xl">
                The only app that actually makes planning trips with friends fun (and keeps your friendships intact)
              </h2>
            </div>

            {/* Value Proposition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex flex-col sm:items-start items-center">
                <Calendar className="w-6 h-6 mb-2 text-secondary-200" />
                <span className="text-sm font-medium">Plan in minutes, not months</span>
              </div>
              <div className="flex flex-col sm:items-start items-center">
                <DollarSign className="w-6 h-6 mb-2 text-secondary-200" />
                <span className="text-sm font-medium">Split costs without drama</span>
              </div>
              <div className="flex flex-col sm:items-start items-center">
                <Users className="w-6 h-6 mb-2 text-secondary-200" />
                <span className="text-sm font-medium">Keep everyone in the loop</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto min-h-[48px] sm:min-h-[56px] shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleStartPlanning}
              >
                <Plane className="w-5 h-5 mr-2" />
                Start Planning (It's Free!)
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto min-h-[48px] sm:min-h-[56px] bg-transparent backdrop-blur-sm transition-all duration-200"
                onClick={handleSeeDemo}
              >
                <Play className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold">127K+</div>
                <div className="text-xs sm:text-sm text-white/70">Happy Travelers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">89K+</div>
                <div className="text-xs sm:text-sm text-white/70">Epic Trips</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">4.8★</div>
                <div className="text-xs sm:text-sm text-white/70">App Store</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">2.3M</div>
                <div className="text-xs sm:text-sm text-white/70">Saved Hours</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/travel-background.jpg"
                alt="Group of diverse friends laughing and celebrating their travel adventure with phones showing the LFG app"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/placeholder.svg?height=600&width=500'
                }}
              />

              {/* Floating UI Elements */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-neutral-800">Trip Created!</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs text-neutral-600">Budget Split</div>
                <div className="text-lg font-bold text-success">$1,247 / person</div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-neutral-800">12 Friends Joined</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-white">
                <div className="text-xs">Next Trip</div>
                <div className="text-sm font-bold">Bali in 47 days! 🏝️</div>
              </div>
            </div>

            {/* Background Decoration - Hidden on mobile */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-white/10 rounded-2xl -z-10 hidden sm:block"></div>
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-secondary/20 rounded-2xl -z-20 hidden sm:block"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden sm:flex">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">More awesome stuff below</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}