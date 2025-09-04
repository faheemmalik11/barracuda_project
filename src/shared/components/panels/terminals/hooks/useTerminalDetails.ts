import { useState } from 'react'

export interface TerminalDetailsSections {
  header: boolean
  cards: boolean
  activity: boolean
  hardware: boolean
  configuration: boolean
  profile: boolean
  connectivity: boolean
  risk: boolean
  events: boolean
  order: boolean
}

export function useTerminalDetails(initialSections: Partial<TerminalDetailsSections> = {}) {
  const [sections] = useState<TerminalDetailsSections>({
    header: true,
    cards: true,
    activity: true,
    hardware: true,
    configuration: true,
    profile: true,
    connectivity: true,
    risk: true,
    events: true,
    order: true,
    ...initialSections
  })

  return sections
}
