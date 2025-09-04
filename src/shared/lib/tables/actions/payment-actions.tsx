import { RefreshCcw, Send, X, CheckCircle, User, Flag } from "lucide-react"
import type { TableAction } from "@shared/types/data-table"
import type { Payment } from "@shared/types/payment.types"
import { createBaseActions, mergeActions, type BaseActionHandlers } from "./base-actions"

interface PaymentSpecificHandlers {
  onRefund?: (payment: Payment) => void
  onSendReceipt?: (payment: Payment) => void
  onCapture?: (payment: Payment) => void
  onCancel?: (payment: Payment) => void
  onRetry?: (payment: Payment) => void
  onViewCustomer?: (payment: Payment) => void
}

export type PaymentActionHandlers = BaseActionHandlers<Payment> & PaymentSpecificHandlers

const createPaymentBulkActions = () => [
  {
    key: "flag",
    label: "Flag",
    icon: <Flag className="h-4 w-4" />,
    onClick: (_ids: string[]) => {},
  },
  {
    key: "cancel",
    label: "Cancel",
    variant: "destructive" as const,
    onClick: (_ids: string[]) => {},
  },
]

const createPaymentRowActions = (handlers: PaymentActionHandlers) => [
  {
    key: "send-receipt",
    label: "Send receipt",
    icon: <Send className="h-4 w-4" />,
    onClick: (payment: Payment) => handlers.onSendReceipt?.(payment),
    condition: (payment: Payment) => payment.status === "succeeded",
  },
  {
    key: "refund",
    label: "Refund payment",
    icon: <RefreshCcw className="h-4 w-4" />,
    onClick: (payment: Payment) => handlers.onRefund?.(payment),
    condition: (payment: Payment) => payment.status === "succeeded",
  },
  {
    key: "capture",
    label: "Capture payment",
    icon: <CheckCircle className="h-4 w-4" />,
    onClick: (payment: Payment) => handlers.onCapture?.(payment),
    condition: (payment: Payment) => payment.status === "uncaptured",
  },
  {
    key: "cancel",
    label: "Cancel payment",
    icon: <X className="h-4 w-4" />,
    onClick: (payment: Payment) => handlers.onCancel?.(payment),
    condition: (payment: Payment) => payment.status === "uncaptured" || payment.status === "pending",
    variant: "destructive" as const,
  },
  {
    key: "view-customer",
    label: "View customer",
    icon: <User className="h-4 w-4" />,
    onClick: (payment: Payment) => handlers.onViewCustomer?.(payment),
    condition: (payment: Payment) => Boolean(payment.customer?.email || payment.customer?.name),
  },
]

export const getPaymentActions = (handlers: PaymentActionHandlers = {}) => {
  const baseActions = createBaseActions('Payment', handlers, {
    showEdit: false,
    showDelete: false,
    showFlag: true,
    showAddNote: true,
    showCopyId: true,
    showExport: true,
  })

  const paymentSpecificActions = {
    bulkActions: createPaymentBulkActions(),
    rowActions: createPaymentRowActions(handlers),
  }

  return mergeActions(baseActions, paymentSpecificActions)
}

export const getPaymentBulkActions = (handlers: PaymentActionHandlers = {}) => 
  getPaymentActions(handlers).bulkActions

export const getPaymentRowActions = (handlers: PaymentActionHandlers = {}) => 
  getPaymentActions(handlers).rowActions

export const getPaymentHoverActions = (handlers: PaymentActionHandlers = {}): TableAction<Payment>[] => [
  {
    key: "capture",
    label: "Capture",
    icon: <CheckCircle className="h-4 w-4" />,
    onClick: (payment) => handlers.onCapture?.(payment),
    condition: (payment) => payment.status === "uncaptured",
  },
  {
    key: "retry",
    label: "Retry",
    icon: <RefreshCcw className="h-4 w-4" />,
    onClick: (payment) => handlers.onRetry?.(payment),
    condition: (payment) => payment.status === "failed",
  },
]
