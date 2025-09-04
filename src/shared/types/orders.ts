export interface Order {
  id: string
  status: OrderStatus
  customer: string | { name: string; email: string }
  amount: number
  items: any[] | number
  payment: string
  createdAt: string
  updatedAt: string
  fulfillment: string
  shipping: string
  notes?: string
  currency: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'