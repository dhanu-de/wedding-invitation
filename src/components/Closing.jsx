import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useApp } from '../context/AppContext'
import { Footprint, OmSymbol, Toran, RangoliCorner } from './ornaments'

const SHOWER = ['#F2A900', '#E9A23B', '#F6B93B', '#D98E2B', '#FBF3E4', '#B3202A']

/**
 * CHAPTER 7d — CLOSING
 * Couple photo, final petal shower, share / PDF, and the Saptapadi easter egg:
 * the seven steps complete as you reach the very end.
 */
export function Closing() {
  const { config, t, pick, reduced, fontClass } = useApp()
  const eggRef = useRef(null)
  const showerRef = useRef(null)
  const [copied, setCopied] = useState(false)

  /* Seven steps complete on arrival */
  useEffect(() => {
    const el = eggRef.current
    if (!el) return
    const steps = el.querySelectorAll('[data-step]')
    const petals = showerRef.current ? Array.from(showerRef.current.children) : []
    if (reduced) {
      gsap.set(steps, { opacity: 1, y: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%', once: true } })
    tl.fromTo(
      steps,
      { opacity: 0, y: 26, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.17 },
    )
    if (petals.length) {
      tl.fromTo(
        petals,
        { y: -40, opacity: 0, scale: 0.5 },
        {
          y: () => 260 + Math.random() * 320,
          x: () => (Math.random() - 0.5) * 520,
          rotate: () => (Math.random() - 0.5) * 300,
          opacity: 1,
          scale: 1,
          duration: 2.6,
          stagger: { each: 0.05, from: 'random' },
          ease: 'power1.in',
        },
        0,
      ).to(petals, { opacity: 0, duration: 1 }, 2.2)
    }
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reduced])

  const shareText = `${pick(config.couple.bride.name)} & ${pick(config.couple.groom.name)} · ${pick(config.wedding.date)} — ${t('closing.line')}`

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, text: shareText, url })
        return
      } catch {
        /* guest cancelled — fall through to WhatsApp */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`, '_blank', 'noopener')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="closing" className="relative z-10 overflow-hidden bg-night px-6 pb-16 pt-24">
      <Toran className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full text-gold/60" aria-hidden="true" />

      {/* Final petal shower origin */}
      <div
        ref={showerRef}
        className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2"
        aria-hidden="true"
      >
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-3 w-2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-0"
            style={{ background: SHOWER[i % SHOWER.length] }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <OmSymbol className="mx-auto h-12 w-12 text-gold/80" />
        <p className={`mt-3 text-[12px] tracking-[0.28em] text-gold/70 ${fontClass}`}>
          {pick(config.deity.invoke)}
        </p>

        <h2 className="mt-8 font-script text-[clamp(2.4rem,11vw,4.2rem)] leading-[1.05] text-foil">
          {t('closing.line')}
        </h2>
        <p className={`mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/80 ${fontClass}`}>
          {t('closing.sub')}
        </p>

        <figure className="relative mx-auto mt-10 max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-gold/50 shadow-glow">
            <img
              src={config.couple.couplePhoto}
              alt={`${pick(config.couple.bride.name)} & ${pick(config.couple.groom.name)}`}
              loading="lazy"
              decoding="async"
              width="1200"
              height="900"
              className="h-full w-full object-cover"
            />
          </div>
          <RangoliCorner className="pointer-events-none absolute -left-3 -top-3 h-12 w-12 opacity-80" />
          <RangoliCorner className="pointer-events-none absolute -right-3 -top-3 h-12 w-12 rotate-90 opacity-80" />
          <RangoliCorner className="pointer-events-none absolute -bottom-3 -left-3 h-12 w-12 -rotate-90 opacity-80" />
          <RangoliCorner className="pointer-events-none absolute -bottom-3 -right-3 h-12 w-12 rotate-180 opacity-80" />
          <figcaption className={`mt-4 font-display text-[1.3rem] text-foil ${fontClass}`}>
            {pick(config.couple.bride.name)} &amp; {pick(config.couple.groom.name)}
          </figcaption>
          <p className={`mt-1 text-[13px] tracking-[0.14em] text-ivory/70 ${fontClass}`}>
            {pick(config.wedding.date)}
          </p>
        </figure>

        <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
          <button onClick={share} className="btn-gold w-full sm:w-auto">
            {t('closing.share')}
          </button>
          <button onClick={copyLink} className="btn-ghost w-full sm:w-auto">
            {copied ? '✓ Copied' : 'Copy link'}
          </button>
          {config.wedding.invitationPdf ? (
            <a
              href={config.wedding.invitationPdf}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost w-full text-center sm:w-auto"
            >
              {t('closing.pdf')}
            </a>
          ) : (
            <button onClick={() => window.print()} className="btn-ghost w-full sm:w-auto">
              {t('closing.pdf')}
            </button>
          )}
        </div>

        {/* ---------- SAPTAPADI EASTER EGG ---------- */}
        <div ref={eggRef} className="mt-20 border-t border-gold/20 pt-12">
          <p className={`eyebrow text-marigold/80 ${fontClass}`}>{t('common.chapter')} 7 · Saptapadi</p>
          <h3 className={`mt-3 font-display text-[clamp(1.5rem,6vw,2.2rem)] text-foil ${fontClass}`}>
            {t('closing.saptapadiEgg')}
          </h3>

          <ol className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            {config.saptapadi.map((step) => (
              <li
                key={step.n}
                data-step
                style={{ opacity: 0 }}
                className="flex items-start gap-4 rounded-2xl border border-gold/30 bg-deep/45 px-4 py-4"
              >
                <span className="relative shrink-0">
                  <Footprint className="h-10 w-7 text-marigold drop-gold" />
                  <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-deep">
                    {step.n}
                  </span>
                </span>
                <span className={`pt-1 text-[14.5px] leading-relaxed text-ivory/85 ${fontClass}`}>
                  {pick(step)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <footer className="mt-16 flex flex-col items-center gap-2">
          <span className="divider-marigold w-40" />
          <p className={`text-[13px] tracking-[0.22em] text-gold/70 ${fontClass}`}>
            {config.couple.weddingHashtag}
          </p>
          <p className="text-[11px] tracking-[0.14em] text-ivory/40">
            Made with love · The Journey to the Saptapadi
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Closing
