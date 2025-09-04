export interface PaymentMethodItem {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover' | 'usd-cash' | 'bank-transfer' | 'paypal' | string;
  maskedNumber?: string;
  status?: 'default' | 'expired' | 'active' | string;
  expirationDate?: string;
  cardholderName?: string;
  isExpired: boolean;
  details: PaymentMethodDetail[];
}

export interface PaymentMethodDetail {
  label: string;
  value: string;
  showBadge?: boolean;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  isCopyable?: boolean;
}

export interface PaymentMethodCardProps {
  method: PaymentMethodItem;
  isExpanded: boolean;
  onToggle: () => void;
  onAction: (action: string) => void;
}

export interface PaymentMethodIconProps {
  type: string;
  className?: string;
}

export interface PaymentMethodActionsProps {
  actions: ActionItem[];
  onAction: (action: string) => void;
}

export interface ActionItem {
  id: string;
  label: string;
  variant?: 'default' | 'destructive';
}

export interface PaymentMethodSectionProps {
  methods?: PaymentMethodItem[];
  className?: string;
}