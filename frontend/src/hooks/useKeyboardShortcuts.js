import { useEffect } from 'react'

/**
 * useKeyboardShortcuts – global keyboard shortcut handler.
 *
 * Shortcuts:
 *   /       → focus the search input
 *   Escape  → clear search / close drawer
 *   r       → refresh data (when no input focused)
 *   d       → toggle dark mode (when no input focused)
 *
 * @param {Object} handlers - { onSearch, onEscape, onRefresh, onToggleTheme }
 */
export function useKeyboardShortcuts({ onSearch, onEscape, onRefresh, onToggleTheme } = {}) {
  useEffect(() => {
    const isInputFocused = () => {
      const el = document.activeElement
      return el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.isContentEditable
    }

    const handleKeyDown = (e) => {
      // Escape → close drawer / clear search
      if (e.key === 'Escape') {
        onEscape?.()
        return
      }

      // 'r' → refresh (no modifier, no input focused)
      if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
        onRefresh?.()
        return
      }

      // 'd' → toggle dark mode
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
        onToggleTheme?.()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSearch, onEscape, onRefresh, onToggleTheme])
}
