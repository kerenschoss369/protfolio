# Keren Schoss Portfolio — Cursor Build Pack

This folder contains the source-of-truth documents and sequential agent prompts for building Keren Schoss’s professional software-development portfolio.

## Recommended workflow

Do not give Cursor every implementation task at once.

Use this order:

1. Add this entire `docs` folder to the repository.
2. Start with `docs/agents/00-lead-architect.md`.
3. Review the generated `docs/implementation-plan.md`.
4. Run each remaining agent prompt sequentially.
5. Commit after every successful phase.
6. Do not run agents that edit the same files in parallel.

## Files

### Source-of-truth documents

- `docs/portfolio-spec.md` — Complete product, content, design, engineering, accessibility, and quality specification.
- `docs/implementation-plan.md` — Planning template that the lead architect should update after inspecting the repository.
- `docs/design-system.md` — Visual direction, tokens, responsive rules, and motion principles.
- `docs/content-decisions.md` — Verified content, attribution rules, confidentiality constraints, and missing-link placeholders.

### Sequential agent prompts

- `docs/agents/00-lead-architect.md`
- `docs/agents/01-design-system.md`
- `docs/agents/02-content-model.md`
- `docs/agents/03-homepage-navigation.md`
- `docs/agents/04-case-study-system.md`
- `docs/agents/05-interactive-demos.md`
- `docs/agents/06-motion-refinement.md`
- `docs/agents/07-accessibility-performance.md`
- `docs/agents/08-final-review.md`

## Core rule

Every agent must read these files before changing code:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/implementation-plan.md`
- `docs/design-system.md`

The first agent is responsible for updating the implementation plan and resolving conflicts with the actual repository.

## Information that must be added later

Replace the values in the central portfolio configuration only after the real details are available:

- GitHub URL
- LinkedIn URL
- Email address
- CV file
- Public repository links
- Live demo links
- Real screenshots or videos
- Optional profile photo
- Confirmed dates where marked for verification

Never render bracketed placeholders on the public website.
