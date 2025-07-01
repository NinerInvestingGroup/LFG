"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Calendar } from "@/components/ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { MapPin, CalendarIcon, Upload, ImageIcon, Search, Clock, X } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import NextImage from "next/image"
import type { TripData } from "../TripCreationWizard"

interface TripBasicsProps {
  tripData: TripData
  updateTripData: (updates: Partial<TripData>) => void
}

export function TripBasics({ tripData, updateTripData }: TripBasicsProps) {
  const [destinationQuery, setDestinationQuery] = useState(tripData.destination)
  const [showDestinations, setShowDestinations] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const popularDestinations = [
    { name: "Bali, Indonesia", image: "/images/destinations/bali.jpg", type: "Beach Paradise" },
    { name: "Tokyo, Japan", image: "/images/destinations/tokyo.jpg", type: "Cultural Adventure" },
    { name: "Paris, France", image: "/images/destinations/paris.jpg", type: "City Romance" },
    { name: "Iceland", image: "/images/destinations/iceland.jpg", type: "Nature Adventure" },
    { name: "New York, USA", image: "/images/destinations/nyc.jpg", type: "Urban Experience" },
    { name: "Santorini, Greece", image: "/images/destinations/santorini.jpg", type: "Island Getaway" },
  ]

  const filteredDestinations = popularDestinations.filter((dest) =>
    dest.name.toLowerCase().includes(destinationQuery.toLowerCase()),
  )

  const tripDuration =
    tripData.startDate && tripData.endDate ? differenceInDays(tripData.endDate, tripData.startDate) + 1 : 0

  const handleDestinationSelect = (destination: string) => {
    updateTripData({ destination })
    setDestinationQuery(destination)
    setShowDestinations(false)
  }

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      updateTripData({ coverPhoto: file })
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mobile-First Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Let&apos;s plan your epic adventure!</h2>
        <p className="text-neutral-600 text-sm sm:text-base">Tell us the basics about your trip</p>
      </div>

      {/* Trip Name - Mobile Optimized */}
      <div className="space-y-2">
        <Label htmlFor="tripName" className="text-sm sm:text-base font-semibold">
          Trip Name *
        </Label>
        <Input
          id="tripName"
          placeholder="Epic Vegas Weekend"
          value={tripData.name}
          onChange={(e) => updateTripData({ name: e.target.value })}
          className="text-base sm:text-lg h-12 sm:h-14 border-2 focus:border-primary text-center sm:text-left"
          maxLength={50}
        />
        <div className="flex justify-between text-xs sm:text-sm text-neutral-500">
          <span>Give your trip a memorable name</span>
          <span>{tripData.name.length}/50</span>
        </div>
      </div>

      {/* Destination Search - Mobile Optimized */}
      <div className="space-y-2">
        <Label htmlFor="destination" className="text-sm sm:text-base font-semibold">
          Destination *
        </Label>
        <div className="relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input
              id="destination"
              placeholder="Where are you going?"
              value={destinationQuery}
              onChange={(e) => {
                setDestinationQuery(e.target.value)
                setShowDestinations(true)
              }}
              onFocus={() => setShowDestinations(true)}
              className="pl-12 pr-12 text-base sm:text-lg h-12 sm:h-14 border-2 focus:border-primary text-center sm:text-left"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          </div>

          {/* Mobile-First Destination Suggestions */}
          {showDestinations && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-neutral-200 rounded-lg shadow-xl z-10 max-h-80 overflow-y-auto">
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Popular Destinations</h4>
                  <Button variant="ghost" size="sm" onClick={() => setShowDestinations(false)} className="p-1 h-auto">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => handleDestinationSelect(dest.name)}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-left w-full"
                    >
                      <NextImage
                        src={dest.image || "/images/travel-background.jpg"}
                        alt={dest.name}
                        width={50}
                        height={35}
                        className="rounded object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-neutral-900 text-sm sm:text-base truncate">{dest.name}</div>
                        <div className="text-xs sm:text-sm text-neutral-600">{dest.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date Range - Mobile-First Stack */}
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base font-semibold">Start Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 sm:h-14 justify-start text-left border-2 hover:border-primary bg-transparent text-sm sm:text-base"
                >
                  <CalendarIcon className="mr-3 h-5 w-5 text-neutral-400 flex-shrink-0" />
                  <span className="truncate">
                    {tripData.startDate ? format(tripData.startDate, "MMM d, yyyy") : "Select start date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tripData.startDate || undefined}
                  onSelect={(date) => updateTripData({ startDate: date || null })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base font-semibold">End Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 sm:h-14 justify-start text-left border-2 hover:border-primary bg-transparent text-sm sm:text-base"
                >
                  <CalendarIcon className="mr-3 h-5 w-5 text-neutral-400 flex-shrink-0" />
                  <span className="truncate">
                    {tripData.endDate ? format(tripData.endDate, "MMM d, yyyy") : "Select end date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tripData.endDate || undefined}
                  onSelect={(date) => updateTripData({ endDate: date || null })}
                  disabled={(date) => date < (tripData.startDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Trip Duration Display - Mobile Centered */}
        {tripDuration > 0 && (
          <div className="flex items-center justify-center">
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 text-sm sm:text-base">
              <Clock className="w-4 h-4 mr-2" />
              {tripDuration} {tripDuration === 1 ? "day" : "days"} trip
            </Badge>
          </div>
        )}
      </div>

      {/* Description - Mobile Optimized */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm sm:text-base font-semibold">
          Trip Description <span className="text-neutral-500 font-normal">(Optional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="What makes this trip special? Share your vision..."
          value={tripData.description}
          onChange={(e) => updateTripData({ description: e.target.value })}
          className="min-h-[80px] sm:min-h-[100px] border-2 focus:border-primary resize-none text-sm sm:text-base"
          maxLength={500}
        />
        <div className="flex justify-between text-xs sm:text-sm text-neutral-500">
          <span>Help others understand what this trip is about</span>
          <span>{tripData.description.length}/500</span>
        </div>
      </div>

      {/* Cover Photo Upload - Mobile-First */}
      <div className="space-y-2">
        <Label className="text-sm sm:text-base font-semibold">
          Cover Photo <span className="text-neutral-500 font-normal">(Optional)</span>
        </Label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center transition-all duration-200 ${
            dragActive ? "border-primary bg-primary-50" : "border-neutral-300 hover:border-primary hover:bg-neutral-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {tripData.coverPhoto ? (
            <div className="space-y-4">
              <div className="relative w-full h-32 sm:h-40 lg:h-48 rounded-lg overflow-hidden">
                <NextImage
                  src={URL.createObjectURL(tripData.coverPhoto) || "/images/travel-background.jpg"}
                  alt="Trip cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 w-full sm:w-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => updateTripData({ coverPhoto: null })}
                  className="text-danger hover:text-danger-600 w-full sm:w-auto"
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-medium text-neutral-900 mb-1">
                  Add a cover photo for your trip
                </p>
                <p className="text-neutral-600 mb-4 text-sm sm:text-base px-4">
                  Drag and drop an image here, or tap to browse
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photo
                </Button>
              </div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(file)
          }}
          className="hidden"
        />
      </div>
    </div>
  )
}
