import React from 'react';
import { 
  HeaderSection,
  ActivitySection,
  OrderSection
} from "../components";

export interface SectionConfig {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  alwaysExpanded?: boolean;
  supportsExpansion?: boolean;
  props?: Record<string, unknown>;
}

// Base sections that all order items have
const BASE_SECTIONS: SectionConfig[] = [
  {
    key: 'header',
    component: HeaderSection,
    alwaysExpanded: true,
    supportsExpansion: false
  },
  {
    key: 'activity',
    component: ActivitySection,
    supportsExpansion: true
  },
  {
    key: 'order',
    component: OrderSection,
    supportsExpansion: true
  }
];

// All order items use the same sections for now
export const ORDER_SECTIONS: SectionConfig[] = BASE_SECTIONS;

interface RenderSectionsProps {
  sections: {
    isExpanded: (key: string) => boolean;
    toggleSection: (key: string) => void;
  };
  isDetailView?: boolean;
  orderData?: any;
}

export function renderOrderSections({ 
  sections, 
  isDetailView = false, 
  orderData 
}: RenderSectionsProps) {
  return ORDER_SECTIONS.map(({ key, component: Component, supportsExpansion, props: sectionProps = {} }) => {
    const props: Record<string, unknown> = { ...sectionProps };
    
    // Pass order data to components when available
    if (orderData) {
      props.orderData = orderData;
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
