import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table/DataTable'
import { Badge } from '@shared/components/ui/badge'
import type { Column, PaginationProps } from '@shared/types/data-table'
import type { PaymentLink } from '@shared/types/payment-links'
import { getPaymentLinkRowActions, getPaymentLinkHoverActions } from '@shared/lib/tables/actions/payment-link-actions'

interface PaymentLinksTableProps {
  data: PaymentLink[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  onRowClick: (item: PaymentLink) => void
  pagination: PaginationProps
  loading: boolean
  emptyStateDescription: string
  onView?: (link: PaymentLink) => void
  onCancel?: (id: string) => void
}

export function PaymentLinksTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  emptyStateDescription,
  onView,
  onCancel
}: PaymentLinksTableProps) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary'
      case 'inactive': return 'outline'
      case 'expired': return 'destructive'
      default: return 'outline'
    }
  }

  const rowActions = useMemo(() => getPaymentLinkRowActions({
    onView: onView || onRowClick,
    onCancel
  }), [onView, onRowClick, onCancel])

  const hoverActions = useMemo(() => getPaymentLinkHoverActions(), [])

  const columns: Column<PaymentLink>[] = [
    {
      key: 'name',
      header: 'Name',
      width: 200,
      render: (link: PaymentLink) => (
        <div>
          <div className="font-medium">{link.name}</div>
          {link.description && (
            <div className="text-sm text-muted-foreground truncate max-w-xs">{link.description}</div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: 100,
      render: (link: PaymentLink) => (
        <Badge variant={getStatusColor(link.status)}>{link.status}</Badge>
      )
    },
    {
      key: 'type',
      header: 'Type',
      width: 120,
      render: (link: PaymentLink) => (
        <Badge variant="default" className="capitalize">{link.type}</Badge>
      )
    },
    {
      key: 'environment',
      header: 'Environment',
      width: 120,
      render: (_link: PaymentLink) => (
        <span className="text-sm">Live</span>
      )
    },
    {
      key: 'transactions30d',
      header: 'Transactions (30d)',
      width: 140,
      align: 'right',
      render: (link: PaymentLink) => (
        <span className="text-sm">{link.conversions || 0}</span>
      )
    },
    {
      key: 'volume30d',
      header: 'Volume (30d)',
      width: 120,
      align: 'right',
      render: (link: PaymentLink) => {
        const amount = link.totalRevenue || 0
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(amount / 100)
        return <span className="text-sm font-medium">{formatted}</span>
      }
    },
    {
      key: 'success',
      header: 'Success',
      width: 100,
      align: 'right',
      render: (link: PaymentLink) => {
        const rate = link.views > 0 ? ((link.conversions || 0) / link.views) * 100 : 0
        return <span className="text-sm font-medium">{rate.toFixed(1)}%</span>
      }
    },
    {
      key: 'created',
      header: 'Created',
      width: 150,
      render: (link: PaymentLink) => (
        <span className="text-sm">{new Date(link.created).toLocaleDateString()}</span>
      )
    },
  ]

  return (
    <DataTable<PaymentLink>
      columns={columns}
      data={data}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      onRowClick={onRowClick}
      rowActions={rowActions}
      hoverActions={hoverActions}
      getItemId={(item) => item.id}
      pagination={pagination}
      loading={loading}
      emptyStateDescription={emptyStateDescription}
    />
  )
}
