import type { FilterOption } from "@shared/types/filters"
import type { StatusFilterItem, StatusMappings } from '@shared/types/status-filter.types'

const STATUS_REGISTRY = {
  payment: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'succeeded', label: 'Succeeded' },
      { value: 'refunded', label: 'Refunded' },
      { value: 'disputed', label: 'Disputed' },
      { value: 'failed', label: 'Failed' },
      { value: 'uncaptured', label: 'Uncaptured' },
    ] as const,
    options: [
      { value: 'succeeded', label: 'Succeeded', color: 'success' },
      { value: 'approved', label: 'Approved', color: 'success' },
      { value: 'verified', label: 'Verified', color: 'success' },
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'processing', label: 'Processing', color: 'pending' },
      { value: 'pending', label: 'Pending', color: 'pending' },
      { value: 'processing_partial_capture', label: 'Processing (Partial Capture)', color: 'pending' },
      { value: 'paying_out', label: 'Paying Out', color: 'pending' },
      { value: 'partially_paid', label: 'Partially Paid', color: 'warning' },
      { value: 'refunded', label: 'Refunded', color: 'info' },
      { value: 'refund_processing', label: 'Refund Processing', color: 'pending' },
      { value: 'refund_declined', label: 'Refund Declined', color: 'error' },
      { value: 'refund_blocked', label: 'Refund Blocked', color: 'error' },
      { value: 'sending_for_refund', label: 'Sending for Refund', color: 'pending' },
      { value: 'refund_denied', label: 'Refund Denied', color: 'error' },
      { value: 'partially_refunded', label: 'Partially Refunded', color: 'warning' },
      { value: 'refund_failed', label: 'Refund Failed', color: 'error' },
      { value: 'disputed', label: 'Disputed', color: 'error' },
      { value: 'failed', label: 'Failed', color: 'error' },
      { value: 'declined', label: 'Declined', color: 'error' },
      { value: 'canceled', label: 'Canceled', color: 'error' },
      { value: 'blocked', label: 'Blocked', color: 'error' },
      { value: 'expired', label: 'Expired', color: 'error' },
      { value: 'default', label: 'Default', color: 'neutral' },
    ] as const,
    mappings: {
      all: [],
      succeeded: ['succeeded', 'processing_partial_capture', 'paying_out', 'partially_paid'],
      refunded: ['refund_processing', 'refund_declined', 'refund_failed', 'refund_blocked', 'sending_for_refund', 'refunded', 'partially_refunded', 'refund_denied'],
      disputed: ['disputed'],
      failed: ['canceled', 'blocked', 'failed', 'declined', 'partially_canceled', 'expired', 'denied'],
      uncaptured: ['processing_partial_capture', 'partially_paid'],
    } as const
  },
  
  merchant: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'risky', label: 'Risky' },
      { value: 'restricted', label: 'Restricted' },
      { value: 'soon_restricted', label: 'Soon Restricted' },
      { value: 'rejected', label: 'Rejected' },
      { value: 'terminated', label: 'Terminated' },
      { value: 'accounts_to_review', label: 'Accounts to review' },
      { value: 'rule_match', label: 'Rule Match' },
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'risky', label: 'Risky', color: 'warning' },
      { value: 'restricted', label: 'Restricted', color: 'error' },
      { value: 'soon_restricted', label: 'Soon Restricted', color: 'warning' },
      { value: 'rejected', label: 'Rejected', color: 'error' },
      { value: 'terminated', label: 'Terminated', color: 'error' },
      { value: 'accounts_to_review', label: 'Accounts to review', color: 'warning' },
      { value: 'rule_match', label: 'Rule Match', color: 'warning' },
      { value: 'expired', label: 'Expired', color: 'error' },
      { value: 'default', label: 'Default', color: 'neutral' },
    ] as const,
    mappings: {
      all: [],
      active: ['active'],
      risky: ['risky'],
      restricted: ['restricted'],
      soon_restricted: ['soon_restricted'],
      rejected: ['rejected'],
      terminated: ['terminated'],
      accounts_to_review: ['accounts_to_review'],
      rule_match: ['rule_match'],
    } as const
  },
  
  customer: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'risky', label: 'Risky' },
      { value: 'in_review', label: 'In Review' },
      { value: 'restricted', label: 'Restricted' },
      { value: 'terminated', label: 'Terminated' },
    ] as const,
    options: [
      // Customer account statuses
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'risky', label: 'Risky', color: 'warning' },
      { value: 'in_review', label: 'In Review', color: 'pending' },
      { value: 'pending_review', label: 'Pending Review', color: 'pending' },
      { value: 'restricted', label: 'Restricted', color: 'error' },
      { value: 'suspended', label: 'Suspended', color: 'error' },
      { value: 'terminated', label: 'Terminated', color: 'error' },
      { value: 'closed', label: 'Closed', color: 'error' },
      { value: 'expired', label: 'Expired', color: 'error' },
      { value: 'default', label: 'Default', color: 'neutral' },
      // Generic event statuses (shared across entities)
      { value: 'succeeded', label: 'Succeeded', color: 'success' },
      { value: 'approved', label: 'Approved', color: 'success' },
      { value: 'verified', label: 'Verified', color: 'success' },
      { value: 'processing', label: 'Processing', color: 'pending' },
      { value: 'pending', label: 'Pending', color: 'pending' },
      { value: 'failed', label: 'Failed', color: 'error' },
    ] as const,
    mappings: {
      all: ['active', 'risky', 'in_review', 'restricted', 'terminated', 'pending', 'succeeded', 'approved', 'verified', 'processing', 'failed'],
      active: ['active', 'succeeded', 'approved', 'verified'],
      risky: ['risky'],
      in_review: ['in_review', 'pending_review', 'processing', 'pending'],
      restricted: ['restricted', 'suspended'],
      terminated: ['terminated', 'closed', 'failed'],
    } as const
  },
  
  refund: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'succeeded', label: 'Succeeded' },
      { value: 'failed', label: 'Failed' },
      { value: 'canceled', label: 'Canceled' },
    ] as const,
    options: [
      { value: 'pending', label: 'Pending', color: 'warning' },
      { value: 'succeeded', label: 'Succeeded', color: 'success' },
      { value: 'failed', label: 'Failed', color: 'error' },
      { value: 'canceled', label: 'Canceled', color: 'error' },
    ] as const,
    mappings: {
      all: ['pending', 'succeeded', 'failed', 'canceled'],
      pending: ['pending', 'processing'],
      succeeded: ['succeeded', 'completed'],
      failed: ['failed', 'declined'],
      canceled: ['canceled', 'voided'],
    } as const
  },
  
  dispute: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'open', label: 'Open' },
      { value: 'under_review', label: 'Under Review' },
      { value: 'won', label: 'Won' },
      { value: 'lost', label: 'Lost' },
    ] as const,
    options: [
      { value: 'open', label: 'Open', color: 'warning' },
      { value: 'under_review', label: 'Under Review', color: 'pending' },
      { value: 'won', label: 'Won', color: 'success' },
      { value: 'lost', label: 'Lost', color: 'error' },
    ] as const,
    mappings: {
      all: ['open', 'under_review', 'won', 'lost'],
      open: ['open', 'needs_response'],
      under_review: ['under_review', 'processing'],
      won: ['won', 'accepted'],
      lost: ['lost', 'warning_closed'],
    } as const
  },
  
  order: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'canceled', label: 'Canceled' },
    ] as const,
    options: [
      { value: 'pending', label: 'Pending', color: 'warning' },
      { value: 'confirmed', label: 'Confirmed', color: 'info' },
      { value: 'shipped', label: 'Shipped', color: 'pending' },
      { value: 'delivered', label: 'Delivered', color: 'success' },
      { value: 'completed', label: 'Completed', color: 'success' },
      { value: 'canceled', label: 'Canceled', color: 'error' },
    ] as const,
    mappings: {
      all: ['pending', 'confirmed', 'shipped', 'delivered', 'completed', 'canceled'],
      pending: ['pending', 'processing'],
      confirmed: ['confirmed', 'accepted'],
      shipped: ['shipped', 'in_transit'],
      delivered: ['delivered', 'completed'],
      canceled: ['canceled', 'voided'],
    } as const
  },
  
  terminal: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'offline', label: 'Offline' },
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'inactive', label: 'Inactive', color: 'warning' },
      { value: 'offline', label: 'Offline', color: 'error' },
    ] as const,
    mappings: {
      all: ['active', 'inactive', 'offline'],
      active: ['active', 'online'],
      inactive: ['inactive', 'disabled'],
      offline: ['offline', 'disconnected'],
    } as const
  },
  
  product: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'draft', label: 'Draft' },
      { value: 'archived', label: 'Archived' },
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'draft', label: 'Draft', color: 'warning' },
      { value: 'archived', label: 'Archived', color: 'error' },
    ] as const,
    mappings: {
      all: ['active', 'draft', 'archived'],
      active: ['active', 'published'],
      draft: ['draft', 'unpublished'],
      archived: ['archived', 'deleted'],
    } as const
  },

  subscription: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'trialing', label: 'Trialing' },
      { value: 'past_due', label: 'Past Due' },
      { value: 'canceled', label: 'Canceled' }
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'trialing', label: 'Trialing', color: 'info' },
      { value: 'past_due', label: 'Past due', color: 'warning' },
      { value: 'canceled', label: 'Canceled', color: 'error' }
    ] as const,
    mappings: {
      all: ['active', 'trialing', 'past_due', 'canceled'],
      active: ['active'],
      trialing: ['trialing'],
      past_due: ['past_due'],
      canceled: ['canceled']
    } as const
  },

  invoice: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'paid', label: 'Paid' },
      { value: 'open', label: 'Open' },
      { value: 'overdue', label: 'Overdue' },
      { value: 'draft', label: 'Draft' }
    ] as const,
    options: [
      { value: 'paid', label: 'Paid', color: 'success' },
      { value: 'open', label: 'Open', color: 'info' },
      { value: 'overdue', label: 'Overdue', color: 'error' },
      { value: 'draft', label: 'Draft', color: 'neutral' }
    ] as const,
    mappings: {
      all: ['paid', 'open', 'overdue', 'draft'],
      paid: ['paid'],
      open: ['open'],
      overdue: ['overdue'],
      draft: ['draft']
    } as const
  },

  credit_grant: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'expired', label: 'Expired' }
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'pending', label: 'Pending', color: 'warning' },
      { value: 'expired', label: 'Expired', color: 'error' }
    ] as const,
    mappings: {
      all: ['active', 'pending', 'expired'],
      active: ['active'],
      pending: ['pending'],
      expired: ['expired']
    } as const
  },

  priority: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ] as const,
    options: [
      { value: 'high', label: 'High', color: 'error' },
      { value: 'medium', label: 'Medium', color: 'warning' },
      { value: 'low', label: 'Low', color: 'info' }
    ] as const,
    mappings: {
      all: ['high', 'medium', 'low'],
      high: ['high'],
      medium: ['medium'],
      low: ['low']
    } as const
  },

  quote: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'accepted', label: 'Accepted' },
      { value: 'open', label: 'Open' },
      { value: 'declined', label: 'Declined' },
      { value: 'draft', label: 'Draft' },
      { value: 'expired', label: 'Expired' }
    ] as const,
    options: [
      { value: 'accepted', label: 'Accepted', color: 'success' },
      { value: 'open', label: 'Open', color: 'info' },
      { value: 'declined', label: 'Declined', color: 'error' },
      { value: 'draft', label: 'Draft', color: 'neutral' },
      { value: 'expired', label: 'Expired', color: 'neutral' }
    ] as const,
    mappings: {
      all: ['accepted', 'open', 'declined', 'draft', 'expired'],
      accepted: ['accepted'],
      open: ['open'],
      declined: ['declined'],
      draft: ['draft'],
      expired: ['expired']
    } as const
  },

  member: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
      { value: 'suspended', label: 'Suspended' }
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'inactive', label: 'Inactive', color: 'neutral' },
      { value: 'pending', label: 'Pending', color: 'warning' },
      { value: 'suspended', label: 'Suspended', color: 'error' }
    ] as const,
    mappings: {
      all: ['active', 'inactive', 'pending', 'suspended'],
      active: ['active'],
      inactive: ['inactive'],
      pending: ['pending'],
      suspended: ['suspended']
    } as const
  },

  ecommerce: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'inactive', label: 'Inactive', color: 'neutral' }
    ] as const,
    mappings: {
      all: ['active', 'inactive'],
      active: ['active'],
      inactive: ['inactive']
    } as const
  },

  inventory: {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'inactive', label: 'Inactive', color: 'neutral' },
      { value: 'pending', label: 'Pending', color: 'warning' }
    ] as const,
    mappings: {
      all: ['active', 'inactive', 'pending'],
      active: ['active', 'online'],
      inactive: ['inactive', 'offline'],
      pending: ['pending', 'processing']
    } as const
  },

  'payment-link': {
    filters: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'expired', label: 'Expired' }
    ] as const,
    options: [
      { value: 'active', label: 'Active', color: 'success' },
      { value: 'inactive', label: 'Inactive', color: 'neutral' },
      { value: 'expired', label: 'Expired', color: 'error' }
    ] as const,
    mappings: {
      all: ['active', 'inactive', 'expired'],
      active: ['active'],
      inactive: ['inactive'],
      expired: ['expired']
    } as const
  }
} as const

// Extract entity types from the registry for type safety
type EntityType = keyof typeof STATUS_REGISTRY

// === PUBLIC API ===

export const StatusRegistry = {
  getFilters: (entityType: EntityType): readonly StatusFilterItem[] => {
    return STATUS_REGISTRY[entityType].filters
  },

  getOptions: (entityType: EntityType): readonly FilterOption[] => {
    return STATUS_REGISTRY[entityType].options
  },

  getMappings: (entityType: EntityType): StatusMappings => {
    return STATUS_REGISTRY[entityType].mappings
  },

  getAllEntries: () => STATUS_REGISTRY,

  getEntityTypes: (): EntityType[] => {
    return Object.keys(STATUS_REGISTRY) as EntityType[]
  }
} as const

export { STATUS_REGISTRY }
export type { EntityType }