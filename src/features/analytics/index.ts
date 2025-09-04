// Public API for the analytics feature

// Pages (for routing)
export { AnalyticsPage } from './pages/AnalyticsPage'

// Components (if needed by other features)
export { PaymentLinkAnalytics, MetricCard } from './components'

// Hooks (if needed by other features)
export { useAnalytics, usePaymentLinkAnalytics } from './hooks/useAnalytics'

// Utilities (if needed by other features)
export { formatCurrency, formatPercentage, calculateConversionRate } from './utils'

// Types (if needed by other features)
export type { 
  PaymentLink,
  AnalyticsMetric,
  CountryStats,
  ReferrerStats,
  ActivityLog,
  ConversionFunnel,
  RevenueAnalytics
} from './types/analytics.types'

// Don't export internal implementation details