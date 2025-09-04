import { useMemo, useCallback } from "react"

interface UseDataTableSelectionProps<T> {
  paginatedData: T[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  getItemId: (item: T) => string | number
  unavailableItems: string[]
  getItemStatus?: (item: T) => string
  allowedStatuses?: string[]
}

interface UseDataTableSelectionReturn {
  toggleItemSelection: (itemId: string) => void
  toggleAllSelection: () => void
  selectSucceededOnly: () => void
  isAllCurrentPageSelected: boolean
  selectionState: {
    isAllSelected: boolean
    isIndeterminate: boolean
  }
}

export const useDataTableSelection = <T>({
  paginatedData,
  selectedItems,
  onSelectionChange,
  getItemId,
  unavailableItems,
  getItemStatus,
  allowedStatuses = [],
}: UseDataTableSelectionProps<T>): UseDataTableSelectionReturn => {
  const currentPageIds = useMemo(
    () => paginatedData.map(item => String(getItemId(item))),
    [paginatedData, getItemId]
  )

  const availableCurrentPageIds = useMemo(() => {
    return currentPageIds.filter(id => {
      if (unavailableItems.includes(id)) return false
      
      if (getItemStatus && allowedStatuses.length > 0) {
        const item = paginatedData.find(item => String(getItemId(item)) === id)
        if (item) {
          const status = getItemStatus(item)
          return allowedStatuses.includes(status)
        }
      }
      
      return true
    })
  }, [currentPageIds, unavailableItems, paginatedData, getItemId, getItemStatus, allowedStatuses])

  const isAllCurrentPageSelected = useMemo(() => {
    if (availableCurrentPageIds.length === 0) return false
    return availableCurrentPageIds.every(id => selectedItems.includes(id))
  }, [availableCurrentPageIds, selectedItems])

  const selectionState = useMemo(() => {
    if (availableCurrentPageIds.length === 0) {
      return { isAllSelected: false, isIndeterminate: false }
    }
    
    const selectedCount = availableCurrentPageIds.filter(id => selectedItems.includes(id)).length
    const totalCount = availableCurrentPageIds.length

    return {
      isAllSelected: selectedCount === totalCount,
      isIndeterminate: selectedCount > 0 && selectedCount < totalCount,
    }
  }, [availableCurrentPageIds, selectedItems])

  const toggleItemSelection = useCallback((itemId: string) => {
    if (unavailableItems.includes(itemId)) return
    
    if (getItemStatus && allowedStatuses.length > 0) {
      const item = paginatedData.find(item => String(getItemId(item)) === itemId)
      if (item) {
        const status = getItemStatus(item)
        if (!allowedStatuses.includes(status)) return
      }
    }

    const isSelected = selectedItems.includes(itemId)
    const newSelectedItems = isSelected
      ? selectedItems.filter((id: string) => id !== itemId)
      : [...selectedItems, itemId]
    onSelectionChange(newSelectedItems)
  }, [selectedItems, onSelectionChange, unavailableItems, paginatedData, getItemId, getItemStatus, allowedStatuses])

  const toggleAllSelection = useCallback(() => {
    const newSelection = isAllCurrentPageSelected
      ? selectedItems.filter((id: string) => !currentPageIds.includes(id))
      : Array.from(new Set([...selectedItems, ...availableCurrentPageIds]))

    onSelectionChange(newSelection)
  }, [
    isAllCurrentPageSelected,
    currentPageIds,
    availableCurrentPageIds,
    selectedItems,
    onSelectionChange,
  ])

  const selectSucceededOnly = useCallback(() => {
    if (!getItemStatus || allowedStatuses.length === 0) return
    
    const succeededIds = paginatedData
      .filter(item => {
        const itemId = String(getItemId(item))
        if (unavailableItems.includes(itemId)) return false
        const status = getItemStatus(item)
        return allowedStatuses.includes(status)
      })
      .map(item => String(getItemId(item)))

    const newSelection = Array.from(new Set([
      ...selectedItems.filter(id => !currentPageIds.includes(id)), 
      ...succeededIds
    ]))
    onSelectionChange(newSelection)
  }, [paginatedData, getItemStatus, allowedStatuses, getItemId, unavailableItems, selectedItems, currentPageIds, onSelectionChange])

  return {
    toggleItemSelection,
    toggleAllSelection,
    selectSucceededOnly,
    isAllCurrentPageSelected,
    selectionState,
  }
}
