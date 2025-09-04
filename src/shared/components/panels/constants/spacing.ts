/**
 * Centralized spacing constants for all panel components
 */
export const PANEL_SPACING = {
  SECTION_CONTENT_GAP: 'gap-3',
  SECTION_BOTTOM_MARGIN: 'mb-2',
  DETAIL_ROW_PADDING: 'py-1.5',
  NAV_ITEM_GAP: 'gap-2',
  CONTAINER_BOTTOM_MARGIN: 'mb-2',
  FLEX_GAP_SMALL: 'gap-1',
  FLEX_GAP_MEDIUM: 'gap-2',
  FLEX_GAP_LARGE: 'gap-4',
  TIMELINE_CONTENT_GAP: 'gap-2',
  EVENT_ITEM_PADDING: 'p-4',
  CARD_CONTENT_PADDING: 'p-6',
  SECTION_SEPARATOR_HEIGHT: 'h-2',
} as const;

export type PanelSpacing = typeof PANEL_SPACING;

