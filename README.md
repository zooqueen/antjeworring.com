# AntjeWorring.com

Personal portfolio of **Antje Worring** - Founder, designer, and creative director based in San Francisco.

## About

This website showcases my work at the intersection of fashion, technology, and conservation. As founder of Karma Bikinis, Director of Zoo Labs Foundation (501(c)(3)), and co-founder at LUX Network, I bridge the worlds of sustainable fashion, AI innovation, and wildlife protection.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + CSS Variables
- **Animations**: Framer Motion
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── about/            # About page
│   ├── work/             # Portfolio with filtering
│   ├── contact/          # Contact page
│   ├── press/            # Press/media page
│   └── globals.css       # Global styles
├── components/
│   ├── Navigation.tsx    # Fixed nav with scroll behavior
│   ├── Footer.tsx        # Footer with Cal.com booking
│   ├── Services.tsx      # Services carousel
│   ├── AnimalCard.tsx    # Flippable video trading cards
│   ├── LazyYouTube.tsx   # Lazy-loaded YouTube embeds
│   └── LogoGrid.tsx      # Press logos
├── data/
│   └── projects.ts       # Portfolio data
└── hooks/
    └── useIntersectionObserver.ts
```

## Features

- Smooth Framer Motion animations
- Lazy-loaded videos and YouTube embeds
- Flippable trading cards with video
- Cal.com booking integration
- Responsive design
- SEO optimized

## Key Sections

1. **Hero** - Animated entrance with parallax effects
2. **Karma Bikinis** - Sustainable fashion brand
3. **Zoo Labs** - 501(c)(3) AI safety & conservation non-profit
4. **Trading Cards** - Interactive animal card collection
5. **Services** - Creative and AI services carousel

## Connect

- **Website**: [antjeworring.com](https://antjeworring.com)
- **Instagram**: [@antje_worring](https://instagram.com/antje_worring)
- **GitHub**: [@zooqueen](https://github.com/zooqueen)
- **Dribbble**: [@antjekarina](https://dribbble.com/antjekarina)
- **Zoo Labs**: [zoolabs.io](https://zoolabs.io)

## License

© 2025 Antje Worring. All rights reserved.
