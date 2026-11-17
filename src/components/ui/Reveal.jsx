import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useApp } from '../../context/AppContext'

/**
 * Shared scroll reveal. Transform/opacity only so it stays 60fps on
 * mid-range Android. Under prefers-reduced-motion it becomes a plain fade.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  y = 30,
  delay = 0,
  duration = 1.15,
  start = 'top 88%',
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const { reduced } = useApp()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
      return
    }
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      },
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced, y, delay, duration, start])

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * Word-by-word masked reveal for display type.
 */
export function StaggerWords({ text, className = '', delay = 0, start = 'top 85%', stagger = 0.06 }) {
  const ref = useRef(null)
  const { reduced } = useApp()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('[data-w]')
    if (reduced) {
      gsap.set(words, { yPercent: 0, opacity: 1 })
      return
    }
    const anim = gsap.fromTo(
      words,
      { yPercent: 112, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      },
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced, text, delay, start, stagger])

  return (
    <span ref={ref} className={className}>
      {String(text)
        .split(' ')
        .map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span data-w className="inline-block will-change-transform">
              {word}
              {'\u00A0'}
            </span>
          </span>
        ))}
    </span>
  )
}

/** Refresh ScrollTrigger after fonts/images settle (prevents stale offsets). */
export function useScrollRefresh() {
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', onLoad)
    }
  }, [])
}
