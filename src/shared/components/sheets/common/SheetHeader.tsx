import React from 'react';
import { ArrowLeft, Copy } from 'lucide-react';
import { Button } from '@shared/components/ui/button';

interface SheetHeaderProps {
  title: string;
  entityId: string;
  breadcrumbs: string[];
  onBack: () => void;
  onCopyId: () => void;
  isPreviewMode?: boolean;
  children?: React.ReactNode;
}

export const SheetHeader = React.memo<SheetHeaderProps>(({ 
  title, 
  entityId, 
  breadcrumbs, 
  onBack, 
  onCopyId,
  children 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div>
          <nav className="text-sm text-muted-foreground mb-1">
            {breadcrumbs.join(' > ')}
          </nav>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopyId}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Copy className="h-3 w-3" />
          {entityId}
        </Button>
      </div>
      
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
});

SheetHeader.displayName = 'SheetHeader';
