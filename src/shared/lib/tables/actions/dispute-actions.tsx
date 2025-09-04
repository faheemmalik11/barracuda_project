import { FileText, Download } from "lucide-react"
import type { TableAction, BulkAction } from "../../../types/data-table"
import type { Dispute } from "../../../../features/disputes/types/disputes.types"

type DisputeActionHandlers = {
  onView?: (dispute: Dispute) => void
  onSubmitEvidence?: (dispute: Dispute) => void
  onExport?: (disputeIds: string[]) => void
}

export const getDisputeBulkActions = (): BulkAction[] => [
  {
    key: "export",
    label: "Export Selected",
    icon: <Download className="h-4 w-4" />,
    onClick: (_ids) => {},
  },
  {
    key: "submit-evidence",
    label: "Submit Evidence",
    icon: <FileText className="h-4 w-4" />,
    onClick: (_ids) => {},
  },
]

export const getDisputeRowActions = (disputeData: Dispute, handlers: DisputeActionHandlers = {}): TableAction<Dispute>[] => [
  {
    key: "submit-evidence",
    label: "Submit evidence",
    icon: <FileText className="h-4 w-4" />,
    onClick: (dispute) => handlers.onSubmitEvidence?.(dispute),
    condition: () => disputeData.status === "needs_response" || disputeData.status === "warning_needs_response",
  },
]

export const getDisputeHoverActions = (disputeData: Dispute, handlers: DisputeActionHandlers = {}): TableAction<Dispute>[] => [
  {
    key: "submit-evidence",
    label: "Submit evidence",
    icon: <FileText className="h-4 w-4" />,
    onClick: (dispute) => handlers.onSubmitEvidence?.(dispute),
    condition: () => disputeData.status === "needs_response" || disputeData.status === "warning_needs_response",
  },
]
