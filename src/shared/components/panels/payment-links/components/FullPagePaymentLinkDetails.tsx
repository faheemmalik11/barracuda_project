import { EntityStatusPanel } from '@shared/components/panels/components/StatusPanel/EntityStatusPanel'
import { renderPaymentLinkSections } from '../config/sections'
import { PaymentLinkMetadata, PaymentLinkActionsWrapper } from '@shared/components/panels/config/entity-configs'
import type { PaymentLink } from '@shared/types/payment-links'

interface FullPagePaymentLinkDetailsProps {
  paymentLink: PaymentLink
  onBack?: () => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function FullPagePaymentLinkDetails({
  paymentLink,
  onBack,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: FullPagePaymentLinkDetailsProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <EntityStatusPanel
            entityInfo={paymentLink}
            config={{
              entityType: 'payment-link',
              entityLabel: 'Payment Link',
              primaryField: 'name' as keyof PaymentLink,
              primaryFieldFormatter: (value: any) => String(value)
            }}
            onBack={onBack}
            currentEntityId={paymentLink.id.toString()}
            isDetailView={false}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
            metadataComponent={() => <PaymentLinkMetadata info={paymentLink} />}
            actionsComponent={() => <PaymentLinkActionsWrapper entityInfo={paymentLink} />}
          />
          
          {/* Render sections with proper spacing */}
          <div className="space-y-6">
            {renderPaymentLinkSections(paymentLink, new Set(), () => {}, {})}
          </div>
        </div>
      </div>
    </div>
  )
}
