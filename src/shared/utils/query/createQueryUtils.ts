import type { 
  BaseQueryFilters, 
  EntityQueryConfig, 
  QueryUtils
} from './types'
import {
  parseLastXFormat,
  parseDateEqual,
  parseArrayField,
  parseBooleanField,
  parseSearchParam,
  parseAmountEqual,
  parseComparisonPart
} from './parsers'
import {
  buildDateFilter,
  buildAmountFilter,
  buildArrayField,
  buildBooleanField,
  buildSearchParam,
  buildStatusFilter,
  combineQueryParts
} from './builders'
import type { AmountFilterValue } from '@shared/types/amountFilter'
import type { DateFilterValue } from '@shared/types/dateFilter'

/**
 * Create query utilities for a specific entity type
 * 
 * @param config - Entity-specific configuration for query fields
 * @returns Query utilities with parseQueryStringToFilters and buildQueryString functions
 */
export function createQueryUtils<T extends BaseQueryFilters>(
  config: EntityQueryConfig<T>
): QueryUtils<T> {
  
  /**
   * Parse a query string into entity-specific filter objects
   */
  function parseQueryStringToFilters(queryString: string): T {
    const filters = {} as T
    const cleanQuery = queryString.startsWith('//') ? queryString.substring(2) : queryString
    if (!cleanQuery) return filters

    const parts = cleanQuery.split('/')
    
    // Collect amount field handlers for comparison parsing
    const amountHandlers: Array<{
      fieldName: string;
      handler: (amountFilter: AmountFilterValue) => void;
    }> = []
    
    // Build amount handlers from config
    for (const [fieldKey, fieldConfig] of Object.entries(config.fields)) {
      if (fieldConfig.type === 'amount') {
        amountHandlers.push({
          fieldName: fieldConfig.urlKey,
          handler: (amountFilter: AmountFilterValue) => {
            (filters as any)[fieldKey] = amountFilter
          }
        })
      }
    }
    
    for (const part of parts) {
      if (part.includes('=')) {
        const [key, value] = part.split('=');
        
        // Find the field configuration for this URL key
        const fieldEntry = Object.entries(config.fields).find(
          ([, fieldConfig]) => fieldConfig.urlKey === key
        )
        
        if (!fieldEntry) continue
        
        const [fieldKey, fieldConfig] = fieldEntry
        
        switch (fieldConfig.type) {
          case 'status_array':
            (filters as any)[fieldKey] = parseArrayField(value)
            break
            
          case 'date_range':
            if (value.startsWith('last_')) {
              const dateFilter = parseLastXFormat(value)
              if (dateFilter) {
                (filters as any)[fieldKey] = dateFilter
              }
            } else {
              (filters as any)[fieldKey] = parseDateEqual(value)
            }
            break
            
          case 'amount':
            (filters as any)[fieldKey] = parseAmountEqual(value)
            break
            
          case 'string_array':
            (filters as any)[fieldKey] = parseArrayField(value)
            break
            
          case 'boolean':
            (filters as any)[fieldKey] = parseBooleanField(value)
            break
            
          case 'search':
            (filters as any)[fieldKey] = parseSearchParam(value)
            break
        }
      } else if (part.includes('>') || part.includes('<')) {
        // Handle comparison operators
        parseComparisonPart(
          part,
          // Date handler
          (dateFilter: DateFilterValue) => {
            // Find the date field in config
            const dateFieldEntry = Object.entries(config.fields).find(
              ([, fieldConfig]) => fieldConfig.type === 'date_range'
            )
            if (dateFieldEntry) {
              const [fieldKey] = dateFieldEntry;
              (filters as any)[fieldKey] = dateFilter as DateFilterValue
            }
          },
          // Amount handlers
          amountHandlers
        )
      }
    }
    
    return filters
  }
  
  /**
   * Build a query string from entity-specific filter objects
   */
  function buildQueryString(filters: Partial<T>): string {
    const parts: string[] = []
    
    for (const [fieldKey, fieldConfig] of Object.entries(config.fields)) {
      const filterValue = filters[fieldKey as keyof T]
      if (filterValue === undefined || filterValue === null) continue
      
      switch (fieldConfig.type) {
        case 'status_array':
          parts.push(...buildStatusFilter(
            filterValue as string | string[], 
            fieldConfig.statusMappings
          ))
          break
          
        case 'date_range':
          parts.push(...buildDateFilter(filterValue as unknown as DateFilterValue))
          break
          
        case 'amount':
          parts.push(...buildAmountFilter(
            filterValue as unknown as AmountFilterValue, 
            fieldConfig.urlKey
          ))
          break
          
        case 'string_array':
          parts.push(...buildArrayField(
            filterValue as string[], 
            fieldConfig.urlKey
          ))
          break
          
        case 'boolean':
          parts.push(...buildBooleanField(
            filterValue as boolean, 
            fieldConfig.urlKey
          ))
          break
          
        case 'search':
          parts.push(...buildSearchParam(filterValue as string))
          break
      }
    }
    
    return combineQueryParts(parts)
  }
  
  return {
    parseQueryStringToFilters,
    buildQueryString
  }
}

/**
 * Type helper to ensure config matches the entity type
 */
export function defineEntityQueryConfig<T extends BaseQueryFilters>(
  config: EntityQueryConfig<T>
): EntityQueryConfig<T> {
  return config
}