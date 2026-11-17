import { useEffect, useMemo, useState } from 'react'

/**
 * Live countdown to a target ISO datetime.
 * Ticks once a second, stops entirely once the moment has passed
 * (no background timer burn on a phone that is left open).
 */
export function useCountdown(targetISO) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (Number.isNaN(target)) return
    if (Date.now() >= target) {
      setNow(target)
      return
    }
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [target])

  const diff = Number.isNaN(target) ? 0 : Math.max(0, target - now)
  const pad = (n) => String(n).padStart(2, '0')

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0 && !Number.isNaN(target),
    now,
    pad,
  }
}
