import { memo, useMemo } from "react"
import type { VariantProps } from "class-variance-authority"
import { StatusBadge } from "@shared/components/ui/status-badge/StatusBadge"
import { StatusRegistry } from "@shared/lib/filters/status-registry"
import type { statusVariants, StatusBadgeConfig } from "@shared/components/ui/status-badge/variants"

// Generic badge props for non-status use cases
interface GenericBadgeProps {
  variant: 'generic'
  text: string
  color?: VariantProps<typeof statusVariants>["variant"]
  size?: VariantProps<typeof statusVariants>["size"]
  onClick?: () => void
}

// Status badge props for entity-aware use cases
interface StatusBadgeProps {
  variant?: 'status'
  entityType: string
  status: string
  size?: VariantProps<typeof statusVariants>["size"]
  onClick?: (status: string) => void
}

type AppStatusBadgeProps = GenericBadgeProps | StatusBadgeProps

export const AppStatusBadge = memo<AppStatusBadgeProps>((props) => {
  // Move all hooks to top level to satisfy rules-of-hooks
  const isGeneric = props.variant === 'generic'
  
  // Generic variant props
  const genericProps = isGeneric ? props : null
  const genericText = genericProps?.text || ''
  const genericColor = genericProps?.color || 'neutral'
  const genericOnClick = genericProps?.onClick
  
  // Status variant props
  const statusProps = !isGeneric ? props : null
  const entityType = statusProps?.entityType || 'payment'
  const status = statusProps?.status || ''
  
  // Memoized configs - called at top level
  const genericConfig = useMemo(() => {
    if (!isGeneric) return {}
    return {
      [genericText]: {
        text: genericText,
        variant: genericColor,
        tooltip: genericText,
        actionable: !!genericOnClick
      } as StatusBadgeConfig
    }
  }, [isGeneric, genericText, genericColor, genericOnClick])
  
  const statusConfig = useMemo(() => {
    if (isGeneric) return {}
    
    const statusOptions = StatusRegistry.getOptions(entityType as any)
    const statusOption = statusOptions.find(option => option.value === status)
    
    if (!statusOption) return {}
    
    return {
      [status]: {
        text: statusOption.label,
        variant: statusOption.color,
        tooltip: `${statusOption.label} status`,
      } as StatusBadgeConfig
    }
  }, [isGeneric, entityType, status])

  // Handle generic badge variant
  if (isGeneric) {
    const { text, size, onClick } = props as GenericBadgeProps
    
    return (
      <StatusBadge
        status={text}
        statusConfig={genericConfig}
        defaultStatus={text}
        size={size}
        onClick={onClick ? () => onClick() : undefined}
      />
    )
  }

  // Handle status badge variant
  const { size, onClick } = props as StatusBadgeProps
  
  return (
    <StatusBadge
      status={status}
      statusConfig={statusConfig}
      defaultStatus="unknown"
      size={size}
      onClick={onClick}
    />
  )
})

AppStatusBadge.displayName = "AppStatusBadge" 
