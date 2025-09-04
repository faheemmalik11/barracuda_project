// Digital services and products types

export interface DigitalProduct {
  id: string
  name: string
  description: string
  type: 'download' | 'streaming' | 'license' | 'subscription'
  status: 'active' | 'inactive' | 'archived'
  price: number
  currency: string
  downloadLimit?: number
  expiryDays?: number
}

export interface DigitalAccess {
  id: string
  customerId: string
  productId: string
  accessKey: string
  downloadCount: number
  expiresAt?: Date
  status: 'active' | 'expired' | 'revoked'
}