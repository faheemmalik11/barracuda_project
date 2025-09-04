import { formatDateForQuery } from "@shared/utils/date"
import { toCents } from "@shared/utils/amountFilterUtils"
import type { AmountFilterValue } from '@shared/types/amountFilter'
import type { DateFilterValue } from '@shared/types/dateFilter'
export function buildDateFilter(dateRange: DateFilterValue): string[] {
  const parts: string[] = []
  
  switch (dateRange.operator) {
    case 'equal':
      if (dateRange.value) parts.push(`date=${formatDateForQuery(dateRange.value)}`)
      break
    case 'between':
      if (dateRange.startDate && dateRange.endDate) {
        parts.push(`${formatDateForQuery(dateRange.startDate)}<date<${formatDateForQuery(dateRange.endDate)}`)
      }
      break
    case 'before':
      if (dateRange.value) parts.push(`date<=${formatDateForQuery(dateRange.value)}`)
      break
    case 'after':
      if (dateRange.value) parts.push(`date>=${formatDateForQuery(dateRange.value)}`)
      break
    case 'last':
      if (dateRange.lastNumber && dateRange.lastUnit) {
        parts.push(`date=last_${dateRange.lastNumber}${dateRange.lastUnit}`)
      }
      break
  }
  
  return parts
}

export function buildAmountFilter(amount: AmountFilterValue, fieldName: string): string[] {
  const parts: string[] = []
  const toNumber = (value: string | number) => typeof value === 'number' ? value : parseFloat(value)
  
  switch (amount.operator) {
    case 'equal':
      if (amount.value !== undefined) {
        parts.push(`${fieldName}=${toCents(toNumber(amount.value))}`)
      }
      break
    case 'greater_than':
      if (amount.value !== undefined) {
        parts.push(`${fieldName}>${toCents(toNumber(amount.value))}`)
      }
      break
    case 'less_than':
      if (amount.value !== undefined) {
        parts.push(`${fieldName}<${toCents(toNumber(amount.value))}`)
      }
      break
    case 'range':
      if (amount.min !== undefined && amount.max !== undefined) {
        parts.push(`${toCents(toNumber(amount.min))}<${fieldName}<${toCents(toNumber(amount.max))}`)
      }
      break
  }
  
  return parts
}

export function buildArrayField(values: string[], fieldName: string): string[] {
  if (Array.isArray(values) && values.length > 0) {
    return [`${fieldName}=${values.join(';')}`]
  }
  if (typeof values === 'string') {
    return [`${fieldName}=${values}`]
  }
  return []
}

export function buildBooleanField(value: boolean, fieldName: string): string[] {
  return typeof value === 'boolean' ? [`${fieldName}=${value}`] : []
}

export function buildSearchParam(search: string): string[] {
  if (search && typeof search === 'string' && search.trim()) {
    return [`$s=${encodeURIComponent(search.trim())}`]
  }
  return []
}

export function buildStatusFilter(
  status: string | string[], 
  statusMappings?: Record<string, readonly string[]>
): string[] {
  if (!status) return []
  
  if (typeof status === 'string' && status !== 'all') {
    if (statusMappings) {
      const apiStatuses = statusMappings[status]
      if (apiStatuses?.length) {
        return [`status=${apiStatuses.join(';')}`]
      }
    }
    return [`status=${status}`]
  }
  
  if (Array.isArray(status) && status.length > 0) {
    return [`status=${status.join(';')}`]
  }
  
  return []
}

export function combineQueryParts(parts: string[]): string {
  return parts.length > 0 ? `//${parts.join('/')}` : ''
}