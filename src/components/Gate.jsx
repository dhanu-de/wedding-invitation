import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useApp } from '../context/AppContext'
import { Toran, Diya, OmSymbol, Paisley } from './ornaments'

const PETALS = ['#F2A900', '#E9A23B', '#F6B93B', '#D98E2B', '#FBF3E4']

/* Door surface: silk-sheen wood with vertical grain and brass studs. */
const woodStyle = {
  backgroundImage: `
    linear-gradient(180deg, rgb(var(--c-deep) / 0.6), rgb(var(--c-deep) / 0) 26%, rgb(var(--c-deep) / 0.5) 100%),
    repeating-linear-gradient(90deg, rgb(0 0 0 / 0.22) 0 2px, rgb(255 255 255 / 0.04) 2px 5px, transparent 5px 13px),
    linear-gradient(105deg, rgb(var(--c-wine)), rgb(var(--c-deep)) 52%, rgb(var(--c-wine)))
  `,
}

const studsStyle = {
  backgroundImage: 'radial-gradient(circle, rgb(var(--c-gold) / 0.85) 0 1.7px, transparent 2.2px)',
  backgroundSize: '30px 30px',
  backgroundPosition: '15px 15px',
  opacity: 0.5,
}

function DoorFace({ side }) {
  const inner = side === 'left' ? 'right' : 'left'
  return (
    <div className="relative h-full w-full" style={woodStyle}>
      <div className="absolute inset-0" style={studsStyle} aria-hidden="true" />

      {/* Carved panels */}
      <div className="absolute inset-[7%] rounded-[6px] border border-gold/25 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" aria-hidden="true" />
      <div className="absolute inset-[12%] rounded-[4px] border border-gold/15" aria-hidden="true" />
      <div className="absolute inset-x-[18%] top-[14%] bottom-[52%] rounded-[4px] border border-gold/20" aria-hidden="true" />
      <div className="absolute inset-x-[18%] top-[52%] bottom-[14%] rounded-[4px] border border-gold/20" aria-hidden="true" />

      {/* Carved paisley watermark */}
      <Paisley
        className={`absolute top-1/2 h-[38%] w-[38%] -translate-y-1/2 text-gold/25 ${
          side === 'left' ? 'left-[30%]' : 'right-[30%] scale-x-[-1]'
        }`}
      />

      {/* Brass ring handle + hinges */}
      <div
        className="absolute top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border-[3px] border-gold/70 shadow-[0_0_18px_rgba(0,0,0,0.6)]"
        style={{
          [inner]: '-1.5rem',
          background:
            'radial-gradient(circle at 35% 30%, rgb(var(--c-gold) / 0.5), rgb(0 0 0 / 0.35) 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 w-3"
        style={{
          [side]: 0,
          backgroundImage:
            'linear-gradient(90deg, rgb(0 0 0 / 0.5), rgb(var(--c-gold) / 0.5), rgb(0 0 0 / 0.5))',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

/**
 * CHAPTER 1 — GATE
 * Closed temple doors. Tap → doors swing open in 3D, petals burst,
 * music fades in (only if the guest has opted in before), page unlocks.
 */
export function Gate() {
  const { config, t, pick, guest, reduced, openGate, fontClass } = useApp()
  const [gone, setGone] = useState(false)
  const [opening, setOpening] = useState(false)

  const rootRef = useRef(null)
  const doorsRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const seamRef = useRef(null)
  const contentRef = useRef(null)
  const burstRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = gone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [gone])

  useEffect(() => () => tlRef.current?.kill(), [])

  const open = () => {
    if (opening || gone) return
    setOpening(true)
    openGate()

    if (reduced) {
      setGone(true)
      return
    }

    const petals = burstRef.current ? Array.from(burstRef.current.children) : []
    const tl = gsap.timeline({ onComplete: () => setGone(true) })
    tlRef.current = tl

    tl.to(doorsRef.current, { scale: 1.07, duration: 2, ease: 'power3.inOut' }, 0)
      .to(leftRef.current, { rotationY: -108, duration: 1.9, ease: 'power3.inOut' }, 0)
      .to(rightRef.current, { rotationY: 108, duration: 1.9, ease: 'power3.inOut' }, 0)
      .to(contentRef.current, { opacity: 0, y: -26, duration: 0.6 }, 0)
      .to(seamRef.current, { opacity: 0, duration: 0.45 }, 0.2)

    if (petals.length) {
      tl.fromTo(
        petals,
        { x: 0, y: 0, scale: 0.35, opacity: 0, rotate: 0 },
        {
          x: () => (Math.random() - 0.5) * Math.min(window.innerWidth, 900),
          y: () => (Math.random() - 0.35) * Math.min(window.innerHeight, 800),
          scale: 1,
          opacity: 1,
          rotate: () => (Math.random() - 0.5) * 240,
          duration: 1.5,
          stagger: { each: 0.018, from: 'center' },
          ease: 'power2.out',
        },
        0.22,
      ).to(petals, { opacity: 0, duration: 0.7, ease: 'power1.in' }, 1.35)
    }

    tl.to(rootRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 1.15)
  }

  const skip = () => {
    if (gone) return
    openGate()
    setGone(true)
  }

  if (gone) return null

  const mantra = pick(config.deity.invoke)

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] overflow-hidden bg-deep"
      role="dialog"
      aria-modal="true"
      aria-label={t('gate.tap')}
    >
      {/* ---------- Doors ---------- */}
      <div
        ref={doorsRef}
        className="absolute inset-0"
        style={{ perspective: '1500px', perspectiveOrigin: '50% 42%' }}
      >
        <div
          ref={leftRef}
          className="absolute inset-y-0 left-0 w-1/2 will-change-transform"
          style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
        >
          <DoorFace side="left" />
        </div>
        <div
          ref={rightRef}
          className="absolute inset-y-0 right-0 w-1/2 will-change-transform"
          style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
        >
          <DoorFace side="right" />
        </div>
        <div
          ref={seamRef}
          className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-marigold/70 to-transparent shadow-glow"
          aria-hidden="true"
        />
      </div>

      {/* ---------- Toran + greeting ---------- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <Toran className="h-16 w-full text-gold/80 sm:h-24" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[16%] z-20 flex flex-col items-center gap-3 px-6 text-center sm:top-[14%]">
        <OmSymbol className="h-16 w-16 text-gold drop-gold sm:h-20 sm:w-20" />
        <p className={`text-[13px] tracking-[0.18em] text-marigold/95 sm:text-[15px] ${fontClass}`}>
          {mantra}
        </p>
      </div>

      {/* ---------- Centre content ---------- */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-end gap-6 px-6 pb-[12vh] text-center"
      >
        <div className="max-w-md">
          {guest && (
            <p className="mb-3 font-script text-[clamp(1.6rem,7vw,2.4rem)] leading-none text-marigold">
              {t('gate.dear')} {guest}
            </p>
          )}
          <p className="eyebrow text-gold/70">{t('gate.inviteLine')}</p>
          <p className="mt-2 font-display text-[clamp(1.9rem,8vw,3rem)] leading-tight text-foil">
            {pick(config.couple.bride.name)} &amp; {pick(config.couple.groom.name)}
          </p>
          <p className="mt-1 font-body text-[13px] tracking-[0.16em] text-ivory/60">
            {pick(config.wedding.date)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Diya className="h-16 w-16 text-gold drop-gold" />
          <button
            onClick={open}
            className="btn-gold px-7 py-3.5 text-[13px] uppercase tracking-[0.2em]"
            autoFocus
          >
            {t('gate.tap')}
          </button>
          <p className="text-[11px] tracking-[0.14em] text-ivory/45">{t('gate.hint')}</p>
        </div>

        <button
          onClick={skip}
          className="text-[11px] uppercase tracking-[0.22em] text-ivory/40 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
        >
          {t('gate.skip')}
        </button>
      </div>

      {/* ---------- Petal burst origin ---------- */}
      <div
        ref={burstRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-3 w-2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-0"
            style={{ background: PETALS[i % PETALS.length] }}
          />
        ))}
      </div>
    </div>
  )
}

export default Gate
