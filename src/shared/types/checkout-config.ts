export type BorderStyleOption = 'rounded' | 'sharp' | 'pill';

/**
 * Configuration interface for checkout page customization
 */
export interface CheckoutConfig {
  id?: string;
  accountId: number;
  email: string;
  primaryColor: string;
  backgroundColor: string;
  borderStyle: BorderStyleOption;
  allowBillingAddress: boolean;
  allowSaveCard: boolean;
  allowTaxSupport: boolean;
  taxPercentage: number | null;
  allowContactInformation: boolean;
  allowAddressAutocomplete: boolean;
  allowTermsAccepted: boolean;
  allowShippingDetails: boolean;
  allowQuantityChange: boolean;
  cartItems: string;
  termsUrl: string;
  privacyUrl: string;
  created?: string;
  updated?: string;
}

export const defaultCheckoutConfig: Partial<CheckoutConfig> = {
  email: '',
  primaryColor: '#4285F4',
  backgroundColor: '#FFFFFF',
  borderStyle: 'rounded',
  allowBillingAddress: true,
  allowSaveCard: true,
  allowTaxSupport: false,
  taxPercentage: null,
  allowContactInformation: true,
  allowAddressAutocomplete: true,
  allowTermsAccepted: false,
  allowShippingDetails: false,
  allowQuantityChange: true,
  cartItems: '[]',
  termsUrl: '',
  privacyUrl: '',
};
