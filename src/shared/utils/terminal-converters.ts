import type { Terminal } from '@features/in-stores/types/terminal.types'

export interface TerminalInfo {
  id: string
  title: string
  subtitle: string
  status: string
  amount: number | null
  currency: string | null
  createdAt: string
  metadata: Array<{ label: string; value: string }>
}

export function convertTerminalToTerminalInfo(terminal: Terminal): TerminalInfo {
  return {
    id: terminal.id,
    title: `Terminal ${terminal.id}`,
    subtitle: `${terminal.model} • ${terminal.location}`,
    status: terminal.status,
    amount: null,
    currency: null,
    createdAt: terminal.installDate || new Date().toISOString(),
    metadata: [
      { label: 'Model', value: terminal.model },
      { label: 'Serial', value: terminal.serialNumber },
      { label: 'Status', value: terminal.status },
      { label: 'Store', value: terminal.store }
    ]
  }
}
