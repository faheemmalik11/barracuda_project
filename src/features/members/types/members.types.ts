// Membership management types

export interface Member {
  id: string
  name: string
  email: string
  phone?: string
  status: MemberStatus
  membershipType: string
  joinDate: Date
  expiryDate?: Date
  totalPaid: number
  lastPayment?: Date
  benefits: string[]
  notes?: string
}

export type MemberStatus = "active" | "inactive" | "suspended" | "expired"

export interface MembershipPlan {
  id: string
  name: string
  description: string
  price: number
  duration: number // in months
  benefits: string[]
  status: 'active' | 'inactive'
}