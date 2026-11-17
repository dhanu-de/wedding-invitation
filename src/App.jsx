import { useEffect } from 'react'
import Lenis from 'lenis'
import { AppProvider, useApp } from './context/AppContext'
import { ScrollTrigger } from './lib/gsap'
import { useScrollRefresh } from './components/ui/Reveal'
import { Petals, DiyaCursor } from './components/ambient'
import { TopBar } from './components/chrome/TopBar'
import { Gate } from './components/Gate'
import { Invocation } from './components/Invocation'
import { Couple } from './components/Couple'
import { LoveStory } from './components/LoveStory'
import { Countdown } from './components/Countdown'
import { Celebrations } from './components/Celebrations'
import { Blessings } from './components/Blessings'
import { Rsvp } from './components/Rsvp'
import { Travel } from './components/Travel'
import { Closing } from './components/Closing'

function Experience() {
  const { reduced, gateOpen, config, t } = useApp()
  useScrollRefresh()

  /* Smooth scroll via Lenis — desktop only; touch keeps native momentum. */
  useEffect(() => {
    if (reduced || !gateOpen) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 })
    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduced, gateOpen])

  /* Recalculate scroll positions once the gate unlocks the body. */
  useEffect(() => {
    if (!gateOpen) return
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => window.clearTimeout(id)
  }, [gateOpen])

  return (
    <>
      <a
        href="#invocation"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-deep focus:px-4 focus:py-2 focus:text-gold"
      >
        Skip to invitation
      </a>

      <Petals />
      <DiyaCursor />
      <TopBar />
      <Gate />

      <main>
        <Invocation />
        <Couple />
        <LoveStory />
        <Countdown />
        <Celebrations />
        <Blessings />
        <Rsvp />
        <Travel />
        <Closing />
      </main>

      {/* Visually hidden h1 fallback for crawlers/AT when the gate is closed */}
      <h1 className="sr-only">
        {config.couple.bride.fullName.en} &amp; {config.couple.groom.fullName.en} — {t('closing.line')}
      </h1>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Experience />
    </AppProvider>
  )
}
