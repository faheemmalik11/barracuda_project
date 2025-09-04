import { useEffect } from 'react'

interface UseScrollToActiveRowOptions {
  activeItemId?: string
  disabled?: boolean
}

const smoothScrollTo = (container: HTMLElement, targetY: number) => {
  const startY = container.scrollTop
  const distance = targetY - startY
  const duration = 500
  let startTime: number | null = null

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const progress = Math.min((currentTime - startTime) / duration, 1)
    const easeProgress = progress * (2 - progress) // Simple ease-out
    
    container.scrollTop = startY + distance * easeProgress
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

export const useScrollToActiveRow = ({
  activeItemId,
  disabled = false
}: UseScrollToActiveRowOptions) => {
  useEffect(() => {
    if (disabled || !activeItemId) return

    setTimeout(() => {
      const activeRow = document.querySelector(`[data-row-id="${activeItemId}"]`)
      if (!activeRow) return

      const scrollContainer = activeRow.closest('.overflow-auto, .overflow-y-auto') as HTMLElement
      if (!scrollContainer) return

      const containerRect = scrollContainer.getBoundingClientRect()
      const rowRect = activeRow.getBoundingClientRect()
      
      const isVisible = rowRect.top >= containerRect.top + 80 && 
                       rowRect.bottom <= containerRect.bottom - 80

      if (!isVisible) {
        const relativeTop = rowRect.top - containerRect.top
        const targetY = scrollContainer.scrollTop + relativeTop - containerRect.height / 2 + rowRect.height / 2
        smoothScrollTo(scrollContainer, targetY)
      }
    }, 100)
  }, [activeItemId, disabled])
}
