import { Button } from '@shared/components/ui/button'
import { Badge } from '@shared/components/ui/badge'
import { ArrowLeft, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu'

interface DetailHeaderProps {
  title: string
  subtitle?: string
  status?: string
  statusVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  onBack: () => void
  actions?: Array<{
    label: string
    onClick: () => void
    icon?: React.ComponentType<{ className?: string }>
  }>
}

export function DetailHeader({
  title,
  subtitle,
  status,
  statusVariant = 'default',
  onBack,
  actions = []
}: DetailHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b bg-background">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {status && (
              <Badge variant={statusVariant}>
                {status}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {actions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={action.onClick}>
                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
