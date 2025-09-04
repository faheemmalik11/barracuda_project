import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'

interface VisualSectionProps {
  terminalData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function VisualSection({ terminalData, isExpanded = true, onToggle, isDetailView = false }: VisualSectionProps) {
  const visualData = {
    display: {
      size: '5.5"',
      resolution: '1280x720',
      type: 'Color Touch Screen',
      brightness: 85,
      status: 'active'
    },
    branding: {
      logo: 'Store Logo Active',
      theme: 'Dark Mode',
      language: 'English (US)',
      customization: 'Enabled'
    },
    interface: {
      layout: 'Standard',
      fontSize: 'Medium',
      accessibility: 'Enabled',
      animations: 'Reduced'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Display & Interface</CardTitle>
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
        <CardContent className="space-y-6">
          {/* Display Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Display Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Screen Size</p>
                <p className="text-sm font-medium">{visualData.display.size}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Resolution</p>
                <p className="text-sm font-medium">{visualData.display.resolution}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="text-sm font-medium">{visualData.display.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Brightness</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{visualData.display.brightness}%</p>
                  <Badge variant="default" className="text-xs">
                    {visualData.display.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Branding Configuration */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Branding & Theme</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Store Logo</p>
                  <p className="text-xs text-muted-foreground">Custom branding display</p>
                </div>
                <Badge variant="default">{visualData.branding.logo}</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Interface color scheme</p>
                </div>
                <Badge variant="secondary">{visualData.branding.theme}</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">Display language</p>
                </div>
                <Badge variant="outline">{visualData.branding.language}</Badge>
              </div>
            </div>
          </div>

          {/* Interface Settings */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Interface Configuration</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Layout</p>
                <p className="text-sm font-medium">{visualData.interface.layout}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Font Size</p>
                <p className="text-sm font-medium">{visualData.interface.fontSize}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Accessibility</p>
                <Badge variant={visualData.interface.accessibility === 'Enabled' ? 'default' : 'secondary'}>
                  {visualData.interface.accessibility}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Animations</p>
                <Badge variant="outline">{visualData.interface.animations}</Badge>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Display Actions</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Adjust Brightness
              </button>
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Change Theme
              </button>
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Update Logo
              </button>
              <button className="px-3 py-1 text-xs border rounded-md hover:bg-muted">
                Screen Test
              </button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
