import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Home, Search, PlusCircle, MessageSquare, User, ChevronRight } from "lucide-react"
import Link from "next/link"

export function LFGNavigation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Tab Navigation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tab Navigation</h3>
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-primary text-primary py-2 px-1 text-sm font-medium">Discover</button>
              <button className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-800 py-2 px-1 text-sm font-medium">
                My Trips
              </button>
              <button className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-800 py-2 px-1 text-sm font-medium">
                Friends
              </button>
              <button className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-800 py-2 px-1 text-sm font-medium">
                Messages
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mobile Bottom Navigation</h3>
          <div className="max-w-sm mx-auto">
            <div className="bg-white border-t border-neutral-200 px-4 py-2">
              <nav className="flex justify-around">
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-primary">
                  <Home className="w-5 h-5" />
                  <span className="text-xs">Home</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-neutral-600">
                  <Search className="w-5 h-5" />
                  <span className="text-xs">Search</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-neutral-600">
                  <PlusCircle className="w-5 h-5" />
                  <span className="text-xs">Create</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-neutral-600">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs">Chat</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-neutral-600">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Profile</span>
                </Button>
              </nav>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Breadcrumbs</h3>
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="#" className="text-neutral-600 hover:text-neutral-800">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <Link href="#" className="text-neutral-600 hover:text-neutral-800">
              Trips
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <Link href="#" className="text-neutral-600 hover:text-neutral-800">
              Asia
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Bali Adventure</span>
          </nav>
        </div>

        {/* Pill Navigation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pill Navigation</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-primary hover:bg-primary-600 text-white rounded-full">
              All Destinations
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-neutral-300 text-neutral-600 hover:bg-neutral-100 bg-transparent"
            >
              Asia
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-neutral-300 text-neutral-600 hover:bg-neutral-100 bg-transparent"
            >
              Europe
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-neutral-300 text-neutral-600 hover:bg-neutral-100 bg-transparent"
            >
              Americas
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-neutral-300 text-neutral-600 hover:bg-neutral-100 bg-transparent"
            >
              Africa
            </Button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sidebar Navigation</h3>
          <div className="max-w-xs">
            <nav className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start bg-primary-100 text-primary hover:bg-primary-200"
              >
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-600 hover:bg-neutral-100">
                <Search className="w-4 h-4 mr-3" />
                Discover Trips
              </Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-600 hover:bg-neutral-100">
                <PlusCircle className="w-4 h-4 mr-3" />
                Create Trip
              </Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-600 hover:bg-neutral-100">
                <MessageSquare className="w-4 h-4 mr-3" />
                Messages
              </Button>
              <Button variant="ghost" className="w-full justify-start text-neutral-600 hover:bg-neutral-100">
                <User className="w-4 h-4 mr-3" />
                Profile
              </Button>
            </nav>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
