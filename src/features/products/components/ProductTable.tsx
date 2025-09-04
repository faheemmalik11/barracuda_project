import { useMemo } from 'react'
import { DataTable } from "@shared/components/ui/data-table"
import { getOrderColumns } from "@shared/lib/tables/columns/order-columns"
import { getProductRowActions, getProductHoverActions } from "@shared/lib/tables/actions/product-actions"
import type { Product } from "../types/products.types"

interface PaginationProps {
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
  totalItems: number
  totalPages: number
}

type ManagedColumn = {
  id: string
  label: string
  visible: boolean
  required?: boolean
  order?: number
}

interface ProductTableProps {
  products: Product[]
  selectedProducts?: string[]
  onSelectionChange?: (selected: string[]) => void
  onViewProduct?: (product: Product) => void
  onEditProduct?: (product: Product) => void
  onDuplicateProduct?: (product: Product) => void
  onDeleteProduct?: (product: Product) => void
  onUpdateStatus?: (product: Product, status: string) => void
  loading?: boolean
  pagination?: PaginationProps
  status?: string
  emptyStateDescription?: string
  managedColumns?: ManagedColumn[]
}

export function ProductTable({
  products = [],
  selectedProducts = [],
  onSelectionChange = () => {},
  onViewProduct,
  onEditProduct,
  onDuplicateProduct,
  onDeleteProduct,
  onUpdateStatus,
  loading = false,
  pagination,
  status,
  emptyStateDescription = "No products found.",
  managedColumns,
}: ProductTableProps) {
  const rowActions = useMemo(() => getProductRowActions({ 
    onEdit: onEditProduct,
    onView: onViewProduct,
    onDuplicate: onDuplicateProduct,
    onDelete: onDeleteProduct,
    onUpdateStatus,
  }), [onEditProduct, onViewProduct, onDuplicateProduct, onDeleteProduct, onUpdateStatus])
  
  const hoverActions = useMemo(() => getProductHoverActions({ 
    onEdit: onEditProduct, 
    onDuplicate: onDuplicateProduct 
  }), [onEditProduct, onDuplicateProduct])

  return (
    <DataTable
      data={products}
      columns={getOrderColumns() as any}
      selectedItems={selectedProducts}
      onSelectionChange={onSelectionChange}
      getItemId={(product) => product.id}
      onRowClick={onViewProduct}
      rowActions={rowActions}
      hoverActions={hoverActions}
      loading={loading}
      emptyStateDescription={emptyStateDescription}
      pagination={pagination}
      status={status}
      managedColumns={managedColumns}
    />
  )
}