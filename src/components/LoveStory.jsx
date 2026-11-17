import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useApp } from '../context/AppContext'
import { SectionHeader } from './ui/SectionHeader'
import { LotusBloom, RangoliCorner } from './ornaments'

function Milestone({ item, index }) {
  const { pick, reduced, fontClass } = useApp()
  const rowRef = useRef(null)
  const bloomRef = useRef(null)
  const right = index % 2 === 1

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    if (reduced) {
      gsap.set([el, bloomRef.current], { opacity: 1, x: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 84%', once: true } })
    tl.fromTo(el, { opacity: 0, x: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
    if (bloomRef.current) {
      const petals = bloomRef.current.querySelectorAll('[data-bloom]')
      tl.fromTo(
        petals,
        { scale: 0.2, opacity: 0, transformOrigin: '50% 92%' },
        { scale: 1, opacity: 1, duration: 1, stagger: 0.06, ease: 'back.out(1.6)' },
        0.1,
      )
    }
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reduced])

  return (
    <div
      ref={rowRef}
      className={`relative flex flex-col pl-16 lg:w-1/2 lg:pl-0 ${
        right ? 'lg:ml-auto lg:pl-14' : 'lg:pr-14 lg:text-right'
      }`}
      style={{ opacity: 0 }}
    >
      {/* Vine node */}
      <span
        className={`absolute top-8 h-3.5 w-3.5 rounded-full border border-gold bg-marigold shadow-glow ${
          right
            ? 'left-6 -translate-x-1/2 lg:left-0 lg:-translate-x-1/2'
            : 'left-6 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-1/2'
        }`}
        aria-hidden="true"
      />

      <article
        className={`ornate-frame rounded-2xl border-gold/35 bg-deep/45 p-5 backdrop-blur-sm ${
          right ? 'text-left' : 'lg:text-right'
        }`}
      >
        <div className={`flex items-center gap-3 ${right ? '' : 'lg:flex-row-reverse'}`}>
          <span ref={bloomRef} className="shrink-0">
            <LotusBloom className="h-9 w-12 text-marigold drop-gold" />
          </span>
          <span className={`rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-[12px] tracking-[0.18em] text-gold ${fontClass}`}>
            {item.year}
          </span>
        </div>

        <img
          src={item.photo}
          alt={pick(item.title)}
          loading="lazy"
          decoding="async"
          width="900"
          height="600"
          style={{ objectPosition: item.focus || '50% 30%' }}
          className="mt-4 h-44 w-full rounded-xl border border-gold/25 object-cover sm:h-52"
        />

        <h3 className={`mt-4 font-display text-[clamp(1.35rem,5vw,1.8rem)] text-foil ${fontClass}`}>
          {pick(item.title)}
        </h3>
        <p className={`mt-2 text-[15px] leading-relaxed text-ivory/80 ${fontClass}`}>{pick(item.text)}</p>
      </article>
    </div>
  )
}

/**
 * CHAPTER 4 — OUR LOVE STORY
 * A rangoli vine drawn down the page grows with the scroll.
 */
export function LoveStory() {
  const { t, config, reduced, fontClass } = useApp()
  const wrapRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 1200
    path.style.strokeDasharray = `${len}`
    if (reduced) {
      path.style.strokeDashoffset = '0'
      return
    }
    path.style.strokeDashoffset = `${len}`
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top 72%',
        end: 'bottom 78%',
        scrub: 0.6,
      },
    })
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced])

  return (
    <section id="story" className="relative z-10 overflow-hidden bg-paper px-6 py-24 text-wine">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeader chapter={`${t('common.chapter')} 4`} eyebrow={t('story.eyebrow')} title={t('story.title')} />

        <div ref={wrapRef} className="relative mt-16">
          {/* Growing vine */}
          <svg
            className="pointer-events-none absolute left-6 top-0 h-full w-10 -translate-x-1/2 text-gold lg:left-1/2"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M20 0C34 110 6 210 20 330C34 450 6 560 20 680C34 800 6 900 20 1000"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              ref={pathRef}
              d="M20 0C34 110 6 210 20 330C34 450 6 560 20 680C34 800 6 900 20 1000"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col gap-14">
            {config.story.map((item, i) => (
              <Milestone key={item.id} item={item} index={i} />
            ))}
          </div>

          <div className="pointer-events-none absolute -right-4 top-0 hidden text-gold/45 lg:block">
            <RangoliCorner className="h-16 w-16 rotate-90" />
          </div>
          <p className={`mt-14 text-center font-script text-[clamp(1.5rem,6vw,2.4rem)] text-accent ${fontClass}`}>
            ...to be continued at the mandap
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoveStory
