/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens -> CSS variables, so themes swap without code edits.
        deep: 'rgb(var(--c-deep) / <alpha-value>)',
        wine: 'rgb(var(--c-wine) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        marigold: 'rgb(var(--c-marigold) / <alpha-value>)',
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        play: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        body: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
        kannada: ['"Noto Serif Kannada"', 'serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 32px rgb(var(--c-gold) / 0.35)',
        'glow-lg': '0 0 70px rgb(var(--c-marigold) / 0.45)',
        inner: 'inset 0 0 60px rgb(var(--c-deep) / 0.45)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        flicker: {
          '0%,100%': { transform: 'scale(1) translateY(0)', opacity: '0.95' },
          '25%': { transform: 'scale(1.06,0.96) translateY(-1px)', opacity: '1' },
          '50%': { transform: 'scale(0.96,1.05) translateY(0)', opacity: '0.88' },
          '75%': { transform: 'scale(1.03,0.99) translateY(-0.5px)', opacity: '1' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        flicker: 'flicker 2.6s ease-in-out infinite',
        'spin-slow': 'spinSlow 90s linear infinite',
        'spin-slower': 'spinSlow 180s linear infinite reverse',
        'float-y': 'floatY 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
