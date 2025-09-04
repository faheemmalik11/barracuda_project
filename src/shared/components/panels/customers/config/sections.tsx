import React from 'react';
import { TimelineSection } from "../../components/Timeline";
import { TIMELINE_EVENTS_DATA, CUSTOMER_RISK_CHECKS, CUSTOMER_PAYMENT_METHODS } from "../constants/customer-data";
import { getTimelineIcon } from "../../components/Timeline";
import { ProfileSection, SubscriptionsSection, TransactionsSection, InvoicesSection, PendingInvoiceItemsSection, CreditGrantsSection, OrdersSection, QuotesSection, EventsLogsSection, InvoiceBalanceSection, BalanceSection } from "../components";
import { RiskScore, PaymentMethodSection } from "../../components";

export interface SectionConfig {
  key: string;
  component: React.ComponentType<any>;
  alwaysExpanded?: boolean;
  supportsExpansion?: boolean;
  props?: Record<string, unknown>;
}

export const CUSTOMER_SECTIONS: SectionConfig[] = [
  {
    key: 'balance',
    component: BalanceSection,
    alwaysExpanded: true,
    supportsExpansion: true
  },
  {
    key: 'timeline',
    component: TimelineSection,
    alwaysExpanded: true,
    supportsExpansion: false,
    props: {
      events: TIMELINE_EVENTS_DATA.map(event => ({
        ...event,
        iconConfig: getTimelineIcon(event.iconType || 'default')
      }))
    }
  },
  {
    key: 'profile',
    component: ProfileSection,
    supportsExpansion: true
  },
  {
    key: 'invoiceBalance',
    component: InvoiceBalanceSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'subscriptions',
    component: SubscriptionsSection,
    alwaysExpanded: true
  },
  {
    key: 'transactions',
    component: TransactionsSection,
    alwaysExpanded: true
  },
  {
    key: 'invoices',
    component: InvoicesSection,
    alwaysExpanded: true
  },
  {
    key: 'pending-invoice-items',
    component: PendingInvoiceItemsSection,
    alwaysExpanded: true
  },
  {
    key: 'credit-grants',
    component: CreditGrantsSection,
    alwaysExpanded: true
  },
  {
    key: 'orders',
    component: OrdersSection,
    alwaysExpanded: true
  },
  {
    key: 'quotes',
    component: QuotesSection,
    alwaysExpanded: true
  },
  {
    key: 'riskScore',
    component: RiskScore,
    alwaysExpanded: true,
    supportsExpansion: false,
    props: {
      riskChecks: CUSTOMER_RISK_CHECKS
    }
  },
  {
    key: 'paymentMethod',
    component: PaymentMethodSection,
    alwaysExpanded: true,
    supportsExpansion: false,
    props: {
      methods: CUSTOMER_PAYMENT_METHODS
    }
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
}

export function renderCustomerSections({ sections, isDetailView = false }: RenderSectionsProps) {
  return CUSTOMER_SECTIONS.map(({ key, component: Component, supportsExpansion, alwaysExpanded, props: sectionProps = {} }) => {
    const props: Record<string, unknown> = { ...sectionProps };
    
    if (isDetailView) {
      props.isDetailView = true;
      if (supportsExpansion) {
        props.isExpanded = true;
        props.onToggle = () => {};
      }
    } else if (supportsExpansion && !alwaysExpanded) {
      props.isExpanded = sections.isExpanded(key);
      props.onToggle = () => sections.toggleSection(key);
    }

    return <Component key={key} {...props} />;
  });
}
