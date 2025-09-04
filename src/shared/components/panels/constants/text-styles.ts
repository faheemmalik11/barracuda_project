/**
 * Centralized text styles for consistency across all panel components
 * These styles ensure consistent typography and spacing throughout the panel UI system
 */
export const PANEL_TEXT_STYLES = {
  // Headers & Titles
  sectionTitle: 'text-base font-semibold text-card-foreground leading-6',
  subsectionTitle: 'text-sm font-medium text-foreground leading-5',
  cardTitle: 'text-lg font-semibold text-foreground',
  
  // Labels & Values
  label: 'text-muted-foreground text-xs leading-4',
  value: 'text-foreground text-xs font-normal leading-4',
  largeValue: 'text-sm text-foreground',
  cardValue: 'text-sm font-medium text-foreground',
  mutedValue: 'text-muted-foreground text-xs opacity-70',
  
  // Descriptions
  description: 'text-sm text-muted-foreground',
  
  // Interactive Elements
  link: 'text-xs text-primary hover:underline cursor-pointer',
  
  // Status & Badges
  badge: 'text-xs font-medium',
  status: 'text-xs font-normal'
} as const;

/**
 * Type for accessing text styles with intellisense
 */
export type PanelTextStyles = typeof PANEL_TEXT_STYLES;

