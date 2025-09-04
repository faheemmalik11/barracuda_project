import { useEntityFilters } from '@shared/hooks/useEntityFilters'
import { createQueryUtils } from '@shared/utils/query/createQueryUtils'
import { CUSTOMER_QUERY_CONFIG } from '@shared/utils/query/configs'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

const queryUtils = createQueryUtils(CUSTOMER_QUERY_CONFIG)

const STATUS_CARD_VALUES = ['all', 'active', 'risky', 'in_review', 'restricted', 'terminated'] as const

export const useCustomerFilters = () => {
  return useEntityFilters({
    statusCardValues: STATUS_CARD_VALUES,
    statusMappings: StatusRegistry.getMappings('customer'),
    sessionKeys: {
      statusFilter: 'customer-status-filter',
      filters: 'customers-filters',
    },
    queryUtils: {
      parseQueryStringToFilters: queryUtils.parseQueryStringToFilters,
      buildQueryString: queryUtils.buildQueryString,
    },
    entityType: 'customers',
  })
}