import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiStar, FiExternalLink, FiArrowUp, FiArrowDown,
  FiTrendingUp, FiTrendingDown, FiGlobe, FiBarChart2,
  FiPackage, FiActivity, FiLayers, FiShield, FiCheckCircle, FiCopy,
} from 'react-icons/fi'
import { fetchCoinDetail } from '../../services/api'
import SparklineChart from './SparklineChart'
import toast from 'react-hot-toast'

/* ── Formatters ─────────────────────────────────────────────── */
function fmt(value, currency, decimals) {
  if (value == null) return '—'
  const s = currency === 'inr' ? '₹' : '$'
  if (decimals !== undefined)
    return `${s}${Number(value).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
  if (Math.abs(value) >= 1000) return `${s}${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (Math.abs(value) >= 1)    return `${s}${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
  return `${s}${Number(value).toFixed(6)}`
}

function fmtLarge(v, currency) {
  if (v == null) return '—'
  const s = currency === 'inr' ? '₹' : '$'
  if (v >= 1e12) return `${s}${(v / 1e12).toFixed(2)}T`
  if (v >= 1e9)  return `${s}${(v / 1e9).toFixed(2)}B`
  if (v >= 1e6)  return `${s}${(v / 1e6).toFixed(2)}M`
  return `${s}${v.toFixed(0)}`
}

function fmtSupply(v) {
  if (v == null) return '—'
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`
  if (v >= 1e3) return `${(v / 1e3).toFixed(2)}K`
  return v.toLocaleString('en-US')
}

const TIMEFRAMES = ['24H', '7D', '30D', '90D', '1Y', 'ALL']

/**
 * CoinDrawer – Senior UI/UX Production-Ready FinTech Details Panel.
 */
export default function CoinDrawer({ coin, currency, isWatched, onToggleWatch, onClose }) {
  const [detail, setDetail]       = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [timeframe, setTimeframe] = useState('7D')

  // Fetch coin detail when drawer opens
  useEffect(() => {
    if (!coin) return
    setLoading(true)
    setDetail(null)
    setError(null)

    fetchCoinDetail(coin.id, currency)
      .then(setDetail)
      .catch((err) => {
        setError(err)
        toast.error(`Failed to load ${coin.name} details`)
      })
      .finally(() => setLoading(false))
  }, [coin, currency])

  // Escape key listener
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleWatchToggle = useCallback(() => {
    onToggleWatch(coin.id)
    toast.success(
      isWatched ? `Removed ${coin.name} from watchlist` : `Added ${coin.name} to watchlist`,
      { icon: isWatched ? '💔' : '⭐' }
    )
  }, [coin, isWatched, onToggleWatch])

  const handleCopySymbol = useCallback(() => {
    if (!coin?.symbol) return
    navigator.clipboard.writeText(coin.symbol.toUpperCase()).then(() => {
      toast.success(`Copied ${coin.symbol.toUpperCase()} ticker!`, { icon: '📋' })
    })
  }, [coin])

  const d          = detail || coin
  const isPositive = (d?.priceChangePercentage24h ?? 0) >= 0

  // 24h Price Position Percentage for Range Slider Bar
  const rangePercentage = useMemo(() => {
    if (!d?.high24h || !d?.low24h || !d?.currentPrice || d.high24h === d.low24h) return 50
    const pct = ((d.currentPrice - d.low24h) / (d.high24h - d.low24h)) * 100
    return Math.min(Math.max(pct, 2), 98)
  }, [d])

  // Circulating Supply percentage
  const supplyPercentage = useMemo(() => {
    if (!d?.circulatingSupply || !d?.maxSupply) return null
    return Math.min(((d.circulatingSupply / d.maxSupply) * 100), 100).toFixed(1)
  }, [d])

  return (
    <AnimatePresence>
      {coin && (
        <>
          {/* ── BACKDROP OVERLAY ──────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="drawer-overlay"
            onClick={onClose}
          />

          {/* ── SLIDE-IN PANEL ────────────────────────────────────────── */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="
              fixed inset-y-0 right-0 w-full max-w-[540px] z-50
              bg-light-surface dark:bg-dark-surface
              border-l border-light-border dark:border-dark-border
              shadow-2xl flex flex-col overflow-hidden select-none
            "
            role="dialog"
            aria-modal="true"
            aria-label={`${d?.name} details`}
          >
            {/* ── HEADER (VERTICALLY CENTERED FLEXBOX) ────────────────── */}
            <div className="
              flex items-center justify-between px-6 py-4
              border-b border-light-border dark:border-dark-border
              bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-2xl shrink-0
              rounded-b-2xl shadow-sm z-10
            ">
              {/* Left Side: Logo, Name, Symbol, Rank */}
              <div className="flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={d?.image}
                    alt={d?.name}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-primary/20 shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/44x44/3B82F6/white?text=${d?.symbol?.[0]?.toUpperCase()}`
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="font-extrabold text-base text-light-text dark:text-dark-text tracking-tight leading-none">
                      {d?.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={handleCopySymbol}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text text-2xs font-mono font-bold tracking-wider hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Click to copy ticker"
                    >
                      {d?.symbol?.toUpperCase()}
                      <FiCopy className="w-2.5 h-2.5 opacity-60" />
                    </button>
                    {d?.marketCapRank && (
                      <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        Rank #{d.marketCapRank}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Action Buttons (Favorite Star & Close) */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={handleWatchToggle}
                  className={`
                    w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200
                    ${isWatched
                      ? 'bg-warning/15 text-warning border border-warning/30 shadow-glow-sm'
                      : 'bg-light-bg dark:bg-dark-bg text-light-muted dark:text-dark-subtle border border-light-border dark:border-dark-border hover:text-warning'
                    }
                  `}
                  title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                  aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  <FiStar className={`w-5 h-5 ${isWatched ? 'fill-warning' : ''}`} />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-light-bg dark:bg-dark-bg text-light-subtle dark:text-dark-subtle border border-light-border dark:border-dark-border flex items-center justify-center hover:bg-danger/10 hover:text-danger hover:border-danger/20 transition-all duration-200"
                  aria-label="Close drawer"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* ── SCROLLABLE BODY (CONSISTENT 24PX SPACING) ─────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              {loading ? (
                /* Shimmer Skeleton */
                <div className="space-y-6 animate-pulse">
                  <div className="skeleton h-28 rounded-3xl" />
                  <div className="skeleton h-64 rounded-3xl" />
                  <div className="grid grid-cols-2 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="skeleton h-20 rounded-2xl" />
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-danger/10 text-danger border border-danger/20 flex items-center justify-center mb-4">
                    <FiActivity className="w-8 h-8" />
                  </div>
                  <p className="text-base font-bold text-danger mb-1">Failed to load coin details</p>
                  <p className="text-xs text-light-subtle dark:text-dark-subtle">
                    {error.message || 'Check your internet connection'}
                  </p>
                </div>
              ) : (
                <>
                  {/* ── PRICE CARD (AUTO-FIT CONTENT & ALIGNED GRID) ─── */}
                  <div className="
                    p-5 rounded-3xl
                    bg-gradient-to-br from-light-bg via-white to-light-bg dark:from-dark-bg dark:via-dark-card dark:to-dark-bg
                    border border-light-border dark:border-dark-border
                    shadow-card transition-all duration-300
                  ">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-2xs font-bold text-light-subtle dark:text-dark-subtle uppercase tracking-widest mb-1">
                          Current Price
                        </p>
                        <p className="text-4xl font-extrabold text-light-text dark:text-dark-text font-mono-num tracking-tight">
                          {fmt(d?.currentPrice, currency)}
                        </p>
                      </div>

                      {/* 24h Change & Gain/Loss */}
                      <div className="flex flex-col items-end">
                        <span className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-extrabold border shadow-sm
                          ${isPositive
                            ? 'bg-success/10 text-success border-success/30'
                            : 'bg-danger/10 text-danger border-danger/30'
                          }
                        `}>
                          {isPositive ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
                          {Math.abs(d?.priceChangePercentage24h ?? 0).toFixed(2)}%
                        </span>
                        <span className={`text-xs font-semibold mt-1 font-mono-num ${isPositive ? 'text-success' : 'text-danger'}`}>
                          {isPositive ? '+' : ''}{fmt(d?.priceChange24h, currency)}
                        </span>
                      </div>
                    </div>

                    {/* 24H Price Range Visual Bar */}
                    {d?.low24h && d?.high24h && (
                      <div className="pt-3 border-t border-light-border/60 dark:border-dark-border/60">
                        <div className="flex items-center justify-between text-2xs font-semibold text-light-subtle dark:text-dark-subtle mb-1.5">
                          <span>24h Low: <strong className="text-light-text dark:text-dark-text font-mono-num">{fmt(d.low24h, currency)}</strong></span>
                          <span>24h High: <strong className="text-light-text dark:text-dark-text font-mono-num">{fmt(d.high24h, currency)}</strong></span>
                        </div>
                        <div className="relative w-full h-2 rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
                          <div
                            className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${rangePercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── PRICE CHART CARD (FULL FIT & TIMEFRAME BUTTONS) ─ */}
                  <div className="rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4 shadow-card">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-light-border/60 dark:border-dark-border/60">
                      <div className="flex items-center gap-2">
                        <FiTrendingUp className={`w-4 h-4 ${isPositive ? 'text-success' : 'text-danger'}`} />
                        <h3 className="text-xs font-extrabold text-light-text dark:text-dark-text uppercase tracking-wider">
                          Price Chart
                        </h3>
                      </div>

                      {/* Timeframe Buttons: 24H, 7D, 30D, 90D, 1Y, ALL */}
                      <div className="flex items-center gap-1 bg-light-bg dark:bg-dark-bg p-1 rounded-xl border border-light-border dark:border-dark-border overflow-x-auto no-scrollbar max-w-full shrink-0">
                        {TIMEFRAMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`
                              px-2 py-1 rounded-lg text-2xs font-extrabold transition-all duration-150 shrink-0
                              ${timeframe === t
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-light-subtle dark:text-dark-subtle hover:text-light-text dark:hover:text-dark-text'
                              }
                            `}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <SparklineChart data={d?.sparkline7d} currency={currency} />
                  </div>

                  {/* ── STATISTICS SECTION (GRID 2 COLS DESKTOP, 1 COL MOBILE) ── */}
                  <div>
                    <h3 className="text-xs font-extrabold text-light-subtle dark:text-dark-subtle uppercase tracking-widest mb-3 px-1 flex items-center gap-1.5">
                      <FiBarChart2 className="w-3.5 h-3.5 text-primary" /> Key Financial Statistics
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Market Cap */}
                      <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-card-md transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <FiBarChart2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-2xs font-bold text-light-subtle dark:text-dark-subtle uppercase tracking-wider">Market Cap</span>
                          </div>
                          <p className="text-base font-extrabold text-light-text dark:text-dark-text font-mono-num">{fmtLarge(d?.marketCap, currency)}</p>
                        </div>
                        <p className="text-[10px] text-light-muted dark:text-dark-subtle mt-2 font-medium">Rank #{d?.marketCapRank || 'N/A'}</p>
                      </div>

                      {/* 24h Volume */}
                      <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-card-md transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <FiActivity className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-2xs font-bold text-light-subtle dark:text-dark-subtle uppercase tracking-wider">24h Trading Volume</span>
                          </div>
                          <p className="text-base font-extrabold text-light-text dark:text-dark-text font-mono-num">{fmtLarge(d?.totalVolume, currency)}</p>
                        </div>
                        <p className="text-[10px] text-light-muted dark:text-dark-subtle mt-2 font-medium">High liquidity</p>
                      </div>

                      {/* Circulating Supply */}
                      <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-card-md transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <FiPackage className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-2xs font-bold text-light-subtle dark:text-dark-subtle uppercase tracking-wider">Circulating Supply</span>
                          </div>
                          <p className="text-sm font-bold text-light-text dark:text-dark-text font-mono-num">
                            {fmtSupply(d?.circulatingSupply)} <span className="text-xs text-primary font-bold">{d?.symbol?.toUpperCase()}</span>
                          </p>
                        </div>
                        {supplyPercentage && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-[10px] text-light-subtle dark:text-dark-subtle mb-1">
                              <span>Minted</span>
                              <span className="font-bold text-primary">{supplyPercentage}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${supplyPercentage}%` }} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Total / Max Supply */}
                      <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-card-md transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <FiShield className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-2xs font-bold text-light-subtle dark:text-dark-subtle uppercase tracking-wider">Max Supply</span>
                          </div>
                          <p className="text-sm font-bold text-light-text dark:text-dark-text font-mono-num">
                            {d?.maxSupply ? `${fmtSupply(d.maxSupply)} ${d?.symbol?.toUpperCase()}` : '∞ Unlimited'}
                          </p>
                        </div>
                        <p className="text-[10px] text-light-muted dark:text-dark-subtle mt-2 font-medium">Fixed Hard Cap Protocol</p>
                      </div>
                    </div>
                  </div>

                  {/* ── 4. ALL-TIME RECORDS (ATH / ATL) ────────────────── */}
                  {(detail?.ath || detail?.atl) && (
                    <div>
                      <h3 className="text-xs font-extrabold text-light-subtle dark:text-dark-subtle uppercase tracking-widest mb-3 px-1 flex items-center gap-1.5">
                        <FiLayers className="w-3.5 h-3.5 text-secondary" /> All-Time Records
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* ATH */}
                        <div className="p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 hover:shadow-card-md transition-all duration-300">
                          <span className="text-2xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">All-Time High</span>
                          <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono-num mt-1">{fmt(detail.ath, currency)}</p>
                          <span className="inline-block text-2xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mt-1.5">
                            {detail.athChangePercentage?.toFixed(2)}% from ATH
                          </span>
                        </div>

                        {/* ATL */}
                        <div className="p-4 rounded-2xl bg-rose-500/8 border border-rose-500/20 hover:shadow-card-md transition-all duration-300">
                          <span className="text-2xs font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider">All-Time Low</span>
                          <p className="text-lg font-extrabold text-rose-600 dark:text-rose-400 font-mono-num mt-1">{fmt(detail.atl, currency)}</p>
                          <span className="inline-block text-2xs font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 mt-1.5">
                            +{detail.atlChangePercentage?.toFixed(0)}% from ATL
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── 5. ABOUT DESCRIPTION ────────────────────────────── */}
                  {detail?.description && (
                    <div className="p-5 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-card">
                      <h3 className="text-xs font-extrabold text-light-text dark:text-dark-text uppercase tracking-wider mb-2">
                        About {d?.name}
                      </h3>
                      <p className="text-xs text-light-subtle dark:text-dark-subtle leading-relaxed line-clamp-6">
                        {detail.description}
                      </p>
                    </div>
                  )}

                  {/* ── 6. OFFICIAL VERIFIED LINKS ──────────────────────── */}
                  {detail?.homepageUrls?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-extrabold text-light-subtle dark:text-dark-subtle uppercase tracking-widest mb-3 px-1">
                        Verified Links
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {detail.homepageUrls.map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex items-center gap-2 text-xs font-semibold
                              px-4 py-2.5 rounded-2xl
                              bg-primary/10 text-primary border border-primary/20
                              hover:bg-primary hover:text-white hover:shadow-glow-sm
                              transition-all duration-200
                            "
                          >
                            <FiGlobe className="w-3.5 h-3.5" />
                            {new URL(url).hostname}
                            <FiExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
