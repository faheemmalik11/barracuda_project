import { Edit, Copy, Download, Flag, MessageSquare, Trash2 } from 'lucide-react'
import type { BulkAction, TableAction } from '@shared/types/data-table'

export interface BaseActionHandlers<T> {
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onFlag?: (item: T) => void
  onAddNote?: (item: T) => void
  onCopyId?: (item: T) => void
  onExport?: (ids: string[]) => void
}

export interface ActionGroup<T> {
  bulkActions: BulkAction[]
  rowActions: TableAction<T>[]
}

/**
 * Creates base actions that are common across most entities
 */
export function createBaseActions<T extends { id: string | number; status?: string }>(
  entityName: string,
  handlers: BaseActionHandlers<T>,
  options: {
    showEdit?: boolean
    showDelete?: boolean
    showFlag?: boolean
    showAddNote?: boolean
    showCopyId?: boolean
    showExport?: boolean
  } = {}
): ActionGroup<T> {
  const {
    showEdit = true,
    showDelete = false,
    showFlag = false,
    showAddNote = false,
    showCopyId = true,
    showExport = true,
  } = options

  const bulkActions: BulkAction[] = []
  const rowActions: TableAction<T>[] = []

  // Bulk actions
  if (showExport && handlers.onExport) {
    bulkActions.push({
      key: 'export',
      label: 'Export Selected',
      icon: <Download className="h-4 w-4" />,
      onClick: handlers.onExport,
    })
  }

  // Row actions
  if (showEdit && handlers.onEdit) {
    rowActions.push({
      key: 'edit',
      label: `Edit ${entityName}`,
      icon: <Edit className="h-4 w-4" />,
      onClick: handlers.onEdit,
    })
  }

  if (showCopyId && handlers.onCopyId) {
    rowActions.push({
      key: 'copy-id',
      label: `Copy ${entityName} ID`,
      icon: <Copy className="h-4 w-4" />,
      onClick: handlers.onCopyId,
    })
  }

  if (showAddNote && handlers.onAddNote) {
    rowActions.push({
      key: 'add-note',
      label: 'Add Note',
      icon: <MessageSquare className="h-4 w-4" />,
      onClick: handlers.onAddNote,
    })
  }

  if (showFlag && handlers.onFlag) {
    rowActions.push({
      key: 'flag',
      label: `Flag ${entityName}`,
      icon: <Flag className="h-4 w-4" />,
      onClick: handlers.onFlag,
    })
  }

  if (showDelete && handlers.onDelete) {
    rowActions.push({
      key: 'delete',
      label: `Delete ${entityName}`,
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handlers.onDelete,
      variant: 'destructive',
    })
  }

  return { bulkActions, rowActions }
}

/**
 * Utility to merge base actions with entity-specific actions
 */
export function mergeActions<T>(
  baseActions: ActionGroup<T>,
  specificActions: Partial<ActionGroup<T>>
): ActionGroup<T> {
  return {
    bulkActions: [...baseActions.bulkActions, ...(specificActions.bulkActions || [])],
    rowActions: [...baseActions.rowActions, ...(specificActions.rowActions || [])],
  }
}

/**
 * Utility to filter actions based on conditions
 */
export function filterActions<T>(
  actions: ActionGroup<T>,
  item?: T,
  selectedIds?: string[]
): ActionGroup<T> {
  return {
    bulkActions: actions.bulkActions.filter(action => {
      if (typeof action.disabled === 'function') {
        return !action.disabled(selectedIds || [])
      }
      return !action.disabled
    }),
    rowActions: actions.rowActions.filter(action => {
      if (typeof action.disabled === 'function' && item) {
        return !action.disabled(item) && (!action.condition || action.condition(item))
      }
      return !action.disabled && (!action.condition || !item || action.condition(item))
    }),
  }
}