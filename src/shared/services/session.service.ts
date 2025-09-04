interface SessionData {
  email: string;
  isAuthenticated: boolean;
  loginTime: number;
  sessionId: string;
}

class SessionService {
  private readonly SESSION_KEY = 'auth-session';
  private readonly SESSION_ID_KEY = 'session-id';
  private sessionId: string | null = null;

  constructor() {
    this.initializeSession();
    this.setupTabDetection();
  }

  private initializeSession() {
    // Generate or retrieve session ID from sessionStorage first
    this.sessionId = sessionStorage.getItem(this.SESSION_ID_KEY);
    
    // Check if this is a page refresh (session exists) or new tab (no session)
    const existingSessionId = localStorage.getItem(this.SESSION_ID_KEY);
    const hasExistingSession = sessionStorage.getItem(this.SESSION_KEY);
    
    if (!this.sessionId) {
      // No session ID in sessionStorage - could be new tab or first visit
      if (existingSessionId && !hasExistingSession) {
        // New tab detected - there's a session in localStorage but no session data
        this.sessionId = this.generateSessionId();
        sessionStorage.setItem(this.SESSION_ID_KEY, this.sessionId);
        this.clearSession();
      } else {
        // First visit or no existing session
        this.sessionId = this.generateSessionId();
        sessionStorage.setItem(this.SESSION_ID_KEY, this.sessionId);
        localStorage.setItem(this.SESSION_ID_KEY, this.sessionId);
      }
    } else {
      // Session ID exists in sessionStorage - this is a page refresh
      // Keep the existing session and update localStorage
      localStorage.setItem(this.SESSION_ID_KEY, this.sessionId);
    }
  }

  private setupTabDetection() {
    // Listen for storage events (fired when localStorage changes in other tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === this.SESSION_ID_KEY && e.newValue !== this.sessionId) {
        // Another tab has taken over, logout this tab
        this.clearSession();
        window.location.href = '/login';
      }
    });

    // Clear session when tab/window is closed
    window.addEventListener('beforeunload', () => {
      // Only clear if this is the last tab
      const currentSessionId = localStorage.getItem(this.SESSION_ID_KEY);
      if (currentSessionId === this.sessionId) {
        localStorage.removeItem(this.SESSION_ID_KEY);
      }
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private clearSession(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem('auth-password');
    sessionStorage.removeItem(this.SESSION_ID_KEY);
  }

  saveSession(email: string, password: string): void {
    const sessionData: SessionData = {
      email,
      isAuthenticated: true,
      loginTime: Date.now(),
      sessionId: this.sessionId!
    };

    // Store in sessionStorage (cleared when tab closes)
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    
    // Store password separately (in practice, you'd hash this or use tokens)
    sessionStorage.setItem('auth-password', password);
  }

  getSession(): SessionData | null {
    try {
      const sessionStr = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionStr) return null;

      const session = JSON.parse(sessionStr) as SessionData;
      
      // Validate session
      if (session.sessionId !== this.sessionId) {
        this.clearSession();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  logout(): void {
    this.clearSession();
    // Clear from localStorage if this session owns it
    const currentSessionId = localStorage.getItem(this.SESSION_ID_KEY);
    if (currentSessionId === this.sessionId) {
      localStorage.removeItem(this.SESSION_ID_KEY);
    }
  }
}

export const sessionService = new SessionService();
