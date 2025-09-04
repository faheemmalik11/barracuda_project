import { useState, useEffect, useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import type { Customer } from '@shared/types/customers'
import { mockCustomers } from '@shared/data/mockCustomers'
import { StatusRegistry } from '@shared/lib/filters/status-registry'
import type { EntityFacets } from '@shared/types/status-filter.types'

interface UseCustomersOptions {
  statusFilter?: string
  filters?: Record<string, unknown>
  currentPage?: number
  pageSize?: number
  query?: string
}

interface UseCustomersReturn {
  data: Customer[]
  isLoading: boolean
  error: string | null
  totalItems: number
  totalPages: number
  facets: EntityFacets
  unfilteredFacets: EntityFacets
  refetch: () => Promise<void>
  retry: () => void
}

const transformDateField = (value: string | Date | undefined): Date | undefined => {
  if (!value) return undefined
  return typeof value === 'string' ? new Date(value) : value
}

export function useCustomers({
  statusFilter = 'all',
  filters = {},
  currentPage = 1,
  pageSize = 10,
  query = '',
}: UseCustomersOptions = {}): UseCustomersReturn {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage)
  const [facets, setFacets] = useState<EntityFacets>({ status: [] })
  const [unfilteredFacets, setUnfilteredFacets] = useState<EntityFacets>({ status: [] })

  const transformedMockData = useMemo(() => 
    mockCustomers.map(customer => ({
      ...customer,
      created: transformDateField(customer.created) || new Date(),
      lastPayment: transformDateField(customer.lastPayment),
      lastActivity: transformDateField(customer.lastActivity),
      restricted: transformDateField(customer.restricted),
      terminated: transformDateField(customer.terminated),
    })), []
  )

  const applyFilters = useCallback((data: Customer[]) => {
    let filtered = data

    if (statusFilter && statusFilter !== 'all') {
      const allowedStatuses = StatusRegistry.getMappings('customer')[statusFilter] || []
      filtered = filtered.filter(customer => 
        allowedStatuses.includes(customer.status)
      )
    }

    if (filters.customer) {
      const searchTerm = String(filters.customer).toLowerCase()
      filtered = filtered.filter(customer =>
        [customer.name, customer.email, customer.id]
          .some(field => field.toLowerCase().includes(searchTerm))
      )
    }
    
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim()
      filtered = filtered.filter(customer =>
        [customer.name, customer.email, customer.id]
          .some(field => field.toLowerCase().includes(searchTerm))
      )
    }
    
    if (filters.riskLevel && filters.riskLevel !== 'all') {
      filtered = filtered.filter(customer =>
        customer.riskLevel === filters.riskLevel
      )
    }
    
    if (filters.verified !== undefined) {
      filtered = filtered.filter(customer =>
        customer.verified === filters.verified
      )
    }

    return filtered
  }, [statusFilter, filters.customer, filters.riskLevel, filters.verified, query])

  const fetchCustomers = useCallback(async (pageToFetch = internalCurrentPage, abortSignal?: AbortSignal) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate network delay with abortable timeout
      await new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(resolve, 300)
        abortSignal?.addEventListener('abort', () => {
          clearTimeout(timeoutId)
          reject(new DOMException('Aborted', 'AbortError'))
        })
      })

      if (abortSignal?.aborted) {
        return
      }

      const filteredData = applyFilters(transformedMockData)
      const startIndex = (pageToFetch - 1) * pageSize
      const paginatedData = filteredData.slice(startIndex, startIndex + pageSize)

      // Calculate facets from filtered data (all items matching current filters)
      const statusCounts = filteredData.reduce((acc, customer) => {
        acc[customer.status] = (acc[customer.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      const calculatedFacets: EntityFacets = {
        status: Object.entries(statusCounts).map(([value, count]) => ({ value, count }))
      }

      setCustomers(paginatedData)
      setTotalItems(filteredData.length)
      setTotalPages(Math.ceil(filteredData.length / pageSize))
      setFacets(calculatedFacets)
    } catch (err) {
      if (abortSignal?.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
        return
      }
      const errorMessage = err instanceof Error ? err.message : 'Failed to load customers'
      setError(errorMessage)
      toast.error(errorMessage)
      setCustomers([])
      setTotalItems(0)
      setTotalPages(0)
    } finally {
      if (!abortSignal?.aborted) {
        setIsLoading(false)
      }
    }
  }, [internalCurrentPage, pageSize, applyFilters, transformedMockData])

  const refetch = useCallback(async () => {
    const abortController = new AbortController()
    await fetchCustomers(internalCurrentPage, abortController.signal)
  }, [fetchCustomers, internalCurrentPage])

  // Calculate unfiltered facets once on mount
  useEffect(() => {
    const allStatusCounts = transformedMockData.reduce((acc, customer) => {
      acc[customer.status] = (acc[customer.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    setUnfilteredFacets({
      status: Object.entries(allStatusCounts).map(([value, count]) => ({ value, count }))
    })
  }, [transformedMockData])

  useEffect(() => {
    setInternalCurrentPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    const abortController = new AbortController()
    fetchCustomers(internalCurrentPage, abortController.signal)
    
    return () => {
      abortController.abort()
    }
  }, [fetchCustomers, internalCurrentPage])

  const retry = useCallback(() => {
    const abortController = new AbortController()
    fetchCustomers(internalCurrentPage, abortController.signal)
  }, [internalCurrentPage, fetchCustomers])

  return {
    data: customers,
    totalItems,
    totalPages,
    isLoading,
    error,
    facets,
    unfilteredFacets,
    refetch,
    retry,
  }
}
