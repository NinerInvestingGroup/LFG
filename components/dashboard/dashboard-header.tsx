"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Search,
  Shield,
  Home,
  Plane,
  Compass,
  MessageSquare,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name: string
    firstName: string
    avatar: string
    isOnline: boolean
  }
  notifications: number
}

export function DashboardHeader({ user, notifications }: DashboardHeaderProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "trips", label: "Trips", icon: Plane },
    { id: "discover", label: "Discover", icon: Compass },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Greeting */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900 hidden sm:block">LFG</span>
            </div>

            {/* Personalized Greeting - Hidden on mobile */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-neutral-900">
                Ready for your next adventure, {user.firstName}?
              </h1>
            </div>
          </div>

          {/* Center Section - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    activeTab === item.id
                      ? "bg-primary text-white"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search destinations, trips, friends..."
                className="pl-10 w-64 bg-neutral-50 border-neutral-200 focus:bg-white"
              />
            </div>

            {/* Emergency Assistance */}
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-500 hover:text-destructive hover:bg-destructive-50"
              title="Emergency Assistance"
            >
              <Shield className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-neutral-600" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-destructive text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0">
                    {notifications > 99 ? "99+" : notifications}
                  </Badge>
                )}
              </Button>
            </div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online Status Indicator */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      user.isOnline ? "bg-success" : "bg-neutral-400"
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-neutral-500">
                      {user.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              placeholder="Search destinations, trips, friends..."
              className="pl-10 bg-neutral-50 border-neutral-200 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-neutral-200 bg-white">
        <nav className="flex justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                  activeTab === item.id ? "text-primary" : "text-neutral-600"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
