import { useState, useEffect, useMemo, useCallback } from "react"
import type { NavItem } from "@shared/types/navigation"

const LOCAL_STORAGE_KEY = "sidebarFavourites"

export function usePinnedItems(pinnableItems: NavItem[]) {
  const [pinnedItems, setPinnedItems] = useState<NavItem[]>([])

  const pinnableItemsMap = useMemo(() => {
    const map = new Map<string, NavItem>()
    pinnableItems.forEach(item => {
      if (item.pinnable) {
        map.set(item.url, item)
      }
    })
    return map
  }, [pinnableItems])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Pick<NavItem, "url">[]
        const hydrated = parsed
          .map(fav => pinnableItemsMap.get(fav.url))
          .filter(Boolean) as NavItem[]
        setPinnedItems(hydrated)
      }
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }, [pinnableItemsMap])

  useEffect(() => {
    const toStore = pinnedItems.map(item => ({ url: item.url }))
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toStore))
  }, [pinnedItems])

  const togglePin = useCallback((item: NavItem) => {
    setPinnedItems(prev => {
      const isPinned = prev.some(p => p.url === item.url)
      return isPinned
        ? prev.filter(p => p.url !== item.url)
        : [...prev, item]
    })
  }, [])

  const isItemPinned = useCallback(
    (item: NavItem) => {
      return pinnedItems.some(p => p.url === item.url)
    },
    [pinnedItems]
  )

  return { pinnedItems, togglePin, isItemPinned }
} 
