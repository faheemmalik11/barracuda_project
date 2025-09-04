import { useState, useCallback } from 'react'

export interface PaymentLinkFilters {
  status: string
  type: string
  search: string
  dateRange: { from: Date | null; to: Date | null }
}

export function usePaymentLinkFilters() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  })

  const filters: PaymentLinkFilters = {
    status: statusFilter,
    type: typeFilter,
    search: searchQuery,
    dateRange
  }

  const updateStatusFilter = useCallback((status: string) => {
    setStatusFilter(status)
  }, [])

  const updateTypeFilter = useCallback((type: string) => {
    setTypeFilter(type)
  }, [])

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const updateDateRange = useCallback((range: { from: Date | null; to: Date | null }) => {
    setDateRange(range)
  }, [])

  const clearFilters = useCallback(() => {
    setStatusFilter('all')
    setTypeFilter('all')
    setSearchQuery('')
    setDateRange({ from: null, to: null })
  }, [])

  const getStatusCount = useCallback((status: string, _facets: any, totalItems: number) => {
    if (status === 'all') return totalItems
    return 0
  }, [])

  return {
    filters,
    statusFilter,
    setStatusFilter: updateStatusFilter,
    typeFilter,
    searchQuery,
    dateRange,
    updateStatusFilter,
    updateTypeFilter,
    updateSearchQuery,
    updateDateRange,
    clearFilters,
    getStatusCount,
    // Required by UseFiltersHook interface
    tableFilters: {},
    setTableFilters: () => {},
    clearAllFilters: clearFilters,
    activeFiltersCount: 0
  }
}
