import { useApp } from '../context/AppContext'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { OmSymbol, Toran, RangoliCorner, LotusBloom } from './ornaments'

/**
 * CHAPTER 7b — BLESSINGS
 * A framed "With the blessings of" panel; sacred symbols used as a
 * header blessing only.
 */
export function Blessings() {
  const { config, t, pick, fontClass } = useApp()

  return (
    <section id="blessings" className="relative z-10 overflow-hidden bg-paper px-6 py-24 text-wine">
      <LotusBloom className="pointer-events-none absolute -left-20 top-16 h-40 w-56 text-gold/12" />
      <LotusBloom className="pointer-events-none absolute -right-20 bottom-10 h-40 w-56 scale-x-[-1] text-gold/12" />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader chapter={`${t('common.chapter')} 7`} eyebrow={t('blessings.eyebrow')} title={t('blessings.title')} />

        <Reveal className="mt-12">
          <div className="ornate-frame relative overflow-hidden rounded-3xl border-gold/60 bg-ivory px-6 py-10 shadow-[0_30px_80px_-40px_rgba(91,15,27,0.6)] sm:px-12">
            <div className="bg-weave pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <Toran className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full text-gold/60" aria-hidden="true" />

            <div className="relative flex flex-col items-center">
              <OmSymbol className="h-14 w-14 text-gold" />
              <p className={`mt-2 text-[12px] tracking-[0.26em] text-accent ${fontClass}`}>
                {pick(config.deity.invoke)}
              </p>
            </div>

            <div className="relative mt-10 grid gap-8 sm:grid-cols-2 sm:gap-6">
              {config.blessings.families.map((family) => (
                <div
                  key={pick(family.side)}
                  className="relative rounded-2xl border border-gold/40 bg-white/55 px-5 py-6 text-center"
                >
                  <RangoliCorner className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 opacity-60" />
                  <RangoliCorner className="pointer-events-none absolute -right-1 -top-1 h-8 w-8 rotate-90 opacity-60" />
                  <p className={`eyebrow text-accent ${fontClass}`}>{pick(family.side)}</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {family.members.map((m) => (
                      <li
                        key={m}
                        className={`font-display text-[1.05rem] leading-snug text-wine sm:text-[1.15rem] ${fontClass}`}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="relative mt-10 flex flex-col items-center text-center">
              <span className="divider-marigold w-40" />
              <p className={`mt-5 max-w-xl font-script text-[clamp(1.4rem,5.5vw,2rem)] leading-snug text-accent ${fontClass}`}>
                {pick(config.blessings.grandparents)}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Blessings
