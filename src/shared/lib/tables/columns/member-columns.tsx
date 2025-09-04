import type { Column } from "@shared/types/data-table"
import type { Member } from "@shared/types/members"
import type { ColumnManagementConfig } from "@shared/lib/tables/utils/column-management"
import { createStatusColumn, createDateColumn } from "./column-factories"
import { TruncatedCell } from "../cells/TruncatedCell"

export const MEMBER_COLUMNS: Record<string, Column<Member>> = {
  member: {
    key: "member",
    header: "Member",
    width: 200,
    render: (member: Member) => (
      <TruncatedCell
        maxWidth={200}
        className="font-bold"
        title={member.name || "Unknown Member"}
      >
        {member.name || "Unknown Member"}
      </TruncatedCell>
    ),
  },
  status: createStatusColumn<Member>("member"),
  email: {
    key: "email",
    header: "Email",
    width: 200,
    render: (member: Member) => (
      <TruncatedCell
        maxWidth={200}
        className="text-muted-foreground group-hover:text-foreground font-normal"
        title={member.email || "No email"}
      >
        {member.email || "No email"}
      </TruncatedCell>
    ),
  },
  program: {
    key: "program",
    header: "Program",
    width: 180,
    render: (member: Member) => (
      <TruncatedCell
        maxWidth={180}
        className="text-muted-foreground group-hover:text-foreground font-normal"
        title={`${member.program?.name || "No Program"} • ${member.program?.type || "Unknown"}`}
      >
        <span className="truncate">
          {member.program?.name || "No Program"} • {member.program?.type || "Unknown"}
        </span>
      </TruncatedCell>
    ),
  },
  points: {
    key: "points",
    header: "Points",
    align: "center",
    width: 100,
    render: (member: Member) => (
      <TruncatedCell
        className="font-medium text-center text-muted-foreground"
        maxWidth={100}
      >
        {(member.points || 0).toLocaleString()}
      </TruncatedCell>
    ),
  },
  tier: {
    key: "tier",
    header: "Tier",
    width: 100,
    render: (member: Member) => (
      <TruncatedCell
        className="font-medium capitalize text-muted-foreground"
        maxWidth={100}
      >
        {member.tier || "bronze"}
      </TruncatedCell>
    ),
  },
  joined: createDateColumn<Member>("createdAt", "Joined", 150),
}

export const MEMBER_STATUS_CONFIG = {
  all: ["member", "status", "email", "program", "points", "tier", "joined"],
} as const

export const getMemberColumns = (status: string = 'all'): Column<Member>[] => {
  const keys = MEMBER_STATUS_CONFIG[status as keyof typeof MEMBER_STATUS_CONFIG] || MEMBER_STATUS_CONFIG.all
  return keys.map(key => MEMBER_COLUMNS[key]).filter(Boolean)
}

export const getMemberColumnConfig = (status: string = 'all'): ColumnManagementConfig[] => {
  const visibleKeys = new Set(MEMBER_STATUS_CONFIG[status as keyof typeof MEMBER_STATUS_CONFIG] || MEMBER_STATUS_CONFIG.all)
  return Object.entries(MEMBER_COLUMNS).map(([key, col], index) => ({
    id: col.key,
    label: typeof col.header === 'string' ? col.header : col.key,
    visible: visibleKeys.has(key as any),
    required: ["member", "status"].includes(key as any),
    order: index
  }))
}
