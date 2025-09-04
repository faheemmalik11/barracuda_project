import { useMemo } from 'react'
import { DataTable } from "@shared/components/ui/data-table"
import { getOrderColumns } from "@shared/lib/tables/columns/order-columns"
import { getOrderRowActions, getOrderHoverActions } from "@shared/lib/tables/actions/order-actions"
import { mockOrders } from "@shared/data/mockOrders"
import type { Order } from "@shared/types/orders"

interface OrderTableProps {
  // EntityListPage standardized props
  data?: Order[]
  selectedItems?: string[]
  onSelectionChange?: (selected: string[]) => void
  onRowClick?: (order: Order) => void
  pagination?: any
  loading?: boolean
  statusFilter?: string
  emptyStateDescription?: string
  managedColumns?: any[]
  onShipOrder?: (order: Order) => void
  
  // Additional props that might be passed from EntityListPage
  [key: string]: any
}

export function OrderTable({
  // EntityListPage standardized props
  data,
  selectedItems,
  onRowClick,
  loading,
  emptyStateDescription,
  onShipOrder,
  
  // Default onSelectionChange to prevent errors
  onSelectionChange = () => {}
}: OrderTableProps) {

  // Use standardized props with fallbacks
  const actualData = data || mockOrders
  const actualSelectedItems = selectedItems || []
  const actualOnRowClick = onRowClick
  const actualLoading = loading || false
  const actualEmptyState = emptyStateDescription || "No orders found."

  const rowActions = useMemo(() => getOrderRowActions({ onShip: onShipOrder }), [onShipOrder])
  const hoverActions = useMemo(() => getOrderHoverActions({ onShip: onShipOrder }), [onShipOrder])

  return (
    <DataTable
      data={actualData}
      columns={getOrderColumns() as any}
      selectedItems={actualSelectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(order) => order.id}
      onRowClick={actualOnRowClick}
      rowActions={rowActions}
      hoverActions={hoverActions}
      loading={actualLoading}
      emptyState={actualEmptyState}
      className="w-full"
    />
  )
}
