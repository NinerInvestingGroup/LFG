"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Clock, DollarSign, Users, MapPin, Calendar } from "lucide-react"

export function CommunityShowcaseSection() {
  const trendingTrips = [
    {
      id: "bali-adventure",
      title: "Bali Squad Adventure",
      location: "Bali, Indonesia",
      image: "/images/hero-adventure-2.jpg",
      participants: 8,
      budget: "$1,200",
      duration: "10 days",
      savings: "$400",
      vibe: "🏄‍♀️ Surf & Chill",
      status: "Planning",
      progress: 75,
    },
    {
      id: "tokyo-foodie",
      title: "Tokyo Foodie Tour",
      location: "Tokyo, Japan",
      image: "/images/hero-adventure-1.jpg",
      participants: 6,
      budget: "$1,800",
      duration: "7 days",
      savings: "$600",
      vibe: "🍜 Food Paradise",
      status: "Booking",
      progress: 90,
    },
    {
      id: "iceland-northern",
      title: "Iceland Northern Lights",
      location: "Reykjavik, Iceland",
      image: "/images/hero-adventure-3.jpg",
      participants: 5,
      budget: "$2,200",
      duration: "8 days",
      savings: "$800",
      vibe: "🌌 Aurora Magic",
      status: "Confirmed",
      progress: 100,
    },
  ]

  const communityStats = [
    { icon: TrendingUp, label: "Trending Now", value: "127 trips", color: "text-green-500" },
    { icon: Clock, label: "Planning", value: "89 trips", color: "text-yellow-500" },
    { icon: Users, label: "Active Squads", value: "2.3K", color: "text-blue-500" },
    { icon: DollarSign, label: "Saved Today", value: "$12K", color: "text-purple-500" },
  ]

  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-primary to-secondary text-white mb-6 px-6 py-2 text-lg font-bold">
            <TrendingUp className="w-5 h-5 mr-2" />
            Live Community
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            See What's
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 ml-4">
              Trending
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto font-medium">
            Real trips being planned right now by travelers like you
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-neutral-800 border-neutral-700">
                <CardContent className="p-6 text-center">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-neutral-400 text-sm font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trending Trips Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-800 mb-8">
            <TabsTrigger value="trending" className="data-[state=active]:bg-primary">
              🔥 Trending
            </TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-primary">
              ⚡ Planning
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-primary">
              ✅ Confirmed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingTrips.map((trip, index) => (
                <Card
                  key={trip.id}
                  className="bg-neutral-800 border-neutral-700 overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Status Badge */}
                    <Badge
                      className={`absolute top-3 right-3 ${
                        trip.status === "Confirmed"
                          ? "bg-green-500"
                          : trip.status === "Booking"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {trip.status}
                    </Badge>

                    {/* Vibe Badge */}
                    <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm">{trip.vibe}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{trip.title}</h3>

                    <div className="flex items-center gap-2 text-neutral-300 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{trip.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-neutral-300">{trip.participants} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-neutral-300">{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-neutral-300">{trip.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-green-400">Saved {trip.savings}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-neutral-400 mb-2">
                        <span>Progress</span>
                        <span>{trip.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${trip.progress}%` }}
                        />
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                      Join This Adventure
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planning">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-2">Planning Mode Activated</h3>
              <p className="text-neutral-400">89 squads are actively planning their next adventure</p>
            </div>
          </TabsContent>

          <TabsContent value="confirmed">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Dreams Becoming Reality</h3>
              <p className="text-neutral-400">34 trips confirmed and ready to go this month</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-black mb-4">Ready to Start Your Own Adventure?</h3>
            <p className="text-xl mb-6 opacity-90">Join thousands creating epic memories together</p>
            <button className="bg-white text-primary hover:bg-neutral-100 font-black px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105">
              Create Your Trip Now 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
