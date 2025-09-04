export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  status: ProductStatus
  category: string
  sku?: string
  stock?: number
  sales?: number
  createdAt: string
  updatedAt: string
}

export type ProductStatus = 'active' | 'draft' | 'archived' | 'published' | 'unpublished' | 'deleted'