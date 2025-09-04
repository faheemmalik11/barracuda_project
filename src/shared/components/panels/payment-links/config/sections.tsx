import React from 'react';
import { 
  PaymentLinkHeaderSection,
  PaymentLinkCardsSection, 
  PaymentLinkActivitySection,
  PaymentLinkProductSection,
  PaymentLinkProfileSection,
  PaymentLinkMediaSection,
  PaymentLinkRiskSection,
  PaymentLinkConfigurationSection,
  PaymentLinkEventsLogsSection
} from "../components";

export interface SectionConfig {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  alwaysExpanded?: boolean;
  supportsExpansion?: boolean;
  props?: Record<string, unknown>;
}

// Base sections that all payment links have
const BASE_SECTIONS: SectionConfig[] = [
  {
    key: 'header',
    component: PaymentLinkHeaderSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'cards',
    component: PaymentLinkCardsSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'activity',
    component: PaymentLinkActivitySection,
    alwaysExpanded: false,
    supportsExpansion: true
  },
  {
    key: 'product',
    component: PaymentLinkProductSection,
    alwaysExpanded: false,
    supportsExpansion: true
  },
  {
    key: 'profile',
    component: PaymentLinkProfileSection,
    alwaysExpanded: false,
    supportsExpansion: true
  },
  {
    key: 'media',
    component: PaymentLinkMediaSection,
    alwaysExpanded: false,
    supportsExpansion: true
  },
  {
    key: 'risk',
    component: PaymentLinkRiskSection,
    alwaysExpanded: false,
    supportsExpansion: true
  },
  {
    key: 'configuration',
    component: PaymentLinkConfigurationSection,
    alwaysExpanded: false,
    supportsExpansion: true
  },
  {
    key: 'events',
    component: PaymentLinkEventsLogsSection,
    alwaysExpanded: false,
    supportsExpansion: true
  }
];

export function getPaymentLinkSections(): SectionConfig[] {
  return BASE_SECTIONS;
}

export function renderPaymentLinkSections(
  paymentLink: any,
  expandedSections: Set<string>,
  toggleSection: (sectionKey: string) => void,
  entityConfig: any
) {
  const sections = getPaymentLinkSections();
  
  return sections.map((section) => {
    const SectionComponent = section.component;
    
    return (
      <SectionComponent
        key={section.key}
        paymentLink={paymentLink}
      />
    );
  });
}
