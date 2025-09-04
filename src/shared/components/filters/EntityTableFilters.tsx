import { memo, useMemo } from "react"
import TableFilters from "./TableFilters"
import { tableConfigs, type TableConfigKey } from "@shared/lib/filters/configs"
import type { TableFiltersProps } from "@shared/types/filters"

interface EntityTableFiltersProps extends Omit<TableFiltersProps, 'config'> {
  entity: TableConfigKey
  status?: string
}

const EntityTableFilters = memo(function EntityTableFilters({
  entity,
  status,
  ...props
}: EntityTableFiltersProps) {
  const config = useMemo(() => {
    const entityConfig = tableConfigs[entity]
    if (!entityConfig) {
      console.error(`No config found for entity: ${entity}`)
      return null
    }
    
    return entityConfig
  }, [entity, status])

  if (!config) {
    return null
  }

  return <TableFilters config={config} status={status} {...props} />
})

export default EntityTableFilters