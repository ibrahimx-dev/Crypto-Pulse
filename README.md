# CryptoPulse 🚀

> **Enterprise-level Real-Time Cryptocurrency & Market Dashboard**
>
> Built as a Junior Developer Internship assessment project.
> Designed to look and feel like a premium fintech SaaS product.

---

## 🌟 Features

### Core
- 📊 **Live Market Data** – Top 10 cryptocurrencies by market cap (via CoinGecko, proxied through Spring Boot)
- 🔍 **Instant Search** – Filter coins by name or ticker symbol with real-time results
- ⭐ **Watchlist** – Star favourite coins; persisted in LocalStorage across refreshes
- 🗂 **Sliding Drawer** – Beautiful animated right-panel for full coin details (NOT a popup)
- 📈 **Sparkline Charts** – 7-day price charts with Recharts in both the table and drawer
- 🔄 **Manual Refresh** – Refresh button with animated spinner; toast notifications on success

### UI/UX
- 🌙 **Dark / Light Mode** – OS-preference detection + LocalStorage persistence
- 💱 **Currency Switch** – Toggle between USD ($) and INR (₹) with instant data update
- ⏰ **Live Clock** – Real-time HH:MM:SS with date in the hero section
- 💀 **Skeleton Loading** – Animated placeholder cards while data loads
- ❌ **Error States** – Beautiful illustrated error screens for network / server / generic errors
- 📭 **Empty States** – Friendly empty-state screens for search and watchlist
- ⌨️ **Keyboard Shortcuts** – `/` search, `R` refresh, `D` dark mode, `Esc` clear
- 🔝 **Scroll To Top** – Floating action button appears after 400px scroll
- 🔔 **Toast Notifications** – Global notification system via React Hot Toast
- 📋 **Copy Symbol** – Click on any coin symbol to copy to clipboard
- 📱 **Fully Responsive** – Optimised for mobile, tablet, and desktop

### Table
- ↕️ **Column Sorting** – Click any header to sort ascending / descending
- 🎯 **Rank, Name, Symbol, Price, 24H Change, Market Cap, Volume, Mini Sparkline**

---

## 🏗 Architecture

```
CoinGecko API
     │  (HTTP via WebClient – server side only)
     ▼
┌─────────────────────────────────────┐
│  Spring Boot 3 (Java 21)            │
│  ┌──────────────┐                   │
│  │ CoinController│◄── GET /api/coins │
│  │              │◄── GET /api/coins/{id}│
│  └──────┬───────┘                   │
│         │                           │
│  ┌──────▼───────┐                   │
│  │CoinService   │                   │
│  │(interface)   │                   │
│  └──────┬───────┘                   │
│         │                           │
│  ┌──────▼───────┐  ┌─────────────┐  │
│  │CoinServiceImpl│  │ CoinMapper  │  │
│  │(WebClient)   │─►│(Model→DTO)  │  │
│  └──────────────┘  └─────────────┘  │
│  GlobalExceptionHandler              │
│  CORS Config (CorsFilter)            │
└─────────────────────────────────────┘
     │
  REST JSON (Axios)
     │
     ▼
┌─────────────────────────────────────┐
│  React 19 + Vite                    │
│  ┌─────────────────────────────┐    │
│  │ ThemeContext + CryptoContext │    │
│  └──────────────┬──────────────┘    │
│                 │                   │
│  ┌──────────────▼──────────────┐    │
│  │ Dashboard Page              │    │
│  │  Navbar │ HeroSection       │    │
│  │  CoinTable │ CoinDrawer     │    │
│  └─────────────────────────────┘    │
│  WatchlistPage                      │
└─────────────────────────────────────┘
```

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 21 | Language (LTS) |
| Spring Boot | 3.2.5 | Framework |
| Spring WebFlux | 3.2.5 | WebClient (reactive HTTP) |
| Spring Web | 3.2.5 | REST controllers |
| Lombok | latest | Boilerplate reduction |
| Jakarta Validation | 3.x | Request validation |
| Maven | 3.9+ | Build tool |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 5 | Build tool / dev server |
| Tailwind CSS | 3.4 | Utility-first CSS |
| Framer Motion | 11 | Animations |
| Recharts | 2.12 | Charts / sparklines |
| Axios | 1.7 | HTTP client |
| React Hot Toast | 2.4 | Toast notifications |
| React Icons | 5.2 | Icon library |

---

## 📁 Folder Structure

```
CryptoPulse/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/cryptopulse/
│       ├── CryptoPulseApplication.java
│       ├── config/
│       │   ├── WebClientConfig.java
│       │   └── CorsConfig.java
│       ├── controller/
│       │   └── CoinController.java
│       ├── service/
│       │   └── CoinService.java
│       ├── serviceImpl/
│       │   └── CoinServiceImpl.java
│       ├── dto/
│       │   ├── ApiResponse.java
│       │   ├── CoinSummaryDto.java
│       │   └── CoinDetailDto.java
│       ├── model/
│       │   ├── CoinGeckoMarket.java
│       │   └── CoinGeckoDetail.java
│       ├── mapper/
│       │   └── CoinMapper.java
│       ├── exception/
│       │   ├── GlobalExceptionHandler.java
│       │   ├── CoinNotFoundException.java
│       │   └── ExternalApiException.java
│       └── util/
│           └── AppConstants.java
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── services/api.js
        ├── context/
        │   ├── ThemeContext.jsx
        │   └── CryptoContext.jsx
        ├── hooks/
        │   ├── useWatchlist.js
        │   ├── useSearch.js
        │   └── useKeyboardShortcuts.js
        ├── components/
        │   ├── layout/  (Navbar, ScrollToTop)
        │   ├── hero/    (HeroSection, LiveClock, StatCard)
        │   ├── table/   (CoinTable, CoinRow, TableSkeleton)
        │   ├── drawer/  (CoinDrawer, SparklineChart)
        │   └── common/  (ErrorState, EmptyState, AnimatedNumber)
        └── pages/
            ├── Dashboard.jsx
            └── WatchlistPage.jsx
```

---

## 🚀 Installation & Running Locally

### Prerequisites
- Java 21+
- Maven 3.9+
- Node.js 20+

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CryptoPulse.git
cd CryptoPulse
```

### 2. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts at **http://localhost:8080**

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at **http://localhost:5173**

> The Vite dev server proxies all `/api/*` requests to `localhost:8080`, so no CORS issues during development.

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### GET /api/coins
Returns the top 10 cryptocurrencies by market cap.

**Query Params:**
| Param | Type | Default | Description |
|---|---|---|---|
| `currency` | string | `usd` | Target currency (e.g. `usd`, `inr`) |

**Response:**
```json
{
  "success": true,
  "message": "Top 10 coins fetched successfully",
  "data": [
    {
      "id": "bitcoin",
      "name": "Bitcoin",
      "symbol": "BTC",
      "image": "https://...",
      "marketCapRank": 1,
      "currentPrice": 67000.00,
      "priceChangePercentage24h": 2.35,
      "priceChange24h": 1543.21,
      "marketCap": 1300000000000,
      "totalVolume": 28000000000,
      "high24h": 68000.00,
      "low24h": 65000.00,
      "circulatingSupply": 19700000.0,
      "totalSupply": 21000000.0,
      "sparkline7d": [65000.0, 65500.0, "..."]
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### GET /api/coins/{id}
Returns full detail for a single coin.

**Path Params:** `id` – CoinGecko coin ID (e.g. `bitcoin`, `ethereum`)

**Response:** Same structure with additional fields:
- `description` – plain-text coin description (HTML stripped)
- `ath` / `athChangePercentage` / `athDate`
- `atl` / `atlChangePercentage` / `atlDate`
- `maxSupply`
- `homepageUrls`
- `platform`

### GET /api/health
Health check endpoint.

**Response:**
```json
{ "success": true, "message": "OK", "data": "CryptoPulse API is running" }
```

### Error Response Format
All errors follow the same envelope:
```json
{
  "success": false,
  "message": "Coin not found with id: invalid-coin",
  "statusCode": 404,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## ☁️ Deployment

### Backend → Render

1. Push backend to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set:
   - **Build Command:** `mvn clean install -DskipTests`
   - **Start Command:** `java -jar target/cryptopulse-backend-1.0.0.jar`
   - **Environment Variable:** `CORS_ALLOWED_ORIGINS=https://your-app.vercel.app`
4. Note your Render URL (e.g. `https://cryptopulse-api.onrender.com`)

### Frontend → Vercel

1. Push frontend to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Environment Variable:** `VITE_API_BASE_URL=https://cryptopulse-api.onrender.com/api`
4. Deploy!

---

## 🏛 Design Principles

- **SOLID Principles** – Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **DTO Pattern** – Raw CoinGecko models never leak to the frontend
- **Clean Architecture** – Controller → Service (interface) → ServiceImpl → Mapper → Model
- **Error Boundaries** – GlobalExceptionHandler + frontend ErrorState
- **Performance** – React.memo, useMemo, useCallback, code splitting, lazy loading

---

## 🔮 Future Improvements

- [ ] Portfolio tracking with profit/loss calculation
- [ ] Price alerts with WebSocket push notifications
- [ ] Historical OHLC candlestick charts
- [ ] News feed integration
- [ ] Redis caching layer on the backend
- [ ] User authentication (JWT)
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) support
- [ ] Real Fear & Greed Index API integration
- [ ] Export to CSV

---

## 📄 License

MIT License – see [LICENSE](./LICENSE)

---

<div align="center">
  <strong>Built with ❤️ by CryptoPulse</strong><br/>
  <sub>Java 21 · Spring Boot 3 · React 19 · Tailwind CSS · Framer Motion</sub>
</div>
