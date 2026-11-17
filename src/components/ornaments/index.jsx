import React, { useId } from 'react'

/* =============================================================================
 *  ORNAMENT LIBRARY — inline, theme-aware SVG (stroke = currentColor).
 *  Sacred symbols (Om, Ganesha) are used only as header blessings.
 * ========================================================================== */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* ------------------------------- MANDALA --------------------------------- */
export function Mandala({ className = '', strokeWidth = 1, petals = 24 }) {
  const ring = (count, radius, rx, ry, opacity, offset = 0) =>
    Array.from({ length: count }).map((_, i) => (
      <ellipse
        key={`${count}-${i}`}
        cx="100"
        cy={100 - radius}
        rx={rx}
        ry={ry}
        transform={`rotate(${offset + (360 / count) * i} 100 100)`}
        strokeOpacity={opacity}
      />
    ))

  return (
    <svg viewBox="0 0 200 200" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <circle cx="100" cy="100" r="97" strokeOpacity="0.45" />
      <circle cx="100" cy="100" r="91" strokeOpacity="0.3" strokeDasharray="2 5" />
      <g>{ring(petals, 88, 6.5, 15, 0.75)}</g>
      <g>{ring(16, 68, 8, 13, 0.55, 11)}</g>
      <g>{ring(12, 46, 7, 11, 0.4)}</g>
      <circle cx="100" cy="100" r="30" strokeOpacity="0.5" />
      <g>{ring(8, 27, 9, 14, 0.6, 22)}</g>
      <circle cx="100" cy="100" r="9" strokeOpacity="0.7" />
      <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" opacity="0.8" />
      <g strokeOpacity="0.55">
        {Array.from({ length: 48 }).map((_, i) => (
          <circle key={i} cx="100" cy="5" r="1.3" fill="currentColor" stroke="none"
            transform={`rotate(${i * 7.5} 100 100)`} />
        ))}
      </g>
    </svg>
  )
}

/* -------------------------------- PAISLEY -------------------------------- */
export function Paisley({ className = '', strokeWidth = 1.4 }) {
  return (
    <svg viewBox="0 0 60 90" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M42 6c10 10 12 26 6 40-5 12-16 20-26 22-9 2-16-3-16-11 0-7 6-12 13-12 6 0 10 4 10 9 0 4-3 7-7 7" />
      <path d="M44 20c5 8 6 18 2 27-4 10-13 17-22 19" strokeOpacity="0.6" />
      <circle cx="40" cy="33" r="3.2" strokeOpacity="0.7" />
      <circle cx="30" cy="48" r="2.2" strokeOpacity="0.7" />
      <circle cx="21" cy="61" r="1.6" strokeOpacity="0.7" />
    </svg>
  )
}

/* --------------------------------- LOTUS --------------------------------- */
export function Lotus({ className = '', strokeWidth = 1.3 }) {
  return (
    <svg viewBox="0 0 120 70" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M60 8c9 10 13 21 13 32 0 10-6 18-13 22-7-4-13-12-13-22 0-11 4-22 13-32z" />
      <path d="M60 62c-9-4-22-6-34-16C18 38 12 30 10 22c11 1 22 6 31 14 6 5 12 12 19 26z" strokeOpacity="0.85" />
      <path d="M60 62c9-4 22-6 34-16 8-8 14-16 16-24-11 1-22 6-31 14-6 5-12 12-19 26z" strokeOpacity="0.85" />
      <path d="M60 62C48 56 30 50 20 36 14 28 12 20 12 12" strokeOpacity="0.45" />
      <path d="M12 62h96" strokeOpacity="0.5" />
      <circle cx="60" cy="40" r="4" strokeOpacity="0.75" />
    </svg>
  )
}

/* ------------------------------- LOTUS CUE ------------------------------- */
export function LotusCue({ className = '' }) {
  return (
    <svg viewBox="0 0 40 44" className={className} {...S} strokeWidth={1.2} aria-hidden="true">
      <path d="M20 4c4 6 6 12 6 17 0 5-3 9-6 11-3-2-6-6-6-11 0-5 2-11 6-17z" />
      <path d="M20 32c-6-2-13-5-16-12 6 0 12 3 16 7z" strokeOpacity="0.8" />
      <path d="M20 32c6-2 13-5 16-12-6 0-12 3-16 7z" strokeOpacity="0.8" />
      <path d="M20 32v8" strokeOpacity="0.6" />
      <path d="M14 40l6-3 6 3" strokeOpacity="0.6" />
    </svg>
  )
}

/* --------------------------------- KALASH -------------------------------- */
export function Kalash({ className = '', strokeWidth = 1.4 }) {
  return (
    <svg viewBox="0 0 120 130" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M32 60c0-9 6-16 14-17h28c8 1 14 8 14 17 0 8-3 15-3 24 0 10 4 16 4 22 0 9-14 16-29 16S31 115 31 106c0-6 4-12 4-22 0-9-3-16-3-24z" />
      <path d="M46 43V32h28v11" />
      <path d="M40 32h40" strokeOpacity="0.7" />
      <path d="M42 70c8 5 28 5 36 0" strokeOpacity="0.5" />
      <path d="M38 86c12 6 32 6 44 0" strokeOpacity="0.5" />
      <circle cx="60" cy="22" r="12" />
      <path d="M56 20c4-3 8-3 12 0" strokeOpacity="0.6" />
      <path d="M60 34c-6 0-11 4-13 10 5-2 10-2 13 1 3-3 8-3 13-1-2-6-7-10-13-10z" strokeOpacity="0.85" />
      <path d="M47 110c4 6 9 9 13 9s9-3 13-9" strokeOpacity="0.6" />
    </svg>
  )
}

/* --------------------------------- TORAN --------------------------------- */
export function Toran({ className = '', strokeWidth = 1.3 }) {
  const drops = [40, 80, 120, 160, 200, 240, 280, 320, 360]
  return (
    <svg viewBox="0 0 400 110" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M4 12C90 70 310 70 396 12" strokeOpacity="0.85" />
      <path d="M4 12C90 78 310 78 396 12" strokeOpacity="0.4" />
      <g>
        {Array.from({ length: 26 }).map((_, i) => {
          const t = i / 25
          const x = 4 + t * 392
          const y = 12 + Math.sin(Math.PI * t) * 44
          return <path key={i} d={`M${x} ${y}l9-6-3 11z`} strokeOpacity="0.7" />
        })}
      </g>
      <g>
        {drops.map((x, i) => {
          const t = (x - 4) / 392
          const y = 12 + Math.sin(Math.PI * t) * 52
          return (
            <g key={x}>
              <path d={`M${x} ${y}v12`} strokeOpacity="0.6" />
              {[0, 1, 2].map((k) => (
                <circle key={k} cx={x} cy={y + 18 + k * 11} r={7 - k * 1.2} strokeOpacity={0.85 - k * 0.15} />
              ))}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/* ------------------------------- MARIGOLD -------------------------------- */
export function Marigold({ className = '', strokeWidth = 1.3 }) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d="M50 50c0-14 6-26 14-30 2 10-2 22-14 30z"
          transform={`rotate(${i * (360 / 14)} 50 50)`} strokeOpacity="0.8" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={`b${i}`} d="M50 50c0-9 4-17 9-20 2 7-1 15-9 20z"
          transform={`rotate(${i * 36 + 18} 50 50)`} strokeOpacity="0.6" />
      ))}
      <circle cx="50" cy="50" r="9" strokeOpacity="0.9" />
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  )
}

/* ---------------------------------- BELL --------------------------------- */
export function Bell({ className = '', strokeWidth = 1.4, ...rest }) {
  return (
    <svg viewBox="0 0 70 100" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true" {...rest}>
      <path d="M35 6v10" />
      <path d="M24 16h22" />
      <path d="M35 16c11 0 17 9 17 22 0 16 3 26 8 34H10c5-8 8-18 8-34 0-13 6-22 17-22z" />
      <path d="M10 72h50" />
      <path d="M35 78v8" strokeOpacity="0.7" />
      <circle cx="35" cy="90" r="5" />
      <path d="M22 34c2-6 6-10 13-10" strokeOpacity="0.5" />
    </svg>
  )
}

/* ---------------------------------- DIYA --------------------------------- */
export function Diya({ className = '', strokeWidth = 1.4, flame = true }) {
  const gid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 90" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <defs>
        <radialGradient id={`fl-${gid}`} cx="50%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="45%" stopColor="rgb(var(--c-marigold))" />
          <stop offset="100%" stopColor="rgb(var(--c-accent))" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      {flame && (
        <>
          <path d="M60 30c9 12 13 19 13 26a13 13 0 0 1-26 0c0-7 4-14 13-26z" fill={`url(#fl-${gid})`} stroke="none" />
          <path d="M60 40c4 6 6 10 6 13a6 6 0 0 1-12 0c0-3 2-7 6-13z" fill="#FFFDF2" stroke="none" opacity="0.85" />
        </>
      )}
      <path d="M56 60v-6h8v6" strokeOpacity="0.7" />
      <path d="M14 62c0 0 10 20 46 20s46-20 46-20z" />
      <path d="M8 62h104" strokeOpacity="0.9" />
      <path d="M20 70c8 10 26 14 40 14s32-4 40-14" strokeOpacity="0.35" />
    </svg>
  )
}

/* -------------------------------- OM / GANESHA --------------------------- */
export function OmSymbol({ className = '' }) {
  const gid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`om-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF4D2" />
          <stop offset="100%" stopColor="rgb(var(--c-gold))" />
        </linearGradient>
      </defs>
      <g {...S} strokeWidth="1.6">
        <circle cx="60" cy="60" r="56" strokeOpacity="0.5" />
        <circle cx="60" cy="60" r="50" strokeOpacity="0.28" strokeDasharray="2 6" />
        {Array.from({ length: 24 }).map((_, i) => (
          <path key={i} d="M60 8v-5" strokeOpacity="0.5" transform={`rotate(${i * 15} 60 60)`} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={`d${i}`} cx="60" cy="14" r="1.8" fill="currentColor" stroke="none"
            transform={`rotate(${i * 45 + 22} 60 60)`} strokeOpacity="0.7" />
        ))}
      </g>
      <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fontSize="46"
        fontFamily="'Noto Serif Devanagari', serif" fill={`url(#om-${gid})`}>
        ॐ
      </text>
    </svg>
  )
}

export const GaneshaSymbol = OmSymbol

/* ------------------------------ JHAROKHA ARCH ---------------------------- */
export function JharokhaArch({ className = '', strokeWidth = 1.2 }) {
  return (
    <svg viewBox="0 0 140 190" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M6 186V78c0-26 14-44 34-52 8-3 14-10 14-18 0-6 5-10 16-10s16 4 16 10c0 8 6 15 14 18 20 8 34 26 34 52v108" strokeOpacity="0.55" />
      <path d="M16 186V80c0-22 12-37 29-44 10-4 15-11 15-19 0-6 5-9 10-9s10 3 10 9c0 8 5 15 15 19 17 7 29 22 29 44v106" strokeOpacity="0.85" />
      <g strokeOpacity="0.6">
        <circle cx="70" cy="52" r="4" />
        <path d="M6 122h128M6 134h128" strokeDasharray="3 6" />
      </g>
    </svg>
  )
}

/* ----------------------------- RANGOLI CORNER ---------------------------- */
export function RangoliCorner({ className = '', strokeWidth = 1.2 }) {
  return (
    <svg viewBox="0 0 110 110" className={className} {...S} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M4 106V40C4 20 20 4 40 4h66" strokeOpacity="0.8" />
      <path d="M14 106V46c0-18 14-32 32-32h60" strokeOpacity="0.5" />
      <path d="M4 106c30 0 52-22 52-52" strokeOpacity="0.35" strokeDasharray="2 5" />
      <g strokeOpacity="0.7">
        {[26, 40, 54].map((r, i) => (
          <path key={r} d={`M4 ${r}h${6 + i * 6}`} transform={`rotate(0)`} />
        ))}
        {[26, 40, 54].map((c, i) => (
          <path key={c} d={`M${c} 4v${6 + i * 6}`} />
        ))}
      </g>
      <path d="M22 22c8 0 14 6 14 14" strokeOpacity="0.9" />
      <circle cx="26" cy="26" r="2.6" fill="currentColor" stroke="none" opacity="0.8" />
    </svg>
  )
}

/* -------------------------------- FOOTPRINT ------------------------------ */
export function Footprint({ className = '' }) {
  return (
    <svg viewBox="0 0 40 62" className={className} {...S} strokeWidth="1.3" aria-hidden="true">
      <path d="M20 22c7 0 11 6 11 14 0 7-2 11-2 16 0 6-3 9-9 9s-9-3-9-9c0-5-2-9-2-16 0-8 4-14 11-14z" />
      <circle cx="13" cy="10" r="3.4" />
      <circle cx="20" cy="6" r="3.4" />
      <circle cx="27" cy="10" r="3.4" />
      <path d="M13 20c3-3 11-3 14 0" strokeOpacity="0.6" />
    </svg>
  )
}

/* ------------------------------ LOTUS BLOOM ------------------------------ */
/** Petals carry data-bloom so GSAP can animate the bloom-in. */
export function LotusBloom({ className = '' }) {
  return (
    <svg viewBox="0 0 100 70" className={className} {...S} strokeWidth="1.3" aria-hidden="true">
      <g>
        <path data-bloom d="M50 58C40 52 24 46 15 32 9 24 7 16 8 8" strokeOpacity="0.5" />
        <path data-bloom d="M50 58c10-6 26-12 35-26 6-8 8-16 7-24" strokeOpacity="0.5" />
      </g>
      <path data-bloom d="M50 62c-9-4-22-6-34-16C8 38 2 30 0 22c11 1 22 6 31 14 6 5 12 12 19 26z" strokeOpacity="0.9" />
      <path data-bloom d="M50 62c9-4 22-6 34-16 8-8 14-16 16-24-11 1-22 6-31 14-6 5-12 12-19 26z" strokeOpacity="0.9" />
      <path data-bloom d="M50 4c8 10 12 20 12 30 0 10-5 18-12 22-7-4-12-12-12-22 0-10 4-20 12-30z" />
      <circle data-bloom cx="50" cy="44" r="4" strokeOpacity="0.8" />
    </svg>
  )
}

/* --------------------------- EVENT ICON REGISTRY ------------------------- */
export const EventIcons = {
  marigold: Marigold,
  lotus: Lotus,
  bell: Bell,
  kalash: Kalash,
  diya: Diya,
  om: OmSymbol,
}

export const ornamentComponents = {
  Mandala,
  Paisley,
  Lotus,
  LotusCue,
  Kalash,
  Toran,
  Marigold,
  Bell,
  Diya,
  OmSymbol,
  JharokhaArch,
  RangoliCorner,
  Footprint,
  LotusBloom,
}
