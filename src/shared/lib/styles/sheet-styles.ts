export const SHEET_DRAG_STYLES = {
  base: "flex items-center justify-between p-3 transition-all duration-200 ease-in-out rounded-md border",
  dragging: "opacity-50 scale-95 border-transparent",
  dragOver: "bg-accent border-primary shadow-lg",
  required: "bg-blue-50 border-blue-200 hover:border-blue-300",
  optional: "border-transparent hover:bg-muted hover:border-border"
} as const

export const SHEET_BUTTON_STYLES = {
  action: "text-xs h-8 px-3 border-border",
  toggle: "h-6 w-6 p-0 shrink-0 hover:bg-primary/10 hover:border-primary hover:text-primary",
  clear: "absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
} as const

export const GPU_ACCELERATION_STYLES = {
  // Standard GPU acceleration for smooth transforms and scrolling
  base: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  } as const,
  
  // Scrollable areas optimization
  scrollable: {
    transform: 'translateZ(0)',
    willChange: 'scroll-position',
    contain: 'paint'
  } as const,
  
  // Full containment for complex layouts
  container: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    contain: 'layout style paint'
  } as const,
  
  // Paint containment for animations
  animated: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    contain: 'paint'
  } as const
} as const