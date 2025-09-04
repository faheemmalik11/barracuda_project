export interface Inventory extends Record<string, unknown> {
  id: string;
  transactionRef: string;
  model: string;
  serialNumber: string;
  store: string;
  order: string;
  ordered: string;
  fulfilled: string;
  status: 'active' | 'inactive' | 'pending';
  location?: string;
  lastActivity?: string;
  firmwareVersion?: string;
  batteryLevel?: number;
  connectionStatus?: 'online' | 'offline';
}

export interface InventoryFilters {
  status: string;
  model: string;
  store: string;
  ordered: string;
  search: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export interface InventoryTableProps {
  data: Inventory[];
  onView: (inventory: Inventory) => void;
  onActivate?: (id: string) => void;
  onReturn?: (id: string) => void;
}
