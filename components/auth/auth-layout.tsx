import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Plane } from "lucide-react"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-secondary rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-secondary rounded-full"></div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Travel background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 items-center justify-center">
          <div className="max-w-md text-white space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">LFG</h1>
                <p className="text-white/80">Let's F***ing Go!</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">Your epic adventures start here</h2>
              <p className="text-xl text-white/90">
                Join thousands of travelers who've discovered the joy of coordinated group adventures
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">100K+</div>
                <div className="text-sm text-white/70">Travelers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/70">Trips</div>
              </div>
              <div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-white/70">Countries</div>
              </div>
            </div>

            {/* Floating testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm italic mb-2">
                "LFG transformed how we plan group trips. No more endless group chats!"
              </p>
              <div className="text-xs text-white/70">- Sarah, Adventure Enthusiast</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">LFG</span>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
                  {subtitle && <p className="text-neutral-600">{subtitle}</p>}
                </div>

                {children}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
