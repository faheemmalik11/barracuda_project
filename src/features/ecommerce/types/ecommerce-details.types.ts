export interface EcommerceInfo {
  id: string
  transactionRef: string
  name: string
  status: 'active' | 'inactive'
  type: 'hosted_checkout' | 'api' | 'drops' | 'elements' | 'link'
  environment: 'live' | 'test'
  description: string
  transactions30d: number
  volume30d: number
  successRate: number
  lastUsed: string
  created: string
  // Additional fields for details panel
  customer?: string
  risk?: string
  lastUpdate?: string
  configuration?: Record<string, unknown>
  events?: Array<{
    id: string
    type: string
    timestamp: string
    description: string
  }>
}

export interface EcommerceDetailsConfig {
  type: 'link' | 'hosted_checkout' | 'api' | 'drops' | 'elements'
  sections: string[]
}

export const ECOMMERCE_TYPE_CONFIGS: Record<string, EcommerceDetailsConfig> = {
  link: {
    type: 'link',
    sections: ['header', 'cards', 'activity', 'paymentFor', 'profile', 'media', 'risk', 'configuration', 'eventsLogs']
  },
  hosted_checkout: {
    type: 'hosted_checkout', 
    sections: ['header', 'cards', 'activity', 'profile', 'visual', 'risk', 'configuration', 'eventsLogs']
  },
  api: {
    type: 'api',
    sections: ['header', 'cards', 'activity', 'profile', 'risk', 'configuration', 'eventsLogs']
  },
  drops: {
    type: 'drops',
    sections: ['header', 'cards', 'activity', 'profile', 'risk', 'visual', 'configuration', 'eventsLogs']
  },
  elements: {
    type: 'elements',
    sections: ['header', 'cards', 'activity', 'profile', 'risk', 'visual', 'configuration', 'eventsLogs']
  }
}
