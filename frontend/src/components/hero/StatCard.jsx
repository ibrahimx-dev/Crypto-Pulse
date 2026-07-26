import { motion } from 'framer-motion'
import AnimatedNumber from '../common/AnimatedNumber'

/**
 * StatCard – premium metric card with gradient icon, accent top border,
 * hover lift, and beautiful loading skeleton.
 */
export default function StatCard({ icon, label, value, sub, color = 'primary', loading, change }) {
  const colorMap = {
    primary: {
      icon:    'text-primary',
      iconBg:  'bg-gradient-to-br from-primary/20 to-secondary/20',
      accent:  'from-primary to-secondary',
      glow:    'hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)]',
      border:  'group-hover:border-primary/30',
    },
    success: {
      icon:    'text-success',
      iconBg:  'bg-gradient-to-br from-success/20 to-emerald-400/15',
      accent:  'from-success to-emerald-400',
      glow:    'hover:shadow-[0_8px_32px_rgba(34,197,94,0.2)]',
      border:  'group-hover:border-success/30',
    },
    danger: {
      icon:    'text-danger',
      iconBg:  'bg-gradient-to-br from-danger/20 to-rose-400/15',
      accent:  'from-danger to-rose-400',
      glow:    'hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]',
      border:  'group-hover:border-danger/30',
    },
    warning: {
      icon:    'text-warning',
      iconBg:  'bg-gradient-to-br from-warning/20 to-amber-300/15',
      accent:  'from-warning to-amber-400',
      glow:    'hover:shadow-[0_8px_32px_rgba(245,158,11,0.2)]',
      border:  'group-hover:border-warning/30',
    },
    purple: {
      icon:    'text-purple-500',
      iconBg:  'bg-gradient-to-br from-purple-500/20 to-pink-400/15',
      accent:  'from-purple-500 to-pink-400',
      glow:    'hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)]',
      border:  'group-hover:border-purple-500/30',
    },
    secondary: {
      icon:    'text-secondary',
      iconBg:  'bg-gradient-to-br from-secondary/20 to-purple-400/15',
      accent:  'from-secondary to-purple-400',
      glow:    'hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)]',
      border:  'group-hover:border-secondary/30',
    },
  }
  const c = colorMap[color] || colorMap.primary

  if (loading) {
    return (
      <div className="stat-card">
        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl skeleton" />
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl skeleton" />
          <div className="w-16 h-5 skeleton rounded-full" />
        </div>
        <div className="w-20 h-3 skeleton rounded mb-3" />
        <div className="w-28 h-7 skeleton rounded-lg" />
        <div className="w-24 h-2.5 skeleton rounded mt-2" />
      </div>
    )
  }

  const isPositive = change == null || change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16,1,0.3,1] } }}
      className={`stat-card group border-light-border dark:border-dark-border transition-all duration-250 ${c.glow} ${c.border}`}
    >
      {/* Gradient accent top line */}
      <div className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${c.accent} opacity-70 group-hover:opacity-100 transition-opacity duration-250`} />

      {/* Icon + change badge */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${c.iconBg} transition-transform duration-200 group-hover:scale-110`}>
          <span className={`${c.icon}`}>{icon}</span>
        </div>

        {/* Change badge */}
        {change !== undefined && change !== null && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            isPositive
              ? 'bg-success/8 text-success border-success/20'
              : 'bg-danger/8 text-danger border-danger/20'
          }`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-2xs font-semibold text-light-subtle dark:text-dark-subtle uppercase tracking-widest mb-1.5">
        {label}
      </p>

      {/* Primary value */}
      <AnimatedNumber
        value={value}
        className="block text-xl font-extrabold text-light-text dark:text-dark-text font-mono-num"
      />

      {/* Sub text */}
      {sub && (
        <p className="text-xs text-light-subtle dark:text-dark-subtle mt-1.5 font-medium">{sub}</p>
      )}

      {/* Subtle background glow */}
      <div className={`absolute bottom-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${c.accent} opacity-[0.04] blur-xl pointer-events-none`} />
    </motion.div>
  )
}
