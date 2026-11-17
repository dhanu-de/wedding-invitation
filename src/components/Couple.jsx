import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useApp } from '../context/AppContext'
import { SectionHeader } from './ui/SectionHeader'
import { ScriptAmpersand } from './ui/ScriptAmpersand'
import { JharokhaArch, LotusBloom } from './ornaments'

function PersonCard({ person, side, lovesLabel }) {
  const { pick, lang, reduced, fontClass } = useApp()
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    if (reduced) {
      gsap.set([el, imgRef.current], { opacity: 1, x: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } })
    tl.fromTo(
      el,
      { opacity: 0, x: side === 'left' ? -70 : 70 },
      { opacity: 1, x: 0, duration: 1.35, ease: 'power3.out' },
    ).fromTo(
      imgRef.current,
      { scale: 1.22, opacity: 0.35 },
      { scale: 1, opacity: 1, duration: 1.7, ease: 'power3.out' },
      0.15,
    )
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reduced, side])

  const favourites = person.favourites?.[lang] || person.favourites?.en || []

  return (
    <article ref={cardRef} style={{ opacity: 0 }} className="relative w-full max-w-sm flex-1">
      {/* Jharokha-masked portrait */}
      <div className="relative">
        <div className="arch-mask relative aspect-[5/7] overflow-hidden bg-wine shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]">
          <img
            ref={imgRef}
            src={person.photo}
            alt={pick(person.fullName)}
            loading="lazy"
            decoding="async"
            width="800"
            height="1120"
            className="h-full w-full object-cover will-change-transform"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-deep/25" />
        </div>
        <JharokhaArch className="pointer-events-none absolute inset-[-5%] h-[110%] w-[110%] text-gold/70" />
      </div>

      {/* Details */}
      <div className="ornate-frame mt-7 rounded-2xl border-gold/30 bg-deep/45 px-5 py-6 backdrop-blur-sm">
        <p className="eyebrow text-accent">{pick(person.role)}</p>
        <h3 className={`mt-2 font-display text-[clamp(1.6rem,6vw,2.2rem)] text-foil ${fontClass}`}>
          {pick(person.fullName)}
        </h3>
        <p className={`mt-2 text-[13px] leading-relaxed text-ivory/70 ${fontClass}`}>
          <span className="text-gold/85">{pick(person.relation)} </span>
          {pick(person.parents)}
        </p>
        <span className="my-4 block hairline" />
        <p className={`text-[15px] leading-relaxed text-ivory/80 ${fontClass}`}>{pick(person.bio)}</p>

        <div className="mt-5">
          <p className="eyebrow text-gold/60">{lovesLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {favourites.map((f) => (
              <li
                key={f}
                className={`rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[12px] tracking-wide text-gold/90 ${fontClass}`}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

/**
 * CHAPTER 3 — THE COUPLE
 * Cards slide in from opposite sides and meet at the centre ampersand.
 */
export function Couple() {
  const { config, t, reduced, fontClass } = useApp()
  const centerRef = useRef(null)

  useEffect(() => {
    const el = centerRef.current
    if (!el) return
    if (reduced) {
      gsap.set(el, { opacity: 1, scale: 1 })
      return
    }
    const anim = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.4 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced])

  return (
    <section id="couple" className="relative z-10 overflow-hidden bg-night px-6 py-24">
      <div className="bg-weave pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <LotusBloom className="pointer-events-none absolute -left-16 top-24 h-40 w-56 text-gold/10" />
      <LotusBloom className="pointer-events-none absolute -right-16 bottom-24 h-40 w-56 scale-x-[-1] text-gold/10" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader chapter={`${t('common.chapter')} 3`} eyebrow={t('couples.eyebrow')} title={t('couples.title')} light />

        <div className="mt-16 flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center lg:gap-8">
          <PersonCard person={config.couple.bride} side="left" lovesLabel={t('couples.loves')} />

          <div className="flex items-center justify-center lg:w-28">
            <div
              ref={centerRef}
              style={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
              aria-hidden="true"
            >
              <span className="hairline w-10" />
              <ScriptAmpersand className="h-12 w-12 text-marigold drop-gold lg:h-16 lg:w-16" delay={0.2} />
              <span className="hairline w-10" />
              <span className={`text-[11px] tracking-[0.3em] text-gold/70 ${fontClass}`}>
                {config.couple.monogram}
              </span>
            </div>
          </div>

          <PersonCard person={config.couple.groom} side="right" lovesLabel={t('couples.lovesG')} />
        </div>
      </div>
    </section>
  )
}

export default Couple
