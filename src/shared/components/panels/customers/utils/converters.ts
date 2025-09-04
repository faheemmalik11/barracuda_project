import type { Customer } from '@shared/types/customers'
import type { CustomerInfo } from '../types'

export function convertCustomerToCustomerInfo(customer: Customer): CustomerInfo {
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return 'Unknown'
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString()
  }

  const formatLastActivity = (date: string | Date | undefined): string => {
    if (!date) return 'Unknown'
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`
    return `${Math.floor(diffMins / 1440)} days ago`
  }

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    risk: customer.riskScore?.toString() || '0',
    created: `${formatDate(customer.created)} (${getTimeSinceCreated(customer.created)})`,
    lastActivity: formatLastActivity(customer.lastActivity),
    status: customer.status,
    statusDetails: { category: customer.status, priority: 'normal' }
  }
}

function getTimeSinceCreated(created: string | Date | undefined): string {
  if (!created) return 'Unknown'
  const createdDate = typeof created === 'string' ? new Date(created) : created
  const now = new Date()
  const diffMs = now.getTime() - createdDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)
  
  if (diffYears > 0) {
    const remainingMonths = Math.floor((diffDays % 365) / 30)
    return remainingMonths > 0 ? `${diffYears} years, ${remainingMonths} months` : `${diffYears} years`
  }
  if (diffMonths > 0) return `${diffMonths} months`
  return `${diffDays} days`
}