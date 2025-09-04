import TableFilters from "../TableFilters"
import { getTableConfig } from "@shared/lib/filters"

interface ProgramTableFiltersProps {
  onFiltersChange?: (filters: Record<string, unknown>) => void
  className?: string
  initialValues?: Record<string, unknown>
}

export default function ProgramTableFilters({
  onFiltersChange,
  className,
  initialValues = {},
}: ProgramTableFiltersProps) {
  const config = getTableConfig("programs")

  return (
    <TableFilters
      config={config}
      onFiltersChange={onFiltersChange}
      className={className}
      initialValues={initialValues}
    />
  )
}
