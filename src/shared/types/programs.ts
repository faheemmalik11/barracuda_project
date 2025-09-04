export type ProgramType = "loyalty" | "rewards" | "cashback" | "referral"

export type ProgramStatus = "active" | "inactive" | "draft" | "archived"

/**
 * Program settings configuration
 */
export interface ProgramSettings {
  autoEnroll: boolean
  maxRewards: number
  expirationDays: number
}

/**
 * Main Program interface with proper typing
 */
export interface Program {
  id: string
  name: string
  type: ProgramType
  status: ProgramStatus
  description: string
  participantCount: number
  totalRewards: number
  conversionRate: number
  dateCreated: string
  lastModified: string
  createdBy: string
  settings: ProgramSettings
  memberCount: number
  totalPointsIssued: number
}

export interface ProgramFilterState {
  status: ProgramStatus | "all"
  type?: ProgramType | "all"
  dateRange?: {
    from: Date
    to: Date
  }
  search?: string
}
