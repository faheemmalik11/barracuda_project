import type { Column } from "@shared/types/data-table"
import type { Payment } from "@shared/types/payment.types"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { 
  AmountCell, 
  StatusCell, 
  PaymentMethodCell, 
  DescriptionCell, 
  CustomerCell, 
  DateCell,
  RefundReasonCell,
  RequestedCell,
  RefundedByCell,
  StageCell,
  DisputeReasonCell,
  WinLikelihoodCell,
  EvidenceDueByCell,
  EvidenceSubmittedByCell,
  DisputedOnCell,
  FailureReasonCell,
  FailedCell,
  CaptureByCell,
} from "@shared/lib/tables/cells/payment-cells"
import { TextCell } from "@shared/lib/tables/cells/common-cells"

export const PAYMENT_COLUMNS: Record<string, Column<Payment>> = {
  amount: {
    key: "amount",
    header: "Amount",
    width: 120,
    align: "left",
    render: (payment: Payment) => <AmountCell payment={payment} />,
  },
  status: {
    key: "status",
    header: "Status",
    width: 120,
    render: (payment: Payment) => <StatusCell payment={payment} />,
  },
  customer: {
    key: "customer",
    header: "Customer",
    width: 180,
    render: (payment: Payment) => <CustomerCell payment={payment} />,
  },
  description: {
    key: "description",
    header: "Description",
    width: 160,
    render: (payment: Payment) => <DescriptionCell payment={payment} />,
  },
  paymentMethod: {
    key: "paymentMethod",
    header: "Payment method",
    width: 160,
    render: (payment: Payment) => <PaymentMethodCell payment={payment} />,
  },
  created: {
    key: "createdAt",
    header: "Date",
    width: 130,
    render: (payment: Payment) => <DateCell payment={payment} />,
  },
  channel: {
    key: "channel",
    header: "Channel",
    width: 100,
    render: (payment: Payment) => <TextCell value={payment.channel} />,
  },
  refundReason: {
    key: "refundReason",
    header: "Refund reason",
    width: 150,
    render: (payment: Payment) => <RefundReasonCell payment={payment} />,
  },
  requested: {
    key: "requested",
    header: "Requested",
    width: 130,
    render: (payment: Payment) => <RequestedCell payment={payment} />,
  },
  refunded: {
    key: "refunded",
    header: "Refunded",
    width: 130,
    render: (payment: Payment) => <DateCell payment={payment} />,
  },
  refundedBy: {
    key: "refundedBy",
    header: "Refunded by",
    width: 150,
    render: () => <RefundedByCell />,
  },
  eligibility: {
    key: "eligibility",
    header: "Eligibility",
    width: 120,
    render: (payment: Payment) => <TextCell value={payment.eligibility} />,
  },
  stage: {
    key: "stage",
    header: "Stage",
    width: 120,
    render: (payment: Payment) => <StageCell payment={payment} />,
  },
  disputeReason: {
    key: "disputeReason",
    header: "Dispute reason",
    width: 150,
    render: (payment: Payment) => <DisputeReasonCell payment={payment} />,
  },
  disputedOn: {
    key: "disputedOn",
    header: "Disputed on",
    width: 130,
    render: (payment: Payment) => <DisputedOnCell payment={payment} />,
  },
  winLikelihood: {
    key: "winLikelihood",
    header: "WIN Likelihood",
    width: 150,
    render: () => <WinLikelihoodCell />,
  },
  evidenceDueBy: {
    key: "evidenceDueBy",
    header: "Evidence due by",
    width: 150,
    render: (payment: Payment) => <EvidenceDueByCell payment={payment} />,
  },
  evidenceSubmittedBy: {
    key: "evidenceSubmittedBy",
    header: "Evidence submitted by",
    width: 180,
    render: () => <EvidenceSubmittedByCell />,
  },
  failureReason: {
    key: "failureReason",
    header: "Failure reason",
    width: 150,
    render: (payment: Payment) => <FailureReasonCell payment={payment} />,
  },
  failed: {
    key: "failed",
    header: "Failed",
    width: 130,
    render: (payment: Payment) => <FailedCell payment={payment} />,
  },
  captureBy: {
    key: "captureBy",
    header: "Capture by",
    width: 130,
    render: (payment: Payment) => <CaptureByCell payment={payment} />,
  },
  store: {
    key: "store",
    header: "Store",
    width: 150,
    render: (payment: Payment) => <TextCell value={payment.store} />,
  },
  lastUpdated: {
    key: "lastUpdated",
    header: "Last Updated",
    width: 130,
    render: (payment: Payment) => <DateCell payment={payment} />,
  },
  declineReason: {
    key: "declineReason",
    header: "Decline Reason",
    width: 150,
    render: (payment: Payment) => <TextCell value={payment.declineReason} />,
  },
  riskScore: {
    key: "riskScore",
    header: "Risk Score",
    width: 120,
    render: (payment: Payment) => <TextCell value={payment.riskScore?.toString()} />,
  },
  merchant: {
    key: "merchant",
    header: "Merchant",
    width: 150,
    render: (payment: Payment) => <TextCell value={payment.merchant} />,
  },
  program: {
    key: "program",
    header: "Program",
    width: 150,
    render: (payment: Payment) => <TextCell value={payment.program} />,
  },
  organization: {
    key: "organization",
    header: "Organization",
    width: 150,
    render: (payment: Payment) => <TextCell value={payment.organization} />,
  },
  bank: {
    key: "bank",
    header: "Bank",
    width: 120,
    render: (payment: Payment) => <TextCell value={payment.bank} />,
  },
  productPlatform: {
    key: "productPlatform",
    header: "Product Platform",
    width: 150,
    render: (payment: Payment) => <TextCell value={payment.productPlatform} />,
  },
  processor: {
    key: "processor",
    header: "Processor",
    width: 130,
    render: (payment: Payment) => <TextCell value={payment.processor} />,
  },
}

export const PAYMENT_STATUS_CONFIG = {
  all: ['amount', 'status', 'customer', 'description', 'paymentMethod', 'created', 'channel'],
  succeeded: ['amount', 'status', 'customer', 'description', 'paymentMethod', 'created', 'channel'],
  refunded: ['amount', 'status', 'refundReason', 'customer', 'description', 'paymentMethod', 'created', 'requested', 'refunded', 'refundedBy', 'eligibility'],
  disputed: ['amount', 'status', 'stage', 'disputeReason', 'customer', 'description', 'paymentMethod', 'created', 'refunded', 'disputedOn', 'winLikelihood', 'evidenceDueBy', 'evidenceSubmittedBy'],
  failed: ['amount', 'status', 'failureReason', 'customer', 'description', 'paymentMethod', 'created', 'failed'],
  uncaptured: ['amount', 'status', 'captureBy', 'customer', 'description', 'paymentMethod', 'created', 'channel'],
} as const

export const getPaymentColumns = (status: string = 'all'): Column<Payment>[] => {
  const keys = PAYMENT_STATUS_CONFIG[status as keyof typeof PAYMENT_STATUS_CONFIG] || PAYMENT_STATUS_CONFIG.all
  return keys.map(key => PAYMENT_COLUMNS[key]).filter(Boolean)
}


export const getPaymentColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(PAYMENT_STATUS_CONFIG[status as keyof typeof PAYMENT_STATUS_CONFIG] || PAYMENT_STATUS_CONFIG.all)
  return Object.entries(PAYMENT_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ['amount', 'status'].includes(key as any),
    order: index
  }))
}