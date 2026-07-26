import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'cryptopulse-watchlist'

/**
 * useWatchlist – manages the user's favourite coins.
 *
 * Persists to LocalStorage so the list survives page refreshes.
 * Returns helpers to toggle, check, and clear watchlist entries.
 */
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Sync to LocalStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = useCallback((coinId) => {
    setWatchlist((prev) => (prev.includes(coinId) ? prev : [...prev, coinId]))
  }, [])

  const removeFromWatchlist = useCallback((coinId) => {
    setWatchlist((prev) => prev.filter((id) => id !== coinId))
  }, [])

  const toggleWatchlist = useCallback((coinId) => {
    setWatchlist((prev) =>
      prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId],
    )
  }, [])

  const isInWatchlist = useCallback(
    (coinId) => watchlist.includes(coinId),
    [watchlist],
  )

  const clearWatchlist = useCallback(() => setWatchlist([]), [])

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist,
    watchlistCount: watchlist.length,
  }
}
