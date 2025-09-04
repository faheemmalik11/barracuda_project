// Terminal management types

export interface Terminal {
  id: string
  label: string
  serialNumber: string
  status: "online" | "offline" | "error" | "maintenance"
  location: {
    name: string
    address: string
    city: string
    state: string
    country: string
  }
  deviceType: "BBPOS Chipper 2X BT" | "Stripe Reader S700" | "Verifone P400" | "Square Terminal"
  connectionType: "bluetooth" | "wifi" | "ethernet" | "cellular"
  batteryLevel?: number
  lastSeen: Date
  created: Date
  lastTransaction?: Date
  totalTransactions: number
  totalVolume: number
  firmware: string
  ipAddress?: string
  registeredTo: {
    id: string
    name: string
    email: string
  }
}

export type TerminalStatus = "all" | "online" | "offline" | "error" | "maintenance"

export interface TerminalFilterState {
  status: TerminalStatus
  location?: string[]
  deviceType?: string[]
  connectionType?: string[]
  dateFilter?: {
    type: "exact" | "range" | "before" | "after"
    date?: Date
    startDate?: Date
    endDate?: Date
  }
  registeredTo?: {
    type: "name" | "email"
    values: string[]
  }
}

export interface TerminalApiResponse {
  data: Terminal[]
  total: number
  page: number
  pageSize: number
}