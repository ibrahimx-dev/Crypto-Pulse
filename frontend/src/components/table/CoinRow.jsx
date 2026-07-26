import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiExternalLink, FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AnimatedNumber from '../common/AnimatedNumber'

/** Format currency with proper symbol and precision */
function formatPrice(price, currency) {
  if (price == null) return '—'
  const symbol = currency === 'inr' ? '₹' : '$'
  if (price >= 1000)  return `${symbol}${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1)     return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
  if (price >= 0.01)  return `${symbol}${price.toFixed(4)}`
  return `${symbol}${price.toFixed(8)}`
}

/** Format market cap / volume */
function formatLarge(value, currency) {
  if (value == null) return '—'
  const symbol = currency === 'inr' ? '₹' : '$'
  if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9)  return `${symbol}${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6)  return `${symbol}${(value / 1e6).toFixed(2)}M`
  return `${symbol}${value.toFixed(0)}`
}

/**
 * SvgSparkline – pure SVG inline sparkline (no Recharts in rows).
 * Green for gain, red for loss. Smooth bezier curve with gradient fill.
 */
function SvgSparkline({ data, isPositive }) {
  if (!data || data.length < 2) {
    return <div className="w-[80px] h-9 opacity-30 bg-light-border dark:bg-dark-border rounded-lg" />
  }

  const W = 80
  const H = 36
  const pts = data.slice(-24)
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const range = max - min || 1

  const points = pts.map((v, i) => ({
    x: (i / (pts.length - 1)) * W,
    y: H - ((v - min) / range) * (H - 4) - 2,
  }))

  // Build smooth polyline
  const linePath = points.map((p, i) =>
    i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`
  ).join(' ')

  // Area fill path
  const areaPath = [
    `M ${points[0].x},${H}`,
    points.map((p) => `L ${p.x},${p.y}`).join(' '),
    `L ${points[points.length - 1].x},${H}`,
    'Z',
  ].join(' ')

  const color  = isPositive ? '#22C55E' : '#EF4444'
  const gradId = `spark-${isPositive ? 'up' : 'dn'}-${Math.random().toString(36).slice(2,6)}`

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * CoinRow – premium single row in the coin table.
 * Memoised to avoid re-renders.
 */
const CoinRow = memo(function CoinRow({ coin, index, currency, isWatched, onToggleWatch, onDetails }) {
  const isPositive = (coin.priceChangePercentage24h ?? 0) >= 0

  const handleCopySymbol = useCallback(() => {
    navigator.clipboard.writeText(coin.symbol.toUpperCase()).then(() => {
      toast.success(`Copied ${coin.symbol.toUpperCase()}!`, { duration: 1500 })
    })
  }, [coin.symbol])

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.025 }}
      className="
        group border-b border-light-border/40 dark:border-dark-border/40
        hover:bg-slate-50/70 dark:hover:bg-dark-card2/60
        transition-all duration-150 cursor-default
      "
    >
      {/* ── Rank ────────────────────────────────────────────────────── */}
      <td className="px-4 py-4 text-center w-12">
        <span className="text-xs font-bold text-light-muted dark:text-dark-subtle tabular-nums">
          {coin.marketCapRank ?? index + 1}
        </span>
      </td>

      {/* ── Coin Logo + Name ──────────────────────────────────────────── */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 min-w-[160px]">
          {/* Logo */}
          <div className="relative shrink-0">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-light-border dark:ring-dark-border group-hover:ring-primary/30 transition-all"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/36x36/3B82F6/white?text=${coin.symbol?.[0]?.toUpperCase()}`
              }}
            />
          </div>

          {/* Name / Symbol */}
          <div>
            <button
              onClick={() => onDetails(coin)}
              className="font-bold text-sm text-light-text dark:text-dark-text group-hover:text-primary transition-colors leading-tight text-left"
            >
              {coin.name}
            </button>
            <button
              onClick={handleCopySymbol}
              title="Copy ticker symbol"
              className="flex items-center gap-1 mt-0.5"
            >
              <span className="text-2xs font-semibold px-1.5 py-0.5 rounded-md bg-light-border dark:bg-dark-border text-light-subtle dark:text-dark-subtle uppercase tracking-wide group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {coin.symbol}
              </span>
              <FiCopy className="w-2.5 h-2.5 text-light-muted dark:text-dark-subtle opacity-0 group-hover:opacity-60 transition-opacity" />
            </button>
          </div>
        </div>
      </td>

      {/* ── Price ─────────────────────────────────────────────────────── */}
      <td className="px-4 py-4 text-right">
        <AnimatedNumber
          value={formatPrice(coin.currentPrice, currency)}
          className="text-sm font-bold text-light-text dark:text-dark-text font-mono-num"
        />
      </td>

      {/* ── 24H Change ────────────────────────────────────────────────── */}
      <td className="px-4 py-4 text-right">
        <span className={`
          inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border
          ${isPositive
            ? 'bg-success/8 text-success border-success/20'
            : 'bg-danger/8 text-danger border-danger/20'
          }
        `}>
          {isPositive ? '▲' : '▼'}
          {Math.abs(coin.priceChangePercentage24h ?? 0).toFixed(2)}%
        </span>
      </td>

      {/* ── Market Cap ────────────────────────────────────────────────── */}
      <td className="px-4 py-4 text-right hidden md:table-cell">
        <span className="text-sm text-light-text dark:text-dark-text font-semibold font-mono-num">
          {formatLarge(coin.marketCap, currency)}
        </span>
      </td>

      {/* ── Volume ────────────────────────────────────────────────────── */}
      <td className="px-4 py-4 text-right hidden lg:table-cell">
        <span className="text-sm text-light-subtle dark:text-dark-subtle font-mono-num">
          {formatLarge(coin.totalVolume, currency)}
        </span>
      </td>

      {/* ── Mini Sparkline ────────────────────────────────────────────── */}
      <td className="px-4 py-4 hidden xl:table-cell">
        <SvgSparkline data={coin.sparkline7d} isPositive={isPositive} />
      </td>

      {/* ── Actions ───────────────────────────────────────────────────── */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 justify-end">
          {/* Watchlist star */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onToggleWatch(coin.id)}
            title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
            className={`
              w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150
              ${isWatched
                ? 'bg-warning/10 text-warning hover:bg-warning/20'
                : 'text-light-muted dark:text-dark-subtle hover:bg-light-border dark:hover:bg-dark-border hover:text-warning'
              }
            `}
            aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <FiStar className={`w-4 h-4 transition-all ${isWatched ? 'fill-warning' : ''}`} />
          </motion.button>

          {/* Details */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onDetails(coin)}
            title="View details"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-light-muted dark:text-dark-subtle hover:bg-primary/10 hover:text-primary transition-all duration-150"
            aria-label="View coin details"
          >
            <FiExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  )
})

export default CoinRow
