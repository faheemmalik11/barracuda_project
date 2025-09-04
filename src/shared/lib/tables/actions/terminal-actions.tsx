import { Edit, RefreshCcw, Download } from "lucide-react"
import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Terminal } from "@shared/types/terminals"

type TerminalActionHandlers = {
  onExport?: (ids: string[]) => void
  onRestart?: (terminal: Terminal) => void
  onConfigure?: (terminal: Terminal) => void
  onView?: (terminal: Terminal) => void
}

export const getTerminalBulkActions = (handlers: TerminalActionHandlers = {}): BulkAction[] => [
  {
    key: "export",
    label: "Export Selected",
    icon: <Download className="h-4 w-4" />,
    onClick: (ids) => handlers.onExport?.(ids),
  },
  {
    key: "restart",
    label: "Restart Terminals",
    icon: <RefreshCcw className="h-4 w-4" />,
    onClick: (_ids) => {},
  },
]

export const getTerminalRowActions = (handlers: TerminalActionHandlers = {}): TableAction<Terminal>[] => [
  {
    key: "restart",
    label: "Restart terminal",
    icon: <RefreshCcw className="h-4 w-4" />,
    onClick: (terminal) => handlers.onRestart?.(terminal),
    condition: (terminal) => terminal.status === "online",
  },
  {
    key: "configure",
    label: "Configure",
    icon: <Edit className="h-4 w-4" />,
    onClick: (terminal) => handlers.onConfigure?.(terminal),
  },
]

export const getTerminalHoverActions = (handlers: TerminalActionHandlers = {}): TableAction<Terminal>[] => [
  {
    key: "restart",
    label: "Restart terminal",
    icon: <RefreshCcw className="h-4 w-4" />,
    onClick: (terminal) => handlers.onRestart?.(terminal),
    condition: (terminal) => terminal.status === "online",
  },
]
