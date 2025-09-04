import { useEntityFilters } from '@shared/hooks/useEntityFilters'
import { createQueryUtils } from '@shared/utils/query/createQueryUtils'
import { MERCHANT_QUERY_CONFIG } from '@shared/utils/query/configs'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

const queryUtils = createQueryUtils(MERCHANT_QUERY_CONFIG)

const STATUS_CARD_VALUES = ['all', 'active', 'risky', 'restricted', 'soon_restricted', 'rejected', 'terminated', 'accounts_to_review', 'rule_match'] as const

export const useMerchantFilters = () => {
  return useEntityFilters({
    statusCardValues: STATUS_CARD_VALUES,
    statusMappings: StatusRegistry.getMappings('merchant'),
    sessionKeys: {
      statusFilter: 'merchant-status-filter',
      filters: 'merchants-filters',
    },
    queryUtils: {
      parseQueryStringToFilters: queryUtils.parseQueryStringToFilters,
      buildQueryString: queryUtils.buildQueryString,
    },
    entityType: 'merchants',
  })
} 
