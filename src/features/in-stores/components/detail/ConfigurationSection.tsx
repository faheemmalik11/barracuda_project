import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Settings, Edit } from 'lucide-react'

interface ConfigurationItem {
  key: string
  label: string
  value: string | boolean | number
  type: 'text' | 'boolean' | 'number' | 'select'
  options?: string[]
  editable?: boolean
}

interface ConfigurationSectionProps {
  configurations: ConfigurationItem[]
  title?: string
  onEdit?: (key: string, value: any) => void
}

export function ConfigurationSection({ 
  configurations, 
  title = "Configuration", 
  onEdit 
}: ConfigurationSectionProps) {
  const renderValue = (item: ConfigurationItem) => {
    switch (item.type) {
      case 'boolean':
        return (
          <Badge variant={item.value ? 'default' : 'secondary'}>
            {item.value ? 'Enabled' : 'Disabled'}
          </Badge>
        )
      case 'text':
      case 'number':
      default:
        return <span className="text-sm font-mono">{String(item.value)}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {configurations.map((config) => (
            <div key={config.key} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex-1">
                <label className="text-sm font-medium">{config.label}</label>
                <div className="mt-1">
                  {renderValue(config)}
                </div>
              </div>
              {config.editable && onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(config.key, config.value)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
