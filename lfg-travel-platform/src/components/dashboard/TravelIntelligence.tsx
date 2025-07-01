"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { CloudRain, TrendingDown, AlertTriangle, Plane, DollarSign, Thermometer, Eye, Bell } from "lucide-react"
import { useRouter } from 'next/navigation'

interface IntelligenceMetadata {
  temperature?: string
  change?: string
  location?: string
  flight?: string
}

interface IntelligenceItem {
  id: string
  type: "weather" | "price" | "advisory" | "flight" | "currency"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  action?: string
  timestamp: string
  metadata?: IntelligenceMetadata
}

interface TravelIntelligenceProps {
  className?: string
}

export function TravelIntelligence({ className }: TravelIntelligenceProps) {
  const [alerts, setAlerts] = useState<IntelligenceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weatherData] = useState({
    location: "Bali, Indonesia",
    temperature: 28,
    condition: "Light Rain",
    forecast: [28, 29, 30, 31, 32]
  })
  const [stats] = useState({
    avgCost: 1247,
    savings: 23,
    rating: 4.2,
    countries: 12
  })

  const router = useRouter()

  // Mock data for development - replace with real intelligence feeds
  const mockAlerts = useMemo((): IntelligenceItem[] => [
    {
      id: "1",
      type: "weather",
      priority: "high",
      title: "Storm Warning - Bali Trip",
      description: "Heavy rainfall expected during your Bali trip (Mar 15-18). Consider indoor activities.",
      action: "View Alternatives",
      timestamp: "2 hours ago",
      metadata: {
        temperature: "26°C",
        location: "Ubud, Bali",
      },
    },
    {
      id: "2",
      type: "price",
      priority: "medium",
      title: "Price Drop Alert",
      description: "Flights to Tokyo dropped by 15% for your saved dates in April.",
      action: "Book Now",
      timestamp: "4 hours ago",
      metadata: {
        change: "-15%",
        location: "Tokyo, Japan",
      },
    },
    {
      id: "3",
      type: "advisory",
      priority: "medium",
      title: "Travel Advisory Update",
      description: "New entry requirements for Thailand - COVID test no longer required.",
      action: "Read Details",
      timestamp: "1 day ago",
      metadata: {
        location: "Thailand",
      },
    },
    {
      id: "4",
      type: "flight",
      priority: "low",
      title: "Flight Status Update",
      description: "Your flight LH441 to Frankfurt is on time. Check-in opens in 18 hours.",
      timestamp: "6 hours ago",
      metadata: {
        flight: "LH441",
        location: "Frankfurt",
      },
    },
    {
      id: "5",
      type: "currency",
      priority: "low",
      title: "Currency Alert",
      description: "EUR/USD rate improved by 2.3% - good time to exchange for your Europe trip.",
      action: "Exchange Now",
      timestamp: "12 hours ago",
      metadata: {
        change: "+2.3%",
      },
    },
  ], [])

  useEffect(() => {
    const fetchIntelligenceData = async () => {
      try {
        setIsLoading(true)
        
        // TODO: Replace with actual intelligence APIs
        // const { data: { user } } = await supabase.auth.getUser()
        // if (!user) return

        // Fetch travel alerts
        // const { data: alertsData, error: alertsError } = await supabase
        //   .from('travel_intelligence_alerts')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false })
        //   .limit(10)

        // Fetch weather data for upcoming trips
        // const { data: weatherData, error: weatherError } = await supabase
        //   .functions.invoke('get-weather-intelligence', {
        //     body: { user_id: user.id }
        //   })

        // Fetch user travel statistics
        // const { data: statsData, error: statsError } = await supabase
        //   .from('user_travel_stats')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .single()

        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
        setAlerts(mockAlerts)
        
      } catch (err) {
        setError('Failed to load travel intelligence')
        console.error('Error fetching travel intelligence:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIntelligenceData()
  }, [mockAlerts])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <CloudRain className="w-4 h-4" />
      case "price":
        return <TrendingDown className="w-4 h-4" />
      case "advisory":
        return <AlertTriangle className="w-4 h-4" />
      case "flight":
        return <Plane className="w-4 h-4" />
      case "currency":
        return <DollarSign className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-danger bg-danger-50"
      case "medium":
        return "border-l-secondary bg-secondary-50"
      case "low":
        return "border-l-primary bg-primary-50"
      default:
        return "border-l-neutral-300 bg-neutral-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-danger text-white"
      case "medium":
        return "bg-secondary text-white"
      case "low":
        return "bg-primary text-white"
      default:
        return "bg-neutral-500 text-white"
    }
  }

  const handleAlertAction = (alert: IntelligenceItem) => {
    // Track alert interaction
    console.log(`Alert action clicked: ${alert.type} - ${alert.id}`)
    
    // Navigate based on alert type
    switch (alert.type) {
      case "weather":
        router.push(`/weather/${alert.metadata?.location || 'current'}`)
        break
      case "price":
        router.push('/flights/search')
        break
      case "advisory":
        router.push('/travel-advisories')
        break
      case "flight":
        router.push('/flights/manage')
        break
      case "currency":
        router.push('/currency-exchange')
        break
      default:
        break
    }

    // TODO: Track interaction for intelligence improvement
    // await supabase
    //   .from('intelligence_interactions')
    //   .insert({
    //     user_id: user.id,
    //     alert_id: alert.id,
    //     alert_type: alert.type,
    //     action: 'click',
    //     timestamp: new Date().toISOString()
    //   })
  }

  if (isLoading) {
    return (
      <Card className={`shadow-lg border-0 ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">Travel Intelligence</CardTitle>
              <p className="text-neutral-600 mt-1">Real-time updates for your trips</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-neutral-200 rounded animate-pulse" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`shadow-lg border-0 ${className}`}>
        <CardContent className="text-center py-8">
          <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-danger-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Intelligence Unavailable</h3>
          <p className="text-neutral-600 mb-4 text-sm">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" size="sm">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const highPriorityCount = alerts.filter((a) => a.priority === "high").length

  return (
    <Card className={`shadow-lg border-0 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">Travel Intelligence</CardTitle>
              <p className="text-neutral-600 mt-1">Real-time updates for your trips</p>
            </div>
          </div>
          <Badge className={`${highPriorityCount > 0 ? 'bg-danger text-white' : 'bg-accent text-white'}`}>
            {highPriorityCount} Active Alerts
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            className={`border-l-4 ${getPriorityColor(alert.priority)} transition-all duration-200 hover:shadow-md cursor-pointer`}
            onClick={() => handleAlertAction(alert)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-1">{getTypeIcon(alert.type)}</div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-neutral-900">{alert.title}</h4>
                    <Badge className={`text-xs ${getPriorityBadge(alert.priority)}`}>
                      {alert.priority.toUpperCase()}
                    </Badge>
                  </div>

                  <AlertDescription className="text-neutral-700">{alert.description}</AlertDescription>

                  {/* Metadata */}
                  {alert.metadata && (
                    <div className="flex items-center space-x-4 text-sm text-neutral-600">
                      {alert.metadata.location && (
                        <span className="flex items-center space-x-1">
                          <span>📍</span>
                          <span>{alert.metadata.location}</span>
                        </span>
                      )}
                      {alert.metadata.temperature && (
                        <span className="flex items-center space-x-1">
                          <Thermometer className="w-3 h-3" />
                          <span>{alert.metadata.temperature}</span>
                        </span>
                      )}
                      {alert.metadata.change && (
                        <span className="flex items-center space-x-1">
                          <TrendingDown className="w-3 h-3" />
                          <span>{alert.metadata.change}</span>
                        </span>
                      )}
                      {alert.metadata.flight && (
                        <span className="flex items-center space-x-1">
                          <Plane className="w-3 h-3" />
                          <span>{alert.metadata.flight}</span>
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">{alert.timestamp}</span>
                    {alert.action && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAlertAction(alert)
                        }}
                      >
                        {alert.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Alert>
        ))}

        {/* Weather Widget */}
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-primary-900">Next Trip Weather</h4>
                <p className="text-sm text-primary-700">{weatherData.location}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-900">{weatherData.temperature}°C</div>
                <div className="flex items-center text-sm text-primary-700">
                  <CloudRain className="w-4 h-4 mr-1" />
                  {weatherData.condition}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-primary-600">{day}</div>
                  <div className="text-sm font-medium text-primary-900">{weatherData.forecast[index]}°</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-primary">${stats.avgCost.toLocaleString()}</div>
            <div className="text-xs text-neutral-600">Avg. Trip Cost</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-accent">{stats.savings}%</div>
            <div className="text-xs text-neutral-600">Savings This Year</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-secondary">{stats.rating}</div>
            <div className="text-xs text-neutral-600">Avg. Trip Rating</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-primary">{stats.countries}</div>
            <div className="text-xs text-neutral-600">Countries Visited</div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
