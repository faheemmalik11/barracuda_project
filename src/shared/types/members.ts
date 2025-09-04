export interface Member {
  id: string
  name: string
  email: string
  role: string
  status: MemberStatus
  createdAt: string
  lastActivity?: string
  program: { name: string; type: string }
  points: number
  tier: string
}

export type MemberStatus = 'active' | 'inactive' | 'suspended' | 'pending'