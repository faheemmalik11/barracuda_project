import { useEffect } from 'react'
import { STICKY_SHADOW_FILTERS, SCROLL_CONFIG, STICKY_SELECTORS } from '../constants'

const fallbackState = {
  activeInstances: 0,
  interval: null as NodeJS.Timeout | null
}

const applyStickyFallback = () => {
  const containers = document.querySelectorAll(STICKY_SELECTORS.scrollContainer)
  
  containers.forEach(container => {
    const stickyCells = container.querySelectorAll(STICKY_SELECTORS.stickyCell)
    if (stickyCells.length === 0) return

    const { scrollWidth, clientWidth, scrollLeft } = container as HTMLElement
    
    if (scrollWidth <= clientWidth) {
      stickyCells.forEach(cell => {
        const htmlCell = cell as HTMLElement
        htmlCell.style.filter = STICKY_SHADOW_FILTERS.none
        htmlCell.style.webkitFilter = STICKY_SHADOW_FILTERS.none
        htmlCell.style.transform = 'translate3d(0, 0, 0)'
      })
      return
    }

    const maxScroll = Math.max(0, scrollWidth - clientWidth)
    const isAtEnd = scrollLeft >= maxScroll - SCROLL_CONFIG.threshold
    const shouldShow = !isAtEnd

    stickyCells.forEach(cell => {
      const htmlCell = cell as HTMLElement
      if (shouldShow) {
        htmlCell.style.filter = STICKY_SHADOW_FILTERS.large
        htmlCell.style.webkitFilter = STICKY_SHADOW_FILTERS.large
        htmlCell.style.transform = 'translate3d(0, 0, 0)'
        htmlCell.style.willChange = 'filter, transform'
      } else {
        htmlCell.style.filter = STICKY_SHADOW_FILTERS.none
        htmlCell.style.webkitFilter = STICKY_SHADOW_FILTERS.none
        htmlCell.style.transform = 'translate3d(0, 0, 0)'
        htmlCell.style.willChange = 'auto'
      }
    })
  })
}

const startFallback = () => {
  if (fallbackState.interval) return
  fallbackState.interval = setInterval(applyStickyFallback, SCROLL_CONFIG.fallbackInterval)
}

const stopFallback = () => {
  if (fallbackState.interval) {
    clearInterval(fallbackState.interval)
    fallbackState.interval = null
  }
}

export const useStickyShadowFallback = () => {
  useEffect(() => {
    fallbackState.activeInstances++
    
    if (fallbackState.activeInstances === 1) {
      startFallback()
      applyStickyFallback()
    }
    
    return () => {
      fallbackState.activeInstances--
      
      if (fallbackState.activeInstances === 0) {
        stopFallback()
      }
    }
  }, [])
}