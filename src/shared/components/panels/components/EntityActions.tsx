import { toast } from 'sonner'
import { RowActionDropdown } from '@shared/components/ui/data-table/RowActions'
import type { TableAction } from '@shared/types/data-table'

export interface ActionConfig {
  key: string
  label: string
  variant?: 'destructive'
  onClick?: (entity: any) => void
}

export interface EntityActionsConfig {
  statusActions: Record<string, ActionConfig[]>
  commonActions: ActionConfig[]
  customTriggerClassName?: string
}

interface EntityActionsProps<T extends { status: string }> {
  entityInfo: T
  config: EntityActionsConfig
}

const defaultActionHandler = (label: string) => () => {
  toast.info(`${label} functionality coming soon`)
}

const createAction = <T,>(actionConfig: ActionConfig, entityInfo: T): TableAction<T> => ({
  key: actionConfig.key,
  label: actionConfig.label,
  onClick: actionConfig.onClick ? () => actionConfig.onClick!(entityInfo) : defaultActionHandler(actionConfig.label),
  variant: actionConfig.variant
})

export function EntityActions<T extends { status: string }>({
  entityInfo,
  config
}: EntityActionsProps<T>) {
  const statusActions = config.statusActions[entityInfo.status] || []
  const allActions = [...statusActions, ...config.commonActions]
  
  const tableActions: TableAction<T>[] = allActions.map(actionConfig => 
    createAction(actionConfig, entityInfo)
  )

  return (
    <RowActionDropdown
      actions={tableActions}
      item={entityInfo}
      triggerClassName={
        config.customTriggerClassName || 
        "h-9 w-9 p-0 border border-input rounded-full hover:bg-accent"
      }
    />
  )
}