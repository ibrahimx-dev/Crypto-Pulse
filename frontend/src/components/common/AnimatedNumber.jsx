import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * AnimatedNumber – smoothly animates numeric value transitions.
 *
 * Detects whether the new value is higher or lower to briefly flash
 * a green (up) or red (down) colour for visual feedback.
 *
 * @param {number|string} value      - The formatted string to display
 * @param {string}        className  - Additional CSS classes
 */
export default function AnimatedNumber({ value, className = '' }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [direction, setDirection]       = useState(null) // 'up' | 'down' | null

  useEffect(() => {
    if (value === displayValue) return

    // Determine flash direction by comparing numeric content
    const prev = parseFloat(String(displayValue).replace(/[^0-9.-]/g, ''))
    const next = parseFloat(String(value).replace(/[^0-9.-]/g, ''))
    if (!isNaN(prev) && !isNaN(next)) {
      setDirection(next > prev ? 'up' : next < prev ? 'down' : null)
    }

    setDisplayValue(value)

    // Reset direction after animation
    const timer = setTimeout(() => setDirection(null), 800)
    return () => clearTimeout(timer)
  }, [value])  // eslint-disable-line react-hooks/exhaustive-deps

  const flashClass =
    direction === 'up'   ? 'text-success' :
    direction === 'down' ? 'text-danger'  : ''

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={displayValue}
        initial={{ opacity: 0.7, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`font-mono-num transition-colors duration-500 ${flashClass} ${className}`}
      >
        {displayValue}
      </motion.span>
    </AnimatePresence>
  )
}
