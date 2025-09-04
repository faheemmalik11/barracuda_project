import { useEffect, useRef, useCallback, useMemo, ReactNode } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { EntityListPage } from '@shared/components/EntityListPage/EntityListPage'
import { useNavigationState } from '@shared/components/panels/hooks'
import type { NavigationFilters } from '@shared/components/panels/hooks'
import { buildNavigationParams, getInitialFiltersFromUrl, getInitialPageFromUrl } from '@shared/utils/navigation-params'
import type { 
  PageHeaderConfig, 
  StatusFilter, 
  TableConfig, 
  TableFiltersConfig,
  UseFiltersHook,
  UseSelectionHook
} from '@shared/components/EntityListPage/types'

interface EntityListPageWithPanelProps<T extends { id: string; transactionRef: string }> {
  fetchData: (page: number, filters: NavigationFilters) => Promise<{ data: T[]; total: number }>
  pageConfig: {
    header: PageHeaderConfig
    statusFilters: readonly StatusFilter[]
    table: TableConfig<T>
    tableFilters: TableFiltersConfig
  }
  useFilters: () => UseFiltersHook
  useSelection: () => UseSelectionHook
  usePageSize: () => {
    pageSize: number
    setPageSize: (size: number) => void
    availablePageSizes: number[]
  }
  animationKey?: string
  renderPanel?: (props: {
    open: boolean
    onOpenChange: (open: boolean) => void
    entity: T | null
    onBack: () => void
    onOpenFullDetails: () => void
    totalItems: number
    navigatePrevious: () => void
    navigateNext: () => void
    canNavigatePrevious: boolean
    canNavigateNext: boolean
  }) => ReactNode
  fetchEntityDetails?: (entityRef: string) => Promise<any>
  basePath: string
}

export function EntityListPageWithPanel<T extends { id: string; transactionRef: string }>({
  fetchData,
  pageConfig,
  useFilters,
  useSelection,
  usePageSize,
  animationKey,
  renderPanel,
  fetchEntityDetails,
  basePath
}: EntityListPageWithPanelProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const hasProcessedSelectedEntity = useRef(false)
  
  const filters = useFilters()
  const pageSizeSelector = usePageSize()

  const initialPage = getInitialPageFromUrl(searchParams)
  const initialFilters = getInitialFiltersFromUrl(searchParams, {
    statusFilter: filters.statusFilter,
    query: filters.query,
    pageSize: pageSizeSelector.pageSize
  })


  const navigation = useNavigationState<T>({
    mode: 'panel',
    fetchData,
    initialPage,
    initialFilters,
  })

  const { updateFilters, setSelectedEntity, state: navigationState } = navigation

  // Update URL with page and filters
  useEffect(() => {
    const newParams = buildNavigationParams(
      navigationState.currentPage,
      navigationState.filters
    )
    
    if (searchParams.toString() !== newParams.toString()) {
      setSearchParams(newParams, { replace: true })
    }
  }, [navigationState.currentPage, navigationState.filters, searchParams, setSearchParams])

  const currentFilters = useMemo<NavigationFilters>(() => ({
    statusFilter: filters.statusFilter,
    query: filters.query,
    pageSize: pageSizeSelector.pageSize
  }), [filters.statusFilter, filters.query, pageSizeSelector.pageSize])

  useEffect(() => {
    const navFilters = navigationState.filters
    const hasFilterChanges = 
      navFilters.statusFilter !== currentFilters.statusFilter ||
      navFilters.query !== currentFilters.query ||
      navFilters.pageSize !== currentFilters.pageSize
    
    if (hasFilterChanges && !navigation.isLoading) {
      updateFilters(currentFilters)
    }
  }, [currentFilters, navigationState.filters, navigation.isLoading, updateFilters])

  useEffect(() => {
    if (navigationState.filters.pageSize !== currentFilters.pageSize && navigation.currentEntity) {
      setSelectedEntity(null)
    }
  }, [currentFilters.pageSize, navigationState.filters.pageSize, navigation.currentEntity, setSelectedEntity])

  useEffect(() => {
    const selectedEntityId = searchParams.get('selectedEntity')
    
    if (!selectedEntityId) {
      hasProcessedSelectedEntity.current = false
      return
    }
    
    if (navigation.isLoading) return
    
    if (navigationState.data.length > 0 && !hasProcessedSelectedEntity.current) {
      const entity = navigationState.data.find(e => e.id === selectedEntityId)
      
      if (entity) {
        hasProcessedSelectedEntity.current = true
        setSelectedEntity(entity)
        
        setSearchParams(prev => {
          const newParams = new URLSearchParams(prev)
          newParams.delete('selectedEntity')
          return newParams
        }, { replace: true })
      }
    }
  }, [searchParams, navigationState.data, setSelectedEntity, setSearchParams, navigation.isLoading])

  const useData = useCallback(() => {
    const totalPages = Math.ceil(navigationState.totalItems / pageSizeSelector.pageSize) || 0
    
    return {
      data: navigationState.data,
      isLoading: navigation.isLoading,
      totalItems: navigationState.totalItems,
      totalPages,
      facets: navigationState.facets || { status: [] },
      pagination: {
        currentPage: navigationState.currentPage,
        pageSize: pageSizeSelector.pageSize,
        totalItems: navigationState.totalItems,
        totalPages,
        onPageChange: navigation.goToPage
      }
    }
  }, [navigationState.data, navigationState.totalItems, navigationState.currentPage, navigation.isLoading, navigation.goToPage, pageSizeSelector.pageSize, navigationState.facets])

  return (
    <>
      <EntityListPage
        header={pageConfig.header}
        statusFilters={pageConfig.statusFilters}
        table={{
          ...pageConfig.table,
          props: {
            ...pageConfig.table.props,
            onRowClick: setSelectedEntity,
            activeItemId: navigation.currentEntity?.transactionRef || navigation.currentEntity?.id
          }
        }}
        tableFilters={pageConfig.tableFilters}
        useData={useData}
        useFilters={useFilters}
        useSelection={useSelection}
        usePageSize={usePageSize}
        animationKey={animationKey}
      />
      
      {renderPanel && renderPanel({
        open: !!navigation.currentEntity,
        onOpenChange: (open) => !open && setSelectedEntity(null),
        entity: navigation.currentEntity,
        onBack: () => setSelectedEntity(null),
        onOpenFullDetails: () => {
          if (navigation.currentEntity) {
            const params = buildNavigationParams(
              navigationState.currentPage,
              navigationState.filters
            )
            
            const queryString = params.toString()
            navigate(`${basePath}/${navigation.currentEntity.transactionRef || navigation.currentEntity.id}${queryString ? '?' + queryString : ''}`)
          }
        },
        totalItems: navigationState.totalItems,
        navigatePrevious: navigation.navigatePrevious,
        navigateNext: navigation.navigateNext,
        canNavigatePrevious: navigation.canNavigatePrevious,
        canNavigateNext: navigation.canNavigateNext
      })}
    </>
  )
}
