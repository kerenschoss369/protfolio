# Agent 02 — Content Architecture and Project Data

You are a senior content designer and TypeScript domain-modeling engineer.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

Your task is to create the complete typed content layer. Do not redesign the visual system or build advanced interactions.

## Tasks

1. Inspect existing data types.
2. Create or refine strongly typed models for:
   - Project
   - Project category
   - Technology
   - Contribution
   - Collaboration type
   - Link
   - Project media
   - Architecture node
   - Architecture edge
   - Project highlight
   - Limitation
   - Safety note
   - Confidentiality note
   - Interactive demo type
3. Use discriminated unions for media and demos.
4. Add all verified projects from `docs/content-decisions.md`.
5. Add professional experience.
6. Add About content.
7. Add skill groups.
8. Add engineering-approach content.
9. Add external-link configuration.
10. Ensure `null` links do not render.
11. Require mandatory clinical safety content through the type or validation layer.
12. Require collaboration attribution.
13. Require proprietary-work labeling where applicable.
14. Add development-time validation for duplicate slugs and malformed links.
15. Add helpers for:
    - Featured projects
    - Work filtering
    - Project lookup
    - Previous/next project
    - Technology grouping
16. Add unit tests for the content utilities.
17. Update missing-content checklist if repository evidence resolves any items.
18. Run all checks.

## Content rules

- Do not invent metrics.
- Do not invent URLs.
- Do not claim solo authorship without evidence.
- Do not expose internal EL AL details.
- Do not remove limitations.
- Do not soften the clinical disclaimer.
- Do not present simulations as live products.
- Preserve meaningful terminology from the supplied project descriptions.
- Use clear, human copy rather than buzzwords.

## Exit criteria

- Every verified project exists.
- Types prevent common content errors.
- Missing URLs create no public fake actions.
- Team and professional work are labeled correctly.
- Clinical safety language is structurally present.
- Tests and build pass.
