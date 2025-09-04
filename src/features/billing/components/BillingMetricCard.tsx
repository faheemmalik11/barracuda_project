import { LucideIcon, DollarSign, FileText, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import type { BillingMetric } from '../types/billing.types'
import { formatPercentageChange } from '@shared/utils/formatters'
import { getTrendColor } from '../utils/formatters'

interface BillingMetricCardProps {
  metric: BillingMetric
}

const getMetricIcon = (iconName: string): LucideIcon => {
  switch (iconName) {
    case 'dollar':
      return DollarSign
    case 'file':
      return FileText
    case 'users':
      return Users
    case 'trending-up':
      return TrendingUp
    case 'trending-down':
      return TrendingDown
    default:
      return FileText
  }
}

const getTrendIcon = (trend: string): LucideIcon | null => {
  switch (trend) {
    case 'up':
      return TrendingUp
    case 'down':
      return TrendingDown
    default:
      return null
  }
}

export function BillingMetricCard({ metric }: BillingMetricCardProps) {
  const Icon = getMetricIcon(metric.icon)
  const TrendIcon = getTrendIcon(metric.trend)
  const trendColorClass = getTrendColor(metric.trend)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {metric.title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className={`text-xs flex items-center gap-1 ${trendColorClass}`}>
          {TrendIcon && <TrendIcon className="h-3 w-3" />}
          {formatPercentageChange(metric.change)} from last {metric.period || 'month'}
        </p>
      </CardContent>
    </Card>
  )
}