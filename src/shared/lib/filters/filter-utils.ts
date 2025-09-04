import type { FilterConfig } from "@shared/types/filters"
import { baseFilters } from "./base-filters"
import { entityFilters } from "./entity-filters"

/**
 * Utility functions for working with filters
 * These functions provide common operations like finding, validating, and sanitizing filters
 */

/**
 * Find a filter configuration by its key
 * Searches in base filters first, then in all entity filters
 */
export function getFilterByKey(key: string): FilterConfig | undefined {
  // Direct lookup in base filters first
  const baseFilter = baseFilters[key as keyof typeof baseFilters]
  if (baseFilter) return baseFilter

  // Search in all entity filters
  for (const filters of Object.values(entityFilters)) {
    const filter = filters.find(f => f.key === key)
    if (filter) return filter
  }

  return undefined
}

/**
 * Validate that a filter configuration has all required fields
 */
export function validateFilterConfig(config: FilterConfig): boolean {
  try {
    return !!(config.key && config.label && config.type)
  } catch {
    return false
  }
}

/**
 * Sanitize filter values based on their type
 * Ensures values are in the correct format for each filter type
 */
export function sanitizeFilterValue(value: unknown, filterType: string): unknown {
  switch (filterType) {
    case 'search':
    case 'text':
      return typeof value === 'string' ? value.trim() : ''
    case 'select':
    case 'status':
      return typeof value === 'string' ? value : ''
    case 'multiSelect':
      return Array.isArray(value) ? value : []
    case 'date':
    case 'dateRange':
    case 'datePicker':
    case 'dateFilter':
      return value instanceof Date || typeof value === 'string' ? value : null
    case 'amount':
    case 'amountRange':
    case 'advancedAmount':
    case 'numberRange':
      return typeof value === 'number' ? value : 0
    case 'checkbox':
    case 'switch':
      return typeof value === 'boolean' ? value : false
    case 'slider':
      return typeof value === 'number' ? Math.max(0, value) : 0
    default:
      return value
  }
} 
