import React, { useCallback } from "react"
import { ChevronDown, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/components/ui/popover"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import { Z_INDEX_CLASSES } from "@shared/lib/z-index"
import type { FilterButtonProps } from "@shared/types/filters"
import { FILTER_STYLES, FILTER_ACCESSIBILITY } from "@shared/components/filters/constants/filterStyles"

const BUTTON_STYLES = {
  base: "rounded-full text-xs font-medium transition-all duration-200 select-none",
  inactive: "px-3 text-muted-foreground hover:text-foreground hover:border-border",
  active: "pl-2 pr-3 border border-primary/40 bg-primary/5 text-primary hover:bg-primary/15",
  clearButton: "h-5 w-5 rounded-full flex items-center justify-center group cursor-pointer hover:bg-destructive/10 transition-colors focus:outline-none",
  chevron: "w-4 h-4 ml-2 transition-transform duration-200 text-muted-foreground",
  content: "p-0 shadow-lg border bg-popover rounded-md w-auto select-none"
} as const

function FilterButtonImpl({
  filter,
  isActive, 
  isOpen,
  displayValue,
  onToggle,
  onClear,
  children,
}: FilterButtonProps) {
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onClear()
  }, [onClear])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      onClear()
    }
  }, [onClear])

  const renderActiveContent = () => (
    <>
      <div
        onClick={handleClear}
        onKeyDown={handleKeyDown}
        className={BUTTON_STYLES.clearButton}
        aria-label={FILTER_ACCESSIBILITY.CLEAR_ARIA_LABEL}
        role="button"
        tabIndex={0}
      >
        <X className="h-3 w-3 text-muted-foreground group-hover:text-destructive transition-colors" />
      </div>
      <div className="flex items-center truncate">
        <span className="text-foreground font-medium">{displayValue.label}</span>
        <span className="mx-1.5 text-border">|</span>
        <span className="font-semibold text-primary">{displayValue.displayValue}</span>
      </div>
    </>
  )

  const renderInactiveContent = () => (
    <span className="truncate">{filter.label}</span>
  )

  return (
    <Popover open={isOpen} onOpenChange={onToggle}>
      <PopoverTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "outline"}
          className={cn(
            FILTER_STYLES.HEIGHT_SM,
            BUTTON_STYLES.base,
            isActive ? BUTTON_STYLES.active : BUTTON_STYLES.inactive
          )}
        >
          <div className="flex items-center gap-1.5">
            {isActive ? renderActiveContent() : renderInactiveContent()}
            <ChevronDown
              className={cn(
                BUTTON_STYLES.chevron,
                isOpen && "rotate-180"
              )}
            />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(BUTTON_STYLES.content, Z_INDEX_CLASSES.POPOVER)}
        align="start"
        sideOffset={4}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export const FilterButton = React.memo(FilterButtonImpl) 
