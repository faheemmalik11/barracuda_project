export interface Terminal {
  id: string;
  serialNumber: string;
  model: string;
  status: 'active' | 'inactive' | 'pending' | 'maintenance';
  location: string;
  store: string;
  lastSeen: string;
  assignedTo?: string;
  installDate: string;
  firmwareVersion: string;
  batteryLevel?: number;
  transactionRef?: string;
  ipAddress?: string;
  connectionType?: 'wifi' | 'ethernet' | 'cellular';
}

export interface TerminalInfo {
  id: string;
  name: string;
  status: string;
  location: string;
  lastActivity: string;
  metadata: Array<{
    label: string;
    value: string;
  }>;
}
