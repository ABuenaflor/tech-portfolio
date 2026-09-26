# Tech Portfolio: Developer × Photographer

React + Vite + Framer Motion. One app, two sides: **Web Development** (`/`) and **Photography** (`/photography`), plus **Let's Talk Business** (`/contact`).

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

## Where to put your content

Everything is in `src/data/`, so you never need to touch components to update content.

| File | What it controls |
| --- | --- |
| `src/data/profile.js` | Name (top-left), bios, portraits, stats, skills, email, phone, address, social links |
| `src/data/projects.js` | Dev projects (image left, overview right) |
| `src/data/photos.js` | Gallery tiles + modal captions, settings, dates |

**Images:** put files in `public/images/…` and reference them from the root, e.g. `portrait: '/images/me.jpg'`.
An empty string shows a styled placeholder. The gallery currently uses temporary `picsum.photos` stock images.

Recommended sizes: portrait 4:5 (≥1200px tall), project screenshots 16:10 (≥1600px wide), gallery photos ≥1080px on the short side. Compress to WebP/JPEG before adding.

## Contact form

The form currently opens the visitor's email app with the message pre-filled (`mailto:`).
To receive submissions directly, swap `submit()` in `src/pages/ContactPage.jsx` for Formspree, EmailJS, or a Vercel serverless function.

## Deploy to Vercel

**Option A: GitHub (recommended, auto-deploys on every push)**
1. Push this folder to a GitHub repo.
2. On vercel.com → *Add New Project* → import the repo.
3. Vercel detects Vite automatically (build `npm run build`, output `dist`). Click **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production
```

`vercel.json` rewrites all routes to `index.html` so `/photography` and `/contact` work on refresh.

## Structure

```
src/
  App.jsx              routes, page transitions, per-side theme
  components/          Navbar, Footer, Hero, SkillsMarquee, ProjectCard,
                       PhotoGrid, PhotoModal, BackToTop, PageTransition, Media, Icons
  pages/               DevPage, PhotoPage, ContactPage
  data/                ← your content
  styles/global.css    design tokens (colors/fonts per theme) + all styles
```

Theme colors live at the top of `global.css` (`[data-theme='dev']` and `[data-theme='photo']`).
