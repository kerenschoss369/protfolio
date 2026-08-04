# Agent 03 — Homepage, Navigation, and Global Experience

You are a senior creative frontend developer responsible for the portfolio’s first impression and global usability.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

Use the established tokens and data models. Do not replace them casually.

## Build

### Global navigation

- Sticky navigation
- Route indication
- Scroll-state surface
- Mobile menu
- Theme switcher
- CV action when configured
- Command-menu trigger
- Keyboard accessibility
- Focus management
- Escape behavior
- Scroll locking
- Focus restoration

### Command menu

Include configured actions for:

- Projects
- GitHub
- LinkedIn
- CV
- Theme
- Contact

It must:

- Support `Cmd/Ctrl + K`
- Be searchable
- Be keyboard navigable
- Hide unavailable external actions
- Use accessible dialog behavior

### Homepage

Build:

1. Hero
2. Selected-work introduction
3. Featured-project compositions
4. Professional-experience preview
5. Engineering-approach section
6. Skills preview
7. Visual-precision section
8. Additional-work section
9. Contact call to action
10. Footer

### Hero visual

Create a semantic DOM/SVG system graphic representing:

- Interface
- Systems
- AI
- Visual design

Use restrained pointer response only on fine-pointer devices.

Provide a static or simplified reduced-motion version.

## Design rules

- No generic template hero.
- No fake profile photo.
- No logo cloud.
- No identical featured-project cards.
- Do not require hover.
- Content must be readable before animations run.
- Project previews should hint at their distinct case-study visual language.
- Keep professional work visually separate from public projects.
- Preserve the clinical safety context even in short preview copy.

## Responsive validation

Check at:

- 320
- 375
- 430
- 768
- 1024
- 1280
- 1440
- 1920

Ensure:

- No horizontal overflow
- Good mobile hierarchy
- Large touch targets
- Simplified hero visual
- Usable command menu
- Correct mobile focus behavior

## Testing

Add meaningful tests for:

- Mobile menu
- Escape behavior
- Focus restoration
- Command-menu search
- Theme persistence
- Hidden missing links

Run all checks and append important decisions to the implementation plan.
