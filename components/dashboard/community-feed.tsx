"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MapPin, Trophy, Camera, TrendingUp, ArrowRight } from "lucide-react"
import Image from "next/image"

interface FeedItem {
  id: string
  type: "trip_update" | "achievement" | "recommendation" | "trending"
  user: {
    name: string
    avatar: string
    isVerified?: boolean
  }
  content: {
    title: string
    description: string
    image?: string
    location?: string
    timestamp: string
  }
  engagement: {
    likes: number
    comments: number
    shares: number
    isLiked: boolean
  }
  badge?: {
    text: string
    color: string
  }
}

export function CommunityFeed() {
  const [feedItems] = useState<FeedItem[]>([
    {
      id: "1",
      type: "trip_update",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      content: {
        title: "Just landed in Bali! 🌴",
        description:
          "The sunset from our villa is absolutely breathtaking. Can't wait to explore the temples tomorrow!",
        image: "/placeholder.svg?height=300&width=400",
        location: "Ubud, Bali",
        timestamp: "2 hours ago",
      },
      engagement: {
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
      },
    },
    {
      id: "2",
      type: "achievement",
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: {
        title: "Completed 10th Group Trip! 🎉",
        description: "Just finished an amazing adventure in Patagonia with 8 fellow travelers. Next stop: Iceland!",
        image: "/placeholder.svg?height=300&width=400",
        timestamp: "5 hours ago",
      },
      engagement: {
        likes: 45,
        comments: 12,
        shares: 7,
        isLiked: true,
      },
      badge: {
        text: "Adventure Master",
        color: "bg-warning text-white",
      },
    },
    {
      id: "3",
      type: "recommendation",
      user: {
        name: "Travel Advisor Emma",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      content: {
        title: "Hidden Gems in Portugal",
        description:
          "Skip the crowds in Lisbon and discover these 5 incredible coastal towns that locals love but tourists miss.",
        image: "/placeholder.svg?height=300&width=400",
        location: "Portugal",
        timestamp: "1 day ago",
      },
      engagement: {
        likes: 89,
        comments: 23,
        shares: 15,
        isLiked: false,
      },
      badge: {
        text: "Expert Tip",
        color: "bg-primary text-white",
      },
    },
    {
      id: "4",
      type: "trending",
      user: {
        name: "LFG Community",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: {
        title: "Japan Cherry Blossom Season 🌸",
        description: "Peak bloom predicted for March 25-April 5. Book your hanami trip now before spots fill up!",
        image: "/placeholder.svg?height=300&width=400",
        location: "Japan",
        timestamp: "3 hours ago",
      },
      engagement: {
        likes: 156,
        comments: 34,
        shares: 28,
        isLiked: true,
      },
      badge: {
        text: "Trending",
        color: "bg-secondary text-white",
      },
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-4 h-4" />
      case "recommendation":
        return <Camera className="w-4 h-4" />
      case "trending":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const handleEngagement = (itemId: string, action: string) => {
    console.log(`${action} on item ${itemId}`)
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-neutral-900">Community Feed</CardTitle>
            <p className="text-neutral-600 mt-1">Latest from your travel network</p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary-600">
            See More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {feedItems.map((item) => (
          <Card key={item.id} className="border border-neutral-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 space-y-4">
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                    <AvatarFallback>
                      {item.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-neutral-900">{item.user.name}</span>
                      {item.user.isVerified && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-500">
                      {getTypeIcon(item.type)}
                      <span>{item.content.timestamp}</span>
                      {item.content.location && (
                        <>
                          <span>•</span>
                          <span>{item.content.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {item.badge && <Badge className={item.badge.color}>{item.badge.text}</Badge>}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{item.content.title}</h3>
                  <p className="text-neutral-700">{item.content.description}</p>
                </div>

                {item.content.image && (
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={item.content.image || "/placeholder.svg"}
                      alt={item.content.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-2 ${
                      item.engagement.isLiked ? "text-destructive" : "text-neutral-600"
                    }`}
                    onClick={() => handleEngagement(item.id, "like")}
                  >
                    <Heart className={`w-4 h-4 ${item.engagement.isLiked ? "fill-current" : ""}`} />
                    <span>{item.engagement.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-neutral-600"
                    onClick={() => handleEngagement(item.id, "comment")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{item.engagement.comments}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-neutral-600"
                    onClick={() => handleEngagement(item.id, "share")}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{item.engagement.shares}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Load More */}
        <div className="text-center pt-4">
          <Button variant="outline" className="border-2 bg-transparent">
            Load More Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
