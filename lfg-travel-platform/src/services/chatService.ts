import { createClient } from '@/lib/supabase'
import { Tables, TablesInsert } from '@/shared/types/database'

// Type aliases for easier use
export type Message = Tables<'messages'>
export type MessageInsert = TablesInsert<'messages'>

// Enhanced message type with sender profile information
export interface MessageWithProfile extends Message {
  sender: {
    id: string
    full_name: string | null
    avatar_url: string | null
    email: string
  }
}

// Message data for sending new messages
export interface SendMessageData {
  tripId: string
  content: string
  messageType?: 'trip_chat' | 'system'
}

/**
 * REAL-TIME CHAT SERVICE
 * 
 * This service handles all chat operations for trip groups:
 * - Sending messages to trip chat
 * - Loading message history
 * - Real-time message subscriptions
 * - Participant access control
 * - Message status management
 */

export const chatService = {
  /**
   * SEND MESSAGE TO TRIP CHAT
   * 
   * This function sends a message to a trip's group chat.
   * Only trip participants can send messages.
   * 
   * Think of this like posting to a group chat - the message
   * gets saved to the database and instantly appears for everyone.
   */
  async sendMessage(messageData: SendMessageData): Promise<{ error: string | null; data?: Message }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to send messages' }
      }

      // Check if user is a participant in this trip
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', messageData.tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { error: 'Only trip participants can send messages to this chat' }
      }

      // Send the message
      const { data: message, error: messageError } = await supabase
        .from('messages')
        .insert({
          trip_id: messageData.tripId,
          sender_id: user.id,
          content: messageData.content,
          message_type: messageData.messageType || 'trip_chat',
          read: false,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (messageError) {
        console.error('Error sending message:', messageError)
        return { error: messageError.message }
      }

      return { error: null, data: message }
    } catch (error) {
      console.error('Unexpected error sending message:', error)
      return { error: 'Failed to send message. Please try again.' }
    }
  },

  /**
   * GET TRIP CHAT MESSAGES
   * 
   * This function loads all messages for a trip's group chat.
   * Only trip participants can view messages.
   * 
   * Think of this like opening a group chat and seeing
   * all the previous messages with profile pictures.
   */
  async getTripMessages(tripId: string): Promise<{ 
    data: MessageWithProfile[] | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to view messages' }
      }

      // Check if user is a participant in this trip
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { data: null, error: 'Only trip participants can view this chat' }
      }

      // Get all messages for this trip with sender profile info
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('trip_id', tripId)
        .eq('message_type', 'trip_chat')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
        return { data: null, error: error.message }
      }

      return { data: messages as MessageWithProfile[], error: null }
    } catch (error) {
      console.error('Unexpected error fetching messages:', error)
      return { data: null, error: 'Failed to load messages. Please try again.' }
    }
  },

  /**
   * MARK MESSAGES AS READ
   * 
   * This function marks messages as read when a user views them.
   * Used for showing unread message counts and status.
   */
  async markMessagesAsRead(tripId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to mark messages as read' }
      }

      // Mark all unread messages in this trip as read (except user's own messages)
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('trip_id', tripId)
        .eq('read', false)
        .neq('sender_id', user.id)

      if (error) {
        console.error('Error marking messages as read:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error marking messages as read:', error)
      return { error: 'Failed to mark messages as read' }
    }
  },

  /**
   * GET UNREAD MESSAGE COUNT
   * 
   * This function gets the count of unread messages for a trip.
   * Used for showing notification badges and unread counts.
   */
  async getUnreadCount(tripId: string): Promise<{ count: number; error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { count: 0, error: 'You must be logged in to check unread messages' }
      }

      // Count unread messages in this trip (excluding user's own messages)
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('trip_id', tripId)
        .eq('message_type', 'trip_chat')
        .eq('read', false)
        .neq('sender_id', user.id)

      if (error) {
        console.error('Error getting unread count:', error)
        return { count: 0, error: error.message }
      }

      return { count: count || 0, error: null }
    } catch (error) {
      console.error('Unexpected error getting unread count:', error)
      return { count: 0, error: 'Failed to get unread count' }
    }
  },

  /**
   * SUBSCRIBE TO REAL-TIME MESSAGES
   * 
   * This function sets up real-time subscriptions for new messages.
   * When someone sends a message, everyone in the chat sees it instantly.
   * 
   * Think of this like having your walkie-talkie tuned to the right
   * frequency - you automatically hear new messages as they come in.
   */
  subscribeToMessages(tripId: string, callback: (payload: any) => void) {
    const supabase = createClient()

    const subscription = supabase
      .channel(`trip-chat-${tripId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `trip_id=eq.${tripId}`,
        },
        async (payload) => {
          // When a new message arrives, fetch it with profile info
          if (payload.new) {
            const { data: messageWithProfile } = await supabase
              .from('messages')
              .select(`
                *,
                sender:profiles!messages_sender_id_fkey (
                  id,
                  full_name,
                  avatar_url,
                  email
                )
              `)
              .eq('id', payload.new.id)
              .single()

            callback(messageWithProfile)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  },

  /**
   * SEND SYSTEM MESSAGE
   * 
   * This function sends system messages (like "John joined the trip").
   * These appear differently in the chat to show important events.
   */
  async sendSystemMessage(tripId: string, content: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'System message requires authentication' }
      }

      const { error } = await supabase
        .from('messages')
        .insert({
          trip_id: tripId,
          sender_id: user.id,
          content,
          message_type: 'system',
          read: false,
          created_at: new Date().toISOString(),
        })

      if (error) {
        console.error('Error sending system message:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error sending system message:', error)
      return { error: 'Failed to send system message' }
    }
  },

  /**
   * DELETE MESSAGE
   * 
   * This function deletes a message (only sender or trip organizer can delete).
   */
  async deleteMessage(messageId: string, tripId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to delete messages' }
      }

      // Get message and trip info
      const { data: message } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('id', messageId)
        .single()

      const { data: trip } = await supabase
        .from('trips')
        .select('organizer_id')
        .eq('id', tripId)
        .single()

      if (!message || !trip) {
        return { error: 'Message or trip not found' }
      }

      // Only sender or trip organizer can delete
      if (message.sender_id !== user.id && trip.organizer_id !== user.id) {
        return { error: 'You can only delete your own messages or organizer can delete any message' }
      }

      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)

      if (error) {
        console.error('Error deleting message:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error deleting message:', error)
      return { error: 'Failed to delete message' }
    }
  },
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS SERVICE DOES:
 * 
 * chatService.sendMessage() - "Post a message to the group chat"
 * - Checks if user is a trip participant
 * - Saves message to database
 * - Real-time system broadcasts it to everyone
 * 
 * chatService.getTripMessages() - "Load all previous messages"
 * - Gets message history with sender profile info
 * - Only participants can view messages
 * - Messages are ordered by time (oldest first)
 * 
 * chatService.subscribeToMessages() - "Listen for new messages"
 * - Sets up real-time listener for new messages
 * - When someone sends a message, everyone gets it instantly
 * - Automatically includes sender profile information
 * 
 * chatService.markMessagesAsRead() - "Mark messages as seen"
 * - Updates unread status when user views chat
 * - Used for notification badges and read receipts
 * 
 * chatService.getUnreadCount() - "Count unseen messages"
 * - Shows how many unread messages in each chat
 * - Used for notification badges on trip list
 * 
 * Security Features:
 * - Only trip participants can see/send messages
 * - Authentication required for all operations
 * - Proper error handling and validation
 * - Messages are tied to specific trips
 */