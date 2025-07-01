/**
 * API Route: Destination Search
 * Securely handles Google Places API requests server-side
 */

import { NextRequest, NextResponse } from 'next/server'
import { googlePlacesService } from '@/services/googlePlacesService'

// Rate limiting per IP (simple in-memory store for demo)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_REQUESTS = 50 // requests per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = ipRequestCounts.get(ip)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    ipRequestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS - 1 }
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_REQUESTS - record.count }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    const { allowed, remaining } = getRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { query, limit = 10 } = body

    // Validate input
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      )
    }

    if (query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters long' },
        { status: 400 }
      )
    }

    if (typeof limit !== 'number' || limit < 1 || limit > 20) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 20' },
        { status: 400 }
      )
    }

    // Clean query
    const cleanQuery = query.trim().substring(0, 100) // Limit length

    // Search destinations
    const result = await googlePlacesService.searchDestinations(cleanQuery, limit)

    // Add usage stats for debugging (remove in production)
    const usageStats = googlePlacesService.getUsageStats()

    return NextResponse.json({
      ...result,
      meta: {
        query: cleanQuery,
        ip: ip.substring(0, 8) + '...', // Partial IP for privacy
        remaining,
        usageStats: {
          apiConfigured: usageStats.apiConfigured,
          requestsToday: usageStats.requestsToday,
          dailyLimit: usageStats.dailyLimit
        }
      }
    })

  } catch (error) {
    console.error('Destination search API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to search destinations' 
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}