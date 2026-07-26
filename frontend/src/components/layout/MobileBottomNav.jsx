import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiStar, FiBell, FiTrendingUp, FiX, FiZap } from 'react-icons/fi'
import { useCrypto } from '../../context/CryptoContext'

/* Static market alerts data */
const ALERTS = [
  { id: 1, type: 'success', emoji: '🚀', title: 'Bitcoin Momentum', body: 'BTC up +2.85% in the last hour. Trading near $67,250.', time: '2m ago' },
  { id: 2, type: 'primary', emoji: '⚡', title: 'Solana Network', body: 'SOL volume surged +6.45% in 24h. Strong buy pressure.', time: '8m ago' },
  { id: 3, type: 'warning', emoji: '📊', title: 'Market Cap Milestone', body: 'Global crypto market cap crossed $1.32 Trillion.', time: '14m ago' },
  { id: 4, type: 'danger', emoji: '⚠️', title: 'High Volatility', body: 'ETH showing 15% daily range. Exercise caution.', time: '31m ago' },
]

const ALERT_COLORS = {
  success: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  danger:  'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
}

/**
 * MobileBottomNav – 5-tab premium fixed bottom bar for mobile (hidden on lg+).
 * Tabs: Home · Market · [USD↔INR pill] · Alerts · Watchlist
 */
export default function MobileBottomNav({ page, onGoHome, onGoWatchlist, watchlistCount }) {
  const { currency, switchCurrency } = useCrypto()
  const [showAlerts, setShowAlerts] = useState(false)
  const [hasUnread, setHasUnread]   = useState(true)

  const handleAlertsClick = () => {
    setShowAlerts((prev) => !prev)
    setHasUnread(false)
  }

  const handleMarketClick = () => {
    onGoHome()
    setTimeout(() => {
      document.querySelector('main')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  return (
    <>
      {/* ── Alerts Panel (slide up) ───────────────────────────────────────── */}
      <AnimatePresence>
        {showAlerts && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAlerts(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 38 }}
              className="
                fixed bottom-16 left-0 right-0 z-50 lg:hidden
                mx-3 mb-1 rounded-3xl overflow-hidden
                bg-white dark:bg-[#0F1929]
                border border-gray-200 dark:border-white/10
                shadow-[0_-8px_48px_rgba(0,0,0,0.25)]
              "
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FiZap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white">Market Alerts</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold border border-red-500/20">
                    {ALERTS.length} LIVE
                  </span>
                </div>
                <button
                  onClick={() => setShowAlerts(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Alert items */}
              <div className="divide-y divide-gray-100 dark:divide-white/8 max-h-72 overflow-y-auto">
                {ALERTS.map((alert, i) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 px-5 py-3.5"
                  >
                    <span className={`mt-0.5 shrink-0 text-[11px] font-bold px-2 py-1 rounded-xl border ${ALERT_COLORS[alert.type]}`}>
                      {alert.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{alert.title}</p>
                        <span className="text-[10px] text-gray-400 shrink-0">{alert.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{alert.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Panel footer */}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-white/10 text-center">
                <span className="text-[10px] text-gray-400 font-medium">● Live feed · Updates every 60s</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Bottom Tab Bar ────────────────────────────────────────────────── */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-40
          flex lg:hidden items-stretch
          bg-white/95 dark:bg-[#0B1220]/98
          backdrop-blur-2xl
          border-t border-gray-200/80 dark:border-white/10
          shadow-[0_-4px_24px_rgba(0,0,0,0.10)]
        "
        aria-label="Mobile navigation"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 6px)' }}
      >

        {/* ── Tab: Home ─────────────────────── */}
        <TabButton
          label="Home"
          icon={FiHome}
          isActive={page === 'dashboard'}
          onClick={() => {
            if (page === 'dashboard') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
              onGoHome()
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 300)
            }
          }}
        />

        {/* ── Tab: Market ───────────────────── */}
        <TabButton
          label="Market"
          icon={FiTrendingUp}
          isActive={false}
          onClick={handleMarketClick}
        />

        {/* ── Center: Currency Switcher ──────── */}
        <div className="flex-1 flex items-center justify-center py-2">
          <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-2xl p-0.5 gap-0.5 border border-gray-200 dark:border-white/10">
            {['usd', 'inr'].map((c) => (
              <motion.button
                key={c}
                whileTap={{ scale: 0.9 }}
                onClick={() => switchCurrency(c)}
                className={`
                  px-3 py-1.5 rounded-xl text-[11px] font-extrabold tracking-wide transition-all duration-200
                  ${currency === c
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }
                `}
                aria-label={`Switch to ${c.toUpperCase()}`}
              >
                {c.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Tab: Alerts ───────────────────── */}
        <TabButton
          label="Alerts"
          icon={FiBell}
          isActive={showAlerts}
          dot={hasUnread}
          onClick={handleAlertsClick}
          activeColor="text-purple-500"
          glowColor="rgba(168,85,247,0.6)"
          indicatorColor="bg-purple-500"
        />

        {/* ── Tab: Watchlist ────────────────── */}
        <TabButton
          label="Watchlist"
          icon={FiStar}
          isActive={page === 'watchlist'}
          badge={watchlistCount > 0 ? watchlistCount : null}
          onClick={onGoWatchlist}
        />

      </nav>
    </>
  )
}

/* ── Reusable tab button ────────────────────────────────────────────────── */
function TabButton({
  label, icon: Icon, isActive, onClick,
  badge = null, dot = false,
  activeColor = 'text-blue-500',
  glowColor = 'rgba(59,130,246,0.6)',
  indicatorColor = 'bg-blue-500',
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.86 }}
      onClick={onClick}
      aria-label={label}
      className="flex-1 flex flex-col items-center justify-center pt-2.5 pb-1 gap-0.5 relative min-w-0"
    >
      {/* Active top bar */}
      {isActive && (
        <motion.div
          layoutId="tab-active-bar"
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full ${indicatorColor}`}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}

      {/* Icon + badges */}
      <div className="relative">
        <Icon
          className={`w-[19px] h-[19px] transition-all duration-200 ${
            isActive ? `${activeColor} scale-110` : 'text-gray-400 dark:text-gray-500'
          }`}
          style={isActive ? { filter: `drop-shadow(0 0 5px ${glowColor})` } : {}}
        />

        {/* Numeric badge */}
        {badge && !dot && (
          <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-blue-500 text-white text-[8px] font-extrabold flex items-center justify-center px-0.5 shadow-sm">
            {badge}
          </span>
        )}

        {/* Pulsing dot badge */}
        {dot && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-white dark:border-[#0B1220]">
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
          </span>
        )}
      </div>

      {/* Label */}
      <span className={`text-[9px] font-semibold leading-none transition-colors duration-200 ${
        isActive ? activeColor : 'text-gray-400 dark:text-gray-500'
      }`}>
        {label}
      </span>
    </motion.button>
  )
}
