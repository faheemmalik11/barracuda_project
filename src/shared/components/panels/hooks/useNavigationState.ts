import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { NavigationConfig, NavigationResult, NavigationFilters, NavigationState } from './types'
import {
  calculateGlobalIndex,
  calculatePageFromIndex,
  canNavigateNext,
  canNavigatePrevious,
  calculateTotalPages,
  normalizePageNumber
} from './utils'

export function useNavigationState<T extends { id: string }>(
  config: NavigationConfig<T>
): NavigationResult<T> {
  const { mode, fetchData, initialPage = 1, initialFilters = {} } = config
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)
  
  const [error, setError] = useState<string | null>(null)
  const [state, setState] = useState<NavigationState<T>>({
    currentPage: initialPage,
    pageSize: initialFilters.pageSize || 20,
    totalItems: 0,
    filters: initialFilters,
    selectedEntityId: null,
    data: [],
    loading: false,
    facets: { status: [] },
  })
  
  useEffect(() => {
    const currentBasePath = location.pathname.split('/')[1] || ''
    const prevBasePath = prevPathRef.current.split('/')[1] || ''
    
    if (prevBasePath && prevBasePath !== currentBasePath) {
      setState(prev => ({ ...prev, selectedEntityId: null }))
    }
    
    prevPathRef.current = location.pathname
  }, [location.pathname])
  
  const fetchDataForPage = useCallback(async (page: number, filters: NavigationFilters, signal?: AbortSignal) => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      setError(null)
      
      const result = await fetchData(page, filters)
      
      if (!signal?.aborted) {
        setState(prev => ({
          ...prev,
          currentPage: page,
          filters,
          data: result.data,
          totalItems: result.total,
          loading: false,
          pageSize: filters.pageSize || prev.pageSize,
          facets: result.facets || { status: [] }
        }))
      }
      
      return result.data
    } catch (err) {
      if (!signal?.aborted) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data'
        setError(errorMessage)
        setState(prev => ({ ...prev, loading: false }))
      }
      return []
    }
  }, [fetchData])

  useEffect(() => {
    if (mode === 'panel' || mode === 'detail') {
      const abortController = new AbortController()
      fetchDataForPage(initialPage, initialFilters, abortController.signal)
      
      return () => {
        abortController.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = calculateTotalPages(state.totalItems, state.pageSize)
  
  const currentEntity = useMemo(() => {
    if (!state.selectedEntityId || state.data.length === 0) return null
    return state.data.find(item => item.id === state.selectedEntityId) || null
  }, [state.selectedEntityId, state.data])

  const currentIndex = useMemo(() => {
    if (!currentEntity) return -1
    return state.data.findIndex(item => item.id === state.selectedEntityId)
  }, [currentEntity, state.data, state.selectedEntityId])

  const globalIndex = useMemo(() => {
    if (currentIndex === -1) return -1
    return calculateGlobalIndex(state.currentPage, currentIndex, state.pageSize)
  }, [state.currentPage, currentIndex, state.pageSize])

  const canGoNext = canNavigateNext(globalIndex, state.totalItems)
  const canGoPrevious = canNavigatePrevious(globalIndex)

  const setSelectedEntity = useCallback((entity: T | null) => {
    setState(prev => ({ ...prev, selectedEntityId: entity?.id || null }))
  }, [])

  const navigateNext = useCallback(async () => {
    if (!canGoNext) return

    const nextGlobalIndex = globalIndex + 1
    const nextPage = calculatePageFromIndex(nextGlobalIndex, state.pageSize)

    if (nextPage !== state.currentPage) {
      const newData = await fetchDataForPage(nextPage, state.filters)
      const nextEntity = newData[0]
      if (nextEntity) {
        setSelectedEntity(nextEntity)
      }
    } else {
      const nextEntity = state.data[currentIndex + 1]
      if (nextEntity) setSelectedEntity(nextEntity)
    }
  }, [canGoNext, globalIndex, currentIndex, fetchDataForPage, setSelectedEntity, state.pageSize, state.currentPage, state.filters, state.data])

  const navigatePrevious = useCallback(async () => {
    if (!canGoPrevious) return

    const prevGlobalIndex = globalIndex - 1
    const prevPage = calculatePageFromIndex(prevGlobalIndex, state.pageSize)

    if (prevPage !== state.currentPage) {
      const newData = await fetchDataForPage(prevPage, state.filters)
      const lastIndex = newData.length - 1
      const prevEntity = newData[lastIndex]
      if (prevEntity) {
        setSelectedEntity(prevEntity)
      }
    } else {
      const prevEntity = state.data[currentIndex - 1]
      if (prevEntity) setSelectedEntity(prevEntity)
    }
  }, [canGoPrevious, globalIndex, currentIndex, fetchDataForPage, setSelectedEntity, state.pageSize, state.currentPage, state.filters, state.data])


  const goToPage = useCallback(async (page: number) => {
    const normalizedPage = normalizePageNumber(page, totalPages)
    if (normalizedPage === state.currentPage) return

    await fetchDataForPage(normalizedPage, state.filters)
  }, [totalPages, fetchDataForPage, state.currentPage, state.filters])

  const updateFilters = useCallback(async (filters: NavigationFilters) => {
    const hasChanges = 
      state.filters.statusFilter !== filters.statusFilter ||
      state.filters.query !== filters.query ||
      state.filters.pageSize !== filters.pageSize
    
    if (!hasChanges) return
    
    if (filters.pageSize && filters.pageSize !== state.pageSize) {
      setState(prev => ({ 
        ...prev,
        pageSize: filters.pageSize!,
        selectedEntityId: null,
        currentPage: 1
      }))
    }
    
    await fetchDataForPage(1, filters)
  }, [fetchDataForPage, state.filters, state.pageSize])

  return {
    state,
    currentEntity,
    currentIndex,
    globalIndex,
    totalPages,
    canNavigateNext: canGoNext,
    canNavigatePrevious: canGoPrevious,
    navigateNext,
    navigatePrevious,
    goToPage,
    setSelectedEntity,
    updateFilters,
    isLoading: state.loading,
    error,
  }
}
