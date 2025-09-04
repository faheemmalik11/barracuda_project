import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { FileText, Download, Filter } from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'debug'
  source: string
  message: string
  details?: string
}

interface EventsLogsSectionProps {
  logs: LogEntry[]
  title?: string
  onDownloadLogs?: () => void
  onFilterLogs?: (level: string) => void
}

export function EventsLogsSection({ 
  logs, 
  title = "Events & Logs", 
  onDownloadLogs,
  onFilterLogs 
}: EventsLogsSectionProps) {
  const getLevelVariant = (level: string) => {
    switch (level) {
      case 'error': return 'destructive'
      case 'warning': return 'outline'
      case 'info': return 'default'
      case 'debug': return 'secondary'
      default: return 'secondary'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      case 'info': return 'text-blue-600'
      case 'debug': return 'text-gray-600'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {title}
          </CardTitle>
          <div className="flex gap-2">
            {onFilterLogs && (
              <Button variant="outline" size="sm" onClick={() => onFilterLogs('all')}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            )}
            {onDownloadLogs && (
              <Button variant="outline" size="sm" onClick={onDownloadLogs}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-sm">No logs available</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getLevelVariant(log.level)} className="text-xs">
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">{log.source}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mb-1">{log.message}</p>
                {log.details && (
                  <details className="text-xs text-muted-foreground">
                    <summary className="cursor-pointer hover:text-foreground">
                      Show details
                    </summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                      {log.details}
                    </pre>
                  </details>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
