import { useEntityFilters } from '@shared/hooks/useEntityFilters'
import { createQueryUtils } from '@shared/utils/query/createQueryUtils'
import { REFUND_QUERY_CONFIG } from '@shared/utils/query/configs'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

const queryUtils = createQueryUtils(REFUND_QUERY_CONFIG)
const STATUS_CARD_VALUES = ['all', 'pending', 'succeeded', 'failed', 'canceled'] as const

export const useRefundFilters = () => {
  return useEntityFilters({
    statusCardValues: STATUS_CARD_VALUES,
    statusMappings: StatusRegistry.getMappings('refund'),
    sessionKeys: {
      statusFilter: 'refund-status-filter',
      filters: 'refunds-filters',
    },
    queryUtils: {
      parseQueryStringToFilters: queryUtils.parseQueryStringToFilters,
      buildQueryString: queryUtils.buildQueryString,
    },
    entityType: 'refunds',
  })
}