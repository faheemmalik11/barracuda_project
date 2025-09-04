import type { Column } from "@shared/types/data-table"
import type { Order } from "@shared/types/orders"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createCurrencyColumn, createStatusColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"

export const ORDER_COLUMNS: Record<string, Column<Order>> = {
  id: {
    key: "id",
    header: "Order ID",
    width: 120,
    render: (order: Order) => (
      <TruncatedCell className="font-medium" maxWidth={120} title={order.id}>
        {order.id}
      </TruncatedCell>
    )
  },
  customer: {
    key: "customer",
    header: "Customer",
    width: 200,
    render: (order: Order) => {
      const customer = typeof order.customer === 'string' 
        ? { name: order.customer, email: '' }
        : order.customer || { name: 'Unknown Customer', email: '' }
      return (
        <TruncatedCell maxWidth={200} className="text-muted-foreground group-hover:text-foreground font-normal">
          <div>{customer.name}</div>
          {customer.email && <div className="text-xs text-muted-foreground">{customer.email}</div>}
        </TruncatedCell>
      )
    },
  },
  amount: createCurrencyColumn<Order>("amount", "Amount"),
  status: createStatusColumn<Order>("order"),
  items: {
    key: "items",
    header: "Items",
    width: 100,
    align: "center",
    render: (order: Order) => {
      const itemCount = Array.isArray(order.items) 
        ? order.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
        : order.items
      return (
        <TruncatedCell className="text-center text-muted-foreground" maxWidth={100}>
          {itemCount}
        </TruncatedCell>
      )
    }
  },
  created: createDateColumn<Order>("createdAt", "Created", 180, false),
}

export const ORDER_STATUS_CONFIG = {
  all: ["id", "customer", "amount", "status", "items", "created"],
} as const

export const getOrderColumns = (status: string = 'all'): Column<Order>[] => {
  const keys = ORDER_STATUS_CONFIG[status as keyof typeof ORDER_STATUS_CONFIG] || ORDER_STATUS_CONFIG.all
  return keys.map(key => ORDER_COLUMNS[key]).filter(Boolean)
}

export const getOrderColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(ORDER_STATUS_CONFIG[status as keyof typeof ORDER_STATUS_CONFIG] || ORDER_STATUS_CONFIG.all)
  return Object.entries(ORDER_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["id", "status"].includes(key as any),
    order: index
  }))
}
