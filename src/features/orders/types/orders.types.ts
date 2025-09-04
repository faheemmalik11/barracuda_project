// Order management types - aligned with shared Order interface
import type { Order as SharedOrder, OrderStatus as SharedOrderStatus } from '@shared/types/orders'

// Extend shared Order interface with feature-specific properties
export interface Order extends SharedOrder {
  // Override items to be more specific while maintaining compatibility
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  // Feature-specific additional properties
  shippingAddress?: string
  billingAddress?: string
  trackingNumber?: string
}

// Re-export shared OrderStatus for consistency
export type OrderStatus = SharedOrderStatus

export interface OrderFilters {
  status?: OrderStatus | "all"
  customerName?: string
  orderNumber?: string
  dateRange?: {
    start: Date
    end: Date
  }
}