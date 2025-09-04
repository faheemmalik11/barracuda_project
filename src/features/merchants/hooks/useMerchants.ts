import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { merchantsService } from '@shared/services'
import type { Merchant, ListMerchantsResponse } from '../types/merchants.types'
import type { EntityFacets } from '@shared/types/status-filter.types'

interface UseMerchantsProps {
  statusFilter?: string
  filters?: Record<string, unknown>
  currentPage?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  query?: string
}

interface UseMerchantsReturn {
  data: Merchant[]
  isLoading: boolean
  error: string | null
  totalItems: number
  totalPages: number
  facets: EntityFacets
  unfilteredFacets: EntityFacets
  refetch: () => void
  retry: () => void
}

export const useMerchants = ({
  statusFilter = 'all',
  filters = {},
  currentPage = 1,
  pageSize = 20,
  sortBy = 'created',
  sortOrder = 'desc',
  query = '',
}: UseMerchantsProps = {}): UseMerchantsReturn => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [facets, setFacets] = useState<EntityFacets>({ status: [] })
  const [unfilteredFacets, setUnfilteredFacets] = useState<EntityFacets>({ status: [] })

  const fetchMerchants = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      setIsLoading(true)
      setError(null)

      const response: ListMerchantsResponse = await merchantsService.getMerchants({
        page: currentPage - 1,
        pageSize,
        status: statusFilter,
        filters,
        sortBy,
        sortOrder,
        query,
      })

      if (abortSignal?.aborted) {
        return
      }

      setMerchants(response.results)
      setTotalElements(response.totalElements)
      setTotalPages(response.totalPages)
      
      // Calculate facets from the response
      // Note: This is calculated from current page only - ideally backend should provide this
      const statusCounts = response.results.reduce((acc, merchant) => {
        const status = merchant.status || 'unknown'
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      setFacets({
        status: Object.entries(statusCounts).map(([value, count]) => ({ value, count }))
      })
    } catch (err) {
      if (abortSignal?.aborted) {
        return
      }
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch merchants'
      console.error('Error fetching merchants:', err)
      setError(errorMessage)
      toast.error(errorMessage)
      setMerchants([])
    } finally {
      if (!abortSignal?.aborted) {
        setIsLoading(false)
      }
    }
  }, [statusFilter, filters, currentPage, pageSize, sortBy, sortOrder, query])

  const fetchUnfilteredFacets = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      // Fetch a larger sample to get better status distribution for facets
      const response: ListMerchantsResponse = await merchantsService.getMerchants({
        page: 0,
        pageSize: Math.min(100, totalElements || 100), // Use actual total or cap at 100
        status: 'all',
        filters: {},
        sortBy,
        sortOrder,
      })

      if (abortSignal?.aborted) {
        return
      }

      const statusCounts = response.results.reduce((acc, merchant) => {
        const status = merchant.status || 'unknown'
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      // Scale up the counts based on the sample size vs total
      const sampleSize = response.results.length
      const totalSize = response.totalElements || sampleSize
      const scaleFactor = sampleSize > 0 ? totalSize / sampleSize : 1
      
      const scaledFacets = Object.entries(statusCounts).map(([value, count]) => ({
        value,
        count: Math.round(count * scaleFactor)
      }))
      
      setUnfilteredFacets({ status: scaledFacets })
    } catch (err) {
      if (!abortSignal?.aborted) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch merchant statistics'
        console.error('Error fetching unfiltered facets:', err)
        toast.error(errorMessage)
        setUnfilteredFacets({ status: [] })
      }
    }
  }, [sortBy, sortOrder, totalElements])

  useEffect(() => {
    const abortController = new AbortController()
    fetchMerchants(abortController.signal)
    fetchUnfilteredFacets(abortController.signal)
    
    return () => {
      abortController.abort()
    }
  }, [fetchMerchants, fetchUnfilteredFacets])

  const retry = useCallback(() => {
    const abortController = new AbortController()
    fetchMerchants(abortController.signal)
  }, [fetchMerchants])

  return {
    data: merchants,
    isLoading,
    error,
    totalItems: totalElements,
    totalPages,
    facets,
    unfilteredFacets,
    refetch: fetchMerchants,
    retry,
  }
} 
