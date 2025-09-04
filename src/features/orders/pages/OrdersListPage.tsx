import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent } from '@shared/components/ui/card'
import { StatusFilterCards } from '@shared/components/ui/status-filter-cards'
import { Download, Plus, Package } from 'lucide-react'
import type { ManagedColumn } from '@shared/types/table.types'

import { OrderTable } from '../components/OrderTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'

import { useOrders } from '../hooks'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'


export function OrdersListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [managedColumns, setManagedColumns] = useState<ManagedColumn[] | undefined>(undefined)
  const previousFiltersRef = useRef<Record<string, unknown>>({})
  
  const pageSizeSelector = usePageSizeSelector()
  const orders = useOrders({ 
    pageSize: pageSizeSelector.pageSize,
    currentPage,
  })

  useEffect(() => {
    const filtersChanged = JSON.stringify(orders.tableFilters) !== JSON.stringify(previousFiltersRef.current)
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1)
    }
    previousFiltersRef.current = orders.tableFilters
  }, [orders.tableFilters, currentPage])

  useEffect(() => {
    setManagedColumns(undefined)
  }, [orders.statusFilter])

  const handleColumnsChange = useCallback((newColumns: ManagedColumn[]) => {
    setManagedColumns(newColumns)
  }, [])

  const handlePageSizeChange = (newPageSize: number) => {
    pageSizeSelector.setPageSize(newPageSize)
    setCurrentPage(1) // Reset to first page when page size changes
  }

  const clearSelection = () => setSelectedOrders([])

  const handleExportOrders = () => {
    orders.exportOrders(selectedOrders)
  }

  const emptyMessage = orders.activeFiltersCount > 0
    ? "Try adjusting your filters to see more results."
    : "No orders found."

  const getStatusCountForFilter = (status: string) => {
    if (status === 'all') return orders.totalItems || 0
    const statusCounts = orders.facets?.status as Array<{value: string, count: number}> || []
    const statusCount = statusCounts.find(s => s.value === status)
    return statusCount?.count || 0
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportOrders}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={orders.createOrder} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Status Filter Cards */}
      <StatusFilterCards
        filters={StatusRegistry.getFilters('order')}
        selectedStatus={orders.statusFilter}
        onStatusChange={orders.setStatusFilter}
        getStatusCount={getStatusCountForFilter}
        hasSelection={selectedOrders.length > 0}
        selectedCount={selectedOrders.length}
        onClearSelection={clearSelection}
      />

      {/* Table Filters */}
      <EntityTableFilters
        entity="orders"
        onFiltersChange={orders.setTableFilters}
        onClearAllFilters={orders.clearAllFilters}
        initialValues={orders.tableFilters}
        totalRecords={orders.totalItems || 0}
        hasSelection={selectedOrders.length > 0}
        selectedCount={selectedOrders.length}
        onClearSelection={clearSelection}
        status={orders.statusFilter}
        onColumnsChange={handleColumnsChange}
        managedColumns={managedColumns}
        currentPageSize={pageSizeSelector.pageSize}
        onPageSizeChange={handlePageSizeChange}
        availablePageSizes={pageSizeSelector.availablePageSizes}
      />

      {/* Order Table */}
      <Card className="border-none shadow-none overflow-hidden rounded-none">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={orders.statusFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OrderTable
                data={orders.orders || []}
                selectedItems={selectedOrders}
                onSelectionChange={setSelectedOrders}
                onRowClick={orders.viewOrderDetails}
                pagination={{
                  pageSize: pageSizeSelector.pageSize,
                  currentPage,
                  onPageChange: setCurrentPage,
                  totalItems: orders.totalItems || 0,
                  totalPages: orders.totalPages || 0,
                }}
                loading={orders.isLoading}
                onViewOrder={orders.viewOrderDetails}
                onUpdateStatus={orders.updateOrderStatus}
                onCancelOrder={orders.cancelOrder}
                onRefundOrder={orders.refundOrder}
                status={orders.statusFilter}
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
