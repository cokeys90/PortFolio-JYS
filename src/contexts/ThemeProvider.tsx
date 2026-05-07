import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme, type ThemeContextValue } from './ThemeContext'

const STORAGE_KEY = 'portfolio-theme'

/**
 * 우선순위: localStorage > OS prefers-color-scheme > 'dark'
 * 첫 페인트 전 index.html 스크립트가 이미 data-theme을 세팅하므로
 * 여기서 한 번 더 동기화한다.
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value: ThemeContextValue = {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
