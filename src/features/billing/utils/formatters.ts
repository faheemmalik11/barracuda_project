import type { InvoiceStatus, BillingTrend } from '../types/billing.types'

export const getTrendColor = (trend: BillingTrend): string => {
  const colors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground'
  }
  return colors[trend] || 'text-muted-foreground'
}

export const calculateInvoiceTotal = (items: Array<{ quantity: number; unitPrice: number; taxRate?: number }>): number => {
  return items.reduce((total, item) => {
    const subtotal = item.quantity * item.unitPrice
    const taxAmount = subtotal * (item.taxRate || 0) / 100
    return total + subtotal + taxAmount
  }, 0)
}

export const isInvoiceOverdue = (dueDate: Date): boolean => {
  return new Date() > dueDate
}

export const getStatusText = (status: InvoiceStatus): string => {
  const statusTexts = {
    paid: 'Paid',
    sent: 'Sent', 
    overdue: 'Overdue',
    draft: 'Draft',
    cancelled: 'Cancelled'
  }
  return statusTexts[status] || 'Unknown'
}

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100)
}

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString()
}

export const formatNumber = (value: number): string => {
  return value.toLocaleString()
}

export const formatPercentageChange = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}