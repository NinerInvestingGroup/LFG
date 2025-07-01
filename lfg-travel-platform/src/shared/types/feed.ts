import { Profile } from './index'

export type FeedItemType = 'trip_update' | 'achievement' | 'recommendation' | 'trending'

export interface FeedUser {
  id: string
  name: string
  avatar?: string
  isVerified?: boolean
}

export interface FeedContent {
  title: string
  description: string
  image?: string
  location?: string
  timestamp: string
  tripId?: string // Link to actual trip in database
}

export interface FeedEngagement {
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  hasUserLiked?: boolean // Track if current user liked this
}

export interface FeedBadge {
  text: string
  color: string
  variant?: 'default' | 'secondary' | 'destructive' | 'warning' | 'outline' | 'success'
}

export interface FeedItem {
  id: string
  type: FeedItemType
  user: FeedUser
  content: FeedContent
  engagement: FeedEngagement
  badge?: FeedBadge
  createdAt: string
  updatedAt: string
}

// Extended types that integrate with Supabase data
export interface FeedItemWithProfile extends Omit<FeedItem, 'user'> {
  user: Profile
}

// API response types for feed data
export interface FeedResponse {
  items: FeedItem[]
  hasMore: boolean
  nextCursor?: string
}

// Feed filter and pagination types
export interface FeedFilters {
  type?: FeedItemType[]
  following?: boolean // Only show items from people user follows
  location?: string
  timeRange?: 'day' | 'week' | 'month' | 'all'
}

export interface FeedPagination {
  limit?: number
  cursor?: string
  offset?: number
}

// Engagement action types
export type EngagementAction = 'like' | 'unlike' | 'comment' | 'share'

export interface EngagementActionPayload {
  itemId: string
  action: EngagementAction
  userId: string
  content?: string // For comments
}

// Database schema for feed items (if stored in Supabase)
export interface FeedItemRecord {
  id: string
  type: FeedItemType
  user_id: string
  title: string
  description: string
  image_url?: string
  location?: string
  trip_id?: string
  likes_count: number
  comments_count: number
  shares_count: number
  created_at: string
  updated_at: string
}

// Feed engagement tracking (for database)
export interface FeedLikeRecord {
  id: string
  feed_item_id: string
  user_id: string
  created_at: string
}

export interface FeedCommentRecord {
  id: string
  feed_item_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface FeedShareRecord {
  id: string
  feed_item_id: string
  user_id: string
  created_at: string
}

// Achievement types for feed
export type AchievementType = 
  | 'first_trip'
  | 'trip_organizer'
  | 'frequent_traveler'
  | 'destination_expert'
  | 'review_writer'
  | 'community_helper'

export interface Achievement {
  type: AchievementType
  title: string
  description: string
  badge: FeedBadge
  unlockedAt: string
  requirements?: string
}
