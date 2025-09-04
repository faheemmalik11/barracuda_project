import { useState } from "react"
import { SettlementHeader, SettlementTable } from "../index"
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { Button } from "@shared/components/ui/button"
import { Download, Plus } from "lucide-react"
import { Typography } from "@shared/components/ui/typography"
import { mockSettlement } from "@shared/data/mockSettlement"
import type { Settlement } from "../types/settlements.types"

export function SettlementListPage() {
  const [filteredData, setFilteredData] = useState<Settlement[]>(mockSettlement)
  const [selectedSettlements, setSelectedSettlements] = useState<string[]>([])

  const handleTableFiltersChange = (filters: Record<string, unknown>) => {
    console.log("Settlement Table filters changed:", filters)
    let newFilteredData = [...mockSettlement]
    
    if (filters.settlementStatus && filters.settlementStatus !== "all") {
      newFilteredData = newFilteredData.filter((settlement) => settlement.status === filters.settlementStatus)
    }
    
    setFilteredData(newFilteredData)
  }

  const handleViewSettlement = (settlement: Settlement) => {
    console.log("View settlement:", settlement)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <SettlementHeader />

      <div className="space-y-4">
        <EntityTableFilters entity="settlements" onFiltersChange={handleTableFiltersChange} />
        <SettlementTable
          settlements={filteredData}
          selectedSettlements={selectedSettlements}
          onSelectionChange={setSelectedSettlements}
          onViewSettlement={handleViewSettlement}
        />
      </div>
    </div>
  )
}