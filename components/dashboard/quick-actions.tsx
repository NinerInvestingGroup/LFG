"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Hash, UserCheck, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()
  
  const handleAction = (actionId: string) => {
    switch (actionId) {
      case "create-trip":
        router.push("/dashboard/create-trip")
        break
      default:
        console.log(`Action: ${actionId}`)
    }
  }
  
  const actions = [
    {
      id: "create-trip",
      title: "Create Epic Trip",
      description: "Start planning your next adventure",
      icon: PlusCircle,
      variant: "primary" as const,
      size: "large" as const,
    },
    {
      id: "join-trip",
      title: "Join Trip by Code",
      description: "Enter invitation code",
      icon: Hash,
      variant: "secondary" as const,
      size: "medium" as const,
    },
    {
      id: "find-advisor",
      title: "Find Travel Advisor",
      description: "Get expert guidance",
      icon: UserCheck,
      variant: "tertiary" as const,
      size: "medium" as const,
    },
    {
      id: "connect-travelers",
      title: "Connect with Travelers",
      description: "Discover travel buddies",
      icon: Users,
      variant: "social" as const,
      size: "medium" as const,
    },
  ]

  const getButtonStyles = (variant: string, size: string) => {
    const baseStyles = "group transition-all duration-200 hover:shadow-lg"

    const variantStyles = {
      primary: "bg-primary hover:bg-primary-600 text-white",
      secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent",
      tertiary: "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 bg-transparent",
      social: "bg-secondary hover:bg-secondary-600 text-white",
    }

    const sizeStyles = {
      large: "h-20 text-lg font-semibold",
      medium: "h-16 text-base font-medium",
    }

    return `${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]}`
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-neutral-50">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Quick Actions</h2>
          <p className="text-neutral-600">Jump into your next adventure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                className={`${getButtonStyles(action.variant, action.size)} flex flex-col items-center justify-center space-y-2 p-4`}
                onClick={() => handleAction(action.id)}
              >
                <Icon
                  className={`${action.size === "large" ? "w-8 h-8" : "w-6 h-6"} group-hover:scale-110 transition-transform`}
                />
                <div className="text-center">
                  <div className="font-semibold">{action.title}</div>
                  <div className={`text-xs opacity-80 ${action.size === "large" ? "mt-1" : ""}`}>
                    {action.description}
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
