import { memo } from "react"
import { TableCell } from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"
import type { Column } from "@shared/types/data-table"

interface CellProps<T> {
  column: Column<T>
  item: T
  index: number
  className?: string
  isUnavailable?: boolean
  isSelected?: boolean
  isActive?: boolean
}

const ALIGNMENT_CLASSES = {
  center: "text-center",
  right: "text-right",
} as const

function CellComponent<T extends object>({
  column,
  item,
  index,
  className,
  isUnavailable,
  isSelected,
  isActive,
}: CellProps<T>) {
  return (
    <TableCell
      className={cn(
        "truncate text-left transition-colors duration-200 ease-in-out",
        !isUnavailable && "group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50",
        isSelected && "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800",
        isActive && "bg-blue-50 dark:bg-blue-950/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50",
        column.align && ALIGNMENT_CLASSES[column.align as keyof typeof ALIGNMENT_CLASSES],
        className
      )}
      numeric={column.align === "right"}
      style={{
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
      }}
      role="gridcell"
    >
      {column.render(item, index)}
    </TableCell>
  )
}

export const Cell = memo(CellComponent) as <T extends object>(
  props: CellProps<T>
) => React.ReactElement
