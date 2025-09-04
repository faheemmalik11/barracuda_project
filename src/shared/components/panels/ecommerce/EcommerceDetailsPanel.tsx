import { Panel } from '../components'
import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types'
import { convertEcommerceToEcommerceInfo } from '@shared/utils/ecommerce-converters'
import { useEcommerceDetails } from './hooks/useEcommerceDetails'
import { EntityStatusPanel } from '../components/StatusPanel'
import { ECOMMERCE_CONFIG, EcommerceMetadata, EcommerceActionsWrapper } from '../config/entity-configs'
import { ScrollableContent } from '../components'
import { renderEcommerceSections } from './config/sections'
// import { useSectionStates } from '@shared/hooks/useSectionStates' // TODO: Fix this import

interface EcommerceDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ecommerce: Ecommerce | null
  onBack?: () => void
  onOpenFullDetails?: () => void
  totalItems: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function EcommerceDetailsPanel({
  open,
  onOpenChange,
  ecommerce,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: EcommerceDetailsPanelProps) {
  // Configuration for ecommerce details sections based on type
  const sections = useEcommerceDetails({
    activity: true,
    profile: true,
    risk: true,
    configuration: true,
    paymentFor: ecommerce?.type === 'link',
    media: ecommerce?.type === 'link',
    visual: ['hosted_checkout', 'drops', 'elements'].includes(ecommerce?.type || ''),
  })

  // Use section states for collapsible sections - simplified for now
  const sectionStates = {
    isExpanded: () => true,
    toggleSection: () => {}
  }

  if (!ecommerce) {
    return (
      <Panel id="ecommerce-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No ecommerce integration selected
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="ecommerce-details" open={open}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Ecommerce details content">
          <EntityStatusPanel
            entityInfo={convertEcommerceToEcommerceInfo(ecommerce)}
            config={ECOMMERCE_CONFIG}
            metadataComponent={EcommerceMetadata}
            actionsComponent={EcommerceActionsWrapper}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={ecommerce.id}
            onOpenFullDetails={onOpenFullDetails}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />

          {renderEcommerceSections({ 
            ecommerceType: ecommerce.type,
            sections: sectionStates,
            ecommerceData: ecommerce
          })}
        </ScrollableContent>
      </div>
    </Panel>
  )
}
