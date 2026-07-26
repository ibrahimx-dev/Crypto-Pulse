/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Brand Palette ────────────────────────────────────────────────
        primary: {
          DEFAULT: '#3B82F6',
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#6366F1',
          500: '#6366F1',
          600: '#4F46E5',
        },
        success: {
          DEFAULT: '#22C55E',
          light:   '#DCFCE7',
          dark:    '#16A34A',
        },
        danger: {
          DEFAULT: '#EF4444',
          light:   '#FEE2E2',
          dark:    '#DC2626',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light:   '#FEF3C7',
          dark:    '#D97706',
        },

        // ─── Flat color keys for PostCSS @apply compatibility ─────────────
        'dark-bg':      '#0B1220',
        'dark-surface': '#111827',
        'dark-card':    '#111827',
        'dark-card2':   '#1A2235',
        'dark-border':  '#1E2D45',
        'dark-muted':   '#64748B',
        'dark-text':    '#E2E8F0',
        'dark-subtle':  '#64748B',

        'light-bg':      '#F8FAFC',
        'light-surface': '#FFFFFF',
        'light-card':    '#FFFFFF',
        'light-border':  '#E2E8F0',
        'light-muted':   '#94A3B8',
        'light-text':    '#111827',
        'light-subtle':  '#64748B',

        // ─── Nested Dark / Light Mode Surfaces ───────────────────────────
        dark: {
          bg:      '#0B1220',
          surface: '#111827',
          card:    '#111827',
          card2:   '#1A2235',
          border:  '#1E2D45',
          muted:   '#64748B',
          text:    '#E2E8F0',
          subtle:  '#64748B',
        },
        light: {
          bg:      '#F8FAFC',
          surface: '#FFFFFF',
          card:    '#FFFFFF',
          border:  '#E2E8F0',
          muted:   '#94A3B8',
          text:    '#111827',
          subtle:  '#64748B',
        },
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.5rem'  }],
        '5xl': ['3rem',     { lineHeight: '1'        }],
      },
      boxShadow: {
        card:       '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md':  '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'card-lg':  '0 20px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06)',
        'card-xl':  '0 32px 64px rgba(0,0,0,0.14), 0 16px 32px rgba(0,0,0,0.08)',
        glow:       '0 0 24px rgba(59,130,246,0.35)',
        'glow-sm':  '0 0 12px rgba(59,130,246,0.25)',
        'glow-lg':  '0 0 40px rgba(59,130,246,0.4)',
        'glow-purple': '0 0 20px rgba(99,102,241,0.35)',
        'glow-green':  '0 0 16px rgba(34,197,94,0.3)',
        'glow-red':    '0 0 16px rgba(239,68,68,0.3)',
        inner:      'inset 0 2px 4px rgba(0,0,0,0.06)',
        premium:    '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
        'dark-card':'0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs:   '2px',
        '2xl': '24px',
        '3xl': '40px',
      },
      animation: {
        'fade-in':       'fadeIn 0.35s ease-out',
        'slide-up':      'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-down':    'slideDown 0.35s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right':'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':      'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1)',
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'pulse-fast':    'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite',
        'number-tick':   'numberTick 0.3s ease-out',
        'shimmer':       'shimmer 2s linear infinite',
        'spin-slow':     'spin 3s linear infinite',
        'bounce-soft':   'bounceSoft 2s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'glow-pulse':    'glowPulse 2s ease-in-out infinite',
        'draw-line':     'drawLine 1.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(59,130,246,0.25)' },
          '50%':      { boxShadow: '0 0 24px rgba(59,130,246,0.5)' },
        },
        drawLine: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        numberTick: {
          '0%':   { transform: 'translateY(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-card':     'linear-gradient(135deg, var(--tw-gradient-stops))',
        'shimmer-gradient':  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        'mesh-light':        'radial-gradient(at 40% 20%, rgba(99,102,241,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59,130,246,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(168,85,247,0.04) 0px, transparent 50%)',
        'mesh-dark':         'radial-gradient(at 40% 20%, rgba(99,102,241,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59,130,246,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(168,85,247,0.08) 0px, transparent 50%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
