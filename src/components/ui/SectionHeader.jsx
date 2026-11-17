import { Reveal } from './Reveal'
import { RangoliCorner } from '../ornaments'

/**
 * Chapter heading: eyebrow (chapter no. + label), foil title, gold rule.
 */
export function SectionHeader({ chapter, eyebrow, title, light = false, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  const titleColor = light ? 'text-foil' : 'text-wine'
  const eyebrowColor = light ? 'text-gold/90' : 'text-accent'

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      <Reveal y={14} duration={0.9}>
        <div className={`flex items-center gap-3 ${eyebrowColor}`}>
          <span className="hairline w-8" />
          {chapter && <span className="eyebrow opacity-70">{chapter}</span>}
          <span className="eyebrow">{eyebrow}</span>
          <span className="hairline w-8" />
        </div>
      </Reveal>

      <Reveal y={22} delay={0.06} className="relative max-w-3xl">
        <h2 className={`font-display text-[clamp(2rem,7vw,3.4rem)] leading-[1.05] ${titleColor}`}>
          {title}
        </h2>
      </Reveal>

      <Reveal y={12} delay={0.12} className="pt-2">
        <div className="flex items-center gap-3 text-gold">
          <RangoliCorner className="h-5 w-5 -rotate-90 opacity-70" />
          <span className="divider-marigold w-28 sm:w-44" />
          <RangoliCorner className="h-5 w-5 rotate-180 opacity-70" />
        </div>
      </Reveal>
    </div>
  )
}

export default SectionHeader
