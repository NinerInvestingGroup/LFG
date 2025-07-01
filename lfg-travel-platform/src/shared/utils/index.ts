import { format, isAfter, isBefore, parseISO } from "date-fns"

// Date utilities
export const dateUtils = {
  formatDate: (date: string | Date, formatStr = "MMM dd, yyyy") => {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    return format(dateObj, formatStr)
  },

  formatDateTime: (date: string | Date) => {
    return dateUtils.formatDate(date, "MMM dd, yyyy HH:mm")
  },

  isUpcoming: (date: string) => {
    return isAfter(parseISO(date), new Date())
  },

  isPast: (date: string) => {
    return isBefore(parseISO(date), new Date())
  },

  getDurationInDays: (startDate: string, endDate: string) => {
    const start = parseISO(startDate)
    const end = parseISO(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  },
}

// String utilities
export const stringUtils = {
  truncate: (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  },

  capitalizeFirst: (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  },

  slugify: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  },

  generateUsername: (fullName: string) => {
    return (
      fullName
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "") + Math.floor(Math.random() * 1000)
    )
  },
}

// Number utilities
export const numberUtils = {
  formatCurrency: (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  },

  formatNumber: (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  },

  clamp: (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max)
  },
}

// Array utilities
export const arrayUtils = {
  unique: <T>(array: T[]) => [...new Set(array)],
  
  shuffle: <T>(array: T[]) => {\
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {\
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },
\
  groupBy: <T, K extends string | number | symbol>(array: T[], key: (item: T) => K) => {\
    return array.reduce((groups, item) => {\
      const group = key(item)
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups\
    }, {} as Record<K, T[]>)
  },
}

// Validation utilities
export const validation = {\
  isEmail: (email: string) => {\
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isStrongPassword: (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number\
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },

  // Phone number: optional leading +, then at least 10 of digits, spaces, dashes or parentheses
  isPhoneNumber: (phone: string) => {\
    const phoneRegex = /^\+?[0-9\s\-()]{10,}$/
    return phoneRegex.test(phone)
  },

  isUrl: (url: string) => {\
    try {
      new URL(url)\
      return true
    } catch {\
      return false
    }
  },
}

// Trip utilities
export const tripUtils = {\
  getStatusColor: (status: TripStatus) => {\
    const colors = {\
      draft: 'gray',
      active: 'blue',
      full: 'yellow',
      completed: 'green',
      cancelled: 'red',
    }
    return colors[status] || 'gray'
  },

  getParticipantStatusColor: (status: ParticipantStatus) => {\
    const colors = {\
      pending: 'yellow',
      approved: 'green',
      declined: 'red',
      left: 'gray',
    }
    return colors[status] || 'gray'
  },
\
  canJoinTrip: (trip: { organizer_id: string; status: string; current_participants: number; max_participants: number }, currentUserId?: string) => {\
    if (!currentUserId) return false
    if (trip.organizer_id === currentUserId) return false
    if (trip.status !== 'active') return false
    if (trip.current_participants >= trip.max_participants) return false
    return true
  },

  calculateBudgetRange: (budgetMin?: number, budgetMax?: number) => {\
    if (!budgetMin && !budgetMax) return 'Budget not specified'
    if (budgetMin && budgetMax) {\
      return `${numberUtils.formatCurrency(budgetMin)} - ${numberUtils.formatCurrency(budgetMax)}`
    }
    if (budgetMin) return `From ${numberUtils.formatCurrency(budgetMin)}`
    if (budgetMax) return `Up to ${numberUtils.formatCurrency(budgetMax)}`
    return 'Budget not specified'
  },
}

// Local storage utilities (client-side only)
export const storage = {\
  set: (key: string, value: unknown) => {\
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {\
    if (typeof window === 'undefined') return defaultValue || null
    try {\
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error('Error reading from localStorage:', error)\
      return defaultValue || null
    }
  },

  remove: (key: string) => {\
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: () => {\
    if (typeof window === 'undefined') return
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

// Image utilities
export const imageUtils = {\
  getImageUrl: (path: string, bucket: string = 'images') => {
    if (!path) return '/images/placeholder.jpg'
    if (path.startsWith('http')) return path
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
  },

  getAvatarUrl: (path?: string) => {
    return imageUtils.getImageUrl(path || '', 'avatars') || '/images/default-avatar.png'
  },

  generatePlaceholder: (width: number, height: number, text?: string) => {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text || 'LFG')}`
  },
}

// URL utilities
export const urlUtils = {
  buildSearchParams: (params: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()))
        } else {
          searchParams.set(key, value.toString())
        }
      }
    })
    
    return searchParams.toString()
  },

  getBaseUrl: () => {
    if (typeof window !== 'undefined') return window.location.origin
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  },
}
