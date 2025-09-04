import { format } from "date-fns"
import { TIME_UNITS, type DateFilterValue } from "@shared/types/dateFilter"

/**
 * Generic date filtering utility that can be used across different entity types
 * Supports various date comparison operations and presets
 */

// Helper function to safely parse dates
export const parseDate = (dateStr: string | Date | number): Date | null => {
  if (dateStr instanceof Date) {
    return isNaN(dateStr.getTime()) ? null : dateStr
  }
  
  try {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

// Date preset constants
export const DATE_PRESETS = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year'
} as const

export type DatePreset = typeof DATE_PRESETS[keyof typeof DATE_PRESETS]

/**
 * Apply date filter to an array of items
 * @param items - Array of items to filter
 * @param filter - Date filter to apply (string preset or DateFilterValue)
 * @param dateAccessor - Function to extract date from item
 * @returns Filtered array of items
 */
export function applyDateFilter<T>(
  items: T[],
  filter: string | DateFilterValue,
  dateAccessor: (item: T) => Date | string | number | undefined
): T[] {
  if (!filter) return items
  
  return items.filter(item => {
    const itemDate = dateAccessor(item)
    if (!itemDate) return false
    
    const date = parseDate(itemDate)
    if (!date) return false
    
    // Handle string-based presets
    if (typeof filter === 'string') {
      return matchDatePreset(date, filter as DatePreset)
    }
    
    // Handle DateFilterValue object
    return matchDateFilter(date, filter)
  })
}

/**
 * Check if a date matches a preset filter
 */
function matchDatePreset(date: Date, preset: string): boolean {
  const now = new Date()
  const msPerDay = 24 * 60 * 60 * 1000
  
  switch (preset) {
    case DATE_PRESETS.TODAY:
      return date.toDateString() === now.toDateString()
      
    case DATE_PRESETS.YESTERDAY: {
      const yesterday = new Date(now.getTime() - msPerDay)
      return date.toDateString() === yesterday.toDateString()
    }
    
    case DATE_PRESETS.LAST_7_DAYS:
    case 'week':
      return date >= new Date(now.getTime() - 7 * msPerDay)
      
    case DATE_PRESETS.LAST_30_DAYS:
    case 'month':
      return date >= new Date(now.getTime() - 30 * msPerDay)
      
    case DATE_PRESETS.LAST_90_DAYS:
      return date >= new Date(now.getTime() - 90 * msPerDay)
      
    case DATE_PRESETS.THIS_MONTH:
      return date >= new Date(now.getFullYear(), now.getMonth(), 1)
      
    case DATE_PRESETS.LAST_MONTH: {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return date >= lastMonth && date < thisMonth
    }
    
    case DATE_PRESETS.THIS_YEAR:
      return date >= new Date(now.getFullYear(), 0, 1)
      
    case DATE_PRESETS.LAST_YEAR: {
      const lastYear = new Date(now.getFullYear() - 1, 0, 1)
      const thisYear = new Date(now.getFullYear(), 0, 1)
      return date >= lastYear && date < thisYear
    }
    
    default:
      return true
  }
}

/**
 * Check if a date matches a DateFilterValue
 */
function matchDateFilter(date: Date, filter: DateFilterValue): boolean {
  switch (filter.operator) {
    case 'equal':
      if (!filter.value) return true
      const targetDate = parseDate(filter.value)
      return targetDate ? date.toDateString() === targetDate.toDateString() : true
      
    case 'between':
      if (!filter.startDate || !filter.endDate) return true
      const startDate = parseDate(filter.startDate)
      const endDate = parseDate(filter.endDate)
      return startDate && endDate ? date >= startDate && date <= endDate : true
      
    case 'before':
      if (!filter.value) return true
      const beforeDate = parseDate(filter.value)
      return beforeDate ? date < beforeDate : true
      
    case 'after':
      if (!filter.value) return true
      const afterDate = parseDate(filter.value)
      return afterDate ? date > afterDate : true
      
    case 'last':
      if (!filter.lastNumber || !filter.lastUnit) return true
      const now = new Date()
      const msMap = { 
        h: 60 * 60 * 1000, 
        d: 24 * 60 * 60 * 1000, 
        m: 30 * 24 * 60 * 60 * 1000 
      }
      const ms = filter.lastNumber * msMap[filter.lastUnit]
      return date >= new Date(now.getTime() - ms)
      
    default:
      return true
  }
}

const getUnitLabel = (unitValue: "h" | "d" | "m" | undefined) => {
  if (!unitValue) return ""
  return TIME_UNITS.find(u => u.value === unitValue)?.label ?? unitValue
}

export function getDisplayLabel(
  value: DateFilterValue | null | undefined,
  label: string,
): { label: string; displayValue: string } {
  if (!value) return { label, displayValue: "" }

  switch (value.operator) {
    case "last":
      return {
        label,
        displayValue: `Last ${value.lastNumber} ${getUnitLabel(value.lastUnit)}`,
      }
    case "equal":
      return {
        label,
        displayValue: value.value ? format(value.value, "M/d/yyyy") : "",
      }
    case "between":
      if (value.startDate && value.endDate) {
        return {
          label,
          displayValue: `${format(value.startDate, "M/d/yyyy")} - ${format(
            value.endDate,
            "M/d/yyyy",
          )}`,
        }
      }
      return { label, displayValue: "" }
    case "before":
      return {
        label,
        displayValue: value.value
          ? `Ending on ${format(value.value, "M/d/yyyy")}`
          : "",
      }
    case "after":
      return {
        label,
        displayValue: value.value
          ? `Starting from ${format(value.value, "M/d/yyyy")}`
          : "",
      }
    default:
      return { label, displayValue: "" }
  }
} 
