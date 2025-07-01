import * as React from 'react'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  mode: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  initialFocus?: boolean
  className?: string
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date()
  )

  const today = new Date()
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (disabled && disabled(date)) return
    onSelect?.(date)
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    )
  }

  const isToday = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return disabled ? disabled(date) : false
  }

  return (
    <div className={cn('p-3', className)} {...props}>
      <div className="space-y-4">
        <div className="flex justify-center pt-1 relative items-center">
          <Button
            variant="outline"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <Button
            variant="outline"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-full border-collapse space-y-1">
          <div className="flex">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] h-9 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {Array.from({ length: Math.ceil((daysInMonth + firstDayOfMonth) / 7) }, (_, weekIndex) => (
            <div key={weekIndex} className="flex w-full mt-2">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const day = weekIndex * 7 + dayIndex - firstDayOfMonth + 1
                const isValidDay = day > 0 && day <= daysInMonth

                return (
                  <div
                    key={dayIndex}
                    className="h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20"
                  >
                    {isValidDay && (
                      <Button
                        variant="ghost"
                        className={cn(
                          'h-9 w-9 p-0 font-normal',
                          isSelected(day) &&
                            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                          isToday(day) && !isSelected(day) && 'bg-accent text-accent-foreground',
                          isDisabled(day) && 'text-muted-foreground opacity-50 cursor-not-allowed'
                        )}
                        onClick={() => handleDateClick(day)}
                        disabled={isDisabled(day)}
                      >
                        {day}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
