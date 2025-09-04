import { ReactNode, ComponentType, createElement } from 'react'
import type { EntityFacets } from '@shared/types/status-filter.types'
import type { Transition } from 'framer-motion'

export interface BaseEntity {
  id: string | number
  [key: string]: unknown
}

export interface ManagedColumn {
  id: string
  label: string
  visible: boolean
  required?: boolean
  order?: number
}

export interface Pagination {
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
  totalItems: number
  totalPages: number
}

export interface UseDataHook<T extends BaseEntity> {
  data: T[]
  isLoading: boolean
  totalItems: number
  totalPages: number
  pagination: Pagination
  facets?: EntityFacets
}

export interface UseFiltersHook {
  statusFilter: string
  setStatusFilter: (status: string) => void
  tableFilters: Record<string, unknown>
  setTableFilters: (filters: Record<string, unknown>) => void
  clearAllFilters: () => void
  activeFiltersCount: number
  query?: string
  getStatusCount: (status: string, facets: EntityFacets, totalItems: number) => number
}

export interface UseSheetsHook<T = BaseEntity> {
  getSheetProps: (sheetName: string) => {
    isOpen: boolean
    onClose: () => void
    entity?: T
  }
  [key: string]: unknown
}

export interface UseActionsHook {
  [key: string]: (...args: unknown[]) => void
}

export interface UseSelectionHook {
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
  hasSelectedItems: boolean
  handleClearSelection: () => void
  batchActionHandlers?: Record<string, (ids: string[]) => void>
}

export interface TableFilterComponent {
  onFiltersChange: (filters: Record<string, unknown>) => void
  onClearAllFilters: () => void
  initialValues: Record<string, unknown>
  totalRecords: number
  hasSelection: boolean
  selectedCount: number
  onClearSelection: () => void
  status: string
  onColumnsChange: (columns: ManagedColumn[]) => void
  managedColumns?: ManagedColumn[]
  currentPageSize: number
  onPageSizeChange: (size: number) => void
  availablePageSizes: number[]
  [key: string]: unknown
}

export interface StatusFilter {
  value: string
  label: string
  color?: string
}

export interface PageHeaderConfig {
  title: string
  description: string
  icon?: ReactNode
  primaryAction?: {
    label: string
    icon?: ReactNode
    onClick: () => void
    dropdown?: Array<{
      label: string
      onClick: () => void
    }>
  }
  secondaryActions?: Array<{
    label: string
    icon?: ReactNode
    onClick: () => void
  }>
}

export interface TableConfig<T extends BaseEntity> {
  component: React.ComponentType<{
    data: T[]
    selectedItems: string[]
    onSelectionChange: (items: string[]) => void
    onRowClick: (item: T) => void
    pagination: Pagination
    loading: boolean
    statusFilter?: string
    emptyStateDescription: string
    managedColumns?: ManagedColumn[]
    [key: string]: unknown
  }>
  props?: Record<string, unknown>
}

export interface TableFiltersConfig {
  component: React.ComponentType<any>
  props?: Record<string, unknown>
}

export interface SheetConfig<T extends BaseEntity> {
  component: React.ComponentType<{
    isOpen: boolean
    onClose: () => void
    entity?: T
    [key: string]: unknown
  }>
  props?: Record<string, unknown>
}

export interface EntityListPageProps<T extends BaseEntity> {
  header: PageHeaderConfig
  statusFilters: readonly StatusFilter[]
  table: TableConfig<T>
  tableFilters: TableFiltersConfig
  sheets?: Array<SheetConfig<T>>
  useData: () => UseDataHook<T>
  useFilters: () => UseFiltersHook
  useSheets?: () => UseSheetsHook<T>
  useSelection?: () => UseSelectionHook
  usePageSize: () => {
    pageSize: number
    setPageSize: (size: number) => void
    availablePageSizes: number[]
  }
  customSections?: {
    beforeHeader?: ReactNode
    afterHeader?: ReactNode
    beforeStatusFilters?: ReactNode
    afterStatusFilters?: ReactNode
    beforeTableFilters?: ReactNode
    afterTableFilters?: ReactNode
    beforeTable?: ReactNode
    afterTable?: ReactNode
    beforeSheets?: ReactNode
    afterSheets?: ReactNode
  }
  animationKey?: string
  animationConfig?: {
    initial?: Record<string, number | string>
    animate?: Record<string, number | string>
    exit?: Record<string, number | string>
    transition?: Transition
  }
  containerClassName?: string
  spacing?: 'compact' | 'normal' | 'spacious'
}

export type EntityPageHooks<T extends BaseEntity> = {
  data: UseDataHook<T>
  filters: UseFiltersHook
  sheets?: UseSheetsHook<T>
  actions?: UseActionsHook
  selection?: UseSelectionHook
  pageSize: ReturnType<EntityListPageProps<T>['usePageSize']>
}

export type BulkActionHandler = (selectedIds: string[]) => void

export type BulkActions = {
  cancel?: BulkActionHandler
  flag?: BulkActionHandler
  export?: BulkActionHandler
  updateStatus?: BulkActionHandler
  updateCapabilities?: BulkActionHandler
  [key: string]: BulkActionHandler | undefined
}

export interface SheetWrapperProps<T extends BaseEntity> {
  isOpen: boolean
  onClose: () => void
  entity?: T
}

/**
 * Creates a generic sheet wrapper component for EntityListPage integration
 * 
 * This wrapper standardizes the props interface between EntityListPage and sheet components,
 * automatically passing the entity data through the appropriate prop name.
 * 
 * @param SheetComponent The sheet component to wrap
 * @returns Wrapped component compatible with EntityListPage
 * 
 * @example
 * ```tsx
 * const PaymentSheet = createSheetWrapper(PaymentDetailsSheet)
 * // Usage in EntityListPage sheets config
 * sheets: [{ component: PaymentSheet, props: { sheetKey: 'payment-details' } }]
 * ```
 */
export const createSheetWrapper = <T extends BaseEntity>(
  SheetComponent: ComponentType<Record<string, unknown>>
) => {
  return (props: SheetWrapperProps<T> & Record<string, unknown>) => {
    const { isOpen, onClose, entity, ...sheetProps } = props
    
    return createElement(SheetComponent, {
      ...sheetProps,
      isOpen,
      onClose,
      entity,
    })
  }
}
