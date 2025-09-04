import type { Column } from "@shared/types/data-table"
import type { PaymentLink } from "@shared/types/payment-links"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createCurrencyColumn, createStatusColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"

export const PAYMENT_LINK_COLUMNS: Record<string, Column<PaymentLink>> = {
  name: {
    key: "name",
    header: "Name",
    width: 200,
    render: (link: PaymentLink) => (
      <TruncatedCell className="font-medium" maxWidth={200} title={link.name}>
        {link.name}
      </TruncatedCell>
    )
  },
  status: createStatusColumn<PaymentLink>("payment-link"),
  type: {
    key: "type",
    header: "Type",
    width: 120,
    render: (link: PaymentLink) => (
      <TruncatedCell maxWidth={120} title={link.type}>
        {link.type}
      </TruncatedCell>
    )
  },
  environment: {
    key: "environment",
    header: "Environment",
    width: 120,
    render: (link: PaymentLink) => (
      <TruncatedCell maxWidth={120} title={link.environment || 'Live'}>
        {link.environment || 'Live'}
      </TruncatedCell>
    )
  },
  description: {
    key: "description",
    header: "Description",
    width: 200,
    render: (link: PaymentLink) => (
      <TruncatedCell maxWidth={200} title={link.description}>
        {link.description || '-'}
      </TruncatedCell>
    )
  },
  transactions30d: {
    key: "conversions",
    header: "Transactions (30d)",
    width: 140,
    align: "right",
    render: (link: PaymentLink) => (
      <TruncatedCell className="text-right" maxWidth={140} title={link.conversions?.toString()}>
        {link.conversions || 0}
      </TruncatedCell>
    )
  },
  volume30d: {
    key: "totalRevenue",
    header: "Volume (30d)",
    width: 120,
    align: "right",
    render: (link: PaymentLink) => {
      const amount = link.totalRevenue || 0
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(amount / 100)
      return (
        <TruncatedCell className="text-right font-medium" maxWidth={120} title={formatted}>
          {formatted}
        </TruncatedCell>
      )
    }
  },
  success: {
    key: "views",
    header: "Success",
    width: 100,
    align: "right",
    render: (link: PaymentLink) => {
      const rate = link.views > 0 ? ((link.conversions || 0) / link.views) * 100 : 0
      return (
        <TruncatedCell className="text-right font-medium" maxWidth={100} title={`${rate.toFixed(1)}%`}>
          {rate.toFixed(1)}%
        </TruncatedCell>
      )
    }
  },
  lastUsed: createDateColumn<PaymentLink>("lastUsed", "Last Used", 150, false),
  created: createDateColumn<PaymentLink>("created", "Created", 150, false),
}

export const PAYMENT_LINK_STATUS_CONFIG = {
  all: ["name", "status", "type", "environment", "description", "transactions30d", "volume30d", "success", "lastUsed", "created"],
  active: ["name", "status", "type", "environment", "description", "transactions30d", "volume30d", "success", "lastUsed", "created"],
  inactive: ["name", "status", "type", "environment", "description", "created"],
} as const

export const getPaymentLinkColumns = (status: string = 'all'): Column<PaymentLink>[] => {
  const keys = PAYMENT_LINK_STATUS_CONFIG[status as keyof typeof PAYMENT_LINK_STATUS_CONFIG] || PAYMENT_LINK_STATUS_CONFIG.all
  return keys.map(key => PAYMENT_LINK_COLUMNS[key]).filter(Boolean)
}

export const getPaymentLinkColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(PAYMENT_LINK_STATUS_CONFIG[status as keyof typeof PAYMENT_LINK_STATUS_CONFIG] || PAYMENT_LINK_STATUS_CONFIG.all)
  return Object.entries(PAYMENT_LINK_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["name", "status"].includes(key as any),
    order: index
  }))
}
