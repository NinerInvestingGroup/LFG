"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, CreditCard, Camera, ArrowRight, Sparkles } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Users,
      title: "Assemble Squad",
      description: "Invite friends or find travel buddies",
      color: "from-blue-500 to-purple-500",
      emoji: "👥",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Plan Together",
      description: "Collaborate on dates, destinations & activities",
      color: "from-purple-500 to-pink-500",
      emoji: "📅",
    },
    {
      step: "03",
      icon: CreditCard,
      title: "Split & Pay",
      description: "Handle expenses and bookings seamlessly",
      color: "from-pink-500 to-red-500",
      emoji: "💳",
    },
    {
      step: "04",
      icon: Camera,
      title: "Create Memories",
      description: "Share photos and relive the adventure",
      color: "from-red-500 to-orange-500",
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
            Simple Process
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-6">
            From Idea to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-4">
              Epic Trip
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
            Four simple steps to turn your travel dreams into unforgettable adventures
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white hover:scale-105">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="text-6xl font-black text-neutral-100 mb-4">{step.step}</div>

                    {/* Emoji */}
                    <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-125">
                      {step.emoji}
                    </div>

                    {/* Icon with Gradient */}
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-black text-neutral-900 mb-3">{step.title}</h3>
                    <p className="text-neutral-600 font-medium">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-secondary border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-3xl font-black mb-4">Ready to Experience the Magic?</h3>
              <p className="text-xl mb-6 opacity-90">
                Join the revolution that's making group travel effortless and epic
              </p>
              <button className="bg-white text-primary hover:bg-neutral-100 font-black px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Planning Now 🎯
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
