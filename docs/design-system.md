# Design System Direction

This document defines the intended visual and interaction language. It is a constraint, not a demand to create every component immediately.

The design-system agent should update concrete token names after inspecting the repository.

## 1. Design character

The portfolio should feel:

- Editorial
- Technically precise
- Premium
- Calm
- Confident
- Contemporary
- Visually distinctive
- Highly usable

It should not feel:

- Template-driven
- Overdecorated
- Cyberpunk
- Corporate-generic
- Childish
- Dependent on animation
- Like a component-library demo

---

## 2. Visual concept

Combine a modern European editorial grid with subtle technical-system motifs.

The key tension is:

- Visual composition from photography
- Structural logic from software engineering

Use:

- Strong whitespace
- Fine rules and borders
- Carefully proportioned type
- Small monospace metadata
- Precise alignment
- Selective asymmetry
- Subtle steel/chrome references
- One controlled accent

---

## 3. Color system

Exact values should be tested for contrast before finalization.

### Light theme roles

- `--background`: warm off-white
- `--foreground`: near-black
- `--surface-1`: soft neutral
- `--surface-2`: slightly elevated neutral
- `--border-subtle`: cool gray
- `--border-strong`: darker neutral
- `--muted`: secondary text
- `--accent`: electric cobalt or another controlled cool accent
- `--accent-contrast`: text on accent
- `--success`
- `--warning`
- `--danger`
- `--focus-ring`

### Dark theme roles

- `--background`: deep graphite
- `--foreground`: warm white
- `--surface-1`: charcoal
- `--surface-2`: slightly lighter charcoal
- `--border-subtle`: muted silver
- `--border-strong`: brighter silver
- `--muted`: secondary warm gray
- Same semantic accent family
- Accessible semantic status colors

Rules:

- Color should support hierarchy, not replace it.
- Do not use gradients as decoration by default.
- Metallic references should come from border, reflection, typography, and restrained highlights.
- Never communicate state with color alone.

---

## 4. Typography

Use no more than three families.

### Sans

Purpose:

- Body
- Navigation
- UI labels
- Buttons
- Most headings

Characteristics:

- Variable
- Excellent Latin rendering
- Strong legibility
- Multiple useful weights
- Professional and contemporary

### Serif

Purpose:

- Selected statements
- Project titles
- Editorial contrast

Use sparingly.

### Monospace

Purpose:

- Technology labels
- Code
- Terminal simulation
- Architecture metadata
- Dates
- Small status labels

### Fluid scale

Use `clamp()` and avoid abrupt breakpoint-only changes.

Suggested semantic levels:

- Display
- Hero title
- Page title
- Section title
- Project title
- Body large
- Body
- Small
- Metadata
- Code

Ensure headings remain readable at 320px without clipping.

---

## 5. Spacing and layout

Create a coherent token scale.

Suggested principles:

- Compact UI spacing
- Generous section spacing
- Comfortable reading measure
- Strong vertical rhythm
- Grid alignment across sections

Large-screen content width:

- Approximately 1,400–1,500px maximum

Reading measure:

- Approximately 60–75 characters for long prose

Grid:

- 4 columns on small layouts where useful
- 8 columns on medium layouts
- 12 columns on large layouts

Use container queries for reusable project components.

Do not simply stack desktop columns on mobile. Reorder and simplify based on content importance.

---

## 6. Surfaces and borders

Prefer:

- Thin borders
- Soft tonal surfaces
- Subtle inset or reflective highlights
- Limited shadow use
- Clear layering

Avoid:

- Heavy drop shadows
- Frosted glass on every component
- Floating cards with no structural alignment
- Excessive rounded rectangles

Rounded corners should be controlled and consistent.

---

## 7. Buttons and links

Buttons should feel precise, not inflated.

Required states:

- Default
- Hover
- Focus-visible
- Active
- Disabled
- Loading where applicable

Rules:

- Minimum practical touch target around 44px
- Links must remain recognizable
- Hover must not be the only feedback
- Missing configured URLs must not create clickable elements
- The primary CTA can use the accent
- Secondary actions should be quieter

Magnetic movement is optional and must be extremely subtle.

---

## 8. Navigation design

Desktop:

- Minimal horizontal navigation
- Strong route indication
- Subtle surface after scroll
- Compact theme and command controls

Mobile:

- Clear trigger
- Full-width or full-screen panel
- Large targets
- Logical focus order
- Escape support
- Background scroll lock
- Focus restoration

---

## 9. Project visual language

Each featured project should have a distinct treatment.

### Clinical Follow-Up Detector

- Structured note-to-action transformation
- Evidence highlighting
- Architecture nodes
- Safety and review indicators
- Calm clinical-neutral language without mimicking real medical software

### AcademEase

- Schedule grid
- Multilingual and RTL transformations
- Course-material filtering
- Academic planning rhythm

### Realtime GPT CLI

- Monospace terminal
- Event timeline
- Function-call visualization
- WebSocket flow

### TapTap Avengers

- Rhythm lanes
- Timing marks
- Controlled game feedback
- No copyrighted imagery or audio

### Additional work

Use compact editorial entries rather than full-screen experiences.

---

## 10. Motion principles

Motion must:

- Explain a relationship
- Clarify state
- Reinforce hierarchy
- Reward interaction
- Remain optional

Motion must not:

- Delay reading
- Move continuously without purpose
- Hijack scroll
- Cause layout shift
- Require precise pointer control
- create nausea or distraction

Preferred properties:

- `transform`
- `opacity`
- Clip or mask only when performance remains acceptable

Reduced-motion mode:

- Remove parallax
- Remove pointer-follow effects
- Replace large transitions with instant or very short fades
- Keep state changes understandable
- Provide static alternatives for interactive demos where needed

---

## 11. Responsive principles

At every width:

- Preserve content hierarchy
- Keep interactive targets usable
- Prevent horizontal overflow
- Simplify nonessential visuals
- Recompose architecture diagrams vertically
- Avoid tiny labels
- Prevent code blocks from breaking layout
- Support both pointer and touch

Target review widths:

- 320
- 375
- 430
- 768
- 1024
- 1280
- 1440
- 1920

---

## 12. Accessibility design rules

- Focus-visible style must be part of the design
- Contrast must meet WCAG 2.2 AA
- Status cannot rely on color alone
- Motion cannot be mandatory
- Dialogs need visible close controls
- Active route should be communicated semantically and visually
- Icons need accessible names when interactive
- Decorative visuals must not pollute the accessibility tree
- Code and terminal content must remain selectable and readable

---

## 13. Internal design preview

Before full-page implementation, create a development-only showcase containing:

- Type scale
- Color roles
- Theme switching
- Buttons
- Links
- Focus states
- Tags
- Project metadata
- Surfaces
- Architecture node
- Terminal row
- Review-status item
- Mobile navigation sample

Do not deploy the preview publicly unless intentionally placed behind a development condition.
