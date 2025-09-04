import { useState } from 'react'

export interface EcommerceDetailsSections {
  header: boolean
  cards: boolean
  activity: boolean
  paymentFor: boolean
  profile: boolean
  media: boolean
  visual: boolean
  risk: boolean
  configuration: boolean
  eventsLogs: boolean
}

export function useEcommerceDetails(initialSections: Partial<EcommerceDetailsSections> = {}) {
  const [sections] = useState<EcommerceDetailsSections>({
    header: true,
    cards: true,
    activity: true,
    paymentFor: false,
    profile: true,
    media: false,
    visual: false,
    risk: true,
    configuration: true,
    eventsLogs: true,
    ...initialSections
  })

  return sections
}
