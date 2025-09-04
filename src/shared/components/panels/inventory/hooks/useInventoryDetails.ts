import { useState } from 'react'

export interface InventoryDetailsSections {
  header: boolean
  cards: boolean
  activity: boolean
  hardware: boolean
  location: boolean
  maintenance: boolean
  configuration: boolean
  eventsLogs: boolean
}

export function useInventoryDetails(initialSections: Partial<InventoryDetailsSections> = {}) {
  const [sections] = useState<InventoryDetailsSections>({
    header: true,
    cards: true,
    activity: true,
    hardware: true,
    location: true,
    maintenance: true,
    configuration: true,
    eventsLogs: true,
    ...initialSections
  })

  return sections
}
