import { useState } from 'react'

export interface OrderDetailsSections {
  header: boolean
  activity: boolean
  order: boolean
}

export function useOrderDetails(initialSections: Partial<OrderDetailsSections> = {}) {
  const [sections] = useState<OrderDetailsSections>({
    header: true,
    activity: true,
    order: true,
    ...initialSections
  })

  return sections
}
