// Analytics and reporting types
import type { PaymentLink } from '@shared/types/payment-links'

// Re-export PaymentLink from shared types for consistency
export type { PaymentLink }

/**
 * Represents a metric used in analytics dashboards
 */
export interface AnalyticsMetric {
  id: string
  name: string
  value: number
  change: number
  period: 'day' | 'week' | 'month' | 'year'
}

/**
 * Statistics for payment link performance by country
 */
export interface CountryStats {
  country: string
  count: number
  percentage: number
}

/**
 * Statistics for payment link performance by referrer source
 */
export interface ReferrerStats {
  referrer: string
  count: number
  percentage: number
}

/**
 * Activity log entry for audit trail and analytics
 */
export interface ActivityLog {
  date: Date
  action: string
  amount?: number
  country: string
  metadata?: Record<string, string>
}

/**
 * Conversion funnel analysis data
 */
export interface ConversionFunnel {
  step: string
  count: number
  conversionRate: number
  dropOffRate: number
}

/**
 * Revenue analytics aggregated data
 */
export interface RevenueAnalytics {
  totalRevenue: number
  averageOrderValue: number
  transactionCount: number
  refundRate: number
  period: string
}