import type { EntityFacets } from '@shared/types/status-filter.types'

interface EntityWithStatus {
  status: string
  [key: string]: unknown
}

export const generateStatusFacets = <T extends EntityWithStatus>(
  items: T[]
): EntityFacets => {
  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    status: Object.entries(statusCounts).map(([value, count]) => ({ value, count }))
  }
}

export const generateEntityFacets = generateStatusFacets