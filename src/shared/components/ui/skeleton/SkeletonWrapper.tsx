import React, { type ReactNode } from "react"
import { cn } from "@shared/lib/utils"
import { useSkeletonTheme } from "./SkeletonContext"
import { 
  SkeletonCard, 
  SkeletonTable, 
  SkeletonList, 
  SkeletonForm, 
  SkeletonGrid, 
  SkeletonHeader,
  SkeletonPage,
  type SkeletonCardProps,
  type SkeletonTableProps,
  type SkeletonListProps,
  type SkeletonFormProps,
  type SkeletonGridProps,
  type SkeletonHeaderProps,
  type SkeletonPageProps
} from "./layouts"
import { SkeletonText, SkeletonIcon, type SkeletonTextProps } from "./primitives"

// Union type for all possible skeleton props
type SkeletonProps = Partial<
  | SkeletonCardProps
  | SkeletonTableProps  
  | SkeletonListProps
  | SkeletonFormProps
  | SkeletonGridProps
  | SkeletonHeaderProps
  | SkeletonPageProps
  | SkeletonTextProps
>

export interface SkeletonWrapperProps {
  /** Whether content is loading */
  loading: boolean
  /** Children to render when not loading */
  children: ReactNode
  /** Custom skeleton to display when loading */
  skeleton?: ReactNode
  /** Fallback skeleton type when no custom skeleton provided */
  fallback?: "card" | "table" | "list" | "form" | "grid" | "header" | "page" | "text" | "spinner" | "custom"
  /** Custom className */
  className?: string
  /** Minimum height for the loading container */
  minHeight?: string
  /** Additional props for the fallback skeleton */
  skeletonProps?: SkeletonProps
  /** Whether to show a loading message */
  showLoadingMessage?: boolean
  /** Custom loading message */
  loadingMessage?: string
  /** Whether to animate the transition */
  animate?: boolean
}

export const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  loading,
  children,
  skeleton,
  fallback = "card",
  className,
  minHeight = "h-32",
  skeletonProps = {},
  showLoadingMessage = false,
  loadingMessage = "Loading...",
  animate = true,
}) => {
  const theme = useSkeletonTheme()

  // If not loading, render children
  if (!loading) {
    return (
      <div className={animate ? "animate-in fade-in duration-200" : ""}>
        {children}
      </div>
    )
  }

  // If custom skeleton provided, use it
  if (skeleton) {
    return (
      <div 
        className={cn(
          "relative",
          minHeight,
          animate ? "animate-in fade-in duration-200" : "",
          className
        )}
        role="status"
        aria-label="Loading content"
      >
        {skeleton}
        {showLoadingMessage && (
          <div className="sr-only">{loadingMessage}</div>
        )}
      </div>
    )
  }

  // Render fallback skeleton based on type
  const renderFallbackSkeleton = () => {
    switch (fallback) {
      case "card":
        return <SkeletonCard {...skeletonProps} />
      
      case "table":
        return <SkeletonTable {...skeletonProps} />
      
      case "list":
        return <SkeletonList {...skeletonProps} />
      
      case "form":
        return <SkeletonForm {...skeletonProps} />
      
      case "grid":
        return <SkeletonGrid {...skeletonProps} />
      
      case "header":
        return <SkeletonHeader {...skeletonProps} />
      
      case "page":
        return <SkeletonPage {...skeletonProps} />
      
      case "text":
        return <SkeletonText {...skeletonProps} />
      
      case "spinner":
        return (
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <SkeletonIcon size="md" className={theme.animationSpeed} />
              {showLoadingMessage && (
                <SkeletonText lines={1} className="w-24" />
              )}
            </div>
          </div>
        )
      
      case "custom":
        return (
          <div className="space-y-4">
            <SkeletonText lines={2} />
            <SkeletonCard />
          </div>
        )
      
      default:
        return <SkeletonCard {...skeletonProps} />
    }
  }

  return (
    <div 
      className={cn(
        "relative",
        minHeight,
        animate ? "animate-in fade-in duration-200" : "",
        className
      )}
      role="status"
      aria-label="Loading content"
    >
      {renderFallbackSkeleton()}
      {showLoadingMessage && (
        <div className="sr-only">{loadingMessage}</div>
      )}
    </div>
  )
}

// Additional utility component for conditional loading
export interface ConditionalSkeletonProps {
  /** Condition to determine if skeleton should be shown */
  condition: boolean
  /** Children to render when condition is false */
  children: ReactNode
  /** Skeleton to show when condition is true */
  skeleton?: ReactNode
  /** Fallback skeleton type */
  fallback?: SkeletonWrapperProps["fallback"]
  /** Custom className */
  className?: string
  /** Additional props for skeleton */
  skeletonProps?: SkeletonProps
}

export const ConditionalSkeleton: React.FC<ConditionalSkeletonProps> = ({
  condition,
  children,
  skeleton,
  fallback = "card",
  className,
  skeletonProps,
}) => {
  return (
    <SkeletonWrapper
      loading={condition}
      skeleton={skeleton}
      fallback={fallback}
      className={className}
      skeletonProps={skeletonProps}
    >
      {children}
    </SkeletonWrapper>
  )
}

// Specialized wrapper for data tables with sticky columns support
export interface SkeletonTableWrapperProps {
  /** Whether table is loading */
  loading: boolean
  /** Children to render when not loading */
  children: ReactNode
  /** Number of rows to show in skeleton */
  rows?: number
  /** Number of columns to show in skeleton */
  columns?: number
  /** Whether table has selection checkboxes */
  hasSelection?: boolean
  /** Whether table has actions column */
  hasActions?: boolean
  /** Whether to show pagination skeleton */
  showPagination?: boolean
  /** Custom className */
  className?: string
  /** Whether to support sticky columns */
  supportsStickyColumns?: boolean
}

export const SkeletonTableWrapper: React.FC<SkeletonTableWrapperProps> = ({
  loading,
  children,
  rows = 5,
  columns = 4,
  hasSelection = false,
  hasActions = false,
  showPagination = true,
  className,
  supportsStickyColumns = false,
}) => {
  const tableSkeleton = (
    <SkeletonTable
      rows={rows}
      columns={columns}
      hasSelection={hasSelection}
      hasActions={hasActions}
      showPagination={showPagination}
      useStickyColumns={supportsStickyColumns}
    />
  )

  return (
    <SkeletonWrapper
      loading={loading}
      skeleton={tableSkeleton}
      className={className}
    >
      {children}
    </SkeletonWrapper>
  )
}

// Specialized wrapper for pages with different layouts
export interface SkeletonPageWrapperProps {
  /** Whether page is loading */
  loading: boolean
  /** Children to render when not loading */
  children: ReactNode
  /** Page layout type */
  layout?: "dashboard" | "list" | "detail" | "form"
  /** Custom className */
  className?: string
}

export const SkeletonPageWrapper: React.FC<SkeletonPageWrapperProps> = ({
  loading,
  children,
  layout = "dashboard",
  className,
}) => {
  const pageSkeleton = <SkeletonPage layout={layout} />

  return (
    <SkeletonWrapper
      loading={loading}
      skeleton={pageSkeleton}
      className={className}
    >
      {children}
    </SkeletonWrapper>
  )
}


