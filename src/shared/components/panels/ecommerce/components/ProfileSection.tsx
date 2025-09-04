import React from 'react'
import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'

interface ProfileSectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function ProfileSection({ ecommerceData, isExpanded, onToggle, isDetailView }: ProfileSectionProps) {
  const mockProfile = {
    integrationId: ecommerceData?.id || 'ecom_1234567890',
    apiVersion: 'v2.1',
    webhookUrl: 'https://example.com/webhook',
    environment: ecommerceData?.environment || 'live',
    createdDate: ecommerceData?.created || '2023-12-01T00:00:00Z',
    lastModified: '2024-01-15T10:30:00Z',
    permissions: ['read', 'write', 'refund']
  }

  return (
    <CollapsibleSection
      title="Integration Profile"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isDetailView={isDetailView}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Integration ID</label>
            <p className="text-sm font-mono">{mockProfile.integrationId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">API Version</label>
            <p className="text-sm">{mockProfile.apiVersion}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Environment</label>
            <Badge variant={mockProfile.environment === 'live' ? 'default' : 'secondary'}>
              {mockProfile.environment}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Created</label>
            <p className="text-sm">{new Date(mockProfile.createdDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground">Webhook URL</label>
          <p className="text-sm font-mono break-all">{mockProfile.webhookUrl}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground">Permissions</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {mockProfile.permissions.map((permission) => (
              <Badge key={permission} variant="outline">
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
