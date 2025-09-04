import { Panel } from '../components'
import type { CustomerDetailsPanelProps } from './types'
import { convertCustomerToCustomerInfo } from './utils/converters'
import { useCustomerDetails } from './hooks/useCustomerDetails'
import { EntityStatusPanel } from '../components/StatusPanel'
import { CUSTOMER_CONFIG, CustomerMetadata, CustomerActionsWrapper } from '../config/entity-configs'
import { ScrollableContent } from '../components'
import { renderCustomerSections } from './config/sections'

export function CustomerDetailsPanel({
  open,
  onOpenChange,
  customer,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: CustomerDetailsPanelProps) {
  
  const sections = useCustomerDetails({
    customerDetails: true,
    timeline: true,
    balance: true,
    orders: false,
    paymentMethods: false,
    activity: false,
  })

  if (!customer) {
    return (
      <Panel id="customer-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No customer selected
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="customer-details" open={open}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Customer details content">
          <EntityStatusPanel
            entityInfo={convertCustomerToCustomerInfo(customer)}
            config={CUSTOMER_CONFIG}
            metadataComponent={CustomerMetadata}
            actionsComponent={CustomerActionsWrapper}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={customer.id}
            onOpenFullDetails={onOpenFullDetails}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />

          {renderCustomerSections({ sections })}
        </ScrollableContent>
      </div>
    </Panel>
  )
}
