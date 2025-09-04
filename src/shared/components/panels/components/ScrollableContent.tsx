import { type ReactNode } from "react"
import { cn } from "@shared/lib/utils"

interface ScrollableContentProps {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export function ScrollableContent({ children, className, ariaLabel = "Details content" }: ScrollableContentProps) {
  return (
    <div 
      className={cn(
        "flex-1 overflow-y-auto transform-gpu will-change-scroll",
        className
      )}
      role="main"
      aria-label={ariaLabel}
    >
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  )
}