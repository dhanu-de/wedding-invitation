import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static export friendly: no server runtime required.
// Deploy `dist/` to Cloudflare Pages / Netlify / Vercel as-is.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
})
