'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { DollarSign, CalendarIcon } from 'lucide-react'
import { useExpenseCategories, useExpenseValidation } from '@/hooks/useExpenses'
import { CreateExpenseData } from '@/services/expenseService'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<CreateExpenseData, 'tripId'>) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  error?: string | null
}

/**
 * ADD EXPENSE MODAL COMPONENT
 * 
 * This modal allows users to add new expenses with:
 * - Amount and description
 * - Category selection (food, transport, etc.)
 * - Date selection
 * - Form validation
 * 
 * Simple explanation: Like having a "Add to Bill" form that's easy to use
 */
export function AddExpenseModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  loading = false, 
  error = null 
}: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    expenseDate: new Date().toISOString().split('T')[0] // Today's date
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const { categories } = useExpenseCategories()
  const { validateExpenseData } = useExpenseValidation()

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

    // Validate form data
    const dataToValidate = {
      ...formData,
      amount: parseFloat(formData.amount),
      category: formData.category as any
    }

    const validation = validateExpenseData(dataToValidate)
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    // Submit the expense
    const result = await onSubmit({
      amount: parseFloat(formData.amount),
      description: formData.description.trim(),
      category: formData.category as any,
      expenseDate: formData.expenseDate
    })

    if (result.success) {
      // Reset form
      setFormData({
        amount: '',
        description: '',
        category: '',
        expenseDate: new Date().toISOString().split('T')[0]
      })
      setValidationErrors({})
    }
  }

  const handleClose = () => {
    if (loading) return // Don't close while submitting
    
    // Reset form when closing
    setFormData({
      amount: '',
      description: '',
      category: '',
      expenseDate: new Date().toISOString().split('T')[0]
    })
    setValidationErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Add Expense
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Global Error */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max="10000"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className={`pl-10 ${validationErrors.amount ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {validationErrors.amount && (
              <p className="text-sm text-red-600">{validationErrors.amount}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              type="text"
              placeholder="What was this expense for?"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={validationErrors.description ? 'border-red-500' : ''}
              maxLength={100}
              disabled={loading}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-600">{validationErrors.description}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.description.length}/100 characters
            </p>
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
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors.category && (
              <p className="text-sm text-red-600">{validationErrors.category}</p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="expenseDate">Date</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="expenseDate"
                type="date"
                value={formData.expenseDate}
                onChange={(e) => handleInputChange('expenseDate', e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 This expense will be automatically split equally among all trip participants.
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
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={loading || !formData.amount || !formData.description || !formData.category}
            >
              {loading ? 'Adding...' : 'Add Expense'}
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
 * AddExpenseModal is like having an easy "Add to Bill" form:
 * 
 * 1. AMOUNT INPUT - Enter how much was spent with validation
 * 2. DESCRIPTION - What was the expense for (dinner, taxi, etc.)
 * 3. CATEGORY SELECTION - Choose from preset categories with icons
 * 4. DATE PICKER - When the expense happened (defaults to today)
 * 5. AUTOMATIC SPLITTING - Explains that bill will be split equally
 * 
 * Key Features:
 * - Real-time form validation
 * - Loading states during submission
 * - Error handling and display
 * - Auto-reset after successful submission
 * - Prevents closing during submission
 * - Character limits and input validation
 * 
 * User Experience:
 * - Simple, clean interface
 * - Clear labels and placeholders
 * - Visual feedback for errors
 * - Disabled state management
 * - Helpful information notes
 * 
 * It's like having a professional expense form that anyone can use easily!
 */
