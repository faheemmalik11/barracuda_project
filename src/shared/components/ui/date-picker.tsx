import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover"
import { Calendar } from "@shared/components/ui/calendar"

// === TYPES ===
interface BaseDatePickerProps {
  placeholder?: string
  disabled?: (date: Date) => boolean
  className?: string
  clearable?: boolean
  showWeekNumbers?: boolean
  fromDate?: Date
  toDate?: Date
}

interface DatePickerProps extends BaseDatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
}

interface DateRangePickerProps extends BaseDatePickerProps {
  dateRange?: DateRange
  onSelect?: (dateRange: DateRange | undefined) => void
}

// === UTILITIES ===
const formatDateRange = (range: DateRange | undefined, placeholder: string): string => {
  if (!range?.from) return placeholder
  if (!range.to) return format(range.from, "LLL dd, y")
  return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
}

// === COMPONENTS ===
const DatePicker = React.memo<DatePickerProps>(({ 
  date, 
  onSelect, 
  placeholder = "Pick a date", 
  disabled, 
  className,
  clearable = false,
  showWeekNumbers = false,
  fromDate,
  toDate
}) => {
  // State Block
  const [isOpen, setIsOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date>()
  
  // Computed Values Block
  const hasDate = Boolean(date)
  const displayText = hasDate && date ? format(date, "LLL dd, y") : placeholder
  
  // Event Handlers Block
  const handleSelect = React.useCallback((selectedDate: Date | undefined) => {
    onSelect?.(selectedDate)
    setIsOpen(false)
  }, [onSelect])

  const handleClear = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(undefined)
  }, [onSelect])

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  React.useEffect(() => {
    if (date) {
      setMonth(date)
    }
  }, [date])

  // Render Block
  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !hasDate && "text-muted-foreground",
            className
          )}
          aria-label={displayText}
          aria-expanded={isOpen}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="truncate">{displayText}</span>
          {clearable && hasDate && (
            <X 
              className="ml-auto h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" 
              onClick={handleClear}
              aria-label="Clear date"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          fromMonth={fromDate}
          toMonth={toDate}
          showWeekNumber={showWeekNumbers}
          showOutsideDays={false}
          month={month}
          onMonthChange={setMonth}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
})

const DateRangePicker = React.memo<DateRangePickerProps>(({ 
  dateRange, 
  onSelect, 
  placeholder = "Pick a date range", 
  disabled, 
  className,
  clearable = false,
  showWeekNumbers = false,
  fromDate,
  toDate
}) => {
  // State Block
  const [isOpen, setIsOpen] = React.useState(false)
  const [month, setMonth] = React.useState(dateRange?.from)
  
  // Computed Values Block
  const hasDateRange = Boolean(dateRange?.from)
  const displayText = formatDateRange(dateRange, placeholder)
  
  // Event Handlers Block
  const handleSelect = React.useCallback((selectedRange: DateRange | undefined) => {
    onSelect?.(selectedRange)
    if (selectedRange?.from && selectedRange?.to) {
      setIsOpen(false)
    }
  }, [onSelect])

  const handleClear = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(undefined)
  }, [onSelect])

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  React.useEffect(() => {
    if (dateRange?.from) {
      setMonth(dateRange.from)
    }
  }, [dateRange?.from])

  // Render Block
  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !hasDateRange && "text-muted-foreground",
            className
          )}
          aria-label={displayText}
          aria-expanded={isOpen}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="truncate">{displayText}</span>
          {clearable && hasDateRange && (
            <X 
              className="ml-auto h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" 
              onClick={handleClear}
              aria-label="Clear date range"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          disabled={disabled}
          fromMonth={fromDate}
          toMonth={toDate}
          showWeekNumber={showWeekNumbers}
          showOutsideDays={false}
          month={month}
          onMonthChange={setMonth}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
})

DatePicker.displayName = "DatePicker"
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }
