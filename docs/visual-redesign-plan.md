# Visual Redesign Plan

> Audit and redesign plan for the MotionSites-inspired visual storytelling phase.
> Written before implementation. Verified facts, safety language, confidentiality rules, and interactive demos remain intact.

---

## Audit snapshot (current site)

The portfolio already has strong foundations: verified content model, distinct project previews, Motion for React islands, demos, accessibility, and themes. The presentation problem is **density** — too many explanatory sections, repeated technology walls, and Level-3 case-study prose competing with visuals.

Current homepage section count: **9 content sections** (hero → selected-work intro → featured → experience → engineering approach → skills → visual background → additional work → contact CTA).

Estimated homepage visible word count today: ~900–1,100 words across all above-fold and scroll sections (excluding footer/nav). Target: **~400–550** immediately visible words (~40–55% reduction).

---

## 1. Sections that contain too much text

| Location               | Issue                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Homepage hero          | Supporting statement + technology list + social links stack below CTAs                                                                                       |
| Selected-work intro    | Heading + explanatory paragraph + browse CTA compete with featured cards                                                                                     |
| Featured project cards | Short description + secondary explanation + full safety paragraph (Clinical) + collaboration line                                                            |
| Experience preview     | Dual-column focus/practice lists + tech tags + confidentiality + about link inside a bordered surface                                                        |
| Engineering approach   | Four principle cards + long intro + six state tags — documentation tone                                                                                      |
| Skills preview         | Five full skill walls repeating technologies already visible on projects                                                                                     |
| Visual background      | Two paragraphs + 10 photography-connection list items                                                                                                        |
| Additional work        | Intro paragraph + full short descriptions + safety asides for each                                                                                           |
| Contact CTA            | Heading + paragraph + up to five buttons duplicating Contact page                                                                                            |
| About page             | Summary + three biography paragraphs + full experience list + background + approach + full skill walls                                                       |
| Case studies           | Problem, solution, highlights, demonstrates, contribution, architecture, technology, decisions, challenges, limitations, reliability — sequential prose wall |
| Work index             | Long intro; cards show full shortDescription + tags + safety excerpt                                                                                         |

---

## 2. Copy that can be removed

**Homepage**

- Hero supporting statement (redundant with positioning line)
- Hero technology metadata list (Angular…Go) — visible in projects/experience
- Hero social link row (GitHub/LinkedIn/Email) — keep in nav, contact, footer
- Engineering approach section (entire section on homepage)
- Visual background section (entire section on homepage; keep photography story on About)
- Additional work section (move entirely to Work page compact list)
- Skills wall of every technology (replace with five capability groups)
- Contact CTA duplicate explanation + every external button (keep one CTA to `/contact`)
- Selected-work explanatory paragraph about “four featured compositions…”
- Featured AcademEase second paragraph (“Led frontend… Team project”)
- Featured Realtime CLI second paragraph (offline notice → compact tag/label on visual)
- Featured TapTap second paragraph (team/copyright note → case study + compact label)
- Experience “Focus areas” and “Practice” dual lists
- Experience “More about the background” link (About remains in nav)

**About**

- Engineering approach repeat (optional disclosure only, or omit — already documented in data)
- Full skill tag walls
- Third biography paragraph merged into one short photography line

**Case studies**

- Separate “What this demonstrates” panel on first paint
- Full technology stack section on first paint (show 3–5 in hero meta)
- Full highlights list on first paint
- Reliability tag cloud as its own section (fold into Technical details)

---

## 3. Copy that can be shortened

| Current                   | Proposed                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Hero statement (long)     | “I build polished digital products through frontend engineering, full-stack systems, AI integration, and a strong visual eye.” |
| Selected-work heading     | “Selected work” + one short sentence: “Interfaces, systems, and AI — presented visually.”                                      |
| Experience heading        | “Frontend Developer · Abra” with one-line EL AL context                                                                        |
| Contact headline          | “Let’s build something precise, useful, and memorable.”                                                                        |
| About total visible prose | ~100–160 words: one personal + one engineering paragraph                                                                       |
| Clinical homepage safety  | Compact warning chip + one-line: “Demo only · human review required” (full notice on case study)                               |
| Work page intro           | One sentence                                                                                                                   |
| Project card summaries    | Keep `shortDescription` at 1–2 sentences; trim any longer                                                                      |

---

## 4. Copy that should move into expandable details

| Content                            | Disclosure                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| Full clinical safety notices list  | Case study: compact summary visible; full list in “Safety details” `<details>` |
| Architecture node responsibilities | Architecture visual + “Architecture details” disclosure                        |
| Full technology groups             | “Technical details” disclosure                                                 |
| Engineering decisions beyond top 3 | Top 3 visible; remainder in disclosure                                         |
| Challenges / full limitation prose | One challenge + one limitation visible; rest in disclosure                     |
| “What this demonstrates”           | Inside Technical details                                                       |
| Product highlights / capabilities  | Technical details or demo section lead                                         |
| About education timeline detail    | Compact timeline visible; longer summaries optional                            |
| Engineering principles             | About optional disclosure or omit from About first paint                       |

---

## 5. Copy that should remain only on case-study pages

- Full problem / solution paragraphs
- Contribution attribution detail
- Architecture diagrams and highlights
- Engineering decisions
- Challenges and limitations
- Interactive demos and simulation notices
- Full clinical safety guarantees
- Technology stack groups
- Program context (ATLAS)
- Repository / documentation links
- Reliability / validation notes

Homepage cards: number, title, category, one sentence, ≤5 techs, CTA, mockup only.

---

## 6. Sections that should be merged

| Merge                                   | Into                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| Selected-work intro + featured projects | One continuous selected-work canvas with a one-line statement above sticky cards |
| Visual background + About preview       | About page (and a short homepage About preview with portrait)                    |
| Experience dual lists                   | Single contribution sentence + tech meta + confidentiality                       |
| Skills groups (5 walls)                 | Five capability cards with title, phrase, 3–5 representative techs               |
| Case-study problem + solution           | Compact two-column split with short paragraphs                                   |
| Case-study challenges + limitations     | One challenge + one limitation module                                            |
| Contact CTA external buttons            | Single “Contact” primary + optional email secondary                              |

---

## 7. Sections that should be removed (from homepage)

1. **EngineeringApproachSection** — remove from `/`
2. **VisualBackgroundSection** — remove from `/`
3. **AdditionalWorkSection** — remove from `/` (remain on `/work`)
4. Hero technology list and social row
5. Skills as a full vocabulary wall (replace, don’t delete capability story)

About page: remove or collapse the duplicate full skills wall and engineering approach list from first paint.

---

## 8. New whitespace strategy

- Increase `--space-section` rhythm for major beats (~clamp 5–10rem)
- Featured sticky cards: generous scroll canvas (~100–140vh per card on desktop), content not cramped
- Hero: fewer elements, larger gaps between name / role / statement / CTAs; keep CTAs in first laptop viewport
- Reduce nested `Surface` boxes; prefer open composition with fine rules
- One dominant idea per section: Visual → short text → pause → next
- Case studies: large gaps between remaining modules; fewer borders
- Footer: minimal padding and copy
- Avoid meaningless empty regions — whitespace serves hierarchy and mockup scale

---

## 9. New homepage structure

1. **Minimal hero** — name, role, one positioning line, View work + CV/Contact, location meta, signature system visual
2. **Selected-work statement** — one short line
3. **Featured sticky project stack** — Clinical, AcademEase, Realtime GPT CLI, TapTap (image-led)
4. **Professional experience strip** — compact Abra / EL AL
5. **About preview** — portrait cutout + ~40–60 words + link to About
6. **Capabilities** — five compact groups (not skill walls)
7. **Contact CTA** — one line + one primary action
8. **Minimal footer**

---

## 10. New Work-page structure

1. Short page title + one-sentence intro
2. Filter atlas with layout motion (existing, refined)
3. Large visual project items: number, mockup/preview accent, title, category, one-line summary, ≤5 techs, CTA
4. Compact additional/practice/research entries
5. Separate professional work section (unchanged confidentiality rules)

Fewer tags on cards; clinical safety as compact chip linking to case-study safety section.

---

## 11. New case-study structure

1. Project hero (title, category, one-sentence summary, links)
2. Large product mockup
3. Compact problem / solution split
4. Contribution summary (short)
5. Architecture visualization
6. Three engineering decisions
7. Interactive demo (when present)
8. One limitation or safety note (clinical: safety always visible in condensed form)
9. “Technical details” disclosure (stack, demonstrates, remaining decisions/challenges)
10. Next project

Preserve all verified facts in data; change presentation density only.

---

## 12. New animated-card strategy

- Desktop (`min-width: 64rem`) + no reduced motion: sticky stack of 3–4 featured cards
- Sticky card scales previous to ~0.96–0.98 with small Y offset; transform/opacity only
- Max ~4 cards; no scroll hijacking; pin duration moderate
- Mobile / tablet / reduced motion: simple stacked large cards, no scale layering
- Focus: sticky cards must not obscure focused controls; z-index and padding prevent coverage
- Project number as bold editorial metadata (`01`–`04`)
- Project-specific accent on mockup frame border / number

---

## 13. New image and mockup strategy

Device frames (browser / laptop / terminal / monitor / phone) wrapping existing abstract previews and Motion preview systems — not empty rectangles.

| Project          | Mockup                                                     |
| ---------------- | ---------------------------------------------------------- |
| Clinical         | Laptop/browser: note, evidence, action cards, needs-review |
| AcademEase       | Laptop + phone/tablet: schedule + RTL cue                  |
| Realtime GPT CLI | Terminal/desktop: command + event path                     |
| TapTap           | Widescreen monitor: lanes, score, combo, feedback          |
| Bandit           | Compact terminal                                           |
| ATLAS            | Conceptual analysis shape                                  |

Use real portrait cutout on About and homepage About preview. No MotionSites assets, no stock photos, no fabricated production screenshots.

---

## 14. MotionSites-inspired ideas to use

- Large visual canvases and image-led project storytelling
- Sticky stacking project cards with subtle scale/layer
- Animated / composed device frames
- Scroll-linked section reveals and micro moments (masks, numbers, underlines)
- Strong project numbering and visual rhythm
- Magnetic / pointer-reactive CTAs (existing ≤4px budget)
- Section-scale composition and breathing room
- Masked heading reveals (existing AnimatedText)

Translate into warm paper / graphite, steel, cobalt editorial language.

---

## 15. MotionSites-inspired ideas to avoid

- Exact black 3D-creator aesthetic
- Exact typography, card shape, gradient buttons, section order
- External/hotlinked images
- Literal copy of timing curves
- WebGL / Three.js / Lenis / GSAP / Lottie
- Scroll hijacking or extremely long pinned sections
- Cyberpunk glow overload

---

## 16. Mobile simplification

- No sticky stacking
- Single-column project cards with mockup above or below text
- Shorter staggers; no pointer depth
- Hero visual simplified (existing)
- Portrait prominent but not overlapping text illegibly
- Large CTAs; no horizontal overflow
- Case-study disclosures stay usable at ~44px targets

---

## 17. Accessibility plan

- Preserve WCAG 2.2 AA, keyboard, focus-visible, landmarks, one `h1`
- Sticky stack disabled under reduced motion and for coarse pointers / narrow viewports
- Focused controls never covered by next sticky card
- Clinical safety remains available without hover
- Decorative device chrome `aria-hidden`; mockup captions where needed
- Portrait meaningful alt text (existing AboutPortraitComposition)
- Disclosures use native `<details>` / accessible buttons
- Demos remain functional; no animation-only state
- Existing axe + keyboard e2e suites must stay green

---

## 18. Performance budget

| Constraint      | Target                                                                  |
| --------------- | ----------------------------------------------------------------------- |
| Hero text       | Immediate SSR; no opacity-gated LCP                                     |
| Motion          | Keep existing `motion` package; no second library                       |
| Sticky cards    | CSS sticky + transform; Client island only for stack                    |
| Mockups         | Reserved aspect ratios; lazy below fold where practical                 |
| Demos           | Remain route-local dynamic imports                                      |
| Animation       | transform/opacity; pause offscreen; no heavy blur                       |
| Bundle          | Document shared-client delta after build; no invented Lighthouse scores |
| Observers / rAF | Clean up on unmount                                                     |

Motion for React already present — use for sticky scale, layout filters, springs. Do not add GSAP/Lenis/Three/Lottie.

---

## Implementation order

1. Content/copy updates in `portfolio.ts` + homepage section composition
2. Device mockup primitives + sticky featured stack
3. Homepage sections (experience strip, about preview, capabilities, contact)
4. Work page visual cards
5. Case-study simplification + disclosures
6. About / Contact / footer / spacing tokens
7. Tests + validation + docs update + commit

---

## Success criteria

- Five-second hero comprehension
- ~40–60% less homepage visible copy
- Case studies less text-first; mockup-led
- Sticky stack on desktop; simple cards on mobile
- Portrait integrated
- Safety, confidentiality, demos, themes, reduced motion preserved
- Validation suite green; commit `feat(portfolio): redesign visual storytelling`
