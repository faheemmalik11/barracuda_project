import { useEffect } from 'react';
import { useAuthStore } from '@features/auth/hooks/useAuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    // Initialize authentication state on app load
    checkSession();
  }, [checkSession]);

  return <>{children}</>;
}
