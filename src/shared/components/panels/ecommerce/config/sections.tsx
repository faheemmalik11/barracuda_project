import React from 'react';
import { 
  HeaderSection,
  CardsSection, 
  ActivitySection,
  ProfileSection,
  RiskSection,
  ConfigurationSection,
  EventsLogsSection,
  PaymentForSection,
  MediaSection,
  VisualSection
} from "../components";

export interface SectionConfig {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  alwaysExpanded?: boolean;
  supportsExpansion?: boolean;
  props?: Record<string, unknown>;
}

// Base sections that all ecommerce types have
const BASE_SECTIONS: SectionConfig[] = [
  {
    key: 'header',
    component: HeaderSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'cards',
    component: CardsSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'activity',
    component: ActivitySection,
    supportsExpansion: true
  },
  {
    key: 'profile',
    component: ProfileSection,
    supportsExpansion: true
  },
  {
    key: 'risk',
    component: RiskSection,
    supportsExpansion: true
  },
  {
    key: 'configuration',
    component: ConfigurationSection,
    supportsExpansion: true
  },
  {
    key: 'eventsLogs',
    component: EventsLogsSection,
    alwaysExpanded: true,
    supportsExpansion: false
  }
];

// Type-specific section configurations
export const ECOMMERCE_SECTIONS: Record<string, SectionConfig[]> = {
  link: [
    ...BASE_SECTIONS.slice(0, 3), // header, cards, activity
    {
      key: 'paymentFor',
      component: PaymentForSection,
      supportsExpansion: true
    },
    ...BASE_SECTIONS.slice(3, 4), // profile
    {
      key: 'media',
      component: MediaSection,
      supportsExpansion: true
    },
    ...BASE_SECTIONS.slice(4) // risk, configuration, eventsLogs
  ],
  hosted_checkout: [
    ...BASE_SECTIONS.slice(0, 4), // header, cards, activity, profile
    {
      key: 'visual',
      component: VisualSection,
      supportsExpansion: true
    },
    ...BASE_SECTIONS.slice(4) // risk, configuration, eventsLogs
  ],
  api: BASE_SECTIONS,
  drops: [
    ...BASE_SECTIONS.slice(0, 4), // header, cards, activity, profile
    {
      key: 'visual',
      component: VisualSection,
      supportsExpansion: true
    },
    ...BASE_SECTIONS.slice(4) // risk, configuration, eventsLogs
  ],
  elements: [
    ...BASE_SECTIONS.slice(0, 4), // header, cards, activity, profile
    {
      key: 'visual',
      component: VisualSection,
      supportsExpansion: true
    },
    ...BASE_SECTIONS.slice(4) // risk, configuration, eventsLogs
  ]
};

interface RenderSectionsProps {
  ecommerceType: string;
  sections: {
    isExpanded: (key: string) => boolean;
    toggleSection: (key: string) => void;
  };
  isDetailView?: boolean;
  ecommerceData?: any;
}

export function renderEcommerceSections({ 
  ecommerceType, 
  sections, 
  isDetailView = false, 
  ecommerceData 
}: RenderSectionsProps) {
  const typeSections = ECOMMERCE_SECTIONS[ecommerceType] || ECOMMERCE_SECTIONS.api;
  
  return typeSections.map(({ key, component: Component, supportsExpansion, props: sectionProps = {} }) => {
    const props: Record<string, unknown> = { ...sectionProps };
    
    // Pass ecommerce data to components when available
    if (ecommerceData) {
      props.ecommerceData = ecommerceData;
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
