/**
 * Shared status filter types used across different entity filters
 */

export interface StatusFilterItem {
  value: string
  label: string
}

export interface StatusOption {
  value: string
  label: string
  color: string
}

/**
 * Generic status mappings interface for different entities
 */
export interface StatusMappings {
  [key: string]: readonly string[]
}

/**
 * Facet item interface for counting status occurrences
 */
export interface StatusFacetItem {
  value: string
  count: number
}

/**
 * Generic facets interface for different entity types
 */
export interface EntityFacets {
  status?: StatusFacetItem[]
  type?: StatusFacetItem[]
  [key: string]: StatusFacetItem[] | undefined
}