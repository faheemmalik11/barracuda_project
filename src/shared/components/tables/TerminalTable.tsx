import { useMemo } from "react"
import { DataTable } from "@shared/components/ui/data-table"
import { getTerminalColumns } from "@shared/lib/tables/columns/terminal-columns"
import { getTerminalRowActions, getTerminalHoverActions } from "@shared/lib/tables/actions/terminal-actions"
import type { Terminal } from "@shared/types/terminals"

interface TerminalTableProps {
  terminals?: Terminal[]
  selectedTerminals?: string[]
  onSelectionChange?: (selected: string[]) => void
  onViewTerminal?: (terminal: Terminal) => void
  onRestartTerminal?: (terminal: Terminal) => void
  onConfigureTerminal?: (terminal: Terminal) => void
  unavailableItems?: string[]
  loading?: boolean
  emptyStateMessage?: string
}

export function TerminalTable({
  terminals = [],
  selectedTerminals = [],
  onSelectionChange = () => {},
  onViewTerminal,
  onRestartTerminal,
  onConfigureTerminal,
  unavailableItems = [],
  loading = false,
  emptyStateMessage = "No terminals found.",
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
      data={terminals}
      columns={getTerminalColumns() as any}
      selectedItems={selectedTerminals}
      onSelectionChange={onSelectionChange}
      getItemId={(terminal) => terminal.id}
      onRowClick={onViewTerminal}
      rowActions={rowActions}
      hoverActions={hoverActions}
      unavailableItems={unavailableItems}
      loading={loading}
      emptyStateDescription={emptyStateMessage}
    />
  )
}
