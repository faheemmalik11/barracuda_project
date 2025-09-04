import * as React from 'react'

export type Theme = 'dark' | 'light' | 'system'

export interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => {
    throw new Error('setTheme must be used within a ThemeProvider')
  },
}

export const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

/**
 * Hook to access theme context
 * @throws {Error} When used outside of ThemeProvider
 */
export const useTheme = (): ThemeProviderState => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
} 