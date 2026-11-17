import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useApp } from '../../context/AppContext'

/**
 * A calligraphic ampersand whose stroke draws itself on scroll into view.
 * Two swashes, animated with stroke-dashoffset (a true SVG draw, not a mask).
 */
export function ScriptAmpersand({ className = '', delay = 0.4, start = 'top 85%' }) {
  const ref = useRef(null)
  const { reduced } = useApp()

  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const paths = Array.from(svg.querySelectorAll('path'))
    paths.forEach((p) => {
      const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 0
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = reduced ? '0' : `${len}`
    })
    if (reduced) return
    const anim = gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.9,
      ease: 'power2.inOut',
      stagger: 0.3,
      delay,
      scrollTrigger: { trigger: svg, start, once: true },
    })
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced, delay, start])

  return (
    <svg
      ref={ref}
      viewBox="0 0 122 122"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M96 92c-14 12-38 12-48-4-8-13 2-26 16-34 16-9 34-18 32-34-2-14-20-18-32-8-12 10-8 26 2 38 12 14 28 24 40 34" />
      <path d="M30 104c-14-4-22-16-18-30" />
    </svg>
  )
}

export default ScriptAmpersand
