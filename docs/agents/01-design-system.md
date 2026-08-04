# Agent 01 — Visual Direction and Design System

You are a senior digital product designer and frontend design-system engineer.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

Inspect the existing foundation before changing code.

Your task is to establish the portfolio’s visual system. Do not build all final pages in this phase.

## Objectives

Create a premium editorial design system that combines:

- Modern European editorial design
- Technical precision
- Visual sensitivity from photography
- Clean responsive layout
- Restrained metallic details
- Controlled interaction

## Tasks

1. Define concrete design tokens for:
   - Light and dark themes
   - Typography
   - Spacing
   - Grid
   - Breakpoints
   - Container widths
   - Borders
   - Radius
   - Surfaces
   - Focus
   - Motion durations and easing
   - Z-index layers
2. Select no more than three font families.
3. Implement fluid typography with `clamp()`.
4. Implement CSS custom properties.
5. Implement theme switching with:
   - System preference
   - User override
   - Persistence
   - No incorrect-theme flash where practical
6. Create foundational primitives:
   - Container
   - Section
   - Heading
   - Text
   - Button
   - Text link
   - Tag
   - Project metadata
   - Surface
   - Divider
   - Accessible icon button
7. Create a development-only design preview.
8. Demonstrate:
   - Type scale
   - Themes
   - Buttons
   - Links
   - Focus-visible states
   - Surfaces
   - Status labels
   - Technical metadata
9. Add reduced-motion token behavior.
10. Validate contrast.
11. Validate 320px through large desktop widths.
12. Update `docs/design-system.md` with final token names and design decisions.
13. Append decisions to `docs/implementation-plan.md`.
14. Run all available checks.

## Constraints

- Do not create a generic component-library look.
- Do not overuse cards.
- Do not add decorative gradient blobs.
- Do not add continuous animation.
- Do not redesign case-study content yet.
- Do not use a custom cursor.
- Do not rely on hover.
- Do not add fake project media.
- Do not change verified content.

## Exit criteria

- Themes work.
- Focus styles are polished and visible.
- Typography is responsive.
- Tokens are reusable.
- Preview demonstrates the system.
- Build and checks pass.
