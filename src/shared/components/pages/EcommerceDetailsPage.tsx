import { TooltipProvider } from '@shared/components/ui/tooltip'
import { FullPageEcommerceDetails } from '@shared/components/panels/ecommerce/components/FullPageEcommerceDetails'
import { ecommerceService } from '@shared/services/ecommerce.service'
import { EntityFullPageDetails } from '@shared/components/panels/generic/EntityFullPageDetails'
import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types'

export default function EcommerceDetailsPage() {
  return (
    <EntityFullPageDetails<Ecommerce>
      fetchData={ecommerceService.getEcommerceForNavigation}
      entityName="Ecommerce Integration"
      basePath="/ecommerce"
      renderDetails={(ecommerce, navigation) => (
        <TooltipProvider>
          <FullPageEcommerceDetails ecommerce={ecommerce} {...navigation} />
        </TooltipProvider>
      )}
    />
  )
}
