"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Switch } from "@/components/ui/Switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import {
  Mail,
  Phone,
  Plus,
  X,
  Users,
  UserCheck,
  Share2,
  ContactIcon,
  Crown,
  HelpCircle,
  DollarSign,
  Star,
} from "lucide-react"
import type { TripData } from "../TripCreationWizard"

interface SquadAssemblyProps {
  tripData: TripData
  updateTripData: (updates: Partial<TripData>) => void
}

export function SquadAssembly({ tripData, updateTripData }: SquadAssemblyProps) {
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")

  const addEmailInvite = () => {
    if (newEmail && !tripData.emailInvites.includes(newEmail)) {
      updateTripData({
        emailInvites: [...tripData.emailInvites, newEmail],
      })
      setNewEmail("")
    }
  }

  const removeEmailInvite = (email: string) => {
    updateTripData({
      emailInvites: tripData.emailInvites.filter((e) => e !== email),
    })
  }

  const addPhoneInvite = () => {
    if (newPhone && !tripData.phoneInvites.includes(newPhone)) {
      updateTripData({
        phoneInvites: [...tripData.phoneInvites, newPhone],
      })
      setNewPhone("")
    }
  }

  const removePhoneInvite = (phone: string) => {
    updateTripData({
      phoneInvites: tripData.phoneInvites.filter((p) => p !== phone),
    })
  }

  const advisorSpecializations = [
    "Adventure & Outdoor Activities",
    "Luxury Travel & Accommodations",
    "Cultural & Historical Tours",
    "Food & Wine Experiences",
    "Family Travel Planning",
    "Budget Travel Optimization",
    "Business Travel Coordination",
    "Destination Weddings & Events",
  ]

  const socialPlatforms = [
    { name: "WhatsApp", icon: "💬", color: "bg-green-500" },
    { name: "Facebook", icon: "📘", color: "bg-blue-600" },
    { name: "Instagram", icon: "📷", color: "bg-pink-500" },
    { name: "Twitter", icon: "🐦", color: "bg-blue-400" },
    { name: "LinkedIn", icon: "💼", color: "bg-blue-700" },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mobile-First Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Assemble your travel squad</h2>
        <p className="text-neutral-600 text-sm sm:text-base">Invite friends and set up your trip team</p>
      </div>

      {/* Email Invitations - Mobile-First */}
      <Card className="border-2 border-neutral-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900">Email Invitations</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="friend@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addEmailInvite()}
                className="flex-1 border-2 focus:border-primary h-12"
                type="email"
              />
              <Button
                onClick={addEmailInvite}
                disabled={!newEmail}
                className="bg-primary hover:bg-primary-600 text-white h-12 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>

            {tripData.emailInvites.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-700">
                  Email Invites ({tripData.emailInvites.length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {tripData.emailInvites.map((email) => (
                    <Badge
                      key={email}
                      variant="outline"
                      className="border-primary text-primary px-3 py-1 flex items-center space-x-2 max-w-full"
                    >
                      <span className="truncate">{email}</span>
                      <button onClick={() => removeEmailInvite(email)} className="hover:text-danger flex-shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Phone Invitations - Mobile-First */}
      <Card className="border-2 border-neutral-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-secondary" />
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900">SMS Invitations</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="+1 (555) 123-4567"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addPhoneInvite()}
                className="flex-1 border-2 focus:border-secondary h-12"
                type="tel"
              />
              <Button
                onClick={addPhoneInvite}
                disabled={!newPhone}
                className="bg-secondary hover:bg-secondary-600 text-white h-12 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>

            {tripData.phoneInvites.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-700">
                  SMS Invites ({tripData.phoneInvites.length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {tripData.phoneInvites.map((phone) => (
                    <Badge
                      key={phone}
                      variant="outline"
                      className="border-secondary text-secondary px-3 py-1 flex items-center space-x-2 max-w-full"
                    >
                      <span className="truncate">{phone}</span>
                      <button onClick={() => removePhoneInvite(phone)} className="hover:text-danger flex-shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Import Contacts & Social Sharing - Mobile-First Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-2 border-neutral-200 hover:border-primary-200 transition-colors">
          <CardContent className="p-4 sm:p-6 text-center">
            <ContactIcon className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-semibold text-neutral-900 mb-2 text-sm sm:text-base">Import from Contacts</h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4">
              Quickly add friends from your phone contacts
            </p>
            <Button variant="outline" className="border-2 bg-transparent w-full sm:w-auto">
              <ContactIcon className="w-4 h-4 mr-2" />
              Import Contacts
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-neutral-200 hover:border-secondary-200 transition-colors">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Share2 className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">Social Media Sharing</h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4">
              Share your trip on social media to find travel buddies
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {socialPlatforms.slice(0, 3).map((platform) => (
                <Button key={platform.name} variant="outline" size="sm" className="border-2 bg-transparent text-xs">
                  <span className="mr-1">{platform.icon}</span>
                  <span className="hidden sm:inline">{platform.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Co-organizer Section - Mobile-First */}
      <Card className="border-2 border-secondary-200 bg-secondary-50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Crown className="w-5 h-5 text-secondary" />
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900">Co-organizer</h3>
            <Badge className="bg-secondary text-white text-xs">Optional</Badge>
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-neutral-700">
              Add a co-organizer to help manage the trip. They&apos;ll have permissions to edit trip details, manage
              participants, and coordinate activities.
            </p>

            <div className="bg-white rounded-lg p-3 sm:p-4 border border-secondary-200">
              <h4 className="font-medium text-neutral-900 mb-2 text-sm sm:text-base">Co-organizer Permissions:</h4>
              <ul className="text-xs sm:text-sm text-neutral-600 space-y-1">
                <li>• Edit trip details and itinerary</li>
                <li>• Invite and manage participants</li>
                <li>• Access budget and expense tracking</li>
                <li>• Coordinate with travel advisors</li>
              </ul>
            </div>

            <Button variant="outline" className="border-2 border-secondary bg-transparent w-full sm:w-auto">
              <UserCheck className="w-4 h-4 mr-2" />
              Add Co-organizer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Travel Advisor Consultation - Mobile-First */}
      <Card className="border-2 border-accent-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-accent" />
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900">Travel Advisor Consultation</h3>
              <Badge className="bg-accent text-white text-xs">Professional Help</Badge>
            </div>
            <Switch
              checked={tripData.needsAdvisor}
              onCheckedChange={(checked) => updateTripData({ needsAdvisor: checked })}
            />
          </div>

          {tripData.needsAdvisor && (
            <div className="space-y-4 mt-4">
              <div className="bg-accent-50 rounded-lg p-3 sm:p-4 border border-accent-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="font-medium text-accent-800 text-sm sm:text-base">Why use a travel advisor?</span>
                </div>
                <ul className="text-xs sm:text-sm text-accent-700 space-y-1">
                  <li>• Expert destination knowledge and insider tips</li>
                  <li>• Group booking discounts and special rates</li>
                  <li>• 24/7 support during your trip</li>
                  <li>• Customized itinerary planning</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-neutral-700 mb-2 block">Advisor Specialization</Label>
                  <Select
                    value={tripData.advisorSpecialization}
                    onValueChange={(value) => updateTripData({ advisorSpecialization: value })}
                  >
                    <SelectTrigger className="border-2 focus:border-accent h-12">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {advisorSpecializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-neutral-700 mb-2 block">Consultation Budget</Label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Input
                      type="number"
                      placeholder="500"
                      value={tripData.advisorBudget || ""}
                      onChange={(e) => updateTripData({ advisorBudget: Number.parseInt(e.target.value) || 0 })}
                      className="flex-1 border-2 focus:border-accent h-12"
                    />
                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-neutral-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">for consultation</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Typical consultation fees range from $200-$800 depending on trip complexity
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary - Mobile-First */}
      {(tripData.emailInvites.length > 0 || tripData.phoneInvites.length > 0) && (
        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-primary-800 text-sm sm:text-base">Invitation Summary</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-primary-700 font-medium">Email Invites:</span>
                <span className="ml-2 text-primary-800">{tripData.emailInvites.length}</span>
              </div>
              <div>
                <span className="text-primary-700 font-medium">SMS Invites:</span>
                <span className="ml-2 text-primary-800">{tripData.phoneInvites.length}</span>
              </div>
            </div>
            <p className="text-xs text-primary-600 mt-2">Invitations will be sent after you create the trip</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
