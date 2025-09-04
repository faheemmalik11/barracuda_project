import React from 'react';
import { 
  HeaderSection,
  CardsSection, 
  ActivitySection,
  ProfileSection,
  ConnectivitySection,
  ServicesSection,
  VisualSection,
  IntegrationSection,
  HardwareSection,
  RiskSection,
  ConfigurationSection,
  OrderSection,
  EventsLogsSection
} from "../components";

export interface SectionConfig {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  alwaysExpanded?: boolean;
  supportsExpansion?: boolean;
  props?: Record<string, unknown>;
}

// Terminal sections configuration
const TERMINAL_SECTIONS: SectionConfig[] = [
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
    key: 'connectivity',
    component: ConnectivitySection,
    supportsExpansion: true
  },
  {
    key: 'services',
    component: ServicesSection,
    supportsExpansion: true
  },
  {
    key: 'visual',
    component: VisualSection,
    supportsExpansion: true
  },
  {
    key: 'integration',
    component: IntegrationSection,
    supportsExpansion: true
  },
  {
    key: 'hardware',
    component: HardwareSection,
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
    key: 'order',
    component: OrderSection,
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
  terminalData?: any;
}

export function renderTerminalSections({ 
  sections, 
  isDetailView = false, 
  terminalData 
}: RenderSectionsProps) {
  
  return TERMINAL_SECTIONS.map(({ key, component: Component, supportsExpansion, props: sectionProps = {} }) => {
    const props: Record<string, unknown> = { ...sectionProps };
    
    // Pass terminal data to components when available
    if (terminalData) {
      props.terminalData = terminalData;
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
