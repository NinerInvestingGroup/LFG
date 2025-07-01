import * as React from 'react'
import { cn } from '@/shared/utils/cn'

interface SliderProps {
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  min: number
  max: number
  step: number
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, min, max, step, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState<'min' | 'max' | null>(null)

    const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(type)
    }

    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return

        const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect()
        if (!rect) return

        const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const newValue = Math.round((min + percentage * (max - min)) / step) * step

        if (isDragging === 'min') {
          onValueChange([Math.min(newValue, value[1]), value[1]])
        } else {
          onValueChange([value[0], Math.max(newValue, value[0])])
        }
      },
      [isDragging, min, max, step, value, onValueChange]
    )

    const handleMouseUp = React.useCallback(() => {
      setIsDragging(null)
    }, [])

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }
      }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const minPosition = ((value[0] - min) / (max - min)) * 100
    const maxPosition = ((value[1] - min) / (max - min)) * 100

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        <div className="relative h-2 w-full">
          <div className="absolute top-0 h-2 w-full rounded-full bg-neutral-200" />
          <div
            className="absolute top-0 h-2 rounded-full bg-primary"
            style={{
              left: `${minPosition}%`,
              right: `${100 - maxPosition}%`,
            }}
          />
          <div
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-primary bg-white cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${minPosition}%` }}
            onMouseDown={handleMouseDown('min')}
          />
          <div
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-primary bg-white cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${maxPosition}%` }}
            onMouseDown={handleMouseDown('max')}
          />
        </div>
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }