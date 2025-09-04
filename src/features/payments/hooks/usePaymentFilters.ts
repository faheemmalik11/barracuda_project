import { useEntityFilters } from '@shared/hooks/useEntityFilters'
import { createQueryUtils } from '@shared/utils/query/createQueryUtils'
import { PAYMENT_QUERY_CONFIG } from '@shared/utils/query/configs'
import { StatusRegistry } from '@shared/lib/filters/status-registry'
import type { EntityFacets } from '@shared/types/status-filter.types'

const queryUtils = createQueryUtils(PAYMENT_QUERY_CONFIG)
const STATUS_CARD_VALUES = ['all', 'succeeded', 'refunded', 'disputed', 'failed', 'uncaptured'] as const

export const usePaymentFilters = () => {
  return useEntityFilters({
    statusCardValues: STATUS_CARD_VALUES,
    statusMappings: StatusRegistry.getMappings('payment'),
    sessionKeys: {
      statusFilter: 'payment-status-filter',
      filters: 'payments-filters',
    },
    queryUtils: {
      parseQueryStringToFilters: queryUtils.parseQueryStringToFilters,
      buildQueryString: queryUtils.buildQueryString,
    },
    extraStatusCountHandlers: [{
      condition: (status: string) => status === 'disputed',
      handler: (facets: EntityFacets) => 
        facets.type?.find(item => item.value.toLowerCase() === 'dispute')?.count || 0
    }],
    entityType: 'payments',
  })
}
