'use client'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showIcon?: boolean
  children?: React.ReactNode
  className?: string
}

export function LogoutButton({ 
  variant = 'outline', 
  size = 'default', 
  showIcon = true, 
  children,
  className = ''
}: LogoutButtonProps) {
  const { signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        showIcon && <LogOut className="w-4 h-4 mr-2" />
      )}
      {children || (isLoading ? 'Signing out...' : 'Sign Out')}
    </Button>
  )
}