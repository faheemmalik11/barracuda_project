import React from 'react'
import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Palette, Monitor, Smartphone, Eye } from 'lucide-react'

interface VisualSectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function VisualSection({ ecommerceData, isExpanded, onToggle, isDetailView }: VisualSectionProps) {
  const mockVisualConfig = {
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#64748b',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    },
    branding: {
      logo: 'https://example.com/logo.png',
      companyName: 'Acme Corp',
      favicon: 'https://example.com/favicon.ico'
    },
    layout: {
      style: 'modern',
      responsive: true,
      customCSS: true
    },
    previews: [
      { device: 'desktop', url: 'https://preview.com/desktop', icon: <Monitor className="h-4 w-4" /> },
      { device: 'mobile', url: 'https://preview.com/mobile', icon: <Smartphone className="h-4 w-4" /> }
    ]
  }

  return (
    <CollapsibleSection
      title="Visual Configuration"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isDetailView={isDetailView}
    >
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Theme Colors
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(mockVisualConfig.theme).map(([key, color]) => (
              <div key={key} className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-xs text-muted-foreground font-mono">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Branding</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <p className="text-sm">{mockVisualConfig.branding.companyName}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <div>
                <label className="text-sm font-medium">Logo URL</label>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {mockVisualConfig.branding.logo}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Layout Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Style</label>
              <Badge variant="outline">{mockVisualConfig.layout.style}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Responsive</label>
              <Badge variant={mockVisualConfig.layout.responsive ? 'default' : 'secondary'}>
                {mockVisualConfig.layout.responsive ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Preview</h4>
          <div className="flex space-x-2">
            {mockVisualConfig.previews.map((preview) => (
              <Button key={preview.device} size="sm" variant="outline">
                {preview.icon}
                <span className="ml-2 capitalize">{preview.device}</span>
                <Eye className="h-3 w-3 ml-2" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
