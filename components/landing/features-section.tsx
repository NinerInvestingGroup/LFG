import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, CreditCard, Compass, ArrowRight } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Squad Assembly",
      description: "Social networking, friend discovery, travel matching",
      details: [
        "Connect with like-minded travelers",
        "Smart matching based on interests",
        "Build your travel network",
        "Verified traveler profiles",
      ],
      color: "primary",
      badge: "Social",
    },
    {
      icon: Calendar,
      title: "Epic Planning",
      description: "Collaborative itineraries, polls, real-time editing",
      details: [
        "Real-time collaborative planning",
        "Group polls and voting",
        "Smart itinerary suggestions",
        "Professional advisor support",
      ],
      color: "secondary",
      badge: "Planning",
    },
    {
      icon: CreditCard,
      title: "Smart Coordination",
      description: "Expense splitting, payments, booking management",
      details: ["Automatic expense splitting", "Secure group payments", "Booking management", "Budget tracking tools"],
      color: "success",
      badge: "Finance",
    },
    {
      icon: Compass,
      title: "Community Discovery",
      description: "Travel advisor marketplace, trip inspiration",
      details: [
        "Expert travel advisor network",
        "Curated trip inspiration",
        "Local insider recommendations",
        "Community-driven content",
      ],
      color: "warning",
      badge: "Discovery",
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: "bg-primary-50",
        border: "border-primary-200",
        icon: "text-primary",
        iconBg: "bg-primary",
        badge: "bg-primary-100 text-primary-700",
      },
      secondary: {
        bg: "bg-secondary-50",
        border: "border-secondary-200",
        icon: "text-secondary",
        iconBg: "bg-secondary",
        badge: "bg-secondary-100 text-secondary-700",
      },
      success: {
        bg: "bg-success-50",
        border: "border-success-200",
        icon: "text-success",
        iconBg: "bg-success",
        badge: "bg-success-100 text-success-700",
      },
      warning: {
        bg: "bg-warning-50",
        border: "border-warning-200",
        icon: "text-warning",
        iconBg: "bg-warning",
        badge: "bg-warning-100 text-warning-700",
      },
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary-100 text-primary-700 mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Everything you need for epic group travel
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            From finding your travel squad to sharing memories, LFG handles every aspect of group travel coordination
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${colors.border} ${colors.bg} hover:scale-105`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <Badge className={`${colors.badge} mb-2 w-fit mx-auto`}>{feature.badge}</Badge>

                  <CardTitle className="text-xl font-bold text-neutral-900">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-neutral-600 mb-6 text-center">{feature.description}</p>

                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-neutral-700">
                        <ArrowRight className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary to-secondary border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to revolutionize your group travel?</h3>
              <p className="text-white/90 mb-6">
                Join thousands of travelers who've already discovered the LFG difference
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-lg transition-colors">
                  Start Your First Trip
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 rounded-lg transition-colors">
                  Explore Features
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
