import { useState, useCallback, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@shared/utils/hooks/useDebounce'
import { FilterSessionManager } from '@shared/utils/FilterSessionManager'
import type { EntityFacets, StatusMappings } from '@shared/types/status-filter.types'
import { 
  getStatusCount as getStatusCountGeneric,
  getStatusValuesForCard,
  shouldClearStatusFilter
} from '@shared/utils/status-filters'

interface EntityFiltersConfig {
  statusCardValues: readonly string[]
  statusMappings: StatusMappings
  sessionKeys: {
    statusFilter: string
    filters: string
  }
  queryUtils: {
    parseQueryStringToFilters: (query: string) => Record<string, unknown>
    buildQueryString: (filters: Partial<Record<string, unknown>>) => string
  }
  extraStatusCountHandlers?: Array<{
    condition: (status: string) => boolean
    handler: (facets: EntityFacets) => number
  }>
  entityType: string
}

interface UseEntityFiltersReturn {
  statusFilter: string
  tableFilters: Record<string, unknown>
  activeFiltersCount: number
  setStatusFilter: (status: string) => void
  setTableFilters: (filters: Record<string, unknown>) => void
  clearAllFilters: () => void
  getStatusCount: (status: string, facets: EntityFacets, totalItems: number) => number
  query: string
}

const isValidFilterValue = (value: unknown): boolean => {
  if (!value || value === 'all' || value === '') return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value as Record<string, unknown>).length > 0
  }
  return true
}

const arraysEqual = (a: readonly unknown[], b: readonly unknown[]): boolean => 
  a.length === b.length && a.every((val, i) => val === b[i])

const objectsEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  return keys1.every(key => {
    const val1 = obj1[key]
    const val2 = obj2[key]
    return Array.isArray(val1) && Array.isArray(val2) 
      ? arraysEqual(val1, val2)
      : val1 === val2
  })
}

export function useEntityFilters(config: EntityFiltersConfig): UseEntityFiltersReturn {
  const [, setSearchParams] = useSearchParams()
  

  const [statusFilter, setStatusFilter] = useState<string>(() => {
    const { statusFilter: saved } = FilterSessionManager.loadFilters(config.sessionKeys.statusFilter)
    return (typeof saved === 'string' && config.statusCardValues.includes(saved)) ? saved : 'all'
  })
  
  const [tableFilters, setTableFilters] = useState<Record<string, unknown>>({})
  

  const query = useMemo(() => 
    config.queryUtils.buildQueryString(tableFilters), 
    [tableFilters, config.queryUtils]
  )
  
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.delete('query')
      if (debouncedQuery) {
        newParams.set('query', debouncedQuery)
      }
      return newParams
    }, { replace: true })
  }, [debouncedQuery, setSearchParams])

  const activeFiltersCount = useMemo(() => {
    const statusCount = statusFilter !== 'all' && statusFilter !== '' ? 1 : 0
    const tableCount = Object.values(tableFilters).filter(isValidFilterValue).length
    return statusCount + tableCount
  }, [statusFilter, tableFilters])

  const getStatusCount = useCallback((status: string, facets: EntityFacets = {}, totalItems = 0): number => {
    return getStatusCountGeneric(
      status, 
      facets, 
      totalItems, 
      config.statusMappings, 
      config.extraStatusCountHandlers
    )
  }, [config.statusMappings, config.extraStatusCountHandlers])

  const clearAllFilters = useCallback(() => {
    FilterSessionManager.clearFilters(config.sessionKeys.filters)
    FilterSessionManager.saveFilters(config.sessionKeys.statusFilter, { statusFilter: 'all' })
    setStatusFilter('all')
    setTableFilters({})
  }, [config.sessionKeys.filters, config.sessionKeys.statusFilter])

  const handleStatusFilterChange = useCallback((newStatus: string) => {
    if (statusFilter === newStatus) return

    setStatusFilter(newStatus)
    FilterSessionManager.saveFilters(config.sessionKeys.statusFilter, { statusFilter: newStatus })

    if (shouldClearStatusFilter(newStatus)) {
      setTableFilters({})
    } else {
      const statusValues = getStatusValuesForCard(newStatus, config.statusMappings)
      setTableFilters({ status: statusValues.length ? [...statusValues] : [newStatus] })
    }

    FilterSessionManager.clearFilters(config.sessionKeys.filters)
  }, [statusFilter, config.statusMappings, config.sessionKeys.statusFilter, config.sessionKeys.filters])

  const handleTableFiltersChange = useCallback((newFilters: Record<string, unknown>) => {
    const sanitizedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, value]) => value != null)
    )
    
    if (objectsEqual(sanitizedFilters, tableFilters)) {
      return
    }
    
    setTableFilters(sanitizedFilters)

    const hasNonStatusFilters = Object.entries(sanitizedFilters)
      .some(([key, value]) => key !== 'status' && isValidFilterValue(value))
    const hasStatusFilter = isValidFilterValue(sanitizedFilters.status)

    // Sync status card with table filters
    if (hasNonStatusFilters) {
      if (statusFilter !== '' && statusFilter !== 'all') {
        setStatusFilter('')
        FilterSessionManager.saveFilters(config.sessionKeys.statusFilter, { statusFilter: '' })
      }
    } else if (statusFilter && hasStatusFilter) {
      const expectedValues = getStatusValuesForCard(statusFilter, config.statusMappings)
      const actualValues = Array.isArray(sanitizedFilters.status) 
        ? sanitizedFilters.status 
        : [sanitizedFilters.status]
      
      if (!arraysEqual(expectedValues, actualValues)) {
        const matchingCard = Object.entries(config.statusMappings)
          .find(([, values]) => arraysEqual(values, actualValues))?.[0]
        
        const newStatus = matchingCard && config.statusCardValues.includes(matchingCard) 
          ? matchingCard 
          : ''
        
        setStatusFilter(newStatus)
        FilterSessionManager.saveFilters(config.sessionKeys.statusFilter, { statusFilter: newStatus })
      }
    } else if (!hasNonStatusFilters && !hasStatusFilter) {
      setStatusFilter('all')
      FilterSessionManager.saveFilters(config.sessionKeys.statusFilter, { statusFilter: 'all' })
    }
  }, [statusFilter, config.sessionKeys.statusFilter, config.statusMappings, config.statusCardValues, tableFilters])

  return {
    statusFilter,
    tableFilters,
    activeFiltersCount,
    setStatusFilter: handleStatusFilterChange,
    setTableFilters: handleTableFiltersChange,
    clearAllFilters,
    getStatusCount,
    query,
  }
}