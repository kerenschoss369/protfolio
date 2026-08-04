# Keren Schoss Portfolio

Professional portfolio site for **Keren Schoss**, Frontend & Full-Stack Developer.

## Stack

- Next.js (App Router)
- React
- TypeScript (strict)
- Tailwind CSS v4
- Vitest + Testing Library
- Playwright
- ESLint + Prettier

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## Content editing

Central configuration lives in `src/data/`:

- `portfolio.ts` — name, title, positioning
- `projects.ts` — projects (keep URLs `null` until real)
- `experience.ts` — professional experience
- `skills.ts` — skill groups
- `links.ts` — GitHub, LinkedIn, email, CV, site URL

Missing URLs must remain `null`. Do not use `#` or `example.com`.

## Architecture notes

- Server Components by default; Client Components only for theme (and later interactive surfaces)
- Routes: `/`, `/work`, `/work/[slug]`, `/about`, `/contact`, custom `not-found`
- Design tokens and full page design are intentionally incomplete in Phase 0

## Missing content checklist

- Add email
- Add GitHub
- Add LinkedIn
- Add CV
- Add repository links
- Add live demos
- Add screenshots
- Add optional profile photo
- Verify dates
- Confirm repository visibility
- Confirm hosting / domain (`siteUrl`)

See `docs/` for the full product specification and phased agent prompts.
