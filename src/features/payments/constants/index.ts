export const PAYMENT_TRANSACTION_TYPES = {
  ESTIMATED_AUTHORIZATION: 'EstimatedAuthorization',
  VERIFICATION: 'Verification',
  REVERSAL: 'Reversal',
  RESUBMISSION: 'Resubmission',
  REFUND: 'Refund',
  CAPTURE: 'Capture',
  CHARGEBACK: 'Chargeback',
  ADJUSTMENT: 'Adjustment',
} as const