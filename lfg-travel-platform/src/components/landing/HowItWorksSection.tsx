import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Users, Calendar, Settings, MapPin, Share2, ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: Users,
      title: "Build your travel squad",
      description: "Connect with friends or discover new travel companions through our social discovery features",
      details: "Use our smart matching algorithm to find travelers with similar interests, budgets, and travel styles",
    },
    {
      step: 2,
      icon: Calendar,
      title: "Collaborate on planning",
      description: "Work together with professional advisor support to create the perfect itinerary",
      details: "Real-time collaborative tools, group polls, and expert recommendations make planning effortless",
    },
    {
      step: 3,
      icon: Settings,
      title: "Coordinate logistics",
      description: "Let intelligent automation handle bookings, payments, and coordination details",
      details: "Automated expense splitting, group bookings, and smart notifications keep everyone in sync",
    },
    {
      step: 4,
      icon: MapPin,
      title: "Experience adventures",
      description: "Enjoy real-time group coordination during your trip with live updates and communication",
      details: "Stay connected with your group, share live updates, and access local recommendations on the go",
    },
    {
      step: 5,
      icon: Share2,
      title: "Share and inspire",
      description: "Document memories and inspire the travel community with your epic adventures",
      details: "Create travel stories, share photos, and help other travelers discover amazing destinations",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-secondary-100 text-secondary-700 mb-4">How It Works</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            From idea to epic adventure in 5 simple steps
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our streamlined process takes you from initial planning to unforgettable memories
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 1

            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-32 w-0.5 h-16 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2 z-0"></div>
                )}

                <div
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <Card
                      className={`p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 ${isEven ? "lg:text-right" : ""}`}
                    >
                      <CardContent className="p-0">
                        <div
                          className={`flex items-center gap-4 mb-4 ${isEven ? "lg:justify-end lg:flex-row-reverse" : ""}`}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {step.step}
                          </div>
                          <h3 className="text-2xl font-bold text-neutral-900">{step.title}</h3>
                        </div>

                        <p className="text-lg text-neutral-700 mb-4">{step.description}</p>
                        <p className="text-neutral-600">{step.details}</p>

                        <div
                          className={`flex items-center gap-2 mt-6 text-primary font-medium ${isEven ? "lg:justify-end" : ""}`}
                        >
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ready to start your journey?</h3>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Join the LFG community today and transform how you travel with friends. Your next epic adventure is just a
              few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}