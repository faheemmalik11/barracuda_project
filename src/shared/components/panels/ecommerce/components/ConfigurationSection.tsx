import React from 'react'
import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Copy, Eye, EyeOff } from 'lucide-react'

interface ConfigurationSectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function ConfigurationSection({ ecommerceData, isExpanded, onToggle, isDetailView }: ConfigurationSectionProps) {
  const [showApiKey, setShowApiKey] = React.useState(false)
  
  const mockConfig = {
    apiKey: 'sk_live_1234567890abcdef',
    publicKey: 'pk_live_0987654321fedcba',
    webhookSecret: 'whsec_abcdef1234567890',
    endpoints: {
      base: 'https://api.example.com/v1',
      webhook: 'https://merchant.example.com/webhook'
    },
    settings: {
      autoCapture: true,
      currency: 'USD',
      timeout: 30,
      retryAttempts: 3
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const maskKey = (key: string) => {
    if (showApiKey) return key
    return key.substring(0, 8) + '...' + key.substring(key.length - 4)
  }

  return (
    <CollapsibleSection
      title="Configuration"
      isDetailView={isDetailView}
    >
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">API Keys</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded">
              <div>
                <label className="text-sm font-medium">API Key</label>
                <p className="text-sm font-mono">{maskKey(mockConfig.apiKey)}</p>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(mockConfig.apiKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 border rounded">
              <div>
                <label className="text-sm font-medium">Public Key</label>
                <p className="text-sm font-mono">{mockConfig.publicKey}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(mockConfig.publicKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Endpoints</h4>
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Base URL</label>
              <p className="text-sm font-mono">{mockConfig.endpoints.base}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Webhook URL</label>
              <p className="text-sm font-mono break-all">{mockConfig.endpoints.webhook}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Auto Capture</label>
              <Badge variant={mockConfig.settings.autoCapture ? 'default' : 'secondary'}>
                {mockConfig.settings.autoCapture ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Currency</label>
              <p className="text-sm">{mockConfig.settings.currency}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Timeout</label>
              <p className="text-sm">{mockConfig.settings.timeout}s</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Retry Attempts</label>
              <p className="text-sm">{mockConfig.settings.retryAttempts}</p>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
