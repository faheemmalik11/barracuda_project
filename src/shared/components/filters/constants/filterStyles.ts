/**
 * Filter Component Style Constants
 * Standardized styling values for filter components
 */

// Core styling constants
export const FILTER_STYLES = {
  // Dimensions
  HEIGHT_SM: "h-8",
  MAX_HEIGHT: "max-h-40",
  
  // Spacing
  CONTAINER_SPACING: "p-3 space-y-3",
  ITEM_SPACING: "px-3 py-2",
  
  // Colors & States
  TEXT_MUTED: "text-muted-foreground",
  TEXT_FOREGROUND: "text-foreground",
  BORDER_DEFAULT: "border-border",
  
  // Interactive states
  HOVER_ACCENT: "hover:bg-accent/50",
  SELECTED_BG: "bg-primary/10 hover:bg-primary/15",
  TRANSITION: "transition-colors",
  
  // Focus ring
  FOCUS_RING: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  
  // Icons
  ICON_SM: "h-3 w-3",
  ICON_MD: "h-4 w-4",
} as const

// Component-specific combinations
export const FILTER_COMPONENT_STYLES = {
  // Apply button
  APPLY_BUTTON: "w-full h-8",
  
  // Filter header
  FILTER_HEADER: "flex items-center justify-between",
  FILTER_TITLE: "text-sm font-medium",
  
  // Scrollable container
  SCROLLABLE_CONTAINER: "max-h-40 overflow-y-auto border border-border rounded",
  
  // Separator
  SEPARATOR: "border-t border-border pt-2",
  
  // Option item
  OPTION_ITEM: "flex items-center px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors text-sm",
} as const

// Accessibility constants
export const FILTER_ACCESSIBILITY = {
  CLEAR_ARIA_LABEL: "Clear filter",
  APPLY_ARIA_LABEL: "Apply filter",
  NO_RESULTS_TEXT: "No results found",
} as const 
