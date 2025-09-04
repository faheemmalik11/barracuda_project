import { Panel } from '../components'
import { EntityStatusPanel } from '@shared/components/panels/components/StatusPanel/EntityStatusPanel'
import { renderPaymentLinkSections } from './config/sections'
import { PaymentLinkMetadata, PaymentLinkActionsWrapper } from '@shared/components/panels/config/entity-configs'
import { ScrollableContent } from '../components'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentLink: PaymentLink | null
  onBack?: () => void
  onOpenFullDetails?: () => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
  className?: string
}

export function PaymentLinkDetailsPanel({
  open,
  onOpenChange,
  paymentLink,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext,
  className
}: PaymentLinkDetailsPanelProps) {
  if (!paymentLink) {
    return (
      <Panel id="payment-link-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No payment link selected
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="payment-link-details" open={open}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Payment link details content">
          <EntityStatusPanel
            entityInfo={paymentLink}
            config={{
              entityType: 'payment-link',
              entityLabel: 'Payment Link',
              primaryField: 'name' as keyof PaymentLink,
              primaryFieldFormatter: (value: any) => String(value)
            }}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={paymentLink.id.toString()}
            onOpenFullDetails={onOpenFullDetails}
            isDetailView={false}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
            metadataComponent={() => <PaymentLinkMetadata info={paymentLink} />}
            actionsComponent={() => <PaymentLinkActionsWrapper entityInfo={paymentLink} />}
          />
          
          {/* Render sections below the status panel */}
          <div className="space-y-2 max-w-full overflow-hidden">
            {renderPaymentLinkSections(paymentLink, new Set(), () => {}, {})}
          </div>
        </ScrollableContent>
      </div>
    </Panel>
  )
}
