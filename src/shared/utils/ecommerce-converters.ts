import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types'
import type { EcommerceInfo } from '@features/ecommerce/types/ecommerce-details.types'

export function convertEcommerceToEcommerceInfo(ecommerce: Ecommerce): EcommerceInfo {
  return {
    id: ecommerce.id,
    transactionRef: ecommerce.transactionRef,
    name: ecommerce.name,
    status: ecommerce.status,
    type: ecommerce.type === 'hosted_checkout' ? 'hosted_checkout' : ecommerce.type,
    environment: ecommerce.environment,
    description: ecommerce.description,
    transactions30d: ecommerce.transactions30d,
    volume30d: ecommerce.volume30d,
    successRate: ecommerce.successRate,
    lastUsed: ecommerce.lastUsed,
    created: ecommerce.created,
    // Additional fields for details panel
    customer: 'Unknown',
    risk: 'Low',
    lastUpdate: ecommerce.lastUsed,
    configuration: {},
    events: []
  }
}
