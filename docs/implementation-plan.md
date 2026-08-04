# Implementation Plan

> Updated by the lead architect after inspecting the repository (Phase 0).

## 1. Repository assessment

### Existing framework

- **Before Phase 0:** no application code. Repository contained only `docs/` (portfolio build pack).
- **After Phase 0 scaffolding:** **Next.js 16.3.0** (App Router) with **React 19.2.8** and **TypeScript** (`strict: true`, plus `noUncheckedIndexedAccess`).

### Existing package manager

- **npm** (`package-lock.json`). Node `v24.11.1`, npm `11.6.2` observed at scaffolding time.
- `create-next-app` also initialized a local git repository.

### Existing styling system

- **Tailwind CSS v4** via `@tailwindcss/postcss`.
- Design tokens in `src/styles/tokens.css` (light/dark `data-theme`, typography, spacing, grid, motion, focus, z-index).
- Global base styles and Tailwind `@theme inline` bridges in `src/styles/globals.css`.
- Foundational UI primitives in `src/components/ui/`; development preview at `/design-system`.
- Final page compositions remain owned by later phases.

### Existing test setup

- **Vitest** + Testing Library + jsdom for unit tests.
- **Playwright** configured for critical smoke checks (`e2e/`).
- Foundation includes a unit test for missing-link behavior and Playwright smoke coverage for homepage + one case-study route.

### Existing deployment target

- **Not configured.** No hosting platform, domain, or CI deployment workflow present.
- Next.js default assumes a Node or Vercel-compatible host; decision deferred until a real target is chosen.

### Conflicts with `portfolio-spec.md`

| Area                         | Spec expectation                      | Repository reality                           | Resolution                                                               |
| ---------------------------- | ------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Application codebase         | Preferred Next.js App Router stack    | Docs-only before Phase 0                     | Scaffolded Next.js App Router foundation                                 |
| Content completeness         | Full case studies, demos, media       | Verified facts only in docs; no media assets | Typed placeholders; null links; no invented narrative or fake URLs       |
| Design system                | Full editorial visual system          | No prior tokens/components                   | Minimal theme roles only; Phase 1 owns design system                     |
| Motion / Motion for React    | Purposeful motion library when needed | Not installed                                | Deferred; CSS reduced-motion base only                                   |
| External links / CV / domain | Configurable real values              | All null                                     | Central `externalLinks`; actions hidden when null                        |
| Deployment                   | Production portfolio                  | No host/domain                               | Left open in risk/open-questions                                         |
| Folder naming                | Suggested `src/` architecture         | Matches after scaffolding                    | Adopted suggested layout with small adaptations (`styles/` under `src/`) |

No conflict required abandoning the preferred stack: greenfield docs-only repo → Next.js App Router is the simplest compliant foundation.

---

## 2. Proposed architecture

### Selected stack

- Next.js App Router + React Server Components by default
- TypeScript strict mode
- Tailwind CSS v4 for utilities + CSS custom properties for theme roles
- Custom CSS for theme/base (advanced visuals later)
- Lucide React for lightweight icons
- Vitest / Testing Library / Playwright
- Prettier + ESLint (next + prettier)

Intentionally **not** added: UI component library, CMS, database, auth, global state library, Motion for React.

### Route plan

| Route          | Purpose                                | Status  |
| -------------- | -------------------------------------- | ------- |
| `/`            | Homepage (full Phase 3 composition)    | Present |
| `/work`        | Work index                             | Present |
| `/work/[slug]` | Project pages from typed data          | Present |
| `/about`       | About + skills/experience placeholders | Present |
| `/contact`     | Contact; hides unconfigured links      | Present |
| `not-found`    | Custom 404                             | Present |

### Data plan

Centralized typed data under `src/data/`:

- `content-types.ts` — shared domain types and discriminated unions
- `portfolio.ts` — name, title, location, positioning, about, education/research
- `projects.ts` — verified projects with media, demos, architecture, safety
- `experience.ts` — Abra / EL AL professional work (proprietary)
- `skills.ts` — verified skill vocabulary groups + technology grouping helper
- `engineering-approach.ts` — four engineering principles
- `links.ts` — `externalLinks` with null placeholders + configured action helpers
- `missing-content.ts` — unresolved checklist mirrored from content decisions

Helpers:

- `src/lib/links.ts` — `isConfiguredUrl`, HTTP/email/CV validators, fake-placeholder rejection
- `src/lib/project-utils.ts` — featured/public/practice filters, lookup, adjacent nav, tech grouping
- `src/lib/content-validation.ts` — unique slugs, clinical safety, confidentiality invariants
- `src/lib/metadata.ts` — page metadata helpers
- `src/lib/cn.ts` — className merge
- `src/lib/motion.ts` — motion preference helpers

### Component boundaries

**Server Components (default):**

- Page shells and static content
- Metadata generation
- Project lists and case-study content
- Header/footer chrome that does not need browser APIs (header currently Server; theme toggle is Client)

**Client Components:**

- `ThemeProvider`, `ThemeToggle`
- `SiteHeader`, `MobileNav`, `CommandMenu`, `HeroVisual` (scroll/overlay/pointer interaction)
- `WorkFilters` (keyboard-accessible project filtering)
- Interactive project demos (`ProjectDemoSection` + per-project Client Components)
- `Reveal` / `RevealEnhancer` (progressive section reveals; Server pages stay Server)

### State strategy

- Local React state for theme
- URL/route state for pages
- No global state library

### Media strategy

- Placeholder folders under `public/projects/<slug>/`
- Abstract HTML/CSS/SVG until real assets exist
- Dynamic import for heavy demos in later phases
- Discriminated union `ProjectMedia` already defined

### Theme architecture

- CSS variables for semantic roles (background, foreground, surfaces, borders, muted, accent, status, focus, steel)
- Full token set for typography, spacing, grid, radius, motion, z-index (Phase 1)
- `data-theme="light" | "dark"` on `<html>`
- Inline boot script + `ThemeProvider` persistence via `localStorage`
- System preference fallback when unset
- Reduced-motion collapses duration tokens and disables nonessential transitions

### Animation strategy

- Phase 1: motion duration/easing tokens + reduced-motion base CSS
- Phase 6: CSS-first refinement (transforms/opacity); Motion for React not added
- Route enter: `src/app/template.tsx` + `.route-enter` keyframes
- Section reveals: progressive enhancement (`data-reveal`); SSR stays visible
- Theme: short `theme-transition` class on intentional toggles only
- No scroll hijacking, no intro loaders, no shared-element project morphs

### Accessibility strategy

- Semantic landmarks, skip link, visible `:focus-visible`
- Keyboard-reachable controls; theme toggle labeled
- Missing URLs do not render fake anchors
- Clinical safety note rendered when present
- Full WCAG 2.2 AA audit in Phase 7

### Testing strategy

- Unit: link/config helpers, work filters, adjacent navigation, case-study content guarantees
- Playwright: homepage, navigation, `/work` filtering, all public project routes, invalid slug 404, prev/next, 320px overflow
- Manual responsive/keyboard checks each major phase
- Full WCAG / performance audit remains Phase 7

---

## 3. Sequential phases

### Phase 0 — Foundation

Owner prompt:

- `docs/agents/00-lead-architect.md`

Status: **complete**

Deliverables:

- Repository assessment
- Updated implementation plan
- Essential dependencies
- Folder structure
- Routes
- Basic layout
- Strict TypeScript
- Linting + formatting
- Base metadata
- Minimal theme architecture
- Typed data placeholders
- Passing production build

Exit criteria:

- Application runs
- Routes exist
- No fake content is publicly rendered
- Type check, lint, and build pass

---

### Phase 1 — Design system

Owner prompt:

- `docs/agents/01-design-system.md`

Status: **complete**

Deliverables:

- Tokens
- Typography
- Color themes
- Grid
- Spacing
- Surface styles
- Button and link states
- Focus states
- Motion principles
- Internal preview route or development-only component showcase

Exit criteria:

- Light and dark themes work
- Mobile and desktop tokens are coherent
- Focus and reduced-motion rules exist
- No complete page redesign yet

---

### Phase 2 — Content model

Owner prompt:

- `docs/agents/02-content-model.md`

Status: **complete**

Deliverables:

- Strong project types with discriminated unions (`kind`, media, demos, collaboration, external actions)
- Verified project content for all six documented projects
- Professional Abra / EL AL experience as proprietary work
- About, education/research, skills, and engineering-approach content
- Missing-link helpers and fake-placeholder rejection
- Clinical safety guarantees required on the clinical project
- Content validation + unit tests for public content guarantees

Exit criteria:

- All verified projects are represented
- Team and proprietary work are labeled correctly
- Clinical disclaimer is structurally required
- Missing URLs do not generate public links

---

### Phase 3 — Homepage and navigation

Owner prompt:

- `docs/agents/03-homepage-navigation.md`

Status: **complete**

Deliverables:

- Responsive sticky navigation with scroll surface, active route, CV gate, theme toggle, command trigger
- Mobile navigation panel with focus trap, Escape, scroll lock, and focus restoration
- Searchable `Cmd/Ctrl + K` command menu (projects, routes, theme, configured externals only)
- Full homepage: hero + SVG system visual, selected work, distinct featured treatments, experience, approach, skills, visual background, additional work, contact CTA, footer

Exit criteria:

- Homepage is complete without relying on advanced demos
- Mobile navigation is keyboard accessible
- Hero remains strong without JavaScript animation
- Responsive behavior is validated

---

### Phase 4 — Case-study system

Owner prompt:

- `docs/agents/04-case-study-system.md`

Status: **complete**

Deliverables:

- Work index with editorial intro, featured / practice grouping, and keyboard-accessible filters
- Reusable case-study primitives under `src/components/case-study/`
- Complete `/work/[slug]` pages from typed project data with `generateStaticParams` + `notFound()`
- Distinct abstract visual per project (no fabricated screenshots)
- Architecture, contribution, limitations, safety, and attribution sections only when content exists
- Non-wrapping previous/next project navigation
- Professional Abra / EL AL section on `/work` (not a repository case study)

Exit criteria:

- Every project route renders
- No generic identical card wall
- Professional work is separated from public repositories
- Missing links remain hidden

---

### Phase 5 — Interactive demonstrations

Owner prompt:

- `docs/agents/05-interactive-demos.md`

Status: **complete**

Deliverables:

- Clinical static extraction demo
- Realtime CLI simulation
- AcademEase schedule and RTL simulation
- TapTap rhythm simulation
- Architecture diagrams
- Dynamic imports with project-specific loading fallbacks and error boundaries

Exit criteria:

- Demonstrations are deterministic
- No external AI request
- No medical-data input
- No copyrighted audio
- Keyboard and reduced-motion modes work
- Demos load dynamically

---

### Phase 6 — Motion and refinement

Owner prompt:

- `docs/agents/06-motion-refinement.md`

Status: **complete**

Deliverables:

- Route transitions via `app/template.tsx` CSS enter (no content delay)
- Progressive homepage section reveals (`Reveal` + `RevealEnhancer`)
- Shared project transitions deferred (documented)
- Theme transition class on intentional toggles
- Refined hover/focus/press states; active nav indicator
- Fine-pointer hero parallax (transform-only, ≤4px) + path activation
- Motion budget in `src/lib/motion.ts`; Motion for React not added

Exit criteria:

- Motion adds clarity
- No content delay
- Reduced-motion mode is complete
- Mobile performance remains strong

---

### Phase 7 — Accessibility and performance

Owner prompt:

- `docs/agents/07-accessibility-performance.md`

Status: **complete**

Deliverables:

- Accessibility audit and fixes
- Keyboard audit
- Contrast verification
- Performance review
- Bundle review
- Metadata
- Sitemap
- Robots
- Structured data
- Unit and Playwright tests (including `@axe-core/playwright`)
- README updates

Exit criteria:

- Target WCAG 2.2 AA
- No major keyboard traps
- No horizontal overflow
- Production build passes
- Performance issues are documented and addressed

---

### Phase 8 — Final review

Owner prompt:

- `docs/agents/08-final-review.md`

Status: **complete**

Deliverables:

- Full cross-route review
- Fact review
- Attribution review
- Responsive review
- Content consistency
- Final command results
- Missing-content checklist
- Final change summary

Exit criteria:

- No known critical issue
- No invented content
- No secrets
- No fake links
- All required routes and states work

Targeted fixes from the audit (no redesign):

- Aligned About, Contact, and not-found with design-system primitives
- Added route `error.tsx` and `loading.tsx` fallbacks
- Clinical meta/OG description and work-index safety copy parity
- Softened pending-verification contribution tone without changing attribution state
- Project visual frames no longer default to `aria-hidden` for text-bearing previews
- AcademEase English chrome scoped outside `lang="he"`
- Overlay background inert for mobile nav and command menu
- Command empty-state listbox role; external new-tab disclosure; `sm` button touch targets

---

## 4. Commands

Package manager: **npm**

```bash
npm install
npm run dev
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Do not claim a command passed until it has actually been run.

---

## 5. Decision log

| Date       | Agent              | Decision                                                                                       | Reason                                                                                                                                      | Affected files                                                                                       |
| ---------- | ------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 2026-08-04 | Lead architect     | Scaffold greenfield Next.js 16 App Router + React 19 + TS + Tailwind v4 with npm               | Repo was docs-only; preferred stack from portfolio-spec with no conflicting foundation                                                      | `package.json`, `src/app/**`, config files                                                           |
| 2026-08-04 | Lead architect     | Keep all external and project URLs as `null` and gate rendering with `isConfiguredUrl`         | Content-decisions forbid fake links                                                                                                         | `src/data/links.ts`, `src/data/projects.ts`, `src/lib/links.ts`, contact/header/footer/project pages |
| 2026-08-04 | Lead architect     | Defer Motion for React, command menu, demos, and full design tokens                            | Phase 0 scope is foundation only                                                                                                            | `docs/implementation-plan.md`, later phase owners                                                    |
| 2026-08-04 | Lead architect     | Use `collaboration: "pending-verification"` for Clinical and Realtime GPT CLI                  | Content-decisions require repository evidence before solo claims                                                                            | `src/data/projects.ts`                                                                               |
| 2026-08-04 | Lead architect     | Employment dates remain `2025–Present` and easy to edit                                        | Spec/content mark dates subject to final verification                                                                                       | `src/data/experience.ts`                                                                             |
| 2026-08-04 | Lead architect     | Temporary fonts: Geist (sans/mono) + Source Serif 4                                            | Need three-family slots without final design-system selection                                                                               | `src/app/layout.tsx`                                                                                 |
| 2026-08-04 | Design system      | Keep Geist + Source Serif 4 + Geist Mono as permanent portfolio pairing                        | Strong legibility, editorial contrast, three-family limit; no reason to replace                                                             | `src/app/layout.tsx`, `docs/design-system.md`                                                        |
| 2026-08-04 | Design system      | Electric cobalt accent on warm paper / graphite themes with steel metallic accents             | Spec light/dark direction; photographer-calm editorial + technical precision                                                                | `src/styles/tokens.css`, `docs/design-system.md`                                                     |
| 2026-08-04 | Design system      | Dev-only `/design-system` preview via `force-dynamic` + `notFound` outside development         | Showcase tokens/primitives without shipping a public design-kit page                                                                        | `src/app/design-system/page.tsx`, `src/components/design-system/DesignSystemPreview.tsx`             |
| 2026-08-04 | Design system      | Foundational UI primitives only (no component library)                                         | Reuse without generic library look; homepage redesign deferred to Phase 3                                                                   | `src/components/ui/*`                                                                                |
| 2026-08-04 | Design system      | Automate WCAG AA contrast checks for solid theme pairs                                         | Validate accent/muted/status against backgrounds as tokens evolve                                                                           | `src/lib/contrast.ts`, `src/lib/contrast.test.ts`                                                    |
| 2026-08-04 | Content model      | Expand collaboration into a discriminated attribution object                                   | Support pending-verification, team, individual-practice, educational-research, professional without premature solo claims                   | `src/data/content-types.ts`, `src/data/projects.ts`                                                  |
| 2026-08-04 | Content model      | Require structured `clinicalSafety` on Clinical Follow-Up Detector                             | Spec mandates non-softenable safety facts; type + validation enforce them                                                                   | `src/data/projects.ts`, `src/lib/content-validation.ts`                                              |
| 2026-08-04 | Content model      | Keep Abra / EL AL as `ProfessionalWork`, not a public project                                  | Proprietary work must stay separate from repository/case-study presentation                                                                 | `src/data/experience.ts`                                                                             |
| 2026-08-04 | Content model      | Reject `#`, `example.com`, and bracket placeholders in link helpers                            | Content-decisions forbid fake public actions                                                                                                | `src/lib/links.ts`, `src/data/links.ts`                                                              |
| 2026-08-04 | Content model      | Leave Clinical + Realtime GPT CLI as `pending-verification`                                    | No repository ownership evidence yet                                                                                                        | `src/data/projects.ts`, open questions                                                               |
| 2026-08-04 | Homepage/nav       | Implement focus trap + scroll lock locally; no dialog library                                  | Phase 3 forbids heavy overlay deps unless necessary; keeps bundle small                                                                     | `src/lib/focus-trap.ts`, `MobileNav`, `CommandMenu`                                                  |
| 2026-08-04 | Homepage/nav       | Simple substring command search over labels/keywords; no fuzzy library                         | Spec allows avoiding fuzzy deps; title/category/tech matching is enough                                                                     | `src/lib/command-actions.ts`                                                                         |
| 2026-08-04 | Homepage/nav       | Keep Motion for React deferred; CSS transitions + SVG static hero only                         | Phase 3 motion constraints; hero must work without JS animation                                                                             | `HeroVisual`, `globals.css`                                                                          |
| 2026-08-04 | Homepage/nav       | Distinct featured compositions per project; static previews only                               | Spec forbids identical cards; advanced demos belong to Phase 5                                                                              | `src/components/home/FeaturedProjects.tsx`                                                           |
| 2026-08-04 | Homepage/nav       | Hide CV/GitHub/LinkedIn/email actions when null                                                | Content-decisions: no fake links                                                                                                            | Header, footer, hero, contact CTA, command menu                                                      |
| 2026-08-04 | Case studies       | Derive work filters from category/kind/stack; client filter buttons with `aria-pressed`        | Avoid duplicate hard-coded project lists; keep filtering lightweight without a search dependency                                            | `src/lib/project-utils.ts`, `src/components/work/WorkFilters.tsx`                                    |
| 2026-08-04 | Case studies       | Keep typed `projects` array order for prev/next; do not wrap at ends                           | Simple, predictable navigation; first has no previous, last has no next                                                                     | `getAdjacentProjects`, `ProjectNavigation`                                                           |
| 2026-08-04 | Case studies       | Shared case-study primitives + per-slug visual compositions                                    | Consistency without one identical card/layout for every project                                                                             | `src/components/case-study/**`                                                                       |
| 2026-08-04 | Case studies       | Abstract HTML/CSS visuals + media README guidance; keep `.gitkeep` folders                     | No fabricated screenshots or stock imagery until real assets exist                                                                          | `public/projects/`, visual components                                                                |
| 2026-08-04 | Case studies       | Professional work as `/work` section only, never a public project slug                         | Proprietary EL AL work must stay separate from repository case studies                                                                      | `ProfessionalWorkSection`                                                                            |
| 2026-08-04 | Case studies       | Defer interactive demos, Motion, and full structured-data audit to later phases                | Phase 4 scope is editorial case studies; Phase 5/6/7 own demos, motion, SEO                                                                 | Phase status in this plan                                                                            |
| 2026-08-04 | Interactive demos  | Shared demo shell + project-specific visuals; no generic card-with-tabs for every demo         | Spec requires distinct visual language per project while reusing a11y/shell patterns                                                        | `src/components/demos/shared/**`, per-project demo folders                                           |
| 2026-08-04 | Interactive demos  | Dynamic `next/dynamic` import per case-study route with sized loading fallback                 | Avoid loading all demos on every route; reserve min-height to limit CLS; isolate failures with error boundary; keep slug helper server-safe | `ProjectDemoSection.tsx`, `demo-projects.ts`, `DemoLoadingFallback`, `DemoErrorBoundary`             |
| 2026-08-04 | Interactive demos  | Terminal entries/commands as discriminated unions + pure engine helpers                        | Deterministic offline simulation; unit-testable without React; no API key or network                                                        | `terminal-engine.ts`, `RealtimeTerminalDemo.tsx`                                                     |
| 2026-08-04 | Interactive demos  | TapTap timing via reducer + rAF clock; step mode under reduced motion                          | Explicit state model preferred over boolean soup; pause on visibilitychange; no audio/copyrighted assets                                    | `taptap-engine.ts`, `TapTapDemo.tsx`                                                                 |
| 2026-08-04 | Interactive demos  | Interactive architecture diagram: focusable nodes + details panel + semantic list              | Relationships remain understandable without hover/drag; used for Clinical + Realtime CLI only                                               | `ArchitectureDiagram.tsx`, clinical/terminal demos                                                   |
| 2026-08-04 | Interactive demos  | Bundle impact: demos are route-local async chunks; no Motion, canvas, or state libs            | Keep case-study shell light; Motion/global route transitions deferred to Phase 6                                                            | Decision log; Phase 6 deferred                                                                       |
| 2026-08-04 | Interactive demos  | Defer global route/homepage motion refinements                                                 | Phase 5 allows only demo-local transitions; Motion for React and shared reveals remain Phase 6                                              | Phase 6 owner                                                                                        |
| 2026-08-04 | Motion refinement  | Keep Motion for React uninstalled; CSS + native APIs only                                      | Budget satisfied without a motion library; demos already own local state motion                                                             | `package.json`, `src/lib/motion.ts`, `docs/design-system.md`                                         |
| 2026-08-04 | Motion refinement  | Route enter via App Router `template.tsx` CSS; View Transitions API helpers only               | Reliable remount animation; VT used optionally via `runViewTransition` without Next experimental coupling                                   | `src/app/template.tsx`, `src/lib/motion.ts`, `globals.css`                                           |
| 2026-08-04 | Motion refinement  | Defer shared project-card ↔ case-study morph transitions                                       | Featured/work/case-study DOM structures differ; morph risked CLS and duplicate DOM without clear continuity benefit                         | Decision log; Phase 7+ if assets stabilize                                                           |
| 2026-08-04 | Motion refinement  | Progressive `Reveal` enhancement: mark in-view before enabling hide/show CSS                   | Spec forbids invisible SSR content and no-JS breakage                                                                                       | `Reveal.tsx`, `RevealEnhancer`, homepage sections                                                    |
| 2026-08-04 | Motion refinement  | Theme transition class only on user toggle; system/storage sync stays instant                  | Avoid flash on hydrate and preference changes; keep readable text                                                                           | `ThemeProvider.tsx`                                                                                  |
| 2026-08-04 | Motion refinement  | Bundle impact: no new dependencies; reveals/route CSS only; demos remain route-split           | Phase 6 must not inflate client JS; Motion library skipped                                                                                  | Decision log; validation notes                                                                       |
| 2026-08-04 | A11y / performance | Add `@axe-core/playwright` only; no second overlapping a11y library                            | Lightweight automated WCAG checks on major routes and open overlays without replacing keyboard review                                       | `package.json`, `e2e/accessibility.spec.ts`                                                          |
| 2026-08-04 | A11y / performance | Canonical, OG absolute URLs, and robots sitemap host only when `siteUrl` configured            | Content-decisions forbid invented domains; path-only sitemap remains inspectable locally                                                    | `metadata.ts`, `sitemap.ts`, `robots.ts`                                                             |
| 2026-08-04 | A11y / performance | JSON-LD Person + CreativeWork/SoftwareSourceCode from verified facts; clinical demo disclaimer | Avoid fake socials, medical-device claims, and proprietary open-source marking                                                              | `structured-data.ts`, `JsonLd.tsx`, case-study/work pages                                            |
| 2026-08-04 | A11y / performance | TapTap live region announces phase/judgement only; visual ms stays non-live                    | Per-frame timing announcements violated polite live-region guidance                                                                         | `TapTapDemo.tsx`                                                                                     |
| 2026-08-04 | A11y / performance | KS favicon + `/og` typographic cards; absolute `og:image` only when `siteUrl` is set           | Avoid Next file-convention localhost absolutes when metadataBase is unset; no fabricated photos                                             | `icon.tsx`, `apple-icon.tsx`, `src/app/og/**`, `metadata.ts`                                         |
| 2026-08-05 | Final review       | Align About/Contact/404 to design tokens; add route error/loading fallbacks                    | Secondary routes looked unfinished vs homepage/work; audit found missing app-level fallbacks                                                | `about/page.tsx`, `contact/page.tsx`, `not-found.tsx`, `error.tsx`, `loading.tsx`                    |
| 2026-08-05 | Final review       | Clinical page meta + work-index safety excerpt; soften pending-verification contribution copy  | Safety substance required beyond structured data / homepage; avoid sole-delivery tone without changing pending state                        | `work/[slug]/page.tsx`, `WorkProjectCard.tsx`, `projects.ts`                                         |
| 2026-08-05 | Final review       | Visual-frame a11y default, AcademEase lang scoping, overlay inert, listbox empty, new-tab cue  | Evidence-backed a11y polish from Phase 8 audit only                                                                                         | `ProjectVisualFrame`, `AcademEaseDemo`, `focus-trap`, overlays, `TextLink`/`ButtonLink`              |

---

## 6. Risk register

| Risk                                   | Mitigation                                                       | Owner                   |
| -------------------------------------- | ---------------------------------------------------------------- | ----------------------- |
| Scope becomes too large                | Build sequentially and preserve exit criteria                    | Lead architect          |
| Generic design                         | Use project-specific compositions and design-system review       | Design agent            |
| Invented content                       | Centralize verified facts and validate links                     | Content agent           |
| Excessive JavaScript                   | Server render static content and dynamically import demos        | Architecture agent      |
| Motion harms usability                 | Use motion budget and reduced-motion alternatives                | Motion agent            |
| Proprietary information leaks          | Keep EL AL work high-level and anonymized                        | All agents              |
| Clinical demo appears medically usable | Use fictional static data and persistent disclaimer              | Content and demo agents |
| Mobile layouts become afterthought     | Validate every phase at target widths                            | All agents              |
| Missing real contact/media assets      | Null-link rendering + missing-content checklist                  | Lead + content agents   |
| Hosting/domain unknown                 | Keep `siteUrl` null; avoid hard-coded canonical until configured | Lead architect          |

---

## 7. Open questions

These should be resolved from repository evidence or later real data, not guessed.

- Real GitHub URL
- Real LinkedIn URL
- Real email address
- CV path
- Public repository URLs
- Live demo URLs
- Real screenshots
- Optional profile photograph
- Final employment dates
- Final project dates
- Whether each repository is public
- Collaboration attribution for Clinical Follow-Up Detector and Realtime GPT CLI (repository history)
- Hosting platform
- Custom domain
- Optional explicit “reset to system theme” control (override + system already supported)

---

## 8. Phase 6 motion audit and budget

### Audit findings (pre-implementation)

| Area                        | Existing                       | Gap / action                                             |
| --------------------------- | ------------------------------ | -------------------------------------------------------- |
| Tokens + reduced-motion CSS | Sufficient                     | Keep; extend with route/reveal/overlay keyframes         |
| Mobile nav panel            | Slide-in present               | Add overlay fade; keep a11y intact                       |
| Command menu                | Instant mount                  | Add dialog/overlay enter                                 |
| Sticky header               | Surface transition             | Keep; add sliding active indicator                       |
| Theme                       | Instant attribute              | Short color transition on intentional toggle             |
| Homepage                    | Static                         | Progressive section reveals (once)                       |
| Routes                      | Instant                        | Restrained template enter; no cinematic VT               |
| Hero                        | Fine-pointer glow via left/top | Switch to transform; path activation; RM static          |
| Project previews            | Color hover on titles          | Project-specific border + subtle lift + arrow            |
| Case studies / demos        | Demo-local motion              | Sparse link feedback only; do not animate demos globally |
| Shared morph                | None                           | **Deferred** — mismatched DOM, CLS risk                  |

### Motion budget

- Prefer CSS `transform` / `opacity` only
- No Motion for React, GSAP, or second animation framework
- Stagger ≤ 180ms total; reveal offset 0.75rem
- Theme transition 200ms; route enter 200ms
- Hero parallax ≤ 4px; fine pointer only; disabled under reduced motion
- One IntersectionObserver pattern via `Reveal` (cleaned up on unmount)
- No scroll hijacking; `scroll-margin-top` for sticky anchors
- Demos remain dynamically imported route chunks

### Strategies implemented

- **Route transitions:** `src/app/template.tsx` + `.route-enter`; navigation starts immediately; RM disables animation
- **View Transitions API:** feature helpers in `motion.ts`; not required for default navigations (fallback = CSS template enter)
- **Shared project transitions:** deferred (see decision log)
- **Section reveals:** `Reveal` + `RevealEnhancer`; content visible without JS; enhancement marks in-view before hiding others
- **Navigation:** active underline indicator; overlay fades; pressable controls
- **Theme:** `theme-transition` class on user toggle only
- **Performance:** no new dependencies; Server Components retained for page shells
- **Route-enter detail:** transform-only (no opacity hide) so content remains readable during navigation

### Deferred (Phase 7+)

- Shared-element project morphs
- Scroll progress indicator (low value for this editorial layout)
- Magnetic buttons
- Cinematic View Transitions across the whole document

---

## 9. Phase 7 accessibility, performance, and SEO audit

> Recorded before broad hardening changes. Phases 0–6 remain intact.

### 9.1 Route and feature audit (pre-change)

| Route / feature                                                 | Finding                                                                                    | Severity                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `/`, `/work`, `/work/[slug]`, `/about`, `/contact`, `not-found` | Present with unique metadata helpers; landmarks and one h1 pattern largely correct         | OK                                       |
| `/design-system`                                                | Dev-only via `notFound()` outside development; must stay out of sitemap/nav                | OK / verify                              |
| Desktop / mobile nav / command menu                             | Focus trap, Escape, restore, dialog semantics present                                      | OK                                       |
| Theme control                                                   | Labeled IconButton; persistence works                                                      | Polish: optional `aria-pressed`          |
| Work filters                                                    | `aria-pressed`, empty `role="status"`                                                      | Polish: announce non-empty count changes |
| Case studies + demos                                            | Dynamic import, safety copy, keyboard demos                                                | OK                                       |
| Skip link → `#main-content`                                     | Works; main lacks `tabIndex={-1}` so some browsers may not move focus                      | Fix                                      |
| TapTap live region                                              | Announces per-frame `Playing · N ms` through `DemoStatus`                                  | Fix (noise)                              |
| Command menu search                                             | Listbox + activedescendant; incomplete combobox ARIA                                       | Fix                                      |
| SEO assets                                                      | No `sitemap.ts`, `robots.ts`, favicon/icons, OG image route, JSON-LD                       | Missing                                  |
| Canonical / `siteUrl`                                           | Safely omitted when null; no fake domain                                                   | OK — keep                                |
| External links                                                  | All null; gated helpers; no `#` / example.com                                              | OK                                       |
| Contact empty state                                             | Professional copy when no methods configured                                               | OK                                       |
| Security                                                        | Theme boot is only `dangerouslySetInnerHTML`; no analytics; no `.env` tracked              | OK                                       |
| Browser tooling                                                 | Chromium Playwright + mobile viewports available; Safari/Firefox physical devices deferred | Document                                 |

### 9.2 Accessibility plan

- Target WCAG 2.2 AA; keep native HTML first
- Fix TapTap announcement noise; keep judgement/phase announcements
- Make main skip target focusable; complete command combobox ARIA
- Announce work-filter result counts without redundant empty-state noise
- Add `@axe-core/playwright` for major routes and open overlays
- Contrast remains unit-tested in `contrast.test.ts`
- Reduced-motion already collapses tokens; verify demos remain usable

### 9.3 Performance plan

- Keep Server Components for page shells; demos stay route-local dynamic chunks
- Do not promote homepage to load demo implementations
- Do not add Motion for React or analytics
- Document budgets in README from build observation (no invented Lighthouse scores)
- `next/image` remains ready for future media; no fabricated assets this phase
- Confirm observer/rAF/listener cleanup already present (Reveal, TapTap, header)

### 9.4 SEO / structured-data plan

- Sitemap: public routes + case studies; exclude `/design-system` and invalid paths
- Robots: allow public indexing; Sitemap URL only when `siteUrl` configured
- Canonical / OG absolute URLs only when `siteUrl` configured — never invent a domain or use localhost
- Generated typographic OG image (KS monogram + title); no fake photos
- JSON-LD `Person` + project `CreativeWork` / `SoftwareSourceCode` from verified facts only
- Clinical structured data must not imply medical-device / clinical validation
- Professional Abra / EL AL work is not open-source SoftwareSourceCode

### 9.5 Explicitly deferred (still open)

- Real GitHub / LinkedIn / email / CV / siteUrl / repo / live demo URLs
- Real screenshots and profile photograph
- Hosting platform selection and production deployment
- Safari / Firefox physical-device testing
- Analytics

### 9.6 Phase 7 results (post-hardening)

| Area                | Result                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility fixes | Skip-target focusable main; command combobox ARIA; theme `aria-pressed`; work-filter result announcements; TapTap live-region noise removed |
| Automated a11y      | `@axe-core/playwright` covering major routes, not-found, open mobile/command overlays, theme, reduced-motion case study                     |
| SEO                 | Unique titles/descriptions retained; sitemap + robots; icons; OG images; Twitter cards; safe null-`siteUrl` behavior                        |
| Structured data     | Person + WebSite globally; project CreativeWork/SoftwareSourceCode + breadcrumbs on work/case studies                                       |
| Performance         | No new runtime deps beyond axe in Playwright; fonts `display: swap`; budgets documented in README; no invented Lighthouse scores            |
| Security            | No secrets found in tracked source; theme boot + JSON-LD are the only `dangerouslySetInnerHTML` uses; no analytics                          |
| External links      | Remain null-gated; contact empty state clarified; e2e asserts no `#` / example.com                                                          |
| Browser review      | Chromium Playwright + 320/375 viewports; Safari/Firefox physical devices deferred honestly                                                  |
| Deferred            | Real contact/media URLs, hosting/domain, analytics                                                                                          |

### 9.7 Phase 8 final review results

| Area                | Result                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Product quality     | Homepage/work/case studies remain editorial and cohesive; About/Contact/404 brought onto shared primitives                                 |
| Facts / attribution | No invented metrics/links; pending-verification preserved for Clinical + Realtime CLI; team/professional/practice labels intact            |
| Clinical safety     | Case study, demo, homepage, work index, structured data, and clinical meta/OG all communicate demonstration-only constraints               |
| Confidentiality     | Abra / EL AL stays high-level with mandatory proprietary note; no repo/live URLs                                                           |
| Accessibility       | Overlay inert landmarks; visual-frame AT access; AcademEase lang scoping; command empty option role; new-tab disclosure; touch-target `sm` |
| Fallbacks           | Route `error.tsx` + `loading.tsx`; not-found uses design-system CTAs                                                                       |
| Remaining           | External links, media, domain/hosting still unresolved by design                                                                           |

---
