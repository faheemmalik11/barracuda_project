import type { RefundStatus } from './payment-status.types'
import type { BaseEntity } from '@shared/components/EntityListPage/types'

export interface Refund extends BaseEntity {
  id: string
  paymentId: string
  amount: number
  currency: string
  status: RefundStatus
  reason: string
  created: Date
  lastUpdated: Date
  customer: { 
    id: string
    name: string
    email: string
  }
  paymentMethod: string
  description: string
  fee: number
  net: number
  transactionId: string
  processingTime: number
}