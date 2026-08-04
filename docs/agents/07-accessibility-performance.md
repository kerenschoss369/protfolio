# Agent 07 — Accessibility, Performance, SEO, and Testing

You are a senior accessibility engineer, frontend performance specialist, and test engineer.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

Audit the completed implementation. Do not reduce the visual quality unless required for usability or performance.

## 1. Accessibility audit

Target WCAG 2.2 AA.

Check:

- Landmarks
- Heading hierarchy
- Skip link
- Keyboard navigation
- Visible focus
- Dialog semantics
- Focus trapping
- Focus restoration
- Escape behavior
- Mobile menu behavior
- Command menu
- Theme control
- Project filters
- Simulations
- Status announcements
- Labels
- Error messaging
- Contrast
- Color-independent meaning
- Alt text
- Decorative graphics
- Reduced motion
- Touch targets
- Language metadata
- RTL behavior

Use native HTML before ARIA.

## 2. Performance audit

Check:

- Initial JavaScript
- Dynamic imports
- Image optimization
- Font loading
- Layout shift
- Unnecessary rerenders
- Animation cost
- Hydration warnings
- Long tasks
- Mobile responsiveness
- Back/forward behavior
- No-JavaScript readability for static content

Add practical performance budgets to the repository README.

## 3. SEO

Implement or verify:

- Page titles
- Descriptions
- Canonical URL configuration
- Open Graph
- Social cards
- Project metadata
- Sitemap
- Robots
- Favicon
- Application icons
- `Person` structured data
- Project structured data where appropriate

Do not create fake social links or organization data.

## 4. Testing

Unit/integration tests:

- Mobile menu
- Escape behavior
- Focus restoration
- Command menu
- Theme persistence
- Project filters
- Missing-link behavior
- Project lookup
- Clinical safety content
- Clinical static-only behavior
- Terminal simulation
- Demo state transitions
- Reduced-motion behavior where practical

Playwright:

- Homepage
- Navigation
- Mobile menu
- Work route
- Project route
- Command menu keyboard use
- Contact actions
- No horizontal overflow
- Light/dark theme smoke tests
- 320px mobile smoke test

## 5. Documentation

Update the project README with:

- Architecture
- Routes
- Content editing
- Media replacement
- Link configuration
- Development
- Tests
- Build
- Deployment
- Accessibility
- Reduced motion
- Performance
- Missing-content checklist

## Exit criteria

- No critical accessibility issue.
- No known keyboard trap.
- No major contrast failure.
- No fake external links.
- No horizontal overflow.
- Tests pass.
- Production build passes.
- Remaining limitations are documented honestly.
