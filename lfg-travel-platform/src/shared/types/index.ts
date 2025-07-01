import { Tables, TablesInsert, TablesUpdate } from './database'

// User Types
export type Profile = Tables<'profiles'>
export type ProfileInsert = TablesInsert<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>

// Trip Types
export type Trip = Tables<'trips'>
export type TripInsert = TablesInsert<'trips'>
export type TripUpdate = TablesUpdate<'trips'>
export type TripParticipant = Tables<'trip_participants'>
export type TripStatus = 'draft' | 'active' | 'full' | 'completed' | 'cancelled'
export type ParticipantStatus = 'pending' | 'approved' | 'declined' | 'left'

// Message Types
export type Message = Tables<'messages'>
export type MessageInsert = TablesInsert<'messages'>
export type MessageType = 'direct' | 'trip_chat' | 'system'

// Review Types
export type Review = Tables<'reviews'>
export type ReviewInsert = TablesInsert<'reviews'>

// Extended Trip Type with Related Data
export interface TripWithDetails extends Trip {
  organizer: Profile
  participants: (TripParticipant & { profile: Profile })[]
  participantCount: number
  isUserParticipant?: boolean
  userParticipantStatus?: ParticipantStatus
}

// Form Types
export interface TripFormData {
  title: string
  description?: string
  destination: string
  startDate: string
  endDate: string
  maxParticipants: number
  budgetMin?: number
  budgetMax?: number
  tripType: string
  difficultyLevel: string
  tags?: string[]
  images?: string[]
}

export interface ProfileFormData {
  username?: string
  fullName?: string
  bio?: string
  location?: string
  dateOfBirth?: string
  phone?: string
  travelPreferences?: {
    budgetRange: [number, number]
    preferredDestinations: string[]
    travelStyle: string[]
    interests: string[]
  }
}

// Search and Filter Types
export interface TripFilters {
  destination?: string
  startDate?: string
  endDate?: string
  budgetMin?: number
  budgetMax?: number
  tripType?: string
  difficultyLevel?: string
  tags?: string[]
  availableSpots?: boolean
}

export interface SearchParams {
  query?: string
  filters?: TripFilters
  sortBy?: 'created_at' | 'start_date' | 'price' | 'popularity'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  totalPages: number
}

// UI State Types
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface ModalState {
  isOpen: boolean
  type?: string
  data?: unknown
}

// Notification Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

// Travel specific types
export interface TravelPreferences {
  budgetRange: [number, number]
  preferredDestinations: string[]
  travelStyle: string[]
  interests: string[]
  accommodationType: string[]
  transportPreferences: string[]
}

export interface Destination {
  id: string
  name: string
  country: string
  coordinates: [number, number] // [latitude, longitude]
  description?: string
  popularMonths: number[]
  averageBudget: number
  tags: string[]
}

// Constants for dropdowns and selections
export const TRIP_TYPES = [
  'Adventure',
  'Cultural',
  'Relaxation',
  'Business',
  'Educational',
  'Food & Drink',
  'Festival',
  'Sports',
  'Wildlife',
  'Photography',
] as const

export const DIFFICULTY_LEVELS = [
  'Easy',
  'Moderate',
  'Challenging',
  'Extreme',
] as const

export const TRAVEL_STYLES = [
  'Budget',
  'Mid-range',
  'Luxury',
  'Backpacking',
  'Group',
  'Solo-friendly',
  'Family-friendly',
  'Couples',
] as const

export type TripType = typeof TRIP_TYPES[number]
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number]
export type TravelStyle = typeof TRAVEL_STYLES[number]