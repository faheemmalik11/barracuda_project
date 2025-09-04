import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDebounce } from '@shared/utils/hooks/useDebounce'
import { mockTerminals } from '@shared/data/mockTerminals'
import type { Terminal } from '../types/terminals.types'

interface UseTerminalsParams {
  pageSize?: number
  currentPage?: number
  statusFilter?: string
  query?: string
  filters?: Record<string, unknown>
}

interface UseTerminalsReturn {
  // Data
  terminals: Terminal[]
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
  createTerminal: () => void
  exportTerminals: (terminalIds: string[]) => void
  restartTerminal: (terminal: Terminal) => void
  configureTerminal: (terminal: Terminal) => void
  updateTerminalStatus: (terminal: Terminal, status: string) => void
  viewTerminalDetails: (terminal: Terminal) => void
}

export const useTerminals = ({
  pageSize = 20,
  currentPage = 1,
  statusFilter: initialStatusFilter = 'all',
  filters: initialFilters = {}
}: UseTerminalsParams): UseTerminalsReturn => {
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

  // Filter terminals based on criteria
  const filteredTerminals = useMemo(() => {
    let result = [...mockTerminals]

    // Status filter
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(terminal => terminal.status === statusFilter)
    }

    // Location filter
    if (tableFilters.location && typeof tableFilters.location === 'string') {
      const searchTerm = tableFilters.location.toLowerCase()
      result = result.filter(terminal => {
        if (typeof terminal.location === 'string') {
          return terminal.location.toLowerCase().includes(searchTerm)
        } else {
          return terminal.location.name.toLowerCase().includes(searchTerm) ||
                 terminal.location.city.toLowerCase().includes(searchTerm)
        }
      })
    }

    // Terminal type filter
    if (tableFilters.deviceType && typeof tableFilters.deviceType === 'string') {
      const searchTerm = tableFilters.deviceType.toLowerCase()
      result = result.filter(terminal =>
        terminal.deviceType.toLowerCase().includes(searchTerm)
      )
    }

    // Serial number filter
    if (tableFilters.serialNumber && typeof tableFilters.serialNumber === 'string') {
      const searchTerm = tableFilters.serialNumber.toLowerCase()
      result = result.filter(terminal =>
        terminal.serialNumber.toLowerCase().includes(searchTerm)
      )
    }

    // Connection type filter - only filter if terminal has connectionType property
    if (tableFilters.connectionType && tableFilters.connectionType !== 'all') {
      result = result.filter(terminal => 
        'connectionType' in terminal && terminal.connectionType === tableFilters.connectionType
      )
    }

    // Battery level filter (low battery)
    if (tableFilters.lowBattery === true) {
      result = result.filter(terminal => (terminal.batteryLevel || 0) < 20)
    }

    return result
  }, [statusFilter, tableFilters])

  // Pagination
  const paginatedTerminals = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredTerminals.slice(startIndex, endIndex)
  }, [filteredTerminals, currentPage, pageSize])

  const totalItems = filteredTerminals.length
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
    const statusCounts = mockTerminals.reduce((acc, terminal) => {
      acc[terminal.status] = (acc[terminal.status] || 0) + 1
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
  const createTerminal = useCallback(() => {
    navigate('/terminals/create')
  }, [navigate])

  const exportTerminals = useCallback((terminalIds: string[]) => {
    toast.success(`Exporting ${terminalIds.length} terminals`)
  }, [])

  const restartTerminal = useCallback((terminal: Terminal) => {
    toast.success(`Terminal ${terminal.label} is restarting`)
  }, [])

  const configureTerminal = useCallback((terminal: Terminal) => {
    navigate(`/terminals/${terminal.id}/configure`)
  }, [navigate])

  const updateTerminalStatus = useCallback((terminal: Terminal, status: string) => {
    toast.success(`Terminal ${terminal.label} status updated to ${status}`)
  }, [])

  const viewTerminalDetails = useCallback((terminal: Terminal) => {
    navigate(`/terminals/${terminal.id}`)
  }, [navigate])

  return {
    // Data
    terminals: paginatedTerminals as unknown as Terminal[],
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
    createTerminal,
    exportTerminals,
    restartTerminal,
    configureTerminal,
    updateTerminalStatus,
    viewTerminalDetails,
  }
}