import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { CreditCard, TrendingUp, DollarSign, Users } from 'lucide-react'

interface CardMetric {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: React.ComponentType<{ className?: string }>
}

interface CardsSectionProps {
  metrics: CardMetric[]
  title?: string
}

export function CardsSection({ metrics, title = "Overview" }: CardsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-5 w-5 text-muted-foreground" />
                {metric.change && (
                  <Badge variant={metric.change.type === 'increase' ? 'default' : 'destructive'}>
                    {metric.change.type === 'increase' ? '+' : '-'}{Math.abs(metric.change.value)}%
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
