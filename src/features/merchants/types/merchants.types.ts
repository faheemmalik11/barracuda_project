import type { Merchant, MerchantStatus, MerchantType, MerchantRiskLevel } from '@shared/types/merchant'

export type { Merchant, MerchantStatus, MerchantType, MerchantRiskLevel }

export interface MerchantFilters {
  status?: MerchantStatus | 'all'
  merchantName?: string
  country?: string
  industry?: string
  riskLevel?: MerchantRiskLevel | 'all'
  verified?: boolean
}

export interface ListMerchantsResponse {
  results: Merchant[]
  totalElements: number
  totalPages: number
  pageNumber: number 
  pageSize: number
}
