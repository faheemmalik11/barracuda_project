import { cn } from '@shared/lib/utils';

interface FieldGroupProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  spacing?: 'tight' | 'normal' | 'loose';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'w-full',
};

const spacingClasses = {
  tight: 'space-y-3',
  normal: 'space-y-4',
  loose: 'space-y-6',
};

export function FieldGroup({
  children,
  className,
  maxWidth = '2xl',
  spacing = 'normal',
}: FieldGroupProps) {
  return (
    <div 
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </div>
  );
}
