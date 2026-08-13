# QA Remediation Report

Maps the senior code-review / QA audit to the stabilization work. Visual direction is unchanged: immersive MotionSites-inspired landing, with engineering, accessibility, content, and test repairs underneath.

Audit counts at inspection: **P0: 0 · P1: 18 · P2: 24 · P3: 16**.

This file uses the original issue IDs, including related P1 items that appeared in later sections (content, SEO, tests).

---

## Status legend

- **fixed** — implemented and covered by tests or equivalent verification
- **intentionally deferred** — cannot be completed without a real production fact or a follow-up that would change architecture without visual benefit
- **invalid after investigation** — no longer true of the live tree

No P1 is silently deferred. `NEXT-003` / `SEO-001` (`siteUrl: null`) are the only P1s left open; they are required by `docs/content-decisions.md` until a real domain exists.

---

## Architecture

| ID       | Severity | Status                      | Fix                                                                                                                                                                                  | Files                                                                                                                                  | Tests                                                          |
| -------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| ARCH-001 | P1       | fixed                       | Retired `src/components/home/*`. Homepage is `Landing*` only. Live tests moved to `landing-homepage.test.tsx`.                                                                       | deleted `src/components/home/**`; `src/app/page.tsx`; `src/components/landing/landing-homepage.test.tsx`                               | unit landing homepage; e2e homepage                            |
| ARCH-002 | P1       | fixed                       | Restored `/work` index. Removed permanent 308 redirect.                                                                                                                              | `src/app/work/page.tsx`; `next.config.ts`; `src/components/work/WorkIndex.tsx`                                                         | e2e `/work`; sitemap; All work                                 |
| ARCH-003 | P2       | intentionally deferred      | Landing sections remain client islands (Magnet, sticky scale, glow, wink). Further RSC split is a follow-up without a visual change. No-JS copy is already SSR-visible via `FadeIn`. | `src/components/landing/*`                                                                                                             | no-JS homepage e2e                                             |
| ARCH-004 | P2       | invalid after investigation | `domMax` remains justified: `/work` filters use Motion layout animations again.                                                                                                      | `src/components/motion/MotionProvider.tsx`; `src/components/work/WorkFilters.tsx`                                                      | work filter unit/e2e                                           |
| ARCH-005 | P1       | fixed                       | `CommandMenuHost` mounts at `AppShell`. Landing chrome includes command trigger + theme.                                                                                             | `src/components/layout/AppShell.tsx`; `src/components/command-menu/CommandMenuHost.tsx`; `src/components/landing/LandingChromeNav.tsx` | command menu on `/`, `/work`, case study, `/about`, `/contact` |
| ARCH-006 | P1       | fixed                       | Global nav points to `/work`, `/about`, `/contact`. Homepage sections remain previews (`#work` `#about` `#contact`).                                                                 | `src/data/navigation.ts`; `LandingChromeNav.tsx`; `SiteHeader.tsx`                                                                     | nav href assertions                                            |
| ARCH-007 | P2       | fixed                       | `landing-data.ts` derives titles, categories, dates, safety, and confidentiality from canonical data. Presentation-only: statements + featured order.                                | `src/components/landing/landing-data.ts`                                                                                               | content-model + remediation e2e                                |
| ARCH-008 | P3       | fixed                       | Unused `landing/AnimatedText.tsx` and `motion/AnimatedText.tsx` removed with the old homepage.                                                                                       | deleted those files                                                                                                                    | lint                                                           |
| ARCH-009 | P2       | fixed                       | Landing chrome only when pathname is `/` or a **valid** project slug. Invalid `/work/:slug` uses SiteHeader/theme/command/404.                                                       | `src/components/layout/AppShell.tsx`                                                                                                   | invalid-slug e2e                                               |
| ARCH-010 | P1       | fixed                       | `ConfidentialityNotice` uses semantic tokens (`text-muted`, `bg-surface-1`).                                                                                                         | `src/components/case-study/ConfidentialityNotice.tsx`                                                                                  | axe `/about` light + dark                                      |

---

## TypeScript

| ID     | Severity | Status                 | Fix                                                                                                             | Files                                       | Tests                    |
| ------ | -------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------ |
| TS-001 | P3       | fixed                  | Landing slugs are `ProjectSlug`; featured list is exhaustive.                                                   | `landing-data.ts`; `LandingWorkSection.tsx` | `npm run typecheck`      |
| TS-002 | P3       | intentionally deferred | `ref as never` / View Transition cast remain isolated helpers; not expanded into a new type layer in this pass. | `Reveal.tsx`; `lib/motion.ts`               | existing reveal/VT tests |
| TS-003 | P3       | fixed                  | Unused `Link` import removed during landing/chrome work.                                                        | `ProjectLinkActions.tsx`                    | lint                     |

---

## React

| ID        | Severity | Status | Fix                                                                                                                                 | Files                                                              | Tests                            |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------- |
| REACT-001 | P1       | fixed  | `FadeIn` SSR/no-JS at full opacity; below-fold enhance after hydration. Root `loading.tsx` removed so no-JS is not a skeleton.      | `src/components/landing/FadeIn.tsx`; deleted `src/app/loading.tsx` | no-JS e2e; reduced motion        |
| REACT-002 | P2       | fixed  | Pointer glow: fine pointer, reduced motion, cached bounds, rAF, CSS variables. Disabled on touch.                                   | `LandingAboutSection.tsx`; `LandingContactSection.tsx`             | reduced-motion e2e               |
| REACT-003 | P1       | fixed  | Experience list uses `FadeIn as="li"`.                                                                                              | `LandingWorkSection.tsx`                                           | axe homepage                     |
| REACT-004 | P2       | fixed  | Distinct alts: hero “Portrait of Keren Schoss”; about “Keren Schoss, frontend and full-stack developer”. Blink decorative `alt=""`. | `LandingHeroSection.tsx`; `LandingAboutSection.tsx`                | unit + e2e locators              |
| REACT-005 | P2       | fixed  | Magnet capped at 4px; disabled on small viewports and coarse pointers.                                                              | `Magnet.tsx`; `ContactButton.tsx`                                  | visual/tap via mobile hero tests |
| REACT-006 | P2       | fixed  | Terminal history/entries capped (100); `clear` preserved.                                                                           | `RealtimeTerminalDemo.tsx`                                         | demo unit tests                  |

---

## Next.js / SEO

| ID       | Severity | Status                 | Fix                                                                                                                                                              | Files                                                                                                      | Tests                           |
| -------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------- |
| NEXT-001 | P1       | fixed                  | Restored metadata `icon.tsx` and `apple-icon.tsx`.                                                                                                               | `src/app/icon.tsx`; `src/app/apple-icon.tsx`                                                               | `GET /icon`, `/apple-icon`      |
| NEXT-002 | P2       | fixed                  | Home uses `createPageMetadata()` so title/description/OG/Twitter agree.                                                                                          | `src/app/page.tsx`; `src/lib/metadata.ts`                                                                  | SEO e2e                         |
| NEXT-003 | P1       | intentionally deferred | `siteUrl` stays `null` until a real production domain exists. Inventing a domain is forbidden. Null-safe canonical/sitemap/OG behavior is tested and documented. | `src/data/links.ts`; `src/lib/metadata.ts`; `src/app/sitemap.ts`; `README.md`; `docs/content-decisions.md` | `seo.test.ts`                   |
| NEXT-004 | P2       | fixed                  | Kanit weights 300/400/700/900 loaded only via `landing-fonts.ts` on landing/case chrome.                                                                         | `src/lib/landing-fonts.ts`; `LandingRoot.tsx`; `src/app/layout.tsx`                                        | `/about` does not pay for Kanit |
| NEXT-005 | P3       | fixed                  | `/design-system` stays dev-only; omitted from sitemap and public nav. Production 404 is intentional.                                                             | `src/lib/site-routes.ts`; `src/app/design-system/page.tsx`                                                 | sitemap tests                   |
| SEO-001  | P1       | intentionally deferred | Same as NEXT-003.                                                                                                                                                | same                                                                                                       | same                            |
| SEO-002  | P1       | fixed                  | Same as NEXT-001.                                                                                                                                                | same                                                                                                       | same                            |
| SEO-003  | P2       | fixed                  | Same as NEXT-002.                                                                                                                                                | same                                                                                                       | same                            |
| SEO-004  | P2       | fixed                  | Permanent `/work` redirect removed; `/work` is in the sitemap.                                                                                                   | `next.config.ts`; `src/lib/site-routes.ts`                                                                 | sitemap + `/work` e2e           |

---

## Styling

| ID        | Severity | Status | Fix                                                                                                                                                                                     | Files                                           | Tests                   |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| STYLE-001 | P1       | fixed  | Landing semantic tokens under `.landing-root`. Shared components no longer leak landing hex. Contrast pairs unit-tested.                                                                | `src/styles/landing.css`; `src/lib/contrast.ts` | `contrast.test.ts`; axe |
| STYLE-002 | P2       | fixed  | Repeated radii/breakpoints expressed as landing tokens and CSS classes where they affected contrast or layout. Remaining composition values are presentation CSS, not a second palette. | `landing.css`; landing sections                 | visual/mobile e2e       |
| STYLE-003 | P2       | fixed  | Hero/about/contact use `min-h-dvh` / content-driven height instead of `h-screen` overlays.                                                                                              | `LandingHeroSection.tsx`; `landing.css`         | 320–430 hero tests      |
| STYLE-004 | P2       | fixed  | Removed unnecessary card clipping; prefer natural expansion.                                                                                                                            | `LandingWorkSection.tsx`; `landing.css`         | axe scrollable-region   |

---

## Motion / performance

| ID         | Severity | Status | Fix                                                                                                                                          | Files                                                                  | Tests                              |
| ---------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| MOTION-001 | P1       | fixed  | Sticky stack off under `prefers-reduced-motion`; static layout with `data-sticky-stack="off"`.                                               | `LandingWorkSection.tsx`                                               | reduced-motion e2e                 |
| MOTION-002 | P2       | fixed  | Clinical/Realtime preview intervals require in-view + page visible + motion allowed.                                                         | `ClinicalCardVisual.tsx`; `RealtimeCardVisual.tsx`                     | unit/e2e reduced motion            |
| MOTION-003 | P2       | fixed  | Homepage TapTap rAF pauses offscreen, hidden tab, and reduced motion. Lightweight preview (no `taptap-engine`).                              | `TapTapCardVisual.tsx`                                                 | reduced motion                     |
| MOTION-004 | P2       | fixed  | Contact rows and portrait wink have hover + focus-visible (and tap where present).                                                           | `LandingContactSection.tsx`; `LandingAboutSection.tsx`; `landing.css`  | keyboard e2e                       |
| PERF-001   | P1       | fixed  | Production portraits are WebP (`fullbody.webp`, `aboutme.webp`, `aboutme_blink.webp`). Giant JPEG/PNG sources removed from the served set.   | `public/images/*`; `LandingHeroSection.tsx`; `LandingAboutSection.tsx` | network via production build       |
| PERF-002   | P3       | fixed  | Duplicate `portrait.jpg`/`portrait.png`/`portrait.webp` and unused `Keren-Hand.ttf` deleted. `public/about/*` retained for the About cutout. | `public/images`; `public/fonts`                                        | reference grep                     |
| PERF-003   | P1       | fixed  | Homepage cards use lightweight visuals. Full demo engines stay on case studies (`next/dynamic`).                                             | `src/components/landing/visuals/*`; `ProjectDemoSection.tsx`           | case-study test mocks demo section |
| PERF-004   | P2       | fixed  | Same as NEXT-004.                                                                                                                            | same                                                                   | same                               |

---

## Accessibility / responsive

| ID       | Severity | Status | Fix                                                                                                                       | Files                                                     | Tests                         |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------- |
| A11Y-001 | P1       | fixed  | Solid muted tokens instead of `/30` opacity. `.hero-heading` axe exclusion removed.                                       | `landing.css`; `e2e/accessibility.spec.ts`; `contrast.ts` | axe homepage                  |
| A11Y-002 | P1       | fixed  | Same as ARCH-010.                                                                                                         | `ConfidentialityNotice.tsx`                               | axe about, both themes        |
| A11Y-003 | P1       | fixed  | Primary nav `min-height: var(--touch-target)` (~44px).                                                                    | `landing.css`; `LandingChromeNav.tsx`                     | mobile hero navHeight ≥ 24    |
| A11Y-004 | P1       | fixed  | Card copy expands; no keyboard-inaccessible overflow region.                                                              | `LandingWorkSection.tsx`                                  | axe homepage                  |
| A11Y-005 | P2       | fixed  | One accessible name per nav link. CV uses `aria-label="Download CV"`.                                                     | `LandingChromeNav.tsx`                                    | unit/e2e names                |
| A11Y-006 | P2       | fixed  | AcademEase EN/HE `aria-pressed`, `lang`, `dir`.                                                                           | `AcademEaseCardVisual.tsx`; full demo                     | remediation e2e               |
| A11Y-007 | P2       | fixed  | Removed `.hero-heading` exclusion. Remaining exclusions are documented conceptual device-preview widgets only.            | `e2e/accessibility.spec.ts`                               | axe                           |
| A11Y-008 | P1       | fixed  | Mobile hero is flow layout: nav → name/role → statement → CTA → portrait. Desktop overlay preserved.                      | `LandingHeroSection.tsx`; `landing.css`                   | 320/375/390/430 overlap tests |
| A11Y-009 | P2       | fixed  | Hover/focus-visible parity on contact rows, nav, portrait.                                                                | landing CSS + contact/about                               | keyboard                      |
| RESP-001 | P1       | fixed  | Same as A11Y-008. Do not rely on `overflow-x: clip` as the pass condition.                                                | same                                                      | same                          |
| RESP-002 | P2       | fixed  | Contact heading uses `.landing-contact-heading` with a tighter clamp on short viewports.                                  | `landing.css`; `LandingContactSection.tsx`                | 320 + landscape               |
| RESP-003 | P3       | fixed  | Playwright projects: Chromium, `mobile-chrome` (remediation spec), `webkit-smoke`. Landscape + 200% zoom smokes included. | `playwright.config.ts`; `e2e/remediation.spec.ts`         | e2e                           |

---

## QA / security / content / tests

| ID       | Severity | Status | Fix                                                                                                                                                                                                                   | Files                                                                         | Tests                      |
| -------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------- |
| QA-001   | P1       | fixed  | Bandit and ATLAS on `/work`. Homepage keeps the four featured projects. Command menu restored on `/`.                                                                                                                 | `WorkIndex`; `WorkFilters`; command actions                                   | work index e2e             |
| QA-002   | P1       | fixed  | Theme toggle + command menu on landing and case-study chrome. Invalid slugs get standard chrome. Landing remains visually dark; `/about` follows theme.                                                               | `LandingChromeNav.tsx`; `ThemeToggle.tsx`; `AppShell.tsx`                     | theme axe; command e2e     |
| QA-003   | P2       | fixed  | One shortcut: `Control+K`. Shortcut opens (does not toggle). Mobile uses the trigger button.                                                                                                                          | `CommandMenuHost.tsx`; `e2e/remediation.spec.ts`; `e2e/smoke.spec.ts`         | command e2e                |
| QA-004   | P2       | fixed  | “All work” → `/work`.                                                                                                                                                                                                 | `CaseStudyHero.tsx`; command actions                                          | case-study e2e             |
| SEC-001  | P2       | fixed  | Phone moved to `externalLinks.phone: null`. UI hidden until approved.                                                                                                                                                 | `src/data/links.ts`; `LandingContactSection.tsx`; `docs/content-decisions.md` | contact null state         |
| SEC-002  | P3       | fixed  | GitHub Actions CI: format, lint, typecheck, unit, build, Playwright. A11y is inside `test:e2e`.                                                                                                                       | `.github/workflows/ci.yml`                                                    | workflow                   |
| CONT-001 | P1       | fixed  | Canonical title `Frontend & Full-Stack Developer` on metadata, hero, schema, about, contact, footer.                                                                                                                  | `portfolio.ts`; `page.tsx`; landing sections                                  | remediation + SEO          |
| CONT-002 | P1       | fixed  | Unverified IDF / SOC role removed.                                                                                                                                                                                    | `landing-data.ts`                                                             | e2e asserts absence        |
| CONT-003 | P1       | fixed  | Abra display date `2025–Present` from `experience.ts`.                                                                                                                                                                | `experience.ts`; landing-data                                                 | e2e                        |
| CONT-004 | P2       | fixed  | Education uses canonical `Graduated Oct 2024` only.                                                                                                                                                                   | `portfolio.ts`; `getLandingEducationNote()`                                   | e2e/unit                   |
| CONT-005 | P2       | fixed  | AcademEase category from `projects.ts` (`Full-Stack Web Application`).                                                                                                                                                | `landing-data.ts`                                                             | unit                       |
| CONT-006 | P1       | fixed  | Homepage reuses `CLINICAL_SAFETY_COMPACT` (demo, not validated, not for decisions, not for real patient data, not HIPAA, human review, AI never auto-confirmed, no OpenAI). Compact, not a paragraph wall.            | `projects.ts`; landing-data; work card                                        | homepage e2e               |
| CONT-007 | P1       | fixed  | Canonical `PROFESSIONAL_CONFIDENTIALITY_NOTE` via `ConfidentialityNotice`.                                                                                                                                            | `experience.ts`; `LandingWorkSection.tsx`                                     | homepage + about           |
| CONT-008 | P3       | fixed  | Profile photograph marked resolved in `missing-content.ts` and docs.                                                                                                                                                  | `missing-content.ts`; README; content-decisions                               | content-model test         |
| TEST-001 | P1       | fixed  | Product defects fixed; e2e suite expanded (`e2e/remediation.spec.ts`).                                                                                                                                                | e2e/*                                                                         | `npm run test:e2e`         |
| TEST-002 | P1       | fixed  | Vitest `pool: "threads"`, `maxWorkers: 1`, `isolate: false`, `fileParallelism: false` to stop Windows worker timeouts without hiding hangs.                                                                           | `vitest.config.ts`                                                            | `npm run test` (all files) |
| TEST-003 | P2       | fixed  | Retired `home/*` tests deleted; live landing tests remain.                                                                                                                                                            | deleted `HeroVisual.test.tsx`; moved visual redesign tests                    | unit                       |
| TEST-004 | P2       | fixed  | Coverage added for hero visibility, mobile overlap, clinical safety, confidentiality, IDF absence, `/work` discoverability, reduced motion, no-JS, command menu, 404 chrome, AcademEase pressed/lang, icons, sitemap. | `e2e/remediation.spec.ts`; a11y/seo/smoke                                     | e2e                        |

---

## Intentionally retained

- `src/data/capabilities.ts` — verified capability vocabulary; unused on the immersive homepage by copy-reduction design, not a duplicate architecture.
- `public/about/*` — live About page cutout and original photograph.
- `public/images/fullbody.png` — source for the live hero WebP.
- `MotionProvider` `domMax` — required by restored work-filter layout animations.

---

## Deferred (explicit)

1. **NEXT-003 / SEO-001** — `siteUrl: null` until a real HTTPS domain is supplied. Do not invent localhost or example.com.
2. **ARCH-003** — further Server/Client split of landing sections.
3. **TS-002** — remaining isolated casts in Reveal / View Transitions.

No other P1 is deferred.
