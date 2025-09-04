import React from 'react';
import { 
  FeesSection, 
  PaymentDetailsSection, 
  PaymentSecuritySection, 
  CustomerDetails,
  AutomaticTaxCalculation, 
  Receipts,
  RelatedPayments,
  EventsLogsSection
} from "../components";
import { PaymentMethodSection } from "../../components";
import { TimelineSection } from "../../components/Timeline";
import { RiskScore } from "../../components";
import { RISK_CHECKS } from "../constants/payment-data";

export interface SectionConfig {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  alwaysExpanded?: boolean;
  supportsExpansion?: boolean;
  props?: Record<string, unknown>;
}

export const PAYMENT_SECTIONS: SectionConfig[] = [
  {
    key: 'timeline',
    component: TimelineSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'fees',
    component: FeesSection,
    supportsExpansion: true
  },
  {
    key: 'paymentDetails',
    component: PaymentDetailsSection,
    supportsExpansion: true
  },
  {
    key: 'paymentMethod',
    component: PaymentMethodSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'paymentSecurity',
    component: PaymentSecuritySection,
    supportsExpansion: true
  },
  {
    key: 'customerDetails',
    component: CustomerDetails,
    supportsExpansion: true
  },
  {
    key: 'relatedPayments',
    component: RelatedPayments,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'automaticTaxCalculation',
    component: AutomaticTaxCalculation,
    supportsExpansion: true
  },
  {
    key: 'riskScore',
    component: RiskScore,
    alwaysExpanded: true,
    supportsExpansion: false,
    props: {
      riskChecks: RISK_CHECKS
    }
  },
  {
    key: 'receipts',
    component: Receipts,
    supportsExpansion: true
  },
  {
    key: 'eventsLogs',
    component: EventsLogsSection,
    alwaysExpanded: true,
    supportsExpansion: false
  }
];

interface RenderSectionsProps {
  sections: {
    isExpanded: (key: string) => boolean;
    toggleSection: (key: string) => void;
  };
  isDetailView?: boolean;
  transactionData?: any;
}

export function renderPaymentSections({ sections, isDetailView = false, transactionData }: RenderSectionsProps) {
  return PAYMENT_SECTIONS.map(({ key, component: Component, supportsExpansion, props: sectionProps = {} }) => {
    const props: Record<string, unknown> = { ...sectionProps };
    
    // Pass transaction data to components when available
    if (transactionData) {
      props.transactionData = transactionData;
    }
    
    if (isDetailView) {
      if (supportsExpansion) {
        props.isExpanded = true;
        props.onToggle = () => {}; // No-op for detail view
        props.isDetailView = true;
      } else {
        props.isDetailView = true;
      }
    } else if (supportsExpansion) {
      props.isExpanded = sections.isExpanded(key);
      props.onToggle = () => sections.toggleSection(key);
    }

    return <Component key={key} {...props} />;
  });
}
