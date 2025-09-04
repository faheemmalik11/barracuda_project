import { CreditCard } from "lucide-react"
import type { Column } from "@shared/types/data-table"
import type { Program } from "@shared/types/programs"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createStatusColumn, createTextColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"
import { IconTextCell, TextCell } from "../cells/common-cells"

export const PROGRAM_COLUMNS: Record<string, Column<Program>> = {
  program: {
    key: "program",
    header: "Program",
    width: 250,
    render: (program: Program) => (
      <TruncatedCell
        maxWidth={250}
        className="font-bold"
        title={program.name || "Unknown Program"}
      >
        {program.name || "Unknown Program"}
      </TruncatedCell>
    ),
  },
  description: {
    key: "description",
    header: "Description",
    width: 200,
    render: (program: Program) => (
      <TruncatedCell
        maxWidth={200}
        className="text-muted-foreground group-hover:text-foreground font-normal"
        title={program.description || "No description"}
      >
        {program.description || "No description"}
      </TruncatedCell>
    ),
  },
  status: createStatusColumn<Program>("program"),
  type: createTextColumn<Program>("type", "Type", 100, "font-medium capitalize text-foreground"),
  members: {
    key: "members",
    header: "Members",
    width: 100,
    render: (program: Program) => (
      <IconTextCell 
        icon={<CreditCard className="h-3 w-3 text-muted-foreground" />}
        className="text-foreground"
      >
        {(program?.memberCount || 0).toLocaleString()}
      </IconTextCell>
    ),
  },
  pointsIssued: {
    key: "pointsIssued",
    header: "Points issued",
    align: "right",
    width: 130,
    render: (program: Program) => (
      <TextCell 
        value={(program.totalPointsIssued || 0).toLocaleString()} 
        className="font-medium text-foreground text-right" 
      />
    ),
  },
  created: createDateColumn<Program>("dateCreated", "Created", 150),
}

export const PROGRAM_STATUS_CONFIG = {
  all: ["program", "description", "status", "type", "members", "pointsIssued", "created"],
} as const

export const getProgramColumns = (status: string = 'all'): Column<Program>[] => {
  const keys = PROGRAM_STATUS_CONFIG[status as keyof typeof PROGRAM_STATUS_CONFIG] || PROGRAM_STATUS_CONFIG.all
  return keys.map(key => PROGRAM_COLUMNS[key]).filter(Boolean)
}

export const getProgramColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(PROGRAM_STATUS_CONFIG[status as keyof typeof PROGRAM_STATUS_CONFIG] || PROGRAM_STATUS_CONFIG.all)
  return Object.entries(PROGRAM_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["program", "status"].includes(key as any),
    order: index
  }))
}
