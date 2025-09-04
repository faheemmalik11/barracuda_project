import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import { getCustomerColumns, CUSTOMER_COLUMNS } from '@shared/lib/tables/columns/customer-columns'
import { getCustomerRowActions } from '@shared/lib/tables/actions/customer-actions'
import { applyColumnManagement, type ColumnManagementConfig } from '@shared/lib/tables/utils/column-management'
import type { Customer } from '@shared/types/customers'

interface CustomerTableProps {
  data: Customer[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (customer: Customer) => void
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
  onViewCustomer?: (customer: Customer) => void
  onCopyId?: (customer: Customer) => void
  onCreatePayment?: (customer: Customer) => void
  onCreateSubscription?: (customer: Customer) => void
  onCreateInvoice?: (customer: Customer) => void
  onViewProfile?: (customer: Customer) => void
  onFlag?: (customer: Customer) => void
  onAddNote?: (customer: Customer) => void
  onBlock?: (customer: Customer) => void
  activeItemId?: string
}

export function CustomerTable({
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
  onCopyId,
  onCreatePayment,
  onCreateSubscription,
  onCreateInvoice,
  onViewProfile,
  onFlag,
  onAddNote,
  onBlock,
  activeItemId,
}: CustomerTableProps) {
  const columns = useMemo(() => {
    if (managedColumns) {
      return applyColumnManagement(Object.values(CUSTOMER_COLUMNS), managedColumns)
    }
    return getCustomerColumns(statusFilter || 'all')
  }, [managedColumns, statusFilter])

  const unavailableItems = useMemo(() => 
    data
      .filter(customer => ["terminated", "suspended"].includes(customer.status))
      .map(customer => customer.id), 
    [data]
  )

  const rowActions = useMemo(() => getCustomerRowActions({
    onViewCustomer,
    onCopyCustomerId: onCopyId,
    onCreatePayment,
    onCreateSubscription,
    onCreateInvoice,
    onViewProfile,
    onFlag,
    onAddNote,
    onBlock,
  }), [onViewCustomer, onCopyId, onCreatePayment, onCreateSubscription, onCreateInvoice, onViewProfile, onFlag, onAddNote, onBlock])


  return (
    <DataTable
      data={data}
      columns={columns}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(customer) => customer.id}
      onRowClick={onRowClick}
      rowActions={rowActions}
      pagination={pagination}
      loading={loading}
      unavailableItems={unavailableItems}
      emptyStateDescription={emptyStateDescription}
      className="bg-background"
      getItemStatus={(customer) => customer.status || 'unknown'}
      activeItemId={activeItemId}
    />
  )
}