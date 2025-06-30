"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, MapPin, Calendar, Star, ArrowRight, Brain } from "lucide-react"
import Image from "next/image"

interface Recommendation {
  id: string
  type: "trip" | "buddy" | "destination" | "event" | "service"
  title: string
  description: string
  reason: string
  image: string
  metadata: {
    location?: string
    price?: string
    rating?: number
    compatibility?: number
    dates?: string
  }
  cta: string
}

export function Recommendations() {
  const [recommendations] = useState<Recommendation[]>([
    {
      id: "1",
      type: "trip",
      title: "Northern Lights Adventure",
      description: "7-day Iceland expedition with photography workshops and glacier hiking",
      reason: "Based on your love for adventure photography and winter destinations",
      image: "/placeholder.svg?height=200&width=300",
      metadata: {
        location: "Iceland",
        price: "$2,400",
        rating: 4.9,
        dates: "Feb 15-22, 2024",
      },
      cta: "View Trip Details",
    },
    {
      id: "2",
      type: "buddy",
      title: "Alex Rodriguez",
      description: "Adventure photographer from Barcelona, loves hiking and cultural experiences",
      reason: "95% compatibility based on travel style and interests",
      image: "/placeholder.svg?height=200&width=300",
      metadata: {
        compatibility: 95,
        location: "Barcelona, Spain",
      },
      cta: "Connect",
    },
    {
      id: "3",
      type: "destination",
      title: "Faroe Islands",
      description: "Dramatic landscapes, Nordic culture, and incredible hiking trails",
      reason: "Perfect for your next off-the-beaten-path adventure",
      image: "/placeholder.svg?height=200&width=300",
      metadata: {
        location: "Faroe Islands",
        rating: 4.8,
      },
      cta: "Explore Destination",
    },
    {
      id: "4",
      type: "event",
      title: "Holi Festival Experience",
      description: "Join the colorful celebration in Mathura with local families",
      reason: "Matches your interest in cultural festivals and authentic experiences",
      image: "/placeholder.svg?height=200&width=300",
      metadata: {
        location: "Mathura, India",
        dates: "Mar 8-12, 2024",
        price: "$890",
      },
      cta: "Book Experience",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "buddy":
        return <Users className="w-4 h-4" />
      case "destination":
        return <MapPin className="w-4 h-4" />
      case "event":
        return <Calendar className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trip":
        return "bg-primary-100 text-primary-700"
      case "buddy":
        return "bg-secondary-100 text-secondary-700"
      case "destination":
        return "bg-success-100 text-success-700"
      case "event":
        return "bg-warning-100 text-warning-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">AI Recommendations</CardTitle>
              <p className="text-neutral-600 mt-1">Personalized suggestions just for you</p>
            </div>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary-600">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <Card
              key={rec.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary-200 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={rec.image || "/placeholder.svg"}
                  alt={rec.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <Badge className={`absolute top-3 left-3 ${getTypeColor(rec.type)}`}>
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(rec.type)}
                    <span className="capitalize">{rec.type}</span>
                  </div>
                </Badge>

                {rec.metadata.rating && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="text-xs font-medium">{rec.metadata.rating}</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{rec.description}</p>
                </div>

                {/* AI Reason */}
                <div className="bg-primary-50 rounded-lg p-3 border border-primary-100">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-primary-700">{rec.reason}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  {rec.metadata.location && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {rec.metadata.location}
                    </div>
                  )}

                  {rec.metadata.dates && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {rec.metadata.dates}
                    </div>
                  )}

                  {rec.metadata.compatibility && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <Users className="w-4 h-4 mr-1" />
                      {rec.metadata.compatibility}% compatibility
                    </div>
                  )}

                  {rec.metadata.price && <div className="text-lg font-bold text-primary">{rec.metadata.price}</div>}
                </div>

                <Button className="w-full bg-primary hover:bg-primary-600 text-white group-hover:shadow-lg transition-shadow">
                  {rec.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">Your Travel DNA</h4>
                <p className="text-sm text-neutral-600">
                  Based on your activity, you're an <strong>Adventure Cultural Explorer</strong> who loves authentic
                  experiences and stunning photography opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
