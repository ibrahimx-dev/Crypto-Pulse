/**
 * TableSkeleton – premium shimmer skeleton for the coin table.
 * Matches the exact layout of real CoinRow entries.
 */
export default function TableSkeleton({ rows = 10 }) {
  return (
    <div className="w-full">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-4 border-b border-light-border/40 dark:border-dark-border/40"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          {/* Rank */}
          <div className="skeleton h-3 w-5 rounded shrink-0" />

          {/* Coin image + name */}
          <div className="flex items-center gap-3 flex-1 min-w-[160px]">
            <div className="skeleton w-9 h-9 rounded-xl shrink-0" />
            <div className="space-y-2">
              <div className="skeleton h-3.5 w-20 rounded-lg" />
              <div className="skeleton h-2.5 w-10 rounded-md" />
            </div>
          </div>

          {/* Price */}
          <div className="skeleton h-3.5 w-24 rounded-lg ml-auto" />

          {/* 24h change */}
          <div className="skeleton h-6 w-16 rounded-full" />

          {/* Market Cap */}
          <div className="skeleton h-3.5 w-28 rounded-lg hidden md:block" />

          {/* Volume */}
          <div className="skeleton h-3.5 w-24 rounded-lg hidden lg:block" />

          {/* Sparkline */}
          <div className="skeleton h-9 w-20 rounded-xl hidden xl:block" />

          {/* Actions */}
          <div className="flex gap-1.5">
            <div className="skeleton w-8 h-8 rounded-xl" />
            <div className="skeleton w-8 h-8 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
