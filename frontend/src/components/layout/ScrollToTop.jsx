import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

/**
 * ScrollProgressBar – thin gradient progress bar fixed to top of page.
 * Fills left-to-right as the user scrolls down the page.
 */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el     = document.documentElement
      const total  = el.scrollHeight - el.clientHeight
      const scroll = el.scrollTop || window.scrollY
      setProgress(total > 0 ? (scroll / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

/**
 * ScrollToTop – gradient FAB that appears after scrolling 400px.
 * Also renders the scroll progress bar at the top.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollProgressBar />

      <AnimatePresence>
        {visible && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="
              fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50
              w-11 h-11 lg:w-12 lg:h-12 rounded-2xl
              flex items-center justify-center
              text-white shadow-glow
              transition-shadow duration-200
            "
            style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          >
            <FiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
