import type { NavigationFilters } from '@shared/components/panels/hooks'

export function buildNavigationParams(
  page: number,
  filters: NavigationFilters,
  selectedEntity?: string
): URLSearchParams {
  const params = new URLSearchParams()
  
  if (page > 1) {
    params.set('page', page.toString())
  }
  
  if (filters.statusFilter && filters.statusFilter !== 'all') {
    params.set('status', filters.statusFilter)
  }
  
  if (filters.query?.trim()) {
    params.set('query', filters.query.trim())
  }
  
  if (selectedEntity?.trim()) {
    params.set('selectedEntity', selectedEntity.trim())
  }
  
  return params
}

export function getInitialFiltersFromUrl(
  searchParams: URLSearchParams,
  defaultFilters: NavigationFilters
): NavigationFilters {
  return {
    statusFilter: searchParams.get('status') || defaultFilters.statusFilter,
    query: searchParams.get('query') || defaultFilters.query,
    pageSize: defaultFilters.pageSize
  }
}

export function getInitialPageFromUrl(searchParams: URLSearchParams): number {
  const urlPage = searchParams.get('page')
  if (!urlPage) return 1
  
  const pageNumber = parseInt(urlPage, 10)
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1
}