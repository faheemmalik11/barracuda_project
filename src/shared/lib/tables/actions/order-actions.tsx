import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Order } from "@shared/types/orders"
import { Truck, XCircle, Package, X } from "lucide-react"

type OrderActionHandlers = {
  onView?: (order: Order) => void
  onShip?: (order: Order) => void
  onCancel?: (order: Order) => void
  onFulfill?: (orderIds: string[]) => void
  onBulkCancel?: (orderIds: string[]) => void
}

export const getOrderBulkActions = (handlers: OrderActionHandlers = {}): BulkAction[] => [
  {
    key: "fulfill",
    label: "Fulfill Orders",
    icon: <Package className="h-4 w-4" />,
    variant: "default",
    onClick: (ids) => handlers.onFulfill?.(ids) ?? alert(`Fulfilling orders: ${ids.join(", ")}`),
    disabled: (ids) => ids.length === 0,
  },
  {
    key: "cancel",
    label: "Cancel Orders",
    icon: <X className="h-4 w-4" />,
    variant: "destructive",
    onClick: (ids) => handlers.onBulkCancel?.(ids) ?? alert(`Canceling orders: ${ids.join(", ")}`),
    disabled: (ids) => ids.length === 0,
  },
]

export const getOrderRowActions = (handlers: OrderActionHandlers = {}): TableAction<Order>[] => [
  {
    key: "ship",
    label: "Mark as Shipped",
    icon: <Truck className="h-4 w-4" />,
    onClick: (order) => handlers.onShip?.(order),
    condition: (order) => order.status === "processing" || order.status === "pending",
  },
  {
    key: "cancel",
    label: "Cancel Order",
    icon: <XCircle className="h-4 w-4" />,
    onClick: (order) => handlers.onCancel?.(order),
    condition: (order) => order.status === "pending" || order.status === "processing",
    variant: "destructive",
  },
]

export const getOrderHoverActions = (handlers: OrderActionHandlers = {}): TableAction<Order>[] => [
  {
    key: "ship",
    label: "Mark as Shipped",
    icon: <Truck className="h-4 w-4" />,
    onClick: (order) => handlers.onShip?.(order),
    condition: (order) => order.status === "processing" || order.status === "pending",
  },
]
