import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import { Badge } from '@shared/components/ui/badge'
// Icons removed as they're not used in the simplified row actions
import type { Column } from '@shared/types/data-table'
import type { Inventory } from '../types/inventory.types'

interface InventoryTableProps {
  data: Inventory[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (inventory: Inventory) => void
  pagination: {
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
    totalItems: number
    totalPages: number
  }
  loading: boolean
  statusFilter?: string
  emptyStateDescription: string
  managedColumns?: any[]
  onView?: (inventory: Inventory) => void
  onActivate?: (inventory: Inventory) => void
  onReturn?: (inventory: Inventory) => void
  activeItemId?: string
}

export function InventoryTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  statusFilter,
  emptyStateDescription,
  managedColumns,
  onView,
  onActivate,
  onReturn,
  activeItemId,
}: InventoryTableProps) {

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const columns: Column<Inventory>[] = useMemo(() => [
    {
      key: 'model',
      header: 'Model',
      render: (item: Inventory) => (
        <div className="font-medium">{item.model}</div>
      ),
    },
    {
      key: 'serialNumber',
      header: 'Serial Number',
      render: (item: Inventory) => (
        <div className="font-mono text-sm">{item.serialNumber}</div>
      ),
    },
    {
      key: 'store',
      header: 'Store',
      render: (item: Inventory) => item.store,
    },
    {
      key: 'order',
      header: 'Order',
      render: (item: Inventory) => (
        <div className="font-mono text-sm">{item.order}</div>
      ),
    },
    {
      key: 'ordered',
      header: 'Ordered',
      render: (item: Inventory) => {
        return new Date(item.ordered).toLocaleDateString()
      },
    },
    {
      key: 'fulfilled',
      header: 'Fulfilled',
      render: (item: Inventory) => {
        return new Date(item.fulfilled).toLocaleDateString()
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Inventory) => getStatusBadge(item.status),
    },
  ], [])

  const unavailableItems = useMemo(() => 
    data
      .filter(inventory => ["inactive"].includes(inventory.status))
      .map(inventory => inventory.id), 
    [data]
  )

  const rowActions = useMemo(() => {
    const actions = []
    if (onView) {
      actions.push({
        key: 'view',
        label: 'View',
        onClick: onView,
      })
    }
    if (onActivate) {
      actions.push({
        key: 'activate',
        label: 'Activate',
        onClick: onActivate,
      })
    }
    if (onReturn) {
      actions.push({
        key: 'return',
        label: 'Return',
        onClick: onReturn,
      })
    }
    return actions
  }, [onView, onActivate, onReturn])

  return (
    <DataTable
      data={data}
      columns={columns}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(inventory) => inventory.id}
      onRowClick={onRowClick}
      rowActions={rowActions}
      pagination={pagination}
      loading={loading}
      unavailableItems={unavailableItems}
      emptyStateDescription={emptyStateDescription}
      className="bg-background"
      getItemStatus={(inventory) => inventory.status || 'unknown'}
      activeItemId={activeItemId}
    />
  )
}
