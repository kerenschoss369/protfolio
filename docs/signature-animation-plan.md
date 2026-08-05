# Signature Animation Plan

> Motion audit and implementation plan for the signature animation phase.
> Written before implementation. Verified facts and safety rules are unchanged.

## 1. Creative direction

Motion language: **precise, editorial, layered, technical, physically believable**.

One coherent system — not a collage of unrelated effects. Every major animation must:

1. Communicate Keren’s technical identity (Interface / Systems / AI / Visual), or
2. Explain a project, or
3. Clarify navigation / hierarchy, or
4. Reward interaction, or
5. Demonstrate a meaningful frontend technique

Avoid: generic fade-up walls, cyberpunk glow, scroll hijacking, content delayed until animation finishes, Framer-template bounce, gaming UI noise.

---

## 2. Existing animation audit

### Keep (refine lightly)

| Area                                              | Location                    | Why keep                                |
| ------------------------------------------------- | --------------------------- | --------------------------------------- |
| Motion tokens + reduced-motion collapse           | `tokens.css`, `globals.css` | Solid foundation                        |
| Progressive `Reveal`                              | `interactions/Reveal.tsx`   | SSR-visible, a11y-safe                  |
| Sticky header surface                             | `SiteHeader.tsx`            | Clear hierarchy feedback                |
| Sliding active-nav indicator                      | `SiteHeader.tsx`            | Already spring-like CSS transform       |
| Mobile nav / command overlay enter                | CSS keyframes               | Accessible; enhance choreography only   |
| Pressable / interactive-surface / link-arrow      | `globals.css`               | Good microinteraction base              |
| Theme transition class on intentional toggle      | `ThemeProvider.tsx`         | Instant on system/storage; good pattern |
| Demo-local motion (TapTap rAF, state transitions) | `demos/**`                  | Route-local; do not globalize           |
| Route-enter template (transform-only)             | `app/template.tsx`          | Content never opacity-hidden            |
| View Transition helpers                           | `lib/motion.ts`             | Present but underused                   |

### Replace / expand

| Area                      | Current                                        | Action                                                             |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| Hero entrance             | Soft opacity settle + Reveal fades             | Masked editorial phrase reveals + coordinated CTA                  |
| Hero system visual        | Static SVG + 4px glow parallax + path emphasis | Path drawing, data pulses, node states, depth layers, idle ambient |
| Hero background           | Soft radial accent wash                        | Structural grid / crop marks / coordinate marks                    |
| Featured project previews | Static compositions + border color hover       | Unique animated systems per project                                |
| Work filters              | Instant DOM swap                               | Layout reorganization with Motion layout / FLIP                    |
| Route transitions         | Template enter only; VT unused                 | Coordinated VT + shared project continuity names                   |
| Theme transition          | Color property fade                            | Circular / mask reveal from control origin                         |
| About / Contact / 404     | Editorial static                               | Signature narrative / converge / reconnect visuals                 |
| Case-study storytelling   | Static visuals                                 | Project-specific path/assembly when in view                        |
| Microinteractions         | Basic press/lift                               | Unified underline masks, border trace, status confirmations        |

### Intentionally not adding

- Custom cursor replacement
- Scroll-jacking / Lenis
- Intro loaders
- WebGL / Three.js
- GSAP / React Spring / Lottie alongside Motion
- Autoplay sound
- Magnetic buttons that displace hit targets beyond ~4px
- Shared morphs that are visually unstable (fallback to coordinated fade + accent continuity)

---

## 3. Dependency decision

### Decision: add **Motion for React** (`motion` package)

| Check                         | Result                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current stack                 | Next.js 16.3.0, React 19.2.8                                                                                                                                  |
| Compatibility                 | Motion v12+ supports React 18–19; import from `motion/react`                                                                                                  |
| Why CSS alone is insufficient | Springs, shared-layout filter reorganization, presence transitions, coordinated variants, layoutId continuity, gesture-aware springs for nodes/combo feedback |
| Alternatives rejected         | GSAP (heavier imperative), React Spring (duplicate role), Lenis (scroll hijack), Three.js (out of creative scope)                                             |
| Constraints                   | Single animation library; Client Components only; dynamic import for heavy route-local systems; LazyMotion / feature subsets where practical                  |

### Why CSS remains primary for

- Hover color / border
- Focus rings (never animated away)
- Simple opacity/transform microinteractions
- Reduced-motion collapse via tokens
- Overlay enter keyframes (already good)

### Bundle strategy

- Install `motion`
- Prefer `LazyMotion` + `domAnimation` / `domMax` only where layout animation is needed
- Keep demos route-split; do not load case-study animation modules on homepage
- Record post-build shared-client and route-chunk deltas (no invented Lighthouse scores)

---

## 4. Motion architecture

```text
src/
  components/motion/
    MotionProvider.tsx       # LazyMotion + reduced-motion context bridge
    AnimatedSection.tsx      # In-view section choreography (replaces/extends Reveal uses selectively)
    AnimatedText.tsx         # Masked phrase/line reveals (SSR text intact)
    SplitText.tsx            # Phrase-level split only (never slow character typing)
    HeroSystemVisual.tsx     # Expanded Interface/Systems/AI/Visual system
    HeroBackground.tsx       # Structural grid / crop marks
    MagneticAction.tsx       # Subtle ≤4px spring toward pointer (fine pointer only)
    PointerDepth.tsx         # Transform-only depth layers
    MotionLink.tsx           # Link with shared VT name helpers
    ScrollProgress.tsx       # Thin page progress (desktop+)
    StaggerGroup.tsx         # Shared stagger variants
    ViewTransitionLink.tsx   # Navigation wrapped in runViewTransition
    ProjectPreviewMotion/    # Per-project homepage preview systems
    WorkAtlasMotion.tsx      # Work filter layout motion
    AboutPortraitComposition.tsx  # Real portrait cutout + crop marks / grid
    AboutNarrative.tsx            # Optional abstract photography → UI narrative
    ContactConverge.tsx      # Discipline lines → CTA
    NotFoundReconnect.tsx    # Disconnected node → recovery paths
  hooks/
    useReducedMotionPreference.ts
    useFinePointer.ts
    useElementInView.ts
    usePointerPosition.ts
    usePageVisibility.ts
  lib/
    animation-config.ts      # Springs, durations, distances, budgets
    animation-variants.ts    # Shared variants
    view-transitions.ts      # Unique transition names + helpers
    motion.ts                # Extended existing helpers
```

Rules:

- No one-off abstractions used only once without justification
- Centralize springs, stagger caps, depth limits, scroll ranges
- Pause continuous animation when out of view or tab hidden
- Clean up observers, listeners, rAF, timers

---

## 5. Signature moments

### A. Hero (primary showcase)

1. Metadata line enters
2. Name reveals through vertical mask (SSR text present)
3. Role shifts into place
4. Supporting statement resolves muted → full contrast
5. CTA group as one unit
6. Hero system visual activates: SVG path draw, sequential node activation, data pulses, pointer depth (4–8px max), keyboard selection with detail panel, calm idle

Background: editorial grid lines + crop marks responding to active node — never reducing text contrast.

### B. Route transitions

- View Transitions API when supported
- Shared continuity for project title / category / accent / abstract frame when stable
- Fallback: existing template enter + coordinated opacity
- Reduced motion: instant or minimal crossfade
- Focus moves to main content meaningfully

### C. Homepage scroll storytelling

- Native scroll only
- Thin scroll progress (desktop)
- Hero paths progress with section focus where cheap
- One sticky storytelling composition max on large screens; none on mobile
- Featured previews assemble/activate in view
- No essential content gated on scroll progress

### D. Featured project previews (unique each)

| Project      | Signature behavior                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| Clinical     | Note → evidence underline → action cards → confirm + needs-review; evidence↔action hover/focus linking |
| AcademEase   | Schedule A/B layout morph + EN→HE RTL reflow with shared-layout blocks                                 |
| Realtime CLI | Event path sequence: command → WebSocket → reader → channel → multiply(6,7)=42 → response; replay      |
| TapTap       | Timing markers, beat zones, Perfect/Good/Miss, combo spring; pause offscreen; RM stepped               |

### E. Work index atlas

- Filter layout reorganization (`layout` / `layoutId`)
- Traveling category indicator
- Count updates with status announcement
- Pointer depth on fine pointer
- Instant under reduced motion

### F. Case studies

- Project-specific in-view path/assembly (dynamically imported)
- Clinical architecture path + review interrupt
- AcademEase tiles + layered architecture
- CLI concurrent goroutine paths
- TapTap timeline optional replay
- ATLAS conceptual aggregation (labeled conceptual)
- OverTheWire safe command trail (no solutions)
- Do not animate every paragraph

### G. About

Contact-sheet / crop-mark grid transforms into UI layout structure → system nodes. Readable without animation.

### H. Contact

Discipline lines converge into contact CTA; refined email-copy / CV document-slide microinteractions. No aggressive magnetism.

### I. Navigation / command

- Keep sliding indicator; enhance with spring if Motion present
- Mobile menu: panel + staggered labels (interaction not delayed)
- Command: open, result reorder, active-result travel, match emphasis

### J. Theme

Circular / editorial mask reveal from theme button (pointer) or control-centered (keyboard). Progressive enhancement; instant under RM.

### K. 404

Disconnected Interface/Systems/AI/Visual path searching for missing node; reconnects toward Home/Work. Short, no expensive loop.

---

## 6. Performance budget

| Constraint                    | Target                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| Animate                       | `transform` / `opacity` primarily                                                   |
| Continuous simultaneous loops | ≤ 2–3; pause offscreen / hidden                                                     |
| Hero depth                    | ≤ 8px; fine pointer only; no layout reads in pointer move (cached rect or relative) |
| Stagger window                | ≤ 280ms for signature entrances; ≤ 180ms for lists                                  |
| Route enter                   | ≤ 280ms; never blank screen                                                         |
| Shared client growth          | Controlled; LazyMotion; no demo code on `/`                                         |
| Third-party runtime scripts   | None beyond `motion`                                                                |
| CLS                           | No dimension animation of LCP text; reserved demo heights                           |
| Measurement                   | No repeated `getBoundingClientRect` in pointer handlers                             |

Record after implementation:

- `motion` package version + approximate gzip impact
- Shared client chunk delta
- Route-specific chunk notes
- Client Component conversions and why

---

## 7. Reduced-motion design

When `prefers-reduced-motion: reduce`:

- Disable parallax, pointer-follow, large masks/wipes, layout morphs, route morphs
- Instant theme change
- Instant filter layout swap
- Static or stepped project sequences (TapTap step mode preserved)
- Manual state switching without animation
- Keep focus feedback and stateful UI
- No “motion disabled” warning
- Polished static alternative, not a broken site

---

## 8. Responsive simplifications

| Viewport      | Behavior                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------- |
| Mobile (≤768) | No sticky storytelling; no pointer depth; reduced stagger; short durations; simplified morphs |
| Tablet        | Preserve relationships; simplify pointer                                                      |
| Desktop       | Full choreography + depth + shared continuity                                                 |

Test widths: 320, 375, 430, 768, 1024, 1280, 1440, 1920.

---

## 9. Accessibility constraints

- WCAG 2.2 AA preserved
- Never move focus for choreography
- Never hide focused content
- Never animate focus rings away
- Controls clickable during entrance
- Motion never sole state signal
- Architecture paths have textual relationships
- Project animations have static explanatory content
- No flashing / vestibular zoom
- Existing axe + keyboard suites remain green

---

## 10. Test strategy

### Unit / integration

- Reduced-motion preference hook
- Fine-pointer detection
- Animation config / budget
- Cleanup (observers, listeners, rAF, visibility)
- View Transition feature detection + fallback
- Unique transition names
- Hero node keyboard selection
- Work-filter layout state under RM vs motion
- Theme-transition fallback
- Project preview replay / state machines
- Content visible before enhancement

### Playwright

- Homepage normal + reduced motion
- Route nav + browser back
- Work → case study
- Prev/next projects
- Theme transition
- Mobile + command menus
- Keyboard-only
- Hero interaction
- Project-preview interaction
- Work filters
- All demos functional
- Content never remains hidden
- No horizontal overflow at 320px
- No console / hydration errors
- Focus visible
- 200% zoom smoke where practical

Do not assert exact pixels or millisecond timing.

---

## 11. Documentation updates

- This file (`docs/signature-animation-plan.md`) — audit + plan
- `docs/implementation-plan.md` — phase status + decision log + budget
- `docs/design-system.md` — motion language + Motion for React
- `README.md` — stack, architecture, reduced-motion, performance

---

## 12. Implementation order

1. Install `motion`; create `animation-config`, hooks, `MotionProvider`
2. Hero typography + system visual + background
3. Featured project preview systems (homepage)
4. Work atlas filters
5. Route / View Transition links + shared names
6. Case-study motion (dynamic, per slug)
7. About / Contact / 404
8. Nav / command / theme enhancements
9. Microinteraction polish
10. Tests + docs + validation + commit

---

## 13. Deferred (explicit)

- Full shared-element morphs where DOM structures remain mismatched (use coordinated fallback)
- WebGL / canvas particle fields
- Magnetic buttons beyond subtle CTA proximity
- Scroll-driven horizontal galleries on mobile
- Cinematic whole-document View Transitions
- Sound design for TapTap
- Real photography assets in About narrative (abstract frames until provided)
