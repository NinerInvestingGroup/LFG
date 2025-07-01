"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import {
  CheckCircle,
  Sparkles,
  Users,
  Calendar,
  DollarSign,
  Share2,
  MessageSquare,
  MapPin,
  ArrowRight,
  SnowflakeIcon as Confetti,
} from "lucide-react"
import { format } from "date-fns"
import type { TripData } from "../TripCreationWizard"

interface SuccessStateProps {
  tripData: TripData
}

export function SuccessState({ tripData }: SuccessStateProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    {
      id: "invite",
      title: "Invite More People",
      description: "Add more friends to your adventure",
      icon: Users,
      color: "bg-primary hover:bg-primary-600 text-white",
      action: () => console.log("Invite more people"),
    },
    {
      id: "activities",
      title: "Start Planning Activities",
      description: "Create your itinerary and book experiences",
      icon: Calendar,
      color: "bg-secondary hover:bg-secondary-600 text-white",
      action: () => console.log("Plan activities"),
    },
    {
      id: "budget",
      title: "Set Up Budget Tracking",
      description: "Manage expenses and split costs",
      icon: DollarSign,
      color: "bg-accent hover:bg-accent-600 text-white",
      action: () => console.log("Setup budget"),
    },
    {
      id: "dashboard",
      title: "Go to Trip Dashboard",
      description: "Access your complete trip management hub",
      icon: ArrowRight,
      color: "bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white",
      action: () => console.log("Go to dashboard"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Confetti Animation - Hidden on mobile for performance */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Confetti className="w-4 h-4 text-primary opacity-70" />
            </div>
          ))}
        </div>
      )}

      {/* Background Pattern - Hidden on mobile */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-secondary rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12 max-w-4xl mx-auto">
        {/* Success Header - Mobile-First */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4">
            🎉 Trip Created Successfully!
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 mb-4 sm:mb-6 px-4">
            Your epic adventure &quot;{tripData.name}&quot; is ready to go!
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Badge className="bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Epic Adventure Created
            </Badge>
            <Badge className="bg-accent text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Invitations Sent
            </Badge>
            <Badge className="bg-secondary text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Group Chat Active
            </Badge>
          </div>
        </div>

        {/* Trip Summary Card - Mobile-First */}
        <Card className="shadow-lg sm:shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-8 sm:mb-12">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">{tripData.name}</h2>
              <div className="flex items-center justify-center text-neutral-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {tripData.destination}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="p-3 sm:p-4 bg-primary-50 rounded-lg">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold text-neutral-900 text-sm sm:text-base">
                  {tripData.startDate && format(tripData.startDate, "MMM d")} -{" "}
                  {tripData.endDate && format(tripData.endDate, "MMM d, yyyy")}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600">Travel Dates</div>
              </div>

              <div className="p-3 sm:p-4 bg-secondary-50 rounded-lg">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-2" />
                <div className="font-semibold text-neutral-900 text-sm sm:text-base">
                  {tripData.emailInvites.length + tripData.phoneInvites.length + 1}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600">Total Travelers</div>
              </div>

              <div className="p-3 sm:p-4 bg-accent-50 rounded-lg">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2" />
                <div className="font-semibold text-neutral-900 text-sm sm:text-base">
                  ${Math.round((tripData.budgetRange[0] + tripData.budgetRange[1]) / 2)}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600">Est. Cost per Person</div>
              </div>
            </div>

            {tripData.description && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-200 text-center">
                <p className="text-neutral-700 italic text-sm sm:text-base">&quot;{tripData.description}&quot;</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions - Mobile-First Grid */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 text-center mb-6 sm:mb-8">
            What would you like to do next?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Card
                  key={action.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary-200"
                  onClick={action.action}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">{action.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-600">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Social Sharing - Mobile-First */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white mb-8 sm:mb-12">
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
            <Share2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-90" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Share Your Adventure</h3>
            <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base px-4">
              Let your friends know about your upcoming trip and inspire others to plan their own adventures!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-12 sm:h-auto">
                Share on Social Media
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 h-12 sm:h-auto">Copy Trip Link</Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps - Mobile-First */}
        <div className="text-center">
          <h4 className="text-base sm:text-lg font-semibold text-neutral-900 mb-4">What happens next?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs sm:text-sm font-bold">
                1
              </div>
              <h5 className="font-medium text-neutral-900 mb-1 text-sm sm:text-base">Invitations Sent</h5>
              <p className="text-neutral-600">Your friends will receive email and SMS invitations to join the trip</p>
            </div>

            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs sm:text-sm font-bold">
                2
              </div>
              <h5 className="font-medium text-neutral-900 mb-1 text-sm sm:text-base">Group Formation</h5>
              <p className="text-neutral-600">
                As people join, you can start planning activities and coordinating details
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs sm:text-sm font-bold">
                3
              </div>
              <h5 className="font-medium text-neutral-900 mb-1 text-sm sm:text-base">Epic Adventure</h5>
              <p className="text-neutral-600">Enjoy your perfectly coordinated group travel experience!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}