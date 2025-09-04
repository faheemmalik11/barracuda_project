import React from 'react';
import { 
  InventoryHeaderSection,
  CardsSection, 
  ActivitySection,
  HardwareSection,
  LocationSection,
  MaintenanceSection,
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

// Base sections that all inventory items have
const BASE_SECTIONS: SectionConfig[] = [
  {
    key: 'header',
    component: InventoryHeaderSection,
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
    key: 'hardware',
    component: HardwareSection,
    supportsExpansion: true
  },
  {
    key: 'location',
    component: LocationSection,
    supportsExpansion: true
  },
  {
    key: 'maintenance',
    component: MaintenanceSection,
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

// All inventory items use the same sections for now
export const INVENTORY_SECTIONS: SectionConfig[] = BASE_SECTIONS;

interface RenderSectionsProps {
  sections: {
    isExpanded: (key: string) => boolean;
    toggleSection: (key: string) => void;
  };
  isDetailView?: boolean;
  inventoryData?: any;
}

export function renderInventorySections({ 
  sections, 
  isDetailView = false, 
  inventoryData 
}: RenderSectionsProps) {
  return INVENTORY_SECTIONS.map(({ key, component: Component, supportsExpansion, props: sectionProps = {} }) => {
    const props: Record<string, unknown> = { ...sectionProps };
    
    // Pass inventory data to components when available
    if (inventoryData) {
      props.inventoryData = inventoryData;
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
