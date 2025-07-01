import { format, isAfter, isBefore, parseISO } from "date-fns"

/* -------------------------------------------------------------------------- */
/*                               DATE UTILITIES                               */
/* -------------------------------------------------------------------------- */
export const dateUtils = {
  formatDate: (date: string | Date, formatStr = "MMM dd, yyyy") => {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    return format(dateObj, formatStr)
  },

  formatDateTime: (date: string | Date) => {
    return dateUtils.formatDate(date, "MMM dd, yyyy HH:mm")
  },

  isUpcoming: (date: string) => isAfter(parseISO(date), new Date()),

  isPast: (date: string) => isBefore(parseISO(date), new Date()),

  getDurationInDays: (startDate: string, endDate: string) => {
    const start = parseISO(startDate)
    const end = parseISO(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  },
}

/* -------------------------------------------------------------------------- */
/*                              STRING UTILITIES                              */
/* -------------------------------------------------------------------------- */
export const stringUtils = {
  truncate: (text: string, maxLength: number) => (text.length <= maxLength ? text : `${text.substring(0, maxLength)}…`),

  capitalizeFirst: (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`,

  slugify: (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-"),

  generateUsername: (fullName: string) =>
    `${fullName
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "")}${Math.floor(Math.random() * 1000)}`,
}

/* -------------------------------------------------------------------------- */
/*                              NUMBER UTILITIES                              */
/* -------------------------------------------------------------------------- */
export const numberUtils = {
  formatCurrency: (amount: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount),

  formatNumber: (num: number) => new Intl.NumberFormat("en-US").format(num),

  clamp: (value: number, min: number, max: number) => Math.min(Math.max(value, min), max),
}

/* -------------------------------------------------------------------------- */
/*                               ARRAY UTILITIES                              */
/* -------------------------------------------------------------------------- */
export const arrayUtils = {
  unique: (array: any[]) => [...new Set(array)],

  shuffle: (array: any[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },

  groupBy: (array: any[], key: any) =>
    array.reduce((groups: any, item: any) => {
      const group = key(item)
      ;(groups[group] ||= []).push(item)
      return groups
    }, {}),
}

/* -------------------------------------------------------------------------- */
/*                             VALIDATION UTILITIES                           */
/* -------------------------------------------------------------------------- */
export const validation = {
  isEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  // ≥8 chars, 1 uppercase, 1 lowercase, 1 number
  isStrongPassword: (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password),

  // Optional “+”, then at least 10 digits / (, ), space, or -
  isPhoneNumber: (phone: string) => /^\+?[0-9()\s-]{10,}$/.test(phone),

  isUrl: (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
}

/* -------------------------------------------------------------------------- */
/*                              TRIP UTILITIES                               */
/* -------------------------------------------------------------------------- */
export const tripUtils = {
  getStatusColor: (status: string) =>
    (
      ({
        draft: "gray",
        active: "blue",
        full: "yellow",
        completed: "green",
        cancelled: "red",
      }) as const
    )[status] || "gray",

  getParticipantStatusColor: (status: string) =>
    (
      ({
        pending: "yellow",
        approved: "green",
        declined: "red",
        left: "gray",
      }) as const
    )[status] || "gray",

  canJoinTrip: (
    trip: {
      organizer_id: string
      status: string
      current_participants: number
      max_participants: number
    },
    currentUserId?: string,
  ) => {
    if (!currentUserId) return false
    if (trip.organizer_id === currentUserId) return false
    if (trip.status !== "active") return false
    if (trip.current_participants >= trip.max_participants) return false
    return true
  },

  calculateBudgetRange: (budgetMin?: number, budgetMax?: number) => {
    if (!budgetMin && !budgetMax) return "Budget not specified"
    if (budgetMin && budgetMax) return `${budgetMin} – ${budgetMax}`
    if (budgetMin) return `From ${budgetMin}`
    return `Up to ${budgetMax}`
  },
}

/* -------------------------------------------------------------------------- */
/*                       LOCAL-STORAGE (CLIENT ONLY)                          */
/* -------------------------------------------------------------------------- */
export const storage = {
  set: (key: string, value: unknown) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error("Error saving to localStorage:", err)
    }
  },

  get: (key: string, defaultValue?: any): any | null => {
    if (typeof window === "undefined") return defaultValue ?? null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : (defaultValue ?? null)
    } catch (err) {
      console.error("Error reading from localStorage:", err)
      return defaultValue ?? null
    }
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return
    try {
      localStorage.removeItem(key)
    } catch (err) {
      console.error("Error removing from localStorage:", err)
    }
  },

  clear: () => {
    if (typeof window === "undefined") return
    try {
      localStorage.clear()
    } catch (err) {
      console.error("Error clearing localStorage:", err)
    }
  },
}

/* -------------------------------------------------------------------------- */
/*                              IMAGE UTILITIES                               */
/* -------------------------------------------------------------------------- */
export const imageUtils = {
  getImageUrl: (path: string, bucket = "images") => {
    if (!path) return "/images/placeholder.jpg"
    if (path.startsWith("http")) return path
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
  },

  getAvatarUrl: (path?: string) => imageUtils.getImageUrl(path || "", "avatars"),

  generatePlaceholder: (w: number, h: number, text = "LFG") =>
    `https://via.placeholder.com/${w}x${h}?text=${encodeURIComponent(text)}`,
}

/* -------------------------------------------------------------------------- */
/*                               URL UTILITIES                                */
/* -------------------------------------------------------------------------- */
export const urlUtils = {
  buildSearchParams: (params: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return
      if (Array.isArray(value)) value.forEach((v) => searchParams.append(key, String(v)))
      else searchParams.set(key, String(value))
    })
    return searchParams.toString()
  },

  getBaseUrl: () =>
    (typeof window !== "undefined" && window.location.origin) ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
}
