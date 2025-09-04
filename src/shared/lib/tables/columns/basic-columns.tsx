
import type { Column } from "@shared/types/data-table"
import type { ClearingEntry } from "@shared/types/clearing"
import type { DigitalAsset } from "@shared/types/digital"
import type { Engagement } from "@shared/types/engagement"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createIdColumn, createStatusColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"
import { TextCell } from "../cells/common-cells"

// Clearing Columns
export const CLEARING_COLUMNS: Record<string, Column<ClearingEntry>> = {
  id: createIdColumn<ClearingEntry>(),
  status: createStatusColumn<ClearingEntry>("clearing"),
}

export const CLEARING_STATUS_CONFIG = {
  all: ["id", "status"],
} as const

export const getClearingColumns = (status: string = 'all'): Column<ClearingEntry>[] => {
  const keys = CLEARING_STATUS_CONFIG[status as keyof typeof CLEARING_STATUS_CONFIG] || CLEARING_STATUS_CONFIG.all
  return keys.map(key => CLEARING_COLUMNS[key]).filter(Boolean)
}

export const getClearingColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(CLEARING_STATUS_CONFIG[status as keyof typeof CLEARING_STATUS_CONFIG] || CLEARING_STATUS_CONFIG.all)
  return Object.entries(CLEARING_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["id", "status"].includes(key as any),
    order: index
  }))
}

// Digital Asset Columns  
export const DIGITAL_COLUMNS: Record<string, Column<DigitalAsset>> = {
  id: createIdColumn<DigitalAsset>(),
  title: {
    key: "title",
    header: "Title",
    width: 200,
    render: (item: DigitalAsset) => (
      <TruncatedCell maxWidth={200} className="font-medium" title={item.name}>
        {item.name || "Unknown"}
      </TruncatedCell>
    )
  },
}

export const DIGITAL_STATUS_CONFIG = {
  all: ["id", "title"],
} as const

export const getDigitalColumns = (status: string = 'all'): Column<DigitalAsset>[] => {
  const keys = DIGITAL_STATUS_CONFIG[status as keyof typeof DIGITAL_STATUS_CONFIG] || DIGITAL_STATUS_CONFIG.all
  return keys.map(key => DIGITAL_COLUMNS[key]).filter(Boolean)
}

export const getDigitalColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(DIGITAL_STATUS_CONFIG[status as keyof typeof DIGITAL_STATUS_CONFIG] || DIGITAL_STATUS_CONFIG.all)
  return Object.entries(DIGITAL_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["id"].includes(key as any),
    order: index
  }))
}

// Engagement Columns
export const ENGAGEMENT_COLUMNS: Record<string, Column<Engagement>> = {
  id: createIdColumn<Engagement>(),
  type: {
    key: "type",
    header: "Type",
    width: 120,
    render: (engagement: Engagement) => <TextCell value={engagement.type} />
  },
}

export const ENGAGEMENT_STATUS_CONFIG = {
  all: ["id", "type"],
} as const

export const getEngagementColumns = (status: string = 'all'): Column<Engagement>[] => {
  const keys = ENGAGEMENT_STATUS_CONFIG[status as keyof typeof ENGAGEMENT_STATUS_CONFIG] || ENGAGEMENT_STATUS_CONFIG.all
  return keys.map(key => ENGAGEMENT_COLUMNS[key]).filter(Boolean)
}

export const getEngagementColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(ENGAGEMENT_STATUS_CONFIG[status as keyof typeof ENGAGEMENT_STATUS_CONFIG] || ENGAGEMENT_STATUS_CONFIG.all)
  return Object.entries(ENGAGEMENT_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["id"].includes(key as any),
    order: index
  }))
}
