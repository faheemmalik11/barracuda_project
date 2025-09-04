import { Edit, CreditCard, Download } from "lucide-react"
import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Member } from "@shared/types/members"

type MemberActionHandlers = {
  onView?: (member: Member) => void
  onEdit?: (member: Member) => void
  onAdjustPoints?: (member: Member) => void
  onExport?: (memberIds: string[]) => void
  onUpdateTier?: (memberIds: string[]) => void
}

export const getMemberBulkActions = (handlers: MemberActionHandlers = {}): BulkAction[] => [
  {
    key: "export",
    label: "Export Selected",
    icon: <Download className="h-4 w-4" />,
    onClick: (ids) => handlers.onExport?.(ids),
  },
  {
    key: "update-tier",
    label: "Update Tier",
    icon: <Edit className="h-4 w-4" />,
    onClick: (ids) => handlers.onUpdateTier?.(ids),
    disabled: (ids) => ids.length === 0,
  },
]

export const getMemberRowActions = (handlers: MemberActionHandlers = {}): TableAction<Member>[] => [
  {
    key: "edit",
    label: "Edit member",
    icon: <Edit className="h-4 w-4" />,
    onClick: (member) => handlers.onEdit?.(member),
  },
  {
    key: "adjust-points",
    label: "Adjust points",
    icon: <CreditCard className="h-4 w-4" />,
    onClick: (member) => handlers.onAdjustPoints?.(member),
  },
]

export const getMemberHoverActions = (handlers: MemberActionHandlers = {}): TableAction<Member>[] => [
  {
    key: "edit",
    label: "Edit member",
    icon: <Edit className="h-4 w-4" />,
    onClick: (member) => handlers.onEdit?.(member),
  },
]
