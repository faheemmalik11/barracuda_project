import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDebounce } from '@shared/utils/hooks/useDebounce'
import { mockProducts } from '@shared/data/mockProducts'
import type { Product } from '../types/products.types'

interface UseProductsParams {
  pageSize?: number
  currentPage?: number
  statusFilter?: string
  filters?: Record<string, unknown>
}

interface UseProductsReturn {
  // Data
  products: Product[]
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
  query: string
  
  // Actions
  createProduct: () => void
  exportProducts: (productIds: string[]) => void
  duplicateProduct: (product: Product) => void
  editProduct: (product: Product) => void
  deleteProduct: (product: Product) => void
  updateProductStatus: (product: Product, status: string) => void
  viewProductDetails: (product: Product) => void
}

export const useProducts = ({
  pageSize = 20,
  currentPage = 1,
  statusFilter: initialStatusFilter = 'all',
  filters: initialFilters = {}
}: UseProductsParams): UseProductsReturn => {
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

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts]

    // Status filter
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(product => product.status === statusFilter)
    }

    // Product name filter
    if (tableFilters.productName && typeof tableFilters.productName === 'string') {
      const searchTerm = tableFilters.productName.toLowerCase()
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    }

    // Category filter
    if (tableFilters.category && tableFilters.category !== 'all') {
      result = result.filter(product => product.category === tableFilters.category)
    }

    // Price range filter
    if (tableFilters.priceRange) {
      const range = tableFilters.priceRange as { min?: number; max?: number }
      if (range.min !== undefined) {
        result = result.filter(product => product.price >= range.min!)
      }
      if (range.max !== undefined) {
        result = result.filter(product => product.price <= range.max!)
      }
    }

    // SKU filter
    if (tableFilters.sku && typeof tableFilters.sku === 'string') {
      const searchTerm = tableFilters.sku.toLowerCase()
      result = result.filter(product =>
        product.sku?.toLowerCase().includes(searchTerm) || false
      )
    }

    // Stock status filter
    if (tableFilters.stockStatus) {
      if (tableFilters.stockStatus === 'low') {
        result = result.filter(product => (product.stock || 0) <= 10)
      } else if (tableFilters.stockStatus === 'out') {
        result = result.filter(product => (product.stock || 0) === 0)
      } else if (tableFilters.stockStatus === 'in-stock') {
        result = result.filter(product => (product.stock || 0) > 10)
      }
    }

    return result
  }, [statusFilter, tableFilters])

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, pageSize])

  const totalItems = filteredProducts.length
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
    const statusCounts = mockProducts.reduce((acc, product) => {
      acc[product.status] = (acc[product.status] || 0) + 1
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
  const createProduct = useCallback(() => {
    navigate('/products/create')
  }, [navigate])

  const exportProducts = useCallback((productIds: string[]) => {
    console.log('Exporting products:', productIds)
    toast.success(`Exporting ${productIds.length} products`)
  }, [])

  const duplicateProduct = useCallback((product: Product) => {
    console.log('Duplicating product:', product.id)
    toast.success(`Product "${product.name}" duplicated`)
  }, [])

  const editProduct = useCallback((product: Product) => {
    navigate(`/products/${product.id}/edit`)
  }, [navigate])

  const deleteProduct = useCallback((product: Product) => {
    console.log('Deleting product:', product.id)
    toast.success(`Product "${product.name}" deleted`)
  }, [])

  const updateProductStatus = useCallback((product: Product, status: string) => {
    console.log('Updating product status:', product.id, status)
    toast.success(`Product "${product.name}" status updated to ${status}`)
  }, [])

  const viewProductDetails = useCallback((product: Product) => {
    navigate(`/products/${product.id}`)
  }, [navigate])

  return {
    // Data
    products: paginatedProducts,
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
    query: debouncedQuery,
    
    // Actions
    createProduct,
    exportProducts,
    duplicateProduct,
    editProduct,
    deleteProduct,
    updateProductStatus,
    viewProductDetails,
  }
}
