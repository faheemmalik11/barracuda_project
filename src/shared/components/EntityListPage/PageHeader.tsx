import { ReactNode } from 'react'
import { Button } from '@shared/components/ui/button'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu'

export interface PageHeaderProps {
  title: string
  description: string
  icon?: ReactNode
  primaryAction?: {
    label: string
    icon?: ReactNode
    onClick: () => void
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    disabled?: boolean
    dropdown?: Array<{
      label: string
      onClick: () => void
    }>
  }
  secondaryActions?: Array<{
    label: string
    icon?: ReactNode
    onClick: () => void
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    disabled?: boolean
  }>
  className?: string
  children?: ReactNode
}

export function PageHeader({
  title,
  description,
  icon,
  primaryAction,
  secondaryActions = [],
  className = '',
  children
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex-shrink-0 text-muted-foreground">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {secondaryActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant || 'outline'}
            disabled={action.disabled}
            className="flex items-center gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
        
        {primaryAction && (
          primaryAction.dropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={primaryAction.variant || 'default'}
                  disabled={primaryAction.disabled}
                  className="flex items-center gap-2"
                >
                  {primaryAction.icon}
                  {primaryAction.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {primaryAction.dropdown.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={primaryAction.onClick}
              variant={primaryAction.variant || 'default'}
              disabled={primaryAction.disabled}
              className="flex items-center gap-2"
            >
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          )
        )}
        
        {children}
      </div>
    </div>
  )
}

export function SimplePageHeader({
  title,
  description,
  icon,
  action,
  className = ''
}: {
  title: string
  description: string
  icon?: ReactNode
  action?: PageHeaderProps['primaryAction']
  className?: string
}) {
  return (
    <PageHeader
      title={title}
      description={description}
      icon={icon}
      primaryAction={action}
      className={className}
    />
  )
}

export function MobileOptimizedPageHeader({
  title,
  description,
  primaryAction,
  secondaryActions = [],
  className = ''
}: Omit<PageHeaderProps, 'icon'>) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">{description}</p>
      </div>
      
      {(primaryAction || secondaryActions.length > 0) && (
        <div className="flex flex-col sm:flex-row gap-2">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              variant={primaryAction.variant || 'default'}
              disabled={primaryAction.disabled}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          )}
          
          {secondaryActions.length > 0 && (
            <div className="flex gap-2">
              {secondaryActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || 'outline'}
                  disabled={action.disabled}
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-none"
                >
                  {action.icon}
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}