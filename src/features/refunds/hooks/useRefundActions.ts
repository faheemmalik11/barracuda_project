import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { copyEntityId } from '@shared/utils/formatters'
import { refundsService } from '@shared/services'
import type { Refund } from '@shared/types/refunds'

export interface UseRefundActionsReturn {
  handleProcessRefund: (refund: Refund) => void
  handleCancelRefund: (refund: Refund) => void
  handleRetryRefund: (refund: Refund) => void
  handleViewRefund: (refund: Refund) => void
  handleViewPayment: (refund: Refund) => void
  handleViewCustomer: (refund: Refund) => void
  handleAddNote: (refund: Refund) => void
  handleFlag: (refund: Refund) => void
  handleBatchCancel: (selectedIds: string[]) => void
  handleBatchExport: (selectedIds: string[]) => void
  navigateToCreateRefund: () => void
  copyRefundId: (refund: Refund) => void
}

export function useRefundActions(): UseRefundActionsReturn {
  const navigate = useNavigate()

  const handleProcessRefund = useCallback(async (refund: Refund) => {
    try {
      await refundsService.processRefund(refund.id)
      toast.success(`Refund ${refund.id} processed successfully!`)
    } catch (error) {
      toast.error(`Failed to process refund ${refund.id}`)
    }
  }, [])

  const handleCancelRefund = useCallback(async (refund: Refund) => {
    try {
      await refundsService.cancelRefund(refund.id)
      toast.success(`Refund ${refund.id} canceled successfully!`)
    } catch (error) {
      toast.error(`Failed to cancel refund ${refund.id}`)
    }
  }, [])

  const handleRetryRefund = useCallback(async (refund: Refund) => {
    try {
      await refundsService.retryRefund(refund.id)
      toast.success(`Refund ${refund.id} retry initiated!`)
    } catch (error) {
      toast.error(`Failed to retry refund ${refund.id}`)
    }
  }, [])

  const handleViewRefund = useCallback((refund: Refund) => {
    navigate(`/refunds/${refund.id}`)
  }, [navigate])

  const handleViewPayment = useCallback((refund: Refund) => {
    navigate(`/payments/${refund.paymentId}`)
  }, [navigate])

  const handleViewCustomer = useCallback((refund: Refund) => {
    // TODO: Implement navigation to customer details once customer ID is available from payment
    toast.info(`View customer for refund ${refund.id}`)
  }, [])

  const handleAddNote = useCallback((refund: Refund) => {
    // TODO: Implement add note functionality with modal/dialog
    toast.info(`Add note for refund ${refund.id}`)
  }, [])

  const handleFlag = useCallback((refund: Refund) => {
    // TODO: Implement flag for review API call
    toast.success(`Refund ${refund.id} flagged for review`)
  }, [])

  const handleBatchCancel = useCallback(async (selectedIds: string[]) => {
    try {
      const promises = selectedIds.map(id => refundsService.cancelRefund(id))
      await Promise.all(promises)
      toast.success(`${selectedIds.length} refunds canceled successfully`)
    } catch (error) {
      toast.error('Failed to cancel selected refunds')
    }
  }, [])

  const handleBatchExport = useCallback(async (selectedIds: string[]) => {
    try {
      const result = await refundsService.exportRefunds(selectedIds)
      if (result.success) {
        toast.success(`Exporting ${selectedIds.length} refunds`)
      }
    } catch (error) {
      toast.error('Failed to export selected refunds')
    }
  }, [])

  const navigateToCreateRefund = useCallback(() => {
    navigate('/refunds/create')
  }, [navigate])

  const copyRefundId = useCallback((refund: Refund) => {
    copyEntityId(refund.id, 'Refund')
  }, [])

  return {
    handleProcessRefund,
    handleCancelRefund,
    handleRetryRefund,
    handleViewRefund,
    handleViewPayment,
    handleViewCustomer,
    handleAddNote,
    handleFlag,
    handleBatchCancel,
    handleBatchExport,
    navigateToCreateRefund,
    copyRefundId
  }
}
