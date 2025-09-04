import { ReactNode } from 'react'
import { StatusFilterCards } from '@shared/components/ui/status-filter-cards'
import { usePanelAdjustments } from '@shared/components/panels'
import type { StatusFilter, ManagedColumn } from './types'

interface TableFilterComponent {
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

export interface FilterSectionProps {
  statusFilters: readonly StatusFilter[]
  selectedStatus: string
  onStatusChange: (status: string) => void
  getStatusCount: (status: string) => number
  hasSelection: boolean
  selectedCount: number
  onClearSelection: () => void
  tableFiltersComponent: React.ComponentType<TableFilterComponent>
  tableFiltersProps: TableFilterComponent
  showStatusFilters?: boolean
  showTableFilters?: boolean
  className?: string
  statusFiltersClassName?: string
  tableFiltersClassName?: string
  beforeStatusFilters?: ReactNode
  afterStatusFilters?: ReactNode
  beforeTableFilters?: ReactNode
  afterTableFilters?: ReactNode
  forceCarousel?: boolean
}

export function FilterSection({
  statusFilters,
  selectedStatus,
  onStatusChange,
  getStatusCount,
  tableFiltersComponent: TableFiltersComponent,
  tableFiltersProps,
  showStatusFilters = true,
  showTableFilters = true,
  className = '',
  statusFiltersClassName = '',
  tableFiltersClassName = '',
  beforeStatusFilters,
  afterStatusFilters,
  beforeTableFilters,
  afterTableFilters,
  forceCarousel
}: FilterSectionProps) {
  const { hasOpenPanels } = usePanelAdjustments()
  const shouldUseCarousel = forceCarousel ?? hasOpenPanels
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {beforeStatusFilters}
      
      {showStatusFilters && (
        <div className={statusFiltersClassName}>
          <StatusFilterCards
            filters={statusFilters}
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
            getStatusCount={getStatusCount}
            forceCarousel={shouldUseCarousel}
          />
        </div>
      )}
      
      {afterStatusFilters}
      {beforeTableFilters}
      
      {showTableFilters && (
        <div className={tableFiltersClassName}>
          <TableFiltersComponent {...tableFiltersProps} />
        </div>
      )}
      
      {afterTableFilters}
    </div>
  )
}

export function StatusOnlyFilterSection({
  statusFilters,
  selectedStatus,
  onStatusChange,
  getStatusCount,
  className = ''
}: Pick<FilterSectionProps, 
  | 'statusFilters' 
  | 'selectedStatus' 
  | 'onStatusChange' 
  | 'getStatusCount'
  | 'className'
>) {
  return (
    <div className={className}>
      <StatusFilterCards
        filters={statusFilters}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
        getStatusCount={getStatusCount}
      />
    </div>
  )
}