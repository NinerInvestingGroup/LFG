"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Settings, MapPin, Share2, Zap, CheckCircle } from "lucide-react"
import { useState } from "react"

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      step: 1,
      icon: Users,
      title: "Assemble Squad",
      subtitle: "Find your travel tribe",
      time: "2 min",
      emoji: "👥",
      color: "from-blue-500 to-purple-500",
    },
    {
      step: 2,
      icon: Calendar,
      title: "Plan Together",
      subtitle: "AI + group magic",
      time: "30 min",
      emoji: "📅",
      color: "from-purple-500 to-pink-500",
    },
    {
      step: 3,
      icon: Settings,
      title: "Auto-Coordinate",
      subtitle: "We handle the boring stuff",
      time: "5 min",
      emoji: "⚙️",
      color: "from-pink-500 to-red-500",
    },
    {
      step: 4,
      icon: MapPin,
      title: "Live Adventure",
      subtitle: "Stay connected on the go",
      time: "Epic",
      emoji: "🗺️",
      color: "from-red-500 to-orange-500",
    },
    {
      step: 5,
      icon: Share2,
      title: "Share Magic",
      subtitle: "Memories that last forever",
      time: "Forever",
      emoji: "✨",
      color: "from-orange-500 to-yellow-500",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-secondary text-white mb-6 px-6 py-2 text-lg font-bold">
            <Zap className="w-5 h-5 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
            From Idea to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary ml-4">
              Epic Trip
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">Five simple steps to travel magic ✨</p>
        </div>

        {/* Interactive Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-500 border-0 shadow-lg hover:shadow-2xl ${
                  isActive ? "scale-105 -translate-y-2" : ""
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="text-3xl font-black text-neutral-300 mb-2">{step.step}</div>

                  {/* Emoji */}
                  <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-125">
                    {step.emoji}
                  </div>

                  {/* Icon with Gradient */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center transform transition-all duration-300 ${
                      isActive ? "rotate-12 scale-110" : ""
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black text-neutral-900 mb-1">{step.title}</h3>
                  <p className="text-neutral-600 text-sm mb-3">{step.subtitle}</p>

                  {/* Time Badge */}
                  <Badge className="bg-neutral-100 text-neutral-700 text-xs px-3 py-1">{step.time}</Badge>

                  {/* Active Indicator */}
                  <div
                    className={`mt-4 transition-all duration-300 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className={`w-12 h-1 bg-gradient-to-r ${step.color} rounded-full mx-auto`}></div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Active Step Details */}
        <Card className="bg-gradient-to-r from-neutral-50 to-primary-50 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">{steps[activeStep].emoji}</div>
            <h3 className="text-2xl font-black text-neutral-900 mb-4">
              Step {steps[activeStep].step}: {steps[activeStep].title}
            </h3>
            <p className="text-lg text-neutral-600 mb-6 max-w-2xl mx-auto">
              {steps[activeStep].subtitle} - Everything happens in {steps[activeStep].time.toLowerCase()}
            </p>
            <div className="flex items-center justify-center gap-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold">No stress, just adventure</span>
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-black mb-4">Ready to Skip the Chaos?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands who've discovered the secret to stress-free group travel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-neutral-100 font-black px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Planning Now 🚀
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary font-black px-8 py-4 rounded-2xl text-lg transition-all duration-300">
                Watch 2-Min Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
