# CLAUDE.md - Project Context for Claude Code

## Project Overview
Personal portfolio website for Antje Worring - founder, designer, and creative director based in San Francisco.

## Tech Stack
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4 + CSS variables + inline styles (no styled-jsx)
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Deployment**: Vercel (via GitHub)

## Key Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Project Structure
```
src/
├── app/
│   ├── page.tsx          # Main landing page with all sections
│   ├── about/page.tsx    # About page
│   ├── contact/page.tsx  # Contact page
│   ├── press/page.tsx    # Press/media page
│   ├── work/page.tsx     # Portfolio with filtering
│   └── globals.css       # All global styles (responsive included)
├── components/
│   ├── Navigation.tsx    # Fixed nav with scroll behavior
│   ├── Footer.tsx        # Footer with Cal.com booking modal
│   ├── Services.tsx      # Services carousel
│   ├── AnimalCard.tsx    # Flippable trading cards with video
│   ├── LazyYouTube.tsx   # Lazy-loaded YouTube embeds
│   ├── LazyVideo.tsx     # Lazy-loaded video grid
│   └── LogoGrid.tsx      # Press logos grid
├── data/
│   └── projects.ts       # Portfolio project data
└── hooks/
    └── useIntersectionObserver.ts
```

## Design System
- **Fonts**: Hippie Vintage (display), Blauer Neue (body)
- **Colors**:
  - Pink: `#FFE8FB` (background)
  - Orange: `#e85d04` (accent)
  - Green: `#3d5a3d` (sections)
  - Cream: `#fef6f0` (alternate sections)

## Important Patterns

### No styled-jsx
All responsive styles go in `globals.css` - styled-jsx causes runtime errors with React 19.

### Lazy Loading
- YouTube embeds use `LazyYouTube` component with IntersectionObserver
- Videos load only when visible (200px rootMargin)

### Navigation Behavior
- Shows after 100px scroll on home page
- Always visible on inner pages (`/about`, `/contact`, `/press`, `/work`)

### Image Assets
- Hero image: `/images/me.png`
- Title: `/assets/antje-worring-title.png`
- Karma gallery: `/assets/karma-{1-15}.jpg`
- Trading card videos: `/assets/card-videos/`

## Key Sections (page.tsx)
1. Hero - Animated entrance with parallax
2. Karma Bikinis - Fashion brand story + gallery
3. Impact Focused - Conservation funding mission
4. Zoo Labs - 501(c)(3) non-profit, AI safety, Zoo DAO
5. Trading Cards - Horizontal scroll, flippable video cards
6. Services - Carousel of creative/AI services
7. Footer - Cal.com booking integration

## External Links
- Instagram: @antje_worring
- GitHub: @zooqueen
- Dribbble: @antjekarina
- Zoo Labs: zoolabs.io

## Git Workflow
- Main branch: `main`
- Always push to GitHub after changes
- Vercel auto-deploys from main

## Common Issues & Fixes
- **styled-jsx errors**: Move styles to globals.css
- **Webpack cache errors**: `rm -rf .next && npm run build`
- **Port in use**: Dev server will auto-select next available port
