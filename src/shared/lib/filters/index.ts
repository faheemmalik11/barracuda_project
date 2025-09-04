export * from "./common-options"
export * from "./base-filters"
export * from "./entity-filters"
export * from "./filter-factories"
export * from "./filter-utils"
export * from "./configs"
export * from "./validation"


export type { TableFiltersConfig } from '@shared/types/filters'

import { tableConfigs } from './configs'

export function getCompleteFilterConfig(entityType: keyof typeof tableConfigs) {
  const config = tableConfigs[entityType]
  return {
    ...config,
    allFilters: [
      ...config.filters,
      ...(config.additionalFilters || [])
    ]
  }
}

export function getEntityFilterKeys(entityType: keyof typeof tableConfigs): string[] {
  const config = tableConfigs[entityType]
  return [
    ...config.filters.map((f: { key: string }) => f.key),
    ...(config.additionalFilters?.map((f: { key: string }) => f.key) || [])
  ]
}

export function hasEntityFilter(entityType: keyof typeof tableConfigs, filterKey: string): boolean {
  return getEntityFilterKeys(entityType).includes(filterKey)
}

export { tableConfigs } from './configs' 
