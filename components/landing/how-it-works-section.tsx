"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Users, Calendar, CreditCard, Camera, ArrowRight, Sparkles, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Dream It",
      description: "Pick your destination and vibe",
      details: ["Smart destination search", "AI-powered suggestions", "Vibe matching"],
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
      emoji: "🌍",
    },
    {
      step: 2,
      icon: Users,
      title: "Squad Up",
      description: "Invite friends or find travel buddies",
      details: ["Easy friend invites", "Travel buddy matching", "Group chat integration"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      emoji: "👥",
    },
    {
      step: 3,
      icon: Calendar,
      title: "Plan Together",
      description: "Collaborate on the perfect itinerary",
      details: ["Real-time planning", "Group voting", "Smart scheduling"],
      color: "from-pink-500 to-red-500",
      bgColor: "bg-pink-50",
      emoji: "📅",
    },
    {
      step: 4,
      icon: CreditCard,
      title: "Split & Pay",
      description: "Handle money stuff without drama",
      details: ["Auto expense splitting", "Secure payments", "Budget tracking"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      emoji: "💳",
    },
    {
      step: 5,
      icon: Camera,
      title: "Live It Up",
      description: "Create memories that last forever",
      details: ["Photo sharing", "Live updates", "Memory timeline"],
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      emoji: "📸",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-secondary text-white mb-6 px-6 py-2 text-lg font-bold">
            <Sparkles className="w-5 h-5 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            From Idea to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-warning ml-4">
              Epic Trip
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-medium">
            Five simple steps to turn your travel dreams into unforgettable adventures
          </p>
        </div>

        {/* Steps */}
