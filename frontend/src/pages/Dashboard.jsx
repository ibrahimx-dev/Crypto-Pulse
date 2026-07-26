import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiCommand, FiActivity } from 'react-icons/fi'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/hero/HeroSection'
import CoinTable from '../components/table/CoinTable'
import CoinDrawer from '../components/drawer/CoinDrawer'
import ErrorState from '../components/common/ErrorState'
import ScrollToTop from '../components/layout/ScrollToTop'
import Footer from '../components/common/Footer'
import { useCrypto } from '../context/CryptoContext'
import { useWatchlist } from '../hooks/useWatchlist'
import { useSearch } from '../hooks/useSearch'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

/**
 * Dashboard – the main page of CryptoPulse.
 */
export default function Dashboard({ onWatchlistClick }) {
  const { coins, loading, error, currency, refresh, isRefreshing } = useCrypto()
  const { watchlist, toggleWatchlist, isInWatchlist }  = useWatchlist()
  const { query, setQuery, filtered, clearSearch }     = useSearch(coins)
  const { toggleTheme } = useTheme()

  const [selectedCoin, setSelectedCoin] = useState(null)

  // ── Keyboard Shortcuts ────────────────────────────────────────────────────
  useKeyboardShortcuts({
    onSearch:       () => document.getElementById('coin-search-input')?.focus(),
    onEscape:       () => { clearSearch(); setSelectedCoin(null) },
    onRefresh:      () => { refresh(); toast.success('Refreshing data…', { icon: '🔄' }) },
    onToggleTheme:  toggleTheme,
  })

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDetails     = useCallback((coin) => setSelectedCoin(coin), [])
  const handleCloseDrawer = useCallback(() => setSelectedCoin(null), [])

  const handleToggleWatch = useCallback((coinId) => {
    toggleWatchlist(coinId)
  }, [toggleWatchlist])

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg mesh-bg text-light-text dark:text-dark-text flex flex-col justify-between selection:bg-primary/20 pb-16 lg:pb-0">
      <div>
        {/* Navbar */}
        <Navbar
          query={query}
          onQueryChange={setQuery}
          onClearSearch={clearSearch}
          watchlistCount={watchlist.length}
          onWatchlistClick={onWatchlistClick}
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 pb-16 pt-2">

          {/* ── Section Title Row ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-xl font-extrabold text-light-text dark:text-dark-text tracking-tight flex items-center gap-2">
                Live Market Overview
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Top 20
                </span>
              </h2>
              <p className="text-xs text-light-subtle dark:text-dark-subtle mt-0.5 font-medium">
                Instant streaming prices & market capitalization
              </p>
            </div>

            <button
              onClick={refresh}
              disabled={isRefreshing}
              className="btn-ghost text-xs gap-1.5 px-3 py-1.5 rounded-xl border border-light-border dark:border-dark-border"
            >
              <FiRefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
              <span>Refresh</span>
            </button>
          </motion.div>

          {/* ── Error State ───────────────────────────────────────────────── */}
          {error && !loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card overflow-hidden"
            >
              <ErrorState error={error} onRetry={refresh} />
            </motion.div>
          ) : (
            /* ── Coin Table ─────────────────────────────────────────────── */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <CoinTable
                coins={filtered}
                loading={loading}
                query={query}
                currency={currency}
                watchlist={watchlist}
                onToggleWatch={handleToggleWatch}
                onDetails={handleDetails}
              />
            </motion.div>
          )}

          {/* ── Keyboard Shortcuts Footer Hints ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center py-4 px-6 rounded-2xl bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border/60 dark:border-dark-border/60 backdrop-blur-md"
          >
            <span className="text-2xs font-bold uppercase tracking-wider text-light-muted dark:text-dark-subtle flex items-center gap-1.5">
              <FiCommand className="w-3.5 h-3.5" /> Shortcuts
            </span>
            {[
              ['Ctrl + K', 'Search'],
              ['R', 'Refresh Data'],
              ['D', 'Toggle Dark Mode'],
              ['Esc', 'Clear / Close'],
            ].map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-light-subtle dark:text-dark-subtle font-medium">
                <kbd>{key}</kbd>
                {label}
              </span>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Coin Detail Drawer */}
      <CoinDrawer
        coin={selectedCoin}
        currency={currency}
        isWatched={selectedCoin ? isInWatchlist(selectedCoin.id) : false}
        onToggleWatch={handleToggleWatch}
        onClose={handleCloseDrawer}
      />

      {/* Scroll To Top FAB & Scroll Progress */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </div>
  )
}
