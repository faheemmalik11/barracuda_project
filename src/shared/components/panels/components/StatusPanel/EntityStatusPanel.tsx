import { useMemo } from 'react'
import { cn } from '@shared/lib/utils'
import { PANEL_SPACING } from '../../constants/spacing'
import { NavigationHeader } from './components/NavigationHeader'
import { Button } from '@shared/components/ui/button'
import { useEntityWatching } from '../../hooks/useEntityWatching'
import { useEntityStatus } from '../../hooks/useEntityStatus'
import { useEntityNavigation } from '../../hooks/useEntityNavigation'

export interface EntityStatusPanelConfig<T> {
  entityType: string
  entityLabel: string
  primaryField: keyof T
  primaryFieldFormatter?: (value: any) => string
}

export interface EntityStatusPanelProps<T extends { id: string | number; status: string; transactionRef?: string }> {
  entityInfo: T
  config: EntityStatusPanelConfig<T>
  onBack?: () => void
  currentEntityId: string
  onOpenFullDetails?: () => void
  isDetailView?: boolean
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
  metadataComponent: React.ComponentType<{ info: T }>
  actionsComponent: React.ComponentType<{ entityInfo: T }>
}

export function EntityStatusPanel<T extends { id: string | number; status: string; transactionRef?: string }>({
  entityInfo,
  config,
  onBack,
  currentEntityId,
  onOpenFullDetails,
  isDetailView = false,
  totalItems = 1,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext,
  metadataComponent: MetadataComponent,
  actionsComponent: ActionsComponent
}: EntityStatusPanelProps<T>) {
  const { isWatching, handleWatchToggle } = useEntityWatching(config.entityType)

  const { styling: statusStyling } = useEntityStatus(config.entityType, entityInfo)
  const { navigation } = useEntityNavigation({
    totalItems,
    navigatePrevious,
    navigateNext,
    canNavigatePrevious,
    canNavigateNext,
    onBack,
    onOpenFullDetails
  })

  const primaryValue = useMemo(() => {
    const fieldValue = entityInfo[config.primaryField];
    return config.primaryFieldFormatter
      ? config.primaryFieldFormatter(fieldValue)
      : String(fieldValue ?? 'N/A');
  }, [entityInfo, config.primaryField, config.primaryFieldFormatter]);

  return (
    <div className={cn(
      "bg-card rounded-xl overflow-hidden shadow-sm",
      PANEL_SPACING.CONTAINER_BOTTOM_MARGIN
    )}>
      <div className="p-2">
        <div className={cn(
          "h-10 rounded-xl flex items-center justify-start px-6 py-3",
          statusStyling.bgColor
        )}>
          <p className={cn(
            "font-semibold text-xs uppercase tracking-wide",
            statusStyling.textColor
          )}>
            {statusStyling.label}
          </p>
        </div>
      </div>

      <div className="px-2 pb-2">
        <NavigationHeader
          onBack={navigation.back}
          currentEntityId={currentEntityId}
          entityType={config.entityType}
          onOpenFullDetails={navigation.openFullDetails}
          isDetailView={isDetailView}
          totalItems={navigation.totalItems}
          navigatePrevious={navigation.goToPrevious}
          navigateNext={navigation.goToNext}
          canGoPrevious={navigation.canGoPrevious}
          canGoNext={navigation.canGoNext}
        />
      </div>

      <div className="p-6">
        <div className={cn(
          "flex flex-col mb-3",
          PANEL_SPACING.CONTAINER_BOTTOM_MARGIN
        )}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
            {config.entityLabel}
          </p>
          <p className="font-bold text-foreground text-5xl leading-tight">
            {primaryValue}
          </p>
        </div>
        
        <MetadataComponent info={entityInfo} />
        
        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleWatchToggle}
            className="rounded-full px-4 text-xs"
          >
            {isWatching ? 'Watching' : 'Watch'}
          </Button>
          <ActionsComponent entityInfo={entityInfo} />
        </div>
      </div>
    </div>
  )
}
