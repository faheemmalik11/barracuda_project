// Public API for the members feature

// Components
export { MemberHeader } from './components/MemberHeader'
export { MemberTable } from './components/MemberTable'

// Pages (for routing)
export { MembersListPage } from './pages/MembersListPage'

// Types (if needed by other features)
export type { 
  Member,
  MemberStatus,
  MembershipPlan
} from './types/members.types'

// Don't export internal implementation details