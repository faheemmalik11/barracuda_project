import { CheckCircle, X, RefreshCcw, User, CreditCard, Flag, Copy } from "lucide-react"
import type { TableAction } from "@shared/types/data-table"
import type { Refund } from "@shared/types/refunds"
import { createBaseActions, mergeActions, type BaseActionHandlers } from "./base-actions"

interface RefundSpecificHandlers {
  onProcessRefund?: (refund: Refund) => void
  onCancelRefund?: (refund: Refund) => void
  onRetryRefund?: (refund: Refund) => void
  onViewPayment?: (refund: Refund) => void
  onViewCustomer?: (refund: Refund) => void
}

export type RefundActionHandlers = BaseActionHandlers<Refund> & RefundSpecificHandlers

const createRefundRowActions = (handlers: RefundActionHandlers) => [
  {
    key: "process",
    label: "Process refund",
    icon: <CheckCircle className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onProcessRefund?.(refund),
    condition: (refund: Refund) => refund.status === "pending",
  },
  {
    key: "retry",
    label: "Retry refund",
    icon: <RefreshCcw className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onRetryRefund?.(refund),
    condition: (refund: Refund) => refund.status === "failed",
  },
  {
    key: "cancel",
    label: "Cancel refund",
    icon: <X className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onCancelRefund?.(refund),
    variant: "destructive" as const,
    condition: (refund: Refund) => refund.status === "pending",
  },
  {
    key: "view-payment",
    label: "View payment",
    icon: <CreditCard className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onViewPayment?.(refund),
  },
  {
    key: "view-customer",
    label: "View customer",
    icon: <User className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onViewCustomer?.(refund),
  },
  {
    key: "flag",
    label: "Flag",
    icon: <Flag className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onFlag?.(refund),
  },
  {
    key: "copy-id",
    label: "Copy ID",
    icon: <Copy className="h-4 w-4" />,
    onClick: (refund: Refund) => handlers.onCopyId?.(refund),
  },
]


export const getRefundRowActions = (handlers: RefundActionHandlers): TableAction<Refund>[] => {
  const baseActions = createBaseActions<Refund>('refund', handlers, {
    showFlag: true,
    showCopyId: true,
    showAddNote: true
  })
  const refundActions = createRefundRowActions(handlers)
  const specificActions = {
    rowActions: refundActions,
    bulkActions: []
  }
  const mergedActions = mergeActions(baseActions, specificActions)
  return mergedActions.rowActions
}


// Bulk actions for refunds
export const getRefundBulkActions = () => [
  {
    key: 'cancel',
    label: 'Cancel Selected',
    variant: 'destructive' as const,
    onClick: (ids: string[]) => {
      console.log('Bulk cancel refunds:', ids)
    }
  },
  {
    key: 'export',
    label: 'Export Selected',
    onClick: (ids: string[]) => {
      console.log('Bulk export refunds:', ids)
    }
  }
]
