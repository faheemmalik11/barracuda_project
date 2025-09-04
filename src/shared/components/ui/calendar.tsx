import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@shared/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar = ({ className, ...props }: CalendarProps) => {
  return (
    <DayPicker
      className={cn("rdp-root p-3", className)}
      components={{
        PreviousMonthButton: (props) => (
          <button {...props}>
            <ChevronLeft className="h-4 w-4" />
          </button>
        ),
        NextMonthButton: (props) => (
          <button {...props}>
            <ChevronRight className="h-4 w-4" />
          </button>
        ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
