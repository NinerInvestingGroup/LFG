"use client"

import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { Search, Eye, EyeOff, Mail, User, MapPin } from "lucide-react"
import { useState } from "react"

export function LFGInputs() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Text Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Text Inputs</h3>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input id="name" placeholder="Enter your full name" className="pl-10 min-h-[44px]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Dream Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input id="destination" placeholder="Where do you want to go?" className="pl-10 min-h-[44px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Email Input</h3>
          <div className="max-w-md space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input id="email" type="email" placeholder="your@email.com" className="pl-10 min-h-[44px]" />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Password Input</h3>
          <div className="max-w-md space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10 min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Input</h3>
          <div className="max-w-md space-y-2">
            <Label htmlFor="search">Search Trips</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="Search destinations, trips, or friends..."
                className="pl-10 min-h-[44px]"
              />
            </div>
          </div>
        </div>

        {/* Input States */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Input States</h3>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label>Normal State</Label>
              <Input placeholder="Normal input" className="min-h-[44px]" />
            </div>

            <div className="space-y-2">
              <Label>Focused State</Label>
              <Input placeholder="Click to focus" className="min-h-[44px] ring-2 ring-primary ring-opacity-50" />
            </div>

            <div className="space-y-2">
              <Label>Error State</Label>
              <Input placeholder="Invalid input" className="min-h-[44px] border-danger focus:ring-danger" />
              <p className="text-sm text-danger">This field is required</p>
            </div>

            <div className="space-y-2">
              <Label>Success State</Label>
              <Input placeholder="Valid input" className="min-h-[44px] border-accent focus:ring-accent" />
              <p className="text-sm text-accent">Looks good!</p>
            </div>

            <div className="space-y-2">
              <Label>Disabled State</Label>
              <Input placeholder="Disabled input" disabled className="min-h-[44px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
