import { SectionCard } from '@shared/components/panels/components/SectionCard';
import { PanelTable } from '@shared/components/panels/components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { PanelTableColumn } from '@shared/components/panels/components/PanelTable/types';
import type { EventData } from '@shared/types/events.types';
import { SAMPLE_EVENTS } from '../constants/events-data';

interface EventsLogsSectionProps {
  isDetailView?: boolean;
}

const renderEventType = (value: unknown) => (
  <span className="text-primary hover:text-primary/80 cursor-pointer font-medium text-xs">
    {String(value)}
  </span>
);

const renderRequestId = (value: unknown) => (
  <span className="font-mono text-sm">{String(value)}</span>
);

const renderStatus = (_: unknown, item: EventData) => (
  <AppStatusBadge 
    entityType="payment" 
    status={item.status}
    size="sm"
  />
);

export const EventsLogsSection = ({ isDetailView = false }: EventsLogsSectionProps) => {
  const columns: PanelTableColumn<EventData>[] = [
    {
      key: 'eventType',
      label: 'EVENT TYPE',
      width: '20%',
      render: renderEventType
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      width: '30%'
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '15%',
      render: renderStatus
    },
    {
      key: 'timestamp',
      label: 'TIMESTAMP',
      width: '17%'
    },
    {
      key: 'requestId',
      label: 'REQUEST ID',
      width: '18%',
      render: renderRequestId
    }
  ];

  return (
    <SectionCard title="Events & logs" layout="down">
      <PanelTable
        data={SAMPLE_EVENTS}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No events found"
      />
    </SectionCard>
  );
};
