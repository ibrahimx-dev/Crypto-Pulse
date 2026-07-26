import axios from 'axios'

/**
 * Axios instance pre-configured to talk to the Spring Boot backend.
 *
 * Base URL is read from the VITE_API_BASE_URL environment variable,
 * falling back to a Vite dev-proxy-compatible relative path (/api)
 * so development works without setting env vars.
 *
 * React NEVER calls CoinGecko directly – all requests go through this client.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request Interceptor ────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Attach timestamp for debugging
    config.metadata = { startTime: Date.now() }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response Interceptor ───────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config.metadata?.startTime || 0)
    if (import.meta.env.DEV) {
      console.debug(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} – ${duration}ms`)
    }
    return response
  },
  (error) => {
    const status  = error.response?.status
    const message = error.response?.data?.message || error.message || 'Something went wrong'

    if (import.meta.env.DEV) {
      console.error(`[API Error] ${status || 'Network'} – ${message}`, error)
    }

    // Normalise the error for consumers
    const normalised = {
      status,
      message,
      isNetworkError: !error.response,
      isTimeout:      error.code === 'ECONNABORTED',
    }

    return Promise.reject(normalised)
  },
)

// ─── API Methods ────────────────────────────────────────────────────────────

/**
 * Fetch the top 10 coins for a given currency.
 * @param {string} currency - e.g. 'usd' | 'inr'
 */
export const fetchTopCoins = (currency = 'usd') =>
  api.get('/coins', { params: { currency } }).then((r) => r.data.data)

/**
 * Fetch full detail for a single coin.
 * @param {string} id       - CoinGecko coin ID (e.g. 'bitcoin')
 * @param {string} currency - e.g. 'usd' | 'inr'
 */
export const fetchCoinDetail = (id, currency = 'usd') =>
  api.get(`/coins/${id}`, { params: { currency } }).then((r) => r.data.data)

export default api
