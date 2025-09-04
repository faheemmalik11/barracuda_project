/**
 * Represents a payment link for collecting payments
 */
export interface PaymentLink extends Record<string, unknown> {
  /** Unique identifier for the payment link */
  id: string
  /** Transaction reference for navigation compatibility */
  transactionRef: string
  /** Display name for the payment link */
  name: string
  /** Optional description */
  description?: string
  /** The actual payment URL */
  url: string
  /** Fixed amount (for fixed type links) */
  amount?: number
  /** Currency code (ISO 4217) */
  currency: string
  /** Type of payment link */
  type: "fixed" | "donation" | "subscription" | "one-time"
  /** Current status of the payment link */
  status: "active" | "inactive" | "expired"
  /** Creation timestamp */
  created: Date
  /** Last usage timestamp */
  lastUsed?: Date
  /** Expiration timestamp */
  expiresAt?: Date
  /** Whether to collect shipping information */
  collectShipping: boolean
  /** Whether to collect tax ID */
  collectTaxId: boolean
  /** Whether to allow promotion codes */
  allowPromotionCodes: boolean
  /** Custom form fields */
  customFields: CustomField[]
  /** Additional metadata */
  metadata: Record<string, string>
  /** Redirect URL on successful payment */
  successUrl?: string
  /** Redirect URL on payment cancellation */
  cancelUrl?: string
  
  // Analytics
  /** Number of times the link was viewed */
  views: number
  /** Number of successful conversions */
  conversions: number
  /** Total revenue generated */
  totalRevenue: number
  
  // Subscription specific
  /** Recurring billing interval for subscriptions */
  recurringInterval?: "day" | "week" | "month" | "year"
  /** Number of intervals between charges */
  recurringIntervalCount?: number
  /** Trial period in days */
  trialPeriodDays?: number
  
  // Product info
  /** Product name for display */
  productName?: string
  /** Product description */
  productDescription?: string
  /** Product image URLs */
  productImages?: string[]
}

/**
 * Custom field configuration for payment forms
 */
export interface CustomField {
  /** Unique identifier for the field */
  id: string
  /** Field key for form submission */
  key: string
  /** Display label for the field */
  label: string
  /** Input type for the field */
  type: "text" | "number" | "dropdown"
  /** Whether the field is required */
  required: boolean
  /** Available options for dropdown fields */
  options?: string[]
}

export interface PaymentLinkAnalytics {
  linkId: string
  date: Date
  views: number
  conversions: number
  revenue: number
  topCountries: Array<{ country: string; count: number }>
  topReferrers: Array<{ referrer: string; count: number }>
}

export interface PaymentLinkFormData {
  name: string
  description?: string
  type: "fixed" | "donation" | "subscription"
  amount?: number
  currency: string
  collectShipping: boolean
  collectTaxId: boolean
  allowPromotionCodes: boolean
  successUrl?: string
  cancelUrl?: string
  expiresAt?: Date
  recurringInterval?: "day" | "week" | "month" | "year"
  recurringIntervalCount?: number
  trialPeriodDays?: number
  productName?: string
  productDescription?: string
  customFields: CustomField[]
  metadata: Record<string, string>
}
