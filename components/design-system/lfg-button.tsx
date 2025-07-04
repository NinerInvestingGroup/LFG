import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Heart, Share2, Trash2 } from "lucide-react"

export function LFGButton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Button Variants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Primary Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Primary Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary-600 text-white min-h-[44px]">
              <Plane className="w-4 h-4 mr-2" />
              Let's F***ing Go!
            </Button>
            <Button className="bg-primary hover:bg-primary-600 text-white min-h-[44px]" size="sm">
              Join Trip
            </Button>
            <Button className="bg-primary hover:bg-primary-600 text-white min-h-[44px]" size="lg">
              Create Adventure
            </Button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Secondary Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white min-h-[44px] bg-transparent"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save Trip
            </Button>
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white min-h-[44px] bg-transparent"
              size="sm"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white min-h-[44px] bg-transparent"
              size="lg"
            >
              Explore More
            </Button>
          </div>
        </div>

        {/* Tertiary Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tertiary Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="ghost"
              className="text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 min-h-[44px]"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              className="text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 min-h-[44px]"
              size="sm"
            >
              Cancel
            </Button>
            <Button variant="link" className="text-primary hover:text-primary-600 min-h-[44px]">
              Learn More
            </Button>
          </div>
        </div>

        {/* Danger Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Danger Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="destructive" className="min-h-[44px]">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Trip
            </Button>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-white min-h-[44px] bg-transparent"
            >
              Remove Member
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Button States</h3>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary-600 text-white min-h-[44px]">Normal</Button>
            <Button className="bg-primary hover:bg-primary-600 text-white min-h-[44px]" disabled>
              Disabled
            </Button>
            <Button className="bg-primary hover:bg-primary-600 text-white min-h-[44px]">Loading...</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
