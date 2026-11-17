# Birthday Surprise Website

React + Vite + TypeScript + Tailwind CSS + GSAP + canvas-confetti.

## Run locally
```bash
npm install
npm run dev        # open the URL it prints (usually http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # preview the production build
```
Requires Node 18+.

## Personalise
- Edit **`src/config.ts`**: name, letter, gift message, final text, candle count, photo captions, music path.
- Put photos in **`public/images/`** named `memory-01.jpg`, `memory-02.jpg`, ... (placeholders show until they exist).
- Put your music in **`public/audio/birthday-music.mp3`** (a soft built-in melody plays if missing). Use music you have the rights to.

## Deploy to Vercel
**Dashboard:** push this folder to GitHub, then Vercel > Add New > Project > import the repo. Vercel detects Vite
(Build: `npm run build`, Output: `dist`). Click Deploy.

**CLI:** `npm i -g vercel` then `vercel` inside this folder.

## Structure
```
src/
  config.ts            all editable content
  pages/Home.tsx       page composition
  components/          Curtain, Hero, Cake, Letter, Gallery, Lightbox, Gift, Final, Music, Decorations
  hooks/useMusic.ts    audio + fallback melody
  lib/fx.ts            confetti helpers
public/images|audio|decorations
```
