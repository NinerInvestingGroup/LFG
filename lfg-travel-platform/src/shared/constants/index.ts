// App Configuration
export const APP_CONFIG = {
  name: 'LFG Travel Platform',
  description: 'Connect with fellow travelers and explore the world together',
  version: '1.0.0',
  author: 'LFG Team',
  social: {
    twitter: '@lfg_travel',
    instagram: '@lfg.travel',
    facebook: 'lfgtravel',
  },
}

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  timeout: 10000,
  retryAttempts: 3,
}

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 50,
  pageSizeOptions: [6, 12, 24, 48],
}

// File Upload
export const FILE_UPLOAD = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxImagesPerTrip: 10,
  maxImageDimension: 2048,
}

// Form Validation
export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  bio: {
    maxLength: 500,
  },
  tripTitle: {
    minLength: 5,
    maxLength: 100,
  },
  tripDescription: {
    maxLength: 2000,
  },
}

// Trip Configuration
export const TRIP_CONFIG = {
  maxParticipants: 50,
  minParticipants: 2,
  maxAdvanceBookingDays: 365,
  minAdvanceBookingDays: 1,
  defaultDuration: 7, // days
}

// Notification Settings
export const NOTIFICATIONS = {
  autoHideDelay: 5000, // 5 seconds
  maxVisible: 5,
  types: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  } as const,
}

// Theme Configuration
export const THEME = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#eab308',
    accent: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    success: '#10b981',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
}

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DISCOVER: '/discover',
  TRIPS: '/trips',
  MESSAGES: '/messages',
  PROFILE: '/profile',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  TRIP: {
    CREATE: '/trips/create',
    EDIT: (id: string) => `/trips/${id}/edit`,
    VIEW: (id: string) => `/trips/${id}`,
  },
  USER: {
    PROFILE: (id: string) => `/users/${id}`,
    SETTINGS: '/profile/settings',
  },
} as const

// Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'lfg_user_preferences',
  SEARCH_HISTORY: 'lfg_search_history',
  DRAFT_TRIP: 'lfg_draft_trip',
  THEME: 'lfg_theme',
  LANGUAGE: 'lfg_language',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to log in to access this feature.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please use supported formats.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  TRIP_CREATED: 'Trip created successfully!',
  TRIP_UPDATED: 'Trip updated successfully!',
  TRIP_DELETED: 'Trip deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  JOIN_REQUEST_SENT: 'Join request sent successfully!',
  PASSWORD_UPDATED: 'Password updated successfully!',
  EMAIL_VERIFIED: 'Email verified successfully!',
} as const

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  INPUT: 'yyyy-MM-dd',
  INPUT_WITH_TIME: 'yyyy-MM-dd HH:mm',
  API: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
} as const

// Regular Expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  URL: /^https?:\/\/.+/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  SLUG: /^[a-z0-9-]+$/,
} as const

// Social Media
export const SOCIAL_MEDIA = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  YOUTUBE: 'youtube',
} as const

// Trip Categories/Tags
export const TRIP_TAGS = [
  'Adventure',
  'Beach',
  'City Break',
  'Cultural',
  'Foodie',
  'Hiking',
  'Historical',
  'Mountain',
  'Nature',
  'Photography',
  'Relaxation',
  'Road Trip',
  'Safari',
  'Skiing',
  'Solo Travel',
  'Spiritual',
  'Sports',
  'Wildlife',
  'Wine Tasting',
  'Backpacking',
  'Luxury',
  'Budget',
  'Festival',
  'Concert',
  'Art',
  'Architecture',
  'Music',
  'Dance',
  'Yoga',
  'Wellness',
] as const

// Countries (popular destinations)
export const POPULAR_DESTINATIONS = [
  'United States',
  'United Kingdom',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Japan',
  'Australia',
  'Canada',
  'Thailand',
  'Indonesia',
  'Greece',
  'Turkey',
  'Mexico',
  'Brazil',
  'India',
  'China',
  'South Korea',
  'Vietnam',
  'Philippines',
  'Malaysia',
  'Singapore',
  'New Zealand',
  'South Africa',
  'Egypt',
  'Morocco',
  'Kenya',
  'Tanzania',
  'Iceland',
  'Norway',
  'Sweden',
  'Denmark',
  'Finland',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Portugal',
  'Croatia',
  'Czech Republic',
  'Poland',
  'Hungary',
  'Romania',
  'Bulgaria',
  'Russia',
  'Argentina',
  'Chile',
  'Peru',
  'Colombia',
  'Ecuador',
  'Costa Rica',
  'Guatemala',
  'Belize',
  'Jamaica',
  'Cuba',
  'Dominican Republic',
] as const

export type TripTag = typeof TRIP_TAGS[number]
export type PopularDestination = typeof POPULAR_DESTINATIONS[number]
