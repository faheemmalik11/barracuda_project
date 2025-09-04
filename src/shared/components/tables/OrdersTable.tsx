import { useMemo } from 'react'
import { DataTable } from "@shared/components/ui/data-table"
import { getOrderColumns } from "@shared/lib/tables/columns/order-columns"
import { getOrderRowActions, getOrderHoverActions } from "@shared/lib/tables/actions/order-actions"
import { mockOrders } from "@shared/data/mockOrders"
import type { Order } from "@shared/types/orders"

interface OrdersTableProps {
  orders?: Order[]
  selectedOrders?: string[]
  onSelectionChange?: (selected: string[]) => void
  onOrderClick?: (order: Order) => void
  onShipOrder?: (order: Order) => void
  isLoading?: boolean
}

export function OrdersTable({
  orders = mockOrders,
  selectedOrders = [],
  onSelectionChange = () => {},
  onOrderClick,
  onShipOrder,
  isLoading = false,
}: OrdersTableProps) {

  const rowActions = useMemo(() => getOrderRowActions({ onShip: onShipOrder }), [onShipOrder])
  const hoverActions = useMemo(() => getOrderHoverActions({ onShip: onShipOrder }), [onShipOrder])

  return (
    <DataTable
      data={orders}
      columns={getOrderColumns() as any}
      selectedItems={selectedOrders}
      onSelectionChange={onSelectionChange}
      getItemId={(order) => order.id}
      onRowClick={onOrderClick}
      rowActions={rowActions}
      hoverActions={hoverActions}
      loading={isLoading}
      emptyState="No orders found."
      className="w-full"
    />
  )
}
