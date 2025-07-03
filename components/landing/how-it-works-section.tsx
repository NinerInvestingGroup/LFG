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
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 1

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-16`}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-black text-xl">
                      {step.step}
                    </div>
                    <div className="text-4xl">{step.emoji}</div>
                  </div>

                  <h3 className="text-3xl font-black text-neutral-900 mb-4">{step.title}</h3>
                  <p className="text-xl text-neutral-600 mb-6 font-medium">{step.description}</p>

                  <div className="space-y-3 mb-6">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-neutral-700 font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-bold">
                      <span>Next Step</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-md">
                  <Card
                    className={`${step.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:scale-110`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      <div className="text-6xl mb-4">{step.emoji}</div>

                      <h4 className="text-xl font-black text-neutral-900 mb-2">{step.title}</h4>
                      <p className="text-neutral-600 font-medium">{step.description}</p>

                      <div className="mt-6 w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${(step.step / steps.length) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-3xl font-black mb-4">Ready to Turn Your Travel Dreams Into Reality?</h3>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of travelers who've already discovered the magic of LFG
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-black px-12 py-4 rounded-2xl text-lg shadow-lg"
              >
                Start Your Adventure Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
