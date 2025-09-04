import { memo } from "react"
import { cn } from "@shared/lib/utils"

interface TruncatedCellProps {
  children: React.ReactNode
  maxWidth?: number | string
  className?: string
  title?: string
}

function TruncatedCellComponent({ 
  children, 
  maxWidth = "100%", 
  className,
  title
}: TruncatedCellProps) {
  const autoTitle = typeof children === 'string' && children.trim() 
    ? children 
    : undefined

  return (
    <div 
      className={cn("truncate", className)}
      style={{ maxWidth }}
      title={title || autoTitle}
    >
      {children}
    </div>
  )
}

export const TruncatedCell = memo(TruncatedCellComponent) 
