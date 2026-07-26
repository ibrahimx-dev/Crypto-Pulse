import { motion } from 'framer-motion'
import {
  FiTrendingUp, FiTrendingDown, FiActivity, FiBarChart2, FiHeart,
} from 'react-icons/fi'
import { useCrypto } from '../../context/CryptoContext'
import StatCard from './StatCard'
import LiveClock from './LiveClock'

/** Format large numbers (e.g. $1.32T, ₹42.5B) */
function formatLargeNumber(value, currency = 'usd') {
  if (value == null) return '—'
  const symbol = currency === 'inr' ? '₹' : '$'
  if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9)  return `${symbol}${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6)  return `${symbol}${(value / 1e6).toFixed(2)}M`
  return `${symbol}${value.toFixed(2)}`
}

/**
 * HeroSection – Apple VisionOS / Liquid Glass edition.
 */
export default function HeroSection() {
  const {
    loading, topGainer, topLoser,
    coins, totalMarketCap, bitcoinDominance, lastUpdated, currency,
  } = useCrypto()

  const formatTime = (date) => {
    if (!date) return 'Never'
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatPrice = (price, curr) => {
    if (price == null) return '—'
    const symbol = curr === 'inr' ? '₹' : '$'
    if (price > 1000) return `${symbol}${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    if (price > 1)    return `${symbol}${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    return `${symbol}${price.toFixed(6)}`
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section className="relative pt-6 pb-8 px-4 md:px-6 overflow-hidden">
      
      {/* ── AURORA FLOATING LIGHT BLOBS (25s - 40s Infinite Float) ────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Top Left Blob – Blue */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-20 w-96 h-96 rounded-full blur-[80px]"
          style={{ background: 'rgba(59, 130, 246, 0.28)' }}
        />

        {/* Center Blob – Indigo / Purple */}
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.88, 1.12, 1],
          }}
          transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[30rem] h-[30rem] rounded-full blur-[100px]"
          style={{ background: 'rgba(99, 102, 241, 0.22)' }}
        />

        {/* Right Blob – Purple / Magenta */}
        <motion.div
          animate={{
            x: [0, 35, -45, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -right-20 w-96 h-96 rounded-full blur-[85px]"
          style={{ background: 'rgba(168, 85, 247, 0.22)' }}
        />

        {/* Bottom Blob – Cyan Light */}
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 25, -25, 0],
            scale: [1, 1.05, 0.92, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[34rem] h-[20rem] rounded-full blur-[90px]"
          style={{ background: 'rgba(6, 182, 212, 0.18)' }}
        />
      </div>

      {/* ── SUBTLE GRAIN NOISE OVERLAY (< 3% Opacity) ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── LIQUID GLASS MAIN CONTAINER PANEL ──────────────────────────── */}
      <div className="max-w-7xl mx-auto relative z-10 p-6 md:p-8 liquid-glass-panel overflow-hidden">
        
        {/* Top Gloss Reflection Layer */}
        <div className="liquid-gloss-overlay" />

        {/* 10-Second Diagonal Light Sweep (Shine Effect) */}
        <div className="shine-sweep" />

        {/* Content Container */}
        <div className="relative z-10">

          {/* ── Header Row ────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10">
            
            {/* Left: Heading */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />
                Welcome back 👋
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight leading-none mb-2">
                Crypto<span className="text-gradient">Pulse</span>
              </h1>
              <p className="text-sm text-light-subtle dark:text-dark-subtle font-medium max-w-sm">
                Real-time crypto intelligence powered by CoinGecko API
              </p>

              {/* Live status row */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                {/* Live dot */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  <span className="text-2xs text-success font-bold tracking-wide">LIVE DATA</span>
                </div>

                {/* Last updated */}
                {lastUpdated && (
                  <span className="text-2xs text-light-muted dark:text-dark-subtle font-medium flex items-center gap-1">
                    <FiActivity className="w-3 h-3" />
                    Updated {formatTime(lastUpdated)}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Right: Live Clock */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0"
            >
              <LiveClock />
            </motion.div>
          </div>

          {/* ── Stat Cards Grid ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">

            {/* Top Gainer */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
              <StatCard
                loading={loading}
                icon={<FiTrendingUp className="w-5 h-5" />}
                label="Top Gainer"
                value={topGainer ? topGainer.symbol.toUpperCase() : '—'}
                sub={topGainer ? formatPrice(topGainer.currentPrice, currency) : undefined}
                change={topGainer?.priceChangePercentage24h}
                color="success"
              />
            </motion.div>

            {/* Top Loser */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
              <StatCard
                loading={loading}
                icon={<FiTrendingDown className="w-5 h-5" />}
                label="Top Loser"
                value={topLoser ? topLoser.symbol.toUpperCase() : '—'}
                sub={topLoser ? formatPrice(topLoser.currentPrice, currency) : undefined}
                change={topLoser?.priceChangePercentage24h}
                color="danger"
              />
            </motion.div>

            {/* Bitcoin Dominance */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
              <StatCard
                loading={loading}
                icon={<FiActivity className="w-5 h-5" />}
                label="BTC Dominance"
                value={bitcoinDominance ? `${bitcoinDominance}%` : '—'}
                sub="Of total market cap"
                color="warning"
              />
            </motion.div>

            {/* Total Market Cap */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
              <StatCard
                loading={loading}
                icon={<FiBarChart2 className="w-5 h-5" />}
                label="Market Cap"
                value={totalMarketCap ? formatLargeNumber(totalMarketCap, currency) : '—'}
                sub="Global total"
                color="primary"
              />
            </motion.div>

            {/* Fear & Greed */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants}>
              <StatCard
                loading={false}
                icon={<FiHeart className="w-5 h-5" />}
                label="Fear & Greed"
                value="65"
                sub="Greed · Index"
                color="purple"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
