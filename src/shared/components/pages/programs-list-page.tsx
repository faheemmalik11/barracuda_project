import { useState } from "react"
import { ProgramTable } from "@shared/components/tables/ProgramTable"
import ProgramTableFilters from "@shared/components/filters/presets/ProgramTableFilters"
import { mockPrograms } from "@shared/data/mockPrograms"
import { Button } from "@shared/components/ui/button"
import { Download, Plus } from "lucide-react"
import { Typography } from "@shared/components/ui/typography"
import type { Program } from "@shared/types/programs"

export default function ProgramsListPage() {
  const [filteredData, setFilteredData] = useState<Program[]>(mockPrograms)

  const handleTableFiltersChange = (filters: Record<string, unknown>) => {
    console.log("Program Table filters changed:", filters)
    let newFilteredData = [...mockPrograms]

    if (filters.programStatus && filters.programStatus !== "all") {
      newFilteredData = newFilteredData.filter((program) => program.status === filters.programStatus)
    }

    if (filters.programName && typeof filters.programName === 'string') {
      newFilteredData = newFilteredData.filter((program) =>
        program.name.toLowerCase().includes((filters.programName as string).toLowerCase())
      )
    }

    setFilteredData(newFilteredData)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Typography variant="h1">Programs</Typography>
          <Typography variant="muted">Manage loyalty and rewards programs</Typography>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Program
          </Button>
        </div>
      </div>

      <ProgramTableFilters onFiltersChange={handleTableFiltersChange} />

      <ProgramTable programs={filteredData} />
    </div>
  )
}
