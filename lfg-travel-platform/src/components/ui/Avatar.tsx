import { forwardRef, HTMLAttributes } from 'react'
import Image from 'next/image'
import { cn } from '@/shared/utils/cn'

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = 'Avatar'

interface AvatarImageProps {
  src?: string
  alt?: string
  className?: string
}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    if (!src) return null
    
    return (
      <Image
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        src={src}
        alt={alt || 'Avatar'}
        width={40}
        height={40}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = 'AvatarImage'

interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }