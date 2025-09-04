import { Eye, Copy, Settings, Play, Pause } from 'lucide-react'
import type { Ecommerce } from '@features/ecommerce/types/ecommerce.types'

interface EcommerceRowActionsConfig {
  onView?: (ecommerce: Ecommerce) => void
  onCopyId?: (ecommerce: Ecommerce) => void
  onConfigure?: (ecommerce: Ecommerce) => void
  onActivate?: (ecommerce: Ecommerce) => void
  onDeactivate?: (ecommerce: Ecommerce) => void
}

export function getEcommerceRowActions(config: EcommerceRowActionsConfig) {
  const actions = []

  if (config.onView) {
    actions.push({
      label: 'View',
      icon: Eye,
      onClick: config.onView,
    })
  }

  if (config.onCopyId) {
    actions.push({
      label: 'Copy ID',
      icon: Copy,
      onClick: config.onCopyId,
    })
  }

  if (config.onConfigure) {
    actions.push({
      label: 'Configure',
      icon: Settings,
      onClick: config.onConfigure,
    })
  }

  if (config.onActivate) {
    actions.push({
      label: 'Activate',
      icon: Play,
      onClick: config.onActivate,
      condition: (ecommerce: Ecommerce) => ecommerce.status === 'inactive',
    })
  }

  if (config.onDeactivate) {
    actions.push({
      label: 'Deactivate',
      icon: Pause,
      onClick: config.onDeactivate,
      condition: (ecommerce: Ecommerce) => ecommerce.status === 'active',
    })
  }

  return actions
}
