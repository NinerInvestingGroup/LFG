"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CloudRain, TrendingDown, AlertTriangle, Plane, DollarSign, Thermometer, Eye, Bell } from "lucide-react"

interface IntelligenceItem {
  id: string
  type: "weather" | "price" | "advisory" | "flight" | "currency"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  action?: string
  timestamp: string
  metadata?: {
    temperature?: string
    change?: string
    location?: string
    flight?: string
  }
}

export function TravelIntelligence() {
  const [alerts] = useState<IntelligenceItem[]>([
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
  ])

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
        return "border-l-destructive bg-destructive-50"
      case "medium":
        return "border-l-warning bg-warning-50"
      case "low":
        return "border-l-primary bg-primary-50"
      default:
        return "border-l-neutral-300 bg-neutral-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-white"
      case "medium":
        return "bg-warning text-white"
      case "low":
        return "bg-primary text-white"
      default:
        return "bg-neutral-500 text-white"
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">Travel Intelligence</CardTitle>
              <p className="text-neutral-600 mt-1">Real-time updates for your trips</p>
            </div>
          </div>
          <Badge className="bg-success text-white">
            {alerts.filter((a) => a.priority === "high").length} Active Alerts
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            className={`border-l-4 ${getPriorityColor(alert.priority)} transition-all duration-200 hover:shadow-md`}
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
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
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
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">Next Trip Weather</h4>
                <p className="text-sm text-blue-700">Bali, Indonesia</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-900">28°C</div>
                <div className="flex items-center text-sm text-blue-700">
                  <CloudRain className="w-4 h-4 mr-1" />
                  Light Rain
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-blue-600">{day}</div>
                  <div className="text-sm font-medium text-blue-900">{28 + index}°</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-primary">$1,247</div>
            <div className="text-xs text-neutral-600">Avg. Trip Cost</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-success">23%</div>
            <div className="text-xs text-neutral-600">Savings This Year</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-warning">4.2</div>
            <div className="text-xs text-neutral-600">Avg. Trip Rating</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-secondary">12</div>
            <div className="text-xs text-neutral-600">Countries Visited</div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
