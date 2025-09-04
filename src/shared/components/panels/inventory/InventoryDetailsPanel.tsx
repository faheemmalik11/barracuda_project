import { Panel } from '../components'
import type { Inventory } from '@features/in-stores/types/inventory.types'
import { convertInventoryToInventoryInfo } from '@shared/utils/inventory-converters'
import { useInventoryDetails } from './hooks/useInventoryDetails'
import { EntityStatusPanel } from '../components/StatusPanel'
import { INVENTORY_CONFIG, InventoryMetadata, InventoryActionsWrapper } from '../config/entity-configs'
import { ScrollableContent } from '../components'
import { renderInventorySections } from './config/sections'

interface InventoryDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inventory: Inventory | null
  onBack?: () => void
  onOpenFullDetails?: () => void
  totalItems: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function InventoryDetailsPanel({
  open,
  onOpenChange,
  inventory,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: InventoryDetailsPanelProps) {
  // Configuration for inventory details sections
  useInventoryDetails({
    activity: true,
    hardware: true,
    location: true,
    maintenance: true,
    configuration: true,
  })

  // Use section states for collapsible sections - simplified for now
  const sectionStates = {
    isExpanded: () => true,
    toggleSection: () => {}
  }

  if (!inventory) {
    return (
      <Panel id="inventory-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No inventory item selected
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="inventory-details" open={open}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Inventory details content">
          <EntityStatusPanel
            entityInfo={convertInventoryToInventoryInfo(inventory)}
            config={INVENTORY_CONFIG}
            metadataComponent={InventoryMetadata}
            actionsComponent={InventoryActionsWrapper}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={inventory.id}
            onOpenFullDetails={onOpenFullDetails}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />

          {renderInventorySections({ 
            sections: sectionStates,
            inventoryData: inventory
          })}
        </ScrollableContent>
      </div>
    </Panel>
  )
}
