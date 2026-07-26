import {
  createContext, useContext, useState, useCallback,
  useEffect, useRef,
} from 'react'
import { fetchTopCoins } from '../services/api'
import toast from 'react-hot-toast'

const CryptoContext = createContext(null)

/**
 * CryptoProvider – global state for coin list, currency, loading, and errors.
 *
 * Responsibilities:
 * - Fetch & cache the top-10 coins list
 * - Expose refresh() for manual refresh
 * - Track lastUpdated timestamp
 * - Support USD / INR currency switching
 */
export function CryptoProvider({ children }) {
  const [coins, setCoins]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [currency, setCurrency]     = useState(() =>
    localStorage.getItem('cryptopulse-currency') || 'usd'
  )
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Track in-flight request to prevent duplicates
  const fetchingRef = useRef(false)

  // ─── Fetch Coins ──────────────────────────────────────────────────────────
  const loadCoins = useCallback(
    async (isManualRefresh = false) => {
      if (fetchingRef.current) return
      fetchingRef.current = true

      if (isManualRefresh) {
        setIsRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      try {
        const data = await fetchTopCoins(currency)
        setCoins(data)
        setLastUpdated(new Date())
        if (isManualRefresh) {
          toast.success('Market data refreshed!', { icon: '🔄' })
        }
      } catch (err) {
        const msg = err?.message || 'Failed to load coin data'
        setError(err)
        if (isManualRefresh) {
          toast.error(msg)
        }
      } finally {
        setLoading(false)
        setIsRefreshing(false)
        fetchingRef.current = false
      }
    },
    [currency],
  )

  // Initial load + re-fetch when currency changes
  useEffect(() => {
    loadCoins(false)
  }, [loadCoins])

  // ─── Currency Switch ──────────────────────────────────────────────────────
  const switchCurrency = useCallback((newCurrency) => {
    setCurrency(newCurrency)
    localStorage.setItem('cryptopulse-currency', newCurrency)
    toast.success(`Switched to ${newCurrency.toUpperCase()}`, { icon: '💱' })
  }, [])

  // ─── Derived Values ───────────────────────────────────────────────────────
  const topGainer = coins.reduce((best, coin) => {
    if (!best) return coin
    return (coin.priceChangePercentage24h || 0) > (best.priceChangePercentage24h || 0)
      ? coin : best
  }, null)

  const topLoser = coins.reduce((worst, coin) => {
    if (!worst) return coin
    return (coin.priceChangePercentage24h || 0) < (worst.priceChangePercentage24h || 0)
      ? coin : worst
  }, null)

  const totalMarketCap = coins.reduce((sum, c) => sum + (c.marketCap || 0), 0)

  const bitcoin = coins.find((c) => c.id === 'bitcoin')
  const bitcoinDominance = bitcoin && totalMarketCap > 0
    ? ((bitcoin.marketCap / totalMarketCap) * 100).toFixed(1)
    : null

  return (
    <CryptoContext.Provider
      value={{
        coins,
        loading,
        error,
        currency,
        lastUpdated,
        isRefreshing,
        topGainer,
        topLoser,
        totalMarketCap,
        bitcoinDominance,
        refresh: () => loadCoins(true),
        switchCurrency,
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

/** Custom hook – consume crypto context safely */
export function useCrypto() {
  const ctx = useContext(CryptoContext)
  if (!ctx) throw new Error('useCrypto must be used inside CryptoProvider')
  return ctx
}
