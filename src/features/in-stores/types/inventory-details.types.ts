export interface InventoryInfo {
  id: string;
  model: string;
  serialNumber: string;
  store: string;
  location?: string;
  status: 'active' | 'inactive' | 'pending';
  order: string;
  ordered: string;
  fulfilled: string;
  lastActivity?: string;
  firmwareVersion?: string;
  batteryLevel?: number;
  connectionStatus?: 'online' | 'offline';
}
