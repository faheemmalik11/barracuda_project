import type { FilterConfig, TableFiltersConfig } from "@shared/types/filters"

/**
 * Basic validation utilities for filter configurations
 */

const REQUIRED_FILTER_FIELDS = ['key', 'type', 'label'] as const

/**
 * Validate that a filter has required fields
 */
export function validateFilter(filter: FilterConfig): boolean {
  return REQUIRED_FILTER_FIELDS.every(field => 
    filter[field] && typeof filter[field] === 'string'
  )
}

/**
 * Check for duplicate filter keys in an array
 */
export function checkDuplicateKeys(filters: FilterConfig[]): string[] {
  const seenKeys = new Set<string>()
  const duplicates: string[] = []

  for (const filter of filters) {
    if (seenKeys.has(filter.key)) {
      duplicates.push(filter.key)
    } else {
      seenKeys.add(filter.key)
    }
  }

  return duplicates
}

/**
 * Validate table configuration structure
 */
export function validateTableConfig(config: TableFiltersConfig): boolean {
  return !!(
    config.filters && 
    Array.isArray(config.filters) &&
    config.filters.every(validateFilter) &&
    checkDuplicateKeys(config.filters).length === 0
  )
}

/**
 * Development-only validation with console warnings
 */
export function devValidateConfig(config: TableFiltersConfig, entityType: string): void {
  if (process.env.NODE_ENV !== 'development') return

  if (!validateTableConfig(config)) {
    console.warn(`⚠️ Invalid filter configuration for ${entityType}`)
  }

  const duplicates = checkDuplicateKeys(config.filters)
  if (duplicates.length > 0) {
    console.warn(`⚠️ Duplicate filter keys in ${entityType}:`, duplicates)
  }
} 
