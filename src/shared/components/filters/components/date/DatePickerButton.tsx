import { useState, useCallback, useMemo } from "react"
import { CalendarDays } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover"
import { Calendar as CalendarComponent } from "@shared/components/ui/calendar"
import { cn } from "@shared/lib/utils"
import { format } from "date-fns"

interface DatePickerButtonProps {
  selectedDate?: Date
  onDateSelect: (date?: Date) => void
  disabled?: (date: Date) => boolean
  className?: string
}

export function DatePickerButton({
  selectedDate,
  onDateSelect,
  disabled,
  className,
}: DatePickerButtonProps) {
  const [open, setOpen] = useState(false)

  const handleDateSelect = useCallback(
    (date?: Date) => {
      onDateSelect(date)
      setOpen(false)
    },
    [onDateSelect],
  )

  const displayDate = useMemo(
    () => (selectedDate ? format(selectedDate, "MM/dd/yyyy") : ""),
    [selectedDate],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-8 px-2.5 text-sm font-normal justify-start rounded-lg border-2 shadow-sm gap-1 w-28",
            !selectedDate && "text-muted-foreground",
            className,
          )}
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">{displayDate}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-lg shadow-lg border-2">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
} 
