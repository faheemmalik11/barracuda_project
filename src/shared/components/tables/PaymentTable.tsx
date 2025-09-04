import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import { getPaymentColumns, PAYMENT_COLUMNS } from '@shared/lib/tables/columns/payment-columns'
import { getPaymentRowActions, getPaymentHoverActions } from '@shared/lib/tables/actions/payment-actions'
import { applyColumnManagement, type ColumnManagementConfig } from '@shared/lib/tables/utils/column-management'
import { STATUS_REGISTRY } from '@shared/lib/filters/status-registry'
import type { Payment } from '@shared/types/payment.types'

interface PaymentTableProps {
  data: Payment[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (payment: Payment) => void
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
  onViewCustomer?: (payment: Payment) => void
  onSendReceipt?: (payment: Payment) => void
  onFlag?: (payment: Payment) => void
  onAddNote?: (payment: Payment) => void
  onCapture?: (payment: Payment) => void
  onRefund?: (payment: Payment) => void
  onCancel?: (payment: Payment) => void
  onRetry?: (payment: Payment) => void
  onCopyId?: (payment: Payment) => void
  onSelectSucceededOnly?: (fn: () => void) => void
  activeItemId?: string
}

export function PaymentTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  statusFilter,
  emptyStateDescription,
  managedColumns,
  onViewCustomer,
  onSendReceipt,
  onFlag,
  onAddNote,
  onCapture,
  onRefund,
  onCancel,
  onRetry,
  onCopyId,
  onSelectSucceededOnly,
  activeItemId,
}: PaymentTableProps) {
  const columns = useMemo(() => {
    if (managedColumns) {
      return applyColumnManagement(Object.values(PAYMENT_COLUMNS), managedColumns)
    }
    return getPaymentColumns(statusFilter || 'all')
  }, [managedColumns, statusFilter])

  const rowActions = getPaymentRowActions({ 
    onViewCustomer,
    onSendReceipt,
    onFlag,
    onAddNote,
    onCapture,
    onRefund,
    onCancel,
    onCopyId,
  })

  const hoverActions = getPaymentHoverActions({ 
    onSendReceipt,
    onCapture,
    onRefund,
    onRetry,
  })

  return (
    <DataTable
      data={data}
      columns={columns as any}
      pagination={pagination}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(payment) => String(payment.transactionRef)}
      onRowClick={onRowClick}
      loading={loading}
      rowActions={rowActions}
      hoverActions={hoverActions}
      emptyStateDescription={emptyStateDescription}
      className="bg-background"
      getItemStatus={(payment) => payment.status || 'unknown'}
      allowedStatuses={[...STATUS_REGISTRY.payment.mappings.succeeded]}
      onSelectSucceededOnly={onSelectSucceededOnly}
      activeItemId={activeItemId}
    />
  )
} 
