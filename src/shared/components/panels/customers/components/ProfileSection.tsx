import React from 'react';
import { CollapsibleDetailsSection } from '../../components';
import { PROFILE_DETAILS } from '../constants/customer-data';

interface ProfileSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
}

export const ProfileSection = React.memo<ProfileSectionProps>(({ isExpanded, onToggle, isDetailView = false }) => {
  return (
    <CollapsibleDetailsSection
      title="Profile"
      details={PROFILE_DETAILS}
      isExpanded={isExpanded}
      onToggle={onToggle}
      isDetailView={isDetailView}
      emptyMessage="No profile details available"
    />
  );
});

ProfileSection.displayName = 'ProfileSection';