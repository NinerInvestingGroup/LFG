import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Users, Calendar, Settings, MapPin, Share2, ArrowRight, Zap, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: Users,
      title: "Gather your squad",
      description: "Invite friends or find new travel buddies who match your vibe",
      details:
        "No more begging people to commit. Our smart system helps you find serious travelers and keeps everyone accountable.",
      realTalk: "Finally, people who actually show up",
      time: "2 minutes",
    },
    {
      step: 2,
      icon: Calendar,
      title: "Plan together (actually together)",
      description: "Use AI-powered suggestions and group voting to create the perfect itinerary",
      details: "Skip the endless 'what do you think?' messages. Our tools help groups make decisions fast and fairly.",
      realTalk: "No more decision paralysis",
      time: "30 minutes",
    },
    {
      step: 3,
      icon: Settings,
      title: "Handle the boring stuff",
      description: "Automated bookings, expense splitting, and coordination",
      details:
        "We handle payments, reservations, and all the logistics so you can focus on getting excited about your trip.",
      realTalk: "Zero spreadsheets required",
      time: "5 minutes",
    },
    {
      step: 4,
      icon: MapPin,
      title: "Live your best life",
      description: "Stay coordinated during your trip with real-time updates",
      details: "Keep everyone in the loop with live location sharing, group messaging, and local recommendations.",
      realTalk: "No one gets left behind",
      time: "Throughout trip",
    },
    {
      step: 5,
      icon: Share2,
      title: "Relive the memories",
      description: "Share photos, stories, and start planning your next adventure",
      details:
        "Create lasting memories with shared photo albums and trip stories that inspire your next group adventure.",
      realTalk: "Instant nostalgia activation",
      time: "Forever",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-secondary-100 text-secondary-700 mb-4 text-sm px-3 py-1">
            <Zap className="w-4 h-4 mr-1" />
            How It Actually Works
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            From "we should plan a trip" to "OMG this is amazing" in 5 simple steps
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            We've streamlined the entire process so you spend less time planning and more time having epic adventures
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 1

            return (
              <div key={index} className="relative">
                {/* Connector Line - Hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-32 w-0.5 h-16 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2 z-0"></div>
                )}

                <div
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-16 ${isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className="flex-1 w-full">
                    <Card
                      className={`p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 ${isEven ? "lg:text-right" : ""}`}
                    >
                      <CardContent className="p-0">
                        <div
                          className={`flex items-center gap-4 mb-4 ${isEven ? "lg:justify-end lg:flex-row-reverse" : ""}`}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">{step.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-success-100 text-success-700 text-xs px-2 py-1">{step.time}</Badge>
                              <span className="text-sm text-primary-600 font-medium">{step.realTalk}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-lg text-neutral-700 mb-4">{step.description}</p>
                        <p className="text-neutral-600 mb-6">{step.details}</p>

                        <div
                          className={`flex items-center gap-2 text-primary font-medium ${isEven ? "lg:justify-end" : ""}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>See this step in action</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 order-first lg:order-none">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                      <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
              Ready to stop talking about that trip and actually book it?
            </h3>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Join the LFG community today and transform how you travel with friends. Your next epic adventure is
              literally just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                Start Planning (It's Free!)
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Watch 2-Min Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}