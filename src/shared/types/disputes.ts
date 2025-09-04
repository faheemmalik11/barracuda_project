export interface Dispute {
  id: string
  paymentId: string
  amount: number
  currency: string
  status: DisputeStatus
  reason: string
  evidence?: string
  customer: { name: string; email: string }
  evidenceDueBy: string
  createdAt: string
  updatedAt: string
}

export type DisputeStatus = 'open' | 'under_review' | 'won' | 'lost' | 'needs_response' | 'processing' | 'accepted' | 'warning_closed'