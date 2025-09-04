import { Building, Mail, User, CreditCard, Eye, Plus, Check, Package } from 'lucide-react';

export const steps = [
  { id: 'program', title: 'Program', icon: Building },
  { id: 'product', title: 'Product', icon: Package },
  { id: 'creation-method', title: 'Application', icon: Mail },
  { id: 'business-type', title: 'Business Type', icon: Building },
  { id: 'business-details', title: 'Business Details', icon: Building },
  { id: 'representative', title: 'Representative', icon: User },
  { id: 'owners', title: 'Business Owners', icon: User },
  { id: 'executives', title: 'Executives', icon: User },
  { id: 'public-details', title: 'Public Details', icon: Eye },
  { id: 'bank-account', title: 'Bank Details', icon: CreditCard },
  { id: 'extras', title: 'Add Extras', icon: Plus },
  { id: 'review', title: 'Review & Submit', icon: Check }
];

export type Step = typeof steps[number];

export const getStepByIndex = (index: number): Step | undefined => {
  return steps[index];
};

export const getStepIndexById = (id: string): number => {
  return steps.findIndex(step => step.id === id);
};
