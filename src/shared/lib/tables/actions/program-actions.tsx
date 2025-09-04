import { Edit, X, Download } from "lucide-react"
import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Program } from "@shared/types/programs"

type ProgramActionHandlers = {
  onView?: (program: Program) => void
  onEdit?: (program: Program) => void
  onArchive?: (program: Program) => void
  onExport?: (programIds: string[]) => void
}

export const getProgramBulkActions = (handlers: ProgramActionHandlers = {}): BulkAction[] => [
  {
    key: "export",
    label: "Export Selected",
    icon: <Download className="h-4 w-4" />,
    onClick: (ids) => handlers.onExport?.(ids),
  },
  {
    key: "archive",
    label: "Archive Programs",
    icon: <X className="h-4 w-4" />,
    onClick: (_ids) => {},
    variant: "destructive",
    disabled: (ids) => ids.length === 0,
  },
]

export const getProgramRowActions = (handlers: ProgramActionHandlers = {}): TableAction<Program>[] => [
  {
    key: "edit",
    label: "Edit program",
    icon: <Edit className="h-4 w-4" />,
    onClick: (program) => handlers.onEdit?.(program),
  },
  {
    key: "archive",
    label: "Archive program",
    icon: <X className="h-4 w-4" />,
    onClick: (program) => handlers.onArchive?.(program),
    variant: "destructive",
    condition: (program) => program.status !== "archived",
  },
]

export const getProgramHoverActions = (handlers: ProgramActionHandlers = {}): TableAction<Program>[] => [
  {
    key: "edit",
    label: "Edit program",
    icon: <Edit className="h-4 w-4" />,
    onClick: (program) => handlers.onEdit?.(program),
  },
]
