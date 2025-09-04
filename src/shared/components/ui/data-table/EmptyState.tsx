import * as React from "react"
import { type LucideIcon, Inbox } from "lucide-react"

interface EmptyStateProps {
  /** A short description */
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: LucideIcon
}

export const EmptyState = React.memo<EmptyStateProps>(
  ({
    title = "No results found",
    description,
    icon: Icon = Inbox,
  }: EmptyStateProps) => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-24 text-center">
        <Icon className="h-10 w-10 text-muted-foreground" />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState" 
