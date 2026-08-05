# Keren Schoss Portfolio

Professional portfolio website for **Keren Schoss**, Frontend & Full-Stack Developer.

The site demonstrates production frontend engineering, accessible interaction design, typed content, and deterministic project simulations — without inventing employers, metrics, links, or media.

## Technology stack

- **Next.js 16** App Router
- **React 19** with Server Components by default
- **TypeScript** (`strict` + `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** + CSS custom properties (`src/styles/tokens.css`)
- **next/font** — Geist, Source Serif 4, Geist Mono
- **Lucide** icons
- **Vitest** + Testing Library
- **Playwright** + **@axe-core/playwright**
- ESLint + Prettier

Intentionally not included: CMS, database, auth, global state library, analytics, UI component libraries.

**Motion:** CSS for simple transitions; **Motion for React** (`motion` v12) for springs, shared layout, and coordinated choreography inside focused Client Components. See `docs/signature-animation-plan.md`.

## Architecture

```text
src/
  app/                 # Routes, metadata, sitemap, robots, icons, OG images
  components/
    layout/            # Shell, header, footer, skip link
    navigation/        # Mobile nav
    command-menu/      # Cmd/Ctrl+K
    home/              # Homepage sections
    work/              # Work index + filters
    case-study/        # Case-study primitives + visuals
    demos/             # Route-local interactive simulations
    seo/               # JSON-LD helper
    ui/                # Design-system primitives
    motion/            # Signature motion architecture (LazyMotion provider, previews, VT links)
  data/                # Typed verified content + null link placeholders
  hooks/               # Reduced-motion, fine-pointer, in-view, pointer, visibility
  lib/                 # Links, metadata, motion, animation-config, structured data, contrast
  styles/              # Tokens + globals
```

- Static content stays in Server Components.
- Client Components are limited to theme, navigation overlays, filters, reveals, hero pointer enhancement, signature motion islands, and demos.
- Heavy demos load only on matching `/work/[slug]` routes via `next/dynamic`.
- Playwright e2e uses `npm run start` on port **3010** (avoids colliding with `next dev` on 3000). Run `npm run build` first when the server is not already up.

## Routes

| Route              | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `/`                | Homepage                                     |
| `/work`            | Work index + professional experience section |
| `/work/[slug]`     | Project case studies                         |
| `/about`           | About + portrait (concise)                   |
| `/contact`         | Contact (configured methods only)            |
| Custom `not-found` | Accessible 404                               |
| `/design-system`   | **Development only** — 404 in production     |

## Content editing

Central configuration lives in `src/data/`:

- `portfolio.ts` — name, title, positioning, about
- `capabilities.ts` — homepage capability groups (short)
- `projects.ts` — verified projects (keep URLs `null` until real)
- `experience.ts` — Abra / EL AL professional work (proprietary)
- `skills.ts` — full skill vocabulary for case-study tech grouping
- `links.ts` — GitHub, LinkedIn, email, CV, site URL
- `missing-content.ts` — unresolved checklist

Rules:

- Missing URLs must remain `null`
- Never use `#`, `example.com`, or `[PLACEHOLDER]` text as public actions
- Do not invent metrics, employers, screenshots, or medical claims
- Clinical safety language is mandatory for the Clinical Follow-Up Detector

## Adding a project

1. Add a typed entry in `src/data/projects.ts` using existing discriminated unions.
2. Add a slug to `ProjectSlug` in `src/data/content-types.ts` if needed.
3. Add an abstract visual under `src/components/case-study/visuals/` if featured.
4. Optionally add a demo under `src/components/demos/` and register it in `demo-projects.ts`.
5. Keep `repositoryUrl` / `liveUrl` as `null` until real URLs exist.
6. Update tests that enumerate public slugs.

## Replacing media

- Place project assets under `public/projects/<slug>/`
- Prefer `next/image` with explicit dimensions when real media is added
- Do not fabricate screenshots, stock headshots, EL AL UI replicas, or copyrighted game art
- Abstract HTML/CSS/SVG previews are intentional until real assets exist

### About portrait

| Asset               | Path                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| Original photograph | `public/about/keren-schoss-original.jpg` (also retained as `public/keren-schoss-original.jpeg`) |
| Transparent cutout  | `public/about/keren-schoss-cutout.webp` (PNG twin: `public/about/keren-schoss-cutout.png`)      |

Background removal was performed locally as a one-time development step. The site loads the processed asset only — no external rembg runtime service. Edge-refinement notes: `public/about/CUTOUT-NOTES.md`.

## Configuring links

Edit `src/data/links.ts`:

```ts
export const externalLinks = {
  githubUrl: "https://github.com/kerenschoss369",
  linkedinUrl: "https://www.linkedin.com/in/kerenschoss/",
  email: "kerenschoss369@gmail.com",
  cvPath: "/cv/keren-schoss-cv.pdf",
  siteUrl: null, // required for absolute canonicals, sitemap host, and OG absolute URLs
} as const;
```

Per-project `repositoryUrl` / `liveUrl` live on each project object.

`siteUrl` behavior:

- `null` → no canonical, no `metadataBase`, path-only sitemap entries, no invented domain
- configured HTTPS URL → absolute canonicals, Open Graph URLs, robots sitemap host

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Design-system preview (dev only): [http://localhost:3000/design-system](http://localhost:3000/design-system).

## Formatting, linting, and type checking

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
```

## Tests

```bash
npm run test          # Vitest unit/integration
npm run test:e2e      # Playwright (Chromium)
npm run test:a11y     # Axe-focused Playwright suite
```

Coverage includes navigation, command menu, filters, demos, reduced motion, missing-link safety, metadata/canonical behavior, sitemap/robots, structured data, and axe checks on major routes and open overlays.

## Production build

```bash
npm run build
npm start
```

### Bundle / performance budgets

Observed strategy (not invented Lighthouse scores):

| Budget               | Target                                                                        |
| -------------------- | ----------------------------------------------------------------------------- |
| Shared client JS     | Keep minimal — theme, header/overlays, filters, sticky stack, reveal enhancer |
| Demo code            | Route-local async chunks; homepage must not load demo implementations         |
| Third-party runtime  | `motion` only (no analytics, no trackers, no second animation library)        |
| Layout shift         | Reserve demo/loading/mockup dimensions; no late-injected hero media           |
| Motion               | CSS-first for simple UI; Motion for React for springs/layout/sticky scale     |
| Shared client growth | LazyMotion + route-local demos; sticky stack is homepage Client island only   |
| Fonts                | `next/font` with `display: "swap"`; latin subsets only                        |
| Media                | Optimized portrait cutout; no autoplay audio; no fabricated screenshots       |

Inspect client chunks after `npm run build` (Next.js route/chunk summary). Do not add a permanent heavy analyzer unless it provides ongoing value.

### Core Web Vitals risk notes (lab expectations, not field claims)

- **LCP:** Primary hero text is server-rendered immediately; route-enter motion does not hide content with opacity.
- **CLS:** Demo loading fallbacks reserve height; sticky header does not insert layout above content.
- **INP:** Command search and filters are in-memory; TapTap uses rAF with visibility pause; terminal responses are deterministic/local.

## Deployment prerequisites

Required:

- Node.js **20+** (scaffolded/validated on Node 24)
- `npm install`
- `npm run build`
- Configure `externalLinks.siteUrl` before expecting absolute canonicals / sitemap host
- Configure domain DNS separately — do not invent a domain in code
- Social OG image routes live at `/og` and `/og/work/[slug]`; absolute `og:image` meta is emitted only when `siteUrl` is set (avoids localhost absolutes)

Post-deployment checks:

- `/`, `/work`, one case study, `/about`, `/contact`, 404
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon`
- Light/dark theme, reduced motion, keyboard skip link
- Confirm no public actions for still-null links

Hosting platform is not selected in-repo yet. Add platform config only when the target is chosen.

## Accessibility decisions

- Target: **WCAG 2.2 AA**
- Semantic landmarks, one meaningful `h1` per page, skip link to focusable `#main-content`
- Overlay dialogs (mobile nav, command menu): focus trap, Escape, restore, scroll lock, and inert background landmarks
- Status via text + color (never color alone)
- Live regions announce meaningful changes only (TapTap does not announce per-frame ms)
- AcademEase keeps English chrome under `lang="en"`; localized schedule/materials use `lang` + `dir`
- External HTTP links disclose “opens in a new tab” to assistive technology
- Project conceptual previews are not `aria-hidden` by default when they contain meaningful text
- Automated axe checks via `@axe-core/playwright` (does not replace keyboard review)
- Contrast pairs unit-tested in `src/lib/contrast.test.ts`

## Reduced-motion strategy

- Duration tokens collapse under `prefers-reduced-motion: reduce`
- Route enter, reveals, parallax, sticky card scaling, and theme color transitions simplify or disable
- Featured project sticky stack falls back to a normal stacked layout
- TapTap switches to intentional step mode
- Essential content never depends on animation completion

## Performance strategy

- Server Components by default
- Dynamic demo imports with project-specific loading fallbacks and error boundaries
- Motion for React in focused Client islands only (LazyMotion); CSS for simple UI state
- Passive listeners / IntersectionObservers / rAF cleaned up on unmount
- Theme boot script prevents incorrect theme flash without external requests

## Visual redesign

See `docs/visual-redesign-plan.md` for the copy-reduction audit and MotionSites-inspired presentation plan.

Homepage focuses on a minimal hero, sticky featured project cards with device mockups, a compact experience strip, about preview with portrait, capability groups (not skill walls), and a short contact CTA.

## Security and privacy constraints

- No API keys, `.env` secrets, analytics, or trackers
- No real medical or student data
- No internal EL AL URLs, tickets, or proprietary screenshots
- `dangerouslySetInnerHTML` only for the static theme boot script and JSON-LD serialization of trusted content
- Terminal/demo HTML is never built from unsanitized user input
- Contact has no fake form submission backend

## Clinical safety constraints

The Clinical Follow-Up Detector is a **demonstration only**:

- Not clinically validated
- Not for medical decision-making
- Not for real patient data
- Not HIPAA compliant
- Human review required; AI output is never auto-confirmed
- Portfolio simulation uses fictional static data only — no arbitrary medical input, no OpenAI calls

Structured data must not imply medical-device status or healthcare-service availability.

## Proprietary-work constraints

Abra / EL AL work is described at a high level only:

- Not a public repository case study
- No source code, internal URLs, tickets, or UI replicas
- Never marked as open-source `SoftwareSourceCode` with a fake repository

## Missing-content checklist

Unresolved items (also tracked in `src/data/missing-content.ts`):

- [x] Email
- [x] GitHub
- [x] LinkedIn
- [x] CV
- [ ] `siteUrl` / custom domain
- [ ] Public repository links (Clinical, Realtime GPT CLI, TapTap set; AcademEase still pending)
- [ ] Live demo links
- [ ] Project screenshots
- [ ] Optional profile photograph
- [ ] Confirm employment dates (education dates resolved from CV)
- [ ] Confirm repository visibility / ownership (including Clinical and Go repositories)
- [ ] Hosting platform selection
- [ ] Production deployment

Do not mark remaining items complete until real values are supplied. Null placeholders must remain hidden in the UI.

See `docs/` for the product specification, content decisions, design system, and phased implementation plan.
