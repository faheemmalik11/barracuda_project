import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { paymentsService } from '@shared/services'
import type { TransactionState } from '@shared/types/payment.types'
import type { EntityFacets } from '@shared/types/status-filter.types'
import { transformBackendFacetsToPaymentFacets } from '../utils/paymentTransformers'
import type { Payment as FeaturePayment } from '../types/payments.types'

interface UsePaymentsParams {
  pageSize?: number
  statusFilter?: string
  currentPage: number
  query: string
}

interface UsePaymentsReturn {
  payments: FeaturePayment[]
  isLoading: boolean
  error: string | null
  totalItems: number
  totalPages: number
  facets: EntityFacets
  unfilteredFacets: EntityFacets
  unfilteredTotalItems: number
  retry: () => void
}
export const usePayments = ({
  pageSize = 10,
  statusFilter = 'all',
  currentPage = 1,
  query = '',
}: UsePaymentsParams): UsePaymentsReturn => {
  const [payments, setPayments] = useState<FeaturePayment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [facets, setFacets] = useState<EntityFacets>({ status: [] })
  const [unfilteredFacets, setUnfilteredFacets] = useState<EntityFacets>({ status: [] })
  const [unfilteredTotalItems, setUnfilteredTotalItems] = useState(0)

  const fetchPayments = useCallback(
    async (page = 1, state?: TransactionState, fetchQuery?: string, abortSignal?: AbortSignal) => {
      try {
        setIsLoading(true)
        setError(null)

        const filters = {
          pageSize,
          statusFilter: state || 'all',
          query: fetchQuery
        };

        const response = await paymentsService.getPaymentsForNavigation(page, filters)
        
        if (!response) {
          throw new Error('No response received from server')
        }
        
        if (abortSignal?.aborted) {
          return
        }
        
        // Use payments directly - no need for conversion
        setPayments(response.data)
        setTotalItems(response.total)
        setTotalPages(Math.ceil(response.total / pageSize))
        
      } catch (error) {
        if (abortSignal?.aborted) {
          return
        }
        
        const errorMessage = error instanceof Error ? error.message : 'Failed to load payments'
        console.error('Error fetching payments:', error)
        setError(errorMessage)
        toast.error(errorMessage)
        
        setPayments([])
        setTotalItems(0)
        setTotalPages(0)
        setFacets({ status: [] })
      } finally {
        if (!abortSignal?.aborted) {
          setIsLoading(false)
        }
      }
    },
    [pageSize]
  )

  const fetchUnfilteredFacets = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      const response = await paymentsService.getTransactions({
        page: 0,
        size: 1,
      })
      
      if (abortSignal?.aborted) {
        return
      }
      
      if (response?.facets) {
        const transformedFacets = transformBackendFacetsToPaymentFacets(response.facets)
        setUnfilteredFacets(transformedFacets)
      }
      
      if (response?.totalElements !== undefined) {
        setUnfilteredTotalItems(response.totalElements)
      }
    } catch (error) {
      if (abortSignal?.aborted) {
        return
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payment statistics'
      console.error('Error fetching unfiltered facets:', error)
      toast.error(errorMessage)
      setUnfilteredFacets({ status: [] })
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const state = statusFilter && statusFilter !== 'all' ? statusFilter as TransactionState : undefined
    fetchPayments(currentPage, state, query, abortController.signal)
    
    return () => {
      abortController.abort()
    }
  }, [currentPage, statusFilter, query, fetchPayments])

  useEffect(() => {
    const abortController = new AbortController()
    fetchUnfilteredFacets(abortController.signal)
    
    return () => {
      abortController.abort()
    }
  }, [fetchUnfilteredFacets])

  const retry = useCallback(() => {
    const abortController = new AbortController()
    const state = statusFilter && statusFilter !== 'all' ? statusFilter as TransactionState : undefined
    fetchPayments(currentPage, state, query, abortController.signal)
    fetchUnfilteredFacets(abortController.signal)
  }, [currentPage, statusFilter, query, fetchPayments, fetchUnfilteredFacets])

  return {
    payments,
    isLoading,
    error,
    totalItems,
    totalPages,
    facets,
    unfilteredFacets,
    unfilteredTotalItems,
    retry,
  }
}
