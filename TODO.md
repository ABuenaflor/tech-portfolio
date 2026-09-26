# To Implement

## 1. Tone down the flashy effects (keep the page transition)

Keep the curtain transition between Web Development and Photography exactly as it is ([PageTransition.jsx](src/components/PageTransition.jsx)).

Tone down or remove:

- [x] Hero headline: replace the word-by-word slide-up with a single soft fade-in ([Hero.jsx](src/components/Hero.jsx))
- [x] Hero portrait: drop the clip-path "iris" reveal and zoom; use a simple fade
- [x] Hero parallax: remove the image/text drifting on scroll
- [x] "Available for work" badge: remove the pop/rotate entrance and the pulsing dot
- [x] Background glow behind the hero and the film-grain overlay ([global.css](src/styles/global.css))
- [x] Project cards: replace the side-wipe and inner parallax with a short fade-up ([ProjectCard.jsx](src/components/ProjectCard.jsx))
- [x] "See more talents" button: drop the gradient fill sweep and rotating arrow; keep a subtle hover
- [x] Gallery tiles: smaller hover zoom, fewer staggered delays ([PhotoGrid.jsx](src/components/PhotoGrid.jsx))
- [x] Scroll progress bar at the top: removed

## 2. Back to top button on the Web Development page

- [x] Add the existing `BackToTop` component at the bottom of [DevPage.jsx](src/pages/DevPage.jsx), below "See more talents", matching the Photography page

## 3. Replace the scrolling skills strips with a static, sectioned layout

Applies to "Tech I work with" (dev) and "Craft & tools" (photography).

- [x] Remove the horizontal marquee ([SkillsMarquee.jsx](src/components/SkillsMarquee.jsx) and its CSS)
- [x] Group skills into labeled categories in [profile.js](src/data/profile.js), e.g.
  - Dev: Frontend · Backend · Tools & Workflow
  - Photography: Genres · Techniques · Software
- [x] Display each category as its own column with a heading and a divider line between columns, stacking into rows on mobile
- [x] Keep one quiet fade-in for the block (no looping motion)

## 4. Photography gallery: write the real photo details

The 10 tiles now show your own photos (web-sized copies in `public/images/photos/web/`), but every photo still has placeholder text from the template.

- [x] In [photos.js](src/data/photos.js), update each photo's `title`, `caption`, `category`, `location`, `date`, and `settings` to match the actual shot
  - `date`, `settings`, and a new `camera` field (body + lens) come from each photo's EXIF data
  - `category` set from what's in each frame: Street, Events, Portrait, Sports
  - Titles and captions are drafts describing what's visible in each photo
- [x] Move the full-size originals (~63 MB) out of `public/` into `originals/photos/` (git- and Vercel-ignored)
- [x] Same for `me_photo.png` (11.7 MB), now in `originals/`
- [ ] Review the drafted titles and captions and rewrite any in your own voice (the story behind the shot, the event name)
- [x] Photos 11–13: date, camera (Canon EOS R50 · EF 50mm), and f/2.8 added; ISO estimated from the lighting (11: 800, 12: 1000, 13: 3200)
- [ ] Photos 11–13: add the shutter speed to `settings` if you know it (e.g. `50mm · f/2.8 · 1/200s · ISO 800`)
- [ ] Add `location` for each photo (no GPS in the files, so they're empty; the location line stays hidden until filled)

When adding new photos later: put the original in `originals/photos/`, then ask for a web-sized copy in `public/images/photos/` (or export at ~2000px long side, under ~500 KB yourself).
