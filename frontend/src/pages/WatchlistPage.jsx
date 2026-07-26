import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiArrowLeft, FiTrash2, FiSearch } from 'react-icons/fi'
import CoinTable from '../components/table/CoinTable'
import CoinDrawer from '../components/drawer/CoinDrawer'
import EmptyState from '../components/common/EmptyState'
import ScrollToTop from '../components/layout/ScrollToTop'
import Footer from '../components/common/Footer'
import { useCrypto } from '../context/CryptoContext'
import { useWatchlist } from '../hooks/useWatchlist'
import { useSearch } from '../hooks/useSearch'

/**
 * WatchlistPage – dedicated page showing only the user's favourited coins.
 */
export default function WatchlistPage({ onBack }) {
  const { coins, currency } = useCrypto()
  const { watchlist, toggleWatchlist, isInWatchlist, clearWatchlist } = useWatchlist()
  const watchlistCoins = coins.filter((c) => watchlist.includes(c.id))
  const { query, setQuery, filtered, clearSearch } = useSearch(watchlistCoins)

  const [selectedCoin, setSelectedCoin] = useState(null)

  const handleDetails = useCallback((coin) => setSelectedCoin(coin), [])
  const handleClose   = useCallback(() => setSelectedCoin(null), [])

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg mesh-bg text-light-text dark:text-dark-text flex flex-col justify-between selection:bg-primary/20 pb-16 lg:pb-0">
      <div>
        {/* ── Navbar Header ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 navbar-glass">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-[68px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="btn-icon"
                aria-label="Back to dashboard"
              >
                <FiArrowLeft className="w-4.5 h-4.5" />
              </motion.button>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center text-warning">
                  <FiStar className="w-4 h-4 fill-warning" />
                </div>
                <div>
                  <h1 className="text-base font-extrabold text-light-text dark:text-dark-text leading-tight flex items-center gap-2">
                    My Watchlist
                    {watchlist.length > 0 && (
                      <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
                        {watchlist.length}
                      </span>
                    )}
                  </h1>
                  <p className="text-2xs text-light-subtle dark:text-dark-subtle font-medium">
                    Personalized asset tracking
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search within watchlist */}
              {watchlist.length > 0 && (
                <div className="relative hidden sm:block">
                  <FiSearch className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-subtle" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Filter watchlist…"
                    className="input-field py-1.5 pl-8 pr-3 text-xs w-48 rounded-xl"
                  />
                </div>
              )}

              {watchlist.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear your entire watchlist?')) clearWatchlist()
                  }}
                  className="btn-ghost text-xs text-danger hover:text-danger gap-1.5 px-3 py-1.5 rounded-xl border border-danger/20 hover:bg-danger/10"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── Content ───────────────────────────────────────────────────── */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <AnimatePresence mode="wait">
            {watchlist.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card overflow-hidden"
              >
                <EmptyState
                  type="watchlist"
                  onClear={onBack}
                />
              </motion.div>
            ) : filtered.length === 0 && query ? (
              <motion.div key="no-search" className="card overflow-hidden">
                <EmptyState type="search" query={query} onClear={clearSearch} />
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CoinTable
                  coins={filtered}
                  loading={false}
                  query={query}
                  currency={currency}
                  watchlist={watchlist}
                  onToggleWatch={toggleWatchlist}
                  onDetails={handleDetails}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Drawer */}
      <CoinDrawer
        coin={selectedCoin}
        currency={currency}
        isWatched={selectedCoin ? isInWatchlist(selectedCoin.id) : false}
        onToggleWatch={toggleWatchlist}
        onClose={handleClose}
      />

      <ScrollToTop />
      <Footer />
    </div>
  )
}
