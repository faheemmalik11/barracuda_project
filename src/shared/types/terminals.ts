export interface Terminal {
  id: string
  name: string
  model: string
  location: string | { name: string; city: string; state: string, address: string }
  status: TerminalStatus
  lastSeen?: string
  createdAt: string
  label: string
  serialNumber: string
  registeredTo: string | { name: string }
  deviceType: string
  firmware: string
  batteryLevel: number
  transactionRef: string
}

export type TerminalStatus = 'online' | 'offline' | 'maintenance' | 'error'