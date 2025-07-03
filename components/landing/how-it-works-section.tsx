"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Users, Calendar, CreditCard, Camera, ArrowRight, Sparkles, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Dream It",
      desc: "Pick your destination & vibe",
      emoji: "🌍",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      icon: Users,
      title: "Squad Up",
      desc: "Invite friends or find buddies",
      emoji: "👥",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      icon: Calendar,
      title: "Plan Together",
      desc: "Create the perfect itinerary",
      emoji: "📅",
      gradient: "from-pink-500 to-red-500",
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Split & Pay",
      desc: "Handle money drama-free",
      emoji: "💳",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      icon: Camera,
      title: "Live It Up",
      desc: "Capture epic memories",
      emoji: "📸",
      gradient: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 text-lg font-bold">
            <Sparkles className="w-5 h-5" />
            How It Works
          </Badge>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900">
            From Idea to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-warning">Epic Trip</span>
          </h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto font-medium">
            Five simple steps to turn your travel dreams into unforgettable adventures
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map(({ id, icon: Icon, title, desc, emoji, gradient }) => (
            <Card
              key={id}
              className="group border-0 bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="text-6xl font-black text-neutral-100 mb-4">{String(id).padStart(2, "0")}</div>

                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">{emoji}</div>

                <div
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center transition-transform duration-300 group-hover:rotate-12`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-black text-neutral-900 mb-2">{title}</h3>
                <p className="text-neutral-600 font-medium">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-primary to-secondary border-0 text-white">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-3xl font-black mb-4">Ready to Skip the Chaos?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands who’ve made group travel effortless and unforgettable.
            </p>
            <Button
              size="lg"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 font-bold px-8 py-4 rounded-2xl text-lg"
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
