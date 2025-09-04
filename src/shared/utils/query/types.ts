import type { DateFilterValue } from '@shared/types/dateFilter'

/**
 * Base interface for entity query filters
 */
export interface BaseQueryFilters extends Record<string, unknown> {
  status?: string[]
  dateRange?: DateFilterValue
  search?: string
}

/**
 * Supported field types for query parsing/building
 */
export type QueryFieldType = 
  | 'status_array'
  | 'date_range'
  | 'amount'
  | 'string_array'
  | 'boolean'
  | 'search'

/**
 * Configuration for a query field
 */
export interface QueryFieldConfig {
  type: QueryFieldType
  urlKey: string
  statusMappings?: Record<string, readonly string[]>
}

/**
 * Entity-specific query configuration
 */
export interface EntityQueryConfig<T extends BaseQueryFilters> {
  fields: Record<keyof T, QueryFieldConfig>
}

/**
 * Query parser function type
 */
export type QueryParser<T extends BaseQueryFilters> = (queryString: string) => T

/**
 * Query builder function type
 */
export type QueryBuilder<T extends BaseQueryFilters> = (filters: Partial<T>) => string

/**
 * Query utilities interface
 */
export interface QueryUtils<T extends BaseQueryFilters> {
  parseQueryStringToFilters: QueryParser<T>
  buildQueryString: QueryBuilder<T>
}

/**
 * Common query parsing result for amount-based fields
 */
export interface AmountQueryResult {
  operator: 'equal' | 'greater_than' | 'less_than' | 'range'
  value?: string
  min?: string
  max?: string
}

/**
 * Common query parsing result for date-based fields
 */
export interface DateQueryResult {
  operator: 'equal' | 'between' | 'before' | 'after' | 'last'
  value?: Date
  startDate?: Date
  endDate?: Date
  lastNumber?: number
  lastUnit?: 'h' | 'd' | 'm'
}