import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { AlertTriangle, Shield, TrendingUp, AlertCircle } from 'lucide-react'

interface RiskItem {
  id: string
  type: 'security' | 'performance' | 'maintenance' | 'compliance'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  lastDetected: string
  resolved?: boolean
}

interface RiskSectionProps {
  risks: RiskItem[]
  title?: string
}

export function RiskSection({ risks, title = "Risk Assessment" }: RiskSectionProps) {
  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4" />
      case 'performance': return <TrendingUp className="h-4 w-4" />
      case 'maintenance': return <AlertCircle className="h-4 w-4" />
      case 'compliance': return <AlertTriangle className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive'
      case 'high': return 'destructive'
      case 'medium': return 'outline'
      case 'low': return 'secondary'
      default: return 'secondary'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-muted-foreground'
    }
  }

  const activeRisks = risks.filter(risk => !risk.resolved)
  const resolvedRisks = risks.filter(risk => risk.resolved)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Active Risks */}
          {activeRisks.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-red-600">Active Risks ({activeRisks.length})</h4>
              <div className="space-y-3">
                {activeRisks.map((risk) => (
                  <div key={risk.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getRiskIcon(risk.type)}
                        <span className="font-medium">{risk.title}</span>
                      </div>
                      <Badge variant={getSeverityVariant(risk.severity)}>
                        {risk.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="capitalize">{risk.type} Risk</span>
                      <span>Detected: {new Date(risk.lastDetected).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolved Risks */}
          {resolvedRisks.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-green-600">Resolved Risks ({resolvedRisks.length})</h4>
              <div className="space-y-3">
                {resolvedRisks.slice(0, 3).map((risk) => (
                  <div key={risk.id} className="border rounded-lg p-4 opacity-60">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getRiskIcon(risk.type)}
                        <span className="font-medium">{risk.title}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        RESOLVED
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="capitalize">{risk.type} Risk</span>
                      <span>Detected: {new Date(risk.lastDetected).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {resolvedRisks.length > 3 && (
                  <p className="text-sm text-muted-foreground text-center">
                    +{resolvedRisks.length - 3} more resolved risks
                  </p>
                )}
              </div>
            </div>
          )}

          {/* No Risks */}
          {risks.length === 0 && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-600 font-medium">No risks detected</p>
              <p className="text-sm text-muted-foreground">System is operating within normal parameters</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
