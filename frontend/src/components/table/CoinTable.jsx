import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowDown, FiArrowUp, FiDatabase, FiStar, FiExternalLink, FiCopy } from 'react-icons/fi'
import { useState, useCallback } from 'react'
import CoinRow from './CoinRow'
import TableSkeleton from './TableSkeleton'
import EmptyState from '../common/EmptyState'
import toast from 'react-hot-toast'
import AnimatedNumber from '../common/AnimatedNumber'

const COLUMNS = [
  { key: 'marketCapRank',            label: '#',          sortable: true,  align: 'center', className: 'w-12' },
  { key: 'name',                     label: 'Coin',       sortable: true,  align: 'left' },
  { key: 'currentPrice',             label: 'Price',      sortable: true,  align: 'right' },
  { key: 'priceChangePercentage24h', label: '24H %',      sortable: true,  align: 'right' },
  { key: 'marketCap',                label: 'Market Cap', sortable: true,  align: 'right',  className: 'hidden md:table-cell' },
  { key: 'totalVolume',              label: 'Volume',     sortable: true,  align: 'right',  className: 'hidden lg:table-cell' },
  { key: '_sparkline',               label: '7D Chart',   sortable: false, align: 'left',   className: 'hidden xl:table-cell' },
  { key: '_actions',                 label: '',           sortable: false, align: 'right' },
]

function formatPrice(price, currency) {
  if (price == null) return '—'
  const symbol = currency === 'inr' ? '₹' : '$'
  if (price >= 1000)  return `${symbol}${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1)     return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
  if (price >= 0.01)  return `${symbol}${price.toFixed(4)}`
  return `${symbol}${price.toFixed(8)}`
}

function formatLarge(value, currency) {
  if (value == null) return '—'
  const symbol = currency === 'inr' ? '₹' : '$'
  if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9)  return `${symbol}${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6)  return `${symbol}${(value / 1e6).toFixed(2)}M`
  return `${symbol}${value.toFixed(0)}`
}

/**
 * CoinTable – premium responsive table.
 * Automatically switches to a custom modern card grid on mobile viewports.
 */
export default function CoinTable({
  coins,
  loading,
  query,
  currency,
  watchlist,
  onToggleWatch,
  onDetails,
}) {
  const [sortKey, setSortKey] = useState('marketCapRank')
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = useCallback((key) => {
    if (!key) return
    setSortDir((prev) => (sortKey === key ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'))
    setSortKey(key)
  }, [sortKey])

  const sorted = [...coins].sort((a, b) => {
    const va = a[sortKey] ?? 0
    const vb = b[sortKey] ?? 0
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleCopySymbol = useCallback((symbol) => {
    navigator.clipboard.writeText(symbol.toUpperCase()).then(() => {
      toast.success(`Copied ${symbol.toUpperCase()}!`, { duration: 1500 })
    })
  }, [])

  return (
    <div className="
      bg-light-card dark:bg-dark-card
      border border-light-border dark:border-dark-border
      rounded-3xl overflow-hidden
      shadow-card
    ">
      {/* ── DESKTOP & TABLET VIEW ────────────────────────────────────── */}
      <div className="table-scroll hidden sm:block">
        <table className="w-full border-collapse">
          <thead className="table-sticky-head">
            <tr className="
              border-b border-light-border dark:border-dark-border
              bg-light-bg/80 dark:bg-dark-bg/80
              backdrop-blur-xl
            ">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`
                    px-4 py-3.5 text-${col.align}
                    text-2xs font-bold uppercase tracking-[0.08em]
                    text-light-subtle dark:text-dark-subtle select-none
                    ${col.className || ''}
                    ${col.sortable ? 'cursor-pointer hover:text-primary transition-colors duration-150' : ''}
                    ${sortKey === col.key ? 'text-primary' : ''}
                  `}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <motion.span
                        key={sortDir}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary"
                      >
                        {sortDir === 'asc'
                          ? <FiArrowUp className="w-3 h-3" />
                          : <FiArrowDown className="w-3 h-3" />
                        }
                      </motion.span>
                    )}
                    {col.sortable && sortKey !== col.key && (
                      <span className="opacity-20 group-hover:opacity-60">
                        <FiArrowUp className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} className="p-0">
                  <TableSkeleton rows={10} />
                </td>
              </tr>
            ) : sorted.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <EmptyState type={query ? 'search' : 'generic'} query={query} />
                </td>
              </tr>
            ) : (
              <AnimatePresence mode="popLayout">
                {sorted.map((coin, i) => (
                  <CoinRow
                    key={coin.id}
                    coin={coin}
                    index={i}
                    currency={currency}
                    isWatched={watchlist.includes(coin.id)}
                    onToggleWatch={onToggleWatch}
                    onDetails={onDetails}
                  />
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARD GRID VIEW (sm:hidden) ─────────────────────────── */}
      <div className="block sm:hidden">
        {loading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="p-4">
            <EmptyState type={query ? 'search' : 'generic'} query={query} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 p-4">
            {sorted.map((coin, i) => {
              const isWatched = watchlist.includes(coin.id)
              const isPositive = (coin.priceChangePercentage24h ?? 0) >= 0

              return (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="
                    p-4 rounded-2xl bg-light-bg dark:bg-dark-bg
                    border border-light-border dark:border-dark-border
                    flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow
                  "
                >
                  {/* Top: Logo, Name, Favorite Star */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-light-border dark:ring-dark-border"
                        onClick={() => onDetails(coin)}
                      />
                      <div>
                        <button
                          onClick={() => onDetails(coin)}
                          className="font-bold text-sm text-light-text dark:text-dark-text text-left leading-tight"
                        >
                          {coin.name}
                        </button>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold text-light-subtle dark:text-dark-subtle uppercase">
                            {coin.symbol}
                          </span>
                          <span className="text-[10px] text-light-muted dark:text-dark-subtle">
                            #{coin.marketCapRank}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleWatch(coin.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                        isWatched
                          ? 'bg-warning/10 text-warning border-warning/20'
                          : 'border-light-border dark:border-dark-border text-light-muted dark:text-dark-subtle'
                      }`}
                    >
                      <FiStar className={`w-4.5 h-4.5 ${isWatched ? 'fill-warning' : ''}`} />
                    </button>
                  </div>

                  {/* Mid: Price and 24h change */}
                  <div className="flex items-center justify-between pt-2 border-t border-light-border/40 dark:border-dark-border/40">
                    <div>
                      <p className="text-[10px] font-bold text-light-subtle dark:text-dark-subtle uppercase">Price</p>
                      <AnimatedNumber
                        value={formatPrice(coin.currentPrice, currency)}
                        className="text-sm font-bold font-mono-num text-light-text dark:text-dark-text mt-0.5"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-light-subtle dark:text-dark-subtle uppercase">24H Change</p>
                      <span className={`
                        inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-2xs font-extrabold border mt-0.5
                        ${isPositive
                          ? 'bg-success/8 text-success border-success/20'
                          : 'bg-danger/8 text-danger border-danger/20'
                        }
                      `}>
                        {isPositive ? '▲' : '▼'}
                        {Math.abs(coin.priceChangePercentage24h ?? 0).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Market Cap & View Details button */}
                  <div className="flex items-center justify-between pt-2 border-t border-light-border/40 dark:border-dark-border/40">
                    <div>
                      <p className="text-[10px] font-bold text-light-subtle dark:text-dark-subtle uppercase">Market Cap</p>
                      <span className="text-xs font-semibold text-light-text dark:text-dark-text font-mono-num">
                        {formatLarge(coin.marketCap, currency)}
                      </span>
                    </div>
                    <button
                      onClick={() => onDetails(coin)}
                      className="inline-flex items-center gap-1 text-2xs font-bold text-primary hover:underline"
                    >
                      View Details
                      <FiExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Premium Footer ─────────────────────────────────────────────── */}
      {!loading && sorted.length > 0 && (
        <div className="
          px-5 py-3.5 border-t border-light-border dark:border-dark-border
          flex items-center justify-between
          bg-light-bg/40 dark:bg-dark-bg/40
        ">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-slow" />
            <span className="text-xs text-light-subtle dark:text-dark-subtle font-medium">
              Showing <span className="font-bold text-light-text dark:text-dark-text">{sorted.length}</span> of <span className="font-bold text-light-text dark:text-dark-text">{coins.length}</span> assets
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-2xs text-light-muted dark:text-dark-subtle">
            <FiDatabase className="w-3 h-3" />
            <span>Data via <span className="font-semibold text-primary">CoinGecko</span></span>
          </div>
        </div>
      )}
    </div>
  )
}
