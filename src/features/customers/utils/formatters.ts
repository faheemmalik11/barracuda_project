import type { Customer, CustomerStatus } from '@shared/types/customers'
import { formatCurrency, formatRelativeTime } from '@shared/utils/formatters'

export const formatCustomerName = (customer: Customer): string => {
  return customer.name || customer.email
}

export const formatCustomerSpending = (amount: number, currency = 'USD'): string => {
  return formatCurrency(amount, currency, 0)
}

export const getCustomerStatusVariant = (status: CustomerStatus): 'default' | 'success' | 'warning' | 'error' => {
  switch (status) {
    case 'active':
      return 'success'
    case 'risky':
      return 'warning'
    case 'in_review':
    case 'pending_review':
      return 'default'
    case 'restricted':
    case 'suspended':
      return 'warning'
    case 'terminated':
    case 'closed':
      return 'error'
    default:
      return 'default'
  }
}


export const calculateCustomerMetrics = (customer: Customer) => {
  const avgOrderValue = customer.paymentCount > 0 
    ? customer.totalSpent / customer.paymentCount 
    : 0

  return {
    avgOrderValue,
    formattedTotalSpent: formatCustomerSpending(customer.totalSpent),
    formattedAvgOrderValue: formatCustomerSpending(avgOrderValue),
    paymentCount: customer.paymentCount,
  }
}

const HIGH_VALUE_THRESHOLDS = {
  totalSpent: 100000,
  paymentCount: 50
} as const

export const isHighValueCustomer = (customer: Customer): boolean => {
  return customer.totalSpent > HIGH_VALUE_THRESHOLDS.totalSpent || 
         customer.paymentCount > HIGH_VALUE_THRESHOLDS.paymentCount
}

export const formatLastPayment = formatRelativeTime