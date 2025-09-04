import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'

interface IntegrationSectionProps {
  terminalData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function IntegrationSection({ terminalData, isExpanded = true, onToggle, isDetailView = false }: IntegrationSectionProps) {
  const integrationData = {
    pos: {
      name: 'Square POS',
      status: 'connected',
      version: 'v4.2.1',
      lastSync: '2 minutes ago'
    },
    inventory: {
      name: 'Inventory Management',
      status: 'connected',
      items: 1247,
      lastUpdate: '5 minutes ago'
    },
    accounting: {
      name: 'QuickBooks',
      status: 'connected',
      lastExport: '1 hour ago'
    },
    crm: {
      name: 'Salesforce',
      status: 'disconnected',
      reason: 'Authentication expired'
    },
    analytics: {
      name: 'Google Analytics',
      status: 'connected',
      events: 156
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">System Integrations</CardTitle>
        {!isDetailView && onToggle && (
          <button
            onClick={onToggle}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* POS Integration */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{integrationData.pos.name}</h4>
                <Badge variant={integrationData.pos.status === 'connected' ? 'default' : 'destructive'}>
                  {integrationData.pos.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Version {integrationData.pos.version} • Last sync: {integrationData.pos.lastSync}
              </p>
            </div>
            <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
              Configure
            </button>
          </div>

          {/* Inventory Integration */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{integrationData.inventory.name}</h4>
                <Badge variant={integrationData.inventory.status === 'connected' ? 'default' : 'destructive'}>
                  {integrationData.inventory.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {integrationData.inventory.items} items • Last update: {integrationData.inventory.lastUpdate}
              </p>
            </div>
            <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
              Sync Now
            </button>
          </div>

          {/* Accounting Integration */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{integrationData.accounting.name}</h4>
                <Badge variant={integrationData.accounting.status === 'connected' ? 'default' : 'destructive'}>
                  {integrationData.accounting.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Last export: {integrationData.accounting.lastExport}
              </p>
            </div>
            <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
              Export
            </button>
          </div>

          {/* CRM Integration */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{integrationData.crm.name}</h4>
                <Badge variant={integrationData.crm.status === 'connected' ? 'default' : 'destructive'}>
                  {integrationData.crm.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {integrationData.crm.reason}
              </p>
            </div>
            <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
              Reconnect
            </button>
          </div>

          {/* Analytics Integration */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{integrationData.analytics.name}</h4>
                <Badge variant={integrationData.analytics.status === 'connected' ? 'default' : 'destructive'}>
                  {integrationData.analytics.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {integrationData.analytics.events} events tracked today
              </p>
            </div>
            <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
              View Data
            </button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
