"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TripCreationWizard } from "@/components/trip-creation/trip-creation-wizard"
import {
  Plane,
  Wand2,
  Users,
  CheckCircle,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  MapPin,
  Settings,
  UserCheck,
} from "lucide-react"

export default function TripCreationShowcase() {
  const [currentView, setCurrentView] = useState<"overview" | "wizard">("overview")
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop")

  if (currentView === "wizard") {
    return (
      <div className="relative">
        <TripCreationWizard />

        {/* Back to Overview Button */}
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentView("overview")}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            ← Back to Overview
          </Button>
        </div>

        {/* Device View Switcher */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <Button
              size="sm"
              variant={deviceView === "desktop" ? "default" : "ghost"}
              onClick={() => setDeviceView("desktop")}
              className="h-8 w-8 p-0"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={deviceView === "tablet" ? "default" : "ghost"}
              onClick={() => setDeviceView("tablet")}
              className="h-8 w-8 p-0"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={deviceView === "mobile" ? "default" : "ghost"}
              onClick={() => setDeviceView("mobile")}
              className="h-8 w-8 p-0"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const wizardSteps = [
    {
      id: "basics",
      title: "Trip Basics",
      description: "Name, destination, dates, and cover photo",
      icon: MapPin,
      features: [
        "Smart destination autocomplete with photos",
        "Mobile-optimized date picker",
        "Drag & drop photo upload with cropping",
        "Real-time character count and validation",
        "Auto-calculation of trip duration",
      ],
    },
    {
      id: "settings",
      title: "Trip Settings",
      description: "Type, privacy, budget, and preferences",
      icon: Settings,
      features: [
        "Visual trip type selection cards",
        "Privacy settings with recommendations",
        "Interactive budget range slider",
        "Multi-select travel style preferences",
        "Currency selector with symbols",
      ],
    },
    {
      id: "squad",
      title: "Squad Assembly",
      description: "Invite friends and set up team",
      icon: Users,
      features: [
        "Email and SMS invitation management",
        "Contact import functionality",
        "Social media sharing options",
        "Co-organizer permissions setup",
        "Travel advisor consultation booking",
      ],
    },
    {
      id: "review",
      title: "Review & Create",
      description: "Final review and trip creation",
      icon: CheckCircle,
      features: [
        "Comprehensive trip preview card",
        "Cost estimation and timeline",
        "Edit buttons for each section",
        "Terms agreement with links",
        "Loading states and success animation",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">LFG Trip Creation</h1>
                  <p className="text-sm text-neutral-600">
                    Multi-step wizard for creating epic group travel experiences
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary text-white">Mobile-First</Badge>
              <Badge variant="outline" className="border-secondary text-secondary">
                4-Step Wizard
              </Badge>
              <Badge className="bg-success text-white">Auto-Save</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-primary" />
              Trip Creation Wizard Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-7">
              A comprehensive 4-step wizard that guides users through creating epic group travel experiences. Designed
              with mobile-first principles and optimized for conversion with smart validation, auto-save functionality,
              and beautiful visual feedback.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-primary">Guided Experience</h3>
                <p className="text-sm text-neutral-600">Step-by-step trip creation</p>
              </div>

              <div className="text-center p-4 bg-secondary-50 rounded-lg">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-secondary">Social Integration</h3>
                <p className="text-sm text-neutral-600">Invite friends seamlessly</p>
              </div>

              <div className="text-center p-4 bg-success-50 rounded-lg">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-success">Smart Validation</h3>
                <p className="text-sm text-neutral-600">Real-time form validation</p>
              </div>

              <div className="text-center p-4 bg-warning-50 rounded-lg">
                <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mx-auto mb-2">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-warning">Auto-Save</h3>
                <p className="text-sm text-neutral-600">Never lose your progress</p>
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Mobile-first responsive design with touch-optimized controls</li>
                <li>• Progressive disclosure with clear step indicators</li>
                <li>• Smart destination autocomplete with beautiful photo previews</li>
                <li>• Drag & drop photo upload with real-time preview</li>
                <li>• Auto-save functionality with visual indicators</li>
                <li>• Social invitation management (email, SMS, social media)</li>
                <li>• Travel advisor consultation booking integration</li>
                <li>• Celebration success state with confetti animation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Wizard Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {wizardSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={step.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary-200"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 relative">
                      <Icon className="w-6 h-6 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <p className="text-neutral-600">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-neutral-700">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Live Wizard Preview */}
        <Card className="mb-12 bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Experience the Complete Wizard</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Walk through the entire trip creation process with real-time validation, auto-save functionality, and
              beautiful success animations. See how easy it is to create epic group adventures.
            </p>
            <Button
              onClick={() => setCurrentView("wizard")}
              className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Start Trip Creation Wizard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Technical Implementation */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-success">User Experience</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    Progressive disclosure with clear step indicators
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    Real-time form validation with helpful error messages
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    Auto-save functionality with visual indicators
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    Exit confirmation for unsaved changes
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    Celebration success state with animations
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Interactive Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Drag & drop photo upload with preview
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Smart destination autocomplete with photos
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Mobile-optimized date picker and controls
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Interactive budget slider with currency selection
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Social invitation management system
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Conversion Optimization</h4>
              <p className="text-sm text-neutral-600 mb-4">
                Every aspect of the wizard is designed to maximize completion rates and create excitement about the
                upcoming trip, from the initial name input to the celebratory success state.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white text-neutral-700 border">Step Validation</Badge>
                <Badge className="bg-white text-neutral-700 border">Progress Indicators</Badge>
                <Badge className="bg-white text-neutral-700 border">Auto-Save</Badge>
                <Badge className="bg-white text-neutral-700 border">Mobile Optimized</Badge>
                <Badge className="bg-white text-neutral-700 border">Social Integration</Badge>
                <Badge className="bg-white text-neutral-700 border">Success Animation</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
