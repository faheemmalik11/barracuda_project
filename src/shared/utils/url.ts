/**
 * URL generation utilities for creating shareable links within the application
 */

/**
 * Creates a full absolute URL for a payment details page
 * @param paymentId The payment ID to create URL for
 * @returns Full absolute URL (e.g., "https://domain.com/payments/pay_123456")
 */
export function createPaymentUrl(paymentId: string): string {
  const origin = window.location.origin
  return `${origin}/payments/${paymentId}`
}

/**
 * Creates a full absolute URL for any entity details page
 * @param entityType The entity type (e.g., 'payments', 'customers', 'merchants')
 * @param entityId The entity ID
 * @returns Full absolute URL
 */
export function createEntityUrl(entityType: string, entityId: string): string {
  const origin = window.location.origin
  return `${origin}/${entityType}/${entityId}`
}