import { useApp } from '../context/AppContext'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { Diya } from './ornaments'

/**
 * EXTRA — TRAVEL
 * Nearest airport / station, parking and stay. Fully config-driven.
 */
export function Travel() {
  const { config, t, pick, fontClass } = useApp()

  return (
    <section id="travel" className="relative z-10 bg-paper px-6 py-20 text-wine">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow={t('travel.eyebrow')} title={t('travel.title')} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {config.travel.items.map((item, i) => (
            <Reveal key={item.label.en} delay={Math.min(i * 0.06, 0.24)}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-gold/40 bg-white/55 px-5 py-5">
                <Diya className="mt-0.5 h-9 w-9 shrink-0 text-gold" strokeWidth={1.2} />
                <div>
                  <p className={`eyebrow text-accent ${fontClass}`}>{pick(item.label)}</p>
                  <p className={`mt-2 text-[15px] leading-relaxed text-wine/85 ${fontClass}`}>
                    {pick(item.value)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Travel
