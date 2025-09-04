import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { Button } from '@shared/components/ui/button';
import { Settings, Shield, Wifi, CreditCard, Printer, Volume2 } from 'lucide-react';

interface ConfigurationSectionProps {
  inventoryData?: any;
  isExpanded?: boolean;
  onToggle?: () => void;
  isDetailView?: boolean;
}

export const ConfigurationSection: React.FC<ConfigurationSectionProps> = ({ 
  inventoryData,
  isExpanded = true,
  onToggle,
  isDetailView = false 
}) => {
  // Mock configuration data
  const configData = {
    firmware: {
      version: inventoryData?.firmwareVersion || '2.1.4',
      lastUpdate: '2024-01-15T10:30:00Z',
      updateAvailable: false,
      autoUpdate: true
    },
    security: {
      encryption: 'AES-256',
      certificates: {
        ssl: { status: 'valid', expires: '2024-12-31' },
        payment: { status: 'valid', expires: '2024-11-15' }
      },
      lastSecurityScan: '2024-01-28T08:00:00Z',
      vulnerabilities: 0
    },
    network: {
      dhcp: true,
      ipAddress: '192.168.1.45',
      subnet: '255.255.255.0',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8', '8.8.4.4'],
      proxy: false
    },
    payment: {
      processors: ['Visa', 'Mastercard', 'Amex', 'Discover'],
      contactless: true,
      chipReader: true,
      pinPad: true,
      receiptPrinter: true
    },
    display: {
      brightness: 80,
      timeout: 300,
      screensaver: true,
      orientation: 'portrait'
    },
    audio: {
      volume: 65,
      beepOnTransaction: true,
      voicePrompts: true,
      language: 'en-US'
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className={`cursor-pointer ${!isDetailView ? 'hover:bg-muted/50' : ''}`}
        onClick={!isDetailView ? onToggle : undefined}
      >
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">
              v{configData.firmware.version}
            </Badge>
            {configData.firmware.updateAvailable && (
              <Badge variant="outline" className="text-blue-600">
                Update Available
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Firmware */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Firmware
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current Version:</span>
                <p className="font-medium">{configData.firmware.version}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Update:</span>
                <p className="font-medium">{formatDate(configData.firmware.lastUpdate)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Auto Update:</span>
                <Badge variant={configData.firmware.autoUpdate ? 'default' : 'secondary'}>
                  {configData.firmware.autoUpdate ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Check for Updates
                </Button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Encryption:</span>
                  <p className="font-medium">{configData.security.encryption}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Vulnerabilities:</span>
                  <Badge variant={configData.security.vulnerabilities === 0 ? 'default' : 'destructive'}>
                    {configData.security.vulnerabilities} found
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Certificates:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">SSL Certificate</span>
                      <Badge variant="default" className="text-xs">Valid</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expires: {formatDate(configData.security.certificates.ssl.expires)}
                    </p>
                  </div>
                  <div className="p-2 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Payment Certificate</span>
                      <Badge variant="default" className="text-xs">Valid</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expires: {formatDate(configData.security.certificates.payment.expires)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Network */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Network
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">IP Address:</span>
                <p className="font-medium font-mono">{configData.network.ipAddress}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Gateway:</span>
                <p className="font-medium font-mono">{configData.network.gateway}</p>
              </div>
              <div>
                <span className="text-muted-foreground">DHCP:</span>
                <Badge variant={configData.network.dhcp ? 'default' : 'secondary'}>
                  {configData.network.dhcp ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">DNS Servers:</span>
                <p className="font-medium font-mono text-xs">
                  {configData.network.dns.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Configuration
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Supported Cards:</span>
                <div className="flex gap-2 mt-1">
                  {configData.payment.processors.map((processor) => (
                    <Badge key={processor} variant="outline" className="text-xs">
                      {processor}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Contactless</span>
                  <Badge variant={configData.payment.contactless ? 'default' : 'secondary'} className="text-xs">
                    {configData.payment.contactless ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Chip Reader</span>
                  <Badge variant={configData.payment.chipReader ? 'default' : 'secondary'} className="text-xs">
                    {configData.payment.chipReader ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">PIN Pad</span>
                  <Badge variant={configData.payment.pinPad ? 'default' : 'secondary'} className="text-xs">
                    {configData.payment.pinPad ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Receipt Printer</span>
                  <Badge variant={configData.payment.receiptPrinter ? 'default' : 'secondary'} className="text-xs">
                    {configData.payment.receiptPrinter ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Display & Audio */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Display
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brightness:</span>
                  <span className="font-medium">{configData.display.brightness}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timeout:</span>
                  <span className="font-medium">{configData.display.timeout}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orientation:</span>
                  <span className="font-medium capitalize">{configData.display.orientation}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Audio
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="font-medium">{configData.audio.volume}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{configData.audio.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voice Prompts:</span>
                  <Badge variant={configData.audio.voicePrompts ? 'default' : 'secondary'} className="text-xs">
                    {configData.audio.voicePrompts ? 'On' : 'Off'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex gap-2">
            <Button size="sm" variant="outline">
              Export Config
            </Button>
            <Button size="sm" variant="outline">
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};