import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import { getRefundColumns, REFUND_COLUMNS } from '@shared/lib/tables/columns/refund-columns'
import { getRefundRowActions } from '@shared/lib/tables/actions/refund-actions'
import { applyColumnManagement, type ColumnManagementConfig } from '@shared/lib/tables/utils/column-management'
import type { Refund } from '@shared/types/refunds'

interface RefundTableProps {
  data: Refund[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (refund: Refund) => void
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
  onProcessRefund?: (refund: Refund) => void
  onCancelRefund?: (refund: Refund) => void
  onRetryRefund?: (refund: Refund) => void
  onViewPayment?: (refund: Refund) => void
  onViewCustomer?: (refund: Refund) => void
  onAddNote?: (refund: Refund) => void
  onFlag?: (refund: Refund) => void
  onCopyId?: (refund: Refund) => void
  activeItemId?: string
}

export function RefundTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  statusFilter,
  emptyStateDescription,
  managedColumns,
  onProcessRefund,
  onCancelRefund,
  onRetryRefund,
  onViewPayment,
  onViewCustomer,
  onAddNote,
  onFlag,
  onCopyId,
  activeItemId,
}: RefundTableProps) {

  const columns = useMemo(() => {
    if (managedColumns) {
      return applyColumnManagement(Object.values(REFUND_COLUMNS), managedColumns)
    }
    return getRefundColumns(statusFilter || 'all')
  }, [managedColumns, statusFilter])

  const unavailableItems = useMemo(() => 
    data
      .filter(refund => ["failed", "canceled"].includes(refund.status))
      .map(refund => refund.id), 
    [data]
  )

  const rowActions = useMemo(() => getRefundRowActions({ 
    onProcessRefund,
    onCancelRefund,
    onRetryRefund,
    onViewPayment,
    onViewCustomer,
    onAddNote,
    onFlag,
    onCopyId,
  }), [onProcessRefund, onCancelRefund, onRetryRefund, onViewPayment, onViewCustomer, onAddNote, onFlag, onCopyId])

  return (
    <DataTable
      data={data}
      columns={columns}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(refund) => refund.id}
      onRowClick={onRowClick}
      rowActions={rowActions}
      pagination={pagination}
      loading={loading}
      unavailableItems={unavailableItems}
      emptyStateDescription={emptyStateDescription}
      className="bg-background"
      getItemStatus={(refund) => refund.status || 'unknown'}
      activeItemId={activeItemId}
    />
  )
}
