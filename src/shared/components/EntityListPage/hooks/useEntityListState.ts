import { useState, useEffect, useRef, useCallback } from 'react'
import type { ManagedColumn } from '../types'

export interface UseEntityListStateProps {
  statusFilter?: string
  tableFilters?: Record<string, unknown>
  query?: string
  onPageReset?: () => void
  onColumnReset?: () => void
}

export interface UseEntityListStateReturn {
  currentPage: number
  setCurrentPage: (page: number) => void
  managedColumns: ManagedColumn[] | undefined
  setManagedColumns: (columns: ManagedColumn[] | undefined) => void
  handlePageSizeChange: (newPageSize: number, setPageSize: (size: number) => void) => void
}

export function useEntityListState(props: UseEntityListStateProps = {}): UseEntityListStateReturn {
  const { statusFilter, tableFilters, query, onPageReset, onColumnReset } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [managedColumns, setManagedColumns] = useState<ManagedColumn[] | undefined>(undefined)
  const previousFiltersRef = useRef<Record<string, unknown>>({})
  const previousQueryRef = useRef('')
  const previousStatusRef = useRef('')

  useEffect(() => {
    const filtersChanged = JSON.stringify(tableFilters) !== JSON.stringify(previousFiltersRef.current)
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1)
      onPageReset?.()
    }
    previousFiltersRef.current = tableFilters || {}
  }, [tableFilters, currentPage, onPageReset])

  useEffect(() => {
    if (query !== previousQueryRef.current && currentPage !== 1) {
      setCurrentPage(1)
      onPageReset?.()
    }
    previousQueryRef.current = query || ''
  }, [query, currentPage, onPageReset])

  useEffect(() => {
    if (statusFilter !== previousStatusRef.current) {
      setManagedColumns(undefined)
      onColumnReset?.()
    }
    previousStatusRef.current = statusFilter || ''
  }, [statusFilter, onColumnReset])

  const handlePageSizeChange = useCallback((newPageSize: number, setPageSize: (size: number) => void) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
    onPageReset?.()
  }, [onPageReset])

  return {
    currentPage,
    setCurrentPage,
    managedColumns,
    setManagedColumns,
    handlePageSizeChange
  }
}

