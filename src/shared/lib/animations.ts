/**
 * Shared animation configurations for consistent UI transitions
 */

// Table-specific animation configurations
export const TABLE_ANIMATIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  }
} as const

// Panel-specific animation configurations
export const PANEL_ANIMATIONS = {
  slideIn: {
    initial: { x: '100%', opacity: 0, scale: 0.95 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: '100%', opacity: 0, scale: 0.98 },
    transition: { 
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.25 },
      scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  }
} as const

// Animation duration in milliseconds for cleanup timers
export const ANIMATION_CLEANUP_MS = 300
