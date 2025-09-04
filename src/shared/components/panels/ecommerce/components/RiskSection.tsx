import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react'

interface RiskSectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function RiskSection({ ecommerceData, isExpanded, onToggle, isDetailView }: RiskSectionProps) {
  const mockRiskData = {
    riskScore: 15,
    riskLevel: 'low',
    checks: [
      { name: 'API Rate Limiting', status: 'passed', description: 'Within acceptable limits' },
      { name: 'Fraud Detection', status: 'passed', description: 'No suspicious patterns detected' },
      { name: 'SSL Certificate', status: 'passed', description: 'Valid and up to date' },
      { name: 'Webhook Security', status: 'warning', description: 'Consider implementing signature verification' }
    ]
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <CollapsibleSection
      title="Risk Assessment"
      isDetailView={isDetailView}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          {getRiskIcon(mockRiskData.riskLevel)}
          <div>
            <p className="font-medium">Risk Score: {mockRiskData.riskScore}/100</p>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span>Risk Level:</span>
              <Badge variant={mockRiskData.riskLevel === 'low' ? 'default' : 'destructive'}>
                {mockRiskData.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Security Checks</h4>
          {mockRiskData.checks.map((check, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 border rounded">
              {getStatusIcon(check.status)}
              <div className="flex-1">
                <p className="text-sm font-medium">{check.name}</p>
                <p className="text-xs text-muted-foreground">{check.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  )
}
