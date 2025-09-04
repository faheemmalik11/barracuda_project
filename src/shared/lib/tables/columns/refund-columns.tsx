import type { Column } from "@shared/types/data-table"
import type { Refund } from "@shared/types/refunds"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { 
  createCurrencyColumn,
  createStatusColumn,
  createPaymentMethodColumn,
  createDateColumn
} from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"

export const REFUND_COLUMNS: Record<string, Column<Refund>> = {
  amount: createCurrencyColumn<Refund>("amount", "Amount"),
  status: createStatusColumn<Refund>("refund"),
  customer: {
    key: "customer",
    header: "Customer",
    width: 200,
    render: (refund: Refund) => (
      <TruncatedCell
        maxWidth={200}
        className="text-muted-foreground group-hover:text-foreground font-normal"
        title={refund.customer?.name || refund.customer?.email || "Unknown"}
      >
        {refund.customer?.name || refund.customer?.email || "Unknown"}
      </TruncatedCell>
    ),
  },
  reason: {
    key: "reason",
    header: "Reason",
    width: 180,
    render: (refund: Refund) => (
      <TruncatedCell
        maxWidth={180}
        className="text-muted-foreground group-hover:text-foreground font-normal capitalize"
        title={refund.reason?.replace(/_/g, " ") || "Unknown"}
      >
        {refund.reason?.replace(/_/g, " ") || "Unknown"}
      </TruncatedCell>
    ),
  },
  paymentMethod: createPaymentMethodColumn<Refund>(),
  created: createDateColumn<Refund>("created", "Created", 180),
}

export const REFUND_STATUS_CONFIG = {
  all: ["amount", "status", "customer", "reason", "paymentMethod", "created"],
} as const

export const getRefundColumns = (status: string = 'all'): Column<Refund>[] => {
  const keys = REFUND_STATUS_CONFIG[status as keyof typeof REFUND_STATUS_CONFIG] || REFUND_STATUS_CONFIG.all
  return keys.map(key => REFUND_COLUMNS[key]).filter(Boolean)
}


export const getRefundColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(REFUND_STATUS_CONFIG[status as keyof typeof REFUND_STATUS_CONFIG] || REFUND_STATUS_CONFIG.all)
  return Object.entries(REFUND_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["amount", "status"].includes(key as any),
    order: index
  }))
}