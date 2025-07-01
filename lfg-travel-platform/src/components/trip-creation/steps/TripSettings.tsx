"use client"

import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import { Slider } from "@/components/ui/Slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import {
  Mountain,
  Waves,
  Building,
  Briefcase,
  Users,
  PartyPopper,
  Lock,
  UserCheck,
  Globe,
  DollarSign,
  UserPlus,
  Check,
} from "lucide-react"
import type { TripData } from "../TripCreationWizard"

interface TripSettingsProps {
  tripData: TripData
  updateTripData: (updates: Partial<TripData>) => void
}

export function TripSettings({ tripData, updateTripData }: TripSettingsProps) {
  const tripTypes = [
    {
      id: "adventure",
      name: "Adventure Trip",
      description: "Hiking, outdoor activities, exploration",
      icon: Mountain,
      color: "bg-accent-50 border-accent-200 text-accent-700",
    },
    {
      id: "beach",
      name: "Beach Vacation",
      description: "Relaxation, sun, sand, and sea",
      icon: Waves,
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      id: "city",
      name: "City Break",
      description: "Urban exploration, culture, nightlife",
      icon: Building,
      color: "bg-neutral-50 border-neutral-200 text-neutral-700",
    },
    {
      id: "business",
      name: "Business Travel",
      description: "Work trips, conferences, networking",
      icon: Briefcase,
      color: "bg-primary-50 border-primary-200 text-primary-700",
    },
    {
      id: "family",
      name: "Family Reunion",
      description: "Family gatherings, celebrations",
      icon: Users,
      color: "bg-secondary-50 border-secondary-200 text-secondary-700",
    },
    {
      id: "party",
      name: "Bachelor/Bachelorette",
      description: "Celebrations, parties, special events",
      icon: PartyPopper,
      color: "bg-secondary-50 border-secondary-200 text-secondary-700",
    },
  ]

  const privacyOptions = [
    {
      id: "private",
      name: "Private",
      description: "Only invited people can see this trip",
      icon: Lock,
      recommended: false,
    },
    {
      id: "friends",
      name: "Friends Only",
      description: "Your friends can see and request to join",
      icon: UserCheck,
      recommended: true,
    },
    {
      id: "community",
      name: "Community",
      description: "Visible in LFG community",
      icon: Users,
      recommended: false,
    },
    {
      id: "public",
      name: "Public",
      description: "Visible to everyone",
      icon: Globe,
      recommended: false,
    },
  ]

  const travelStyleOptions = [
    "Budget Conscious",
    "Luxury Focused",
    "Adventure Seeking",
    "Cultural Immersion",
    "Relaxation Focused",
    "Photography Focused",
    "Food & Drink",
    "Nightlife & Entertainment",
    "Nature & Wildlife",
    "Historical Sites",
  ]

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  ]

  const selectedCurrency = currencies.find((c) => c.code === tripData.currency) || currencies[0]

  const toggleTravelStyle = (style: string) => {
    const currentStyles = tripData.travelStyles || []
    const updatedStyles = currentStyles.includes(style)
      ? currentStyles.filter((s) => s !== style)
      : [...currentStyles, style]
    updateTripData({ travelStyles: updatedStyles })
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mobile-First Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Configure your trip settings</h2>
        <p className="text-neutral-600 text-sm sm:text-base">Help us understand what kind of trip you&apos;re planning</p>
      </div>

      {/* Trip Type Selection - Mobile-First Grid */}
      <div className="space-y-4">
        <Label className="text-sm sm:text-base font-semibold">Trip Type *</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {tripTypes.map((type) => {
            const Icon = type.icon
            const isSelected = tripData.tripType === type.id

            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? "ring-2 ring-primary border-primary shadow-lg"
                    : "border-neutral-200 hover:border-primary-200"
                }`}
                onClick={() => updateTripData({ tripType: type.id })}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${type.color}`}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2 text-sm sm:text-base">{type.name}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{type.description}</p>
                  {isSelected && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Privacy Settings - Mobile-First Stack */}
      <div className="space-y-4">
        <Label className="text-sm sm:text-base font-semibold">Privacy Settings *</Label>
        <div className="space-y-2 sm:space-y-3">
          {privacyOptions.map((option) => {
            const Icon = option.icon
            const isSelected = tripData.privacy === option.id

            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-primary border-primary bg-primary-50"
                    : "border-neutral-200 hover:border-primary-200 hover:bg-neutral-50"
                }`}
                onClick={() => updateTripData({ privacy: option.id })}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">{option.name}</h4>
                        {option.recommended && <Badge className="bg-accent text-white text-xs">Recommended</Badge>}
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600">{option.description}</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        isSelected ? "bg-primary border-primary" : "border-neutral-300"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Budget Range - Mobile-First Layout */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <Label className="text-sm sm:text-base font-semibold">Budget Range per Person</Label>
          <Select value={tripData.currency} onValueChange={(value) => updateTripData({ currency: value })}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Slider
            value={tripData.budgetRange}
            onValueChange={(value) => updateTripData({ budgetRange: value as [number, number] })}
            max={5000}
            min={100}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-neutral-400" />
              <span className="font-medium">
                {selectedCurrency.symbol}
                {tripData.budgetRange[0]} - {selectedCurrency.symbol}
                {tripData.budgetRange[1]}
              </span>
            </div>
            <span className="text-neutral-600">per person</span>
          </div>
        </div>
      </div>

      {/* Maximum Participants - Mobile-First */}
      <div className="space-y-4">
        <Label htmlFor="maxParticipants" className="text-sm sm:text-base font-semibold">
          Maximum Participants
        </Label>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <Input
              id="maxParticipants"
              type="number"
              min="2"
              max="50"
              value={tripData.maxParticipants}
              onChange={(e) => updateTripData({ maxParticipants: Number.parseInt(e.target.value) || 8 })}
              className="h-12 border-2 focus:border-primary text-center sm:text-left"
            />
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-neutral-600">
            <UserPlus className="w-5 h-5" />
            <span className="text-sm sm:text-base">travelers max</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600">
          Consider group dynamics and accommodation options when setting the limit
        </p>
      </div>

      {/* Travel Style Preferences - Mobile-First Grid */}
      <div className="space-y-4">
        <Label className="text-sm sm:text-base font-semibold">
          Travel Style Preferences <span className="text-neutral-500 font-normal">(Select multiple)</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {travelStyleOptions.map((style) => {
            const isSelected = tripData.travelStyles?.includes(style)

            return (
              <button
                key={style}
                onClick={() => toggleTravelStyle(style)}
                className={`p-2 sm:p-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-primary hover:bg-primary-50"
                }`}
              >
                {style}
              </button>
            )
          })}
        </div>
        <p className="text-xs sm:text-sm text-neutral-600">
          This helps us match you with compatible travelers and suggest relevant activities
        </p>
      </div>
    </div>
  )
}
