export const COMMON_STATUS_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  RISKY: 'risky', 
  RESTRICTED: 'restricted',
  TERMINATED: 'terminated',
  PENDING: 'pending',
  FAILED: 'failed',
  SUCCEEDED: 'succeeded',
  CANCELED: 'canceled',
  IN_REVIEW: 'in_review',
  UNDER_REVIEW: 'under_review',
} as const

export const REVIEW_STATUSES = [
  COMMON_STATUS_VALUES.IN_REVIEW,
  COMMON_STATUS_VALUES.UNDER_REVIEW,
  'pending_review',
  'accounts_to_review',
] as const

export const END_STATE_STATUSES = [
  COMMON_STATUS_VALUES.TERMINATED,
  'closed',
  'dismissed',
  'withdrawn',
] as const

export const LIMITATION_STATUSES = [
  COMMON_STATUS_VALUES.RESTRICTED,
  'suspended',
  'soon_restricted',
] as const