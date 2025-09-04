/**
 * Enhanced card brand detection with comprehensive brand mapping
 * @param paymentMethod - Payment method string from various sources
 * @returns Standardized card brand display name
 */
export const getCardBrandDisplay = (paymentMethod: string): string => {
  if (typeof paymentMethod !== 'string' || !paymentMethod.trim()) {
    return 'CARD';
  }

  const method = paymentMethod.toLowerCase().trim();

  // Direct brand matching
  const brandMap = {
    visa: 'VISA',
    mastercard: 'MC',
    master: 'MC',
    amex: 'AMEX',
    'american express': 'AMEX',
    discover: 'DISC',
    jcb: 'JCB',
    diners: 'DINERS',
    'diners club': 'DINERS',
    union: 'UNION',
    unionpay: 'UNION',
  };

  // Check for direct matches
  for (const [key, value] of Object.entries(brandMap)) {
    if (method.includes(key)) {
      return value;
    }
  }

  // Fallback for formats like "BRAND •••• 1234" or "BRAND-1234"
  const parts = paymentMethod.split(/[\s•-]+/);
  const firstPart = parts[0]?.trim();
  
  if (firstPart && firstPart.length >= 2 && firstPart.length <= 8 && /^[A-Za-z]+$/.test(firstPart)) {
    return firstPart.toUpperCase();
  }

  return 'CARD';
}; 
