"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, Users, MapPin, Star, ArrowRight, Sparkles, TrendingUp, Globe, Heart } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const adventureImages = [
    {
      src: "/images/hero-adventure-1.jpg",
      alt: "Group of friends hiking in mountains",
      caption: "Mountain Adventures",
    },
    {
      src: "/images/hero-adventure-2.jpg",
      alt: "Friends exploring ancient ruins",
      caption: "Cultural Exploration",
    },
    {
      src: "/images/hero-adventure-3.png",
      alt: "Adventure travelers at scenic overlook",
      caption: "Epic Destinations",
    },
  ]

  const quickStats = [
    { icon: Users, label: "15K+ Travelers", value: "Active Community" },
    { icon: MapPin, label: "89 Countries", value: "Destinations" },
    { icon: Star, label: "4.9/5 Rating", value: "User Reviews" },
    { icon: TrendingUp, label: "$2.1M Saved", value: "Group Discounts" },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=pattern')] opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-warning/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-lg font-bold inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              #1 Group Travel Platform
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-neutral-900 leading-tight">
                Let's Fucking
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-warning block">
                  Go!
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-neutral-600 font-medium max-w-2xl">
                Turn your travel dreams into reality. Connect with like-minded adventurers, split costs, and create
                unforgettable memories together.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Find Your Squad</div>
                  <div className="text-sm text-neutral-600">Connect with travelers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Save Money</div>
                  <div className="text-sm text-neutral-600">Split costs & get deals</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold"
              >
                Start Your Adventure
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-bold bg-transparent"
              >
                <Plane className="w-5 h-5 mr-2" />
                Explore Trips
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-sm font-bold text-neutral-900">{stat.label}</div>
                    <div className="text-xs text-neutral-600">{stat.value}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="relative">
            {/* Main Adventure Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {adventureImages.map((image, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                    index === 0 ? "col-span-2" : ""
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={index === 0 ? 600 : 300}
                      height={index === 0 ? 300 : 200}
                      className={`w-full object-cover ${index === 0 ? "h-48" : "h-32"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-bold text-lg">{image.caption}</div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Floating Success Card */}
            <Card className="absolute -bottom-6 -left-6 bg-white border-0 shadow-2xl p-4 max-w-xs">
              <CardContent className="p-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900">Sarah's Bali Trip</div>
                    <div className="text-sm text-neutral-600">Saved $800 with 6 friends!</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                      ))}
                      <span className="text-xs text-neutral-600 ml-1">Amazing experience!</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Stats Card */}
            <Card className="absolute -top-6 -right-6 bg-gradient-to-br from-primary to-secondary text-white border-0 shadow-2xl p-4">
              <CardContent className="p-0 text-center">
                <div className="text-2xl font-black">1,247</div>
                <div className="text-sm opacity-90">Active Trips</div>
                <div className="text-xs opacity-75 mt-1">+12% this week</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
