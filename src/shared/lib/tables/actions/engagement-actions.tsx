import { Eye, Download } from "lucide-react"
import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Engagement } from "@shared/types/engagement"

type EngagementActionHandlers = {
  onView?: (engagement: Engagement) => void
  onExport?: (ids: string[]) => void
}

export const getEngagementBulkActions = (handlers: EngagementActionHandlers = {}): BulkAction[] => [
  {
    key: "export",
    label: "Export Selected",
    icon: <Download className="h-4 w-4" />,
    onClick: (ids) => handlers.onExport?.(ids),
  },
]

export const getEngagementRowActions = (handlers: EngagementActionHandlers = {}): TableAction<Engagement>[] => [
  {
    key: "view",
    label: "View engagement",
    icon: <Eye className="h-4 w-4" />,
    onClick: (engagement) => handlers.onView?.(engagement),
  },
]

export const getEngagementHoverActions = (handlers: EngagementActionHandlers = {}): TableAction<Engagement>[] => [
  {
    key: "view",
    label: "View engagement",
    icon: <Eye className="h-4 w-4" />,
    onClick: (engagement) => handlers.onView?.(engagement),
  },
]
