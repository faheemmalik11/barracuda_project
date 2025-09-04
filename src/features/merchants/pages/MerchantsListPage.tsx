import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { EntityListPage } from '@shared/components/EntityListPage/EntityListPage'
import { MerchantTable } from '@shared/components/tables/MerchantTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { 
  useMerchants, 
  useMerchantFilters, 
  useMerchantActions
} from '../hooks'
import { useEntitySelection } from '@shared/hooks/useEntitySelection'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

export function MerchantsListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const pageSizeSelector = usePageSizeSelector()
  const filters = useMerchantFilters()
  const actions = useMerchantActions()
  const selection = useEntitySelection({
    batchActions: {
      flag: actions.handleBatchFlag,
      export: actions.handleBatchExport,
      updateStatus: actions.handleBatchUpdateStatus,
      updateCapabilities: actions.handleBatchUpdateCapabilities
    }
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [filters.statusFilter, filters.tableFilters, filters.query])

  const merchants = useMerchants({ 
    pageSize: pageSizeSelector.pageSize,
    currentPage,
    statusFilter: filters.statusFilter,
    filters: filters.tableFilters,
    query: filters.query,
  })

  const pageConfig = {
    header: {
      title: 'Merchants',
      description: 'Manage and monitor your merchant accounts',
      primaryAction: {
        label: 'Create Merchant',
        icon: <Plus className="h-4 w-4" />,
        onClick: actions.handleCreateMerchant
      }
    },
    
    statusFilters: StatusRegistry.getFilters('merchant'),
    
    table: {
      component: MerchantTable,
      props: {
        onCopyId: actions.handleCopyMerchantId,
        onRowClick: actions.handleViewMerchantProfile,
        onViewProfile: actions.handleViewMerchantProfile,
        onFlag: actions.handleFlagMerchant,
        onAddNote: actions.handleAddNote
      }
    },
    
    tableFilters: {
      component: EntityTableFilters,
      props: { 
        entity: "merchants",
        onBulkAction: selection.handleBulkAction
      }
    }
  }

  return (
    <EntityListPage
      header={pageConfig.header}
      statusFilters={pageConfig.statusFilters}
      table={pageConfig.table}
      tableFilters={pageConfig.tableFilters}
      useData={() => ({
        data: merchants.data,
        isLoading: merchants.isLoading,
        totalItems: merchants.totalItems,
        totalPages: merchants.totalPages,
        facets: merchants.unfilteredFacets,
        pagination: {
          currentPage,
          pageSize: pageSizeSelector.pageSize,
          totalItems: merchants.totalItems,
          totalPages: merchants.totalPages,
          onPageChange: setCurrentPage
        }
      })}
      useFilters={() => filters}
      useSelection={() => selection}
      usePageSize={() => pageSizeSelector}
      animationKey={filters.statusFilter}
    />
  )
}

export default MerchantsListPage
