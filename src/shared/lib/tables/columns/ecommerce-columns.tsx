import type { Column } from "@shared/types/data-table"
import type { Ecommerce } from "@features/ecommerce/types/ecommerce.types"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createCurrencyColumn, createStatusColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"

export const ECOMMERCE_COLUMNS: Record<string, Column<Ecommerce>> = {
  name: {
    key: "name",
    header: "Name",
    width: 200,
    render: (ecommerce: Ecommerce) => (
      <TruncatedCell className="font-bold" maxWidth={200} title={ecommerce.name}>
        {ecommerce.name}
      </TruncatedCell>
    )
  },
  status: createStatusColumn<Ecommerce>("ecommerce"),
  type: {
    key: "type",
    header: "Type",
    width: 140,
    render: (ecommerce: Ecommerce) => (
      <TruncatedCell maxWidth={140} title={ecommerce.type}>
        {ecommerce.type}
      </TruncatedCell>
    )
  },
  environment: {
    key: "environment",
    header: "Environment",
    width: 120,
    render: (ecommerce: Ecommerce) => (
      <TruncatedCell maxWidth={120} title={ecommerce.environment}>
        {ecommerce.environment}
      </TruncatedCell>
    )
  },
  description: {
    key: "description",
    header: "Description",
    width: 200,
    render: (ecommerce: Ecommerce) => (
      <TruncatedCell maxWidth={200} title={ecommerce.description}>
        {ecommerce.description}
      </TruncatedCell>
    )
  },
  transactions30d: {
    key: "transactions30d",
    header: "Transactions (30d)",
    width: 140,
    align: "right",
    render: (ecommerce: Ecommerce) => (
      <TruncatedCell className="text-right" maxWidth={140} title={ecommerce.transactions30d?.toString()}>
        {ecommerce.transactions30d}
      </TruncatedCell>
    )
  },
  volume30d: createCurrencyColumn<Ecommerce>("volume30d", "Volume (30d)"),
  successRate: {
    key: "successRate",
    header: "Success Rate",
    width: 120,
    align: "right",
    render: (ecommerce: Ecommerce) => {
      const rate = ecommerce.successRate || 0
      return (
        <TruncatedCell className="text-right font-medium" maxWidth={120} title={`${rate}%`}>
          {rate}%
        </TruncatedCell>
      )
    }
  },
  lastUsed: createDateColumn<Ecommerce>("lastUsed", "Last Used", 150, false),
  created: createDateColumn<Ecommerce>("created", "Created", 150, false),
}

export const ECOMMERCE_STATUS_CONFIG = {
  all: ["name", "status", "type", "environment", "description", "transactions30d", "volume30d", "successRate", "lastUsed", "created"],
  active: ["name", "status", "type", "environment", "description", "transactions30d", "volume30d", "successRate", "lastUsed", "created"],
  inactive: ["name", "status", "type", "environment", "description", "created"],
} as const

export const getEcommerceColumns = (status: string = 'all'): Column<Ecommerce>[] => {
  const keys = ECOMMERCE_STATUS_CONFIG[status as keyof typeof ECOMMERCE_STATUS_CONFIG] || ECOMMERCE_STATUS_CONFIG.all
  return keys.map(key => ECOMMERCE_COLUMNS[key]).filter(Boolean)
}

export const getEcommerceColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(ECOMMERCE_STATUS_CONFIG[status as keyof typeof ECOMMERCE_STATUS_CONFIG] || ECOMMERCE_STATUS_CONFIG.all)
  return Object.entries(ECOMMERCE_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["name", "status"].includes(key as any),
    order: index
  }))
}
