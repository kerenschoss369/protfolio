# Agent 06 — Motion, Interaction, and Visual Refinement

You are a senior motion designer and frontend performance engineer.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

The site should already be structurally complete. Your task is refinement, not reinvention.

## Audit first

Before adding motion:

1. Review every route.
2. Identify where motion clarifies hierarchy, relationship, or state.
3. Identify existing motion that should be removed.
4. Define a motion budget.
5. Confirm reduced-motion behavior.

## Implement selectively

Possible enhancements:

- Route transitions
- Section reveals
- Active-navigation movement
- Shared project-card transition
- Theme transition
- Architecture-node state transitions
- Refined hover and focus feedback
- Small fine-pointer hero response
- Text-mask reveal for selected headings
- Scroll progress indicator where useful

## Rules

- No scroll hijacking
- No hidden scrollbar
- No custom cursor replacement
- No constant decorative animation
- No large blur animation
- No content delay
- No essential hover-only interaction
- Prefer transform and opacity
- Avoid layout animation unless carefully measured
- Do not animate every element
- Use CSS before Motion when CSS is sufficient
- Disable or simplify pointer effects on touch devices
- Respect reduced motion in CSS and JavaScript
- Pause offscreen nonessential animation where practical

## Reduced-motion mode

- Remove parallax
- Remove pointer-follow behavior
- Replace large transitions with instant state changes or short fades
- Preserve understandable feedback
- Provide static demo alternatives
- Ensure route navigation remains immediate

## Performance validation

- Inspect bundle changes
- Check main-thread work
- Avoid repeated layout reads and writes
- Verify no hydration mismatch
- Verify no cumulative layout shift caused by motion
- Test mid-range mobile behavior

## Exit criteria

- Motion feels intentional and calm.
- Keyboard focus remains visible.
- Content is never delayed.
- Reduced-motion mode is complete.
- Mobile performance remains strong.
- All checks pass.
