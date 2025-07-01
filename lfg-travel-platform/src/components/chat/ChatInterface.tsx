'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { MessageSquare, Send, Users, Loader2, AlertCircle, Trash2 } from "lucide-react"
import { useTripChat, useSendMessage, useAutoScroll, useMessageActions } from "@/hooks/useChat"
import { useAuth } from "@/contexts/AuthContext"
import { MessageWithProfile } from "@/services/chatService"
import { format, isToday, isYesterday } from "date-fns"

interface ChatInterfaceProps {
  tripId: string
  tripTitle: string
  className?: string
}

export function ChatInterface({ tripId, tripTitle, className = "" }: ChatInterfaceProps) {
  const { user } = useAuth()
  const [messageText, setMessageText] = useState('')
  
  // Chat hooks
  const { messages, loading, error, unreadCount, markAsRead } = useTripChat(tripId)
  const { sendMessage, loading: sending, error: sendError, clearError } = useSendMessage()
  const { scrollRef, handleScroll, scrollToBottom } = useAutoScroll(messages)
  const { deleteMessage, loading: deleting } = useMessageActions(tripId)

  // Mark messages as read when component mounts or tripId changes
  useEffect(() => {
    markAsRead()
  }, [markAsRead, tripId])

  // Handle sending message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!messageText.trim()) return

    const success = await sendMessage({
      tripId,
      content: messageText.trim()
    })

    if (success) {
      setMessageText('')
      clearError()
      scrollToBottom()
    }
  }

  // Handle deleting message
  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    await deleteMessage(messageId)
  }

  // Format message timestamp
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    
    if (isToday(date)) {
      return format(date, 'HH:mm')
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, 'HH:mm')}`
    } else {
      return format(date, 'MMM d, HH:mm')
    }
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string | null) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Check if message is from current user
  const isOwnMessage = (message: MessageWithProfile) => {
    return user?.id === message.sender_id
  }

  // Check if user can delete message
  const canDeleteMessage = (message: MessageWithProfile) => {
    return user?.id === message.sender_id // Users can delete their own messages
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Trip Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2">Loading chat...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Trip Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {tripTitle} Chat
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{messages.length > 0 ? `${new Set(messages.map(m => m.sender_id)).size} active` : 'No messages yet'}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-96">
        {/* Messages Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-600">
                Start the conversation! Say hello to your travel companions.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  isOwnMessage(message) 
                    ? 'flex-row-reverse' 
                    : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage 
                    src={message.sender.avatar_url || undefined} 
                    alt={message.sender.full_name || 'User'} 
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(message.sender.full_name)}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div className={`flex-1 max-w-xs ${isOwnMessage(message) ? 'text-right' : 'text-left'}`}>
                  {/* Message Bubble */}
                  <div
                    className={`relative inline-block px-4 py-2 rounded-2xl ${
                      message.message_type === 'system'
                        ? 'bg-blue-100 text-blue-800 text-center italic'
                        : isOwnMessage(message)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {/* Sender Name (for other people's messages) */}
                    {!isOwnMessage(message) && message.message_type !== 'system' && (
                      <div className="text-xs font-medium text-gray-600 mb-1">
                        {message.sender.full_name || 'Unknown User'}
                      </div>
                    )}

                    {/* Message Text */}
                    <div className="text-sm break-words">
                      {message.content}
                    </div>

                    {/* Delete Button (for own messages) */}
                    {canDeleteMessage(message) && message.message_type !== 'system' && (
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        disabled={deleting}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage(message) ? 'text-right' : 'text-left'}`}>
                    {formatMessageTime(message.created_at)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          {sendError && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
              {sendError}
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
              className="flex-1"
              maxLength={1000}
            />
            <Button 
              type="submit" 
              disabled={sending || !messageText.trim()}
              className="bg-primary hover:bg-primary-600"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
          
          <div className="text-xs text-gray-500 mt-1 text-right">
            {messageText.length}/1000
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * ChatInterface - "A complete chat interface for trip groups"
 * 
 * Features:
 * - Shows message history with profile pictures
 * - Real-time updates (new messages appear instantly)
 * - Send messages with enter key or send button
 * - Different styling for own vs others' messages
 * - System messages (like "John joined the trip")
 * - Message timestamps (smart formatting)
 * - Auto-scroll to new messages
 * - Delete own messages
 * - Character limit and validation
 * - Loading states and error handling
 * - Unread message count
 * - Participant count display
 * 
 * Props:
 * - tripId: Which trip's chat to show
 * - tripTitle: Name of the trip for header
 * - className: CSS styling
 * 
 * Usage:
 * <ChatInterface 
 *   tripId="123" 
 *   tripTitle="Bali Adventure"
 * />
 */