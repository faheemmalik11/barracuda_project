import { useEntityFilters } from '@shared/hooks/useEntityFilters'
import { createQueryUtils } from '@shared/utils/query/createQueryUtils'
import { DISPUTE_QUERY_CONFIG } from '@shared/utils/query/configs'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

const STATUS_CARD_VALUES = ['all', 'open', 'under_review', 'won', 'lost'] as const
const queryUtils = createQueryUtils(DISPUTE_QUERY_CONFIG)

export const useDisputeFilters = () => {
  return useEntityFilters({
    statusCardValues: STATUS_CARD_VALUES,
    statusMappings: StatusRegistry.getMappings('dispute'),
    sessionKeys: {
      statusFilter: 'dispute-status-filter',
      filters: 'disputes-filters',
    },
    queryUtils: {
      parseQueryStringToFilters: queryUtils.parseQueryStringToFilters,
      buildQueryString: queryUtils.buildQueryString,
    },
    entityType: 'disputes',
  })
}

