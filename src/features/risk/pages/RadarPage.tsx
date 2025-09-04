import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge'
import type { RiskAssessment, RiskLevel } from '../types/risk.types'

// Mock data for demonstration
const mockRiskAssessments: RiskAssessment[] = [
  {
    id: '1',
    paymentId: 'pay_123',
    score: 85,
    level: 'high',
    factors: [
      { type: 'velocity', description: 'High transaction velocity', impact: 'negative', weight: 0.3 },
      { type: 'location', description: 'Unusual location', impact: 'negative', weight: 0.2 }
    ],
    recommendation: 'review',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    paymentId: 'pay_124',
    score: 25,
    level: 'low',
    factors: [
      { type: 'customer', description: 'Trusted customer', impact: 'positive', weight: 0.4 }
    ],
    recommendation: 'approve',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]


const getRiskIcon = (level: RiskLevel) => {
  const icons = {
    low: CheckCircle,
    medium: AlertTriangle,
    high: AlertTriangle, 
    critical: XCircle
  }
  const Icon = icons[level] || Shield
  return <Icon className="h-4 w-4" />
}

export function RadarPage() {
  const [assessments] = useState<RiskAssessment[]>(mockRiskAssessments)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Radar</h1>
          <p className="text-muted-foreground mt-1">
            Fraud detection and risk management
          </p>
        </div>
        <Button>
          <Shield className="h-4 w-4 mr-2" />
          Configure Rules
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: 'Total Assessments', value: '1,234', change: '+20.1%', icon: Shield },
          { title: 'High Risk', value: '23', change: '-5%', icon: AlertTriangle, iconColor: 'text-orange-500' },
          { title: 'Blocked', value: '12', change: '-12%', icon: XCircle, iconColor: 'text-red-500' },
          { title: 'Approval Rate', value: '98.2%', change: '+2.1%', icon: CheckCircle, iconColor: 'text-green-500' }
        ].map(({ title, value, change, icon: Icon, iconColor }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className={`h-4 w-4 ${iconColor || 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Risk Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No risk assessments found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {assessments.map((assessment) => {
                const riskColor = assessment.score >= 40 ? 'error' : assessment.score >= 30 ? 'warning' : 'success'
                return (
                  <div 
                    key={assessment.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getRiskIcon(assessment.level)}
                      <div>
                        <h4 className="font-medium">Payment {assessment.paymentId}</h4>
                        <p className="text-sm text-muted-foreground">
                          Risk Score: {assessment.score}/100
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <AppStatusBadge 
                        variant="generic" 
                        text={assessment.level}
                        color={riskColor}
                      />
                      <AppStatusBadge 
                        variant="generic" 
                        text={assessment.recommendation}
                        color="neutral"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}