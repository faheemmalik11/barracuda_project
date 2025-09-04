import { Panel } from '@shared/components/panels/components/Panel'
import { ScrollableContent } from '@shared/components/panels/components/ScrollableContent'
import { EntityStatusPanel } from '@shared/components/panels/components/StatusPanel'
import { convertOrderToOrderInfo } from '@shared/utils/order-converters'
import { ORDER_CONFIG, OrderMetadata, OrderActionsWrapper } from '@shared/components/panels/config/entity-configs'
import { renderOrderSections } from './config/sections'
import { useOrderDetails } from './hooks/useOrderDetails'

interface OrderDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: any
  onBack?: () => void
  onOpenFullDetails?: (id: string) => void
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
  className?: string
}

export function OrderDetailsPanel({
  open,
  onOpenChange,
  order,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext,
  className
}: OrderDetailsPanelProps) {
  // Configuration for order details sections
  useOrderDetails({
    header: true,
    activity: true,
    order: true,
  })

  // Use section states for collapsible sections - simplified for now
  const sectionStates = {
    isExpanded: () => true,
    toggleSection: () => {}
  }

  if (!order) {
    return (
      <Panel id="order-details" open={open} className={className}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No order selected
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="order-details" open={open} className={className}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Order details content">
          <EntityStatusPanel
            entityInfo={convertOrderToOrderInfo(order)}
            config={ORDER_CONFIG}
            metadataComponent={OrderMetadata}
            actionsComponent={OrderActionsWrapper}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={order.id}
            onOpenFullDetails={onOpenFullDetails ? () => onOpenFullDetails(order.id) : undefined}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />

          {renderOrderSections({ 
            sections: sectionStates,
            orderData: order
          })}
        </ScrollableContent>
      </div>
    </Panel>
  )
}
