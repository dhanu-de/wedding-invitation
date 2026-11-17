import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { EventIcons, RangoliCorner } from './ornaments'
import { downloadICS } from '../lib/ics'

function EventCard({ ev, open, onToggle }) {
  const { config, t, pick, lang, fontClass } = useApp()
  const Icon = EventIcons[ev.icon] || EventIcons.diya
  const mapHref =
    ev.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapQuery)}`

  const addToCalendar = () => {
    downloadICS(
      {
        uid: ev.id,
        title: `${pick(ev.ritual)} — ${pick(config.couple.bride.name)} & ${pick(config.couple.groom.name)}`,
        description: pick(ev.meaning),
        location: pick(ev.venue),
        startISO: ev.dateISO,
        hours: 4,
      },
      `${ev.id}.ics`,
    )
  }

  return (
    <article className="panel flex h-full flex-col">
      <RangoliCorner className="pointer-events-none absolute -left-1 -top-1 h-9 w-9 rotate-0 opacity-70" />
      <RangoliCorner className="pointer-events-none absolute -right-1 -top-1 h-9 w-9 rotate-90 opacity-70" />
      <RangoliCorner className="pointer-events-none absolute -bottom-1 -left-1 h-9 w-9 -rotate-90 opacity-70" />
      <RangoliCorner className="pointer-events-none absolute -bottom-1 -right-1 h-9 w-9 rotate-180 opacity-70" />

      <div className="flex items-start justify-between gap-3">
        <Icon className="h-10 w-10 shrink-0 text-wine/75" />
        <span className={`eyebrow pt-1 text-right text-accent ${fontClass}`}>{pick(ev.date)}</span>
      </div>

      <h3 className={`mt-4 font-display text-[clamp(1.5rem,5.6vw,1.95rem)] text-wine ${fontClass}`}>
        {pick(ev.ritual)}
      </h3>

      <p className={`mt-1 text-[14px] font-medium tracking-wide text-accent ${fontClass}`}>{pick(ev.time)}</p>
      <p className={`mt-1 text-[13px] leading-relaxed text-wine/75 ${fontClass}`}>{pick(ev.venue)}</p>

      {/* Dress code palette */}
      <div className="mt-4">
        <p className={`eyebrow text-wine/60 ${fontClass}`}>{t('events.dress')}</p>
        <div className="mt-2 flex items-center gap-2">
          {ev.palette.map((c) => (
            <span
              key={c}
              title={c}
              className="h-6 w-6 rounded-full ring-1 ring-gold/60 ring-offset-1 ring-offset-ivory"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* Ritual explainer popover */}
      <div className="mt-5">
        <button
          onClick={onToggle}
          aria-expanded={open}
          className={`flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-wine ${fontClass}`}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full border border-accent/60 text-[10px] leading-none">
            i
          </span>
          {t('events.meaning')}
        </button>
        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0">
            <p className={`pt-2 text-[13.5px] leading-relaxed text-wine/85 ${fontClass}`}>{pick(ev.meaning)}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <a href={mapHref} target="_blank" rel="noreferrer" className="btn-ghost !text-[12px] !py-2.5 !text-wine !border-wine/35 hover:!bg-wine/5">
          {t('events.map')}
        </a>
        <button onClick={addToCalendar} className="btn-ghost !text-[12px] !py-2.5 !text-wine !border-wine/35 hover:!bg-wine/5">
          {t('events.calendar')}
        </button>
      </div>
    </article>
  )
}

/**
 * CHAPTER 6 — THE CELEBRATIONS
 * Temple-carved panels: a snap carousel on phones, a grid from lg up.
 */
export function Celebrations() {
  const { config, t, fontClass } = useApp()
  const [openId, setOpenId] = useState(null)

  return (
    <section id="events" className="relative z-10 overflow-hidden bg-paper px-0 py-24 text-wine">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader chapter={`${t('common.chapter')} 6`} eyebrow={t('events.eyebrow')} title={t('events.title')} />
      </div>

      <div className="mt-14">
        <div className="no-scrollbar snap-x-mandatory flex gap-5 overflow-x-auto px-6 pb-6 lg:mx-auto lg:max-w-6xl lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-6">
          {config.events.map((ev, i) => (
            <Reveal
              key={ev.id}
              delay={Math.min(i * 0.06, 0.3)}
              className="snap-center-item w-[82vw] shrink-0 sm:w-[58vw] lg:w-auto"
            >
              <EventCard
                ev={ev}
                open={openId === ev.id}
                onToggle={() => setOpenId((cur) => (cur === ev.id ? null : ev.id))}
              />
            </Reveal>
          ))}
        </div>

        <p className={`mt-1 text-center text-[11px] uppercase tracking-[0.24em] text-wine/50 lg:hidden ${fontClass}`}>
          {t('events.swipe')}
        </p>
      </div>
    </section>
  )
}

export default Celebrations
