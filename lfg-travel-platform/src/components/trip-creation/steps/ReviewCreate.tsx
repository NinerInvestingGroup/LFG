"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Checkbox } from "@/components/ui/Checkbox"
import { Label } from "@/components/ui/Label"
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Edit,
  Clock,
  Eye,
  Mail,
  Crown,
  HelpCircle,
  Loader2,
  Sparkles,
} from "lucide-react"
import { format, differenceInDays } from "date-fns"
import Image from "next/image"
import type { TripData } from "../TripCreationWizard"
import { useState } from "react"

interface ReviewCreateProps {
  tripData: TripData
  updateTripData: (updates: Partial<TripData>) => void
  onCreateTrip: () => void
  onSaveDraft: () => void
  isLoading: boolean
}

export function ReviewCreate({ tripData, onCreateTrip, onSaveDraft, isLoading }: ReviewCreateProps) {
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const tripDuration =
    tripData.startDate && tripData.endDate ? differenceInDays(tripData.endDate, tripData.startDate) + 1 : 0

  const estimatedCostPerPerson = Math.round((tripData.budgetRange[0] + tripData.budgetRange[1]) / 2)
  const totalInvites = tripData.emailInvites.length + tripData.phoneInvites.length

  const getTripTypeDisplay = (type: string) => {
    const types: Record<string, string> = {
      adventure: "Adventure Trip",
      beach: "Beach Vacation",
      city: "City Break",
      business: "Business Travel",
      family: "Family Reunion",
      party: "Bachelor/Bachelorette",
    }
    return types[type] || type
  }

  const getPrivacyDisplay = (privacy: string) => {
    const privacyTypes: Record<string, string> = {
      private: "Private",
      friends: "Friends Only",
      community: "Community",
      public: "Public",
    }
    return privacyTypes[privacy] || privacy
  }

  const currencies = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
  }

  const currencySymbol = currencies[tripData.currency as keyof typeof currencies] || "$"

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mobile-First Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Review your epic trip</h2>
        <p className="text-neutral-600 text-sm sm:text-base">Double-check everything looks perfect before creating</p>
      </div>

      {/* Trip Preview Card - Mobile-First */}
      <Card className="shadow-lg sm:shadow-xl border-2 border-primary-200 overflow-hidden">
        {tripData.coverPhoto && (
          <div className="relative h-32 sm:h-40 lg:h-48">
            <Image
              src={URL.createObjectURL(tripData.coverPhoto) || "/images/travel-background.jpg"}
              alt="Trip cover"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
              <h3 className="text-lg sm:text-2xl font-bold mb-1">{tripData.name}</h3>
              <div className="flex items-center text-xs sm:text-sm opacity-90">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {tripData.destination}
              </div>
            </div>
          </div>
        )}

        <CardContent className="p-4 sm:p-6">
          {!tripData.coverPhoto && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">{tripData.name}</h3>
              <div className="flex items-center text-neutral-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {tripData.destination}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Trip Details - Mobile-First */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Trip Details</h4>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-600 text-xs sm:text-sm">
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Edit
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-neutral-900 text-sm sm:text-base">
                      {tripData.startDate && format(tripData.startDate, "MMM d")} -{" "}
                      {tripData.endDate && format(tripData.endDate, "MMM d, yyyy")}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {tripDuration} {tripDuration === 1 ? "day" : "days"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-neutral-900 text-sm sm:text-base">
                      Up to {tripData.maxParticipants} travelers
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600">{getTripTypeDisplay(tripData.tripType)}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Eye className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-neutral-900 text-sm sm:text-base">
                      {getPrivacyDisplay(tripData.privacy)}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600">Privacy setting</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-neutral-900 text-sm sm:text-base">
                      {currencySymbol}
                      {tripData.budgetRange[0]} - {currencySymbol}
                      {tripData.budgetRange[1]}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600">Budget per person</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invitations & Features - Mobile-First */}
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Squad & Features</h4>

              <div className="space-y-3">
                {totalInvites > 0 && (
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-neutral-900 text-sm sm:text-base">
                        {totalInvites} invitations ready
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-600">
                        {tripData.emailInvites.length} email, {tripData.phoneInvites.length} SMS
                      </div>
                    </div>
                  </div>
                )}

                {tripData.coOrganizers.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <Crown className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-neutral-900 text-sm sm:text-base">Co-organizer added</div>
                      <div className="text-xs sm:text-sm text-neutral-600">Shared management permissions</div>
                    </div>
                  </div>
                )}

                {tripData.needsAdvisor && (
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-neutral-900 text-sm sm:text-base">
                        Travel advisor consultation
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-600">{tripData.advisorSpecialization}</div>
                    </div>
                  </div>
                )}

                {tripData.travelStyles && tripData.travelStyles.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-medium text-neutral-900 text-sm sm:text-base">Travel Styles</div>
                    <div className="flex flex-wrap gap-1">
                      {tripData.travelStyles.slice(0, 3).map((style) => (
                        <Badge key={style} variant="outline" className="text-xs">
                          {style}
                        </Badge>
                      ))}
                      {tripData.travelStyles.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tripData.travelStyles.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {tripData.description && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2 text-sm sm:text-base">Description</h4>
              <p className="text-neutral-700 text-sm sm:text-base">{tripData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Estimation - Mobile-First */}
      <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900">Cost Estimation</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {currencySymbol}
                {estimatedCostPerPerson}
              </div>
              <div className="text-xs sm:text-sm text-neutral-600">Estimated cost per person</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-secondary">{tripDuration}</div>
              <div className="text-xs sm:text-sm text-neutral-600">
                {tripDuration === 1 ? "Day" : "Days"} until adventure
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-accent">{tripData.maxParticipants}</div>
              <div className="text-xs sm:text-sm text-neutral-600">Maximum travelers</div>
            </div>
          </div>

          {tripData.startDate && (
            <div className="mt-4 text-center">
              <div className="text-xs sm:text-sm text-neutral-600">
                Trip starts in{" "}
                {Math.ceil((tripData.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms Agreement - Mobile-First */}
      <Card className="border-2 border-neutral-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked: boolean) => setAgreeToTerms(checked)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . I understand that creating this trip will send invitations to the specified contacts and that I am
              responsible for coordinating this group travel experience.
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Mobile-First */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={isLoading}
          className="flex-1 border-2 bg-white/80 backdrop-blur-sm h-12 sm:h-auto order-2 sm:order-1"
        >
          Save as Draft
        </Button>

        <Button
          onClick={onCreateTrip}
          disabled={!agreeToTerms || isLoading}
          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-semibold h-12 sm:h-auto shadow-lg hover:shadow-xl transition-all duration-200 order-1 sm:order-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              <span className="text-sm sm:text-base">Creating Epic Trip...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Create Epic Trip</span>
            </>
          )}
        </Button>
      </div>

      {/* Help Text - Mobile-First */}
      <div className="text-center text-xs sm:text-sm text-neutral-600 px-4">
        <p>
          Once created, you can continue planning activities, manage your budget, and coordinate with your travel squad
          in the trip dashboard.
        </p>
      </div>
    </div>
  )
}