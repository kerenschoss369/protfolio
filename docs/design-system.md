# Design System Direction

This document defines the visual and interaction language and records the concrete tokens implemented in Phase 1.

## 1. Design character

The portfolio should feel:

- Editorial
- Technically precise
- Premium
- Calm
- Confident
- Contemporary
- Visually distinctive
- Highly usable

It should not feel:

- Template-driven
- Overdecorated
- Cyberpunk
- Corporate-generic
- Childish
- Dependent on animation
- Like a component-library demo

---

## 2. Visual concept

Combine a modern European editorial grid with subtle technical-system motifs.

The key tension is:

- Visual composition from photography
- Structural logic from software engineering

Use:

- Strong whitespace
- Fine rules and borders
- Carefully proportioned type
- Small monospace metadata
- Precise alignment
- Selective asymmetry
- Subtle steel/chrome references (`--steel`, `--steel-highlight`)
- One controlled accent (electric cobalt)

Implemented direction: warm paper light theme + deep graphite dark theme, restrained metallic borders, fluid type, editorial serif for key titles only.

---

## 3. Color system

Tokens live in `src/styles/tokens.css` and map into Tailwind via `@theme inline` in `src/styles/globals.css`.

Theme switching uses `data-theme="light" | "dark"` on `<html>`, with:

- Inline boot script (no incorrect-theme flash where practical)
- `ThemeProvider` persistence in `localStorage` (`portfolio-theme`)
- System preference when no override is stored
- `prefers-color-scheme` fallback before hydration

### Light theme (`[data-theme="light"]`)

| Token               | Value                      | Role                                    |
| ------------------- | -------------------------- | --------------------------------------- |
| `--background`      | `#f5f2ec`                  | Warm off-white page ground              |
| `--foreground`      | `#12141a`                  | Near-black body text                    |
| `--surface-1`       | `#ece8e1`                  | Soft neutral surface                    |
| `--surface-2`       | `#e1dcd3`                  | Slightly elevated / inset surface       |
| `--border-subtle`   | `#cdc7bc`                  | Hairline rules                          |
| `--border-strong`   | `#857f74`                  | Stronger separators / secondary buttons |
| `--muted`           | `#5a5751`                  | Secondary text                          |
| `--accent`          | `#1b4fd8`                  | Electric cobalt                         |
| `--accent-contrast` | `#f5f2ec`                  | Text on accent                          |
| `--accent-muted`    | mix of accent + background | Soft accent wash                        |
| `--success`         | `#1a6b42`                  | Positive / confirmed                    |
| `--warning`         | `#745000`                  | Needs review                            |
| `--danger`          | `#a91d2f`                  | Rejected / destructive                  |
| `--focus-ring`      | `#1b4fd8`                  | Keyboard focus                          |
| `--steel`           | `#555c66`                  | Metallic metadata / accents             |
| `--steel-highlight` | white mix                  | Inset metallic sheen                    |
| `--overlay`         | darkened mix               | Future overlays                         |

### Dark theme (`[data-theme="dark"]`)

| Token               | Value     | Role                                |
| ------------------- | --------- | ----------------------------------- |
| `--background`      | `#121417` | Deep graphite                       |
| `--foreground`      | `#f1eee7` | Warm white                          |
| `--surface-1`       | `#1a1d22` | Charcoal                            |
| `--surface-2`       | `#242830` | Elevated charcoal                   |
| `--border-subtle`   | `#3a3f48` | Muted silver                        |
| `--border-strong`   | `#7e8591` | Brighter silver                     |
| `--muted`           | `#a9a399` | Secondary warm gray                 |
| `--accent`          | `#6b8aff` | Same accent family, lifted for dark |
| `--accent-contrast` | `#0c0e12` | Text on accent                      |
| `--success`         | `#4caf7a` | Status                              |
| `--warning`         | `#d6a33a` | Status                              |
| `--danger`          | `#ef6b76` | Status                              |
| `--focus-ring`      | `#6b8aff` | Keyboard focus                      |
| `--steel`           | `#9aa3ae` | Metallic reference                  |

Status also exposes `--*-contrast` pairs for filled chips/buttons.

Rules:

- Color supports hierarchy; it does not replace it.
- Gradients are not decorative defaults.
- Metallic references come from borders, sheens, and monospace metadata.
- State is never communicated with color alone (status tags include text labels).
- Contrast for core pairs is covered by unit tests in `src/lib/contrast.test.ts`.

---

## 4. Typography

Three families via `next/font` in `src/app/layout.tsx`:

| Role  | Family         | CSS variable          | Usage                                       |
| ----- | -------------- | --------------------- | ------------------------------------------- |
| Sans  | Geist          | `--font-sans-family`  | Body, navigation, UI, most section headings |
| Serif | Source Serif 4 | `--font-serif-family` | Display, hero, page, and project titles     |
| Mono  | Geist Mono     | `--font-mono-family`  | Metadata, tags, code, terminal, tech labels |

Kept from Phase 0: no strong design reason to replace; Geist reads contemporary and precise; Source Serif 4 provides editorial contrast without theatrical display fonts.

### Fluid scale (`clamp()`)

| Token            | Purpose                           |
| ---------------- | --------------------------------- |
| `--text-display` | Rare large display                |
| `--text-hero`    | Homepage name / primary statement |
| `--text-page`    | Page titles                       |
| `--text-section` | Section titles                    |
| `--text-project` | Project titles                    |
| `--text-body-lg` | Lead paragraphs                   |
| `--text-body`    | Body                              |
| `--text-sm`      | Supporting UI copy                |
| `--text-meta`    | Uppercase monospace metadata      |
| `--text-code`    | Code / terminal                   |

Related tokens: `--leading-*`, `--tracking-*`.

Primitives: `Heading`, `Text` in `src/components/ui/`.

---

## 5. Spacing and layout

### Spacing tokens

`--space-1` … `--space-24`, plus:

- `--space-gutter` — fluid horizontal page padding
- `--space-section` / `--space-section-sm` — vertical section rhythm

### Layout tokens

| Token            | Value / behavior             |
| ---------------- | ---------------------------- |
| `--content-max`  | `92.5rem` (1480px)           |
| `--prose-max`    | `40rem` (~65ch)              |
| `--measure`      | `65ch`                       |
| `--grid-gap`     | fluid                        |
| `--grid-columns` | 4 → 8 (≥48rem) → 12 (≥64rem) |

Utility: `.editorial-grid`.

Breakpoints (CSS vars + Tailwind `@theme`):

- `--bp-sm` / `40rem`
- `--bp-md` / `48rem`
- `--bp-lg` / `64rem`
- `--bp-xl` / `80rem`
- `--bp-2xl` / `90rem`

Primitive: `Container` (`content` | `prose` | `full`), `Section`.

---

## 6. Surfaces and borders

| Token / primitive   | Notes                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `--radius-sm/md/lg` | Controlled corners; no default pills                                                       |
| `--border-width`    | 1px default                                                                                |
| `Surface`           | `flat` / `raised` / `inset` / `accent` with `none` / `subtle` / `strong` / `steel` borders |
| `Divider`           | `subtle` / `strong` / `steel`                                                              |
| `--shadow-sm/md`    | Restrained; prefer borders                                                                 |

Avoid heavy drop shadows, ubiquitous glass, and floating card walls.

---

## 7. Buttons and links

Primitives:

- `Button` — `primary` | `secondary` | `ghost` | `danger`; sizes `sm` | `md` | `lg`; loading/disabled
- `TextLink` — internal `next/link` or external/mailto; hides never invent URLs
- `IconButton` — requires accessible `label`; min 44px target (`--touch-target`)

States: default, hover, focus-visible, active, disabled, loading.

Focus uses `--focus-ring` with `--focus-ring-width` and `--focus-ring-offset` globally via `:focus-visible`.

---

## 8. Navigation design

Implemented in Phase 3:

- Sticky header: transparent at top; subtle surface, border, and blur after scroll (`--z-sticky`)
- Desktop primary nav with `aria-current="page"` active state
- Mobile full-height panel (`role="dialog"`, Escape, focus trap, scroll lock, focus restore)
- Command menu (`Cmd/Ctrl + K`) as modal dialog with searchable actions
- Theme toggle via `IconButton`; CV action only when `cvPath` is configured
- Skip link uses `--z-skip-link`
- Overlay/modal layers use `--z-overlay` / `--z-modal`

---

## 9. Project visual language

Homepage featured treatments (Phase 3) and case-study pages (Phase 4) share distinct preview languages:

- Clinical — note/action review surfaces, evidence, needs-review status, safety copy, architecture chain
- AcademEase — schedule grid + course-material tiles + multilingual/RTL metadata
- Realtime GPT CLI — terminal/event rows, goroutine/channel cues, offline simulation label
- TapTap — silent rhythm/timing marks (Perfect / Good / Miss), no copyrighted assets
- OverTheWire Bandit — compact level-progress practice visual (no secrets)
- ATLAS — abstract data-analysis bars (not fabricated scientific results)

Shared foundations:

- `Tag` — default / accent / steel / success / warning / danger
- `ProjectMeta` — category, dates, stack as monospace metadata
- `ButtonLink` — link styled with button variants for CTAs
- `ProjectVisualFrame` — labeled conceptual-preview frame for abstract media
- Case-study sections — `CaseStudyHero`, `CaseStudySection`, `ContributionPanel`, `ArchitectureOverview`, `DecisionList`, `LimitationPanel`, `SafetyNotice`, `ConfidentialityNotice`, `ProjectNavigation`, `ProjectLinkActions`

Work index filters use semantic `button` controls with `aria-pressed`, touch-sized targets, and an accessible empty `role="status"` state.

### Interactive demo visual rules (Phase 5)

Shared shell primitives live under `src/components/demos/shared/`:

- `DemoFrame` — steel-bordered inset surface with reserved min-height
- `SimulationNotice` — persistent “Portfolio simulation” label
- `DemoControls` / `DemoModeButton` — `aria-pressed` mode switches, ~44px targets
- `InteractiveArchitectureDiagram` — focusable nodes, details panel, semantic list; decorative arrows only
- Project-specific loading fallbacks (no spinner-only shells)

Each demonstration keeps a distinct surface language:

- Clinical — review/safety surfaces, evidence marks, warning safety panel
- Realtime CLI — dark selectable terminal + event timeline
- AcademEase — schedule CSS grid + RTL `dir`/`lang` recomposition
- TapTap — lane targets, Perfect/Good/Miss text tags (never color alone)

Motion inside demos is local CSS / `requestAnimationFrame` only. Global route/homepage motion is owned by Phase 6 (CSS-first; Motion for React not used).

---

## 10. Motion principles

Tokens:

| Token               | Default                      |
| ------------------- | ---------------------------- |
| `--duration-fast`   | 120ms                        |
| `--duration-base`   | 200ms                        |
| `--duration-slow`   | 320ms                        |
| `--ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` |
| `--ease-entrance`   | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-exit`       | `cubic-bezier(0.4, 0, 1, 1)` |

Under `prefers-reduced-motion: reduce`:

- Duration tokens collapse to `0ms`
- Global transitions/animations near-disabled in `globals.css`
- Smooth scrolling disabled
- Route enter, hero compose, reveals, parallax, and theme color transitions simplify or disable
- Focus and state feedback remain
- TapTap step mode and demo functionality remain

### Phase 6 interaction language

| Concern              | Implementation                                                             |
| -------------------- | -------------------------------------------------------------------------- |
| Motion for React     | **Not added** — CSS + `IntersectionObserver` + optional VT helpers suffice |
| Route enter          | `app/template.tsx` + `.route-enter` (opacity + 0.35rem translateY)         |
| Section reveals      | `Reveal` / `RevealEnhancer`; progressive; SSR visible                      |
| Shared project morph | Deferred                                                                   |
| Nav                  | Sliding accent underline; sticky surface; overlay/dialog keyframes         |
| Theme                | `.theme-transition` on intentional toggles (~200ms colors/borders)         |
| Hero                 | Transform parallax ≤4px; path emphasis on node focus/press                 |
| Previews             | Project-specific border response + 1px lift; focus-visible parity          |
| Micro                | `.pressable` active translateY(1px); link underline offset; `.link-arrow`  |
| Scroll               | Native smooth for anchors; `scroll-margin-top`; no hijacking               |

JS helpers in `src/lib/motion.ts` mirror tokens and expose `motionBudget`, reduced-motion subscription helpers, and `runViewTransition` fallbacks.

Motion inside demos remains local CSS / `requestAnimationFrame` only.

---

## 11. Responsive principles

Validated intent for 320–1920px:

- Fluid type and gutters avoid breakpoint-only jumps
- `--touch-target` ≈ 44px
- Editorial grid column count adapts
- Preview exercises narrow and wide compositions

Full page responsive polish continues in later phases.

---

## 12. Accessibility design rules

- Visible `:focus-visible` using `--focus-ring`
- Contrast unit-tested for AA body/UI pairs
- Status tags include text, not color alone
- Theme control is labeled
- Reduced-motion token + CSS behavior
- Preview documents keyboard focus paths

---

## 13. Z-index layers

`--z-base`, `--z-raised`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast`, `--z-skip-link`

---

## 14. Foundational primitives

Located in `src/components/ui/`:

- `Container`
- `Section`
- `Heading`
- `Text`
- `Button`
- `TextLink`
- `Tag`
- `ProjectMeta`
- `Surface`
- `Divider`
- `IconButton`
- `ButtonLink` — internal/external CTAs using button variants

No heavy UI library.

---

## 15. Internal design preview

- Route: `/design-system`
- Component: `src/components/design-system/DesignSystemPreview.tsx`
- Development only: `force-dynamic` + `notFound()` when `NODE_ENV !== "development"`
- Open with `npm run dev`, then visit [http://localhost:3000/design-system](http://localhost:3000/design-system)

Demonstrates type scale, color roles, theme switching, buttons, links, focus, tags, project metadata, surfaces, architecture-node sample, terminal row, review status, and mobile-nav sample.
