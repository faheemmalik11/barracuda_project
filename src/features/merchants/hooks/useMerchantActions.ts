import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { copyEntityId, createBatchActions } from '@shared/utils/formatters'
import type { Merchant } from '../types/merchants.types'
import type { UseActionsHook } from '@shared/components/EntityListPage/types'

export function useMerchantActions(): UseActionsHook {
  const navigate = useNavigate()
  const batchActions = createBatchActions('merchant')

  const handleViewMerchant = useCallback((merchant: Merchant) => {
    navigate(`/merchants/${merchant.id}`)
  }, [navigate])

  const handleCopyMerchantId = useCallback(async (merchant: Merchant) => {
    await copyEntityId(merchant.id, 'Merchant')
  }, [])

  const handleBatchFlag = useCallback(batchActions.handleBatchFlag, [batchActions])

  const handleBatchExport = useCallback(batchActions.handleBatchExport, [batchActions])

  const handleBatchUpdateStatus = useCallback((selectedIds: string[]) => {
    batchActions.handleBatchUpdate(selectedIds, 'status updated')
  }, [batchActions])

  const handleBatchUpdateCapabilities = useCallback((selectedIds: string[]) => {
    batchActions.handleBatchUpdate(selectedIds, 'capabilities updated')
  }, [batchActions])

  return {
    handleViewMerchant,
    handleCopyMerchantId,
    handleBatchFlag,
    handleBatchExport,
    handleBatchUpdateStatus,
    handleBatchUpdateCapabilities,
  }
} 
