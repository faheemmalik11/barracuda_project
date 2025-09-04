import { TooltipProvider } from '@shared/components/ui/tooltip'
import { EntityFullPageDetails } from '@shared/components/panels/generic/EntityFullPageDetails'
import { paymentLinkService } from '@shared/services/payment-link.service'
import type { PaymentLink } from '@shared/types/payment-links'
import { FullPagePaymentLinkDetails } from '@shared/components/panels/payment-links/components'

export default function PaymentLinkDetailsPage() {
  return (
    <EntityFullPageDetails<PaymentLink>
      fetchData={paymentLinkService.getPaymentLinksForNavigation}
      entityName="Payment Link"
      basePath="/payment-links"
      renderDetails={(paymentLink, navigation) => (
        <TooltipProvider>
          <FullPagePaymentLinkDetails paymentLink={paymentLink} {...navigation} />
        </TooltipProvider>
      )}
    />
  )
}
