import { cn } from '@shared/lib/utils'
import { usePanelAdjustments } from '../hooks/usePanelAdjustments'

interface PanelInsetProps {
  children: React.ReactNode
  className?: string
  enablePanelPush?: boolean
}

export function PanelInset({ children, className, enablePanelPush = true }: PanelInsetProps) {
  const { right } = usePanelAdjustments()
  
  return (
    <div 
      className={cn('flex flex-1 flex-col', className)}
      style={{
        marginRight: enablePanelPush ? right : '0',
      }}
    >
      {children}
    </div>
  )
}
