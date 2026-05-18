# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

**Next.js 14 App Router + TypeScript.** No Tailwind — all styling uses CSS Variables defined in `src/app/globals.css` with inline styles in components.

### Routing

| Route | Page file |
|---|---|
| `/` | `src/app/page.tsx` |
| `/servicii` | `src/app/servicii/page.tsx` |
| `/portofoliu` | `src/app/portofoliu/page.tsx` |
| `/despre-noi` | `src/app/despre-noi/page.tsx` |
| `/before-after` | `src/app/before-after/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |

### Global Layout (`src/app/layout.tsx`)

Every page is wrapped with: `Nav` + `Footer` + `WAWidget` (WhatsApp floating button) + `MobileBar` (sticky bottom bar). Fonts are loaded via `next/font/google`: **Bebas Neue** (`--font-bebas-neue`) for display/headings and **DM Sans** (`--font-dm-sans`) for UI/body.

### Styling Conventions

CSS Variables are the single source of truth. Key tokens:
- Backgrounds: `--bg-void` (#0C0C0C), `--bg-surface` (#141414), `--bg-elevated` (#1E1E1E), `--bg-border` (#2A2A2A)
- Accent: `--accent` (#F97316), `--accent-deep` (#EA580C), `--accent-glow`
- Text: `--text-primary`, `--text-secondary` (#9CA3AF), `--text-tertiary` (#6B7280)
- Radius: `--r-sm/md/lg/xl/2xl`
- Transitions: `--ease-out`, `--t-fast/normal/slow`
- Fonts: `--font-display` (Bebas Neue), `--font-ui` (DM Sans)

Animations (`fadeUp`, `fadeIn`, `pulse-ring`, `shimmer`) are defined in `globals.css` and applied via inline `animation` style props.

### Shared Utilities

- `src/hooks/useInView.ts` — IntersectionObserver hook, returns `[ref, inView]`. Used to trigger `fadeUp` animations when sections enter the viewport.
- `src/hooks/useCounter.ts` — animated number counter hook for stat displays.
- `src/lib/seo.ts` — exports `defaultSEO` (used in root layout) and `pageSEO` object with per-route metadata. Base URL: `https://printpeperete.com`.
- `src/components/StructuredData.tsx` — `LocalBusinessSchema` JSON-LD injected in `<head>`.

### Data Layer (`src/lib/data/`)

Static data only, no API calls:
- `services.ts` — `SERVICES`, `PROCESS_STEPS`, `LASER_CATEGORIES`, `LASER_MATERIALS`
- `projects.ts` — portfolio project entries
- `beforeAfter.ts` — before/after image pairs for the slider

### Component Organization

```
src/components/
  layout/     # Nav, Footer, WAWidget, MobileBar (always rendered)
  ui/         # Reusable: SectionHeader, FinalCTA, GrainOverlay
  home/       # Hero, StatsBar, Services, WallPrintSpotlight, LaserSection, Process, BeforeAfterPreview
  servicii/   # ServiciiHero, ServiciiGrid, ServiceCard, ServiciiMainServices, ProcessSteps, MaterialeSection, PriceCalculator
  portofoliu/ # PortofoliuHero, MasonryGrid, ProjectCard, ProjectModal, FilterBar, PortofoliuCTA
  before-after/ # BeforeAfterHero, MegaSlider, SliderResults
  despre-noi/ # DespreHero, Story, Differentiators, Equipment, ComparisonTable, Coverage
  contact/    # ContactHero, ContactForm, ContactInfo, Schedule, AreaCoverage
```

All interactive components use `"use client"` directive. Page files themselves are server components that compose client components.

### Reference Files

The `_reference/` folder contains the original design artifacts (JSX reference files, design system prompt, global config) the Next.js implementation was built from. Consult them for design intent when modifying components.
