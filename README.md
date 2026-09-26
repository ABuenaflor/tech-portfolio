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

The form on `/contact` posts to a Vercel serverless function ([api/contact.js](api/contact.js)), which emails the request to you through Gmail. The visitor is set as Reply-To, so you can answer straight from your inbox.

Set these in **Vercel → Project → Settings → Environment Variables** (Production), then redeploy:

| Variable | Value |
| --- | --- |
| `GMAIL_USER` | your Gmail address |
| `GMAIL_APP_PASSWORD` | a Gmail App Password: Google Account → Security → 2-Step Verification (must be on) → App passwords |
| `CONTACT_TO` | optional, deliver to a different address |

Service options and length limits live in [src/data/contact.js](src/data/contact.js) (shared by the form and the function). Spam protection: hidden honeypot field, a minimum fill time, and a per-IP rate limit.

`npm run dev` doesn't run the `/api` function; use `npx vercel dev` to test the form locally.

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
