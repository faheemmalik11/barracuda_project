import { FilterSessionManager } from './FilterSessionManager'

export interface EntityFilterState {
  statusFilter: string
  tableFilters: Record<string, unknown>
}

export interface EntityFilterConfig {
  entityType: string
  defaultStatus?: string
  sessionKeys: {
    status: string
    table: string
  }
}

export const createEntityFilterConfig = (entityType: string): EntityFilterConfig => ({
  entityType,
  defaultStatus: 'all',
  sessionKeys: {
    status: `${entityType}-status-filter`,
    table: `${entityType}-filters`,
  },
})

export const initializeStatusFilter = (
  config: EntityFilterConfig,
  initialFilters?: Record<string, unknown>
): string => {
  const persistedStatus = FilterSessionManager.loadFilters(config.sessionKeys.status)
  if (typeof persistedStatus.statusFilter === 'string') {
    return persistedStatus.statusFilter
  }
  
  return (initialFilters?.status as string[])?.[0]?.toLowerCase() || config.defaultStatus || 'all'
}

export const calculateActiveFiltersCount = (
  statusFilter: string,
  tableFilters: Record<string, unknown>
): number => {
  const statusCount = (statusFilter && statusFilter !== 'all' && statusFilter !== '') ? 1 : 0
  
  const tableCount = Object.values(tableFilters).filter(value => {
    if (value == null || value === '' || value === 'all') return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0
    return true
  }).length
  
  return statusCount + tableCount
}

export const sanitizeFilters = (filters: Record<string, unknown>): Record<string, unknown> => 
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value != null)
  )

export const hasNonStatusFilters = (filters: Record<string, unknown>): boolean =>
  Object.entries(filters)
    .filter(([key]) => key !== 'status')
    .some(([, value]) => {
      if (value == null || value === '') return false
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0
      return true
    })

export const buildQueryParams = (
  statusFilter: string,
  tableFilters: Record<string, unknown>
): string => {
  const params = new URLSearchParams()
  
  if (statusFilter && statusFilter !== 'all') {
    params.append('status', statusFilter)
  }
  
  Object.entries(tableFilters).forEach(([key, value]) => {
    if (value == null || value === '') return
    
    if (Array.isArray(value) && value.length > 0) {
      params.append(key, value.join(','))
    } else if (!Array.isArray(value)) {
      params.append(key, String(value))
    }
  })
  
  return params.toString()
}

export const saveStatusFilter = (config: EntityFilterConfig, status: string): void => {
  FilterSessionManager.saveFilters(config.sessionKeys.status, { statusFilter: status })
}

export const clearEntityFilters = (config: EntityFilterConfig): void => {
  FilterSessionManager.clearFilters(config.sessionKeys.status)
  FilterSessionManager.clearFilters(config.sessionKeys.table)
}

/**
 * Generic array filtering utility
 * @param items - Array of items to filter
 * @param filter - Filter value(s) to match against
 * @param fieldAccessor - Function to extract field value from item
 * @returns Filtered array of items
 */
export function applyArrayFilter<T>(
  items: T[],
  filter: string | string[] | undefined,
  fieldAccessor: (item: T) => string | undefined
): T[] {
  if (!filter) return items
  
  const filterValues = Array.isArray(filter) ? filter : [filter]
  if (filterValues.includes('all') || filterValues.length === 0) return items
  
  const filterSet = new Set(filterValues.map(v => v.toLowerCase()))
  
  return items.filter(item => {
    const fieldValue = fieldAccessor(item)
    return fieldValue && filterSet.has(fieldValue.toLowerCase())
  })
}

/**
 * Generic search filter utility
 * @param items - Array of items to filter
 * @param searchTerm - Search term to match against
 * @param searchableFieldsAccessor - Function to extract searchable fields from item
 * @returns Filtered array of items
 */
export function applySearchFilter<T>(
  items: T[],
  searchTerm: string | undefined,
  searchableFieldsAccessor: (item: T) => (string | undefined)[]
): T[] {
  if (!searchTerm?.trim()) return items
  
  const term = searchTerm.toLowerCase().trim()
  
  return items.filter(item => {
    const searchableFields = searchableFieldsAccessor(item)
    return searchableFields
      .filter((field): field is string => typeof field === 'string')
      .some(field => field.toLowerCase().includes(term))
  })
}

/**
 * Apply multiple filters to an array
 * @param items - Array of items to filter
 * @param filters - Object containing multiple filter functions
 * @returns Filtered array of items
 */
export function applyMultipleFilters<T>(
  items: T[],
  filters: Array<(items: T[]) => T[]>
): T[] {
  return filters.reduce((filtered, filterFn) => filterFn(filtered), items)
}