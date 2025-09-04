import { create } from 'zustand';
import { sessionService } from '@shared/services/session.service';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkSession: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  // Actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // For demo purposes, we'll accept any email/password combination
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Save session
      sessionService.saveSession(email, password);
      
      // Create mock user
      const user: User = {
        email,
        name: email.split('@')[0] // Use email prefix as name
      };
      
      set({ 
        isAuthenticated: true, 
        user, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    sessionService.logout();
    set({ 
      isAuthenticated: false, 
      user: null, 
      error: null 
    });
    window.location.href = '/login';
  },

  checkSession: () => {
    const session = sessionService.getSession();
    if (session && session.isAuthenticated) {
      const user: User = {
        email: session.email,
        name: session.email.split('@')[0]
      };
      set({ 
        isAuthenticated: true, 
        user,
        error: null 
      });
    } else {
      set({ 
        isAuthenticated: false, 
        user: null 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));
