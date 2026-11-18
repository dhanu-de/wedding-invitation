import { useEffect, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext'

const IconMusic = ({ playing }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M9 18V6l10-2v12" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </svg>
)

const IconPalette = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.6-1.6-1.7-1.6-3 0-1 .8-1.7 1.9-1.7H16a5 5 0 0 0 5-5c0-3.6-4-6.5-9-6.5Z" />
    <circle cx="7.6" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9.6" cy="8.2" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

const IconTranslate = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M4 6h10M9 4v2c0 4-2.6 7.4-6 9" />
    <path d="M6.5 11.5c1.6 2.6 3.8 4.4 6.5 5.5" />
    <path d="M13 20l4-9 4 9M14.6 17h4.8" />
  </svg>
)

/**
 * Floating control bar: language, theme, music.
 * Music is never forced — it only appears once the track actually loads.
 */
export function TopBar() {
  const { t, theme, setTheme, lang, setLang, musicOn, musicReady, toggleMusic, gateOpen, config } = useApp()
  const [openTheme, setOpenTheme] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!openTheme) return
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenTheme(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenTheme(false)
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [openTheme])

  const btn =
    'pointer-events-auto flex items-center gap-2 rounded-full border border-gold/35 bg-deep/70 px-3 py-2 text-gold backdrop-blur-md transition-colors hover:bg-deep/90'

  return (
    <div ref={wrapRef} className="pointer-events-none fixed right-3 top-3 z-[60] flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        {/* Language */}
        <div className={`${btn} !px-1.5`} role="group" aria-label={t('nav.language')}>
          {config.i18n.languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
              className={`rounded-full px-2.5 py-1 text-[12px] tracking-wide transition-colors ${
                lang === l.code ? 'bg-gold text-deep' : 'text-gold/70 hover:text-gold'
              } ${l.code === 'kn' ? 'font-kn' : ''}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Theme */}
        <div className="relative">
          <button
            className={btn}
            onClick={() => setOpenTheme((v) => !v)}
            aria-expanded={openTheme}
            aria-haspopup="true"
            aria-label={t('nav.theme')}
          >
            <IconPalette />
            <span className="hidden text-[11px] uppercase tracking-[0.2em] sm:inline">
              {config.themes.find((x) => x.id === theme)?.label}
            </span>
          </button>

          {openTheme && (
            <div className="pointer-events-auto absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gold/35 bg-deep/95 p-2 shadow-glow backdrop-blur-xl">
              <p className="px-2 pb-1 pt-1 text-[10px] uppercase tracking-[0.28em] text-gold/60">
                {t('nav.theme')}
              </p>
              {config.themes.map((th) => (
                <button
                  key={th.id}
                  onClick={() => {
                    setTheme(th.id)
                    setOpenTheme(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-[13px] transition-colors ${
                    theme === th.id ? 'bg-gold/15 text-gold' : 'text-ivory/80 hover:bg-gold/10'
                  }`}
                >
                  <span className="flex shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40">
                    {th.swatches.map((s) => (
                      <span key={s} className="h-4 w-3.5" style={{ background: s }} />
                    ))}
                  </span>
                  <span className="truncate">{th.label}</span>
                  {theme === th.id && <span className="ml-auto text-gold">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Music — available once the track has loaded (or right after entering) */}
        {(musicReady || gateOpen) && (
          <button
            className={btn}
            onClick={toggleMusic}
            aria-pressed={musicOn}
            aria-label={t('nav.music')}
            title={musicOn ? 'Pause music' : 'Play music'}
          >
            <IconMusic playing={musicOn} />
            <span className="hidden text-[11px] uppercase tracking-[0.2em] sm:inline">
              {musicOn ? 'On' : 'Off'}
            </span>
            {musicOn && (
              <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[2px] animate-float-y rounded-sm bg-marigold"
                    style={{ height: `${6 + i * 3}px`, animationDuration: `${900 + i * 260}ms` }}
                  />
                ))}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default TopBar
