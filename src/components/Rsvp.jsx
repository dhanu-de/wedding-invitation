import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { RangoliCorner } from './ornaments'

const EMPTY = { name: '', phone: '', guests: '1', events: [], message: '' }

/**
 * CHAPTER 7c — RSVP
 * Three interchangeable backends via config.rsvp.method:
 * whatsapp (no backend) · formspree · endpoint (e.g. Apps Script -> Sheets)
 */
export function Rsvp() {
  const { config, t, pick, guest, fontClass } = useApp()
  const [form, setForm] = useState({ ...EMPTY, name: guest || '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const toggleEvent = (id) =>
    setForm((f) => ({
      ...f,
      events: f.events.includes(id) ? f.events.filter((x) => x !== id) : [...f.events, id],
    }))

  const summary = () => {
    const chosen = config.events
      .filter((ev) => form.events.includes(ev.id))
      .map((ev) => ev.ritual.en)
      .join(', ')
    return [
      `RSVP — ${pick(config.couple.bride.name)} & ${pick(config.couple.groom.name)}`,
      `Name: ${form.name}`,
      form.phone ? `Contact: ${form.phone}` : null,
      `Guests: ${form.guests}`,
      chosen ? `Attending: ${chosen}` : null,
      form.message ? `Wish: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setStatus('error')
      return
    }
    setStatus('sending')

    try {
      if (config.rsvp.method === 'whatsapp') {
        const url = `https://wa.me/${config.rsvp.whatsappNumber}?text=${encodeURIComponent(summary())}`
        window.open(url, '_blank', 'noopener')
        setStatus('done')
        return
      }

      if (config.rsvp.method === 'formspree' || config.rsvp.method === 'endpoint') {
        if (!config.rsvp.endpoint) throw new Error('No RSVP endpoint configured')
        const res = await fetch(config.rsvp.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, summary: summary(), submittedAt: new Date().toISOString() }),
        })
        if (!res.ok) throw new Error('Request failed')
        setStatus('done')
        return
      }

      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <section id="rsvp" className="relative z-10 bg-night px-6 py-24">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="ornate-frame rounded-3xl border-gold/40 bg-deep/50 px-8 py-12">
            <RangoliCorner className="mx-auto h-10 w-10 -rotate-45 text-gold/70" />
            <p className="mt-6 font-script text-[clamp(1.9rem,8vw,3rem)] text-foil">Dhanyavaadaha</p>
            <p className={`mt-3 text-[15px] leading-relaxed text-ivory/85 ${fontClass}`}>{t('rsvp.success')}</p>
            <button onClick={() => setStatus('idle')} className="btn-ghost mt-7 !text-[12px]">
              {t('rsvp.submit')}
            </button>
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <section id="rsvp" className="relative z-10 overflow-hidden bg-night px-6 py-24">
      <div className="relative mx-auto max-w-2xl">
        <SectionHeader chapter={`${t('common.chapter')} 7`} eyebrow={t('rsvp.eyebrow')} title={t('rsvp.title')} light />

        <Reveal className="mt-12" delay={0.05}>
          <form onSubmit={submit} className="panel flex flex-col gap-5" noValidate>
            <RangoliCorner className="pointer-events-none absolute -left-1 -top-1 h-9 w-9 opacity-70" />
            <RangoliCorner className="pointer-events-none absolute -right-1 -top-1 h-9 w-9 rotate-90 opacity-70" />

            <div>
              <label className={`label ${fontClass}`} htmlFor="rsvp-name">
                {t('rsvp.name')} *
              </label>
              <input
                id="rsvp-name"
                className={`field ${fontClass}`}
                value={form.name}
                onChange={set('name')}
                required
                autoComplete="name"
                placeholder="Ananya Rao"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={`label ${fontClass}`} htmlFor="rsvp-phone">
                  {t('rsvp.phone')}
                </label>
                <input
                  id="rsvp-phone"
                  className={`field ${fontClass}`}
                  value={form.phone}
                  onChange={set('phone')}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                />
              </div>
              {config.rsvp.askGuests && (
                <div>
                  <label className={`label ${fontClass}`} htmlFor="rsvp-guests">
                    {t('rsvp.guests')}
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min="1"
                    max="12"
                    className={`field ${fontClass}`}
                    value={form.guests}
                    onChange={set('guests')}
                  />
                </div>
              )}
            </div>

            <fieldset>
              <legend className={`label ${fontClass}`}>{t('rsvp.events')}</legend>
              <div className="flex flex-wrap gap-2">
                {config.events.map((ev) => {
                  const on = form.events.includes(ev.id)
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => toggleEvent(ev.id)}
                      aria-pressed={on}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${fontClass} ${
                        on
                          ? 'border-accent bg-accent text-ivory'
                          : 'border-wine/25 bg-white/60 text-wine hover:border-accent/60'
                      }`}
                    >
                      {pick(ev.ritual)}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <label className={`label ${fontClass}`} htmlFor="rsvp-msg">
                {t('rsvp.message')}
              </label>
              <textarea
                id="rsvp-msg"
                rows="3"
                className={`field resize-none ${fontClass}`}
                value={form.message}
                onChange={set('message')}
                placeholder="Wishing you both a lifetime of joy…"
              />
            </div>

            <p className={`text-[12px] text-wine/65 ${fontClass}`}>{pick(config.rsvp.deadline)}</p>

            {status === 'error' && (
              <p className="text-[13px] font-medium text-accent">{t('rsvp.error')}</p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-gold w-full disabled:opacity-60">
              {status === 'sending'
                ? t('rsvp.sending')
                : config.rsvp.method === 'whatsapp'
                  ? t('rsvp.whatsapp')
                  : t('rsvp.submit')}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export default Rsvp
