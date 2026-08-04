# Implementation Plan

> The lead architect must update this document after inspecting the actual repository. Do not treat this initial version as evidence of completed work.

## 1. Repository assessment

### Existing framework

- To be determined after repository inspection.

### Existing package manager

- To be determined.

### Existing styling system

- To be determined.

### Existing test setup

- To be determined.

### Existing deployment target

- To be determined.

### Conflicts with `portfolio-spec.md`

- None assessed yet.

---

## 2. Proposed architecture

The preferred architecture is Next.js App Router with React Server Components and strict TypeScript, unless the repository already contains a strong compatible foundation.

### Route plan

- `/`
- `/work`
- `/work/[slug]`
- `/about`
- `/contact`
- `not-found`

### Data plan

Centralized typed data:

- `portfolio.ts`
- `projects.ts`
- `experience.ts`
- `skills.ts`
- `links.ts`

No copy should be hard-coded repeatedly across page components.

### Component boundaries

Server Components:

- Page shells
- Static project content
- Metadata
- Static lists
- Case-study content

Client Components:

- Navigation overlays
- Command menu
- Theme switcher
- Project filters
- Interactive demonstrations
- Pointer-reactive hero details
- Architecture-diagram controls

### State strategy

Prefer local component state and URL state.

Do not add a global state library unless repository evidence shows a clear need.

### Media strategy

- Optimized local images
- HTML/CSS/SVG abstractions until real screenshots exist
- Dynamic import for heavier demonstrations
- Explicit media dimensions

---

## 3. Sequential phases

### Phase 0 — Foundation

Owner prompt:

- `docs/agents/00-lead-architect.md`

Deliverables:

- Repository assessment
- Updated implementation plan
- Essential dependencies
- Folder structure
- Routes
- Basic layout
- Strict TypeScript
- Linting
- Formatting
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

Deliverables:

- Strong project types
- Verified project content
- Experience data
- Skills data
- Missing-link behavior
- Media placeholder model
- Attribution and disclaimer fields
- Content validation helpers

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

Update these commands after package-manager inspection.

Typical npm commands:

```bash
npm install
npm run dev
npm run format
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Do not claim a command passed until it has actually been run.

---

## 5. Decision log

Agents must append decisions here instead of silently changing architecture.

| Date | Agent | Decision | Reason | Affected files |
|---|---|---|---|---|
| TBD | Lead architect | TBD | TBD | TBD |

---

## 6. Risk register

| Risk | Mitigation | Owner |
|---|---|---|
| Scope becomes too large | Build sequentially and preserve exit criteria | Lead architect |
| Generic design | Use project-specific compositions and design-system review | Design agent |
| Invented content | Centralize verified facts and validate links | Content agent |
| Excessive JavaScript | Server render static content and dynamically import demos | Architecture agent |
| Motion harms usability | Use motion budget and reduced-motion alternatives | Motion agent |
| Proprietary information leaks | Keep EL AL work high-level and anonymized | All agents |
| Clinical demo appears medically usable | Use fictional static data and persistent disclaimer | Content and demo agents |
| Mobile layouts become afterthought | Validate every phase at target widths | All agents |

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
- Hosting platform
- Custom domain
