import { defineEntityQueryConfig } from './createQueryUtils'
import type { BaseQueryFilters } from './types'
import type { AmountFilterValue } from '@shared/types/amountFilter'
import type { DateFilterValue } from '@shared/types/dateFilter'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

interface CommonQueryFields {
  status?: string[]
  dateRange?: DateFilterValue
  search?: string
}

export interface PaymentQueryFilters extends BaseQueryFilters, CommonQueryFields {
  amount?: AmountFilterValue
  currency?: string[]
}

export interface MerchantQueryFilters extends BaseQueryFilters, CommonQueryFields {
  monthlyVolume?: AmountFilterValue
  country?: string[]
  industry?: string[]
  riskLevel?: string[]
  verified?: boolean
}

export interface DisputeQueryFilters extends BaseQueryFilters, CommonQueryFields {
  amount?: AmountFilterValue
  reason?: string[]
  customerName?: string
  paymentId?: string
}

export interface CustomerQueryFilters extends BaseQueryFilters, CommonQueryFields {
  totalSpent?: AmountFilterValue
  location?: string[]
  riskLevel?: string[]
  verified?: boolean
  type?: string[]
  customers?: string[]
}

export interface RefundQueryFilters extends BaseQueryFilters, CommonQueryFields {
  amountRange?: AmountFilterValue
  reason?: string[]
  paymentMethod?: string[]
  customerName?: string
  paymentId?: string
}

export const PAYMENT_QUERY_CONFIG = defineEntityQueryConfig<PaymentQueryFilters>({
  fields: {
    status: { type: 'status_array', urlKey: 'status', statusMappings: StatusRegistry.getMappings('payment') },
    dateRange: { type: 'date_range', urlKey: 'date' },
    amount: { type: 'amount', urlKey: 'amount' },
    currency: { type: 'string_array', urlKey: 'currency' },
    search: { type: 'search', urlKey: '$s' }
  }
})

export const MERCHANT_QUERY_CONFIG = defineEntityQueryConfig<MerchantQueryFilters>({
  fields: {
    status: { type: 'status_array', urlKey: 'status', statusMappings: StatusRegistry.getMappings('merchant') },
    dateRange: { type: 'date_range', urlKey: 'date' },
    monthlyVolume: { type: 'amount', urlKey: 'monthlyVolume' },
    country: { type: 'string_array', urlKey: 'country' },
    industry: { type: 'string_array', urlKey: 'industry' },
    riskLevel: { type: 'string_array', urlKey: 'riskLevel' },
    verified: { type: 'boolean', urlKey: 'verified' },
    search: { type: 'search', urlKey: '$s' }
  }
})

export const DISPUTE_QUERY_CONFIG = defineEntityQueryConfig<DisputeQueryFilters>({
  fields: {
    status: { type: 'status_array', urlKey: 'status', statusMappings: StatusRegistry.getMappings('dispute') },
    dateRange: { type: 'date_range', urlKey: 'date' },
    amount: { type: 'amount', urlKey: 'amount' },
    reason: { type: 'string_array', urlKey: 'reason' },
    customerName: { type: 'search', urlKey: 'customerName' },
    paymentId: { type: 'search', urlKey: 'paymentId' },
    search: { type: 'search', urlKey: '$s' }
  }
})

export const CUSTOMER_QUERY_CONFIG = defineEntityQueryConfig<CustomerQueryFilters>({
  fields: {
    status: { type: 'status_array', urlKey: 'status', statusMappings: StatusRegistry.getMappings('customer') },
    dateRange: { type: 'date_range', urlKey: 'date' },
    totalSpent: { type: 'amount', urlKey: 'totalSpent' },
    location: { type: 'string_array', urlKey: 'location' },
    riskLevel: { type: 'string_array', urlKey: 'riskLevel' },
    verified: { type: 'boolean', urlKey: 'verified' },
    type: { type: 'string_array', urlKey: 'type' },
    customers: { type: 'string_array', urlKey: 'customers' }
  }
})

export const REFUND_QUERY_CONFIG = defineEntityQueryConfig<RefundQueryFilters>({
  fields: {
    status: { type: 'status_array', urlKey: 'status', statusMappings: StatusRegistry.getMappings('refund') },
    dateRange: { type: 'date_range', urlKey: 'date' },
    amountRange: { type: 'amount', urlKey: 'amount' },
    reason: { type: 'string_array', urlKey: 'reason' },
    paymentMethod: { type: 'string_array', urlKey: 'paymentMethod' },
    customerName: { type: 'search', urlKey: 'customerName' },
    paymentId: { type: 'search', urlKey: 'paymentId' },
    search: { type: 'search', urlKey: '$s' }
  }
})

export const QUERY_CONFIGS = {
  payments: PAYMENT_QUERY_CONFIG,
  merchants: MERCHANT_QUERY_CONFIG,
  disputes: DISPUTE_QUERY_CONFIG,
  customers: CUSTOMER_QUERY_CONFIG,
  refunds: REFUND_QUERY_CONFIG
} as const
