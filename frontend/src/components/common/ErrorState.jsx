import { motion } from 'framer-motion'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

/**
 * ErrorState – premium error card with animated warning icon and retry.
 */
export default function ErrorState({ error, onRetry }) {
  const message = error?.message || 'Something went wrong while fetching market data.'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {/* Animated warning icon */}
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-20 h-20 rounded-3xl bg-danger/10 border border-danger/20 flex items-center justify-center mb-6"
      >
        <FiAlertTriangle className="w-9 h-9 text-danger" />
      </motion.div>

      <h3 className="text-xl font-extrabold text-light-text dark:text-dark-text mb-2">
        Failed to Load Data
      </h3>
      <p className="text-sm text-light-subtle dark:text-dark-subtle max-w-xs leading-relaxed mb-6">
        {message}
      </p>

      {onRetry && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-primary"
        >
          <FiRefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}
