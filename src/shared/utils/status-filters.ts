import type { StatusMappings, EntityFacets, StatusFilterItem } from '../types/status-filter.types'

export function createStatusFilters<T extends StatusFilterItem>(
  statusItems: T[]
): (T | StatusFilterItem)[] {
  const hasAll = statusItems.some(item => item.value === 'all')
  if (hasAll) return statusItems
  
  return [{ value: 'all', label: 'All' }, ...statusItems]
}

export function createStatusMappings(
  mappings: Omit<StatusMappings, 'all'>
): StatusMappings {
  return {
    all: [],
    ...mappings,
  }
}

export function createEntityStatusUtil<T extends StatusMappings>(mappings: T) {
  return {
    getStatusValues: (cardValue: string) => getStatusValuesForCard(cardValue, mappings),
    shouldClearFilter: (cardValue: string) => shouldClearStatusFilter(cardValue),
    getCount: (status: string, facets: EntityFacets, totalItems: number, extraHandlers?: any) =>
      getStatusCount(status, facets, totalItems, mappings, extraHandlers)
  }
}

/**
 * Generic utility to get status values for a card based on mappings
 */
export function getStatusValuesForCard(
  cardValue: string,
  statusMappings: StatusMappings
): readonly string[] {
  if (cardValue === 'all') {
    return []
  }
  
  const mapping = statusMappings[cardValue]
  return mapping || []
}

/**
 * Generic utility to determine if status filter should be cleared
 */
export function shouldClearStatusFilter(cardValue: string): boolean {
  return cardValue === 'all'
}

/**
 * Generic status count calculator for any entity type
 */
export function getStatusCount(
  status: string,
  facets: EntityFacets = {},
  _totalItems: number = 0,
  statusMappings: StatusMappings,
  extraCountHandlers?: Array<{
    condition: (status: string) => boolean
    handler: (facets: EntityFacets) => number
  }>
): number {
  if (!facets?.status?.length) {
    return 0;
  }
  
  if (status === 'all') {
    return facets.status.reduce((sum, facet) => sum + facet.count, 0);
  }

  const statusValues = statusMappings[status] || [status]
  
  let count = statusValues.reduce((sum: number, backendStatus: string) => {
    const facetItem = facets.status?.find(item => 
      item.value.toLowerCase() === backendStatus.toLowerCase()
    )
    return sum + (facetItem?.count || 0)
  }, 0)

  // Apply any extra count handlers (e.g., for disputes in payments)
  if (extraCountHandlers) {
    for (const handler of extraCountHandlers) {
      if (handler.condition(status)) {
        count += handler.handler(facets)
      }
    }
  }

  return count
}