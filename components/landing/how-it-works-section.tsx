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
      description: "Pick your destination & vibe",
      color: "from-blue-500 to-purple-500",
      emoji: "🌍",
    },
    {
      step: 2,
      icon: Users,
      title: "Squad Up",
      description: "Invite friends or find buddies",
      color: "from-purple-500 to-pink-500",
      emoji: "👥",
    },
    {
      step: 3,
      icon: Calendar,
      title: "Plan Together",
      description: "Collaborate on dates & ideas",
      color: "from-pink-500 to-red-500",
      emoji: "📅",
    },
    {
      step: 4,
      icon: CreditCard,
      title: "Split & Pay",
      description: "Handle expenses drama-free",
      color: "from-green-500 to-emerald-500",
      emoji: "💳",
    },
    {
      step: 5,
      icon: Camera,
      title: "Live It Up",
      description: "Capture epic memories",
      color: "from-yellow-500 to-orange-500",
      emoji: "📸",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-secondary text-white mb-6 px-6 py-2 text-lg font-bold inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            How It Works
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            From Idea to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-warning ml-3">
              Epic Trip
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-medium">
            Five simple steps to turn your travel dreams into unforgettable adventures
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {steps.map(({ step, icon: Icon, title, description, color, emoji }) => (
            <Card
              key={step}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                {/* Step number */}
                <div className="text-6xl font-black text-neutral-100 mb-4">{String(step).padStart(2, "0")}</div>

                {/* Emoji */}
                <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-125">
                  {emoji}
                </div>

                {/* Icon with gradient background */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-black text-neutral-900 mb-2">{title}</h3>
                <p className="text-neutral-600 font-medium">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-secondary border-0 text-white">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-3xl font-black mb-4">Ready to Skip the Chaos?</h3>
            <p className="text-xl mb-6 opacity-90">Join thousands who’ve made group travel effortless and epic.</p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-4 rounded-2xl text-lg flex items-center gap-2"
            >
              Start Planning Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
