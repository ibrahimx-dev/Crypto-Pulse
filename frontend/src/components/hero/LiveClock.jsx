import { useEffect, useState } from 'react'

/**
 * LiveClock – premium animated digital clock.
 * Shows HH:MM large, :SS smaller, with date below.
 * Glassmorphism card style.
 */
export default function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const [hhmm, period] = hh.split(' ')
  const ss = time.toLocaleTimeString('en-US', { second: '2-digit' }).padStart(2, '0')

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month:   'long',
    day:     'numeric',
    year:    'numeric',
  })

  return (
    <div className="
      flex flex-col items-end select-none
      px-4 py-3 rounded-2xl
      bg-white/60 dark:bg-dark-card/60
      border border-light-border/60 dark:border-dark-border/60
      backdrop-blur-xl shadow-card
    ">
      {/* Time */}
      <div className="flex items-end gap-1.5">
        <span className="font-mono-num text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text tracking-tight leading-none">
          {hhmm}
        </span>
        <div className="flex flex-col items-center mb-0.5">
          <span className="font-mono-num text-xs font-semibold text-light-subtle dark:text-dark-subtle leading-none">
            :{ss}
          </span>
          <span className="text-2xs font-bold text-primary leading-none mt-0.5 tracking-wider">
            {period}
          </span>
        </div>
      </div>

      {/* Date */}
      <p className="text-2xs text-light-subtle dark:text-dark-subtle mt-1 font-medium tracking-wide">
        {dateStr}
      </p>
    </div>
  )
}
