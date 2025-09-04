import { X, Edit, CreditCard, Receipt, FileText, Flag, MessageSquare, Copy, User } from "lucide-react"
import type { TableAction } from "@shared/types/data-table"
import type { Customer } from "@shared/types/customers"
import { createBaseActions, mergeActions, type BaseActionHandlers } from "./base-actions"

interface CustomerSpecificHandlers {
  onBlock?: (customer: Customer) => void
  onBulkBlock?: (customerIds: string[]) => void
  onViewCustomer?: (customer: Customer) => void
  onCreatePayment?: (customer: Customer) => void
  onCreateSubscription?: (customer: Customer) => void
  onCreateInvoice?: (customer: Customer) => void
  onViewProfile?: (customer: Customer) => void
  onFlag?: (customer: Customer) => void
  onAddNote?: (customer: Customer) => void
  onCopyCustomerId?: (customer: Customer) => void
}

export type CustomerActionHandlers = BaseActionHandlers<Customer> & CustomerSpecificHandlers

const createCustomerActions = (handlers: CustomerActionHandlers) => [
  {
    key: "createPayment",
    label: "Create payment",
    icon: <CreditCard className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onCreatePayment?.(customer),
    condition: (customer: Customer) => customer.status === "active",
  },
  {
    key: "createSubscription", 
    label: "Create subscription",
    icon: <Receipt className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onCreateSubscription?.(customer),
    condition: (customer: Customer) => customer.status === "active",
  },
  {
    key: "createInvoice",
    label: "Create invoice", 
    icon: <FileText className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onCreateInvoice?.(customer),
    condition: (customer: Customer) => customer.status === "active",
  },
  {
    key: "flag",
    label: "Flag",
    icon: <Flag className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onFlag?.(customer),
    variant: "outline" as const,
  },
  {
    key: "addNote",
    label: "Add note",
    icon: <MessageSquare className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onAddNote?.(customer),
  },
  {
    key: "copyId",
    label: "Copy customer ID",
    icon: <Copy className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onCopyCustomerId?.(customer),
  },
  {
    key: "viewProfile",
    label: "View customer profile",
    icon: <User className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onViewProfile?.(customer),
  },
  {
    key: "block",
    label: "Block customer",
    icon: <X className="h-4 w-4" />,
    onClick: (customer: Customer) => handlers.onBlock?.(customer),
    variant: "destructive" as const,
    condition: (customer: Customer) => !["suspended", "terminated"].includes(customer.status),
  },
]

export const getCustomerActions = (handlers: CustomerActionHandlers = {}) => {
  const baseActions = createBaseActions('Customer', handlers, {
    showEdit: true,
    showDelete: false,
    showFlag: false,
    showAddNote: false,
    showCopyId: true,
    showExport: true,
  })

  return mergeActions(baseActions, {
    bulkActions: [
      {
        key: "block",
        label: "Block Customers",
        icon: <X className="h-4 w-4" />,
        onClick: (ids: string[]) => handlers.onBulkBlock?.(ids),
        variant: "destructive" as const,
        disabled: (ids: string[]) => ids.length === 0,
      },
    ],
    rowActions: createCustomerActions(handlers),
  })
}

export const getCustomerBulkActions = (handlers: CustomerActionHandlers = {}) => 
  getCustomerActions(handlers).bulkActions

export const getCustomerRowActions = (handlers: CustomerActionHandlers = {}) => 
  getCustomerActions(handlers).rowActions

export const getCustomerHoverActions = (handlers: CustomerActionHandlers = {}): TableAction<Customer>[] => [
  {
    key: "edit",
    label: "Edit customer",
    icon: <Edit className="h-4 w-4" />,
    onClick: (customer) => handlers.onEdit?.(customer),
  },
]

