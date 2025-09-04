import type { Customer } from '@shared/types/customers'
import { convertCustomerToCustomerInfo } from '../utils/converters'
import { CUSTOMER_CONFIG, CustomerMetadata, CustomerActionsWrapper } from '../../config/entity-configs'
import { renderCustomerSections } from '../config/sections'
import { BaseFullPageDetails } from '../../generic/EntityFullPageDetails'

interface FullPageCustomerDetailsProps {
  customer: Customer
  onBack?: () => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function FullPageCustomerDetails(props: FullPageCustomerDetailsProps) {
  const customerInfo = convertCustomerToCustomerInfo(props.customer)

  return (
    <BaseFullPageDetails
      entity={props.customer}
      entityInfo={customerInfo}
      config={CUSTOMER_CONFIG}
      metadataComponent={CustomerMetadata}
      actionsComponent={CustomerActionsWrapper}
      renderSections={renderCustomerSections}
      {...props}
    />
  )
}