import { useState, useCallback, useMemo } from 'react'

const isFilterValueEmpty = (value: unknown): value is null | undefined | '' => 
  value == null || value === ''

interface UseFilterStateOptions {
  onFiltersChange?: (filters: Record<string, unknown>) => void
}

export function useFilterState<T extends Record<string, unknown>>(
  initialFilters: T,
  options: UseFilterStateOptions = {}
) {
  const [filters, setFilters] = useState<T>(initialFilters)
  const { onFiltersChange } = options

  const handleFilterChange = useCallback(
    (key: string, value: unknown) => {
      setFilters(prev => {
        const newFilters: Record<string, unknown> = { ...prev }
        
        if (isFilterValueEmpty(value)) {
          delete newFilters[key]
        } else {
          newFilters[key] = value
        }

        onFiltersChange?.(newFilters)
        return newFilters as T
      })
    },
    [onFiltersChange],
  )

  const clearAllFilters = useCallback(() => {
    setFilters({} as T)
    onFiltersChange?.({})
  }, [onFiltersChange])

  const activeFiltersCount = useMemo(() => 
    Object.values(filters).filter(value => !isFilterValueEmpty(value)).length,
    [filters]
  )

  const hasActiveFilters = useMemo(() => 
    activeFiltersCount > 0,
    [activeFiltersCount]
  )

  return {
    filters,
    setFilters,
    activeFiltersCount,
    clearAllFilters,
    handleFilterChange,
    hasActiveFilters,
  }
} 
