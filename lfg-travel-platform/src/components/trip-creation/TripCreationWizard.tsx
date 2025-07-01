"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import { TripBasics } from "./steps/TripBasics"
import { TripSettings } from "./steps/TripSettings"
import { SquadAssembly } from "./steps/SquadAssembly"
import { ReviewCreate } from "./steps/ReviewCreate"
import { SuccessState } from "./steps/SuccessState"
import { X, ArrowLeft, ArrowRight, Save } from "lucide-react"

export interface TripData {
  // Step 1 - Basics
  name: string
  destination: string
  startDate: Date | null
  endDate: Date | null
  description: string
  coverPhoto: File | null

  // Step 2 - Settings
  tripType: string
  privacy: string
  budgetRange: [number, number]
  currency: string
  maxParticipants: number
  travelStyles: string[]

  // Step 3 - Squad
  emailInvites: string[]
  phoneInvites: string[]
  coOrganizers: string[]
  needsAdvisor: boolean
  advisorSpecialization: string
  advisorBudget: number

  // Metadata
  createdAt: Date
  estimatedCost: number
}

const initialTripData: TripData = {
  name: "",
  destination: "",
  startDate: null,
  endDate: null,
  description: "",
  coverPhoto: null,
  tripType: "",
  privacy: "friends",
  budgetRange: [500, 2000],
  currency: "USD",
  maxParticipants: 8,
  travelStyles: [],
  emailInvites: [],
  phoneInvites: [],
  coOrganizers: [],
  needsAdvisor: false,
  advisorSpecialization: "",
  advisorBudget: 0,
  createdAt: new Date(),
  estimatedCost: 0,
}

export function TripCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [tripData, setTripData] = useState<TripData>(initialTripData)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const stepTitles = ["Trip Basics", "Trip Settings", "Squad Assembly", "Review & Create"]

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        // Simulate auto-save
        console.log("Auto-saving trip data...")
        setHasUnsavedChanges(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasUnsavedChanges])

  const updateTripData = (updates: Partial<TripData>) => {
    setTripData((prev) => ({ ...prev, ...updates }))
    setHasUnsavedChanges(true)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(tripData.name && tripData.destination && tripData.startDate && tripData.endDate)
      case 2:
        return !!(tripData.tripType && tripData.privacy)
      case 3:
        return true // Optional step
      case 4:
        return true // Review step
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleExit = () => {
    if (hasUnsavedChanges) {
      setShowExitConfirm(true)
    } else {
      // Navigate away
      console.log("Exiting trip creation")
    }
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setHasUnsavedChanges(false)
    console.log("Draft saved")
  }

  const handleCreateTrip = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSuccess(true)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TripBasics tripData={tripData} updateTripData={updateTripData} />
      case 2:
        return <TripSettings tripData={tripData} updateTripData={updateTripData} />
      case 3:
        return <SquadAssembly tripData={tripData} updateTripData={updateTripData} />
      case 4:
        return (
          <ReviewCreate
            tripData={tripData}
            updateTripData={updateTripData}
            onCreateTrip={handleCreateTrip}
            onSaveDraft={handleSaveDraft}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  if (isSuccess) {
    return <SuccessState tripData={tripData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Pattern - Hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-secondary rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
      </div>

      {/* Mobile-First Header */}
      <div className="relative bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={handleExit} className="p-2">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-semibold text-neutral-900 truncate">Create Epic Trip</h1>
                <p className="text-xs sm:text-sm text-neutral-600 truncate">{stepTitles[currentStep - 1]}</p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span className="hidden md:inline">Auto-saving...</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="text-xs sm:text-sm px-2 sm:px-3 bg-transparent"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Save Draft</span>
              </Button>
            </div>
          </div>

          {/* Progress Bar - Mobile Optimized */}
          <div className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-neutral-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs sm:text-sm text-neutral-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 sm:h-2" />
          </div>
        </div>
      </div>

      {/* Main Content - Mobile-First Layout */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        <Card className="shadow-lg sm:shadow-xl border-0 bg-white/90 sm:bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 lg:p-8">{renderStep()}</CardContent>
        </Card>

        {/* Mobile-First Navigation */}
        <div className="flex items-center justify-between mt-4 sm:mt-6 lg:mt-8 gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex-1 sm:flex-none border-2 bg-white/80 backdrop-blur-sm h-12 sm:h-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          {currentStep < totalSteps && (
            <Button
              onClick={handleNext}
              disabled={!validateStep(currentStep)}
              className="flex-1 sm:flex-none bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 sm:h-auto"
            >
              <span className="sm:hidden">Next</span>
              <span className="hidden sm:inline">Next Step</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile-Optimized Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm sm:max-w-md">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Unsaved Changes</h3>
              <p className="text-neutral-600 mb-6 text-sm sm:text-base">
                You have unsaved changes. Are you sure you want to exit without saving?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button variant="outline" onClick={() => setShowExitConfirm(false)} className="flex-1 h-12 sm:h-auto">
                  Continue Editing
                </Button>
                <Button
                  className="flex-1 h-12 sm:h-auto bg-danger hover:bg-danger-600 text-white"
                  onClick={() => {
                    setShowExitConfirm(false)
                    console.log("Exiting without saving")
                  }}
                >
                  Exit Without Saving
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}