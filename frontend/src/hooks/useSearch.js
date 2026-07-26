import { useState, useMemo, useCallback } from 'react'

/**
 * useSearch – filters a list of coins by name or symbol.
 *
 * Returns the filtered list, the current query, and a setter.
 * Uses useMemo to avoid re-filtering on every render.
 *
 * @param {Array} coins - full coin list from CryptoContext
 */
export function useSearch(coins = []) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return coins
    return coins.filter(
      (coin) =>
        coin.name?.toLowerCase().includes(q) ||
        coin.symbol?.toLowerCase().includes(q) ||
        coin.id?.toLowerCase().includes(q),
    )
  }, [query, coins])

  const clearSearch = useCallback(() => setQuery(''), [])

  // Suggestions: first 5 matches when query length >= 1
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 1) return []
    return coins
      .filter(
        (c) =>
          c.name?.toLowerCase().startsWith(q) ||
          c.symbol?.toLowerCase().startsWith(q),
      )
      .slice(0, 5)
  }, [query, coins])

  return { query, setQuery, filtered, clearSearch, suggestions }
}
