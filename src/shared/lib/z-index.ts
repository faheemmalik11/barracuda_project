export const Z_INDEX_CLASSES = {
  BASE: 'z-10',
  TABLE_STICKY: 'z-20',
  SIDEBAR: 'z-30',
  PANEL: 'z-[45]',
  POPOVER: 'z-50',
  TOOLTIP: 'z-[60]',
  MODAL: 'z-[90]',
  OVERLAY: 'z-[100]',
} as const

export const getZIndexClass = (layer: keyof typeof Z_INDEX_CLASSES): string => {
  return Z_INDEX_CLASSES[layer]
} 
