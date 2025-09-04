import { TooltipProvider } from '@shared/components/ui/tooltip'
import { FullPageCustomerDetails } from '@shared/components/panels/customers/components/FullPageCustomerDetails'
import { customersService } from '@shared/services'
import { EntityFullPageDetails } from '@shared/components/panels/generic/EntityFullPageDetails'
import type { Customer } from '@shared/types/customers'

export default function CustomerDetailsPage() {
  return (
    <EntityFullPageDetails<Customer>
      fetchData={customersService.getCustomersForNavigation}
      entityName="Customer"
      basePath="/customers"
      renderDetails={(customer, navigation) => (
        <TooltipProvider>
          <FullPageCustomerDetails customer={customer} {...navigation} />
        </TooltipProvider>
      )}
    />
  )
}