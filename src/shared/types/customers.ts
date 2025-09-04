export interface Customer {
  id: string
  transactionRef: string
  name: string
  email: string
  phone?: string
  status: CustomerStatus
  created: string | Date
  lastPayment?: string | Date
  lastActivity?: string | Date
  totalSpent: number
  paymentCount: number
  defaultPaymentMethod?: string
  cardholderName?: string
  location?: string
  address?: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  riskLevel?: "low" | "medium" | "high"
  riskScore?: number
  verified: boolean
  notes?: string
  reason?: string
  refunds?: number
  refundCount?: number
  disputeLosses?: number
  disputeCount?: number
  restricted?: string | Date
  terminated?: string | Date
  delinquent?: boolean
  type?: "individual" | "business"
  businessVatId?: string
  taxLocationRecognized?: boolean
  accountBalance?: number
  averageOrder?: number
  spend?: number
  store?: string
  merchant?: string
  program?: string
  organization?: string
  bank?: string
  productPlatform?: string
  processor?: string
  [key: string]: unknown
}

export type CustomerStatus = "active" | "risky" | "in_review" | "pending_review" | "restricted" | "suspended" | "terminated" | "closed"

