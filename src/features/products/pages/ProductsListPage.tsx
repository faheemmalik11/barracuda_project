import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent } from '@shared/components/ui/card'
import { StatusFilterCards } from '@shared/components/ui/status-filter-cards'
import { Download, Plus, Package } from 'lucide-react'
import type { ManagedColumn } from '@shared/types/table.types'

import { ProductTable } from '../components/ProductTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'

import { useProducts } from '../hooks/useProducts'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'


export function ProductsListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [managedColumns, setManagedColumns] = useState<ManagedColumn[] | undefined>(undefined)
  const previousFiltersRef = useRef<Record<string, unknown>>({})
  
  const pageSizeSelector = usePageSizeSelector()
  const products = useProducts({ 
    pageSize: pageSizeSelector.pageSize,
    currentPage,
  })

  useEffect(() => {
    const filtersChanged = JSON.stringify(products.tableFilters) !== JSON.stringify(previousFiltersRef.current)
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1)
    }
    previousFiltersRef.current = products.tableFilters
  }, [products.tableFilters, currentPage])

  useEffect(() => {
    setManagedColumns(undefined)
  }, [products.statusFilter])

  const handleColumnsChange = useCallback((newColumns: ManagedColumn[]) => {
    setManagedColumns(newColumns)
  }, [])

  const handlePageSizeChange = (newPageSize: number) => {
    pageSizeSelector.setPageSize(newPageSize)
    setCurrentPage(1) // Reset to first page when page size changes
  }

  const clearSelection = () => setSelectedProducts([])

  const handleExportProducts = () => {
    products.exportProducts(selectedProducts)
  }

  const emptyMessage = products.activeFiltersCount > 0
    ? "Try adjusting your filters to see more results."
    : "No products found."

  const getStatusCountForFilter = (status: string) => {
    if (status === 'all') return products.totalItems || 0
    const statusCounts = products.facets?.status as Array<{value: string, count: number}> || []
    const statusCount = statusCounts.find(s => s.value === status)
    return statusCount?.count || 0
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product catalog and inventory
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportProducts}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={products.createProduct} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Status Filter Cards */}
      <StatusFilterCards
        filters={StatusRegistry.getFilters('product')}
        selectedStatus={products.statusFilter}
        onStatusChange={products.setStatusFilter}
        getStatusCount={getStatusCountForFilter}
        hasSelection={selectedProducts.length > 0}
        selectedCount={selectedProducts.length}
        onClearSelection={clearSelection}
      />

      {/* Table Filters */}
      <EntityTableFilters
        entity="products"
        onFiltersChange={products.setTableFilters}
        onClearAllFilters={products.clearAllFilters}
        initialValues={products.tableFilters}
        totalRecords={products.totalItems || 0}
        hasSelection={selectedProducts.length > 0}
        selectedCount={selectedProducts.length}
        onClearSelection={clearSelection}
        status={products.statusFilter}
        onColumnsChange={handleColumnsChange}
        managedColumns={managedColumns}
        currentPageSize={pageSizeSelector.pageSize}
        onPageSizeChange={handlePageSizeChange}
        availablePageSizes={pageSizeSelector.availablePageSizes}
      />

      {/* Product Table */}
      <Card className="border-none shadow-none overflow-hidden rounded-none">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={products.statusFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductTable
                products={products.products || []}
                selectedProducts={selectedProducts}
                onSelectionChange={setSelectedProducts}
                onViewProduct={products.viewProductDetails}
                pagination={{
                  pageSize: pageSizeSelector.pageSize,
                  currentPage,
                  onPageChange: setCurrentPage,
                  totalItems: products.totalItems || 0,
                  totalPages: products.totalPages || 0,
                }}
                loading={products.isLoading}
                onEditProduct={products.editProduct}
                onDuplicateProduct={products.duplicateProduct}
                onDeleteProduct={products.deleteProduct}
                onUpdateStatus={products.updateProductStatus}
                status={products.statusFilter}
                emptyStateDescription={emptyMessage}
                managedColumns={managedColumns}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
