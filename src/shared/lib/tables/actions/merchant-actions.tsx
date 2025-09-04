import { RefreshCw, Settings, User, Pause } from "lucide-react"
import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Merchant } from "@shared/types/merchant"
import { createBaseActions, mergeActions, type BaseActionHandlers } from "./base-actions"

interface MerchantSpecificHandlers {
  onSuspend?: (merchant: Merchant) => void
  onViewProfile?: (merchant: Merchant) => void
  onBulkSuspend?: (merchantIds: string[]) => void
  onUpdateStatus?: (merchantIds: string[]) => void
  onUpdateCapabilities?: (merchantIds: string[]) => void
}

export type MerchantActionHandlers = BaseActionHandlers<Merchant> & MerchantSpecificHandlers

export const getMerchantActions = (handlers: MerchantActionHandlers = {}) => {
  // TODO: Add proper logging for merchant actions initialization
  
  const baseActions = createBaseActions('Merchant', handlers, {
    showEdit: true,
    showDelete: false,
    showFlag: true,
    showAddNote: true,
    showCopyId: true,
    showExport: true,
  })

  const merchantSpecificActions = {
    bulkActions: [
      {
        key: "updateStatus",
        label: "Update Status",
        icon: <RefreshCw className="h-4 w-4" />,
        onClick: (ids: string[]) => handlers.onUpdateStatus?.(ids),
        disabled: (ids: string[]) => ids.length === 0,
      },
      {
        key: "updateCapabilities",
        label: "Update Capabilities",
        icon: <Settings className="h-4 w-4" />,
        onClick: (ids: string[]) => handlers.onUpdateCapabilities?.(ids),
        disabled: (ids: string[]) => ids.length === 0,
      },
      {
        key: "bulkSuspend",
        label: "Suspend Selected",
        icon: <Pause className="h-4 w-4" />,
        onClick: (ids: string[]) => handlers.onBulkSuspend?.(ids),
        disabled: (ids: string[]) => ids.length === 0,
        variant: "destructive" as const,
      },
    ] satisfies BulkAction[],
    rowActions: [
      {
        key: "suspend",
        label: "Suspend merchant",
        icon: <Pause className="h-4 w-4" />,
        onClick: (merchant: Merchant) => handlers.onSuspend?.(merchant),
        condition: (merchant: Merchant) => merchant.status === "active",
        variant: "destructive" as const,
      },
      {
        key: "view-profile",
        label: "View profile",
        icon: <User className="h-4 w-4" />,
        onClick: (merchant: Merchant) => handlers.onViewProfile?.(merchant),
      },
    ] satisfies TableAction<Merchant>[],
  }

  const mergedActions = mergeActions(baseActions, merchantSpecificActions)
  // TODO: Add proper logging for merchant actions result
  
  return mergedActions
}

export const getMerchantBulkActions = (handlers: MerchantActionHandlers = {}): BulkAction[] => 
  getMerchantActions(handlers).bulkActions

export const getMerchantRowActions = (handlers: MerchantActionHandlers = {}): TableAction<Merchant>[] => 
  getMerchantActions(handlers).rowActions

export const getMerchantHoverActions = (): TableAction<Merchant>[] => []