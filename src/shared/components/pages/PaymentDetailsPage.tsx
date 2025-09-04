import { TooltipProvider } from '@shared/components/ui/tooltip'
import { FullPagePaymentDetails } from '@shared/components/panels/payments/components/FullPagePaymentDetails'
import { paymentsService } from '@shared/services'
import { EntityFullPageDetails } from '@shared/components/panels/generic/EntityFullPageDetails'
import type { Payment } from '@features/payments/types/payments.types'

export default function PaymentDetailsPage() {
  return (
    <EntityFullPageDetails<Payment>
      fetchData={paymentsService.getPaymentsForNavigation}
      entityName="Payment"
      basePath="/payments"
      renderDetails={(payment, navigation) => (
        <TooltipProvider>
          <FullPagePaymentDetails payment={payment} {...navigation} />
        </TooltipProvider>
      )}
    />
  )
}
