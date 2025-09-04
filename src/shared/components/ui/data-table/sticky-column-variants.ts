import { cva } from "class-variance-authority"
import { Z_INDEX_CLASSES } from "../../../lib/z-index"
import { STICKY_SHADOW_CLASSES } from "./constants"

const STICKY_BASE = `sticky ${Z_INDEX_CLASSES.TABLE_STICKY} bg-background right-0 text-center w-9 min-w-9 max-w-9 px-1 transition-all duration-200 ease-out transform-gpu will-change-[filter,transform]`

const shadowVariant = {
  showRightShadow: {
    true: STICKY_SHADOW_CLASSES.lg,
    false: STICKY_SHADOW_CLASSES.none
  }
} as const

export const stickyHeaderVariants = cva(STICKY_BASE, {
  variants: shadowVariant,
  defaultVariants: { showRightShadow: false }
})

export const stickyRowCellVariants = cva(STICKY_BASE, {
  variants: {
    ...shadowVariant,
    selected: {
      true: "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800",
      false: "group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50"
    },
    active: {
      true: "bg-blue-50 dark:bg-blue-950/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50",
      false: ""
    }
  },
  defaultVariants: {
    showRightShadow: false,
    selected: false,
    active: false
  }
})

export const stickyLoadingCellVariants = cva(STICKY_BASE, {
  variants: shadowVariant,
  defaultVariants: { showRightShadow: false }
})

