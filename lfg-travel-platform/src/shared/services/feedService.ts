import { createClient } from '@/lib/supabase'
import { FeedItem, FeedFilters, FeedPagination, EngagementActionPayload, FeedItemRecord } from '@/shared/types/feed'

export const feedService = {
  // Get feed items with filters and pagination
  async getFeedItems(filters?: FeedFilters, pagination?: FeedPagination) {
    const supabase = createClient()
    
    let query = supabase
      .from('feed_items')
      .select(`
        *,
        user:profiles!user_id(*),
        trip:trips(id, title, destination),
        likes_count,
        comments_count,
        shares_count,
        user_likes:feed_likes!feed_item_id(user_id)
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.type && filters.type.length > 0) {
      query = query.in('type', filters.type)
    }
    
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters?.timeRange) {
      const now = new Date()
      let startDate: Date
      
      switch (filters.timeRange) {
        case 'day':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          startDate = new Date(0) // All time
      }
      
      query = query.gte('created_at', startDate.toISOString())
    }

    // Apply pagination
    if (pagination?.limit) {
      query = query.limit(pagination.limit)
    }
    
    if (pagination?.offset) {
      query = query.range(pagination.offset, pagination.offset + (pagination.limit || 20) - 1)
    }

    const { data, error } = await query

    if (error) throw error

    // Transform data to FeedItem format
    const feedItems: FeedItem[] = data?.map((item: any) => ({
      id: item.id,
      type: item.type,
      user: {
        id: item.user.id,
        name: item.user.full_name || item.user.username || 'Anonymous',
        avatar: item.user.avatar_url,
        isVerified: item.user.verified,
      },
      content: {
        title: item.title,
        description: item.description,
        image: item.image_url,
        location: item.location,
        timestamp: formatTimestamp(item.created_at),
        tripId: item.trip_id,
      },
      engagement: {
        likes: item.likes_count || 0,
        comments: item.comments_count || 0,
        shares: item.shares_count || 0,
        isLiked: item.user_likes?.length > 0,
      },
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) || []

    return { data: feedItems, error }
  },

  // Create a new feed item
  async createFeedItem(feedData: {
    type: string
    title: string
    description: string
    imageUrl?: string
    location?: string
    tripId?: string
    userId: string
  }) {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('feed_items')
      .insert({
        type: feedData.type,
        user_id: feedData.userId,
        title: feedData.title,
        description: feedData.description,
        image_url: feedData.imageUrl,
        location: feedData.location,
        trip_id: feedData.tripId,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0,
      })
      .select()
      .single()

    return { data, error }
  },

  // Handle engagement actions (like, comment, share)
  async handleEngagement(payload: EngagementActionPayload) {
    const supabase = createClient()
    
    switch (payload.action) {
      case 'like':
        return await this.likeFeedItem(payload.itemId, payload.userId)
      case 'unlike':
        return await this.unlikeFeedItem(payload.itemId, payload.userId)
      case 'comment':
        if (!payload.content) throw new Error('Comment content is required')
        return await this.commentOnFeedItem(payload.itemId, payload.userId, payload.content)
      case 'share':
        return await this.shareFeedItem(payload.itemId, payload.userId)
      default:
        throw new Error(`Unknown engagement action: ${payload.action}`)
    }
  },

  // Like a feed item
  async likeFeedItem(itemId: string, userId: string) {
    const supabase = createClient()
    
    // Check if already liked
    const { data: existingLike } = await supabase
      .from('feed_likes')
      .select('id')
      .eq('feed_item_id', itemId)
      .eq('user_id', userId)
      .single()

    if (existingLike) {
      return { data: null, error: new Error('Already liked') }
    }

    // Add like
    const { data, error } = await supabase
      .from('feed_likes')
      .insert({
        feed_item_id: itemId,
        user_id: userId,
      })
      .select()
      .single()

    if (!error) {
      // Increment likes count
      await supabase.rpc('increment_likes', { feed_item_id: itemId })
    }

    return { data, error }
  },

  // Unlike a feed item
  async unlikeFeedItem(itemId: string, userId: string) {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('feed_likes')
      .delete()
      .eq('feed_item_id', itemId)
      .eq('user_id', userId)

    if (!error) {
      // Decrement likes count
      await supabase.rpc('decrement_likes', { feed_item_id: itemId })
    }

    return { error }
  },

  // Comment on a feed item
  async commentOnFeedItem(itemId: string, userId: string, content: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('feed_comments')
      .insert({
        feed_item_id: itemId,
        user_id: userId,
        content,
      })
      .select()
      .single()

    if (!error) {
      // Increment comments count
      await supabase.rpc('increment_comments', { feed_item_id: itemId })
    }

    return { data, error }
  },

  // Share a feed item
  async shareFeedItem(itemId: string, userId: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('feed_shares')
      .insert({
        feed_item_id: itemId,
        user_id: userId,
      })
      .select()
      .single()

    if (!error) {
      // Increment shares count
      await supabase.rpc('increment_shares', { feed_item_id: itemId })
    }

    return { data, error }
  },

  // Get comments for a feed item
  async getFeedComments(itemId: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('feed_comments')
      .select(`
        *,
        user:profiles!user_id(*)
      `)
      .eq('feed_item_id', itemId)
      .order('created_at', { ascending: true })

    return { data, error }
  },

  // Create feed item from trip update
  async createTripUpdateFeed(tripId: string, userId: string, updateData: {
    title: string
    description: string
    imageUrl?: string
    location?: string
  }) {
    return await this.createFeedItem({
      type: 'trip_update',
      title: updateData.title,
      description: updateData.description,
      imageUrl: updateData.imageUrl,
      location: updateData.location,
      tripId,
      userId,
    })
  },

  // Create achievement feed item
  async createAchievementFeed(userId: string, achievementData: {
    title: string
    description: string
    imageUrl?: string
  }) {
    return await this.createFeedItem({
      type: 'achievement',
      title: achievementData.title,
      description: achievementData.description,
      imageUrl: achievementData.imageUrl,
      userId,
    })
  },
}

// Helper function to format timestamps
function formatTimestamp(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString()
  }
}