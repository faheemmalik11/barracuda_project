import { useState } from "react"
import { DigitalHeader, DigitalTable } from "../index"
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'

export function DigitalListPage() {
  const [status, setStatus] = useState<string>("all")
  const [loading] = useState(false)

  const handleTableFiltersChange = (filters: Record<string, unknown>) => {
    if (filters.digitalStatus && filters.digitalStatus !== "all") {
      setStatus(filters.digitalStatus as string)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <DigitalHeader />

      <div className="space-y-4">
        <EntityTableFilters entity="digital" onFiltersChange={handleTableFiltersChange} />
        <DigitalTable
          status={status}
          loading={loading}
        />
      </div>
    </div>
  )
}