# Imteaz Hossain — 3D Portfolio

A responsive, cyberpunk-2066 portfolio built from the information in Imteaz Hossain’s CV. The experience balances an immersive WebGL hero with readable, semantic content and a professional case-study presentation.

## Experience highlights

- Procedural Three.js neural core with orbit systems, particles, bloom, and pointer response
- Premium local variable fonts: Space Grotesk + Inter
- GSAP scroll reveals and Lenis smooth scrolling
- Interactive project case-file switcher for **AlpaGenAI** and **Fire Discharge System**
- Responsive layouts for desktop, tablet, and mobile
- Downloadable original CV
- Working email composer using `mailto:` (no backend required)
- Motion accessibility via `prefers-reduced-motion` and a visible desktop **FX ON/OFF** control
- Semantic sections, keyboard-accessible controls, focusable navigation, and skip link

## Stack

- React + Vite
- Three.js / React Three Fiber / Drei
- React Three Postprocessing
- GSAP + ScrollTrigger
- Lenis
- Lucide icons
- Fontsource variable fonts

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deploy

For Netlify, Vercel, or another static host:

- Build command: `npm run build`
- Publish directory: `dist`

## Content and privacy

The public site uses professional and academic details from the supplied CV. Highly sensitive personal information—such as NID, blood group, date of birth, parents’ names, and full permanent-address details—was intentionally excluded.

## Main files

- `src/App.jsx` — content, sections, interactions, and motion setup
- `src/components/CyberScene.jsx` — WebGL scene
- `src/components/ProjectLab.jsx` — interactive project case files
- `src/styles.css` — full visual and responsive system
- `public/imteaz-hossain.jpeg` — CV portrait
- `public/Imteaz-Hossain-CV.pdf` — downloadable CV
