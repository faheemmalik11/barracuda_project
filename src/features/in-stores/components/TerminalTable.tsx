import { useMemo } from "react"
import { DataTable } from "@shared/components/ui/data-table/DataTable"
import { terminalColumns } from "@shared/lib/tables"
import { getTerminalRowActions, getTerminalHoverActions } from "@shared/lib/tables/actions/terminal-actions"
import type { Terminal } from "@shared/types/terminals"

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

interface TerminalTableProps {
  terminals?: Terminal[]
  selectedTerminals?: string[]
  onSelectionChange?: (selected: string[]) => void
  onViewTerminal?: (terminal: Terminal) => void
  onRestartTerminal?: (terminal: Terminal) => void
  onConfigureTerminal?: (terminal: Terminal) => void
  onUpdateStatus?: (terminal: Terminal, status: string) => void
  unavailableItems?: string[]
  loading?: boolean
  emptyStateDescription?: string
  pagination?: PaginationProps
  status?: string
  managedColumns?: ManagedColumn[]
}

export function TerminalTable({
  terminals = [],
  selectedTerminals = [],
  onSelectionChange = () => {},
  onViewTerminal,
  onRestartTerminal,
  onConfigureTerminal,
  onUpdateStatus,
  unavailableItems = [],
  loading = false,
  emptyStateDescription = "No terminals found.",
  pagination,
}: TerminalTableProps) {

  const rowActions = useMemo(() => getTerminalRowActions({
    onView: onViewTerminal,
    onRestart: onRestartTerminal,
    onConfigure: onConfigureTerminal,
  }), [onViewTerminal, onRestartTerminal, onConfigureTerminal])

  const hoverActions = useMemo(() => getTerminalHoverActions({
    onRestart: onRestartTerminal,
  }), [onRestartTerminal])

  return (
    <DataTable
      data={terminals as unknown as Record<string, unknown>[]}
      columns={terminalColumns as any}
      selectedItems={selectedTerminals}
      onSelectionChange={onSelectionChange}
      getItemId={(terminal: any) => terminal.id}
      onRowClick={onViewTerminal as any}
      rowActions={rowActions as any}
      hoverActions={hoverActions as any}
      unavailableItems={unavailableItems}
      loading={loading}
      emptyStateDescription={emptyStateDescription}
      pagination={pagination}
    />
  )
}
