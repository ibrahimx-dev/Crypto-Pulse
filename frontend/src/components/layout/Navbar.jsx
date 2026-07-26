import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  FiSearch, FiX, FiRefreshCw, FiMoon, FiSun,
  FiBell, FiStar, FiZap, FiUser,
} from 'react-icons/fi'
import { useCrypto } from '../../context/CryptoContext'
import { useTheme } from '../../context/ThemeContext'

const NOTIFICATIONS = [
  {
    id: 1, type: 'success',
    title: '🚀 Bitcoin Momentum',
    body: 'BTC up +2.85% in the last hour. Trading near $67,250.',
    time: '2m ago',
  },
  {
    id: 2, type: 'primary',
    title: '⚡ Solana Network Activity',
    body: 'SOL volume surged +6.45% in 24h. Strong buy pressure.',
    time: '8m ago',
  },
  {
    id: 3, type: 'warning',
    title: '📊 Market Cap Milestone',
    body: 'Global crypto market cap crossed $1.32 Trillion.',
    time: '14m ago',
  },
  {
    id: 4, type: 'danger',
    title: '⚠️ High Volatility Alert',
    body: 'ETH showing 15% daily range. Exercise caution.',
    time: '31m ago',
  },
]

const TYPE_STYLES = {
  success: 'bg-success/8 border-success/20 text-success',
  primary: 'bg-primary/8 border-primary/20 text-primary',
  warning: 'bg-warning/8 border-warning/20 text-warning',
  danger:  'bg-danger/8 border-danger/20 text-danger',
}

/**
 * Navbar – premium sticky top navigation with responsive mobile menu drawer.
 */
export default function Navbar({
  query, onQueryChange, onClearSearch,
  watchlistCount, onWatchlistClick,
}) {
  const { refresh, isRefreshing, currency, switchCurrency } = useCrypto()
  const { isDark, toggleTheme } = useTheme()

  const searchRef                           = useRef(null)
  const [searchFocused, setSearchFocused]   = useState(false)
  const [scrolled, setScrolled]             = useState(false)
  const [showNotifications, setShowNotif]   = useState(false)
  const [hasUnread, setHasUnread]           = useState(true)
  const [countdown, setCountdown]           = useState(60)

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ctrl+K shortcut to focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Auto-refresh countdown
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { refresh(); return 60 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [refresh])

  const handleRefresh = useCallback(() => {
    refresh()
    setCountdown(60)
  }, [refresh])

  const closeNotif = useCallback(() => {
    setShowNotif(false)
  }, [])

  const handleViewAllNotifications = useCallback(() => {
    setShowNotif(false)
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-bold text-xs">All alerts marked as read</span>
        <span className="text-2xs text-light-muted dark:text-dark-subtle">You are up to date with all live market events.</span>
      </div>,
      { icon: '🔔', duration: 3500 }
    )
  }, [])

  const progress = ((60 - countdown) / 60) * 100

  return (
    <header
      className={`
        sticky top-0 z-30 w-full navbar-glass
        transition-all duration-300
        ${scrolled ? 'shadow-card-md' : ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">



        {/* ── Logo ────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0 mr-2">
          <div className="relative">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-sm">
              <FiZap className="w-4.5 h-4.5 text-white fill-white" />
            </div>
            {/* Live status indicator dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-light-surface dark:border-dark-surface animate-pulse-fast" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-[17px] text-light-text dark:text-dark-text tracking-tight leading-none">
              Crypto<span className="text-gradient">Pulse</span>
            </span>
            <p className="text-[10px] text-light-muted dark:text-dark-subtle leading-none mt-0.5 font-medium tracking-wide">
              MARKET INTELLIGENCE
            </p>
          </div>
        </div>

        {/* ── Search Input (Scale down/hide placeholder on small screens) ── */}
        <div className="flex-1 max-w-xs sm:max-w-sm relative">
          <div
            className={`
              flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl
              bg-light-bg dark:bg-dark-bg
              border transition-all duration-200
              ${searchFocused
                ? 'border-primary/60 ring-3 ring-primary/15 shadow-glow-sm'
                : 'border-light-border dark:border-dark-border'
              }
            `}
          >
            <FiSearch className={`w-4 h-4 shrink-0 transition-colors ${searchFocused ? 'text-primary' : 'text-light-muted dark:text-dark-subtle'}`} />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              placeholder="Search coins…"
              className="
                flex-1 bg-transparent text-xs sm:text-sm outline-none
                text-light-text dark:text-dark-text
                placeholder:text-light-muted dark:placeholder:text-dark-subtle
                font-medium
              "
              aria-label="Search cryptocurrencies"
              id="coin-search-input"
            />
            {query && (
              <button
                onClick={onClearSearch}
                className="text-light-muted dark:text-dark-subtle hover:text-danger shrink-0"
                aria-label="Clear search"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Right Actions (Desktop) ─────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-1.5 ml-auto">

          {/* API Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-success/8 border border-success/20 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-slow" />
            <span className="text-2xs font-semibold text-success tracking-wide">LIVE</span>
          </div>

          {/* Currency Switch */}
          <div className="flex items-center bg-light-bg dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border p-0.5 gap-0.5">
            {['usd', 'inr'].map((c) => (
              <button
                key={c}
                onClick={() => currency !== c && switchCurrency(c)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200
                  ${currency === c
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-sm'
                    : 'text-light-subtle dark:text-dark-subtle hover:text-light-text dark:hover:text-dark-text'
                  }
                `}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Refresh with countdown ring */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              title={`Refresh data (R) · Auto in ${countdown}s`}
              className="btn-icon relative"
              aria-label="Refresh market data"
            >
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 36 36"
                style={{ opacity: 0.3 }}
              >
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  strokeDasharray={`${progress * 0.942} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={isRefreshing ? { duration: 0.7, repeat: Infinity, ease: 'linear' } : {}}
              >
                <FiRefreshCw className={`w-4 h-4 relative z-10 ${isRefreshing ? 'text-primary' : ''}`} />
              </motion.div>
            </motion.button>
          </div>

          {/* Watchlist */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onWatchlistClick}
            title="My Watchlist"
            className="btn-icon relative"
            aria-label="Open watchlist"
          >
            <FiStar className="w-4 h-4" />
            <AnimatePresence>
              {watchlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-warning text-white text-[9px] font-bold flex items-center justify-center shadow-sm"
                >
                  {watchlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.88, rotate: 20 }}
            onClick={toggleTheme}
            title="Toggle theme (D)"
            className="btn-icon"
            aria-label="Toggle dark/light mode"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {isDark
                  ? <FiSun className="w-4 h-4 text-warning" />
                  : <FiMoon className="w-4 h-4" />
                }
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Notification Bell */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                setShowNotif((prev) => !prev)
                setHasUnread(false)
              }}
              title="Market Alerts"
              className="btn-icon relative"
              aria-label="Notifications"
            >
              <FiBell className="w-4 h-4" />
              <AnimatePresence>
                {hasUnread && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger"
                  >
                    <span className="absolute inset-0 rounded-full bg-danger animate-ping opacity-75" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeNotif} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
                    className="
                      absolute right-0 mt-3 w-[340px] z-50
                      bg-light-surface dark:bg-dark-surface
                      border border-light-border dark:border-dark-border
                      rounded-3xl shadow-card-xl overflow-hidden
                    "
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-light-border dark:border-dark-border">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-light-text dark:text-dark-text">Market Alerts</span>
                        <span className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-2xs font-bold">{NOTIFICATIONS.length}</span>
                      </div>
                      <span className="text-2xs text-primary font-semibold tracking-wide">● LIVE FEED</span>
                    </div>

                    <div className="divide-y divide-light-border dark:divide-dark-border max-h-[320px] overflow-y-auto no-scrollbar">
                      {NOTIFICATIONS.map((n, i) => (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-4 py-3 hover:bg-light-bg dark:hover:bg-dark-bg transition-colors cursor-default"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-xs font-semibold ${TYPE_STYLES[n.type].split(' ').pop()}`}>{n.title}</p>
                            <span className="text-2xs text-light-muted dark:text-dark-subtle shrink-0 mt-0.5">{n.time}</span>
                          </div>
                          <p className="text-xs text-light-subtle dark:text-dark-subtle mt-0.5 leading-relaxed">{n.body}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="px-4 py-2.5 border-t border-light-border dark:border-dark-border text-center">
                      <button
                        onClick={handleViewAllNotifications}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            className="
              w-9 h-9 rounded-2xl overflow-hidden flex
              bg-gradient-to-br from-primary via-secondary to-purple-600
              items-center justify-center
              text-white font-bold text-sm
              hover:ring-2 hover:ring-primary/40 hover:shadow-glow-sm
              transition-all duration-200 shrink-0
            "
            aria-label="User menu"
          >
            <FiUser className="w-4 h-4" />
          </button>
        </div>

        {/* ── Compact Right Actions (Mobile/Tablet) ──────────────────── */}
        <div className="flex lg:hidden items-center gap-1">
          {/* Watchlist Star Icon */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onWatchlistClick}
            className="btn-icon relative"
            aria-label="Open watchlist"
          >
            <FiStar className="w-4.5 h-4.5" />
            {watchlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-warning text-white text-[8px] font-extrabold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </motion.button>

          {/* Theme switcher */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={toggleTheme}
            className="btn-icon"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun className="w-4.5 h-4.5 text-warning" /> : <FiMoon className="w-4.5 h-4.5" />}
          </motion.button>
        </div>
      </div>
    </header>
  )
}
