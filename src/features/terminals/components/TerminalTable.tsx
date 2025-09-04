import { useMemo } from 'react'
import { DataTable } from '@shared/components/ui/data-table'
import { Badge } from '@shared/components/ui/badge'
import { Battery, Monitor } from 'lucide-react'
import type { Column } from '@shared/types/data-table'
import type { Terminal } from '@shared/types/terminals'

interface TerminalTableProps {
  data: Terminal[]
  selectedItems: string[]
  onSelectionChange: (items: string[]) => void
  onRowClick: (terminal: Terminal) => void
  pagination?: any
  loading?: boolean
  emptyStateDescription: string
  onView?: (terminal: Terminal) => void
  onRestart?: (terminal: Terminal) => void
  onConfigure?: (terminal: Terminal) => void
  activeItemId?: string
}

export function TerminalTable({
  data,
  selectedItems,
  onSelectionChange,
  onRowClick,
  pagination,
  loading,
  emptyStateDescription,
  onView,
  onRestart,
  onConfigure,
  activeItemId,
}: TerminalTableProps) {
  
  const getStatusBadge = (status: string) => {
    const variants = {
      online: 'default',
      offline: 'secondary', 
      error: 'destructive',
      maintenance: 'outline'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const columns: Column<Terminal>[] = useMemo(() => [
    {
      key: 'name',
      header: 'Terminal',
      render: (item: Terminal) => (
        <div className="font-medium">{item.label || item.name}</div>
      ),
    },
    {
      key: 'serialNumber',
      header: 'Serial Number',
      render: (item: Terminal) => (
        <div className="font-mono text-sm">{item.serialNumber}</div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Terminal) => getStatusBadge(item.status),
    },
    {
      key: 'registeredTo',
      header: 'Merchant',
      render: (item: Terminal) => (
        <div className="text-sm">
          {typeof item.registeredTo === 'string' ? item.registeredTo : item.registeredTo?.name || 'Unassigned'}
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (item: Terminal) => (
        <div className="text-sm">
          {typeof item.location === 'string' ? item.location : item.location?.name || 'Unknown'}
        </div>
      ),
    },
    {
      key: 'deviceType',
      header: 'Device',
      render: (item: Terminal) => (
        <div className="flex items-center gap-2">
          <Monitor className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{item.deviceType}</span>
        </div>
      ),
    },
    {
      key: 'batteryLevel',
      header: 'Battery',
      render: (item: Terminal) => (
        item.batteryLevel ? (
          <div className="flex items-center gap-2">
            <Battery className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{item.batteryLevel}%</span>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">N/A</span>
        )
      ),
    },
  ], [])

  const unavailableItems = useMemo(() => 
    data
      .filter(terminal => ["offline", "error"].includes(terminal.status))
      .map(terminal => terminal.id), 
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
    if (onRestart) {
      actions.push({
        key: 'restart',
        label: 'Restart',
        onClick: onRestart,
      })
    }
    if (onConfigure) {
      actions.push({
        key: 'configure',
        label: 'Configure',
        onClick: onConfigure,
      })
    }
    return actions
  }, [onView, onRestart, onConfigure])

  return (
    <DataTable
      data={data as any}
      columns={columns as any}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      getItemId={(terminal: any) => terminal.id}
      onRowClick={onRowClick as any}
      rowActions={rowActions as any}
      pagination={pagination}
      loading={loading}
      unavailableItems={unavailableItems}
      emptyStateDescription={emptyStateDescription}
      className="bg-background"
      getItemStatus={(terminal: any) => terminal.status || 'unknown'}
      activeItemId={activeItemId}
    />
  )
}
