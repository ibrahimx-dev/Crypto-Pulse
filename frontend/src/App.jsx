import { useState, useCallback } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import Dashboard from './pages/Dashboard'
import WatchlistPage from './pages/WatchlistPage'
import MobileBottomNav from './components/layout/MobileBottomNav'
import { CryptoProvider } from './context/CryptoContext'
import { ThemeProvider } from './context/ThemeContext'
import { useWatchlist } from './hooks/useWatchlist'


/**
 * App – root component that wires together providers and page navigation.
 */
function AppContent() {
  const [page, setPage] = useState('dashboard') // 'dashboard' | 'watchlist'
  const { watchlist } = useWatchlist()

  const goToWatchlist  = useCallback(() => setPage('watchlist'), [])
  const goToDashboard  = useCallback(() => setPage('dashboard'), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {page === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Dashboard onWatchlistClick={goToWatchlist} />
          </motion.div>
        ) : (
          <motion.div
            key="watchlist"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <WatchlistPage onBack={goToDashboard} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Tab Bar – hidden on lg+ */}
      <MobileBottomNav
        page={page}
        onGoHome={goToDashboard}
        onGoWatchlist={goToWatchlist}
        watchlistCount={watchlist.length}
      />

      {/* Global toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--surface, #1E293B)',
            color: 'var(--text, #E2E8F0)',
            border: '1px solid var(--border, #334155)',
            borderRadius: '12px',
            fontSize: '13px',
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: '64px', // lift toasts above bottom nav on mobile
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: 'white' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: 'white' },
          },
        }}
      />
    </>
  )
}


/**
 * Root App – wraps everything in theme and crypto providers.
 */
export default function App() {
  return (
    <ThemeProvider>
      <CryptoProvider>
        <AppContent />
      </CryptoProvider>
    </ThemeProvider>
  )
}
