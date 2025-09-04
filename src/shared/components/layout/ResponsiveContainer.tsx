import React, { createContext, useContext, useState, useEffect } from 'react';

interface ResponsiveContextValue {
  isCompact: boolean;
  isTight: boolean;
  isPreviewMode: boolean;
  isExtendedWidth: boolean;
  widthMode: 'normal' | 'extended';
}

const ResponsiveContext = createContext<ResponsiveContextValue>({
  isCompact: false,
  isTight: false,
  isPreviewMode: false,
  isExtendedWidth: false,
  widthMode: 'normal'
});

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveContainer');
  }
  return context;
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  isPreviewMode?: boolean;
  isExtendedWidth?: boolean;
  className?: string;
}

export const ResponsiveContainer = React.memo<ResponsiveContainerProps>(({ 
  children, 
  isPreviewMode = false, 
  isExtendedWidth = false,
  className = '' 
}) => {
  // SSR-safe initial state - only track width since height isn't used
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === 'undefined') {
      return 1024; // Default for SSR
    }
    return window.innerWidth;
  });

  useEffect(() => {
    // Update width on mount (client-side only)
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine responsive breakpoints based on preview mode and width
  const isCompact = isPreviewMode || windowWidth < 768;
  const isTight = windowWidth < 640;
  const widthMode = isExtendedWidth ? 'extended' : 'normal';

  const contextValue: ResponsiveContextValue = {
    isCompact,
    isTight,
    isPreviewMode,
    isExtendedWidth,
    widthMode
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      <div className={className}>
        {children}
      </div>
    </ResponsiveContext.Provider>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';
