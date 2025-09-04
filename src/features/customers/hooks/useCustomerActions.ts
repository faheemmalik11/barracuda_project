import { useCallback } from 'react'
import { toast } from 'sonner'
import { copyEntityId, createBatchActions } from '@shared/utils/formatters'
import type { Customer } from '@shared/types/customers'
import type { UseActionsHook } from '@shared/components/EntityListPage/types'

export function useCustomerActions(openCreateCustomer?: () => void): UseActionsHook {
  const batchActions = createBatchActions('customer')

  const handleViewCustomer = useCallback((...args: unknown[]) => {
    const customerId = args[0] as string
    toast.info(`Customer detail view not implemented yet for ${customerId}`)
  }, [])

  const handleCopyCustomerId = useCallback((...args: unknown[]) => {
    const customerId = args[0] as string
    copyEntityId(customerId, 'Customer')
  }, [])

  const handleBlockCustomer = useCallback((...args: unknown[]) => {
    const customer = args[0] as Customer
    toast.success(`Customer ${customer.name} has been blocked`)
  }, [])

  const handleFlag = useCallback((...args: unknown[]) => {
    const customer = args[0] as Customer
    toast.info(`Customer ${customer.name} has been flagged for review`)
  }, [])

  const handleAddNote = useCallback((...args: unknown[]) => {
    const customer = args[0] as Customer
    toast.info(`Add note dialog for ${customer.name} would open here`)
  }, [])

  const handleBatchFlag = useCallback((...args: unknown[]) => {
    const selectedIds = args[0] as string[]
    batchActions.handleBatchFlag(selectedIds)
  }, [batchActions])

  const handleBatchExport = useCallback((...args: unknown[]) => {
    const selectedIds = args[0] as string[]
    batchActions.handleBatchExport(selectedIds)
  }, [batchActions])

  const handleBatchBlock = useCallback((...args: unknown[]) => {
    const selectedIds = args[0] as string[]
    batchActions.handleBatchUpdate(selectedIds, 'blocked')
  }, [batchActions])

  const handleCreateCustomer = useCallback(() => {
    if (openCreateCustomer) {
      openCreateCustomer()
    } else {
      toast.info('Create customer functionality will open here')
    }
  }, [openCreateCustomer])

  return {
    handleViewCustomer,
    handleCopyCustomerId,
    handleBlockCustomer,
    handleFlag,
    handleAddNote,
    handleBatchFlag,
    handleBatchExport,
    handleBatchBlock,
    handleCreateCustomer
  }
}
