// Settlement management types

export interface Settlement {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'in_transit' | 'paid' | 'failed'
  bankAccount: string
  settlementDate: Date
  created: Date
  transactionCount: number
  fee: number
  net: number
  description: string
}

export type SettlementStatus = 'pending' | 'in_transit' | 'paid' | 'failed'

export interface SettlementFilters {
  status?: SettlementStatus | "all"
  dateRange?: {
    start: Date
    end: Date
  }
  bankAccount?: string
}