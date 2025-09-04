import * as React from 'react'
import { ThemeProviderContext, type Theme } from '@shared/components/ui/hooks/use-theme'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const VALID_THEMES: Theme[] = ['dark', 'light', 'system']

const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && 'localStorage' in window
  } catch {
    return false
  }
}

const getStoredTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  if (!isLocalStorageAvailable()) return defaultTheme
  
  try {
    const stored = localStorage.getItem(storageKey) as Theme
    return stored && VALID_THEMES.includes(stored) ? stored : defaultTheme
  } catch {
    return defaultTheme
  }
}

const setStoredTheme = (storageKey: string, theme: Theme): void => {
  if (!isLocalStorageAvailable()) return
  
  try {
    localStorage.setItem(storageKey, theme)
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
}

const applyTheme = (theme: Theme): void => {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => 
    getStoredTheme(storageKey, defaultTheme)
  )

  React.useEffect(() => {
    applyTheme(theme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => applyTheme(theme)
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    
    // Explicit return for non-system themes
    return undefined
  }, [theme])

  const contextValue = React.useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
      setStoredTheme(storageKey, newTheme)
      setTheme(newTheme)
    },
  }), [theme, storageKey])

  return (
    <ThemeProviderContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
