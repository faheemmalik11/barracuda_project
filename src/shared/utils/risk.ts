export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface RiskConfig {
  level: RiskLevel
  colorClasses: string
  label: string
  description: string
}

export const RISK_THRESHOLDS = {
  LOW: 15,
  MEDIUM: 30,
  HIGH: 40,
  CRITICAL: 50,
} as const

export const RISK_SCORING = {
  MAX_POSSIBLE_SCORE: 100,
  SEGMENTS_COUNT: 25
} as const

export function getRiskLevel(score: number): RiskLevel {
  if (score > RISK_THRESHOLDS.HIGH) return 'critical'
  if (score > RISK_THRESHOLDS.MEDIUM) return 'high'
  if (score > RISK_THRESHOLDS.LOW) return 'medium'
  return 'low'
}

export function getRiskConfig(score: number): RiskConfig {
  const level = getRiskLevel(score)
  
  const configs: Record<RiskLevel, Omit<RiskConfig, 'level'>> = {
    low: {
      colorClasses: 'text-green-600 bg-green-50 border-green-200',
      label: 'Low Risk',
      description: 'Transaction appears safe'
    },
    medium: {
      colorClasses: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      label: 'Medium Risk',
      description: 'Transaction requires attention'
    },
    high: {
      colorClasses: 'text-red-600 bg-red-50 border-red-200',
      label: 'High Risk',
      description: 'Transaction requires immediate review'
    },
    critical: {
      colorClasses: 'text-red-800 bg-red-100 border-red-300',
      label: 'Critical Risk',
      description: 'Transaction blocked - requires urgent attention'
    }
  }

  return { level, ...configs[level] }
}

export function getRiskBarColor(score: number): string {
  const level = getRiskLevel(score)
  const colors = {
    low: 'bg-green-600',
    medium: 'bg-orange-500',
    high: 'bg-red-600',
    critical: 'bg-red-700'
  }
  return colors[level]
}

export function getRiskTextColor(score: number): string {
  const level = getRiskLevel(score)
  const colors = {
    low: 'text-green-700',
    medium: 'text-orange-600',
    high: 'text-red-700',
    critical: 'text-red-800'
  }
  return colors[level]
}

export function formatRiskScore(score: number): string {
  return Math.round(score).toString()
}