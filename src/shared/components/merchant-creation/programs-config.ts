import { Program, Product } from "@shared/types/merchant";

export const programs: Program[] = [
  { 
    id: 'standard', 
    name: 'Standard Program', 
    capabilities: ['Payments', 'Payouts', 'Disputes', 'KYC'] 
  },
  { 
    id: 'express', 
    name: 'Express Program', 
    capabilities: ['Payments', 'Quick Setup'] 
  },
  { 
    id: 'custom', 
    name: 'Custom Program', 
    capabilities: ['Payments', 'Payouts', 'Advanced KYC', 'Risk Management'] 
  }
];

export const products: Record<string, Product[]> = {
  standard: [
    { 
      id: 'basic', 
      name: 'Basic Payment Processing', 
      description: 'Simple payment processing with standard features' 
    },
    { 
      id: 'advanced', 
      name: 'Advanced Processing', 
      description: 'Full payment processing with additional features' 
    }
  ],
  express: [
    { 
      id: 'quick', 
      name: 'Quick Start', 
      description: 'Fast setup for immediate processing' 
    }
  ],
  custom: [
    { 
      id: 'enterprise', 
      name: 'Enterprise Solution', 
      description: 'Fully customizable enterprise-grade solution' 
    }
  ]
};

// Helper functions
export const getProgramById = (id: string): Program | undefined => {
  return programs.find(program => program.id === id);
};

export const getProductsByProgramId = (programId: string): Product[] => {
  return products[programId] || [];
};
