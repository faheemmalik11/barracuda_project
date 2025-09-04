import type { 
  Payment as SharedPayment, 
  PaymentStatus, 
  Customer, 
  PaymentMethod, 
  TransactionAmounts 
} from '@shared/types/payment.types'

interface PaymentMetadata extends Record<string, unknown> {
  amounts?: TransactionAmounts
  state?: string
  type?: string
  rrn?: string
  tid?: string
  account?: {
    id?: string
    name?: string
    email?: string
  }
  timestamps?: {
    initiated?: string
    authorized?: string
  }
  transactionRef?: string
}

export interface Payment extends SharedPayment {
  // Additional feature-specific properties
  metadata?: PaymentMetadata
  lastUpdated?: Date
}

// Re-export the shared types for convenience
export type { PaymentStatus, Customer, PaymentMethod }