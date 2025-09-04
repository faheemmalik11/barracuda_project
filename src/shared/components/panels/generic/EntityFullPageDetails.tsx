import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, ReactNode } from "react"
import { useNavigationState } from '@shared/components/panels/hooks'
import type { NavigationFilters } from '@shared/components/panels/hooks'
import { buildNavigationParams, getInitialFiltersFromUrl, getInitialPageFromUrl } from '@shared/utils/navigation-params'
import { UserPreferencesManager } from '@shared/utils/UserPreferencesManager'
import { EntityStatusPanel } from '../components/StatusPanel'
import type { EntityStatusPanelConfig } from '../components/StatusPanel'

// Shared layout classes
const FULL_PAGE_LAYOUT = "min-h-screen bg-muted -mx-4 -my-4 sm:-mx-6 lg:-mx-8"
const CENTER_LAYOUT = "flex items-center justify-center"
const CONTENT_LAYOUT = "px-4 py-6 sm:px-6 lg:px-8"

interface EntityFullPageDetailsProps<T extends { id: string; transactionRef: string }> {
  fetchData: (page: number, filters: NavigationFilters) => Promise<{ data: T[]; total: number }>
  renderDetails: (entity: T, navigation: {
    onBack: () => void
    totalItems: number
    navigatePrevious: () => void
    navigateNext: () => void
    canNavigatePrevious: boolean
    canNavigateNext: boolean
  }) => ReactNode
  entityName: string
  basePath: string
}

interface BaseFullPageDetailsProps<T extends { id: string; transactionRef: string }, TInfo extends { id: string | number; status: string; transactionRef?: string }> {
  entity: T
  entityInfo: TInfo
  config: EntityStatusPanelConfig<TInfo>
  metadataComponent: React.ComponentType<{ info: TInfo }>
  actionsComponent: React.ComponentType<{ entityInfo: TInfo }>
  renderSections: (options: { sections: { isExpanded: () => boolean; toggleSection: () => void }; isDetailView: boolean }) => React.ReactNode
  onBack?: () => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function BaseFullPageDetails<T extends { id: string; transactionRef: string }, TInfo extends { id: string | number; status: string; transactionRef?: string }>({ 
  entity,
  entityInfo,
  config,
  metadataComponent: MetadataComponent,
  actionsComponent: ActionsComponent,
  renderSections,
  onBack, 
  totalItems = 0,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: BaseFullPageDetailsProps<T, TInfo>) {
  return (
    <div className="space-y-8 rounded-lg p-6">
      <EntityStatusPanel
        entityInfo={entityInfo}
        config={config}
        metadataComponent={() => <MetadataComponent info={entityInfo} />}
        actionsComponent={() => <ActionsComponent entityInfo={entityInfo} />}
        currentEntityId={entity.transactionRef || entity.id}
        onBack={onBack}
        isDetailView={true}
        totalItems={totalItems}
        navigatePrevious={navigatePrevious}
        navigateNext={navigateNext}
        canNavigatePrevious={canNavigatePrevious}
        canNavigateNext={canNavigateNext}
      />
      
      <div className="space-y-8">
        {renderSections({ 
          sections: { isExpanded: () => true, toggleSection: () => {} }, 
          isDetailView: true 
        })}
      </div>
    </div>
  )
}

// Custom hook to extract complex navigation logic
function useEntityNavigation<T extends { id: string; transactionRef: string }>({
  fetchData,
  basePath
}: { fetchData: EntityFullPageDetailsProps<T>['fetchData'], basePath: string }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Initialize navigation state
  const initialPage = getInitialPageFromUrl(searchParams)
  const savedPageSize = UserPreferencesManager.getPageSize()
  const initialFilters = getInitialFiltersFromUrl(searchParams, {
    statusFilter: undefined,
    query: undefined,
    pageSize: savedPageSize
  })
  
  const navigation = useNavigationState<T>({
    mode: 'detail',
    fetchData,
    initialPage,
    initialFilters,
  })
  
  const { state: currentState, setSelectedEntity } = navigation

  // Find entity from navigation state or data
  const entity = navigation.currentEntity || currentState.data.find(e => (e.transactionRef || e.id) === id) || null

  // Auto-select entity when data is loaded and URL has an ID
  useEffect(() => {
    if (id && currentState.data.length > 0 && !navigation.currentEntity) {
      const foundEntity = currentState.data.find(e => (e.transactionRef || e.id) === id)
      if (foundEntity) {
        setSelectedEntity(foundEntity)
      }
    }
  }, [id, currentState.data, navigation.currentEntity, setSelectedEntity])

  // Navigation effect - update URL when selected entity changes
  useEffect(() => {
    if (navigation.currentEntity && (navigation.currentEntity.transactionRef || navigation.currentEntity.id) !== id) {
      const params = buildNavigationParams(currentState.currentPage, currentState.filters)
      const queryString = params.toString()
      navigate(`${basePath}/${navigation.currentEntity.transactionRef || navigation.currentEntity.id}${queryString ? '?' + queryString : ''}`, { replace: true })
    }
  }, [navigation.currentEntity, id, navigate, basePath, currentState.currentPage, currentState.filters])

  const handleBack = () => {
    const params = buildNavigationParams(currentState.currentPage, currentState.filters, id)
    const queryString = params.toString()
    navigate(`${basePath}${queryString ? '?' + queryString : ''}`)
  }

  return {
    entity,
    isLoading: navigation.isLoading,
    navigationProps: {
      onBack: handleBack,
      totalItems: currentState.totalItems,
      navigatePrevious: navigation.navigatePrevious,
      navigateNext: navigation.navigateNext,
      canNavigatePrevious: navigation.canNavigatePrevious,
      canNavigateNext: navigation.canNavigateNext
    }
  }
}

export function EntityFullPageDetails<T extends { id: string; transactionRef: string }>({
  fetchData,
  renderDetails,
  entityName,
  basePath
}: EntityFullPageDetailsProps<T>) {
  const { id } = useParams<{ id: string }>()
  const { entity, isLoading, navigationProps } = useEntityNavigation({ fetchData, basePath })

  if (isLoading) {
    return (
      <div className={`${FULL_PAGE_LAYOUT} ${CENTER_LAYOUT}`}>
        <div className="text-muted-foreground">Loading {entityName} details...</div>
      </div>
    )
  }

  if (!entity) {
    return (
      <div className={`${FULL_PAGE_LAYOUT} ${CENTER_LAYOUT}`}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {entityName} Not Found
          </h1>
          <p className="text-muted-foreground">
            {entityName} with ID "{id}" could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={FULL_PAGE_LAYOUT}>
      <div className={CONTENT_LAYOUT}>
        <div className="mx-auto max-w-7xl">
          {renderDetails(entity, navigationProps)}
        </div>
      </div>
    </div>
  )
}
