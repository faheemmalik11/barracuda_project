import { Panel } from '../components'
import type { Payment } from '@shared/types/payment.types'
import { convertPaymentToPaymentInfo } from '@shared/utils/payment-converters'
import { usePaymentDetails } from './hooks/usePaymentDetails'
import { EntityStatusPanel } from '../components/StatusPanel'
import { PAYMENT_CONFIG, PaymentMetadata, PaymentActionsWrapper } from '../config/entity-configs'
import { ScrollableContent } from '../components'
import { renderPaymentSections } from './config/sections'
import { useTransactionDetails } from '../hooks/useTransactionDetails'

interface PaymentDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: Payment | null
  onBack?: () => void
  onOpenFullDetails?: () => void
  totalItems: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function PaymentDetailsPanel({
  open,
  onOpenChange,
  payment,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: PaymentDetailsPanelProps) {
  // Use the custom hook to fetch individual transaction details
  const { 
    transaction: transactionData, 
    isLoading, 
    error 
  } = useTransactionDetails({
    transactionRef: payment?.transactionRef,
    enabled: open && !!payment?.transactionRef
  })

  // Configuration for payment details sections
  const sections = usePaymentDetails({
    paymentDetails: true,
    timeline: true,
    fees: false,
    paymentMethod: false,
    paymentSecurity: false,
  })


  if (!payment) {
    return (
      <Panel id="payment-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No payment selected
        </div>
      </Panel>
    )
  }

  if (isLoading) {
    return (
      <Panel id="payment-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Loading transaction details...
        </div>
      </Panel>
    )
  }

  if (error) {
    return (
      <Panel id="payment-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading transaction</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="payment-details" open={open}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Payment details content">
          <EntityStatusPanel
            entityInfo={convertPaymentToPaymentInfo(payment)}
            config={PAYMENT_CONFIG}
            metadataComponent={PaymentMetadata}
            actionsComponent={PaymentActionsWrapper}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={payment.transactionRef}
            onOpenFullDetails={onOpenFullDetails}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />

          {renderPaymentSections({ sections, transactionData })}
        </ScrollableContent>
      </div>
    </Panel>
  )
}
