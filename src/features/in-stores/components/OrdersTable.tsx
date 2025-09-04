import { DataTable } from '@shared/components/ui/data-table/DataTable'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Eye, Package, RotateCcw, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu'
import type { Column, PaginationProps } from '@shared/types/data-table'
import type { Order } from '../types/order.types'
import type { ManagedColumn } from '@shared/types/table.types'

interface OrdersTableProps {
  data: Order[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (item: Order) => void
  pagination: PaginationProps
  loading: boolean
  statusFilter?: string
  emptyStateDescription: string
  managedColumns?: ManagedColumn[]
  onView?: (order: Order) => void
  onCancel?: (id: string) => void
  onReturn?: (id: string) => void
}

export function OrdersTable({
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
  onCancel,
  onReturn
}: OrdersTableProps) {

  const handleView = (item: Order) => {
    if (onView) {
      onView(item)
    } else {
      onRowClick(item)
    }
  }

  const handleCancel = (item: Order) => {
    if (onCancel) {
      onCancel(item.id)
    }
  }

  const handleReturn = (item: Order) => {
    if (onReturn) {
      onReturn(item.id)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'outline',
      fulfilled: 'default',
      returned: 'secondary',
      cancelled: 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const columns: Column<Order>[] = [
    {
      key: 'orderId',
      header: 'Order ID',
      render: (item: Order) => (
        <div className="font-mono text-sm">{item.orderId}</div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (item: Order) => (
        <div className="max-w-xs truncate">{item.description}</div>
      ),
    },
    {
      key: 'itemCount',
      header: 'Items',
      render: (item: Order) => (
        <div className="text-center">{item.itemCount}</div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Amount',
      render: (item: Order) => (
        <div className="font-medium">{formatCurrency(item.totalAmount)}</div>
      ),
    },
    {
      key: 'orderDate',
      header: 'Created',
      render: (item: Order) => {
        return new Date(item.orderDate).toLocaleDateString()
      },
    },
    {
      key: 'expectedDelivery',
      header: 'Expected Delivery',
      render: (item: Order) => {
        return new Date(item.expectedDelivery).toLocaleDateString()
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Order) => getStatusBadge(item.status),
    },
    {
      key: 'actions',
      header: '',
      render: (item: Order) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(item)}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              {item.status === 'pending' && onCancel && (
                <DropdownMenuItem onClick={() => handleCancel(item)}>
                  <Package className="h-4 w-4 mr-2" />
                  Cancel
                </DropdownMenuItem>
              )}
              {item.status === 'fulfilled' && onReturn && (
                <DropdownMenuItem onClick={() => handleReturn(item)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Return
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      onRowClick={onRowClick}
      getItemId={(item) => item.id}
      pagination={pagination}
      loading={loading}
      emptyStateDescription={emptyStateDescription}
    />
  )
}
