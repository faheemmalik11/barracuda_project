// Public API for the billing feature

// Pages (for routing)
export { BillingOverviewPage } from './pages/BillingOverviewPage'

// Components (if needed by other features)
export { BillingMetricCard, InvoiceCard, BillingHeader } from './components'

// Hooks (if needed by other features)
export { useBilling, useBillingActions } from './hooks'

// Utilities (if needed by other features)
export {
  formatCurrency,
  formatDate,
  formatNumber,
  getTrendColor,
  calculateInvoiceTotal,
  formatPercentageChange,
  isInvoiceOverdue,
  getStatusText
} from './utils'

// Types (if needed by other features)
export type { 
  BillingMetric,
  Invoice,
  InvoiceItem,
  BillingOverview,
  CreateInvoiceData,
  InvoiceFilters,
  BillingMetricIcon,
  BillingTrend,
  InvoiceStatus
} from './types/billing.types'

// Don't export internal implementation details