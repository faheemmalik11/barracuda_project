// Public API for the settlements feature

// Components
export { SettlementHeader } from './components/SettlementHeader'
export { SettlementTable } from './components/SettlementTable'

// Pages (for routing)
export { SettlementListPage } from './pages/SettlementListPage'

// Types (if needed by other features)
export type { 
  Settlement,
  SettlementStatus,
  SettlementFilters
} from './types/settlements.types'

// Don't export internal implementation details