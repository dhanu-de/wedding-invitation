import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Mobile-safe defaults: transform/opacity only, no filters or layout props. */
gsap.defaults({ ease: 'power3.out', duration: 1.1 })

export { gsap, ScrollTrigger }
