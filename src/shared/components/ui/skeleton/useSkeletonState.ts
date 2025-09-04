import React from "react"

// Hook for managing skeleton loading states
export const useSkeletonState = (initialLoading = false) => {
  const [loading, setLoading] = React.useState(initialLoading)

  const startLoading = React.useCallback(() => {
    setLoading(true)
  }, [])

  const stopLoading = React.useCallback(() => {
    setLoading(false)
  }, [])

  const toggleLoading = React.useCallback(() => {
    setLoading(prev => !prev)
  }, [])

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading,
  }
} 
