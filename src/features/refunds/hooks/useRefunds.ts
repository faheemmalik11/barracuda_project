import { useState, useEffect, useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { refundsService } from '@shared/services'
import type { Refund } from '@shared/types/refunds'
import type { EntityFacets } from '@shared/types/status-filter.types'

interface UseRefundsProps {
  statusFilter?: string
  filters?: Record<string, unknown>
  currentPage?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

interface UseRefundsReturn {
  data: Refund[]
  isLoading: boolean
  error: string | null
  totalItems: number
  totalPages: number
  facets: EntityFacets
  unfilteredFacets: EntityFacets
  refetch: () => void
  retry: () => void
}

export function useRefunds({
  statusFilter = 'all',
  filters = {},
  currentPage = 1,
  pageSize = 20,
  sortBy = 'created',
  sortOrder = 'desc',
}: UseRefundsProps = {}): UseRefundsReturn {
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalElements, setTotalElements] = useState(0)
  const [facets, setFacets] = useState<EntityFacets>({ status: [] })
  const [unfilteredFacets, setUnfilteredFacets] = useState<EntityFacets>({ status: [] })

  const fetchRefunds = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      setIsLoading(true)
      setError(null)

      const serviceParams = {
        pageSize,
        statusFilter: statusFilter === 'all' ? undefined : statusFilter,
        filters,
        sortBy,
        sortOrder,
      };

      const response = await refundsService.getRefundsForNavigation(currentPage, serviceParams)

      if (abortSignal?.aborted) {
        return
      }

      setRefunds(response.data)
      setTotalElements(response.total)
      
      // Use facets from service response (calculated from all data)
      if (response.facets) {
        setFacets(response.facets)
        setUnfilteredFacets(response.facets)
      }
    } catch (err) {
      if (abortSignal?.aborted) {
        return
      }
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch refunds'
      console.error('Error fetching refunds:', err)
      setError(errorMessage)
      toast.error(errorMessage)
      setRefunds([])
    } finally {
      if (!abortSignal?.aborted) {
        setIsLoading(false)
      }
    }
  }, [statusFilter, filters, currentPage, pageSize, sortBy, sortOrder])


  useEffect(() => {
    const abortController = new AbortController()
    fetchRefunds(abortController.signal)
    
    return () => {
      abortController.abort()
    }
  }, [fetchRefunds])

  const retry = fetchRefunds

  const calculatedTotalPages = useMemo(() => {
    return Math.ceil(totalElements / pageSize)
  }, [totalElements, pageSize])

  return {
    data: refunds,
    isLoading,
    error,
    totalItems: totalElements,
    totalPages: calculatedTotalPages,
    facets,
    unfilteredFacets,
    refetch: fetchRefunds,
    retry,
  }
}