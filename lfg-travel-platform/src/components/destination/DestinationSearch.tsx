"use client"

/**
 * Destination Search Component
 * Beautiful autocomplete search with Google Places integration
 */

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  Search, 
  MapPin, 
  Globe, 
  Mountain, 
  Building,
  Loader2,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff,
  Star,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'
import { useDestinationSearch } from '@/hooks/useDestinationSearch'
import { Destination } from '@/services/googlePlacesService'

export interface DestinationSearchProps {
  onDestinationSelect: (destination: Destination | null) => void
  placeholder?: string
  selectedDestination?: Destination | null
  className?: string
}

export function DestinationSearch({
  onDestinationSelect,
  placeholder = "Where do you want to go?",
  selectedDestination,
  className = ""
}: DestinationSearchProps) {
  
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(selectedDestination?.name || '')

  const {
    query,
    setQuery,
    isLoading,
    error,
    destinations,
    source,
    selectedDestination: hookSelectedDestination,
    selectDestination,
    popularDestinations,
    showPopular,
    clearError
  } = useDestinationSearch()

  // Handle input changes
  const handleInputChange = (value: string) => {
    setInputValue(value)
    setQuery(value)
    setIsOpen(true)
  }

  // Handle destination selection
  const handleDestinationSelect = (destination: Destination) => {
    selectDestination(destination)
    setInputValue(destination.name)
    onDestinationSelect(destination)
    setIsOpen(false)
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true)
  }

  // Handle input blur (with delay to allow clicks)
  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 200)
  }

  // Get destination type icon
  const getDestinationIcon = (type: Destination['type']) => {
    switch (type) {
      case 'city': return <Building className="w-4 h-4" />
      case 'country': return <Globe className="w-4 h-4" />
      case 'landmark': return <Mountain className="w-4 h-4" />
      case 'region': return <MapPin className="w-4 h-4" />
      default: return <MapPin className="w-4 h-4" />
    }
  }

  // Get destination type color
  const getDestinationColor = (type: Destination['type']) => {
    switch (type) {
      case 'city': return 'bg-blue-100 text-blue-700'
      case 'country': return 'bg-green-100 text-green-700'
      case 'landmark': return 'bg-purple-100 text-purple-700'
      case 'region': return 'bg-orange-100 text-orange-700'
      default: return 'bg-neutral-100 text-neutral-700'
    }
  }

  const displayDestinations = showPopular ? popularDestinations : destinations

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 pr-10"
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
        )}

        {/* Source indicator */}
        {!isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {source === 'google' ? (
              <div title="Google Places API">
                <Wifi className="w-4 h-4 text-green-500" />
              </div>
            ) : (
              <div title="Offline mode">
                <WifiOff className="w-4 h-4 text-orange-500" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="text-sm text-red-600 flex-1">{error}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={clearError}
            className="p-1 h-auto text-red-600 hover:text-red-700"
          >
            ×
          </Button>
        </div>
      )}

      {/* Dropdown Results */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-xl border-2 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 border-b bg-neutral-50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-neutral-900">
                  {showPopular ? 'Popular Destinations' : 'Search Results'}
                </h3>
                <div className="flex items-center gap-2">
                  {source === 'google' && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <Wifi className="w-3 h-3 mr-1" />
                      Live Search
                    </Badge>
                  )}
                  {source === 'fallback' && (
                    <Badge className="bg-orange-100 text-orange-700 text-xs">
                      <WifiOff className="w-3 h-3 mr-1" />
                      Offline
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {displayDestinations.length === 0 && !isLoading && (
                <div className="p-8 text-center text-neutral-500">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No destinations found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}

              {displayDestinations.map((destination) => (
                <button
                  key={destination.id}
                  onClick={() => handleDestinationSelect(destination)}
                  className="w-full p-4 text-left hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0 transition-colors focus:outline-none focus:bg-neutral-50"
                >
                  <div className="flex items-start gap-3">
                    {/* Destination Photo */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      {destination.photos && destination.photos.length > 0 ? (
                        <Image
                          src={destination.photos[0]}
                          alt={destination.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-neutral-400" />
                        </div>
                      )}
                    </div>

                    {/* Destination Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-neutral-900 truncate">
                          {destination.name}
                        </h4>
                        <Badge className={`text-xs px-2 py-0.5 ${getDestinationColor(destination.type)}`}>
                          {getDestinationIcon(destination.type)}
                          <span className="ml-1 capitalize">{destination.type}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-neutral-600 truncate mb-2">
                        {destination.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        {destination.country && (
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {destination.country}
                          </span>
                        )}
                        {destination.coordinates.lat !== 0 && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {destination.coordinates.lat.toFixed(2)}, {destination.coordinates.lng.toFixed(2)}
                          </span>
                        )}
                        {destination.photos && destination.photos.length > 0 && (
                          <span className="flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            {destination.photos.length} photo{destination.photos.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {hookSelectedDestination?.id === destination.id && (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            {source === 'google' && (
              <div className="p-3 border-t bg-neutral-50 text-xs text-neutral-500 text-center">
                Powered by Google Places API
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected Destination Preview */}
      {selectedDestination && !isOpen && (
        <div className="mt-3">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Selected Destination</span>
              </div>
              <div className="flex items-start gap-3">
                {selectedDestination.photos && selectedDestination.photos.length > 0 && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedDestination.photos[0]}
                      alt={selectedDestination.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-green-900">{selectedDestination.name}</h4>
                  <p className="text-sm text-green-700">{selectedDestination.description}</p>
                  {selectedDestination.country && (
                    <p className="text-xs text-green-600 mt-1">
                      {selectedDestination.country}{selectedDestination.region && `, ${selectedDestination.region}`}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    selectDestination(null)
                    setInputValue('')
                    onDestinationSelect(null)
                  }}
                  className="text-green-600 hover:text-green-700 p-1"
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default DestinationSearch
