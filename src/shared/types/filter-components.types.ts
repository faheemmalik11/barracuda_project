import type React from "react"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import type { FilterConfig } from "./filter-core.types"
import type { BulkAction } from "./bulk-actions.types"

// ================================
// COMPONENT CONFIGURATION
// ================================

export interface TableFiltersConfig {
  title?: string
  description?: string
  filters: FilterConfig[]
  additionalFilters?: FilterConfig[]
  bulkActions?: BulkAction[]
  visibleFilters?: number
  enableSessionPersistence?: boolean
  sessionKey?: string
  entityType?: string
  getColumnsForStatus?: (status?: string) => ColumnManagementConfig[]
  onExport?: () => void
  onUpdateStatus?: () => void
  onUpdateCapabilities?: () => void
}

export type ColumnConfig = ColumnManagementConfig

export interface TableFiltersProps {
  config: TableFiltersConfig
  onFiltersChange?: (filters: Record<string, unknown>) => void
  onClearAllFilters?: () => void
  onBulkAction?: (actionKey: string, selectedItems: string[]) => void
  className?: string
  initialValues?: Record<string, unknown>
  availableColumns?: ColumnManagementConfig[]
  totalRecords?: number
  selectedItems?: string[]
  hasSelection?: boolean
  selectedCount?: number
  onSelectionCancel?: () => void
  onSelectionFlag?: () => void
  onClearSelection?: () => void
  onColumnsChange?: (columns: ColumnManagementConfig[]) => void
  managedColumns?: ColumnManagementConfig[]
  currentPageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  availablePageSizes?: number[]
  status?: string
}

// ================================
// COMPONENT PROPS
// ================================

export interface FilterButtonProps {
  filter: FilterConfig
  isActive: boolean
  isOpen: boolean
  displayValue: {
    label: string
    displayValue: string
  }
  onToggle: (open: boolean) => void
  onClear: () => void
  children: React.ReactNode
}