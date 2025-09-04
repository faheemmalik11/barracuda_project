import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import type { TableFiltersConfig } from '@shared/types/filters'
import { FilterSessionManager } from '@shared/utils/FilterSessionManager'

interface FilterState {
  filterValues: Record<string, unknown>
  activatedHiddenFilters: string[]
}

type FilterAction =
  | { type: 'SET_FILTER'; key: string; value: unknown }
  | { type: 'CLEAR_FILTER'; key: string }
  | { type: 'CLEAR_ALL_FILTERS' }
  | { type: 'ACTIVATE_HIDDEN_FILTER'; key: string }
  | { type: 'REMOVE_ALL_ADDITIONAL_FILTERS' }

interface UseFilterManagerProps {
  config: TableFiltersConfig
  initialValues?: Record<string, unknown>
  onFiltersChange?: (filters: Record<string, unknown>) => void
}

interface UseFilterManagerReturn {
  filterValues: Record<string, unknown>
  activeFilters: string[]
  activatedHiddenFilters: string[]
  defaultVisibleFilters: unknown[]
  hiddenFilters: unknown[]
  activatedHiddenFilterConfigs: unknown[]
  availableHiddenFilters: unknown[]
  hasActiveFilters: boolean
  handleFilterChange: (key: string, value: unknown) => void
  clearFilter: (key: string) => void
  clearAllFilters: () => void
  activateHiddenFilter: (key: string) => void
  removeAllAdditionalFilters: () => void
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_FILTER': {
      const { key, value } = action
      const newFilterValues = { ...state.filterValues }
      
      if (value == null) {
        delete newFilterValues[key]
      } else {
        newFilterValues[key] = value
      }
      
      return { ...state, filterValues: newFilterValues }
    }
    
    case 'CLEAR_FILTER': {
      const newFilterValues = { ...state.filterValues }
      delete newFilterValues[action.key]
      const newActivatedHiddenFilters = state.activatedHiddenFilters.filter(
        k => k !== action.key
      )
      
      return {
        filterValues: newFilterValues,
        activatedHiddenFilters: newActivatedHiddenFilters,
      }
    }
    
    case 'CLEAR_ALL_FILTERS':
      return { filterValues: {}, activatedHiddenFilters: [] }
    
    case 'ACTIVATE_HIDDEN_FILTER':
      return {
        ...state,
        activatedHiddenFilters: [...state.activatedHiddenFilters, action.key],
      }
    
    case 'REMOVE_ALL_ADDITIONAL_FILTERS': {
      const newFilterValues = { ...state.filterValues }
      state.activatedHiddenFilters.forEach(key => {
        delete newFilterValues[key]
      })
      return { filterValues: newFilterValues, activatedHiddenFilters: [] }
    }
    
    default:
      return state
  }
}

function categorizeFilters(config: TableFiltersConfig) {
  const maxVisible = config.visibleFilters ?? 5
  const explicitlyVisible = config.filters.filter(f => f.isVisible === true)
  
  const defaultVisibleFilters = explicitlyVisible.length > 0
    ? explicitlyVisible.slice(0, maxVisible)
    : config.filters.slice(0, maxVisible)

  const visibleKeys = new Set(defaultVisibleFilters.map(f => f.key))
  const hiddenFromPrimary = config.filters.filter(f => !visibleKeys.has(f.key))
  const hiddenFilters = [...hiddenFromPrimary, ...(config.additionalFilters || [])]

  return { defaultVisibleFilters, hiddenFilters }
}

function initializeFilterState(
  config: TableFiltersConfig,
  initialValues: Record<string, unknown> = {}
): FilterState {
  const { hiddenFilters } = categorizeFilters(config)
  let filterValues = { ...initialValues }
  let activatedHiddenFilters: string[] = []

  if (config.enableSessionPersistence && config.sessionKey) {
    const persistedFilters = FilterSessionManager.loadFilters(config.sessionKey)
    const persistedActivated = FilterSessionManager.loadActivatedFilters(config.sessionKey)
    
    filterValues = { ...persistedFilters, ...filterValues }
    activatedHiddenFilters = persistedActivated
  }

  const computedActivatedHidden = Object.keys(filterValues).filter(key =>
    hiddenFilters.some(f => f.key === key)
  )

  const finalActivatedHidden = activatedHiddenFilters.length 
    ? activatedHiddenFilters 
    : computedActivatedHidden

  return {
    filterValues,
    activatedHiddenFilters: finalActivatedHidden,
  }
}

export const useFilterManager = ({
  config,
  initialValues = {},
  onFiltersChange,
}: UseFilterManagerProps): UseFilterManagerReturn => {

  const [state, setState] = useState(() => initializeFilterState(config, initialValues))
  const initialValuesRef = useRef(initialValues)
  const onFiltersChangeRef = useRef(onFiltersChange)
  const lastPersistedFiltersRef = useRef<string>('')

  useEffect(() => {
    onFiltersChangeRef.current = onFiltersChange
  })

  useEffect(() => {
    if (JSON.stringify(initialValuesRef.current) !== JSON.stringify(initialValues)) {
      initialValuesRef.current = initialValues
      setState(initializeFilterState(config, initialValues))
    }
  }, [initialValues, config])

  const dispatch = useCallback((action: FilterAction) => {
    setState(currentState => filterReducer(currentState, action))
  }, [])

  const { defaultVisibleFilters, hiddenFilters } = useMemo(
    () => categorizeFilters(config),
    [config.entityType, config.filters, config.additionalFilters, config.visibleFilters]
  )

  const activeFilterKeys = useMemo(
    () => Object.keys(state.filterValues).filter(key => 
      state.filterValues[key] != null
    ),
    [state.filterValues]
  )

  const activatedHiddenFilterConfigs = useMemo(
    () => hiddenFilters.filter(f => state.activatedHiddenFilters.includes(f.key)),
    [state.activatedHiddenFilters, hiddenFilters]
  )

  const availableHiddenFilters = useMemo(
    () => hiddenFilters.filter(f => !state.activatedHiddenFilters.includes(f.key)),
    [hiddenFilters, state.activatedHiddenFilters]
  )

  const hasActiveFilters = activeFilterKeys.length > 0

  const handleFilterChange = useCallback(
    (key: string, value: unknown) => {
      dispatch({ type: 'SET_FILTER', key, value })
    },
    [dispatch]
  )

  const clearFilter = useCallback(
    (key: string) => {
      dispatch({ type: 'CLEAR_FILTER', key })
    },
    [dispatch]
  )

  const clearAllFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_FILTERS' })
    
    if (config.enableSessionPersistence && config.sessionKey) {
      FilterSessionManager.clearFilters(config.sessionKey)
    }
    
    onFiltersChangeRef.current?.({})
  }, [dispatch, config.enableSessionPersistence, config.sessionKey])

  const activateHiddenFilter = useCallback(
    (filterKey: string) => {
      dispatch({ type: 'ACTIVATE_HIDDEN_FILTER', key: filterKey })
    },
    [dispatch]
  )

  const removeAllAdditionalFilters = useCallback(() => {
    dispatch({ type: 'REMOVE_ALL_ADDITIONAL_FILTERS' })
  }, [dispatch])

  const lastFiltersRef = useRef<Record<string, unknown>>({})
  
  useEffect(() => {
    const currentFiltersString = JSON.stringify(state.filterValues)
    const lastFiltersString = JSON.stringify(lastFiltersRef.current)
    
    if (currentFiltersString !== lastFiltersString) {
      lastFiltersRef.current = { ...state.filterValues }
      onFiltersChangeRef.current?.(state.filterValues)
    }
  }, [state.filterValues])

  useEffect(() => {
    if (config.enableSessionPersistence && config.sessionKey) {
      const currentStateString = JSON.stringify({ 
        filters: state.filterValues, 
        activated: state.activatedHiddenFilters 
      })
      
      if (currentStateString !== lastPersistedFiltersRef.current) {
        FilterSessionManager.saveFilters(config.sessionKey, state.filterValues)
        FilterSessionManager.saveActivatedFilters(config.sessionKey, state.activatedHiddenFilters)
        lastPersistedFiltersRef.current = currentStateString
      }
    }
  }, [state.filterValues, state.activatedHiddenFilters, config.enableSessionPersistence, config.sessionKey])

  return {
    filterValues: state.filterValues,
    activeFilters: activeFilterKeys,
    activatedHiddenFilters: state.activatedHiddenFilters,
    defaultVisibleFilters,
    hiddenFilters,
    activatedHiddenFilterConfigs,
    availableHiddenFilters,
    hasActiveFilters,
    handleFilterChange,
    clearFilter,
    clearAllFilters,
    activateHiddenFilter,
    removeAllAdditionalFilters,
  }
}