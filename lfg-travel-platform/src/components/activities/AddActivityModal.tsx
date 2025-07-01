'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Calendar, Clock, MapPin, DollarSign, Users, ExternalLink } from 'lucide-react'
import { useActivityCategories, useActivityValidation } from '@/hooks/useActivities'
import { CreateActivityData } from '@/services/activityService'

interface AddActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<CreateActivityData, 'tripId'>) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  error?: string | null
}

/**
 * ADD ACTIVITY MODAL COMPONENT
 * 
 * This modal allows users to add new activities with:
 * - Basic information (title, description, location)
 * - Date and time scheduling
 * - Category selection
 * - Cost and participant limits
 * - Form validation
 * 
 * Simple explanation: Like having an "Add Event" form for your trip calendar
 */
export function AddActivityModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  loading = false, 
  error = null 
}: AddActivityModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    costPerPerson: '',
    maxParticipants: '',
    bookingUrl: '',
    notes: ''
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const { categories } = useActivityCategories()
  const { validateActivityData } = useActivityValidation()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare data for validation
    const dataToValidate = {
      title: formData.title,
      description: formData.description || undefined,
      location: formData.location || undefined,
      category: formData.category as any,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      startTime: formData.startTime || undefined,
      endTime: formData.endTime || undefined,
      costPerPerson: formData.costPerPerson ? parseFloat(formData.costPerPerson) : undefined,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
      bookingUrl: formData.bookingUrl || undefined,
      notes: formData.notes || undefined,
      tripId: 'temp' // Will be replaced by parent component
    }

    const validation = validateActivityData(dataToValidate)
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    // Submit the activity
    const result = await onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      location: formData.location.trim() || undefined,
      category: formData.category as any,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      startTime: formData.startTime || undefined,
      endTime: formData.endTime || undefined,
      costPerPerson: formData.costPerPerson ? parseFloat(formData.costPerPerson) : undefined,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
      bookingUrl: formData.bookingUrl.trim() || undefined,
      notes: formData.notes.trim() || undefined
    })

    if (result.success) {
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        category: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        costPerPerson: '',
        maxParticipants: '',
        bookingUrl: '',
        notes: ''
      })
      setValidationErrors({})
    }
  }

  const handleClose = () => {
    if (loading) return // Don't close while submitting
    
    // Reset form when closing
    setFormData({
      title: '',
      description: '',
      location: '',
      category: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      costPerPerson: '',
      maxParticipants: '',
      bookingUrl: '',
      notes: ''
    })
    setValidationErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Add Activity
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Global Error */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Activity Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="What are you planning to do?"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={validationErrors.title ? 'border-red-500' : ''}
              maxLength={100}
              disabled={loading}
            />
            {validationErrors.title && (
              <p className="text-sm text-red-600">{validationErrors.title}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the activity (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={validationErrors.description ? 'border-red-500' : ''}
              maxLength={500}
              rows={3}
              disabled={loading}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-600">{validationErrors.description}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="Where is this activity?"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`pl-10 ${validationErrors.location ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {validationErrors.location && (
              <p className="text-sm text-red-600">{validationErrors.location}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleInputChange('category', value)}
              disabled={loading}
            >
              <SelectTrigger className={validationErrors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select activity category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <div className="flex flex-col">
                        <span>{category.label}</span>
                        <span className="text-xs text-gray-500">{category.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors.category && (
              <p className="text-sm text-red-600">{validationErrors.category}</p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`pl-10 ${validationErrors.startDate ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validationErrors.startDate && (
                <p className="text-sm text-red-600">{validationErrors.startDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={`pl-10 ${validationErrors.endDate ? 'border-red-500' : ''}`}
                  disabled={loading}
                  min={formData.startDate}
                />
              </div>
              {validationErrors.endDate && (
                <p className="text-sm text-red-600">{validationErrors.endDate}</p>
              )}
            </div>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className={`pl-10 ${validationErrors.startTime ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validationErrors.startTime && (
                <p className="text-sm text-red-600">{validationErrors.startTime}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className={`pl-10 ${validationErrors.endTime ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validationErrors.endTime && (
                <p className="text-sm text-red-600">{validationErrors.endTime}</p>
              )}
            </div>
          </div>

          {/* Cost and Participants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPerPerson">Cost per Person</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="costPerPerson"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.costPerPerson}
                  onChange={(e) => handleInputChange('costPerPerson', e.target.value)}
                  className={`pl-10 ${validationErrors.costPerPerson ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validationErrors.costPerPerson && (
                <p className="text-sm text-red-600">{validationErrors.costPerPerson}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  placeholder="No limit"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  className={`pl-10 ${validationErrors.maxParticipants ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validationErrors.maxParticipants && (
                <p className="text-sm text-red-600">{validationErrors.maxParticipants}</p>
              )}
            </div>
          </div>

          {/* Booking URL */}
          <div className="space-y-2">
            <Label htmlFor="bookingUrl">Booking/Website URL</Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="bookingUrl"
                type="url"
                placeholder="https://example.com"
                value={formData.bookingUrl}
                onChange={(e) => handleInputChange('bookingUrl', e.target.value)}
                className={`pl-10 ${validationErrors.bookingUrl ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {validationErrors.bookingUrl && (
              <p className="text-sm text-red-600">{validationErrors.bookingUrl}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information or requirements"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className={validationErrors.notes ? 'border-red-500' : ''}
              maxLength={1000}
              rows={3}
              disabled={loading}
            />
            {validationErrors.notes && (
              <p className="text-sm text-red-600">{validationErrors.notes}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.notes.length}/1000 characters
            </p>
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 This activity will be added to your trip itinerary and other participants can join it.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || !formData.title || !formData.startDate || !formData.category}
            >
              {loading ? 'Adding...' : 'Add Activity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * AddActivityModal is like having an easy "Add Event" form for your trip:
 * 
 * 1. BASIC INFORMATION - Enter activity details:
 *    - Title (what you're doing)
 *    - Description (more details)
 *    - Location (where it's happening)
 *    - Category (type of activity)
 * 
 * 2. SCHEDULING - Set when it happens:
 *    - Start date (required)
 *    - End date (optional, for multi-day activities)
 *    - Start time (optional)
 *    - End time (optional)
 * 
 * 3. LOGISTICS - Additional details:
 *    - Cost per person (optional)
 *    - Maximum participants (optional)
 *    - Booking URL (optional)
 *    - Additional notes (optional)
 * 
 * 4. VALIDATION - Form checking:
 *    - Required fields validation
 *    - Date/time logic validation
 *    - Input format validation
 *    - Real-time error feedback
 * 
 * Key Features:
 * - Professional form design
 * - Real-time validation
 * - Loading states during submission
 * - Error handling and display
 * - Auto-reset after successful submission
 * - Prevents closing during submission
 * - Character limits and input validation
 * - Mobile-responsive layout
 * 
 * User Experience:
 * - Simple, clean interface
 * - Clear labels and placeholders
 * - Visual feedback for errors
 * - Disabled state management
 * - Helpful information notes
 * - Category selection with descriptions
 * 
 * It's like having a professional event creation form that anyone can use easily!
 */
