import { memo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"
import { stickyLoadingCellVariants } from "./sticky-column-variants"
import { Skeleton } from "@shared/components/ui/skeleton"

interface LoadingSkeletonProps {
  columns: number
  rows: number
  hasActions?: boolean
  hasSelection?: boolean
  className?: string
  showPagination?: boolean
}

export const LoadingSkeleton = memo<LoadingSkeletonProps>(({
  columns,
  rows,
  hasActions = false,
  hasSelection = true,
  className,
  showPagination = true,
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative border-t border-b">
        <div className="overflow-x-auto">
          <Table aria-label="Loading data">
            <TableHeader>
              <TableRow>
                {hasSelection && (
                  <TableHead className="w-9 min-w-9 max-w-9 px-1 text-center">
                    <div className="flex items-center justify-center">
                      <Skeleton.Box width="w-3.5" height="h-3.5" />
                    </div>
                  </TableHead>
                )}

                {Array.from({ length: columns }, (_, i) => (
                  <TableHead key={`header-${i}`}>
                    <Skeleton.Text lines={1} className="w-3/4" />
                  </TableHead>
                ))}

                <TableHead className="w-full" />

                {hasActions && (
                  <TableHead className={stickyLoadingCellVariants({})}>
                    <div className="flex items-center justify-center">
                      <Skeleton.Icon />
                    </div>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {hasSelection && (
                    <TableCell className="w-9 min-w-9 max-w-9 px-1 text-center">
                      <div className="flex items-center justify-center">
                        <Skeleton.Box width="w-3.5" height="h-3.5" />
                      </div>
                    </TableCell>
                  )}

                  {Array.from({ length: columns }, (_, colIndex) => (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      <Skeleton.Text lines={1} />
                    </TableCell>
                  ))}

                  <TableCell className="w-full transition-colors duration-200 ease-in-out" />

                  {hasActions && (
                    <TableCell className={stickyLoadingCellVariants({})}>
                      <div className="flex items-center justify-center">
                        <Skeleton.Icon />
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
          <Skeleton.Text lines={1} className="w-32" />
          <div className="flex items-center gap-4">
            <Skeleton.Text lines={1} className="w-16" />
            <Skeleton.Text lines={1} className="w-12" />
          </div>
        </div>
      )}
    </div>
  )
})

LoadingSkeleton.displayName = "LoadingSkeleton"

