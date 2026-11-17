/* =============================================================================
 *  config.js  —  THE ONLY FILE YOU NEED TO EDIT TO REUSE THIS TEMPLATE
 * -----------------------------------------------------------------------------
 *  Everything a couple needs to personalise lives here: names, parents, dates,
 *  rituals, photos, music, language strings, theme, maps and the RSVP endpoint.
 *  No component code needs to change.
 *
 *  QUICK START
 *   1. Edit `couple`, `wedding`, `events`, `story`, `blessings`.
 *   2. Real photos live in /public/photos (bride, groom, couple, reception-hall).
 *   3. Choose `activeTheme` and `activeRegion`.
 *   4. Update <index.html> OG tags + `meta.siteUrl` before deploying.
 * ========================================================================== */

/* --------------------------------- META ---------------------------------- */
export const meta = {
    siteUrl: 'https://ashishwedsramya.pages.dev/', // ← deployed URL (OG needs absolute)
    themeColor: '#5B0F1B',
    hashtag: '#RamyaWedsAshish',
}

/* -------------------------------- THEMES --------------------------------- */
export const themes = [
    { id: 'royal-kumkum', label: 'Royal Kumkum', swatches: ['#5B0F1B', '#B3202A', '#F2A900', '#C9A24B'] },
    { id: 'emerald-temple', label: 'Emerald Temple', swatches: ['#0E3B2E', '#1B7A5A', '#E9B44C', '#C9A24B'] },
    { id: 'saffron-sunrise', label: 'Saffron Sunrise', swatches: ['#7A2A0B', '#E2731B', '#F6B93B', '#D9A441'] },
    { id: 'peacock-royale', label: 'Peacock Royale', swatches: ['#0B3A4A', '#0E7C86', '#E0A458', '#D4AF37'] },
]
export const activeTheme = 'royal-kumkum'

/* ------------------------------- GREETING -------------------------------- */
/* Sacred symbols are used as header blessings only — never as pattern fill.  */
export const deity = {
    name: { en: 'Shree Ganeshaya Namaha', kn: 'ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ' },
    invoke: { en: 'Om Shree Ganeshaya Namaha', deva: 'ॐ श्री गणेशाय नमः' },
    symbol: 'ganesha', // rendered as a respectful inline SVG motif
}

/* -------------------------------- COUPLE --------------------------------- */
export const couple = {
    monogram: 'R & A',
    weddingHashtag: meta.hashtag,
    bride: {
        name: { en: 'Ramya', kn: 'ರಮ್ಯಾ' },
        fullName: { en: 'Ramya Pai', kn: 'ರಮ್ಯಾ ಪೈ' },
        role: { en: 'Bride', kn: 'ವಧು' },
        relation: { en: 'D/o', kn: 'ಶ್ರೀ.' }, // "D/o" / daughter of
        parents: {
            en: 'Smt. Rekha & Shri Krishna Pai',
            kn: 'ಶ್ರೀಮತಿ ರೇಖಾ ಮತ್ತು ಶ್ರೀ ಕೃಷ್ಣ ಪೈ',
        },
        bio: {
            en: 'An architect who finds poetry in old temples, filter coffee and long monsoon drives. Believes every good story begins with a shared song.',
            kn: 'ಹಳೆಯ ದೇವಸ್ಥಾನಗಳಲ್ಲಿ, ಫಿಲ್ಟರ್ ಕಾಫಿಯಲ್ಲಿ ಮತ್ತು ಮುಂಗಾರಿನ ಪ್ರಯಾಣಗಳಲ್ಲಿ ಕಾವ್ಯ ಕಾಣುವ ವಾಸ್ತುಶಿಲ್ಪಿ. ಪ್ರತಿ ಒಳ್ಳೆಯ ಕಥೆಯೂ ಒಂದು ಹಾಡಿನಿಂದ ಆರಂಭವಾಗುತ್ತದೆ ಎಂದು ನಂಬುತ್ತಾಳೆ.',
        },
        favourites: {
            en: ['Bharatanatyam', 'Filter coffee', 'Mysore jasmine', 'Rains'],
            kn: ['ಭರತನಾಟ್ಯ', 'ಫಿಲ್ಟರ್ ಕಾಫಿ', 'ಮೈಸೂರು ಮಲ್ಲಿಗೆ', 'ಮಳೆ'],
        },
        photo: '/photos/bride.jpg',
    },
    groom: {
        name: { en: 'Ashish', kn: 'ಆಶಿಷ್' },
        fullName: { en: 'Ashish Pai', kn: 'ಆಶಿಷ್ ಪೈ' },
        role: { en: 'Groom', kn: 'ವರ' },
        relation: { en: 'S/o', kn: 'ಶ್ರೀ.' }, // "S/o" / son of
        parents: {
            en: 'Smt. Vandana & Shri Aravinda Pai',
            kn: 'ಶ್ರೀಮತಿ ವಂದನಾ ಮತ್ತು ಶ್ರೀ ಅರವಿಂದ ಪೈ',
        },
        bio: {
            en: 'A percussionist-turned-product designer from the coast. Collects old vinyl, makes terrible puns, and has never lost a game of carrom.',
            kn: 'ಕರಾವಳಿಯ ತಾಳವಾದ್ಯಗಾರರಿಂದ ಉತ್ಪನ್ನ ವಿನ್ಯಾಸಕರಾದವರು. ಹಳೆಯ ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತಾರೆ, ಒಳ್ಳೆಯ ಹಾಸ್ಯ ಮಾಡುತ್ತಾರೆ, ಕ್ಯಾರಮ್‌ನಲ್ಲಿ ಎಂದೂ ಸೋತಿಲ್ಲ.',
        },
        favourites: {
            en: ['Mridangam', 'Neer dosa', 'Vintage vinyl', 'Netravati sunsets'],
            kn: ['ಮೃದಂಗ', 'ನೀರು ದೋಸೆ', 'ಹಳೆಯ ದಾಖಲೆಗಳು', 'ನೇತ್ರಾವತಿ ಸೂರ್ಯಾಸ್ತ'],
        },
        photo: '/photos/groom.jpg',
    },
    couplePhoto: '/photos/couple-wedding.jpg',
}

/* -------------------------------- WEDDING -------------------------------- */
export const wedding = {
    /* The Muhurtham datetime drives the countdown + "wedding day" live mode. */
    dateISO: '2026-12-18T12:24:00+05:30',
    timezone: 'Asia/Calcutta',
    date: {
        en: 'Friday, 18 December 2026',
        kn: 'ಶುಕ್ರವಾರ, 18 ಡಿಸೆಂಬರ್ 2026',
    },
    dateShort: { en: '18.12.2026', kn: '18.12.2026' },
    muhurat: {
        en: 'Muhurtham · Abhijit Lagnam, 12:24 PM',
        kn: 'ಮುಹೂರ್ತ · ಅಭಿಜಿತ್ ಲಗ್ನ, ಮಧ್ಯಾಹ್ನ 12:24',
    },
    venue: {
        en: 'JNR Kalamandira, Yedthare, Baindur, Karnataka 576214',
        kn: 'ಜೆಎನ್ಆರ್ ಕಲಾಮಂದಿರ, ಯಡ್ತರೆ, ಬೈಂದೂರು, ಕರ್ನಾಟಕ 576214',
    },
    mapQuery: 'JNR Kalamandira Yedthare Baindur Karnataka 576214',
    invitationPdf: '/invitations/wedding-invitation.pdf',
}

/* ------------------------------ EVENTS ----------------------------------- */
/* Add / remove / reorder freely. `palette` is the dress-code swatch.        */
export const events = [{
        id: 'phool-muddi',
        icon: 'marigold',
        ritual: { en: 'Phool Muddi', kn: 'ಫೂಲ್ ಮುಡ್ಡಿ' },
        dateISO: '2026-12-17T17:30:00+05:30',
        date: { en: 'Thu, 17 Dec 2026', kn: 'ಗುರುವಾರ, 17 ಡಿಸೆಂ 2026' },
        time: { en: '5:30 PM onwards', kn: 'ಸಂಜೆ 5:30 ರಿಂದ' },
        venue: {
            en: 'JNR Kalamandira, Yedthare, Baindur, Karnataka 576214',
            kn: 'ಜೆಎನ್ಆರ್ ಕಲಾಮಂದಿರ, ಯಡ್ತರೆ, ಬೈಂದೂರು, ಕರ್ನಾಟಕ 576214',
        },
        mapQuery: 'JNR Kalamandira Yedthare Baindur Karnataka 576214',
        mapUrl: 'https://maps.app.goo.gl/fp39kjR39K2jBUjd8',
        meaning: {
            en: 'A pre-wedding ceremony where the bride is honoured with flowers and gifts, welcoming her into the family.',
            kn: 'ವಧುವನ್ನು ಹೂವು ಮತ್ತು ಉಡುಗೊರೆಗಳಿಂದ ಗೌರವಿಸುವ ಪೂರ್ವ-ವಿವಾಹ ಆಚರಣೆ.',
        },
        palette: ['#F2A900', '#E9C46A', '#FFF3D6'],
    },
    {
        id: 'muhurtham',
        icon: 'kalash',
        ritual: { en: 'Wedding', kn: 'ವಿವಾಹ' },
        dateISO: '2026-12-18T12:24:00+05:30',
        date: { en: 'Fri, 18 Dec 2026', kn: 'ಶುಕ್ರವಾರ, 18 ಡಿಸೆಂ 2026' },
        time: { en: '12:24 PM · Abhijit Lagnam', kn: 'ಮಧ್ಯಾಹ್ನ 12:24 · ಅಭಿಜಿತ್ ಲಗ್ನ' },
        venue: {
            en: 'JNR Kalamandira, Yedthare, Baindur, Karnataka 576214',
            kn: 'ಜೆಎನ್ಆರ್ ಕಲಾಮಂದಿರ, ಯಡ್ತರೆ, ಬೈಂದೂರು, ಕರ್ನಾಟಕ 576214',
        },
        mapQuery: 'JNR Kalamandira Yedthare Baindur Karnataka 576214',
        mapUrl: 'https://maps.app.goo.gl/fp39kjR39K2jBUjd8',
        meaning: {
            en: 'The sacred vows are exchanged as the couple takes the seven steps — the Saptapadi.',
            kn: 'ಏಳು ಹೆಜ್ಜೆ — ಸಪ್ತಪದಿ — ಇಡುವ ಮೂಲಕ ಪವಿತ್ರ ಪ್ರತಿಜ್ಞೆಗಳ ವಿನಿಮಯ.',
        },
        palette: ['#B3202A', '#C9A24B', '#FBF3E4'],
    },
    {
        id: 'reception-pooja',
        icon: 'om',
        ritual: {
            en: 'Reception & Satyanarayana Pooja',
            kn: 'ಸ್ವಾಗತ ಸಮಾರಂಭ ಮತ್ತು ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ',
        },
        dateISO: '2026-12-21T13:00:00+05:30',
        date: { en: 'Mon, 21 Dec 2026', kn: 'ಸೋಮವಾರ, 21 ಡಿಸೆಂ 2026' },
        time: { en: 'Lunch at 1:00 PM', kn: 'ಮಧ್ಯಾಹ್ನ 1:00ಕ್ಕೆ ಊಟ' },
        venue: {
            en: 'Shri Ganesh Mandir, Badiadka, Badiyadka, Kerala 671551',
            kn: 'ಶ್ರೀ ಗಣೇಶ ಮಂದಿರ, ಬದಿಯಡ್ಕ, ಕೇರಳ 671551',
        },
        mapQuery: 'Shri Ganesh Mandir Badiadka Badiyadka Kerala 671551',
        mapUrl: 'https://maps.app.goo.gl/oYgntdWg7LeXXq4r6',
        meaning: {
            en: 'The newly-weds receive blessings, followed by the Satyanarayana Pooja for prosperity and harmony.',
            kn: 'ನವದಂಪತಿ ಆಶೀರ್ವಾದ ಸ್ವೀಕರಿಸಿ, ಸಮೃದ್ಧಿ ಮತ್ತು ಸಾಮರಸ್ಯಕ್ಕಾಗಿ ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ.',
        },
        palette: ['#0E3B2E', '#C9A24B', '#F6F1E4'],
    },
]

/* ------------------------------ OUR STORY -------------------------------- */
export const story = [{
        id: 'met',
        year: '2021',
        title: { en: 'How we met', kn: 'ನಾವು ಭೇಟಿಯಾದದ್ದು' },
        text: {
            en: 'A rainswept college fest in Mangaluru. One shared umbrella, one borrowed mridangam, and a conversation that refused to end.',
            kn: 'ಮಂಗಳೂರಿನಲ್ಲಿ ಮಳೆಯ ಒಂದು ಕಾಲೇಜು ಉತ್ಸವ. ಒಂದೇ ಛತ್ರಿ, ಎರವಲು ಪಡೆದ ಮೃದಂಗ, ಮತ್ತು ಮುಗಿಯದ ಮಾತುಕತೆ.',
        },
        photo: '/photos/couple-blue.jpg',
        focus: '50% 42%',
    },
    {
        id: 'talk',
        year: '2022',
        title: { en: 'First real conversation', kn: 'ಮೊದಲ ನಿಜವಾದ ಮಾತುಕತೆ' },
        text: {
            en: 'Three hours at a tiny Udupi cafe. Two cold coffees, no awkward silences, and a playlist we still share.',
            kn: 'ಉಡುಪಿಯ ಒಂದು ಸಣ್ಣ ಕೆಫೆಯಲ್ಲಿ ಮೂರು ಗಂಟೆ. ಎರಡು ಕಾಫಿ, ಯಾವುದೇ ಮೌನ, ಮತ್ತು ಇಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವ ಹಾಡುಗಳ ಪಟ್ಟಿ.',
        },
        photo: '/photos/couple-outdoor.jpg',
        focus: '50% 28%',
    },
    {
        id: 'yes',
        year: '2024',
        title: { en: 'She said yes', kn: 'ಅವಳು ಒಪ್ಪಿದಳು' },
        text: {
            en: 'On the steps of the Karkala temple at sunset, with marigolds we bought from a roadside vendor.',
            kn: 'ಕಾರ್ಕಳದ ದೇವಸ್ಥಾನದ ಮೆಟ್ಟಿಲಲ್ಲಿ ಸೂರ್ಯಾಸ್ತದ ಸಮಯ, ದಾರಿಬದಿಯಲ್ಲಿ ಖರೀದಿಸಿದ ಮಾರಿಗೊಳ್ಳುಗಳೊಂದಿಗೆ.',
        },
        photo: '/photos/couple-portrait.jpg',
        focus: '50% 14%',
    },
    {
        id: 'families',
        year: '2025',
        title: { en: 'Our families met', kn: 'ನಮ್ಮ ಕುಟುಂಬಗಳ ಭೇಟಿ' },
        text: {
            en: 'Two families, one large table of snacks, and endless laughter. The chai was refilled six times.',
            kn: 'ಎರಡು ಕುಟುಂಬಗಳು, ತಿಂಡಿಗಳ ದೊಡ್ಡ ಮೇಜು, ಮತ್ತು ನಗುವಿನ ಸುರಿಮಳೆ. ಚಹಾ ಆರು ಬಾರಿ ತುಂಬಿಸಲಾಯಿತು.',
        },
        photo: '/photos/reception-hall.jpg',
        focus: '50% 50%',
    },
    {
        id: 'engaged',
        year: '2026',
        title: { en: 'Engaged', kn: 'ನಿಶ್ಚಿತಾರ್ಥ' },
        text: {
            en: 'Rings exchanged under a canopy of jasmine, with the blessings of everyone who raised us.',
            kn: 'ಮಲ್ಲಿಗೆ ಹೂಗಳ ಕಮಾನಿನ ಕೆಳಗೆ, ನಮ್ಮನ್ನು ಬೆಳೆಸಿದ ಎಲ್ಲರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ಉಂಗುರಗಳ ವಿನಿಮಯ.',
        },
        photo: '/photos/couple-wedding.jpg',
        focus: '50% 40%',
    },
]

/* ------------------------------ BLESSINGS -------------------------------- */
export const blessings = {
    families: [{
            side: { en: "Bride's Parents", kn: 'ವಧುವಿನ ತಂದೆ-ತಾಯಿ' },
            members: [
                'Smt. Rekha & Shri Krishna Pai',
            ],
        },
        {
            side: { en: "Groom's Parents", kn: 'ವರನ ತಂದೆ-ತಾಯಿ' },
            members: [
                'Smt. Vandana & Shri Aravinda Pai',
            ],
        },
    ],
    grandparents: {
        en: 'With the blessings of our grandparents, in whose footsteps we walk.',
        kn: 'ನಮ್ಮ ಅಜ್ಜ-ಅಜ್ಜಿಯರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ, ಅವರ ಹೆಜ್ಜೆಯಲ್ಲಿ ನಡೆಯುತ್ತಾ.',
    },
}

/* --------------------------------- RSVP ---------------------------------- */
/* method: 'whatsapp'  → opens a pre-filled WhatsApp chat (no backend needed)
 *         'formspree' → POSTs JSON to a Formspree endpoint
 *         'endpoint'  → POSTs JSON to any URL (e.g. a Google Apps Script web app)
 */
export const rsvp = {
    method: 'whatsapp',
    whatsappNumber: '919876543210', // TODO: replace with the couple's number (country code + number, no +)
    endpoint: '', // e.g. 'https://formspree.io/f/xxxxxxx' or Apps Script URL
    deadline: { en: 'Kindly respond by 8 December 2026', kn: '8 ಡಿಸೆಂಬರ್ 2026 ರೊಳಗೆ ತಿಳಿಸಿ' },
    askGuests: true,
}

/* --------------------------------- MUSIC --------------------------------- */
/* Track downloaded from the couple's site to /public/audio/wedding-melody.mp3
 * Music NEVER autoplays — the guest must tap the toggle.                    */
export const music = {
    src: '/audio/wedding-melody.mp3',
    title: { en: 'Wedding melody', kn: 'ವಿವಾಹ ರಾಗ' },
    credit: 'Ramya & Ashish — wedding theme',
    volume: 0.5,
    loopPoints: null, // e.g. { start: 8, end: 96 } seconds, optional
}

/* -------------------------------- TRAVEL --------------------------------- */
export const travel = {
    title: { en: 'Getting there', kn: 'ತಲುಪುವ ಬಗೆ' },
    items: [
        { label: { en: 'Nearest Airport', kn: 'ಹತ್ತಿರದ ವಿಮಾನ ನಿಲ್ದಾಣ' }, value: { en: 'Mangaluru Intl (IXE) — approx. 95 km', kn: 'ಮಂಗಳೂರು ಅಂತಾರಾಷ್ಟ್ರೀಯ (IXE) — ಸುಮಾರು 95 ಕಿಮೀ' } },
        { label: { en: 'Nearest Railway', kn: 'ಹತ್ತಿರದ ರೈಲು ನಿಲ್ದಾಣ' }, value: { en: 'Byndoor (Mookambika Road) — approx. 12 km', kn: 'ಬೈಂದೂರು (ಮೂಕಾಂಬಿಕಾ ರೋಡ್) — ಸುಮಾರು 12 ಕಿಮೀ' } },
        { label: { en: 'Parking', kn: 'ಪಾರ್ಕಿಂಗ್' }, value: { en: 'Free parking at the Kalamandira grounds', kn: 'ಕಲಾಮಂದಿರ ಆವರಣದಲ್ಲಿ ಉಚಿತ ಪಾರ್ಕಿಂಗ್' } },
        { label: { en: 'Stay', kn: 'ವಸತಿ' }, value: { en: 'Lodges available in Baindoor town (mention the wedding)', kn: 'ಬೈಂದೂರು ಪಟ್ಟಣದಲ್ಲಿ ವಸತಿ ಲಭ್ಯ (ವಿವಾಹದ ಹೆಸರು ತಿಳಿಸಿ)' } },
    ],
}

/* ------------------------------- SAPTAPADI -------------------------------- */
/* The seven vows — used for the closing easter egg.                        */
export const saptapadi = [
    { n: 1, en: 'For nourishment and a healthy life', kn: 'ಪೋಷಣೆ ಮತ್ತು ಆರೋಗ್ಯಕರ ಜೀವನ' },
    { n: 2, en: 'For strength of body, mind and spirit', kn: 'ದೇಹ, ಮನಸ್ಸು, ಆತ್ಮದ ಬಲ' },
    { n: 3, en: 'For prosperity through honest effort', kn: 'ಪ್ರಾಮಾಣಿಕ ಶ್ರಮದಿಂದ ಸಮೃದ್ಧಿ' },
    { n: 4, en: 'For happiness and harmony in the family', kn: 'ಕುಟುಂಬದಲ್ಲಿ ಸುಖ ಮತ್ತು ಸಾಮರಸ್ಯ' },
    { n: 5, en: 'For noble children and their futures', kn: 'ಉತ್ತಮ ಮಕ್ಕಳು ಮತ್ತು ಅವರ ಭವಿಷ್ಯ' },
    { n: 6, en: 'For health through all seasons of life', kn: 'ಎಲ್ಲ ಋತುಗಳಲ್ಲಿ ಆರೋಗ್ಯ' },
    { n: 7, en: 'For lifelong friendship and loyalty', kn: 'ಆಜೀವ ಸ್ನೇಹ ಮತ್ತು ನಿಷ್ಠೆ' },
]

/* --------------------------------- i18n ---------------------------------- */
export const i18n = {
    languages: [
        { code: 'en', label: 'English', font: 'body' },
        { code: 'kn', label: 'ಕನ್ನಡ', font: 'kn' },
    ],
    strings: {
        en: {
            gate: {
                inviteLine: 'You are invited to the wedding of',
                dear: 'Dear',
                tap: 'Tap to open the invitation',
                hint: 'Best experienced with sound on',
                skip: 'Skip',
            },
            nav: { music: 'Music', theme: 'Theme', language: 'Language' },
            scroll: 'Scroll',
            couples: { title: 'Two Souls, One Journey', eyebrow: 'The Couple', bride: 'The Bride', groom: 'The Groom', loves: 'A few of her favourite things', lovesG: 'A few of his favourite things' },
            story: { eyebrow: 'Our Love Story', title: 'How we got here' },
            countdown: { eyebrow: 'The Countdown', title: 'Muhurtham in', days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds', married: 'Married!', marriedSub: 'Thank you for blessing us with your presence.', live: 'Happening now', todaySchedule: 'Today at the wedding' },
            events: { eyebrow: 'The Celebrations', title: 'Rituals & timings', meaning: 'What it means', map: 'View on Map', calendar: 'Add to Calendar', dress: 'Dress code', swipe: 'Swipe for more' },
            blessings: { eyebrow: 'Blessings', title: 'With the blessings of', grandparents: 'Our grandparents' },
            rsvp: {
                eyebrow: 'RSVP',
                title: 'Will you join us?',
                name: 'Your name',
                phone: 'Phone / WhatsApp',
                guests: 'Number of guests',
                events: 'Which events will you attend?',
                message: 'A wish for the couple',
                submit: 'Send my RSVP',
                sending: 'Sending…',
                success: 'Thank you! Your RSVP has been noted.',
                error: 'Something went wrong. Please try WhatsApp instead.',
                whatsapp: 'Send via WhatsApp',
            },
            travel: { eyebrow: 'Travel', title: 'Getting there' },
            closing: { line: 'See you at the mandap', sub: 'Your presence is our greatest blessing.', share: 'Share invitation', pdf: 'Download PDF', saptapadiEgg: 'You have walked all seven steps with us', replay: 'Replay' },
            common: { chapter: 'Chapter' },
        },
        kn: {
            gate: {
                inviteLine: 'ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ',
                dear: 'ಪ್ರಿಯ',
                tap: 'ಆಹ್ವಾನವನ್ನು ತೆರೆಯಲು ಸ್ಪರ್ಶಿಸಿ',
                hint: 'ಶಬ್ದದೊಂದಿಗೆ ಅನುಭವಿಸುವುದು ಉತ್ತಮ',
                skip: 'ಬಿಟ್ಟುಬಿಡಿ',
            },
            nav: { music: 'ಸಂಗೀತ', theme: 'ಥೀಮ್', language: 'ಭಾಷೆ' },
            scroll: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
            couples: { title: 'ಎರಡು ಆತ್ಮಗಳು, ಒಂದೇ ಪಯಣ', eyebrow: 'ವರ-ವಧು', bride: 'ವಧು', groom: 'ವರ', loves: 'ಅವಳ ಮೆಚ್ಚಿನ ಕೆಲವು ವಿಷಯಗಳು', lovesG: 'ಅವನ ಮೆಚ್ಚಿನ ಕೆಲವು ವಿಷಯಗಳು' },
            story: { eyebrow: 'ನಮ್ಮ ಪ್ರೇಮ ಕಥೆ', title: 'ನಾವು ಇಲ್ಲಿಯವರೆಗೆ ಬಂದದ್ದು' },
            countdown: { eyebrow: 'ಕೌಂಟ್‌ಡೌನ್', title: 'ಮುಹೂರ್ತಕ್ಕೆ', days: 'ದಿನಗಳು', hours: 'ಗಂಟೆಗಳು', minutes: 'ನಿಮಿಷಗಳು', seconds: 'ಸೆಕೆಂಡುಗಳು', married: 'ವಿವಾಹಿತರು!', marriedSub: 'ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯೇ ನಮ್ಮ ಭಾಗ್ಯ.', live: 'ಈಗ ನಡೆಯುತ್ತಿದೆ', todaySchedule: 'ಇಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು' },
            events: { eyebrow: 'ಸಮಾರಂಭಗಳು', title: 'ಆಚರಣೆಗಳು ಮತ್ತು ಸಮಯ', meaning: 'ಅರ್ಥ', map: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ', calendar: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ', dress: 'ಉಡುಪಿನ ಬಣ್ಣ', swipe: 'ಇನ್ನಷ್ಟು ನೋಡಲು ಸ್ವೈಪ್ ಮಾಡಿ' },
            blessings: { eyebrow: 'ಆಶೀರ್ವಾದ', title: 'ಇವರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ', grandparents: 'ನಮ್ಮ ಅಜ್ಜ-ಅಜ್ಜಿ' },
            rsvp: {
                eyebrow: 'ಆರ್‌ಎಸ್‌ವಿಪಿ',
                title: 'ನೀವು ನಮ್ಮೊಂದಿಗಿರುತ್ತೀರಾ?',
                name: 'ನಿಮ್ಮ ಹೆಸರು',
                phone: 'ಫೋನ್ / ವಾಟ್ಸ್ಆ್ಯಪ್',
                guests: 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ',
                events: 'ಯಾವ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಬರುತ್ತೀರಿ?',
                message: 'ದಂಪತಿಗಳಿಗೆ ಶುಭಾಶಯ',
                submit: 'ನನ್ನ ಆರ್‌ಎಸ್‌ವಿಪಿ ಕಳುಹಿಸಿ',
                sending: 'ಕಳುಹಿಸುತ್ತಿದೆ…',
                success: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ ದಾಖಲಾಗಿದೆ.',
                error: 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ವಾಟ್ಸ್ಆ್ಯಪ್ ಬಳಸಿ.',
                whatsapp: 'ವಾಟ್ಸ್ಆ್ಯಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ',
            },
            travel: { eyebrow: 'ಪ್ರಯಾಣ', title: 'ತಲುಪುವ ಬಗೆ' },
            closing: { line: 'ಮಂಟಪದಲ್ಲಿ ಸಿಗುತ್ತೇವೆ', sub: 'ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯೇ ನಮ್ಮ ದೊಡ್ಡ ಆಶೀರ್ವಾದ.', share: 'ಆಹ್ವಾನ ಹಂಚಿಕೊಳ್ಳಿ', pdf: 'PDF ಡೌನ್‌ಲೋಡ್', saptapadiEgg: 'ನೀವು ನಮ್ಮೊಂದಿಗೆ ಏಳು ಹೆಜ್ಜೆ ನಡೆದಿರಿ', replay: 'ಮತ್ತೆ ನೋಡಿ' },
            common: { chapter: 'ಅಧ್ಯಾಯ' },
        },
    },
}

/* --------------------------- REGIONAL PRESETS ----------------------------- */
/* Swap `activeRegion` (or merge a preset into the arrays above) to localise
 * ritual names for other communities. Components never need editing.       */
export const regions = {
    karnataka: {
        label: 'Karnataka',
        greeting: { en: 'Shree Ganeshaya Namaha', kn: 'ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ' },
        rituals: { wedding: 'Muhurtham', pre: 'Phool Muddi', blessing: 'Ganapathi Puja' },
        font: 'Noto Serif Kannada',
    },
    northIndia: {
        label: 'North India',
        greeting: { en: 'Om Shree Ganeshaya Namaha', kn: 'ॐ श्री गणेशाय नमः' },
        rituals: { wedding: 'Phera', pre: 'Haldi', blessing: 'Ganapathi Puja', baraat: 'Baraat' },
        font: 'Noto Serif Devanagari',
    },
    tamilNadu: {
        label: 'Tamil Nadu',
        greeting: { en: 'Om Ganeshaya Namaha', kn: 'ஓம் கணேசாய நமஹ' },
        rituals: { wedding: 'Muhurtham', pre: 'Nichayathartham', blessing: 'Ganapathi Puja' },
        font: 'Noto Serif Tamil',
    },
    telangana: {
        label: 'Telangana',
        greeting: { en: 'Om Ganeshaya Namaha', kn: 'ఓం గణేశాయ నమః' },
        rituals: { wedding: 'Muhurtham', pre: 'Pellikuthuru', blessing: 'Ganapathi Puja' },
        font: 'Noto Serif Telugu',
    },
    maharashtra: {
        label: 'Maharashtra',
        greeting: { en: 'Om Ganeshaya Namaha', kn: 'ॐ गणेशाय नमः' },
        rituals: { wedding: 'Vivah', pre: 'Haldi', blessing: 'Ganapati Puja', sakharpuda: 'Sakharpuda' },
        font: 'Noto Serif Devanagari',
    },
    bengal: {
        label: 'Bengal',
        greeting: { en: 'Om Ganeshaya Namaha', kn: 'ওঁ গণেশায় নমঃ' },
        rituals: { wedding: 'Bibaho', pre: 'Gaye Holud', blessing: 'Ganesh Puja' },
        font: 'Noto Serif Bengali',
    },
    gujarat: {
        label: 'Gujarat',
        greeting: { en: 'Om Ganeshaya Namaha', kn: 'ૐ ગણેશાય નમઃ' },
        rituals: { wedding: 'Vivah', pre: 'Haldi', blessing: 'Ganesh Puja', garba: 'Garba' },
        font: 'Noto Serif Gujarati',
    },
}
export const activeRegion = 'karnataka'

/* ------------------------------- EXPORT ---------------------------------- */
const config = {
    meta,
    themes,
    activeTheme,
    deity,
    couple,
    wedding,
    events,
    story,
    blessings,
    rsvp,
    music,
    travel,
    saptapadi,
    i18n,
    regions,
    activeRegion,
}
export default config