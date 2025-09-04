// Products and catalog management types
import type { Product, ProductStatus } from '@shared/types/products'

export type { Product, ProductStatus }

export interface ProductFilters {
  productStatus?: ProductStatus | "all"
  productName?: string
  category?: string
  priceRange?: {
    min: number
    max: number
  }
}

export interface ProductTableConfig {
  selectedProducts: string[]
  onSelectionChange: (selected: string[]) => void
  onViewProduct: (product: Product) => void
}

export interface ProductCreateRequest {
  name: string
  description: string
  price: string
  category?: string
  sku?: string
}

export interface ProductUpdateRequest {
  id: string
  name?: string
  description?: string
  price?: string
  status?: ProductStatus
  category?: string
  sku?: string
}