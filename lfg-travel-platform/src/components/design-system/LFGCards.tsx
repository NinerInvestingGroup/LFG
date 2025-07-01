import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { MapPin, Calendar, Users, Heart, Share2, MessageCircle } from "lucide-react"
import Image from "next/image"

export function LFGCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Trip Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Trip Card</h3>
          <Card className="max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="relative">
              <Image
                src="/images/destinations/bali.jpg"
                alt="Bali Adventure"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-3 left-3 bg-accent text-white">Active</Badge>
              <Button size="sm" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Bali Adventure 2024</h4>
                <div className="flex items-center text-sm text-neutral-600 gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Bali, Indonesia
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Mar 15-22
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-600" />
                  <span className="text-sm text-neutral-600">5/8 travelers</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary-600 text-white">Join Adventure</Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Profile Card</h3>
          <Card className="max-w-sm shadow-md">
            <CardContent className="p-6 text-center space-y-4">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src="/images/avatars/sarah-chen.jpg" alt="Sarah Chen" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Sarah Chen</h4>
                <p className="text-sm text-neutral-600">Adventure Enthusiast</p>
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary" className="bg-secondary-100 text-secondary-700">
                    Travel Buddy
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Verified
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold text-lg">12</div>
                  <div className="text-xs text-neutral-600">Trips</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">48</div>
                  <div className="text-xs text-neutral-600">Friends</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">156</div>
                  <div className="text-xs text-neutral-600">Photos</div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary-600 text-white">Connect</Button>
            </CardContent>
          </Card>
        </div>

        {/* Notification Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Card</h3>
          <Card className="max-w-md shadow-sm border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/images/avatars/mike-johnson.jpg" alt="Mike Johnson" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold">Mike Johnson</span> joined your Tokyo trip
                  </p>
                  <p className="text-xs text-neutral-600">2 minutes ago</p>
                </div>
                <Badge className="bg-primary-100 text-primary-700 text-xs">New</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compact Trip Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Compact Trip Card</h3>
          <Card className="max-w-md shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/destinations/tokyo.jpg"
                  alt="Tokyo Trip"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Tokyo Food Adventure</h4>
                    <Badge className="bg-secondary text-white">Planning</Badge>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600 gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Apr 1-7
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      3/6
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary-600 text-white">
                      Join
                    </Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}