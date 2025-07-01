'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Label } from "@/components/ui/Label"
import { Mail, Send, Loader2, Check, X, UserPlus } from "lucide-react"
import { useSendInvitation } from "@/hooks/useParticipants"

interface InviteFormProps {
  tripId: string
  tripTitle: string
  onSuccess?: () => void
  onCancel?: () => void
  className?: string
}

export function InviteForm({ tripId, tripTitle, onSuccess, onCancel, className = "" }: InviteFormProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { sendInvitation, loading, error, success, clearState } = useSendInvitation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) return

    const inviteSuccess = await sendInvitation({
      tripId,
      email: email.trim(),
      message: message.trim() || undefined
    })

    if (inviteSuccess) {
      setEmail('')
      setMessage('')
      onSuccess?.()
    }
  }

  const handleCancel = () => {
    setEmail('')
    setMessage('')
    clearState()
    onCancel?.()
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Invite People to "{tripTitle}"
        </CardTitle>
        <p className="text-sm text-gray-600">
          Send an email invitation to someone you'd like to join this trip.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {email && !isValidEmail(email) && (
              <p className="text-xs text-red-600">Please enter a valid email address</p>
            )}
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Personal Message (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Hey! I'm planning an awesome trip and would love for you to join us..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500">
              {message.length}/500 characters
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">
                Invitation sent successfully! They'll receive an email to join the trip.
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <X className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading || !email.trim() || !isValidEmail(email)}
              className="flex-1 bg-primary hover:bg-primary-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">How Email Invitations Work</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• The person will receive an email with trip details</li>
            <li>• They can accept or decline the invitation</li>
            <li>• If they don't have an account, they'll be prompted to sign up</li>
            <li>• You'll see their response in the participant list</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * InviteForm - "A form to invite people to join a trip via email"
 * 
 * Features:
 * - Simple email input with validation
 * - Optional personal message field
 * - Send invitation button with loading state
 * - Success/error feedback messages
 * - Cancel option
 * - Character count for message
 * - Info box explaining how invitations work
 * 
 * Props:
 * - tripId: Which trip to invite people to
 * - tripTitle: Name of the trip (shown in header)
 * - onSuccess: Called when invitation is sent successfully
 * - onCancel: Called when user cancels
 * - className: CSS styling
 * 
 * Usage:
 * <InviteForm 
 *   tripId="123" 
 *   tripTitle="Bali Adventure"
 *   onSuccess={() => setShowInviteForm(false)}
 *   onCancel={() => setShowInviteForm(false)}
 * />
 */
