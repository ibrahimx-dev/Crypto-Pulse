import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { useMemo } from 'react'

/** Premium glassmorphism tooltip */
function CustomTooltip({ active, payload, currency }) {
  if (!active || !payload?.length) return null
  const value  = payload[0].value
  const symbol = currency === 'inr' ? '₹' : '$'

  return (
    <div className="
      bg-light-surface/95 dark:bg-dark-surface/95
      border border-light-border dark:border-dark-border
      rounded-2xl px-3.5 py-2.5 shadow-card-lg
      backdrop-blur-xl
    ">
      <p className="font-bold text-sm text-light-text dark:text-dark-text font-mono-num">
        {symbol}{value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  )
}

/**
 * SparklineChart – premium 7-day area chart with gradient fill.
 * Green for gain, red for loss. Used inside CoinDrawer.
 */
export default function SparklineChart({ data = [], currency = 'usd' }) {
  const chartData = useMemo(() => {
    if (!data?.length) return []
    const step = Math.max(1, Math.floor(data.length / 168))
    return data
      .filter((_, i) => i % step === 0)
      .map((price, i) => ({ price, i }))
  }, [data])

  if (!chartData.length) {
    return (
      <div className="h-52 flex items-center justify-center">
        <p className="text-sm text-light-muted dark:text-dark-subtle">No chart data available</p>
      </div>
    )
  }

  const firstPrice = chartData[0].price
  const lastPrice  = chartData[chartData.length - 1].price
  const isUp       = lastPrice >= firstPrice
  const lineColor  = isUp ? '#22C55E' : '#EF4444'
  const gradId     = `areaGrad-${isUp ? 'up' : 'dn'}`

  return (
    <div className="h-52 w-full px-1 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 6, right: 4, bottom: 0, left: 4 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={lineColor} stopOpacity={0.2} />
              <stop offset="60%"  stopColor={lineColor} stopOpacity={0.06} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148,163,184,0.08)"
            vertical={false}
          />

          <XAxis dataKey="i" hide />
          <YAxis
            hide={false}
            domain={['auto', 'auto']}
            tickLine={false}
            axisLine={false}
            width={0}
          />

          <Tooltip
            content={<CustomTooltip currency={currency} />}
            cursor={{ stroke: lineColor, strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.6 }}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={{ r: 5, fill: lineColor, stroke: '#fff', strokeWidth: 2.5 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
