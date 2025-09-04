import { useState, useEffect, useMemo } from 'react'
import { mockDisputes } from '@shared/data/mockDisputes'
import type { Dispute } from '../types/disputes.types'

interface UseDisputesParams {
  pageSize?: number
  currentPage?: number
  statusFilter?: string
  filters?: Record<string, unknown>
}

interface UseDisputesReturn {
  disputes: Dispute[]
  totalItems: number
  totalPages: number
  isLoading: boolean
  error: string | null
  facets: Record<string, unknown>
}

export const useDisputes = ({
  pageSize = 20,
  currentPage = 1,
  statusFilter = 'all',
  filters = {}
}: UseDisputesParams): UseDisputesReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error] = useState<string | null>(null)

  // Filter disputes based on criteria
  const filteredDisputes = useMemo(() => {
    let result = [...mockDisputes]

    // Status filter
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(dispute => dispute.status === statusFilter)
    }

    // Customer search filter
    if (filters.customerName && typeof filters.customerName === 'string') {
      const searchTerm = filters.customerName.toLowerCase()
      result = result.filter(dispute =>
        dispute.customer.name.toLowerCase().includes(searchTerm) ||
        dispute.customer.email.toLowerCase().includes(searchTerm)
      )
    }

    return result
  }, [statusFilter, filters])

  // Pagination
  const paginatedDisputes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredDisputes.slice(startIndex, endIndex)
  }, [filteredDisputes, currentPage, pageSize])

  const totalItems = filteredDisputes.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Simulate loading for realistic behavior
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [statusFilter, filters, currentPage])

  const facets = useMemo(() => {
    const statusCounts = mockDisputes.reduce((acc, dispute) => {
      acc[dispute.status] = (acc[dispute.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      status: Object.entries(statusCounts).map(([value, count]) => ({
        value,
        count
      }))
    }
  }, [])

  return {
    disputes: paginatedDisputes,
    totalItems,
    totalPages,
    isLoading,
    error,
    facets,
  }
}