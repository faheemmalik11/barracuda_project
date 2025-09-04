/**
 * Filter button types and constants for consistent UI behavior
 */

export type FilterVariant = 'default' | 'compact'
export type FilterButtonState = 'inactive' | 'active' | 'open'

export interface FilterButtonVariantConfig {
  button: string
  gap: string
  clearIcon: string
  clearIconInner: string
  chevron: string
  textWidth: string
  dropdown: string
}

export const FILTER_BUTTON_CONSTANTS = {
  ANIMATION_DURATION: "duration-200",
  CLEAR_ANIMATION_DURATION: "duration-150",
  DROPDOWN_SIDE_OFFSET: 3,
  DROPDOWN_ALIGN: "start" as const,
} as const

export const getAccessibilityLabels = (isAdditionalFilter: boolean) => ({
  ariaLabel: isAdditionalFilter ? "Remove additional filter" : "Clear filter",
  title: isAdditionalFilter ? "Remove additional filter" : "Clear filter",
}) as const 
