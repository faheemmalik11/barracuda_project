import type { Column } from "@shared/types/data-table"
import type { Merchant } from "@features/merchants/types/merchants.types"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { 
  createTextColumn,
  createStatusColumn,
  createCurrencyColumn,
  createDateColumn,
  createRiskColumn
} from "./column-factories"
import { CurrencyCell } from "../cells/common-cells"



export const MERCHANT_COLUMNS: Record<string, Column<Merchant>> = {
  dba: createTextColumn<Merchant>("name", "Business name", 200),
  status: createStatusColumn<Merchant>("merchant"),

  program: createTextColumn<Merchant>("program", "Program"),
  country: createTextColumn<Merchant>("country", "Country", 100),
  created: createDateColumn<Merchant>("created", "Created"),
  volume: createCurrencyColumn<Merchant>("monthlyVolume", "Volume"),
  risk: createRiskColumn<Merchant>(),
  lastActive: createDateColumn<Merchant>("lastActivity", "Last active"),
  refunds: {
    key: "refunds",
    header: "Refunds / Rate",
    width: 150,
    render: (merchant: Merchant) => {
      const refundAmount = (merchant as any).refundAmount || 0
      const refundRate = (merchant as any).refundRate || 0
      return (
        <div className="text-right">
          <CurrencyCell amount={refundAmount} className="text-foreground text-sm" />
          <div className="text-muted-foreground text-xs">{refundRate.toFixed(1)}%</div>
        </div>
      )
    },
  },
  disputes: {
    key: "disputes",
    header: "Disputes $ / Rate",
    width: 150,
    render: (merchant: Merchant) => {
      const disputeAmount = (merchant as any).disputeAmount || 0
      const disputeRate = (merchant as any).disputeRate || 0
      return (
        <div className="text-right">
          <CurrencyCell amount={disputeAmount} className="text-foreground text-sm" />
          <div className="text-muted-foreground text-xs">{disputeRate.toFixed(1)}%</div>
        </div>
      )
    },
  },
  reason: createTextColumn<Merchant>("reason", "Reason", 150),
  rejectedBy: createTextColumn<Merchant>("rejectedBy", "Rejected by"),
  rejectedOn: createDateColumn<Merchant>("rejectedOn", "Rejected on"),
  rejectionReason: createTextColumn<Merchant>("rejectionReason", "Rejection reason", 150),
  terminatedBy: createTextColumn<Merchant>("terminatedBy", "Terminated by"),
  terminatedOn: createDateColumn<Merchant>("terminatedOn", "Terminated on"),
  terminationReason: createTextColumn<Merchant>("terminationReason", "Termination reason", 150),
}

export const MERCHANT_STATUS_CONFIG = {
  all: ["dba", "status", "program", "volume", "country", "created"],
  risky: ["dba", "status", "reason", "risk", "refunds", "disputes", "country", "created"],
  rejected: ["dba", "status", "rejectedBy", "rejectedOn", "rejectionReason", "country", "created"],
  terminated: ["dba", "status", "terminatedBy", "terminatedOn", "terminationReason", "country", "created"],
} as const

export const getMerchantColumns = (status: string = 'all'): Column<Merchant>[] => {
  const keys = MERCHANT_STATUS_CONFIG[status as keyof typeof MERCHANT_STATUS_CONFIG] || MERCHANT_STATUS_CONFIG.all
  return keys.map(key => MERCHANT_COLUMNS[key]).filter(Boolean)
}

export const getMerchantColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(MERCHANT_STATUS_CONFIG[status as keyof typeof MERCHANT_STATUS_CONFIG] || MERCHANT_STATUS_CONFIG.all)
  return Object.entries(MERCHANT_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ['dba', 'status'].includes(key as any),
    order: index
  }))
}
