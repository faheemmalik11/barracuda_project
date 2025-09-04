import { format } from "date-fns"
import type { AmountFilterValue } from "@shared/components/filters/components/amount"
import type { FilterType } from "@shared/types/filters"

/**
 * Filter types that require specialized rendering components
 * instead of the generic dropdown approach
 */
export const SPECIALIZED_FILTER_TYPES = new Set<FilterType>([
  "advancedAmount", 
  "currency", 
  "transactionStatus", 
  "paymentMethod", 
  "dateRange", 
  "program", 
  "merchant",
  "customer",
  "bank",
  "organization",
  "productPlatform",
  "processor",
  "store",
  "channel",
  "location"
])

/**
 * Default number of visible filters before hiding extras in the UI
 */
export const DEFAULT_VISIBLE_FILTERS = 5

/**
 * Determines if a filter value is considered active/applied
 */
export const isFilterActive = (value: unknown, filterType: FilterType): boolean => {
  if (!value && value !== false && value !== 0) return false

  switch (filterType) {
    case "advancedAmount": {
      const advancedValue = value as AmountFilterValue
      return Boolean(
        advancedValue?.operator && 
        (advancedValue.value || advancedValue.min || advancedValue.max)
      )
    }
    
    case "currency":
      return value !== "" && value !== null && value !== undefined
    
    case "transactionStatus":
    case "program":
    case "merchant":
    case "multiSelect":
      return Array.isArray(value) && value.length > 0
    
    case "dateRange": {
      if (!value) return false
      const rangeValue = value as Record<string, unknown>
      
      // Check if it's a DateFilterValue structure (with operator)
      if (rangeValue?.operator) {
        return Boolean(
          rangeValue.operator && (
            rangeValue.value || 
            rangeValue.startDate || 
            rangeValue.endDate ||
            (rangeValue.lastNumber && rangeValue.lastUnit)
          )
        )
      }
      
      // Check if it's a traditional range structure (with min/max)
      return Boolean(
        (rangeValue?.min && rangeValue.min !== "") || 
        (rangeValue?.max && rangeValue.max !== "")
      )
    }
    
    case "amountRange":
    case "numberRange": {
      const rangeValue = value as Record<string, unknown>
      return Boolean(
        (rangeValue?.min && rangeValue.min !== "") || 
        (rangeValue?.max && rangeValue.max !== "")
      )
    }
    
    case "slider":
      return Array.isArray(value) && value.length === 2
    
    case "checkbox":
    case "switch":
      return value === true
    
    case "dateFilter": {
      if (!value) return false
      const dateFilterValue = value as Record<string, unknown>
      return Boolean(
        dateFilterValue?.operator && (
          dateFilterValue.value || 
          dateFilterValue.startDate || 
          dateFilterValue.endDate ||
          (dateFilterValue.lastNumber && dateFilterValue.lastUnit)
        )
      )
    }
    
    case "search":
      return false
    
    default:
      return value !== "" && value !== "all" && value !== null && value !== undefined
  }
}

/**
 * Safe date formatting utility
 */
export const formatDateSafe = (date: unknown, formatStr: string): string => {
  try {
    return format(new Date(date as string), formatStr)
  } catch {
    return ""
  }
}

/**
 * Type guard for objects with operator property
 */
export const isValidObjectWithOperator = (value: unknown): boolean => {
  return value !== null && typeof value === 'object' && 'operator' in (value as object)
} 
