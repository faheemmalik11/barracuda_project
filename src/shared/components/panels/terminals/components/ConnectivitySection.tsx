import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Badge } from '@shared/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Signal, Globe } from 'lucide-react'

interface ConnectivitySectionProps {
  isExpanded?: boolean
  onToggle?: () => void
  terminalData?: any
}

export function ConnectivitySection({ 
  isExpanded = true, 
  onToggle,
  terminalData = null
}: ConnectivitySectionProps) {
  const connectivityData = {
    networkStatus: 'Connected',
    signalStrength: '85%',
    ipAddress: '192.168.1.45',
    lastSeen: '2 minutes ago',
    connectionType: 'Ethernet',
    networkName: 'Store_Network_5G'
  }

  return (
    <CollapsibleSection
      title="Connectivity"
      isExpanded={isExpanded}
      onToggle={onToggle}
    //   icon={<Wifi className="h-4 w-4" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Signal className="h-4 w-4" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">{connectivityData.networkStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Signal Strength</span>
                  <span className="text-sm font-medium">{connectivityData.signalStrength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Seen</span>
                  <span className="text-sm font-medium">{connectivityData.lastSeen}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Network Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Connection Type</span>
                  <span className="text-sm font-medium">{connectivityData.connectionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IP Address</span>
                  <span className="text-sm font-medium">{connectivityData.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Network Name</span>
                  <span className="text-sm font-medium">{connectivityData.networkName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CollapsibleSection>
  )
}
