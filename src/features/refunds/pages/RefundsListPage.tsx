import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { EntityListPage } from '@shared/components/EntityListPage/EntityListPage'
import { RefundTable } from '@shared/components/tables/RefundTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { 
  useRefunds,
  useRefundFilters, 
  useRefundActions
} from '../hooks'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

export function RefundsListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  const pageSizeSelector = usePageSizeSelector()
  const filters = useRefundFilters()
  const actions = useRefundActions()

  useEffect(() => {
    setCurrentPage(1)
  }, [filters.statusFilter, filters.query, filters.tableFilters])

  const refunds = useRefunds({ 
    pageSize: pageSizeSelector.pageSize,
    currentPage,
    statusFilter: filters.statusFilter,
    filters: filters.tableFilters,
  })

  const handleBatchCancel = (ids: string[]) => {
    actions.handleBatchCancel(ids)
    setSelectedItems([])
  }

  const handleBatchExport = (ids: string[]) => {
    actions.handleBatchExport(ids)
    setSelectedItems([])
  }

  const pageConfig = {
    header: {
      title: 'Refunds',
      description: 'Process and track customer refunds',
      primaryAction: {
        label: 'Create Refund',
        icon: <Plus className="h-4 w-4" />,
        onClick: actions.navigateToCreateRefund
      }
    },
    
    statusFilters: StatusRegistry.getFilters('refund'),
    
    table: {
      component: RefundTable,
      props: {
        onProcessRefund: actions.handleProcessRefund,
        onCancelRefund: actions.handleCancelRefund,
        onRetryRefund: actions.handleRetryRefund,
        onViewPayment: actions.handleViewPayment,
        onViewCustomer: actions.handleViewCustomer,
        onAddNote: actions.handleAddNote,
        onFlag: actions.handleFlag,
        onCopyId: actions.copyRefundId,
        onRowClick: actions.handleViewRefund
      }
    },
    
    tableFilters: {
      component: EntityTableFilters,
      props: { 
        entity: "refunds"
      }
    }
  }

  return (
    <EntityListPage
      {...pageConfig}
      useData={() => ({
        data: refunds.data,
        isLoading: refunds.isLoading,
        totalItems: refunds.totalItems,
        totalPages: refunds.totalPages,
        pagination: {
          currentPage,
          pageSize: pageSizeSelector.pageSize,
          totalItems: refunds.totalItems,
          totalPages: refunds.totalPages,
          onPageChange: setCurrentPage
        },
        facets: refunds.facets
      })}
      useFilters={() => filters}
      useSelection={() => ({
        selectedItems,
        setSelectedItems,
        hasSelectedItems: selectedItems.length > 0,
        handleClearSelection: () => setSelectedItems([]),
        batchActionHandlers: {
          cancel: handleBatchCancel,
          export: handleBatchExport
        }
      })}
      usePageSize={() => pageSizeSelector}
      animationKey={filters.statusFilter}
    />
  )
}

export default RefundsListPage
