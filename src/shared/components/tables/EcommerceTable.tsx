import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import { getEcommerceColumns, ECOMMERCE_COLUMNS } from '@shared/lib/tables/columns/ecommerce-columns'
import { getEcommerceRowActions } from '@shared/lib/tables/actions/ecommerce-actions'
import { applyColumnManagement, type ColumnManagementConfig } from '@shared/lib/tables/utils/column-management'
import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types'

interface EcommerceTableProps {
  data: Ecommerce[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (ecommerce: Ecommerce) => void
  pagination: {
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
    totalItems: number
    totalPages: number
  }
  loading: boolean
  statusFilter?: string
  emptyStateDescription: string
  managedColumns?: ColumnManagementConfig[]
  onView?: (ecommerce: Ecommerce) => void
  onCopyId?: (ecommerce: Ecommerce) => void
  onConfigure?: (ecommerce: Ecommerce) => void
  onActivate?: (ecommerce: Ecommerce) => void
  onDeactivate?: (ecommerce: Ecommerce) => void
  activeItemId?: string
}

export function EcommerceTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  statusFilter,
  emptyStateDescription,
  managedColumns,
  onView,
  onCopyId,
  onConfigure,
  onActivate,
  onDeactivate,
  activeItemId,
}: EcommerceTableProps) {
  const columns = useMemo(() => {
    if (managedColumns) {
      return applyColumnManagement(Object.values(ECOMMERCE_COLUMNS), managedColumns)
    }
    return getEcommerceColumns(statusFilter || 'all')
  }, [managedColumns, statusFilter])

  const unavailableItems = useMemo(() => 
    data
      .filter(ecommerce => ["inactive"].includes(ecommerce.status))
      .map(ecommerce => ecommerce.id), 
    [data]
  )

  const rowActions = useMemo(() => getEcommerceRowActions({
    onView,
    onCopyId,
    onConfigure,
    onActivate,
    onDeactivate,
  }), [onView, onCopyId, onConfigure, onActivate, onDeactivate])

  return (
    <DataTable
      data={data}
      columns={columns}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(ecommerce) => ecommerce.id}
      onRowClick={onRowClick}
      rowActions={rowActions}
      pagination={pagination}
      loading={loading}
      unavailableItems={unavailableItems}
      emptyStateDescription={emptyStateDescription}
      className="bg-background"
      getItemStatus={(ecommerce) => ecommerce.status || 'unknown'}
      activeItemId={activeItemId}
    />
  )
}
