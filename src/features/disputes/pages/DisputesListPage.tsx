import { useState, useEffect } from 'react'
import { Download, AlertTriangle } from 'lucide-react'
import { EntityListPage } from '@shared/components/EntityListPage/EntityListPage'
import { DisputeTable } from '../components/DisputeTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { 
  useDisputes, 
  useDisputeFilters, 
  useDisputeActions, 
  useDisputeSheets
} from '../hooks'
import type { Dispute } from '../types/disputes.types'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

export function DisputesListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  const pageSizeSelector = usePageSizeSelector()
  const filters = useDisputeFilters()
  const sheets = useDisputeSheets()
  const actions = useDisputeActions()

  useEffect(() => {
    setCurrentPage(1)
  }, [filters.statusFilter, filters.query, filters.tableFilters])

  const disputes = useDisputes({ 
    pageSize: pageSizeSelector.pageSize,
    currentPage,
    statusFilter: filters.statusFilter,
    filters: filters.tableFilters,
  })



  const useSelectionHook = () => ({
    selectedItems,
    setSelectedItems,
    hasSelectedItems: selectedItems.length > 0,
    handleClearSelection: () => setSelectedItems([]),
    batchActionHandlers: {
      handleBatchExport: (ids: string[]) => {
        actions.exportDisputes(ids)
        setSelectedItems([])
      }
    }
  })


  const pageConfig = {
    header: {
      title: 'Disputes',
      description: 'Manage payment disputes and chargebacks',
      primaryAction: {
        label: 'Export All',
        icon: <Download className="h-4 w-4" />,
        variant: 'outline' as const,
        onClick: () => actions.exportDisputes([])
      },
      secondaryActions: [
        {
          label: 'Urgent',
          icon: <AlertTriangle className="h-4 w-4" />,
          variant: 'destructive' as const,
          onClick: () => filters.setStatusFilter('needs_response')
        }
      ]
    },
    
    statusFilters: StatusRegistry.getFilters('dispute'),
    
    table: {
      component: DisputeTable,
      props: {
        onRowClick: (dispute: Dispute) => sheets.openDisputeDetails(dispute)
      }
    },
    
    tableFilters: {
      component: EntityTableFilters,
      props: {
        entity: "disputes"
      }
    },

    sheets: []
  }

  return (
    <EntityListPage
      {...pageConfig}
      useData={() => ({
        data: disputes.disputes,
        isLoading: disputes.isLoading,
        totalItems: disputes.totalItems,
        totalPages: disputes.totalPages,
        pagination: {
          currentPage,
          pageSize: pageSizeSelector.pageSize,
          totalItems: disputes.totalItems,
          totalPages: disputes.totalPages,
          onPageChange: setCurrentPage
        }
      })}
      useFilters={() => filters}
      useSheets={() => ({
        ...sheets,
        getSheetProps: (sheetName: string) => {
          const sheetState = sheets.getSheetProps(sheetName as 'disputeDetails' | 'disputeResponse' | 'disputeEvidence')
          return {
            isOpen: sheetState.open,
            onClose: () => sheetState.onOpenChange(false)
          }
        }
      })}
      useSelection={useSelectionHook}
      usePageSize={() => pageSizeSelector}
      animationKey={filters.statusFilter}
    />
  )
}

export default DisputesListPage