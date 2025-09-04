import { cn } from "@shared/lib/utils"
import { useSkeletonTheme } from "./SkeletonContext"
import { 
  SkeletonBox, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonBadge,
  SkeletonIcon,
  SkeletonInput
} from "./primitives"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import { stickyLoadingCellVariants } from "../data-table/sticky-column-variants"

export interface SkeletonCardProps {
  showHeader?: boolean
  showContent?: boolean
  contentLines?: number
  className?: string
  showIcon?: boolean
  showButton?: boolean
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showHeader = true,
  showContent = true,
  contentLines = 3,
  className,
  showIcon = true,
  showButton = false,
}) => {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {showHeader && (
        <div className="p-6 flex items-center justify-between pb-2">
          <SkeletonText lines={1} className="w-1/3" />
          {showIcon && <SkeletonIcon size="sm" />}
        </div>
      )}
      {showContent && (
        <div className="p-6 pt-0">
          <SkeletonText lines={contentLines} />
          {showButton && (
            <div className="mt-4">
              <SkeletonButton size="sm" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export interface SkeletonTableProps {
  rows?: number
  columns?: number
  hasActions?: boolean
  hasSelection?: boolean
  className?: string
  showPagination?: boolean
  useStickyColumns?: boolean
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  hasActions = false,
  hasSelection = true,
  className,
  showPagination = true,
  useStickyColumns = false,
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative border-t border-b">
        <div className="overflow-x-auto">
          <Table aria-label="Loading data">
            <TableHeader>
              <TableRow>
                {hasSelection && (
                  <TableHead className="w-12">
                    <div className="flex items-center justify-center">
                      <SkeletonBox width="w-3.5" height="h-3.5" className="mr-1" />
                    </div>
                  </TableHead>
                )}

                {Array.from({ length: columns }).map((_, i) => (
                  <TableHead key={`header-${i}`}>
                    <SkeletonText lines={1} className="w-3/4" />
                  </TableHead>
                ))}

                {hasActions && (
                  <TableHead 
                    className={useStickyColumns ? stickyLoadingCellVariants({}) : "w-12"}
                  >
                    <div className="flex items-center justify-center">
                      <SkeletonBox width="w-4" height="h-4" />
                    </div>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {hasSelection && (
                    <TableCell className="">
                      <div className="flex items-center justify-center">
                        <SkeletonBox width="w-3.5" height="h-3.5" className="mr-1" />
                      </div>
                    </TableCell>
                  )}

                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      <SkeletonText lines={1} />
                    </TableCell>
                  ))}

                  {hasActions && (
                    <TableCell 
                      className={useStickyColumns ? stickyLoadingCellVariants({}) : ""}
                    >
                      <div className="flex items-center justify-center">
                        <SkeletonBox width="w-4" height="h-4" />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {showPagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/40">
          <SkeletonText lines={1} className="w-32" />
          <div className="flex items-center gap-4">
            <SkeletonText lines={1} className="w-16" />
            <SkeletonText lines={1} className="w-12" />
          </div>
        </div>
      )}
    </div>
  )
}

export interface SkeletonListProps {
  items?: number
  showAvatars?: boolean
  showBadges?: boolean
  className?: string
  linesPerItem?: number
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 3,
  showAvatars = true,
  showBadges = false,
  className,
  linesPerItem = 2,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
          {showAvatars && <SkeletonAvatar size="md" />}
          <div className="flex-1">
            <SkeletonText lines={linesPerItem} />
          </div>
          {showBadges && <SkeletonBadge />}
        </div>
      ))}
    </div>
  )
}

export interface SkeletonFormProps {
  fields?: number
  showTitle?: boolean
  showSubmitButton?: boolean
  className?: string
}

export const SkeletonForm: React.FC<SkeletonFormProps> = ({
  fields = 3,
  showTitle = true,
  showSubmitButton = true,
  className,
}) => {
  const theme = useSkeletonTheme()

  return (
    <div className={cn("space-y-6", className)}>
      {showTitle && (
        <div className="space-y-2">
          <SkeletonText lines={1} className="w-1/3" />
          <SkeletonText lines={1} className="w-2/3" />
        </div>
      )}
      
      <div className={cn(theme.spacing)}>
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <SkeletonText lines={1} className="w-1/4" />
            <SkeletonInput />
          </div>
        ))}
      </div>
      
      {showSubmitButton && (
        <div className="flex gap-2">
          <SkeletonButton size="md" width="w-24" />
          <SkeletonButton size="md" width="w-20" />
        </div>
      )}
    </div>
  )
}

export interface SkeletonGridProps {
  items?: number
  columns?: number
  className?: string
  showHeaders?: boolean
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  items = 6,
  columns = 3,
  className,
  showHeaders = true,
}) => {
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2", 
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[columns] || "grid-cols-3"

  return (
    <div className={cn("grid gap-4", gridColsClass, className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="space-y-3">
          {showHeaders && <SkeletonText lines={1} className="w-3/4" />}
          <SkeletonBox height="h-32" />
          <SkeletonText lines={2} />
        </div>
      ))}
    </div>
  )
}

export interface SkeletonHeaderProps {
  showSubtitle?: boolean
  showActions?: boolean
  actionCount?: number
  className?: string
}

export const SkeletonHeader: React.FC<SkeletonHeaderProps> = ({
  showSubtitle = true,
  showActions = true,
  actionCount = 2,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="space-y-2">
        <SkeletonText lines={1} className="w-64" />
        {showSubtitle && <SkeletonText lines={1} className="w-96" />}
      </div>
      {showActions && (
        <div className="flex gap-2">
          {Array.from({ length: actionCount }).map((_, index) => (
            <SkeletonButton key={index} size="md" width="w-20" />
          ))}
        </div>
      )}
    </div>
  )
}

export interface SkeletonPageProps {
  layout?: "dashboard" | "list" | "detail" | "form"
  className?: string
}

export const SkeletonPage: React.FC<SkeletonPageProps> = ({
  layout = "dashboard",
  className,
}) => {
  const renderLayout = () => {
    switch (layout) {
      case "dashboard":
        return (
          <div className={cn("space-y-8", className)}>
            <SkeletonHeader />
            <SkeletonGrid items={4} columns={4} showHeaders={false} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkeletonCard contentLines={4} />
              <SkeletonCard contentLines={4} />
            </div>
          </div>
        )
      case "list":
        return (
          <div className={cn("space-y-6", className)}>
            <SkeletonHeader />
            <SkeletonTable rows={8} columns={5} hasActions hasSelection />
          </div>
        )
      case "detail":
        return (
          <div className={cn("space-y-6", className)}>
            <SkeletonHeader showActions={false} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SkeletonCard contentLines={6} />
              </div>
              <div className="space-y-4">
                <SkeletonCard contentLines={3} />
                <SkeletonCard contentLines={3} />
              </div>
            </div>
          </div>
        )
      case "form":
        return (
          <div className={cn("max-w-2xl mx-auto", className)}>
            <SkeletonForm fields={6} />
          </div>
        )
      default:
        return <SkeletonCard />
    }
  }

  return renderLayout()
} 
