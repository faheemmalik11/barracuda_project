export interface Settlement {
  id: string
  amount: number
  currency: string
  status: SettlementStatus
  createdAt: string
  settledAt?: string
}

export type SettlementStatus = 'pending' | 'processing' | 'settled' | 'failed'

export type SettlementEntry = Settlement