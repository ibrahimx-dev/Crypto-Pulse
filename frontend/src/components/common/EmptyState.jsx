import { motion } from 'framer-motion'
import { FiSearch, FiStar, FiTrendingUp } from 'react-icons/fi'

const CONFIGS = {
  search: {
    icon:    <FiSearch className="w-8 h-8" />,
    color:   'text-primary',
    bg:      'bg-primary/10',
    title:   'No results found',
    subtitle: (query) => `No coins matched "${query}". Try a different search term.`,
    cta:     null,
  },
  watchlist: {
    icon:    <FiStar className="w-8 h-8" />,
    color:   'text-warning',
    bg:      'bg-warning/10',
    title:   'Your watchlist is empty',
    subtitle: () => 'Star coins from the main dashboard to track your favourites here.',
    cta:     'Go to Dashboard',
  },
  generic: {
    icon:    <FiTrendingUp className="w-8 h-8" />,
    color:   'text-primary',
    bg:      'bg-primary/10',
    title:   'No market data',
    subtitle: () => 'Unable to load coin data. Please refresh to try again.',
    cta:     null,
  },
}

/**
 * EmptyState – premium illustrated empty state component.
 */
export default function EmptyState({ type = 'generic', query = '', onClear }) {
  const cfg = CONFIGS[type] || CONFIGS.generic

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {/* Animated icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={`w-20 h-20 rounded-3xl ${cfg.bg} flex items-center justify-center mb-6 ${cfg.color}`}
      >
        {cfg.icon}
      </motion.div>

      <h3 className="text-xl font-extrabold text-light-text dark:text-dark-text mb-2">
        {cfg.title}
      </h3>
      <p className="text-sm text-light-subtle dark:text-dark-subtle max-w-xs leading-relaxed mb-6">
        {cfg.subtitle(query)}
      </p>

      {onClear && cfg.cta && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className="btn-primary"
        >
          {cfg.cta}
        </motion.button>
      )}
    </motion.div>
  )
}
