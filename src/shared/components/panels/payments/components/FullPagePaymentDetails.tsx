import type { Payment } from '@shared/types/payment.types'
import { convertPaymentToPaymentInfo } from '@shared/utils/payment-converters'
import { PAYMENT_CONFIG, PaymentMetadata, PaymentActionsWrapper } from '../../config/entity-configs'
import { renderPaymentSections } from '../config/sections'
import { BaseFullPageDetails } from '../../generic/EntityFullPageDetails'
import { useTransactionDetails } from '../../hooks/useTransactionDetails'

interface FullPagePaymentDetailsProps {
  payment: Payment
  onBack?: () => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function FullPagePaymentDetails(props: FullPagePaymentDetailsProps) {
  const paymentInfo = convertPaymentToPaymentInfo(props.payment)
  
  // Fetch individual transaction details for full page view
  const { transaction: transactionData } = useTransactionDetails({
    transactionRef: props.payment?.transactionRef,
    enabled: true
  })

  return (
    <BaseFullPageDetails
      entity={props.payment}
      entityInfo={paymentInfo}
      config={PAYMENT_CONFIG}
      metadataComponent={PaymentMetadata}
      actionsComponent={PaymentActionsWrapper}
      renderSections={(options) => renderPaymentSections({ 
        ...options, 
        transactionData 
      })}
      {...props}
    />
  )
}
