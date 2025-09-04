import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkRiskSectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkRiskSection({ 
  paymentLink
}: PaymentLinkRiskSectionProps) {
  // Mock risk data - in real app this would come from API
  const riskMetrics = {
    riskScore: 'Low',
    fraudAttempts: 2,
    chargebacks: 0,
    disputeRate: 0.1,
    topCountries: [
      { country: 'United States', percentage: 65 },
      { country: 'Canada', percentage: 20 },
      { country: 'United Kingdom', percentage: 15 }
    ]
  }

  const getRiskColor = (score: string) => {
    switch (score.toLowerCase()) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-muted-foreground'
    }
  }

  const getRiskIcon = (score: string) => {
    switch (score.toLowerCase()) {
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  return (
    <CollapsibleSection
      title="Risk"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                {getRiskIcon(riskMetrics.riskScore)}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Risk Score</label>
                  <div className={`text-sm font-medium ${getRiskColor(riskMetrics.riskScore)}`}>
                    {riskMetrics.riskScore}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Fraud Attempts</label>
                <div className="text-sm font-medium">
                  {riskMetrics.fraudAttempts}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Chargebacks</label>
                <div className="text-sm font-medium">
                  {riskMetrics.chargebacks}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Dispute Rate</label>
                <div className="text-sm font-medium">
                  {riskMetrics.disputeRate}%
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground">Top Countries</label>
              </div>
              <div className="space-y-2">
                {riskMetrics.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">{country.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {country.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Risk assessment based on transaction patterns and fraud indicators
                </div>
                <Badge variant="outline" className="text-xs">
                  Last updated: 2 hours ago
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CollapsibleSection>
  )
}
