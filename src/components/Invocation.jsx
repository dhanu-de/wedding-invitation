import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useApp } from '../context/AppContext'
import { MandalaBg } from './ambient'
import { Toran, LotusCue, Bell, OmSymbol } from './ornaments'
import { ScriptAmpersand } from './ui/ScriptAmpersand'

/**
 * CHAPTER 2 — INVOCATION (hero)
 * Names in display serif with a self-drawing calligraphic ampersand,
 * slow mandala parallax behind, ambient petals from the global canvas.
 */
export function Invocation() {
  const { config, t, pick, gateOpen, reduced, fontClass } = useApp()
  const rootRef = useRef(null)
  const bgRef = useRef(null)

  /* Sky reveal: hero content arrives as the mandap doors open. */
  useEffect(() => {
    if (!gateOpen) return
    const els = rootRef.current?.querySelectorAll('[data-hero]') || []
    if (!els.length) return
    if (reduced) {
      gsap.set(els, { opacity: 1, y: 0 })
      return
    }
    const tl = gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.3, stagger: 0.16, delay: 0.25 },
    )
    return () => tl.kill()
  }, [gateOpen, reduced])

  /* Slow mandala parallax on scroll. */
  useEffect(() => {
    if (reduced) return
    const el = bgRef.current
    const anim = gsap.to(el, {
      yPercent: 16,
      ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced])

  return (
    <section
      id="invocation"
      ref={rootRef}
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-night px-6 pb-24 pt-28"
    >
      <div ref={bgRef} className="absolute inset-0" aria-hidden="true">
        <MandalaBg />
      </div>
      <Toran className="absolute inset-x-0 top-0 h-16 w-full text-gold/70 sm:h-24" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Greeting */}
        <div data-hero className="flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <OmSymbol className="h-14 w-14 text-gold drop-gold" />
          <p className={`text-[12px] tracking-[0.3em] text-gold/80 sm:text-[14px] ${fontClass}`}>
            {pick(config.deity.invoke)}
          </p>
        </div>

        {/* Names */}
        <div data-hero className="mt-9 flex flex-col items-center" style={{ opacity: 0 }}>
          <p className="eyebrow text-marigold/80">
            {gateOpen ? t('gate.inviteLine') : '\u00A0'}
          </p>
          <h1 className="mt-4 flex flex-col items-center leading-[0.95] sm:flex-row sm:items-center sm:gap-5">
            <span className="font-display text-[clamp(3rem,15vw,6.2rem)] text-foil">
              {pick(config.couple.bride.name)}
            </span>
            <ScriptAmpersand className="my-1 h-9 w-9 text-marigold drop-gold sm:my-0 sm:h-14 sm:w-14" />
            <span className="font-display text-[clamp(3rem,15vw,6.2rem)] text-foil">
              {pick(config.couple.groom.name)}
            </span>
          </h1>
        </div>

        {/* Date + muhurat */}
        <div data-hero className="mt-8 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <span className="divider-marigold w-40 sm:w-56" />
          <p className={`font-display text-[clamp(1.05rem,4.4vw,1.5rem)] text-ivory/90 ${fontClass}`}>
            {pick(config.wedding.date)}
          </p>
          <p className={`text-[12px] tracking-[0.22em] text-marigold/85 sm:text-[13px] ${fontClass}`}>
            {pick(config.wedding.muhurat)}
          </p>
          <p className={`text-[12px] tracking-[0.1em] text-ivory/55 ${fontClass}`}>
            {pick(config.wedding.venue)}
          </p>
        </div>

        {/* Bell shimmer + lotus scroll cue */}
        <div data-hero className="mt-12 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <div className="flex items-end gap-4 text-gold/70">
            <Bell className="h-8 w-8 animate-float-y" style={{ animationDuration: '5.4s' }} />
            <Bell className="h-11 w-11 animate-float-y opacity-80" style={{ animationDuration: '4.6s' }} />
            <Bell className="h-8 w-8 animate-float-y" style={{ animationDuration: '6.1s' }} />
          </div>
          <a
            href="#couple"
            className="group mt-3 flex flex-col items-center gap-1.5 text-gold/80 transition-colors hover:text-marigold"
            aria-label={t('scroll')}
          >
            <span className="text-[10px] uppercase tracking-[0.34em]">{t('scroll')}</span>
            <LotusCue className="h-9 w-7 animate-float-y transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Invocation
