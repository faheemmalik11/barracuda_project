import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import type { AnalyticsMetric } from '../types/analytics.types'
import { formatCurrency, formatPercentage } from '../utils'

interface MetricCardProps {
  metric: AnalyticsMetric
  icon: LucideIcon
}

export function MetricCard({ metric, icon: Icon }: MetricCardProps) {
  const formatValue = (value: number, name: string): string => {
    if (name.includes('Revenue') || name.includes('Value')) {
      return formatCurrency(value, 'USD', 2)
    }
    if (name === 'Conversion Rate') {
      return formatPercentage(value)
    }
    return value.toLocaleString()
  }

  const getChangeColor = (change: number): string => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-muted-foreground'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {metric.name}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatValue(metric.value, metric.name)}
        </div>
        <p className={`text-xs ${getChangeColor(metric.change)}`}>
          {metric.change > 0 ? '+' : ''}{metric.change}% from last {metric.period}
        </p>
      </CardContent>
    </Card>
  )
}