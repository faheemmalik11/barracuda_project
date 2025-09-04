export const STICKY_SHADOW_FILTERS = {
  large: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.06)) drop-shadow(-1px 0 2px rgba(0,0,0,0.04))',
  none: 'none'
} as const

export const STICKY_SHADOW_CLASSES = {
  lg: "[filter:drop-shadow(-2px_0_4px_rgba(0,0,0,0.06))_drop-shadow(-1px_0_2px_rgba(0,0,0,0.04))] [-webkit-filter:drop-shadow(-2px_0_4px_rgba(0,0,0,0.06))_drop-shadow(-1px_0_2px_rgba(0,0,0,0.04))]",
  none: "[filter:none] [-webkit-filter:none]"
} as const

export const SCROLL_CONFIG = {
  threshold: 4,
  tolerance: 1,
  fallbackInterval: 100
} as const


export const STICKY_SELECTORS = {
  scrollContainer: '.overflow-x-auto',
  stickyCell: '[data-sticky-action="true"]'
} as const