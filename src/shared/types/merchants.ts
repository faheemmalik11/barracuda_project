// This file is deprecated. Use @shared/types/merchant instead.
// Keeping for backward compatibility during migration.

import type { Merchant } from './merchant'

export type { 
  Merchant, 
  MerchantStatus, 
  MerchantType, 
  MerchantRiskLevel as RiskLevel 
} from './merchant'

// Legacy interfaces - use merchant.ts equivalents instead
export interface ContactInfo {
  email?: string
  phoneNumber?: string
  customerSupportPhoneNumber?: string
  websiteUrl?: string
}

export interface Address {
  streetAddress?: string
  city?: string
  state?: string
  postCode?: string
  country?: string
}

export interface Requirement {
  id: string
  description: string
  dueDate?: string
  status: 'pending' | 'completed' | 'overdue'
}

// @deprecated - Use Merchant from './merchant' instead
export interface MerchantProfile extends Merchant {
  merchantId: string
  legalBusinessName: string
  acceptorName: string
  businessType?: string
  mcc?: number
  originCountry: string
  contactInfo?: ContactInfo
  address?: Address
  balance?: number
  totalVolume?: number
  averageTransactionValue?: number
  approvalRate?: number
  refundRate?: number
  disputeRate?: number
  riskScore?: number
  openCases?: number
  lastTransaction?: string
  requirements?: Requirement[]
}