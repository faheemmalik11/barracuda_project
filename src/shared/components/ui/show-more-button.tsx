import React from 'react'
import { cn } from '@shared/lib/utils'

export interface ShowMoreButtonProps {
  isExpanded: boolean
  onToggle: () => void
  expandedText?: string
  collapsedText?: string
  className?: string
  ariaLabel?: string
}

export const ShowMoreButton = React.memo<ShowMoreButtonProps>(
  ({
    isExpanded,
    onToggle,
    expandedText = 'Show less',
    collapsedText = 'Show more',
    className,
    ariaLabel,
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 text-xs rounded-full transition-colors',
        'text-foreground bg-background border border-border',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring',
        className
      )}
      aria-expanded={isExpanded}
      aria-label={ariaLabel || (isExpanded ? expandedText : collapsedText)}
    >
      {isExpanded ? expandedText : collapsedText}
    </button>
  )
)

ShowMoreButton.displayName = 'ShowMoreButton'