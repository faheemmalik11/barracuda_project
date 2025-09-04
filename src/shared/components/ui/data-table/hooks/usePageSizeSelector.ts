import { useState, useCallback } from "react"
import { UserPreferencesManager } from "../../../../utils/UserPreferencesManager"

export function usePageSizeSelector(defaultPageSize = 20) {
  const [pageSize, setPageSizeState] = useState<number>(() => 
    UserPreferencesManager.getPageSize() || defaultPageSize
  )

  const setPageSize = useCallback((newSize: number) => {
    setPageSizeState(newSize)
    UserPreferencesManager.setPageSize(newSize)
  }, [])

  return {
    pageSize,
    setPageSize,
    availablePageSizes: [10, 20, 30, 40, 50]
  }
} 
