import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { copyEntityId, createBatchActions } from '@shared/utils/formatters'
import type { Payment } from '@shared/types/payment.types'

export interface UsePaymentActionsReturn {
  handleCapture: (payment: Payment) => void
  handleCancel: (payment: Payment) => void  
  handleRetry: (payment: Payment) => void
  handleViewCustomer: (payment: Payment) => void
  handleSendReceipt: (payment: Payment) => void
  handleFlag: (payment: Payment) => void
  handleAddNote: (payment: Payment) => void
  handleRefund: (payment: Payment) => void
  handleBatchCancel: (selectedIds: string[]) => void
  handleBatchFlag: (selectedIds: string[]) => void
  handleBatchExport: (selectedIds: string[]) => void
  navigateToCreatePayment: () => void
  copyPaymentId: (payment: Payment) => void
  [key: string]: ((...args: any[]) => void) | (() => void)
}

export function usePaymentActions(): UsePaymentActionsReturn {
  const navigate = useNavigate()
  const batchActions = createBatchActions('payment')

  const handleCapture = useCallback((payment: Payment) => {
    toast.success(`Payment ${payment.id} captured successfully!`)
  }, [])

  const handleCancel = useCallback((payment: Payment) => {
    toast.success(`Payment ${payment.id} canceled successfully!`)
  }, [])

  const handleRetry = useCallback((payment: Payment) => {
    toast.success(`Payment ${payment.id} retry initiated!`)
  }, [])

  const handleBatchCancel = useCallback((selectedIds: string[]) => {
    batchActions.handleBatchUpdate(selectedIds, 'canceled')
  }, [batchActions])

  const handleBatchFlag = useCallback(batchActions.handleBatchFlag, [batchActions])

  const handleBatchExport = useCallback(batchActions.handleBatchExport, [batchActions])

  const navigateToCreatePayment = useCallback(() => {
    navigate('/payments/create')
  }, [navigate])

  const copyPaymentId = useCallback((payment: Payment) => {
    copyEntityId(payment.id, 'Payment')
  }, [])

  const handleViewCustomer = useCallback((payment: Payment) => {
    navigate(`/customers/${payment.customer.id}`)
  }, [navigate])

  const handleSendReceipt = useCallback((payment: Payment) => {
    toast.success(`Receipt sent for payment ${payment.id}`)
  }, [])

  const handleFlag = useCallback((payment: Payment) => {
    toast.success(`Payment ${payment.id} flagged for review`)
  }, [])

  const handleAddNote = useCallback((payment: Payment) => {
    toast.info(`Add note for payment ${payment.id}`)
  }, [])

  const handleRefund = useCallback((payment: Payment) => {
    navigate(`/payments/${payment.id}/refund`)
  }, [navigate])

  return {
    handleCapture,
    handleCancel,
    handleRetry,
    handleViewCustomer,
    handleSendReceipt,
    handleFlag,
    handleAddNote,
    handleRefund,
    handleBatchCancel,
    handleBatchFlag,
    handleBatchExport,
    navigateToCreatePayment,
    copyPaymentId
  }
} 
