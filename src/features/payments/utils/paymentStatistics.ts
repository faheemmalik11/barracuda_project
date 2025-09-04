import type { Payment } from '@shared/types/payment.types'

export const getFilterStatistics = (payments: Payment[], filtered: Payment[]) => {
  const total = payments.length
  const filteredCount = filtered.length
  
  if (total === 0) {
    return {
      total: 0,
      filtered: 0,
      percentage: 0,
      statusBreakdown: {},
      currencyBreakdown: {},
      totalAmount: 0
    }
  }

  const statusBreakdown = filtered.reduce((acc, payment) => {
    const status = payment.status || payment.state || 'unknown'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const currencyBreakdown = filtered.reduce((acc, payment) => {
    const currency = payment.amounts?.original?.currency || payment.currency || 'unknown'
    acc[currency] = (acc[currency] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalAmount = filtered.reduce((sum, payment) => {
    const amount = payment.amounts?.original?.amount || payment.amount || 0
    return sum + amount
  }, 0)

  return {
    total,
    filtered: filteredCount,
    percentage: Math.round((filteredCount / total) * 100),
    statusBreakdown,
    currencyBreakdown,
    totalAmount
  }
}