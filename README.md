# Ramya & Ashish — The Journey to the Saptapadi

A mobile-first Hindu wedding invitation that behaves like a ceremony, not a brochure.
Seven chapters, one design system, one config file.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/  (static, deploy anywhere)
```

---

## 0. Where the content came from

Names, parents, dates, venues, map links, photos, the music track and the invitation PDF
were taken from the couple's existing invitation site and vendored into `/public` so this
build is self-contained:

| Asset | Local path |
|---|---|
| Bride portrait | `/photos/bride.jpg` |
| Groom portrait | `/photos/groom.jpg` |
| Couple photo | `/photos/couple-wedding.jpg` |
| Story photos | `/photos/couple-blue.jpg`, `/photos/couple-outdoor.jpg`, `/photos/couple-portrait.jpg` |
| Celebration hall | `/photos/reception-hall.jpg` |
| Background music | `/audio/wedding-melody.mp3` |
| Invitation PDF | `/invitations/wedding-invitation.pdf` |

Their site also carries `/images/countdownback.mp4`; it was **not** used — the countdown
runs a CSS/canvas diya sky instead, which is far lighter on mid-range Android.

Three things still need your input, all marked in `src/config.js`:

- `rsvp.whatsappNumber` — currently a placeholder (`919876543210`).
- `meta.siteUrl` + the `og:*` tags in `index.html` — currently `https://ashishwedsramya.pages.dev/`.
  Change them if you deploy this build to a different domain.
- `music.src` is 3.6 MB. Re-encode at 96–128 kbps mono (aim < 1 MB) before going live.

---

## 1. Art-direction note

**Mood.** Not "wedding website" — *walking into a mandap*. Warm, quiet, candle-lit. Ivory
silk and aged brass rather than flat white cards and drop shadows. Every surface carries a
trace of hand-work: a hairline gold rule, a rangoli corner, a woven paper grain.

**Palette — "Royal Kumkum" (default).** Deep maroon `#5B0F1B` for the temple-night depth,
kumkum red `#B3202A` for the sacred accent, marigold `#F2A900` for the living, celebratory
light, antique gold `#C9A24B` for every line and border, ivory `#FBF3E4` for the paper the
invitation is written on, temple-night `#1A0B0E` for the rooms the story happens in. Gold is
never flat: it is a gradient that drifts, like light moving across foil.
Three alternates ship as one-line swaps — **Emerald Temple**, **Saffron Sunrise**,
**Peacock Royale** — all driven by CSS variables, no component edits.

**Type.** Cormorant Garamond for display (the voice), Playfair Display for numerals and
punch, Pinyon Script for the drawn ampersand and the closing line, Jost for body (quiet,
modern, readable at 15px on a phone), Noto Serif Kannada for the Kannada layer, with
Devanagari / Tamil / Telugu / Malayalam ready in the same family. Kannada is not a fallback
font — it gets its own line height and is set at the same optical weight as the Latin.

**Motion language.** Slow, ceremonial, never bouncy. One easing family (`power3.out`),
durations of 0.9–1.4 s, everything staggered line-by-line or petal-by-petal. Each chapter
gets exactly three motions: **one hero reveal**, **one micro-interaction**, **one ambient
loop that never stops** (drifting marigolds, rotating mandala, flickering diya flame).
Only `transform` and `opacity` are animated; anything heavy is lazy-initialised and paused
when off-screen. `prefers-reduced-motion` swaps the whole language for plain fades.

**Sacred, respectfully.** Om and Ganesha appear only as blessing headers — gate, hero,
blessings panel, closing — never as tiling pattern fill. The swastika is not used
decoratively anywhere.

---

## 2. Wireframes, section by section

Each chapter is numbered on-screen (`Chapter 1` … `Chapter 7`) so the journey reads as a
countdown to the Saptapadi.

### 1 · GATE — "Shubh Aarambh"
- **Mobile.** Full viewport, no scroll. Toran across the top, `ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ` beneath it.
  Two carved wooden doors, hinged on brass, meeting at a glowing centre seam. A diya sits
  above the seam; a single gold button reads *Tap to open the invitation*. When `?guest=Name`
  is present, it reads *Dear {Name}, you are invited*. A small *Skip* link and a one-line
  hint about sound sit at the bottom edge.
- **Desktop.** Identical, but the doors are taller relative to the width and the perspective
  is exaggerated (1500 px) so the swing has real depth.
- **On tap.** Doors rotate 108° on Y, seam flares, 26 petals burst, the invitation behind
  fades up. Music only starts if the guest has previously opted in.

### 2 · INVOCATION — Hero
- **Mobile.** Vertically centred stack: Om, names in display serif, a script ampersand that
  draws itself between them, date in English and Kannada, muhurat line, venue, two temple
  bells. A lotus-shaped scroll cue at the bottom.
- **Desktop.** Same stack, narrower measure, mandala parallax read wide behind the names.
- **Motion.** Hero: staggered reveal the moment the gate opens. Micro: bells tilt on hover.
  Ambient: mandala rotates (~60 s), marigolds drift across.

### 3 · THE COUPLE — "Two Souls, One Journey"
- **Mobile.** Two full-width cards stacked; portraits masked into a jharokha arch with a
  drawn arch outline on top. Name, role, parent line (`D/o …`, `S/o …`), short bio,
  favourite-things chips.
- **Desktop.** Side by side, with a large drawn ampersand in the centre gutter; the cards
  slide in from opposite edges and meet at the ampersand.
- **Motion.** Hero: opposing slide-in + ampersand `back.out` pop. Micro: chips lift.
  Ambient: petals.

### 4 · OUR LOVE STORY — Timeline
- **Mobile.** A single vine down the left edge; milestone cards to its right, each with a
  year pill, a photo, a title and two lines.
- **Desktop.** Same vine centre-aligned with cards alternating left and right.
- **Motion.** Hero: the vine draws itself with scroll (`stroke-dashoffset` scrub) and each
  node blooms into a lotus as it enters. Micro: node pulses. Ambient: petals.

### 5 · COUNTDOWN — "Muhurtham in…"
- **Mobile.** Days / Hours / Minutes / Seconds as four flip cells in a single row, inside a
  diya frame with rangoli corners and a muhurat label underneath. Diyas float up the
  background.
- **Desktop.** Larger flip cells, more sky.
- **States.** Before the muhurat → flipping digits. On the wedding day → a schedule card
  listing today's rituals with a live *Happening now* highlight. After → *Married!* and a
  thank-you line.
- **Motion.** Hero: frame and cells rise in. Micro: each digit flips on change.
  Ambient: floating diyas + flame flicker.

### 6 · THE CELEBRATIONS
- **Mobile.** Horizontal snap carousel, one carved panel per screen (82 vw), a
  *swipe for more* hint, and a row of dots-by-position implied by the peeking next card.
- **Desktop.** Three-up grid.
- **Each panel.** Ritual icon, name, date, time, venue, dress-code swatches, an
  expandable *What it means* explainer, *View on Map* and *Add to Calendar* (.ics).
- **Motion.** Hero: cards unroll in with a stagger. Micro: the explainer unfolds on a
  grid-rows transition. Ambient: none (keeps the paper calm).

### 7 · BLESSINGS · RSVP · TRAVEL · CLOSING
- **Blessings.** A framed *With the blessings of* panel: Om header, bride's parents and
  groom's parents in two columns with rangoli corners, a grandparents line in script.
- **RSVP.** Name, phone, number of guests, event toggle chips, a wish box. Submits via
  WhatsApp deep link / Formspree / any endpoint, then shows a *Dhanyavaadaha* panel.
- **Travel.** Four labelled cards — nearest airport, nearest railway station, parking, stay.
- **Closing.** The closing line, the couple photo with rangoli corners, then *Share
  invitation* (Web Share → WhatsApp fallback), *Copy link*, *Download PDF*. A final petal
  shower plays on arrival, and scrolling to the very end reveals the **seven Saptapadi
  steps** completing one by one.
- **Motion.** Hero: petal shower + seven steps. Micro: share, copy-link and PDF feedback. Ambient: petals.

---

## 3. Project structure

```
.
├── index.html                  # OG/Twitter meta, fonts, theme-color
├── public/
│   ├── photos/                 # bride, groom, couple, reception-hall
│   ├── audio/wedding-melody.mp3
│   └── invitations/wedding-invitation.pdf
└── src/
    ├── config.js               # ← THE ONLY FILE YOU EDIT
    ├── App.jsx                 # chapter order, Lenis, ScrollTrigger refresh
    ├── main.jsx
    ├── context/AppContext.jsx  # lang, theme, guest, music, reduced-motion
    ├── hooks/useCountdown.js
    ├── lib/
    │   ├── gsap.js             # GSAP + ScrollTrigger + defaults
    │   └── ics.js              # RFC 5545 calendar generation
    ├── styles/index.css        # 4 theme presets, utilities, components
    └── components/
        ├── ornaments/index.jsx # mandala, kalash, toran, lotus, diya, jharokha, …
        ├── ambient/index.jsx   # petals canvas, rotating mandala, diya cursor
        ├── ui/                 # Reveal, SectionHeader, ScriptAmpersand
        ├── chrome/TopBar.jsx   # language / theme / music
        ├── Gate.jsx  Invocation.jsx  Couple.jsx  LoveStory.jsx
        ├── Countdown.jsx  Celebrations.jsx
        └── Blessings.jsx  Rsvp.jsx  Travel.jsx  Closing.jsx
```

---

## 4. How to make it yours

Open **`src/config.js`**. Nothing else needs to change.

| What | Where |
|---|---|
| Names, full names, parents, bios, favourites | `couple.bride`, `couple.groom` |
| Portraits / couple photo | `couple.bride.photo`, `couple.groom.photo`, `couple.couplePhoto` |
| Date, muhurat text, venue | `wedding` (`dateISO` drives the countdown) |
| Rituals | `events[]` — add, remove, reorder freely |
| Love story | `story[]` — 4–6 milestones |
| Family blessings | `blessings.families[]` |
| Music | `music.src`, `music.volume` |
| RSVP | `rsvp.method` = `whatsapp` \| `formspree` \| `endpoint` |
| Travel info | `travel.items[]` |
| Sacred greeting | `deity` (and `regions` for other communities) |
| Theme | `activeTheme` |
| Regional ritual vocabulary | `activeRegion` |

**Everything is bilingual.** Anywhere you see `{ en: '…', kn: '…' }` you can add or swap
languages. To add a third language, append it to `i18n.languages` and add a key block to
`i18n.strings`.

**Photos.** Drop optimised WebP/AVIF files into `public/photos/` and point the `photo` /
`src` fields at `/photos/your-file.webp`. Keep them under ~200 kB each and
1200 px on the long edge.

**Music.** Put a licensed loop in `public/audio/`. It never autoplays — the guest must
tap the toggle, and the toggle only appears once the file has actually loaded.

**Theming.** Change `activeTheme` to `emerald-temple`, `saffron-sunrise` or
`peacock-royale`. To invent a new one, copy a block in `src/styles/index.css` and
override the six RGB triplet variables — Tailwind tokens follow automatically. Guests can
also switch theme live from the top bar; the choice persists in `localStorage`.

**Guest personalisation.** Share `https://your-site/?guest=Ananya` and the gate greets her
by name.

**Deploy.**

```bash
npm run build
```

The output is fully static — no server, no API keys.

- **Cloudflare Pages** — build command `npm run build`, output directory `dist`.
- **Netlify** — same; or drag `dist/` into the dashboard.
- **Vercel** — framework preset *Vite*, same command and output.

Deploying to a sub-path? Set `base` in `vite.config.js` and update the absolute `og:*` URLs
in `index.html`.

---

## 5. Free assets & licences

**Fonts (all SIL Open Font License 1.1 — free for commercial use, self-hosting allowed).**
Loaded from Google Fonts in `index.html`:
Cormorant Garamond, Playfair Display, Pinyon Script, Great Vibes, Jost,
Noto Serif Kannada / Devanagari / Tamil (add Telugu, Malayalam, Bengali, Gujarati from the
same family if you localise further). For a faster first paint, self-host the two or three
weights you actually use and subset them.

**Ornaments.** Every ornament in this build is hand-authored inline SVG in
`src/components/ornaments/index.jsx` — no third-party licence, no attribution required.
If you want more, these are safe sources:

- **Public domain / CC0:** Wikimedia Commons Hindu temple ornament categories, *The
  Grammar of Ornament* by Owen Jones (public domain, 1856) for paisley and mandala plates.
- **CC0 icon sets:** Iconoir, Phosphor Icons, Tabler Icons (all MIT/CC0).
- **SVG pattern generators:** Hero Patterns (MIT), SVG Backgrounds free tier (check each
  file's licence — most are CC BY 4.0 and ask for a link).

**Music.** Search these for a sitar / shehnai / veena bed, and **read the licence on the
track page** — "free" often means credit required:

- **Pixabay Music** — free for commercial use, no attribution required (CC0-like).
- **Free Music Archive** — filter to CC0 or CC BY; CC BY needs a visible credit line.
- **Incompetech (Kevin MacLeod)** — CC BY 4.0, credit required.
- **YouTube Audio Library** — free tier, but licence varies per track.

Never ship a commercial film or devotional recording — those are almost always
rights-restricted even when they appear free.

**Video (optional).** If you prefer a video countdown background over the diya sky, use a
Pexels or Coverr clip (free licence, no attribution required), export it to
H.264 720p under 3 MB, set `poster` to a still, and add `playsinline muted loop
preload="none"`.

---

## 6. Performance & accessibility notes

- Animates only `transform` / `opacity`; petal particles are capped (16 on mobile, 30 on
  desktop), DPR clamped at 2, and the canvas pauses when the tab is hidden.
- Lenis smooth scroll runs on pointer devices only — touch keeps native momentum.
- Images are lazy-loaded and `decoding="async"`; the OG image is absolute for WhatsApp.
- Skip link, `sr-only` h1, visible focus rings, `alt` text on
  every image, AA contrast on ivory-on-maroon and gold-on-night.
- Reduced motion, when requested, collapses every chapter to a plain fade.

_One caveat: the wedding-day "happening now" logic uses the device clock, so tell guests
to check their timezone is set correctly if they are travelling in._
