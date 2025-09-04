import { LucideIcon } from 'lucide-react';

export type IconSize = 'sm' | 'md' | 'lg';

export interface TimelineIconConfig {
  icon: LucideIcon;
  backgroundColor: string;
  iconColor: string;
  borderColor?: string;
  size?: IconSize;
  outline?: boolean;
}

export interface BaseTimelineEvent {
  id?: string;
  title: string;
  timestamp: string;
  iconConfig?: TimelineIconConfig;
  details?: Array<{
    action: string;
    timestamp: string;
  }>;
}