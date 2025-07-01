import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Users, Calendar, CreditCard, ArrowRight, Zap, Shield, Heart, MessageSquare } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "End Group Chat Hell",
      description: "One organized space for all trip planning",
      details: [
        "Replace 47 different group chats",
        "Keep everyone on the same page",
        "No more lost messages or confusion",
        "Smart notifications that actually matter",
      ],
      color: "primary",
      badge: "Communication",
      painPoint: "Stop scrolling through endless messages",
    },
    {
      icon: Calendar,
      title: "Plan Like a Pro",
      description: "AI-powered planning that actually works",
      details: [
        "Smart itinerary suggestions based on your vibe",
        "Group polls that end the 'where should we go?' debate",
        "Real-time collaborative planning",
        "Professional travel advisor support when you need it",
      ],
      color: "secondary",
      badge: "Planning",
      painPoint: "No more decision paralysis",
    },
    {
      icon: CreditCard,
      title: "Money Without Drama",
      description: "Split costs fairly, pay securely, stay friends",
      details: [
        "Automatic expense splitting (no math required)",
        "Secure group payments with fraud protection",
        "Track who owes what in real-time",
        "Multiple payment options for everyone",
      ],
      color: "success",
      badge: "Payments",
      painPoint: "Never chase friends for money again",
    },
    {
      icon: Users,
      title: "Squad Goals",
      description: "Find your travel tribe and keep them engaged",
      details: [
        "Smart matching with like-minded travelers",
        "Commitment tracking (no more flakers)",
        "Easy invitation management",
        "Build your travel network over time",
      ],
      color: "warning",
      badge: "Social",
      painPoint: "Actually get everyone to commit",
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
        accent: "text-primary-600",
      },
      secondary: {
        bg: "bg-secondary-50",
        border: "border-secondary-200",
        icon: "text-secondary",
        iconBg: "bg-secondary",
        badge: "bg-secondary-100 text-secondary-700",
        accent: "text-secondary-600",
      },
      success: {
        bg: "bg-success-50",
        border: "border-success-200",
        icon: "text-success",
        iconBg: "bg-success",
        badge: "bg-success-100 text-success-700",
        accent: "text-success-600",
      },
      warning: {
        bg: "bg-warning-50",
        border: "border-warning-200",
        icon: "text-warning",
        iconBg: "bg-warning",
        badge: "bg-warning-100 text-warning-700",
        accent: "text-warning-600",
      },
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section className="py-16 sm:py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-primary-100 text-primary-700 mb-4 text-sm px-3 py-1">
            <Zap className="w-4 h-4 mr-1" />
            Features That Actually Work
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Everything you need to stop stressing and start traveling
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            We built this because we were tired of the same group travel problems. Here's how we fixed them.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${colors.border} ${colors.bg} hover:scale-105`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <Badge className={`${colors.badge} mb-2 text-xs px-2 py-1`}>{feature.badge}</Badge>
                      <CardTitle className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                        {feature.title}
                      </CardTitle>
                      <p className={`text-sm font-medium ${colors.accent} mb-2`}>{feature.painPoint}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-neutral-600 mb-4 sm:mb-6">{feature.description}</p>

                  <ul className="space-y-2 sm:space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-neutral-700">
                        <ArrowRight className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="text-center p-4 sm:p-6 bg-white border-2 border-neutral-100">
            <CardContent className="p-0">
              <Shield className="w-8 h-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 mb-2">Bank-Level Security</h3>
              <p className="text-sm text-neutral-600">
                Your payments and data are protected with enterprise-grade encryption
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border-2 border-neutral-100">
            <CardContent className="p-0">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 mb-2">Friendship Guarantee</h3>
              <p className="text-sm text-neutral-600">
                Our tools are designed to strengthen friendships, not strain them
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 bg-white border-2 border-neutral-100">
            <CardContent className="p-0">
              <Zap className="w-8 h-8 text-warning mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-neutral-600">Plan trips 10x faster than traditional methods</p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-white">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to revolutionize your group travel?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who've already discovered the LFG difference. Your sanity (and friendships)
              will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                Start Your First Trip (Free!)
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 rounded-lg transition-colors">
                See It In Action
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}