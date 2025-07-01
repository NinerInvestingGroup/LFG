"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Sparkles, Users, MapPin, Calendar, Star, ArrowRight, Brain } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation'

interface RecommendationMetadata {
  location?: string
  price?: string
  rating?: number
  compatibility?: number
  dates?: string
}

interface Recommendation {
  id: string
  type: "trip" | "buddy" | "destination" | "event" | "service"
  title: string
  description: string
  reason: string
  image: string
  metadata: RecommendationMetadata
  cta: string
  href?: string
}

interface RecommendationsProps {
  className?: string
}

export function Recommendations({ className }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<string>("Adventure Cultural Explorer")

  const router = useRouter()

  // Mock data for development - replace with real AI recommendations
  const mockRecommendations = useMemo((): Recommendation[] => [
    {
      id: "1",
      type: "trip",
      title: "Northern Lights Adventure",
      description: "7-day Iceland expedition with photography workshops and glacier hiking",
      reason: "Based on your love for adventure photography and winter destinations",
      image: "/images/trips/northern-lights.jpg",
      metadata: {
        location: "Iceland",
        price: "$2,400",
        rating: 4.9,
        dates: "Feb 15-22, 2024",
      },
      cta: "View Trip Details",
      href: "/trips/northern-lights-adventure",
    },
    {
      id: "2",
      type: "buddy",
      title: "Alex Rodriguez",
      description: "Adventure photographer from Barcelona, loves hiking and cultural experiences",
      reason: "95% compatibility based on travel style and interests",
      image: "/images/avatars/alex-rodriguez.jpg",
      metadata: {
        compatibility: 95,
        location: "Barcelona, Spain",
      },
      cta: "Connect",
      href: "/travelers/alex-rodriguez",
    },
    {
      id: "3",
      type: "destination",
      title: "Faroe Islands",
      description: "Dramatic landscapes, Nordic culture, and incredible hiking trails",
      reason: "Perfect for your next off-the-beaten-path adventure",
      image: "/images/destinations/faroe-islands.jpg",
      metadata: {
        location: "Faroe Islands",
        rating: 4.8,
      },
      cta: "Explore Destination",
      href: "/destinations/faroe-islands",
    },
    {
      id: "4",
      type: "event",
      title: "Holi Festival Experience",
      description: "Join the colorful celebration in Mathura with local families",
      reason: "Matches your interest in cultural festivals and authentic experiences",
      image: "/images/events/holi-festival.jpg",
      metadata: {
        location: "Mathura, India",
        dates: "Mar 8-12, 2024",
        price: "$890",
      },
      cta: "Book Experience",
      href: "/events/holi-festival-mathura",
    },
  ], [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true)
        
        // TODO: Replace with actual AI recommendation API
        // const { data: { user } } = await supabase.auth.getUser()
        // if (!user) return

        // const { data: recommendationsData, error: recError } = await supabase
        //   .functions.invoke('generate-recommendations', {
        //     body: { 
        //       user_id: user.id,
        //       recommendation_types: ['trip', 'buddy', 'destination', 'event'],
        //       limit: 4 
        //     }
        //   })

        // const { data: profileData, error: profileError } = await supabase
        //   .from('user_travel_profiles')
        //   .select('travel_personality, preferences')
        //   .eq('user_id', user.id)
        //   .single()

        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        setRecommendations(mockRecommendations)
        setUserProfile("Adventure Cultural Explorer")
        
      } catch (err) {
        setError('Failed to load recommendations')
        console.error('Error fetching recommendations:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [mockRecommendations])

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
        return "bg-accent-100 text-accent-700"
      case "event":
        return "bg-secondary-100 text-secondary-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  const handleRecommendationClick = (recommendation: Recommendation) => {
    if (recommendation.href) {
      router.push(recommendation.href)
    }
    
    // Track recommendation interaction for AI learning
    console.log(`Recommendation clicked: ${recommendation.type} - ${recommendation.id}`)
    
    // TODO: Track interaction for AI improvement
    // await supabase
    //   .from('recommendation_interactions')
    //   .insert({
    //     user_id: user.id,
    //     recommendation_id: recommendation.id,
    //     recommendation_type: recommendation.type,
    //     action: 'click',
    //     timestamp: new Date().toISOString()
    //   })
  }

  const handleViewAll = () => {
    router.push('/recommendations')
  }

  if (isLoading) {
    return (
      <Card className={`shadow-lg border-0 ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">AI Recommendations</CardTitle>
              <p className="text-neutral-600 mt-1">Personalized suggestions just for you</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-neutral-200 animate-pulse" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
                  <div className="h-8 bg-neutral-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`shadow-lg border-0 ${className}`}>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-danger-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Unable to load recommendations</h3>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`shadow-lg border-0 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900">AI Recommendations</CardTitle>
              <p className="text-neutral-600 mt-1">Personalized suggestions just for you</p>
            </div>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary-600" onClick={handleViewAll}>
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
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary-200 overflow-hidden cursor-pointer"
              onClick={() => handleRecommendationClick(rec)}
            >
              <div className="relative">
                <Image
                  src={rec.image}
                  alt={rec.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/travel-background.jpg'
                  }}
                />

                <Badge className={`absolute top-3 left-3 ${getTypeColor(rec.type)}`}>
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(rec.type)}
                    <span className="capitalize">{rec.type}</span>
                  </div>
                </Badge>

                {rec.metadata.rating && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
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

                  {rec.metadata.price && (
                    <div className="text-lg font-bold text-primary">{rec.metadata.price}</div>
                  )}
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary-600 text-white group-hover:shadow-lg transition-shadow"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRecommendationClick(rec)
                  }}
                >
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
                  Based on your activity, you&apos;re an <strong>{userProfile}</strong> who loves authentic
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