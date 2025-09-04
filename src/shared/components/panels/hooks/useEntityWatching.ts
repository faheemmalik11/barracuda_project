import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export function useEntityWatching(entityType: string) {
  const [isWatching, setIsWatching] = useState(false)
  
  const handleWatchToggle = useCallback(() => {
    setIsWatching(!isWatching)
    toast.success(
      isWatching 
        ? `Stopped watching ${entityType}` 
        : `Now watching ${entityType} for updates`
    )
  }, [isWatching, entityType])
  
  return { isWatching, handleWatchToggle }
}