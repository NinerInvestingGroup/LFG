"use client"

import { TripCreationWizard } from "@/components/trip-creation/trip-creation-wizard"

export default function CreateTripPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <TripCreationWizard />
    </div>
  )
}
