// Risk and fraud detection types

export interface RiskAssessment {
  id: string
  paymentId: string
  score: number
  level: RiskLevel
  factors: RiskFactor[]
  recommendation: 'approve' | 'review' | 'decline'
  createdAt: Date
  updatedAt: Date
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface RiskFactor {
  type: string
  description: string
  impact: 'positive' | 'negative'
  weight: number
}

export interface RiskRule {
  id: string
  name: string
  description: string
  enabled: boolean
  conditions: RiskCondition[]
  action: 'flag' | 'decline' | 'review'
  priority: number
}

export interface RiskCondition {
  field: string
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains'
  value: string | number
}