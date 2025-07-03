"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Sparkles, MessageSquare, CreditCard, MapPin, Camera } from "lucide-react"
import { useState } from "react"

export function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: MessageSquare,
      title: "End Group Chat Chaos",
      subtitle: "One space, zero drama",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      emoji: "🔥",
    },
    {
      icon: Zap,
      title: "Plan Like a Pro",
      subtitle: "AI does the heavy lifting",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      emoji: "⚡",
    },
    {
      icon: CreditCard,
      title: "Split Bills Easy",
      subtitle: "No math, no drama",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      emoji: "💰",
    },
    {
      icon: Users,
      title: "Squad Goals",
      subtitle: "Find your travel tribe",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
      emoji: "👥",
    },
    {
      icon: MapPin,
      title: "Epic Destinations",
      subtitle: "Discover hidden gems",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      emoji: "🗺️",
    },
    {
      icon: Camera,
      title: "Share Memories",
      subtitle: "Instant photo magic",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      emoji: "📸",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary text-white mb-6 px-6 py-2 text-lg font-bold">
            <Sparkles className="w-5 h-5 mr-2" />
            Everything You Need
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            Travel Made
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-4">
              Simple
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
            Six powerful tools that turn travel chaos into epic adventures
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredFeature === index

            return (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 border-0 shadow-lg hover:shadow-2xl ${
                  isHovered ? "scale-105 -translate-y-2" : ""
                } ${feature.bgColor}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8 text-center">
                  {/* Emoji */}
                  <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-125">
                    {feature.emoji}
                  </div>

                  {/* Icon with Gradient */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 font-medium">{feature.subtitle}</p>

                  {/* Hover Effect */}
                  <div
                    className={`mt-4 transition-all duration-300 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-black mb-4">Ready to Level Up Your Travel Game?</h3>
            <p className="text-xl mb-6 opacity-90">Join the squad that's redefining group travel</p>
            <button className="bg-white text-primary hover:bg-neutral-100 font-black px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Let's Go! 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
