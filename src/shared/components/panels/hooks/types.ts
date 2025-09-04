import type { EntityFacets } from '@shared/types/status-filter.types'

export type NavigationMode = 'panel' | 'detail'

export type FilterValue = string | number | boolean | string[] | number[] | null | undefined

export interface NavigationFilters {
  statusFilter?: string
  query?: string
  pageSize?: number
  [key: string]: FilterValue
}

export interface NavigationState<T extends { id: string, transactionRef: string } = { id: string, transactionRef: string }> {
  currentPage: number
  pageSize: number
  totalItems: number
  filters: NavigationFilters
  selectedEntityId: string | null
  data: T[]
  loading: boolean
  facets?: EntityFacets
}

export interface NavigationConfig<T extends { id: string, transactionRef: string } = { id: string, transactionRef: string }> {
  mode: NavigationMode
  fetchData: (page: number, filters: NavigationFilters) => Promise<{
    data: T[]
    total: number
    facets?: EntityFacets
  }>
  initialPage?: number
  initialFilters?: NavigationFilters
}

export interface NavigationResult<T extends { id: string, transactionRef: string } = { id: string, transactionRef: string }> {
  state: NavigationState<T>
  currentEntity: T | null
  currentIndex: number
  globalIndex: number
  totalPages: number
  canNavigateNext: boolean
  canNavigatePrevious: boolean
  navigateNext: () => Promise<void>
  navigatePrevious: () => Promise<void>
  goToPage: (page: number) => void
  setSelectedEntity: (entity: T | null) => void
  updateFilters: (filters: NavigationFilters) => void
  isLoading: boolean
  error: string | null
}