import { Plus } from 'lucide-react'
import { PaymentTable } from '@shared/components/tables/PaymentTable'
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { PaymentDetailsPanel } from '@shared/components/panels'
import { EntityListPageWithPanel } from '@shared/components/panels/generic/EntityListPageWithPanel'
import { 
  usePaymentFilters, 
  usePaymentActions
} from '../hooks'
import { paymentsService } from '@shared/services'
import type { Payment } from '../types/payments.types'
import { useEntitySelection } from '@shared/hooks/useEntitySelection'
import { usePageSizeSelector } from '@shared/components/ui/data-table'
import { StatusRegistry } from '@shared/lib/filters/status-registry'

export function PaymentsListPage() {
  const filters = usePaymentFilters()
  const actions = usePaymentActions()
  const pageSizeSelector = usePageSizeSelector()
  const selection = useEntitySelection({
    batchActions: {
      cancel: actions.handleBatchCancel,
      flag: actions.handleBatchFlag,
      export: actions.handleBatchExport
    }
  })
  
  const pageConfig = {
    header: {
      title: 'Payments',
      description: 'Manage and track all your payment transactions',
      primaryAction: {
        label: 'Create Payment',
        icon: <Plus className="h-4 w-4" />,
        onClick: actions.navigateToCreatePayment
      }
    },
    
    statusFilters: StatusRegistry.getFilters('payment'),
    
    table: {
      component: PaymentTable,
      props: {
        onCapture: actions.handleCapture,
        onCancel: actions.handleCancel,
        onRetry: actions.handleRetry,
        onCopyId: actions.copyPaymentId,
        onViewCustomer: actions.handleViewCustomer,
        onSendReceipt: actions.handleSendReceipt,
        onFlag: actions.handleFlag,
        onAddNote: actions.handleAddNote,
        onRefund: actions.handleRefund
      }
    },
    
    tableFilters: {
      component: EntityTableFilters,
      props: {
        entity: "payments",
        onBulkAction: selection.handleBulkAction
      }
    }
  }

  return (
    <EntityListPageWithPanel<Payment>
      fetchData={paymentsService.getPaymentsForNavigation}
      pageConfig={pageConfig}
      useFilters={() => filters}
      useSelection={() => selection}
      usePageSize={() => pageSizeSelector}
      animationKey={filters.statusFilter}
      fetchEntityDetails={paymentsService.getSingleTransaction}
      basePath="/payments"
      renderPanel={(props) => (
        <PaymentDetailsPanel
          open={props.open}
          onOpenChange={props.onOpenChange}
          payment={props.entity}
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
  )
}

export default PaymentsListPage
