import { Panel } from '../components'
// import { Terminal } from '@features/in-stores/types/terminal.types'
import { convertTerminalToTerminalInfo } from '@shared/utils/terminal-converters.ts'
import { useTerminalDetails } from './hooks/useTerminalDetails'
import { EntityStatusPanel } from '../components/StatusPanel'
import { TERMINAL_CONFIG, TerminalMetadata, TerminalActionsWrapper } from '../config/entity-configs'
import { ScrollableContent } from '../components'
import { renderTerminalSections } from './config/sections'

interface TerminalDetailsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  terminal: any | null
  onBack?: () => void
  onOpenFullDetails?: () => void
  totalItems: number
  navigatePrevious?: () => void
  navigateNext?: () => void
  canNavigatePrevious?: boolean
  canNavigateNext?: boolean
}

export function TerminalDetailsPanel({
  open,
  onOpenChange,
  terminal,
  onBack,
  onOpenFullDetails,
  totalItems,
  navigatePrevious,
  navigateNext,
  canNavigatePrevious,
  canNavigateNext
}: TerminalDetailsPanelProps) {
  // Configuration for terminal details sections
  useTerminalDetails({
    activity: true,
    hardware: true,
    connectivity: true,
    configuration: true,
  })

  // Use section states for collapsible sections - simplified for now
  const sectionStates = {
    isExpanded: () => true,
    toggleSection: () => {}
  }

  if (!terminal) {
    return (
      <Panel id="terminal-details" open={open}>
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No terminal selected
        </div>
      </Panel>
    )
  }

  return (
    <Panel id="terminal-details" open={open}>
      <div className="h-full flex flex-col bg-muted">
        <ScrollableContent ariaLabel="Terminal details content">
          <EntityStatusPanel
            entityInfo={convertTerminalToTerminalInfo(terminal)}
            config={TERMINAL_CONFIG}
            metadataComponent={TerminalMetadata}
            actionsComponent={TerminalActionsWrapper}
            onBack={onBack ?? (() => onOpenChange(false))}
            currentEntityId={terminal.id}
            onOpenFullDetails={onOpenFullDetails}
            totalItems={totalItems}
            navigatePrevious={navigatePrevious}
            navigateNext={navigateNext}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
          />

          {renderTerminalSections({ 
            sections: sectionStates,
            terminalData: terminal
          })}
        </ScrollableContent>
      </div>
    </Panel>
  )
}
