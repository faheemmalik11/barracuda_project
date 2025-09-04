import type { ReactNode } from "react"
import type { BulkAction, ButtonVariant } from "./bulk-actions.types"

export type Alignment = "left" | "center" | "right"

/**
 * Column configuration for data table
 */
export interface Column<T> {
  /** Unique key for the column */
  key: string
  /** Header content (can be string or React component) */
  header: ReactNode
  /** Column width */
  width?: string | number
  /** Minimum column width */
  minWidth?: string | number
  /** Maximum column width */
  maxWidth?: string | number
  /** Text alignment for column content */
  align?: Alignment
  /** Function to render cell content */
  render: (item: T, index: number) => ReactNode
  /** CSS class for the entire column */
  className?: string
  /** CSS class for the column header */
  headerClassName?: string
  /** CSS class for column cells */
  cellClassName?: string
}

/**
 * Action button configuration for table rows
 */
export interface TableAction<T> {
  /** Unique key for the action */
  key: string
  /** Display label for the action */
  label: string
  /** Optional icon for the action button */
  icon?: ReactNode
  /** Function to execute when action is clicked */
  onClick: (item: T) => void | Promise<void>
  /** Button visual variant */
  variant?: ButtonVariant
  /** Function to determine if action should be shown */
  condition?: (item: T) => boolean
  /** Function to determine if action should be disabled */
  disabled?: (item: T) => boolean
}

export type { BulkAction, ButtonVariant }

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  loading?: boolean
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[]
  columns: Column<T>[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  getItemId: (item: T) => string
  onRowClick?: (item: T) => void
  rowActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  hoverActions?: TableAction<T>[] | ((item: T) => TableAction<T>[])
  pagination?: PaginationProps
  loading?: boolean
  loadingRows?: number
  emptyState?: ReactNode
  emptyStateTitle?: string
  emptyStateDescription?: string
  className?: string
  unavailableItems?: string[]
  getItemStatus?: (item: T) => string
  allowedStatuses?: string[]
  onSelectSucceededOnly?: (fn: () => void) => void
  activeItemId?: string
}

// Type guards with better validation
export const isTableAction = <T extends Record<string, unknown>>(
  action: unknown
): action is TableAction<T> => {
  if (typeof action !== "object" || !action) return false
  const a = action as Record<string, unknown>
  return (
    typeof a.label === "string" &&
    typeof a.onClick === "function" &&
    typeof a.key === "string"
  )
}

export const isValidColumn = <T extends Record<string, unknown>>(
  column: unknown
): column is Column<T> => {
  if (typeof column !== "object" || !column) return false
  const c = column as Record<string, unknown>
  return (
    typeof c.key === "string" &&
    c.header !== undefined &&
    typeof c.render === "function"
  )
}

// Strict props validation
export const validateDataTableProps = <T extends Record<string, unknown>>(
  props: Partial<DataTableProps<T>>
): props is DataTableProps<T> => {
  return (
    Array.isArray(props.data) &&
    Array.isArray(props.columns) &&
    props.columns.every((col) => isValidColumn<T>(col)) &&
    Array.isArray(props.selectedItems) &&
    typeof props.getItemId === "function"
  )
}
