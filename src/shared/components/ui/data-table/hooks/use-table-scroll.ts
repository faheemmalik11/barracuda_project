import { useLayoutEffect, useState, useCallback, RefObject, useRef, useEffect } from "react"
import { useStickyShadowFallback } from "./use-sticky-shadow-fallback"
import { SCROLL_CONFIG } from "../constants"

interface StickyColumnState {
  showRightShadow: boolean
  hasHorizontalScroll: boolean
}

const MAX_INIT_ATTEMPTS = 5
const INIT_DELAYS = [0, 50, 100, 200, 500, 1000, 2000] as const

export function useTableScroll(scrollRef: RefObject<HTMLElement>): StickyColumnState {
  const [state, setState] = useState<StickyColumnState>({
    showRightShadow: false,
    hasHorizontalScroll: false,
  })
  const lastScrollLeft = useRef(-1)
  const rafId = useRef<number | null>(null)
  const isInitialized = useRef(false)
  
  // Use dedicated fallback hook
  useStickyShadowFallback()

  const calculateState = useCallback((container: HTMLElement): StickyColumnState => {
    const { scrollWidth, clientWidth, scrollLeft } = container
    
    if (scrollWidth <= 0 || clientWidth <= 0) {
      return { showRightShadow: false, hasHorizontalScroll: false }
    }
    
    const hasScroll = scrollWidth > clientWidth + SCROLL_CONFIG.tolerance
    
    if (!hasScroll) {
      return { showRightShadow: false, hasHorizontalScroll: false }
    }

    const maxScroll = Math.max(0, scrollWidth - clientWidth)
    const isAtEnd = scrollLeft >= maxScroll - SCROLL_CONFIG.threshold

    return {
      showRightShadow: !isAtEnd,
      hasHorizontalScroll: true,
    }
  }, [])

  const updateState = useCallback((forceUpdate = false) => {
    const container = scrollRef.current
    if (!container) return

    const currentScrollLeft = container.scrollLeft
    
    if (!forceUpdate && Math.abs(currentScrollLeft - lastScrollLeft.current) < 0.5) {
      return
    }

    lastScrollLeft.current = currentScrollLeft
    const newState = calculateState(container)

    setState(prevState => {
      const hasChanged = 
        prevState.showRightShadow !== newState.showRightShadow ||
        prevState.hasHorizontalScroll !== newState.hasHorizontalScroll

      return hasChanged ? newState : prevState
    })
  }, [scrollRef, calculateState])

  const handleScroll = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => updateState(false))
  }, [updateState])

  const handleResize = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      lastScrollLeft.current = -1
      updateState(true)
    })
  }, [updateState])

  const initializeState = useCallback((attempt = 0) => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    
    const doInitialize = () => {
      const container = scrollRef.current
      if (!container) {
        if (attempt < MAX_INIT_ATTEMPTS) {
          setTimeout(() => initializeState(attempt + 1), 50 * (attempt + 1))
        }
        return
      }

      const { scrollWidth, clientWidth } = container
      if (scrollWidth === 0 || clientWidth === 0) {
        if (attempt < MAX_INIT_ATTEMPTS) {
          setTimeout(() => initializeState(attempt + 1), 50 * (attempt + 1))
        }
        return
      }

      lastScrollLeft.current = -1
      updateState(true)
      isInitialized.current = true
    }

    rafId.current = requestAnimationFrame(doInitialize)
  }, [updateState, scrollRef])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isInitialized.current) {
        setTimeout(() => initializeState(0), 100)
      }
    }

    const handlePageShow = () => {
      setTimeout(() => initializeState(0), 100)
    }

    const handleFocus = () => {
      if (isInitialized.current) {
        setTimeout(() => initializeState(0), 50)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("pageshow", handlePageShow)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("pageshow", handlePageShow)
      window.removeEventListener("focus", handleFocus)
    }
  }, [initializeState])

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout
    let mounted = true
    
    const setupScrollTracking = () => {
      const container = scrollRef.current
      if (!container) {
        if (mounted) {
          timeoutId = setTimeout(setupScrollTracking, 50)
        }
        return
      }

      const resizeObserver = new ResizeObserver(() => {
        handleResize()
        setTimeout(() => initializeState(0), 100)
      })
      
      const mutationObserver = new MutationObserver(() => {
        setTimeout(() => initializeState(0), 50)
      })
      
      resizeObserver.observe(container)
      container.addEventListener("scroll", handleScroll, { passive: true })
      
      mutationObserver.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      })

      // Initialize with multiple attempts for reliability
      INIT_DELAYS.forEach(delay => {
        setTimeout(() => {
          if (mounted) initializeState(0)
        }, delay)
      })

      // Immediate calculation
      requestAnimationFrame(() => {
        if (mounted && container) {
          const state = calculateState(container)
          setState(state)
        }
      })

      return () => {
        if (rafId.current) cancelAnimationFrame(rafId.current)
        resizeObserver.disconnect()
        mutationObserver.disconnect()
        container.removeEventListener("scroll", handleScroll)
      }
    }

    const cleanup = setupScrollTracking()

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
      if (cleanup) cleanup()
    }
  }, [handleScroll, handleResize, initializeState, scrollRef, calculateState])

  return state
}
