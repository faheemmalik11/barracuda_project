import type { BaseEntity } from '@shared/components/EntityListPage/types'

export interface Dispute extends BaseEntity {
  id: string
  amount: number
  currency: string
  status:
    | "warning_needs_response"
    | "warning_under_review"
    | "warning_closed"
    | "needs_response"
    | "under_review"
    | "charge_refunded"
    | "won"
    | "lost"
  paymentId: string
  reason: string
  created: Date
  customer: {
    id: string
    name: string
    email: string
  }
  dueBy?: Date
  evidence?: {
    submittedAt?: Date
    summary?: string
    documents?: string[]
  }
  lastUpdated: Date
}

export type DisputeStatus = Dispute["status"]

export interface DisputeFilters {
  status?: DisputeStatus | "all"
  customerName?: string
  paymentId?: string
  reason?: string
}