import type { Inventory } from '@features/in-stores/types/inventory.types';
import type { InventoryInfo } from '@features/in-stores/types/inventory-details.types';

export function convertInventoryToInventoryInfo(inventory: Inventory): InventoryInfo {
  return {
    id: inventory.id,
    model: inventory.model,
    serialNumber: inventory.serialNumber,
    store: inventory.store,
    location: inventory.location,
    status: inventory.status,
    order: inventory.order,
    ordered: inventory.ordered,
    fulfilled: inventory.fulfilled,
    lastActivity: inventory.lastActivity,
    firmwareVersion: inventory.firmwareVersion,
    batteryLevel: inventory.batteryLevel,
    connectionStatus: inventory.connectionStatus
  };
}
