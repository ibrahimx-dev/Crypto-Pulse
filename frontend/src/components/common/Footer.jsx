import { FiZap, FiGithub, FiTwitter, FiGlobe, FiDatabase, FiShield, FiHeart } from 'react-icons/fi'

/**
 * Footer – premium modern application footer.
 */
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-sm">
                <FiZap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-extrabold text-lg text-light-text dark:text-dark-text tracking-tight">
                Crypto<span className="text-gradient">Pulse</span>
              </span>
            </div>
            <p className="text-xs text-light-subtle dark:text-dark-subtle max-w-sm leading-relaxed">
              Real-time cryptocurrency market intelligence dashboard. Built with Spring Boot 3 & React 19 for enterprise performance, instant search, and live price monitoring.
            </p>
            <div className="flex items-center gap-3 text-xs text-light-subtle dark:text-dark-subtle pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold text-2xs border border-success/20">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                CoinGecko API Live
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold text-2xs border border-primary/20">
                <FiShield className="w-3 h-3" />
                SSL Encrypted Proxy
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
              Market Data
            </h4>
            <ul className="space-y-2.5 text-xs text-light-subtle dark:text-dark-subtle font-medium">
              <li><a href="#coin-search-input" className="hover:text-primary transition-colors">Top 20 Cryptocurrencies</a></li>
              <li><a href="#coin-search-input" className="hover:text-primary transition-colors">Bitcoin Dominance</a></li>
              <li><a href="#coin-search-input" className="hover:text-primary transition-colors">Global Market Cap</a></li>
              <li><a href="#coin-search-input" className="hover:text-primary transition-colors">Fear & Greed Index</a></li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
              Built With
            </h4>
            <ul className="space-y-2.5 text-xs text-light-subtle dark:text-dark-subtle font-medium">
              <li><span className="hover:text-primary transition-colors">Spring Boot 3 (Java 21)</span></li>
              <li><span className="hover:text-primary transition-colors">React 19 & Vite</span></li>
              <li><span className="hover:text-primary transition-colors">Tailwind CSS & Framer Motion</span></li>
              <li><span className="hover:text-primary transition-colors">Recharts & WebClient</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-light-border/60 dark:border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-muted dark:text-dark-subtle">
          <p>© {new Date().getFullYear()} CryptoPulse FinTech. Designed for peak performance.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <FiHeart className="w-3 h-3 text-danger fill-danger" /> for senior engineering excellence
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
