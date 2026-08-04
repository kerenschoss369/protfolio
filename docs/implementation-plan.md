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

| Route          | Purpose                                | Status            |
| -------------- | -------------------------------------- | ----------------- |
| `/`            | Homepage shell                         | Present (minimal) |
| `/work`        | Work index                             | Present           |
| `/work/[slug]` | Project pages from typed data          | Present           |
| `/about`       | About + skills/experience placeholders | Present           |
| `/contact`     | Contact; hides unconfigured links      | Present           |
| `not-found`    | Custom 404                             | Present           |

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
- Future: navigation overlays, command menu, filters, demos, pointer-reactive hero, architecture controls

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
- Prefer CSS `transform`/`opacity` later
- Motion for React only when genuinely required (Phase 6)
- No scroll hijacking, no intro loaders

### Accessibility strategy

- Semantic landmarks, skip link, visible `:focus-visible`
- Keyboard-reachable controls; theme toggle labeled
- Missing URLs do not render fake anchors
- Clinical safety note rendered when present
- Full WCAG 2.2 AA audit in Phase 7

### Testing strategy

- Unit: link/config helpers and later interaction logic
- Playwright: homepage, navigation, case-study route; expand in Phase 7
- Manual responsive/keyboard checks each major phase

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

Deliverables:

- Responsive navigation
- Mobile menu
- Command menu
- Hero
- Selected work
- Experience preview
- Engineering approach
- Skills preview
- Visual-background section
- Contact CTA
- Footer

Exit criteria:

- Homepage is complete without relying on advanced demos
- Mobile navigation is keyboard accessible
- Hero remains strong without JavaScript animation
- Responsive behavior is validated

---

### Phase 4 — Case-study system

Owner prompt:

- `docs/agents/04-case-study-system.md`

Deliverables:

- Work index
- Reusable case-study structure
- Individual project pages
- Distinct visual composition per project
- Architecture, contribution, limitations, and attribution sections
- Project-to-project navigation

Exit criteria:

- Every project route renders
- No generic identical card wall
- Professional work is separated from public repositories
- Missing links remain hidden

---

### Phase 5 — Interactive demonstrations

Owner prompt:

- `docs/agents/05-interactive-demos.md`

Deliverables:

- Clinical static extraction demo
- Realtime CLI simulation
- AcademEase schedule and RTL simulation
- TapTap rhythm simulation
- Architecture diagrams

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

Deliverables:

- Route transitions
- Reveal system
- Shared project transitions where appropriate
- Theme transition
- Refined hover/focus states
- Pointer enhancement on supported devices
- Motion budget

Exit criteria:

- Motion adds clarity
- No content delay
- Reduced-motion mode is complete
- Mobile performance remains strong

---

### Phase 7 — Accessibility and performance

Owner prompt:

- `docs/agents/07-accessibility-performance.md`

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
- Unit and Playwright tests
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

| Date       | Agent          | Decision                                                                               | Reason                                                                                                                    | Affected files                                                                                       |
| ---------- | -------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 2026-08-04 | Lead architect | Scaffold greenfield Next.js 16 App Router + React 19 + TS + Tailwind v4 with npm       | Repo was docs-only; preferred stack from portfolio-spec with no conflicting foundation                                    | `package.json`, `src/app/**`, config files                                                           |
| 2026-08-04 | Lead architect | Keep all external and project URLs as `null` and gate rendering with `isConfiguredUrl` | Content-decisions forbid fake links                                                                                       | `src/data/links.ts`, `src/data/projects.ts`, `src/lib/links.ts`, contact/header/footer/project pages |
| 2026-08-04 | Lead architect | Defer Motion for React, command menu, demos, and full design tokens                    | Phase 0 scope is foundation only                                                                                          | `docs/implementation-plan.md`, later phase owners                                                    |
| 2026-08-04 | Lead architect | Use `collaboration: "pending-verification"` for Clinical and Realtime GPT CLI          | Content-decisions require repository evidence before solo claims                                                          | `src/data/projects.ts`                                                                               |
| 2026-08-04 | Lead architect | Employment dates remain `2025–Present` and easy to edit                                | Spec/content mark dates subject to final verification                                                                     | `src/data/experience.ts`                                                                             |
| 2026-08-04 | Lead architect | Temporary fonts: Geist (sans/mono) + Source Serif 4                                    | Need three-family slots without final design-system selection                                                             | `src/app/layout.tsx`                                                                                 |
| 2026-08-04 | Design system  | Keep Geist + Source Serif 4 + Geist Mono as permanent portfolio pairing                | Strong legibility, editorial contrast, three-family limit; no reason to replace                                           | `src/app/layout.tsx`, `docs/design-system.md`                                                        |
| 2026-08-04 | Design system  | Electric cobalt accent on warm paper / graphite themes with steel metallic accents     | Spec light/dark direction; photographer-calm editorial + technical precision                                              | `src/styles/tokens.css`, `docs/design-system.md`                                                     |
| 2026-08-04 | Design system  | Dev-only `/design-system` preview via `force-dynamic` + `notFound` outside development | Showcase tokens/primitives without shipping a public design-kit page                                                      | `src/app/design-system/page.tsx`, `src/components/design-system/DesignSystemPreview.tsx`             |
| 2026-08-04 | Design system  | Foundational UI primitives only (no component library)                                 | Reuse without generic library look; homepage redesign deferred to Phase 3                                                 | `src/components/ui/*`                                                                                |
| 2026-08-04 | Design system  | Automate WCAG AA contrast checks for solid theme pairs                                 | Validate accent/muted/status against backgrounds as tokens evolve                                                         | `src/lib/contrast.ts`, `src/lib/contrast.test.ts`                                                    |
| 2026-08-04 | Content model  | Expand collaboration into a discriminated attribution object                           | Support pending-verification, team, individual-practice, educational-research, professional without premature solo claims | `src/data/content-types.ts`, `src/data/projects.ts`                                                  |
| 2026-08-04 | Content model  | Require structured `clinicalSafety` on Clinical Follow-Up Detector                     | Spec mandates non-softenable safety facts; type + validation enforce them                                                 | `src/data/projects.ts`, `src/lib/content-validation.ts`                                              |
| 2026-08-04 | Content model  | Keep Abra / EL AL as `ProfessionalWork`, not a public project                          | Proprietary work must stay separate from repository/case-study presentation                                               | `src/data/experience.ts`                                                                             |
| 2026-08-04 | Content model  | Reject `#`, `example.com`, and bracket placeholders in link helpers                    | Content-decisions forbid fake public actions                                                                              | `src/lib/links.ts`, `src/data/links.ts`                                                              |
| 2026-08-04 | Content model  | Leave Clinical + Realtime GPT CLI as `pending-verification`                            | No repository ownership evidence yet                                                                                      | `src/data/projects.ts`, open questions                                                               |

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
