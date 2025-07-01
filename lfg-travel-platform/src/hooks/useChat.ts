import { useState, useEffect, useCallback, useRef } from 'react'
import { chatService, MessageWithProfile, SendMessageData } from '@/services/chatService'

/**
 * CHAT HOOKS FOR REACT COMPONENTS
 * 
 * These hooks make chat functionality super easy to use in your React components.
 * They handle loading states, errors, and real-time updates automatically.
 */

/**
 * USE TRIP CHAT HOOK
 * 
 * This hook loads and manages all messages for a trip's group chat.
 * It includes real-time updates - new messages appear instantly!
 * 
 * Usage:
 * const { messages, loading, error, unreadCount } = useTripChat(tripId)
 */
export function useTripChat(tripId: string | null) {
  const [messages, setMessages] = useState<MessageWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  // Load messages when component mounts or tripId changes
  const loadMessages = useCallback(async () => {
    if (!tripId) {
      setMessages([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await chatService.getTripMessages(tripId)
    
    if (fetchError) {
      setError(fetchError)
      setMessages([])
    } else if (data) {
      setMessages(data)
    }
    
    setLoading(false)
  }, [tripId])

  // Load unread count
  const loadUnreadCount = useCallback(async () => {
    if (!tripId) return

    const { count } = await chatService.getUnreadCount(tripId)
    setUnreadCount(count)
  }, [tripId])

  // Initial load
  useEffect(() => {
    loadMessages()
    loadUnreadCount()
  }, [loadMessages, loadUnreadCount])

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!tripId) return

    const unsubscribe = chatService.subscribeToMessages(tripId, (newMessage) => {
      if (newMessage) {
        setMessages(prev => [...prev, newMessage])
        // Update unread count if it's not from current user
        loadUnreadCount()
      }
    })

    return unsubscribe
  }, [tripId, loadUnreadCount])

  // Mark messages as read when user views chat
  const markAsRead = useCallback(async () => {
    if (!tripId) return

    await chatService.markMessagesAsRead(tripId)
    setUnreadCount(0)
  }, [tripId])

  return {
    messages,           // Array of all messages with sender info
    loading,            // true when loading, false when done
    error,              // Error message if something went wrong
    unreadCount,        // Number of unread messages
    markAsRead,         // Function to mark messages as read
    refetch: loadMessages, // Function to reload messages
  }
}

/**
 * USE SEND MESSAGE HOOK
 * 
 * This hook provides a function to send messages to trip chat.
 * It handles loading states and errors automatically.
 * 
 * Usage:
 * const { sendMessage, loading, error } = useSendMessage()
 * const handleSend = () => sendMessage({ tripId, content: "Hello!" })
 */
export function useSendMessage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (messageData: SendMessageData): Promise<boolean> => {
    if (!messageData.content.trim()) {
      setError('Message cannot be empty')
      return false
    }

    setLoading(true)
    setError(null)

    const { error: sendError } = await chatService.sendMessage(messageData)
    
    if (sendError) {
      setError(sendError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    sendMessage,        // Function to send a message
    loading,            // true when sending, false when done
    error,              // Error message if sending failed
    clearError,         // Function to clear error
  }
}

/**
 * USE AUTO SCROLL HOOK
 * 
 * This hook automatically scrolls to the bottom of chat when new messages arrive.
 * It's smart - only scrolls if user was already at the bottom (not reading old messages).
 */
export function useAutoScroll(messages: MessageWithProfile[]) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

  // Scroll to bottom when new messages arrive (if user was at bottom)
  useEffect(() => {
    if (shouldAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, shouldAutoScroll])

  // Check if user is at bottom when they scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10

    setShouldAutoScroll(isAtBottom)
  }, [])

  // Function to manually scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setShouldAutoScroll(true)
    }
  }, [])

  return {
    scrollRef,         // Ref to attach to scrollable chat container
    handleScroll,      // Function to call on scroll events
    scrollToBottom,    // Function to manually scroll to bottom
    shouldAutoScroll,  // Whether auto-scroll is currently enabled
  }
}

/**
 * USE MESSAGE ACTIONS HOOK
 * 
 * This hook provides functions for message actions like deleting messages.
 */
export function useMessageActions(tripId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteMessage = useCallback(async (messageId: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: deleteError } = await chatService.deleteMessage(messageId, tripId)
    
    if (deleteError) {
      setError(deleteError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [tripId])

  const sendSystemMessage = useCallback(async (content: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    const { error: systemError } = await chatService.sendSystemMessage(tripId, content)
    
    if (systemError) {
      setError(systemError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }, [tripId])

  return {
    deleteMessage,      // Function to delete a message
    sendSystemMessage,  // Function to send system message
    loading,            // true when performing action
    error,              // Error message if action failed
    clearError: () => setError(null), // Clear error function
  }
}

/**
 * USE CHAT TYPING INDICATOR HOOK
 * 
 * This hook manages typing indicators to show when someone is typing.
 * For now it's a simple implementation - can be enhanced later.
 */
export function useTypingIndicator() {
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const startTyping = useCallback(() => {
    setIsTyping(true)
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Stop typing after 3 seconds of no activity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 3000)
  }, [])

  const stopTyping = useCallback(() => {
    setIsTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return {
    isTyping,          // Whether current user is typing
    typingUsers,       // Array of other users who are typing
    startTyping,       // Call when user starts typing
    stopTyping,        // Call when user stops typing
  }
}

/**
 * USE CHAT NOTIFICATIONS HOOK
 * 
 * This hook manages notifications for unread messages across all trips.
 */
export function useChatNotifications(userTripIds: string[]) {
  const [totalUnread, setTotalUnread] = useState(0)
  const [unreadByTrip, setUnreadByTrip] = useState<Record<string, number>>({})

  const updateUnreadCounts = useCallback(async () => {
    if (userTripIds.length === 0) return

    const counts: Record<string, number> = {}
    let total = 0

    for (const tripId of userTripIds) {
      const { count } = await chatService.getUnreadCount(tripId)
      counts[tripId] = count
      total += count
    }

    setUnreadByTrip(counts)
    setTotalUnread(total)
  }, [userTripIds])

  // Update counts when trip list changes
  useEffect(() => {
    updateUnreadCounts()
  }, [updateUnreadCounts])

  // Refresh counts periodically (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(updateUnreadCounts, 30000)
    return () => clearInterval(interval)
  }, [updateUnreadCounts])

  return {
    totalUnread,       // Total unread messages across all trips
    unreadByTrip,      // Unread count for each trip
    refreshCounts: updateUnreadCounts, // Function to manually refresh
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THESE HOOKS DO:
 * 
 * useTripChat(tripId) - "Give me all messages for this trip"
 * - Loads message history automatically
 * - Updates in real-time when new messages arrive
 * - Tracks unread message count
 * - Handles loading and error states
 * 
 * useSendMessage() - "Give me a function to send messages"
 * - Provides sendMessage function
 * - Handles loading state while sending
 * - Shows errors if sending fails
 * - Validates message content
 * 
 * useAutoScroll(messages) - "Automatically scroll chat to bottom"
 * - Scrolls to new messages automatically
 * - Only scrolls if user was already at bottom
 * - Provides manual scroll to bottom function
 * 
 * useMessageActions(tripId) - "Give me message management functions"
 * - Delete messages (with permission checks)
 * - Send system messages
 * - Proper error handling
 * 
 * useTypingIndicator() - "Show when someone is typing"
 * - Manages typing state
 * - Auto-stops after inactivity
 * - Can be enhanced for real-time typing indicators
 * 
 * useChatNotifications(tripIds) - "Track unread messages"
 * - Counts unread messages across all trips
 * - Updates automatically
 * - Used for notification badges
 */
