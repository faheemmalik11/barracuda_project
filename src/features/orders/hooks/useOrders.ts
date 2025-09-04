import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDebounce } from '@shared/utils/hooks/useDebounce'
import { mockOrders as rawMockOrders } from '@shared/data/mockOrders'
import type { Order } from '@shared/types/orders'

interface UseOrdersParams {
  pageSize?: number
  currentPage?: number
  statusFilter?: string
  filters?: Record<string, unknown>
}

// No transformation needed - mock data now matches shared Order interface

interface UseOrdersReturn {
  // Data
  orders: Order[]
  totalItems: number
  totalPages: number
  isLoading: boolean
  error: string | null
  facets: Record<string, unknown>
  
  // Filters
  statusFilter: string
  tableFilters: Record<string, unknown>
  activeFiltersCount: number
  setStatusFilter: (status: string) => void
  setTableFilters: (filters: Record<string, unknown>) => void
  clearAllFilters: () => void
  
  // Actions
  createOrder: () => void
  exportOrders: (orderIds: string[]) => void
  updateOrderStatus: (order: Order, status: string) => void
  cancelOrder: (order: Order) => void
  refundOrder: (order: Order) => void
  viewOrderDetails: (order: Order) => void
}

export const useOrders = ({
  pageSize = 20,
  currentPage = 1,
  statusFilter: initialStatusFilter = 'all',
  filters: initialFilters = {}
}: UseOrdersParams = {}): UseOrdersReturn => {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter)
  const [tableFilters, setTableFilters] = useState<Record<string, unknown>>(initialFilters)
  const [isLoading, setIsLoading] = useState(false)
  const [error] = useState<string | null>(null)

  const debouncedTableFilters = useDebounce(tableFilters, 300)
  const debouncedQuery = useMemo(() => 
    JSON.stringify({ statusFilter, ...debouncedTableFilters }),
    [statusFilter, debouncedTableFilters]
  )

  // Filter orders based on criteria
  const filteredOrders = useMemo(() => {
    let result = [...rawMockOrders]

    // Status filter
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter)
    }

    // Additional filters
    if (tableFilters.customerName && typeof tableFilters.customerName === 'string') {
      const searchTerm = tableFilters.customerName.toLowerCase()
      result = result.filter(order => {
        if (typeof order.customer === 'string') {
          return order.customer.toLowerCase().includes(searchTerm)
        } else {
          return order.customer.name.toLowerCase().includes(searchTerm) ||
                 order.customer.email.toLowerCase().includes(searchTerm)
        }
      })
    }

    if (tableFilters.amount) {
      // Add amount filtering logic
    }

    if (tableFilters.dateRange) {
      // Add date range filtering logic
    }

    return result
  }, [statusFilter, tableFilters])

  // Pagination
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredOrders.slice(startIndex, endIndex)
  }, [filteredOrders, currentPage, pageSize])

  const totalItems = filteredOrders.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Simulate loading for realistic behavior
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [debouncedQuery, currentPage])

  // Mock facets for status counting
  const facets = useMemo(() => {
    const statusCounts = rawMockOrders.reduce((acc: Record<string, number>, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      status: Object.entries(statusCounts).map(([value, count]) => ({
        value,
        count
      }))
    }
  }, [])

  // Filter management
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (statusFilter && statusFilter !== 'all') count++
    count += Object.values(tableFilters).filter(value => {
      if (!value || value === 'all' || value === '') return false
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0
      return true
    }).length
    return count
  }, [statusFilter, tableFilters])

  const clearAllFilters = useCallback(() => {
    setStatusFilter('all')
    setTableFilters({})
  }, [])

  const handleStatusFilterChange = useCallback((newStatus: string) => {
    if (statusFilter === newStatus) return
    setStatusFilter(newStatus)
    // Clear table filters when changing status
    if (newStatus === 'all') {
      setTableFilters({})
    }
  }, [statusFilter])

  const handleTableFiltersChange = useCallback((newFilters: Record<string, unknown>) => {
    setTableFilters(newFilters)
    // If there are non-status filters, clear status filter
    const hasNonStatusFilters = Object.entries(newFilters)
      .filter(([key]) => key !== 'status')
      .some(([, value]) => {
        if (value == null || value === '') return false
        if (Array.isArray(value)) return value.length > 0
        if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0
        return true
      })
    
    if (hasNonStatusFilters && statusFilter !== '') {
      setStatusFilter('')
    }
  }, [statusFilter])

  // Actions
  const createOrder = useCallback(() => {
    navigate('/orders/create')
  }, [navigate])

  const exportOrders = useCallback((orderIds: string[]) => {
    console.log('Exporting orders:', orderIds)
    toast.success(`Exporting ${orderIds.length} orders`)
  }, [])

  const updateOrderStatus = useCallback((order: Order, status: string) => {
    console.log('Updating order status:', order.id, status)
    toast.success(`Order ${order.id} status updated to ${status}`)
  }, [])

  const cancelOrder = useCallback((order: Order) => {
    console.log('Canceling order:', order.id)
    toast.success(`Order ${order.id} has been canceled`)
  }, [])

  const refundOrder = useCallback((order: Order) => {
    console.log('Refunding order:', order.id)
    toast.success(`Refund initiated for order ${order.id}`)
  }, [])

  const viewOrderDetails = useCallback((order: Order) => {
    navigate(`/orders/${order.id}`)
  }, [navigate])

  return {
    // Data
    orders: paginatedOrders,
    totalItems,
    totalPages,
    isLoading,
    error,
    facets,
    
    // Filters
    statusFilter,
    tableFilters,
    activeFiltersCount,
    setStatusFilter: handleStatusFilterChange,
    setTableFilters: handleTableFiltersChange,
    clearAllFilters,
    
    // Actions
    createOrder,
    exportOrders,
    updateOrderStatus,
    cancelOrder,
    refundOrder,
    viewOrderDetails,
  }
}
