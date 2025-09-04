import React from 'react';
import { CreditCard, DollarSign, Building2 } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import type { PaymentMethodIconProps } from './types';

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ type, className }) => {
  switch (type.toLowerCase()) {
    case 'visa':
      return (
        <div className={cn('bg-blue-600 text-white rounded px-1 py-0.5 text-xs font-bold leading-none', className)}>
          VISA
        </div>
      );
    
    case 'mastercard':
      return (
        <div className={cn('bg-red-600 text-white rounded px-1 py-0.5 text-xs font-bold leading-none', className)}>
          MC
        </div>
      );
    
    case 'amex':
      return (
        <div className={cn('bg-blue-800 text-white rounded px-1 py-0.5 text-xs font-bold leading-none', className)}>
          AMEX
        </div>
      );
    
    case 'discover':
      return (
        <div className={cn('bg-orange-600 text-white rounded px-1 py-0.5 text-xs font-bold leading-none', className)}>
          DISC
        </div>
      );
    
    case 'usd-cash':
      return (
        <div className={cn('bg-green-100 text-green-800 rounded p-0.5', className)}>
          <DollarSign className="w-3 h-3" />
        </div>
      );
    
    case 'bank-transfer':
      return (
        <div className={cn('bg-gray-100 text-gray-800 rounded p-0.5', className)}>
          <Building2 className="w-3 h-3" />
        </div>
      );
    
    case 'paypal':
      return (
        <div className={cn('bg-blue-500 text-white rounded px-1 py-0.5 text-xs font-bold leading-none', className)}>
          PP
        </div>
      );
    
    default:
      return (
        <div className={cn('bg-gray-100 text-gray-800 rounded p-0.5', className)}>
          <CreditCard className="w-3 h-3" />
        </div>
      );
  }
};