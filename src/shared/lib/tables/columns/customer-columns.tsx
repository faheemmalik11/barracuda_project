import type { Column } from "@shared/types/data-table"
import type { Customer } from "@shared/types/customers"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { 
  createTextColumn,
  createStatusColumn,
  createLocationColumn,
  createCurrencyColumn,
  createDateColumn
} from "./column-factories"
import { AppStatusBadge } from "@shared/components/ui/status-badge/AppStatusBadge"
import { TruncatedCell } from "../cells/TruncatedCell"
import { CurrencyCell, TextCell, IconTextCell } from "../cells/common-cells"
import { CreditCard } from "lucide-react"


export const CUSTOMER_COLUMNS: Record<string, Column<Customer>> = {
  name: createTextColumn<Customer>("name", "Name", 200, "font-bold"),
  email: createTextColumn<Customer>("email", "Email", 200),
  status: createStatusColumn<Customer>("customer"),
  risk: {
    key: "risk",
    header: "Risk",
    width: 100,
    render: (customer: Customer) => {
      const riskScore = customer.riskScore || 0
      const riskColor = riskScore >= 40 ? 'error' : riskScore >= 30 ? 'warning' : 'success'
      
      return (
        <div className="flex items-center gap-2">
          <AppStatusBadge 
            variant="generic" 
            text={customer.riskLevel || 'N/A'}
            color={riskColor}
          />
          {customer.riskScore && (
            <span className="text-xs text-muted-foreground">{customer.riskScore}</span>
          )}
        </div>
      )
    },
  },
  reason: {
    key: "reason",
    header: "Reason",
    width: 150,
    render: (customer: Customer) => (
      <TruncatedCell maxWidth={150} className="text-sm text-muted-foreground">
        {customer.reason || "N/A"}
      </TruncatedCell>
    ),
  },
  defaultPaymentMethod: {
    key: "defaultPaymentMethod",
    header: "Default payment method",
    width: 180,
    render: (customer: Customer) => (
      <IconTextCell icon={<CreditCard className="h-3 w-3 text-muted-foreground" />}>
        <div className="text-muted-foreground group-hover:text-foreground font-normal">
          {customer.defaultPaymentMethod || "None"}
        </div>
      </IconTextCell>
    ),
  },
  cardholderName: {
    key: "cardholderName",
    header: "Cardholder name",
    width: 150,
    render: (customer: Customer) => (
      <TruncatedCell maxWidth={150} className="text-sm text-muted-foreground">
        {customer.cardholderName || "N/A"}
      </TruncatedCell>
    ),
  },
  location: createLocationColumn<Customer>(150),
  totalSpent: createCurrencyColumn<Customer>("totalSpent", "LTV ($)"),
  refunds: {
    key: "refunds",
    header: "Refunds ($)",
    width: 150,
    align: "right" as const,
    render: (customer: Customer) => (
      <div className="text-right">
        <CurrencyCell amount={customer.refunds as number || 0} />
        <div className="text-xs text-muted-foreground">
          #{(customer.refundCount as number) || 0}
        </div>
      </div>
    ),
  },
  disputeLosses: {
    key: "disputeLosses",
    header: "Dispute losses ($)",
    width: 150,
    align: "right" as const,
    render: (customer: Customer) => (
      <div className="text-right">
        <CurrencyCell amount={customer.disputeLosses as number || 0} />
        <div className="text-xs text-muted-foreground">
          #{(customer.disputeCount as number) || 0}
        </div>
      </div>
    ),
  },
  created: createDateColumn<Customer>("created", "Created"),
  restricted: createDateColumn<Customer>("restricted", "Restricted"),
  terminated: createDateColumn<Customer>("terminated", "Terminated"),
  lastActivity: createDateColumn<Customer>("lastActivity", "Last activity"),
  delinquent: {
    key: "delinquent",
    header: "Delinquent",
    width: 100,
    align: "center",
    render: (customer: Customer) => {
      const value = customer.delinquent
      if (value === null || value === undefined) return <TextCell value="—" />
      
      return (
        <AppStatusBadge 
          variant="generic" 
          text={value ? "Yes" : "No"}
          color={value ? "success" : "neutral"}
        />
      )
    },
  },
  type: {
    key: "type",
    header: "Type",
    width: 140,
    render: (customer: Customer) => (
      <TextCell value={customer.type} />
    ),
  },
  businessVatId: {
    key: "businessVatId",
    header: "Business VAT ID",
    width: 140,
    render: (customer: Customer) => (
      <TextCell value={customer.businessVatId} />
    ),
  },
  taxLocationRecognized: {
    key: "taxLocationRecognized",
    header: "Tax location recognized",
    width: 160,
    align: "center",
    render: (customer: Customer) => {
      const value = customer.taxLocationRecognized
      if (value === null || value === undefined) return <TextCell value="—" />
      
      return (
        <AppStatusBadge 
          variant="generic" 
          text={value ? "Yes" : "No"}
          color={value ? "success" : "neutral"}
        />
      )
    },
  },
  accountBalance: createCurrencyColumn<Customer>("accountBalance", "Account balance"),
  averageOrder: createCurrencyColumn<Customer>("averageOrder", "Average order"),
  spend: createCurrencyColumn<Customer>("spend", "Spend ($)"),
  store: createTextColumn<Customer>("store", "Store"),
  merchant: createTextColumn<Customer>("merchant", "Merchant"),
  program: createTextColumn<Customer>("program", "Program"),
  organization: createTextColumn<Customer>("organization", "Organization", 140),
  bank: createTextColumn<Customer>("bank", "Bank"),
  productPlatform: createTextColumn<Customer>("productPlatform", "Product platform", 140),
  processor: createTextColumn<Customer>("processor", "Processor"),
}

export const CUSTOMER_STATUS_CONFIG = {
  all: ['name', 'email', 'status', 'defaultPaymentMethod', 'cardholderName', 'location', 'created', 'lastActivity'],
  active: ['name', 'email', 'status', 'defaultPaymentMethod', 'cardholderName', 'totalSpent', 'location', 'created', 'lastActivity'],
  risky: ['risk', 'name', 'email', 'status', 'defaultPaymentMethod', 'cardholderName', 'totalSpent', 'spend', 'refunds', 'disputeLosses', 'location', 'created', 'lastActivity'],
  in_review: ['risk', 'name', 'email', 'status', 'reason', 'defaultPaymentMethod', 'cardholderName', 'totalSpent', 'spend', 'refunds', 'disputeLosses', 'location', 'created', 'lastActivity'],
  restricted: ['risk', 'name', 'email', 'status', 'reason', 'defaultPaymentMethod', 'cardholderName', 'totalSpent', 'spend', 'refunds', 'disputeLosses', 'location', 'created', 'restricted', 'lastActivity'],
  terminated: ['risk', 'name', 'email', 'status', 'reason', 'defaultPaymentMethod', 'cardholderName', 'totalSpent', 'spend', 'refunds', 'disputeLosses', 'location', 'created', 'terminated', 'lastActivity'],
} as const

export const getCustomerColumns = (status: string = 'all'): Column<Customer>[] => {
  const keys = CUSTOMER_STATUS_CONFIG[status as keyof typeof CUSTOMER_STATUS_CONFIG] || CUSTOMER_STATUS_CONFIG.all
  return keys.map(key => CUSTOMER_COLUMNS[key]).filter(Boolean)
}

export const getCustomerColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(CUSTOMER_STATUS_CONFIG[status as keyof typeof CUSTOMER_STATUS_CONFIG] || CUSTOMER_STATUS_CONFIG.all)
  return Object.entries(CUSTOMER_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ['name', 'status'].includes(key as any),
    order: index
  }))
}
