import { useCallback } from 'react'

interface UseEntityNavigationProps {
  totalItems?: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
  onBack?: () => void
  onOpenFullDetails?: () => void
}

export function useEntityNavigation({
  totalItems = 0,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious = false,
  canNavigateNext = false,
  onBack,
  onOpenFullDetails
}: UseEntityNavigationProps) {
  
  const handlePrevious = useCallback(() => {
    if (canNavigatePrevious && navigatePrevious) {
      navigatePrevious()
    }
  }, [canNavigatePrevious, navigatePrevious])
  
  const handleNext = useCallback(() => {
    if (canNavigateNext && navigateNext) {
      navigateNext()
    }
  }, [canNavigateNext, navigateNext])
  
  const handleBack = useCallback(() => {
    if (onBack) {
      onBack()
    }
  }, [onBack])
  
  const handleOpenFullDetails = useCallback(() => {
    if (onOpenFullDetails) {
      onOpenFullDetails()
    }
  }, [onOpenFullDetails])
  
  return {
    navigation: {
      totalItems,
      canGoPrevious: canNavigatePrevious,
      canGoNext: canNavigateNext,
      goToPrevious: handlePrevious,
      goToNext: handleNext,
      back: handleBack,
      openFullDetails: handleOpenFullDetails
    },
    hasNavigation: Boolean(navigatePrevious || navigateNext || onBack),
    isFirstItem: !canNavigatePrevious,
    isLastItem: !canNavigateNext
  }
}
