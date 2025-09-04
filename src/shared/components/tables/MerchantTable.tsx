import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import type { Merchant } from '@shared/types/merchants'
import { getMerchantColumns, MERCHANT_COLUMNS } from '@shared/lib/tables/columns/merchant-columns'
import { getMerchantRowActions, getMerchantHoverActions } from '@shared/lib/tables/actions/merchant-actions'
import { applyColumnManagement, type ColumnManagementConfig } from '@shared/lib/tables/utils/column-management'

interface MerchantTableProps {
  data: Merchant[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (merchant: Merchant) => void
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
  onViewProfile?: (merchant: Merchant) => void
  onFlag?: (merchant: Merchant) => void
  onAddNote?: (merchant: Merchant) => void
  onCopyId?: (merchant: Merchant) => void
  [key: string]: unknown
}

export function MerchantTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  statusFilter,
  emptyStateDescription,
  managedColumns,
  onViewProfile,
  onFlag,
  onAddNote,
  onCopyId,
}: MerchantTableProps) {
  const columns = useMemo(() => {
    if (managedColumns) {
      return applyColumnManagement(Object.values(MERCHANT_COLUMNS), managedColumns)
    }
    return getMerchantColumns(statusFilter || 'all')
  }, [managedColumns, statusFilter])

  const rowActions = useMemo(() => getMerchantRowActions({
    onViewProfile,
    onFlag,
    onAddNote,
    onCopyId,
  }), [onViewProfile, onFlag, onAddNote, onCopyId])

  const hoverActions = useMemo(() => getMerchantHoverActions(), [])

  return (
    <DataTable
      data={data}
      columns={columns}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(merchant) => merchant.id.toString()}
      onRowClick={onRowClick}
      rowActions={rowActions}
      hoverActions={hoverActions}
      pagination={pagination}
      loading={loading}
      emptyStateDescription={emptyStateDescription}
    />
  )
}
