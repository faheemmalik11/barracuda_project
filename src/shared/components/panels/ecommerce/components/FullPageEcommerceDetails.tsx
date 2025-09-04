import { convertEcommerceToEcommerceInfo } from '@shared/utils/ecommerce-converters'
import { useEcommerceDetails } from '../hooks/useEcommerceDetails'
import { EntityStatusPanel } from '../../components/StatusPanel'
import { ECOMMERCE_CONFIG, EcommerceMetadata, EcommerceActionsWrapper } from '../../config/entity-configs'
import { renderEcommerceSections } from '../config/sections'
import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types'

interface FullPageEcommerceDetailsProps {
  ecommerce: Ecommerce
  onBack?: () => void
  totalItems: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function FullPageEcommerceDetails({
  ecommerce,
  onBack,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: FullPageEcommerceDetailsProps) {
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

  return (
    <div className="h-full flex flex-col bg-muted">
      <div className="flex-1 overflow-auto">
        <EntityStatusPanel
          entityInfo={convertEcommerceToEcommerceInfo(ecommerce)}
          config={ECOMMERCE_CONFIG}
          metadataComponent={EcommerceMetadata}
          actionsComponent={EcommerceActionsWrapper}
          onBack={onBack}
          currentEntityId={ecommerce.id}
          totalItems={totalItems}
          navigatePrevious={navigatePrevious}
          navigateNext={navigateNext}
          canNavigatePrevious={canNavigatePrevious}
          canNavigateNext={canNavigateNext}
        />

        {renderEcommerceSections({ 
          ecommerceType: ecommerce.type,
          sections: sectionStates,
          ecommerceData: ecommerce,
          isDetailView: true
        })}
      </div>
    </div>
  )
}
