import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { Mandala, Diya } from '../ornaments'

/* ------------------------------- PETALS ---------------------------------- */
const MARIGOLD = ['#F2A900', '#E9A23B', '#F6B93B', '#D98E2B', '#DE9B2C']

/**
 * Ambient falling marigold petals on a single capped-count canvas.
 * - count is reduced on small screens, zero under prefers-reduced-motion
 * - pauses when the tab is hidden
 * - DPR capped at 2, draws only 2D fills (cheap on mid-range Android)
 */
export function Petals({ count }) {
  const ref = useRef(null)
  const { reduced } = useApp()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    const mobile = window.matchMedia('(max-width: 640px)').matches
    const TOTAL = count ?? (mobile ? 16 : 30)

    let w = 0
    let h = 0
    let petals = []
    let raf = 0
    let last = 0
    let visible = true

    const spawn = (spread) => ({
      x: Math.random() * w,
      y: spread ? Math.random() * h : -24,
      s: 6 + Math.random() * 11,
      vy: 0.22 + Math.random() * 0.5,
      vx: -0.22 + Math.random() * 0.44,
      rot: Math.random() * Math.PI * 2,
      vr: (-0.5 + Math.random()) * 0.012,
      sway: Math.random() * Math.PI * 2,
      swayAmp: 0.4 + Math.random() * 1.3,
      color: MARIGOLD[(Math.random() * MARIGOLD.length) | 0],
      a: 0.3 + Math.random() * 0.45,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const reset = () => {
      resize()
      petals = Array.from({ length: TOTAL }, () => spawn(true))
    }

    const petal = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.a
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.moveTo(0, -p.s * 0.5)
      ctx.bezierCurveTo(p.s * 0.62, -p.s * 0.34, p.s * 0.5, p.s * 0.42, 0, p.s * 0.5)
      ctx.bezierCurveTo(-p.s * 0.5, p.s * 0.42, -p.s * 0.62, -p.s * 0.34, 0, -p.s * 0.5)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(48, t - last || 16)
      last = t
      if (!visible) return
      ctx.clearRect(0, 0, w, h)
      const k = dt / 16
      for (const p of petals) {
        p.sway += 0.012
        p.y += p.vy * k
        p.x += p.vx * k + Math.sin(p.sway) * p.swayAmp * 0.5
        p.rot += p.vr * k
        if (p.y > h + 30 || p.x < -40 || p.x > w + 40) Object.assign(p, spawn(false))
        petal(p)
      }
    }

    const onVisibility = () => {
      visible = !document.hidden
    }

    reset()
    raf = requestAnimationFrame(loop)
    window.addEventListener('resize', reset, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', reset)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, count])

  if (reduced) return null
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.75]"
      aria-hidden="true"
    />
  )
}

/* ------------------------------- MANDALA BG ------------------------------ */
export function MandalaBg({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Mandala className="absolute left-1/2 top-[-22%] h-[120vmin] w-[120vmin] -translate-x-1/2 text-gold/20 animate-spin-slow" />
      <Mandala className="absolute bottom-[-32%] left-[-22%] h-[92vmin] w-[92vmin] text-gold/10 animate-spin-slower" />
    </div>
  )
}

/* ------------------------------- DIYA CURSOR ----------------------------- */
/** Desktop-only custom cursor. Inert on touch devices / reduced motion. */
export function DiyaCursor() {
  const ref = useRef(null)
  const { reduced } = useApp()

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reduced) return

    document.body.classList.add('diya-cursor')
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let scale = 1
    let target = 1
    let raf = 0

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e) => {
      target = e.target.closest('a,button,[role="button"],input,textarea,select,label') ? 1.55 : 1
    }
    const loop = () => {
      raf = requestAnimationFrame(loop)
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      scale += (target - scale) * 0.13
      const el = ref.current
      if (el) el.style.transform = `translate3d(${x - 16}px, ${y - 12}px, 0) scale(${scale})`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.body.classList.remove('diya-cursor')
    }
  }, [reduced])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 md:block"
      aria-hidden="true"
    >
      <Diya className="h-8 w-8 text-gold/90 drop-gold" />
    </div>
  )
}
