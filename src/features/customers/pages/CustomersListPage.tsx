import { Plus } from 'lucide-react'
import { EntityListPageWithPanel } from '@shared/components/panels/generic/EntityListPageWithPanel'
import { CustomerDetailsPanel } from '@shared/components/panels/customers'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { CustomerTable } from '@shared/components/tables/CustomerTable'
import CreateCustomerSheet from '../components/CreateCustomerSheet'
import { 
  useCustomerFilters, 
  useCustomerActions,
  useCustomerSheets
} from '../hooks'
import { useEntitySelection } from '@shared/hooks/useEntitySelection'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'
import { customersService } from '@shared/services'
import type { Customer } from '@shared/types/customers'

export function CustomersListPage() {
  const pageSizeSelector = usePageSizeSelector()
  const filters = useCustomerFilters()
  const sheets = useCustomerSheets()
  const actions = useCustomerActions(sheets.openCreateCustomer)
  const selection = useEntitySelection({
    batchActions: {
      flag: actions.handleBatchFlag,
      export: actions.handleBatchExport,
      block: actions.handleBatchBlock
    }
  })

  const pageConfig = {
    header: {
      title: "Customers",
      description: "Manage and monitor your customers",
      primaryAction: {
        label: "Create Customer",
        icon: <Plus className="h-4 w-4" />,
        onClick: actions.handleCreateCustomer
      }
    },
    
    statusFilters: StatusRegistry.getFilters('customer'),
    
    table: {
      component: CustomerTable,
      props: {
        onViewProfile: actions.handleViewCustomer,
        onFlag: actions.handleFlag,
        onAddNote: actions.handleAddNote,
        onCopyId: actions.handleCopyCustomerId
      }
    },
    
    tableFilters: {
      component: EntityTableFilters,
      props: { 
        entity: "customers",
        onBulkAction: selection.handleBulkAction
      }
    }
  }

  return (
    <>
      <EntityListPageWithPanel<Customer>
        fetchData={customersService.getCustomersForNavigation}
        pageConfig={pageConfig}
        useFilters={() => filters}
        useSelection={() => selection}
        usePageSize={() => pageSizeSelector}
        animationKey={filters.statusFilter}
        basePath="/customers"
        renderPanel={(props) => (
          <CustomerDetailsPanel
            open={props.open}
            onOpenChange={props.onOpenChange}
            customer={props.entity}
            onBack={props.onBack}
            onOpenFullDetails={props.onOpenFullDetails}
            totalItems={props.totalItems}
            navigatePrevious={props.navigatePrevious}
            navigateNext={props.navigateNext}
            canNavigatePrevious={props.canNavigatePrevious}
            canNavigateNext={props.canNavigateNext}
          />
        )}
      />
      
      {/* Create Customer Sheet */}
      <CreateCustomerSheet
        {...sheets.getSheetProps('createCustomer')}
      />
    </>
  )
}

export default CustomersListPage
