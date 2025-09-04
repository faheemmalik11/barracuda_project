import type { Column } from "@shared/types/data-table"
import type { Dispute } from "@shared/types/disputes"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createCurrencyColumn, createStatusColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"

export const DISPUTE_COLUMNS: Record<string, Column<Dispute>> = {
  amount: createCurrencyColumn<Dispute>("amount", "Amount"),
  status: createStatusColumn<Dispute>("dispute"),
  customer: {
    key: "customer",
    header: "Customer",
    width: 200,
    render: (dispute: Dispute) => (
      <TruncatedCell
        maxWidth={200}
        className="text-muted-foreground group-hover:text-foreground font-normal"
        title={dispute.customer?.email || dispute.customer?.name || "Unknown"}
      >
        {dispute.customer?.email || dispute.customer?.name || "Unknown"}
      </TruncatedCell>
    ),
  },
  reason: {
    key: "reason",
    header: "Reason",
    width: 180,
    render: (dispute: Dispute) => (
      <TruncatedCell
        maxWidth={180}
        className="text-muted-foreground group-hover:text-foreground font-normal capitalize"
        title={dispute.reason?.replace(/_/g, " ") || "Unknown"}
      >
        {dispute.reason?.replace(/_/g, " ") || "Unknown"}
      </TruncatedCell>
    ),
  },
  evidenceDueBy: createDateColumn<Dispute>("evidenceDueBy", "Evidence due", 150, false),
  created: createDateColumn<Dispute>("createdAt", "Created", 180, false),
}

export const DISPUTE_STATUS_CONFIG = {
  all: ["amount", "status", "customer", "reason", "evidenceDueBy", "created"],
} as const

export const getDisputeColumns = (status: string = 'all'): Column<Dispute>[] => {
  const keys = DISPUTE_STATUS_CONFIG[status as keyof typeof DISPUTE_STATUS_CONFIG] || DISPUTE_STATUS_CONFIG.all
  return keys.map(key => DISPUTE_COLUMNS[key]).filter(Boolean)
}

export const getDisputeColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(DISPUTE_STATUS_CONFIG[status as keyof typeof DISPUTE_STATUS_CONFIG] || DISPUTE_STATUS_CONFIG.all)
  return Object.entries(DISPUTE_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["amount", "status"].includes(key as any),
    order: index
  }))
}
