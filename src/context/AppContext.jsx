import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import config from '../config'

const AppCtx = createContext(null)

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

const THEME_IDS = config.themes.map((t) => t.id)
const LANGS = config.i18n.languages.map((l) => l.code)

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ?? fallback
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode */
  }
}

/** Smoothly ramp an audio element's volume (rAF based, cheap). */
function rampVolume(audio, to, ms = 1400) {
  const from = audio.volume
  const target = Math.max(0, Math.min(1, to))
  const t0 = performance.now()
  const step = (t) => {
    const k = Math.min(1, (t - t0) / ms)
    audio.volume = from + (target - from) * k
    if (k < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = read('saptapadi:lang', '')
    return LANGS.includes(saved) ? saved : 'en'
  })
  const [theme, setTheme] = useState(() => {
    const saved = read('saptapadi:theme', '')
    return THEME_IDS.includes(saved) ? saved : config.activeTheme
  })
  const [guest, setGuest] = useState('')
  const [reduced, setReduced] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [musicReady, setMusicReady] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const audioRef = useRef(null)

  /* --- guest personalisation: ?guest=Ananya --- */
  useEffect(() => {
    try {
      const g = new URLSearchParams(window.location.search).get('guest')
      if (g) setGuest(decodeURIComponent(g).trim().slice(0, 40))
    } catch {
      /* noop */
    }
  }, [])

  /* --- prefers-reduced-motion --- */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  /* --- theme + language reflected on <html> --- */
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    const swatch = config.themes.find((t) => t.id === theme)?.swatches?.[0]
    if (swatch) {
      let m = document.querySelector('meta[name="theme-color"]')
      if (!m) {
        m = document.createElement('meta')
        m.setAttribute('name', 'theme-color')
        document.head.appendChild(m)
      }
      m.setAttribute('content', swatch)
    }
    write('saptapadi:theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : lang
    write('saptapadi:lang', lang)
  }, [lang])

  /* --- audio element lifecycle --- */
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onReady = () => setMusicReady(a.readyState >= 1 && a.duration > 0)
    const onError = () => setMusicReady(false)
    a.volume = 0
    a.addEventListener('loadedmetadata', onReady)
    a.addEventListener('canplay', onReady)
    a.addEventListener('error', onError)
    return () => {
      a.removeEventListener('loadedmetadata', onReady)
      a.removeEventListener('canplay', onReady)
      a.removeEventListener('error', onError)
    }
  }, [])

  const toggleMusic = useCallback(async () => {
    const a = audioRef.current
    if (!a) return
    if (musicOn) {
      rampVolume(a, 0, 700)
      window.setTimeout(() => {
        if (audioRef.current) audioRef.current.pause()
      }, 750)
      setMusicOn(false)
      write('saptapadi:music', 'off')
      return
    }
    try {
      a.volume = 0
      await a.play()
      rampVolume(a, config.music.volume, 1600)
      setMusicOn(true)
      write('saptapadi:music', 'on')
    } catch {
      setMusicOn(false)
    }
  }, [musicOn])

  /* --- gate: start music as the doors open (the tap is a user gesture) --- */
  const openGate = useCallback(() => {
    setGateOpen(true)
    const a = audioRef.current
    if (!a || musicOn) return
    a.volume = 0
    // Fade starts right away (not inside play()'s promise) so the melody is
    // already audible the instant the track begins — even if it had to buffer.
    rampVolume(a, config.music.volume, 1800)
    a.play()
      .then(() => {
        setMusicOn(true)
        write('saptapadi:music', 'on')
      })
      .catch((err) => {
        // Autoplay was blocked — the guest can tap the music button instead.
        console.warn('[music] could not start on gate open:', err?.message || err)
        setMusicOn(false)
      })
  }, [musicOn])

  /* --- i18n helpers --- */
  const t = useCallback(
    (path) => {
      let node = config.i18n.strings[lang]
      for (const key of path.split('.')) node = node?.[key]
      if (node == null) {
        let fallback = config.i18n.strings.en
        for (const key of path.split('.')) fallback = fallback?.[key]
        return fallback ?? path
      }
      return node
    },
    [lang],
  )

  /** Resolve a `{ en, kn }` value for the active language. */
  const pick = useCallback(
    (obj) => {
      if (obj == null) return ''
      if (typeof obj === 'string') return obj
      return obj[lang] ?? obj.en ?? ''
    },
    [lang],
  )

  /** Parse a localised datetime, free of timezone surprises. */
  const dt = useCallback((iso) => new Date(iso), [])

  const value = useMemo(
    () => ({
      config,
      lang,
      setLang,
      theme,
      setTheme,
      guest,
      reduced,
      t,
      pick,
      dt,
      musicOn,
      musicReady,
      toggleMusic,
      gateOpen,
      openGate,
      audioRef,
      fontClass: lang === 'kn' ? 'font-kn' : '',
    }),
    [
      lang,
      theme,
      guest,
      reduced,
      t,
      pick,
      dt,
      musicOn,
      musicReady,
      toggleMusic,
      gateOpen,
      openGate,
    ],
  )

  return (
    <AppCtx.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={config.music.src}
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      />
    </AppCtx.Provider>
  )
}
