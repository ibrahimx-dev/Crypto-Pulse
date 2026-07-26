import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

/**
 * ThemeProvider – manages dark/light mode with LocalStorage persistence.
 *
 * Reads the saved preference on mount, or defaults to the OS preference.
 * Writes the 'dark' class to <html> for Tailwind's dark mode strategy.
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('cryptopulse-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply / remove the 'dark' class from <html> whenever isDark changes
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('cryptopulse-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/** Custom hook – consume theme context safely */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
