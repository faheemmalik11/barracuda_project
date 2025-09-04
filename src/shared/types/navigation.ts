import type { LucideIcon } from "lucide-react"

/**
 * Sub-navigation item for nested menu structures
 */
export interface NavSubItem {
  /** Display title for the sub-item */
  title: string
  /** Navigation URL */
  url: string
}

/**
 * Main navigation item with optional sub-items
 */
export interface NavItem {
  /** Display title for the navigation item */
  title: string
  /** Navigation URL */
  url: string
  /** Lucide icon component */
  icon: LucideIcon
  /** Whether this item can be pinned for quick access */
  pinnable?: boolean
  /** Original category for organizational purposes */
  originalCategory?: string
  /** Child navigation items */
  children?: NavSubItem[]
} 
