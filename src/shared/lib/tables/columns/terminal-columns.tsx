import { Monitor, Battery } from "lucide-react"
import type { Column } from "@shared/types/data-table"
import type { Terminal } from "@shared/types/terminals"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createStatusColumn, createLocationColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"
import { IconTextCell } from "../cells/common-cells"

export const TERMINAL_COLUMNS: Record<string, Column<Terminal>> = {
  terminal: {
    key: "terminal",
    header: "Terminal",
    width: 180,
    render: (terminal: Terminal) => (
      <TruncatedCell
        maxWidth={180}
        className="font-bold"
        title={terminal.label || "Unknown Terminal"}
      >
        {terminal.label || "Unknown Terminal"}
      </TruncatedCell>
    ),
  },
  serialNumber: {
    key: "serialNumber",
    header: "Serial",
    width: 120,
    render: (terminal: Terminal) => (
      <TruncatedCell
        maxWidth={120}
        className="text-muted-foreground group-hover:text-foreground font-normal"
        title={terminal.serialNumber || "No serial"}
      >
        {terminal.serialNumber || "No serial"}
      </TruncatedCell>
    ),
  },
  status: createStatusColumn<Terminal>("terminal"),
  merchant: {
    key: "merchant",
    header: "Merchant",
    width: 200,
    render: (terminal: Terminal) => (
      <TruncatedCell
        maxWidth={200}
        className="text-xs text-muted-foreground group-hover:text-foreground"
        title={typeof terminal.registeredTo === 'string' ? terminal.registeredTo : terminal.registeredTo?.name || "Unassigned"}
      >
        {typeof terminal.registeredTo === 'string' ? terminal.registeredTo : terminal.registeredTo?.name || "Unassigned"}
      </TruncatedCell>
    ),
  },
  location: createLocationColumn<Terminal>(200),
  device: {
    key: "device",
    header: "Device",
    width: 150,
    render: (terminal: Terminal) => {
      const deviceString = `${terminal.deviceType || "Unknown"} v${terminal.firmware || "0.0"}`
      return (
        <IconTextCell 
          icon={<Monitor className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
          className="text-sm text-foreground group-hover:text-foreground"
        >
          <TruncatedCell
            maxWidth={150}
            title={deviceString}
          >
            {deviceString}
          </TruncatedCell>
        </IconTextCell>
      )
    }
  },
  battery: {
    key: "battery",
    header: "Battery",
    width: 100,
    render: (terminal: Terminal) =>
      terminal.batteryLevel ? (
        <IconTextCell 
          icon={<Battery className="h-3 w-3 text-muted-foreground" />}
          className="text-foreground"
        >
          <span className="text-sm">{terminal.batteryLevel}%</span>
        </IconTextCell>
      ) : (
        <span className="text-muted-foreground text-sm">N/A</span>
      ),
  },
  lastSeen: createDateColumn<Terminal>("lastSeen", "Last seen", 150, false),
}

export const TERMINAL_STATUS_CONFIG = {
  all: ["terminal", "serialNumber", "status", "merchant", "location", "device", "battery", "lastSeen"],
} as const

export const getTerminalColumns = (status: string = 'all'): Column<Terminal>[] => {
  const keys = TERMINAL_STATUS_CONFIG[status as keyof typeof TERMINAL_STATUS_CONFIG] || TERMINAL_STATUS_CONFIG.all
  return keys.map(key => TERMINAL_COLUMNS[key]).filter(Boolean)
}

export const getTerminalColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(TERMINAL_STATUS_CONFIG[status as keyof typeof TERMINAL_STATUS_CONFIG] || TERMINAL_STATUS_CONFIG.all)
  return Object.entries(TERMINAL_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["terminal", "status"].includes(key as any),
    order: index
  }))
}
