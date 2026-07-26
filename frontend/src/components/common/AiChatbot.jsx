import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCpu, FiUser, FiZap, FiBookOpen, FiShield, FiTrendingUp, FiSparkles } from 'react-icons/fi'

const QUICK_TOPICS = [
  '💡 How to start investing with $50?',
  '📊 Bitcoin vs Altcoins – Which is safer?',
  '🛡️ 5 Rules to protect my money',
  '🔍 Explain Market Cap & 24h Volume',
  '⚠️ How to spot & avoid crypto scams?',
]

/**
 * Advanced Dynamic NLP Knowledge Engine for Crypto, Market & Investment.
 * Fallback to this rich engine or optional Gemini AI API key.
 */
async function generateSmartResponse(userMessage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  // ── 1. If Gemini API Key exists, call live Gemini AI model ─────────────────
  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are PulseAI, an expert, encouraging, warm, and highly supportive Crypto Market & Investment Advisor. Answer the client's question simply, clearly, with emojis and bullet points. Never give financial guarantee advice, but educate them on risk management, DCA, market metrics, and smart investing.\n\nUser Question: ${userMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      )
      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) return text
    } catch (e) {
      console.warn('Gemini API call failed, using built-in AI advisor', e)
    }
  }

  // ── 2. Highly Intelligent Built-in Advisor Engine ──────────────────────────
  const q = userMessage.toLowerCase()

  if (q.includes('start') || q.includes('50') || q.includes('how to invest') || q.includes('begin') || q.includes('budget')) {
    return `🌱 **How to Start Investing (Even with $10 or $50):**

Welcome! Investing in crypto doesn't require thousands of dollars. Here is your step-by-step roadmap:

1. 🎯 **Start with Dollar-Cost Averaging (DCA):**
   Invest a small, fixed amount regularly (e.g., $10 every week). This eliminates the stress of timing the market.

2. 🏆 **Focus 80% on Established Blue-Chips:**
   Put the majority of your capital into **Bitcoin (BTC)** and **Ethereum (ETH)**. They have proven liquidity, institutional adoption, and strong security.

3. 🛡️ **Never Invest Emergency Money:**
   Only use disposable income. Keep 3-6 months of living expenses in cash before buying crypto.

4. 📱 **Use Top-Tier Licensed Exchanges:**
   Stick to reputable platforms like Coinbase, Binance, or Kraken. Enable 2-Factor Authentication (2FA) immediately!`
  }

  if (q.includes('btc vs alt') || q.includes('bitcoin vs') || q.includes('compare') || q.includes('which is safer') || q.includes('difference')) {
    return `⚖️ **Bitcoin vs. Altcoins – What You Should Know:**

• 🟠 **Bitcoin (BTC) – "Digital Gold":**
  - **Risk:** Lower (Relative to crypto)
  - **Purpose:** Store of value & global sound money.
  - **Best For:** Long-term wealth preservation & steady growth.

• 🌐 **Ethereum & Top Altcoins (ETH, SOL, ADA):**
  - **Risk:** Medium to High
  - **Purpose:** Smart contract platforms, DeFi apps, & web3 ecosystems.
  - **Best For:** Higher growth potential, but with larger price swings.

💡 *Pro Tip for Beginners:* A classic balanced portfolio is **60% BTC, 30% ETH, and 10% Top Altcoins**.`
  }

  if (q.includes('protect') || q.includes('rule') || q.includes('risk') || q.includes('loss') || q.includes('safe')) {
    return `🛡️ **5 Golden Rules to Protect Your Capital:**

1. 🔒 **Secure Your Credentials:**
   Use a dedicated email, strong unique password, and App-based 2FA (Google Authenticator, NOT SMS).

2. 🧘 **Control Emotional Trading (No FOMO):**
   When a coin is green (+30% today), resist the urge to jump in. Buying after a massive pump often leads to buying the top.

3. 📉 **Understand Volatility:**
   5% to 10% daily price swings are normal in crypto. Don't panic-sell during minor dips.

4. 📜 **Do Your Own Research (DYOR):**
   Never buy a coin based on social media hype or TikTok influencers.

5. 🗝️ **Self-Custody (For Large Sums):**
   For significant savings, consider a hardware cold wallet (Trezor or Ledger) so you control your private keys.`
  }

  if (q.includes('market cap') || q.includes('volume') || q.includes('metric') || q.includes('rank') || q.includes('explain')) {
    return `🔍 **Understanding Dashboard Crypto Metrics:**

• 💰 **Price:** The current exchange rate for 1 coin. (Note: A $0.01 coin isn't automatically "cheaper" than a $100 coin!)
• 📦 **Circulating Supply:** Total coins currently available in the public market.
• 📊 **Market Cap = Price × Circulating Supply:**
  The TRUE measure of a project's size. Bitcoin is #1 because its total market cap is over $1.3 Trillion.
• 🔄 **24H Volume:** Total money traded in the last 24 hours. High volume means it's easy to buy or sell without moving the price.`
  }

  if (q.includes('scam') || q.includes('fake') || q.includes('hack') || q.includes('telegram') || q.includes('giveaway')) {
    return `⚠️ **Critical Crypto Scam Warning Signs:**

• ❌ **"Double Your Crypto" Giveaways:** Anyone asking you to send 1 BTC to receive 2 BTC back is 100% a scam.
• ❌ **Direct Messages (DMs) on Telegram/Discord:** Official support members will NEVER message you first.
• ❌ **Seed Phrase Requests:** Never enter your 12/24 word seed phrase on any website or form.
• ❌ **Guaranteed Returns:** No real investment guarantees profit. High return promises = Ponzi scheme.`
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('help')) {
    return `👋 **Hello! Welcome to CryptoPulse Advisor.**

I'm here to support you with clear, friendly, and practical guidance on:
• Safe crypto investing strategies for beginners
• Understanding market metrics (Market Cap, Volume, Dominance)
• Protecting your funds and avoiding common scams
• Building a balanced portfolio

What would you like to explore today? Feel free to ask any question or tap a topic below!`
  }

  return `🤝 **Thank you for asking!**

Crypto can feel overwhelming at first, but with a simple step-by-step approach, you can navigate it safely:

1. **Focus on Quality:** Stick to top market cap coins (Bitcoin & Ethereum).
2. **Invest Consistently:** Use small weekly investments (Dollar Cost Averaging).
3. **Stay Secure:** Enable 2FA and never share private keys.

If you have a specific question about a coin, risk management, or market terms, type it here and I'll explain it simply!`
}

/**
 * AiChatbot – Dynamic Advisor & Client Support Widget.
 */
export default function AiChatbot() {
  const [isOpen, setIsOpen]     = useState(false)
  const [input, setInput]       = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hello! I'm **PulseAI**, your personal crypto market & investment guide.\n\nWhether you're new to crypto or looking for smart investment strategies, ask me anything or select a topic below!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const chatEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  const handleSend = useCallback(async (textToSend) => {
    const text = (textToSend || input).trim()
    if (!text) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    const responseText = await generateSmartResponse(text)

    setIsTyping(false)
    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: responseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, aiMsg])
  }, [input])

  return (
    <>
      {/* ── Floating Toggle FAB ───────────────────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          fixed bottom-6 left-6 z-50
          flex items-center gap-2.5 px-4 py-3 rounded-full
          bg-gradient-to-r from-primary via-blue-600 to-purple-600
          text-white font-semibold text-xs shadow-glow
          hover:shadow-lg transition-all duration-200
        "
        aria-label="Open PulseAI Advisor"
      >
        <FiSparkles className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span className="hidden sm:inline">PulseAI Advisor</span>
      </motion.button>

      {/* ── Modal Popover ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="
              fixed bottom-20 left-4 sm:left-6 z-50
              w-[calc(100vw-32px)] sm:w-[410px] h-[550px] max-h-[82vh]
              bg-light-surface dark:bg-dark-surface
              border border-light-border dark:border-dark-border
              rounded-3xl shadow-2xl flex flex-col overflow-hidden
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-light-border dark:border-dark-border bg-gradient-to-r from-primary/15 via-purple-500/10 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow-sm">
                  <FiTrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-light-text dark:text-dark-text leading-tight flex items-center gap-1.5">
                    PulseAI Advisor
                    <span className="w-2 h-2 rounded-full bg-success animate-ping" />
                  </h3>
                  <p className="text-2xs text-light-muted dark:text-dark-muted">
                    Market & Investment Guidance
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="btn-icon"
                aria-label="Close Chat"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <FiCpu className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`
                      max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line
                      ${msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-xs shadow-sm'
                        : 'bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-bl-xs'
                      }
                    `}
                  >
                    {msg.text}
                    <span className={`block text-[9px] mt-1 text-right opacity-70 ${msg.sender === 'user' ? 'text-white' : 'text-light-muted dark:text-dark-muted'}`}>
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <FiUser className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
                  <FiCpu className="w-3.5 h-3.5 animate-spin text-primary" />
                  <span>PulseAI is thinking…</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Topics Pills */}
            <div className="px-3 py-2 border-t border-light-border dark:border-dark-border bg-light-bg/50 dark:bg-dark-bg/50 flex gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_TOPICS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-lg text-2xs font-medium bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-primary hover:border-primary shrink-0 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 border-t border-light-border dark:border-dark-border flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask PulseAI any crypto question…"
                className="input-field py-2 text-xs flex-1"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="btn-primary p-2 rounded-xl disabled:opacity-40 shrink-0"
                aria-label="Send message"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
