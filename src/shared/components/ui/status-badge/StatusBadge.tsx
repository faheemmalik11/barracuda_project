import React, { memo, useMemo } from "react"

import { cn } from "@shared/lib/utils"

import { type StatusBadgeProps, statusVariants } from "./variants"

// Base status badge component with enhanced accessibility and error handling
const StatusBadge = memo<StatusBadgeProps>(
  ({
    status,
    statusConfig,
    defaultStatus = "unknown",
    size,
    onClick,
    "data-testid": testId,
  }) => {
    // Memoize status configuration lookup with fallback
    const config = useMemo(() => {
      const normalizedStatus =
        status?.toLowerCase()?.replace(/\s+/g, "_") || defaultStatus
      return (
        statusConfig[normalizedStatus] ||
        statusConfig[defaultStatus] || {
          text: status || "Unknown",
          variant: "neutral" as const,
          tooltip: `Status: ${status || "Unknown"}`,
        }
      )
    }, [status, statusConfig, defaultStatus])

    const handleClick = React.useCallback(() => {
      if (onClick && config.actionable) {
        onClick(status)
      }
    }, [onClick, status, config.actionable])

    // Check if this is a numeric badge (for consistent sizing of numbers)
    const isNumericBadge = /^\d+$/.test(config.text.trim())
    
    const badgeContent = (
      <span
        className={cn(
          statusVariants({ variant: config.variant, size }),
          onClick && config.actionable && "cursor-pointer hover:shadow-sm",
          isNumericBadge && size === "sm" && "w-[1.5rem]",
          isNumericBadge && !size && "w-[2rem]",
          isNumericBadge && size === "lg" && "w-[2.5rem]",
        )}
        onClick={handleClick}
        role={onClick && config.actionable ? "button" : undefined}
        tabIndex={onClick && config.actionable ? 0 : undefined}
        aria-label={config.tooltip}
        data-testid={
          testId || `status-badge-${status?.toLowerCase()?.replace(/\s+/g, "-")}`
        }
      >
        <span>{config.text}</span>
      </span>
    )

    return badgeContent
  },
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge } 
