// Billing and invoicing types

export type BillingMetricIcon = 'dollar' | 'file' | 'users' | 'trending-up' | 'trending-down'
export type BillingTrend = 'up' | 'down' | 'neutral'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

/**
 * Represents a billing metric displayed on the dashboard
 */
export interface BillingMetric {
  id: string
  title: string
  value: string
  change: number
  trend: BillingTrend
  icon: BillingMetricIcon
  period?: string
}

/**
 * Represents an invoice in the billing system
 */
export interface Invoice {
  id: string
  customerId: string
  customerName: string
  customerEmail?: string
  amount: number
  currency: string
  status: InvoiceStatus
  dueDate: Date
  created: Date
  updated?: Date
  items: InvoiceItem[]
  notes?: string
  paymentTerms?: number // days
}

/**
 * Represents an item within an invoice
 */
export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  taxRate?: number
  taxAmount?: number
}

/**
 * Billing overview data for dashboard display
 */
export interface BillingOverview {
  totalRevenue: number
  outstandingAmount: number
  invoiceCount: number
  customerCount: number
  recentInvoices: Invoice[]
  metrics: BillingMetric[]
}

/**
 * Invoice creation data
 */
export interface CreateInvoiceData {
  customerId: string
  customerName: string
  customerEmail?: string
  amount: number
  currency: string
  dueDate: Date
  items: Omit<InvoiceItem, 'id' | 'total'>[]
  notes?: string
  paymentTerms?: number
}

/**
 * Invoice filters for list views
 */
export interface InvoiceFilters {
  status?: InvoiceStatus[]
  customerId?: string
  dateRange?: {
    start: Date
    end: Date
  }
  amountRange?: {
    min: number
    max: number
  }
}