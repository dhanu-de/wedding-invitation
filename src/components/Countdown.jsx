import { useEffect, useMemo, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'
import { SectionHeader } from './ui/SectionHeader'
import { Diya, RangoliCorner } from './ornaments'
import { MandalaBg } from './ambient'

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const MS_HOUR = 3600000

/** One flip-digit cell. Transforms only — cheap on mid-range phones. */
function FlipUnit({ value, label, fontClass }) {
  const ref = useRef(null)
  const prev = useRef(null)
  const { reduced } = useApp()
  const display = String(value).padStart(2, '0')

  useEffect(() => {
    if (prev.current === null) {
      prev.current = display
      return
    }
    if (prev.current === display) return
    prev.current = display
    if (reduced || !ref.current) return
    gsap.fromTo(
      ref.current,
      { yPercent: -72, opacity: 0.15, rotateX: -62 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.62, ease: 'power3.out' },
    )
  }, [display, reduced])

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex h-[clamp(3.4rem,16vw,6rem)] w-[clamp(3.1rem,15vw,5.4rem)] items-center justify-center overflow-hidden rounded-xl border border-gold/45 bg-deep/75 shadow-[inset_0_0_30px_rgba(0,0,0,0.65)]"
        style={{ perspective: '520px' }}
      >
        <span
          ref={ref}
          className="font-play text-[clamp(1.8rem,8.5vw,3.2rem)] leading-none text-foil tabular-nums"
        >
          {display}
        </span>
        <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/25" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gold/20" aria-hidden="true" />
      </div>
      <span className={`text-[9px] uppercase tracking-[0.26em] text-gold/70 sm:text-[11px] ${fontClass}`}>
        {label}
      </span>
    </div>
  )
}

/** Wedding-day mode: today's rituals with a "happening now" highlight. */
function LiveToday({ now }) {
  const { config, t, pick, fontClass } = useApp()
  const nowDate = new Date(now)

  const todays = useMemo(
    () =>
      config.events
        .filter((ev) => sameDay(new Date(ev.dateISO), nowDate))
        .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO)),
    [config.events, nowDate],
  )

  return (
    <div className="panel w-full max-w-2xl text-left">
      <p className={`eyebrow text-accent ${fontClass}`}>{t('countdown.todaySchedule')}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {todays.map((ev) => {
          const start = new Date(ev.dateISO)
          const live = now >= start.getTime() && now <= start.getTime() + 4 * MS_HOUR
          return (
            <li
              key={ev.id}
              className={`flex items-center gap-4 rounded-xl border px-4 py-3 transition-colors ${
                live ? 'border-accent bg-accent/12 shadow-glow' : 'border-gold/35 bg-white/40'
              }`}
            >
              <span className="font-play text-[15px] tabular-nums text-wine/80">
                {start.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
              <span className={`flex-1 font-display text-[1.15rem] text-wine ${fontClass}`}>
                {pick(ev.ritual)}
              </span>
              {live && (
                <span className={`flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-ivory ${fontClass}`}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-marigold" />
                  {t('countdown.live')}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * CHAPTER 5 — COUNTDOWN
 * Flip digits inside a glowing diya frame. Switches to a live wedding-day
 * schedule, then to a thank-you once the day has passed.
 */
export function Countdown() {
  const { config, t, pick, reduced, fontClass } = useApp()
  const { days, hours, minutes, seconds, done, now } = useCountdown(config.wedding.dateISO)
  const wrapRef = useRef(null)

  const weddingStart = useMemo(() => new Date(config.wedding.dateISO), [config.wedding.dateISO])
  const nowDate = new Date(now)
  const isWeddingDay = !done && sameDay(nowDate, weddingStart)
  const married = done || now > weddingStart.getTime()

  useEffect(() => {
    if (reduced || married) return
    const el = wrapRef.current
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.25, scrollTrigger: { trigger: el, start: 'top 85%', once: true } },
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduced, married])

  return (
    <section
      id="countdown"
      className="relative z-10 overflow-hidden bg-night px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <MandalaBg />
      </div>

      {/* Ambient sky of floating diyas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[
          { l: '8%', t: '62%', s: 'h-10 w-10', d: '6.2s', o: 'opacity-40' },
          { l: '22%', t: '78%', s: 'h-14 w-14', d: '7.4s', o: 'opacity-30' },
          { l: '78%', t: '68%', s: 'h-12 w-12', d: '5.8s', o: 'opacity-35' },
          { l: '90%', t: '80%', s: 'h-9 w-9', d: '8.1s', o: 'opacity-30' },
          { l: '50%', t: '88%', s: 'h-16 w-16', d: '6.8s', o: 'opacity-25' },
        ].map((d, i) => (
          <span
            key={i}
            className={`absolute ${d.s} ${d.o} animate-float-y text-gold`}
            style={{ left: d.l, top: d.t, animationDuration: d.d }}
          >
            <Diya className="h-full w-full" />
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          chapter={`${t('common.chapter')} 5`}
          eyebrow={t('countdown.eyebrow')}
          title={married ? t('countdown.married') : t('countdown.title')}
          light
        />

        <div ref={wrapRef} className="mt-14 flex flex-col items-center gap-10">
          {married ? (
            <div className="flex flex-col items-center gap-5 text-center">
              <p className="font-script text-[clamp(2.4rem,12vw,4.4rem)] leading-none text-foil">
                {t('countdown.married')}
              </p>
              <p className={`max-w-xl text-[15px] leading-relaxed text-ivory/80 ${fontClass}`}>
                {t('countdown.marriedSub')}
              </p>
              <div className="flex items-center gap-3 text-gold">
                <RangoliCorner className="h-6 w-6 -rotate-90 opacity-70" />
                <span className="divider-marigold w-36" />
                <RangoliCorner className="h-6 w-6 rotate-180 opacity-70" />
              </div>
            </div>
          ) : (
            <>
              {/* Diya frame */}
              <div className="relative flex flex-col items-center">
                <div
                  className="absolute -top-16 h-40 w-40 rounded-full bg-marigold/20 blur-3xl"
                  aria-hidden="true"
                />
                <Diya className="relative h-20 w-20 text-gold drop-gold" />
                <p className={`relative mt-1 text-[11px] tracking-[0.24em] text-marigold/90 sm:text-[13px] ${fontClass}`}>
                  {pick(config.wedding.muhurat)}
                </p>
              </div>

              <div className="ornate-frame relative rounded-3xl border-gold/35 bg-deep/40 px-5 py-8 backdrop-blur-sm sm:px-10">
                <RangoliCorner className="pointer-events-none absolute -left-1 -top-1 h-10 w-10" />
                <RangoliCorner className="pointer-events-none absolute -right-1 -top-1 h-10 w-10 rotate-90" />
                <RangoliCorner className="pointer-events-none absolute -bottom-1 -left-1 h-10 w-10 -rotate-90" />
                <RangoliCorner className="pointer-events-none absolute -bottom-1 -right-1 h-10 w-10 rotate-180" />

                <div className="flex items-start justify-center gap-2.5 sm:gap-5">
                  <FlipUnit value={days} label={t('countdown.days')} fontClass={fontClass} />
                  <span className="mt-[clamp(1rem,5vw,2rem)] font-play text-2xl text-gold/50">:</span>
                  <FlipUnit value={hours} label={t('countdown.hours')} fontClass={fontClass} />
                  <span className="mt-[clamp(1rem,5vw,2rem)] font-play text-2xl text-gold/50">:</span>
                  <FlipUnit value={minutes} label={t('countdown.minutes')} fontClass={fontClass} />
                  <span className="mt-[clamp(1rem,5vw,2rem)] font-play text-2xl text-gold/50">:</span>
                  <FlipUnit value={seconds} label={t('countdown.seconds')} fontClass={fontClass} />
                </div>

                <div className="mt-8 flex flex-col items-center gap-1 text-center">
                  <p className={`font-display text-[clamp(1rem,4.4vw,1.4rem)] text-ivory/90 ${fontClass}`}>
                    {pick(config.wedding.date)}
                  </p>
                  <p className={`text-[12px] tracking-[0.08em] text-gold/70 ${fontClass}`}>
                    {pick(config.wedding.venue)}
                  </p>
                </div>
              </div>
            </>
          )}

          {isWeddingDay && (
            <div className="w-full max-w-2xl">
              <p className="mb-4 text-center font-script text-[clamp(1.6rem,7vw,2.4rem)] text-marigold">
                {t('countdown.live')} · {pick(config.wedding.date)}
              </p>
              <div className="flex justify-center">
                <LiveToday now={now} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Countdown
