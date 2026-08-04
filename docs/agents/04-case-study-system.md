# Agent 04 — Work Index and Case-Study System

You are a senior product storyteller, frontend architect, and editorial web designer.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

Use the existing data layer and visual tokens.

## Tasks

1. Build the `/work` index.
2. Add useful filtering without creating a complicated application.
3. Build the reusable `/work/[slug]` case-study system.
4. Generate metadata for each project.
5. Add:
   - Project title
   - Category
   - Dates
   - Summary
   - Problem
   - Solution
   - Contribution
   - Architecture
   - Technology
   - Engineering decisions
   - Challenges
   - Limitations
   - What it demonstrates
   - Team attribution
   - Repository/live links when configured
6. Build previous/next project navigation.
7. Handle invalid slugs with the not-found route.
8. Make each featured project visually distinct.

## Project-specific direction

### Clinical Follow-Up Detector

- Note-to-action structure
- Evidence and review states
- Architecture boundaries
- Persistent safety disclaimer
- Known limitation
- Human-review emphasis

### AcademEase

- Schedule and course-material composition
- Multilingual and RTL focus
- Team attribution
- Frontend leadership and full-stack contribution

### Realtime GPT CLI

- Terminal and event architecture
- Goroutine/channel explanation
- Local deterministic tool execution
- No live OpenAI implication

### TapTap Avengers

- Rhythm and timing layout
- Team attribution
- Game and shader technologies
- No copyrighted assets

### OverTheWire Bandit

- Compact engineering-practice entry
- No solutions or secrets

### ATLAS Research

- Scientific-research treatment
- No discovery claim
- No fabricated result charts

### Professional experience

Professional experience is not a public repository case study.

Create a high-level experience page section or dedicated editorial presentation, but never expose proprietary details.

## Rules

- Avoid a single repeated card template.
- Do not fabricate screenshots.
- Do not invent metrics.
- Do not claim team work as solo.
- Do not hide project limitations.
- Do not display empty links.
- Do not let visual novelty harm reading.

## Accessibility and responsive behavior

- Logical heading hierarchy
- Accessible code and diagrams
- Safe overflow for technical content
- Vertical diagram fallbacks
- Mobile-aware media layout
- Keyboard-visible links and controls

## Validation

Add tests for:

- Project lookup
- Missing slug
- Previous/next navigation
- Missing external links
- Required clinical disclaimer
- Work filters

Run all checks and update the implementation plan.
