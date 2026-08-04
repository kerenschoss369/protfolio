# Portfolio Product Specification

## 1. Product goal

Build a complete, production-quality professional portfolio website for **Keren Schoss**, a **Frontend & Full-Stack Developer**.

The result must feel as though it was designed and engineered by an exceptionally experienced creative frontend developer in 2026. It must not resemble a generic portfolio template or a collection of prebuilt cards.

The website should demonstrate:

- Production frontend engineering
- Responsive design
- Advanced but purposeful interaction design
- Modern React and CSS knowledge
- Maintainable component architecture
- Accessibility
- Performance optimization
- Full-stack understanding
- AI-integration experience
- Visual precision influenced by Keren’s professional photography background
- Clear technical storytelling

Do not invent employers, technologies, metrics, user counts, awards, responsibilities, project outcomes, or business impact.

When information is missing, store an explicit placeholder in centralized configuration. Do not publicly display fake values.

---

## 2. Working principles

Before implementation:

1. Inspect the existing repository.
2. Read this specification completely.
3. Read `docs/content-decisions.md`.
4. Preserve useful existing architecture where appropriate.
5. Document conflicts between this specification and the repository.
6. Build sequentially rather than attempting every feature at once.
7. Run formatting, linting, type checking, tests, and a production build after each major phase.
8. Validate mobile, tablet, desktop, keyboard, reduced-motion, and no-JavaScript behavior where practical.
9. Fix errors rather than hiding or ignoring them.
10. Keep professional work, public projects, and simulations clearly distinguished.

---

## 3. Preferred technology

Use the latest stable and mutually compatible versions available when implementation begins.

Preferred stack:

- Next.js with App Router
- React
- TypeScript in strict mode
- Tailwind CSS for layout utilities and design tokens
- Custom CSS for advanced visuals and modern CSS demonstrations
- Motion for React for interactions that genuinely require it
- Native CSS transitions for simple effects
- Structured TypeScript data or MDX for case studies
- `next/image`
- `next/font`
- Lucide icons or a similarly lightweight accessible icon library
- ESLint
- Prettier
- Vitest and Testing Library
- Playwright for critical navigation and responsive checks

Use:

- React Server Components by default
- Client Components only where interaction requires them
- Semantic HTML
- CSS custom properties
- Fluid type and spacing with `clamp()`
- Container queries
- Feature detection and progressive enhancement
- Native View Transitions when stable and supported
- CSS scroll-driven animation when appropriate
- Dynamic imports for heavier project demonstrations
- `prefers-reduced-motion`
- Pointer and hover media queries

Do not add a CMS, database, authentication system, state library, or backend unless a verified requirement demands it.

Do not build the website primarily from a generic UI component library.

---

## 4. Creative direction

The visual identity should combine:

- Modern European editorial design
- Premium technology-product aesthetics
- A precise responsive grid
- Strong typography
- Generous whitespace
- Subtle metallic or chrome-inspired details
- Controlled motion
- A photographer’s sense of composition
- Clean, sophisticated presentation

The experience should feel intelligent and distinctive rather than loud.

### Light theme

- Warm off-white background
- Near-black typography
- Soft gray surfaces
- Restrained steel details
- One deliberate accent, preferably electric cobalt or another carefully chosen cool accent

### Dark theme

- Deep graphite background
- Warm white typography
- Layered charcoal surfaces
- Muted silver borders
- The same accent used sparingly

### Typography

Use no more than three font families:

- Variable sans-serif for UI and body copy
- Refined editorial serif for selected statements and titles
- Monospace for technical labels, code, terminal content, and metadata

### Layout

- Mobile-first
- Responsive 12-column editorial grid on large screens
- Strong alignment and occasional controlled asymmetry
- Large but controlled headings
- Maximum content width around 1,400–1,500 pixels
- Comfortable paragraph width
- Fluid spacing
- Project layouts tailored to each project

### Avoid

- Generic gradient blobs
- Neon cyberpunk styling
- Excessive glassmorphism
- Huge rotating 3D objects
- Constant background motion
- Scroll hijacking
- Long intro loaders
- Floating technology-logo clouds
- Skill percentage bars
- Fake testimonials or logos
- Stock headshots
- Fake screenshots
- A wall of identical project cards
- Animations that delay content

If no profile photograph is available, use a refined `KS` monogram or abstract generative composition. Never fabricate a portrait.

---

## 5. Positioning and core copy

### Name

Keren Schoss

### Title

Frontend & Full-Stack Developer

### Hero direction

Use a concise statement based on:

> I build precise, scalable digital products—combining production frontend experience, full-stack engineering, AI integration, and a photographer’s eye for composition.

Refine the wording naturally, but preserve the meaning and avoid exaggerated marketing language.

### Supporting positioning

Communicate that Keren:

- Develops production features in a large Angular/Nx web platform
- Works with TypeScript, RxJS, SCSS, REST APIs, responsive interfaces, and complex user flows
- Has built full-stack products with React, Node.js, Python, FastAPI, MongoDB, SQLite, and OpenAI integrations
- Debugs production behavior and integrates frontend applications with backend services
- Brings visual sensitivity from professional fashion photography
- Values precision, usability, maintainable architecture, and thoughtful product experiences

### Calls to action

Primary:

- View selected work

Secondary:

- Download CV

Additional:

- GitHub
- LinkedIn
- Email

All values must come from central configuration:

- `githubUrl`
- `linkedinUrl`
- `email`
- `cvPath`

A missing value must result in a hidden or disabled action with no fake URL.

---

## 6. Routes

Build:

- `/`
- `/work`
- `/work/[slug]`
- `/about`
- `/contact`
- Custom `not-found` page

The homepage should include:

1. Navigation
2. Hero
3. Selected-work introduction
4. Featured projects
5. Professional-experience preview
6. Engineering approach
7. Skills
8. Visual-background section
9. Additional projects
10. Contact call to action
11. Footer

Do not force all detailed case-study content onto the homepage.

---

## 7. Navigation

Create a refined sticky navigation with:

- Keren Schoss or `KS` monogram
- Work
- About
- Contact
- Theme switcher
- Download CV
- Command-menu trigger

Behavior:

- Minimal at page top
- Gains a subtle surface and border after scrolling
- Clearly indicates current route
- Fully keyboard accessible
- Mobile menu uses a carefully animated full-width panel
- Correct scroll locking
- Escape closes overlays
- Focus is trapped where required and restored when closed
- Correct ARIA attributes

Create a searchable `Cmd/Ctrl + K` command menu containing actions for:

- Featured projects
- GitHub
- LinkedIn
- CV
- Theme
- Contact

Only show actions whose required URLs exist.

---

## 8. Hero

The hero should include:

- Keren Schoss
- Frontend & Full-Stack Developer
- Main statement
- Supporting copy
- Primary and secondary actions
- A restrained location line: Tel Aviv, Israel
- Selected technologies as metadata, not a logo cloud

Create an original interactive visual representing:

- Interface
- Systems
- AI
- Visual design

Suggested direction:

A responsive semantic DOM/SVG node-and-path composition that combines a system diagram with an editorial graphic.

Requirements:

- No heavy 3D engine
- Minimal idle motion
- Pointer response only on fine-pointer devices
- Keyboard-accessible focus where nodes are interactive
- Reduced-motion alternative
- Strong mobile composition
- Readable content before JavaScript loads

---

## 9. Project presentation rules

Do not render every project using the same generic layout.

Each project must support:

- Title
- Slug
- Dates or year
- Category
- Short description
- Problem
- Solution
- Contribution
- Architecture or implementation highlights
- Technology stack
- Key engineering decisions
- Challenges
- Limitations
- What it demonstrates
- Repository URL
- Live-demo URL
- Media
- Related case-study route
- Team attribution
- Confidentiality or safety note where relevant

Clearly distinguish:

- Verified functionality
- Technical decisions
- Team contribution
- Personal contribution
- Known limitations
- Static portfolio simulations
- Professional proprietary work

Never imply that a team project was completed alone.

---

## 10. Verified projects

### 10.1 Clinical Follow-Up Detector

**Slug:** `clinical-follow-up-detector`  
**Category:** Full-Stack AI Application

#### Summary

A demonstration application that analyzes fictional clinical text notes and extracts explicit treatment and follow-up instructions into structured, reviewable actions.

#### Mandatory safety language

- Demonstration system only
- Not clinically validated
- Not for medical decision-making
- Not for real patient data
- Not HIPAA compliant
- All extracted actions require human review
- AI output is never automatically confirmed

#### Problem

Clinical notes may bury explicit follow-up instructions inside unstructured prose. The application surfaces those instructions as structured actions that a human can review, edit, confirm, reject, or mark complete.

#### Technology stack

Frontend:

- React
- TypeScript
- Vite
- Vitest
- Testing Library

Application API:

- Node.js
- Express
- TypeScript
- Zod
- better-sqlite3

AI service:

- Python
- FastAPI
- Pydantic
- OpenAI SDK

Database:

- SQLite

#### Implemented functionality

- Note text input
- `.txt` upload with client-side validation
- Analyze flow
- Loading and error states
- Structured action cards
- Evidence display
- Needs-review state
- Review-reason display
- Confirm
- Reject
- Edit
- Complete
- Persistence
- Reload through `GET /api/notes/:noteId`
- URL-based reload using `noteId`
- Manual reload using note ID
- Automated tests across React, Node, and Python

#### Architecture

- React communicates only with the Node API
- Browser never directly calls Python or OpenAI
- Node is the application boundary
- Node owns validation, IDs, workflow rules, errors, and SQLite persistence
- Python is an isolated AI service
- Python owns prompts, model communication, structured parsing, and AI-specific validation
- LLM output is treated as untrusted input
- Node validates AI-service responses with Zod
- Python validates structured output with Pydantic
- Evidence is verified against the submitted note
- Uncertain output is flagged for human review
- Analyze writes note and actions atomically in SQLite
- Invalid AI output creates no partial record
- New actions begin pending
- Only confirmed actions can be completed
- Rejected actions cannot be completed

#### Security and reliability

- Provider credentials stay server-side
- Prompts and credentials are not exposed to the browser
- Prompt-injection text is treated as untrusted note content
- LLM is only an extraction component
- Validation, workflow, persistence, and review rules remain deterministic
- Tests mock the LLM

#### Known limitation

Saved notes can be restored from the URL or manual note entry, but the app does not automatically remember the most recently opened note when no `noteId` exists.

#### Portfolio simulation

Create a static demonstration using fictional data only.

Example fictional note:

> Repeat CBC in seven days and schedule an oncology follow-up next month.

Allow the visitor to switch between:

- Source note
- Extracted actions
- System architecture

The simulation must never call OpenAI and must not accept arbitrary medical data.

Architecture diagram:

- React → Node API → Python AI service → OpenAI
- Node API → SQLite

Each architecture node should be keyboard focusable and reveal its responsibility.

---

### 10.2 AcademEase

**Slug:** `academease`  
**Dates:** 2023–2024  
**Category:** Full-Stack Web Application

#### Summary

A student platform that centralizes academic course materials and helps students create and compare personalized semester schedules.

#### Product areas

Personalized Drive:

- Past exams
- Summaries
- Questions and answers
- Filtered course-content browsing

Schedule Builder:

- Plan future semesters
- Use preferences
- Save schedule options
- Compare saved schedules

#### Technology

- React
- TypeScript
- FastAPI
- MongoDB
- AWS EC2
- AWS S3

#### Capabilities

- College-email login
- Registration
- Profile
- Password reset
- Persistent authentication
- Schedule creation
- Saved-schedule comparison
- Course-content browsing
- Filtering
- English, French, and Hebrew UI
- RTL support
- Responsive interfaces

#### Contribution

- Led frontend development after independently learning React
- Built significant interface and user-flow areas
- Contributed to backend work
- Contributed to deployment work
- Team project; never describe it as solo

#### Portfolio simulation

Create a static semantic HTML/CSS Grid schedule preview.

Visitors can:

- Switch between two fictional saved schedules
- Toggle English and Hebrew to show RTL adaptation
- Filter a small fictional set of course materials

Clearly label this as a portfolio simulation.

---

### 10.3 Realtime GPT-4o-mini CLI

**Repository name:** `go-home-assignment`  
**Slug:** `realtime-gpt-cli`  
**Category:** Go / Realtime AI / CLI

#### Summary

A Go command-line application that connects to OpenAI’s realtime API over WebSocket, consumes streamed events, and supports local function calling.

#### Technology

- Go
- WebSockets
- Goroutines
- Channels
- JSON event handling
- Environment variables
- OpenAI realtime API
- Function calling

#### Verified implementation

- Reads API key from `OPENAI_API_KEY`
- Connects to the realtime GPT-4o-mini WebSocket endpoint
- Accepts terminal prompts until `exit`
- Reader goroutine continuously reads the connection
- Incoming JSON events are decoded
- Events are sent through a channel
- Main goroutine sends requests and consumes events
- Sends `conversation.item.create`
- Sends `response.create`
- Implements local `multiply(a, b)`
- Buffers streamed function-call arguments
- Executes multiplication locally
- Sends function-call output to the model
- Sends another response request for the final answer

Never expose an API key.

#### Portfolio simulation

Create a deterministic browser terminal with:

- `hi`
- `6*7`
- `architecture`
- `exit`

For `6*7`, show:

1. User message
2. Function-call request
3. Local multiply execution
4. Function output
5. Final assistant response

Optional event-flow timeline is allowed.

The simulation must not contact OpenAI.

---

### 10.4 TapTap Avengers

**Slug:** `taptap-avengers`  
**Dates:** August–October 2024  
**Category:** Unity Game Development

#### Summary

A team-built recreation inspired by Tap Tap rhythm gameplay.

#### Technology

- Unity
- C#
- ShaderLab
- HLSL

#### Implemented areas

- Rhythm-game mechanics
- Audio synchronization
- Beat mapping
- Custom 2D animation
- Multiplayer functionality
- Scoring
- Song selection
- Shader work

Never claim sole authorship.

#### Portfolio simulation

Build a lightweight, silent rhythm interaction:

- Keyboard and pointer controls
- Timing feedback: Perfect, Good, Miss
- No copyrighted music
- No autoplay audio
- Reduced-motion static alternative

Keep it small and supportive of the case study.

---

### 10.5 OverTheWire Bandit

**Slug:** `overthewire-bandit`  
**Category:** Linux and Security Practice

#### Summary

Completed all 33 levels of the OverTheWire Bandit wargame.

#### Skills

- Linux command line
- SSH
- File permissions
- Shell commands
- Text processing
- Basic scripting logic
- System exploration
- Problem solving
- Security fundamentals

Present this as additional engineering practice, not a primary product case study.

Never publish passwords, flags, or challenge solutions.

---

### 10.6 ATLAS Research Project

**Slug:** `atlas-research`  
**Category:** Scientific Computing and Research

#### Context

Alpha Research Program in the Sciences at Tel Aviv University.

#### Project

ATLAS two-photon invariant-mass analysis related to evidence for the Higgs boson.

#### Relevant elements

- C++
- Scientific data analysis
- Large datasets
- Research methodology
- Physics context
- Analytical problem solving

Do not imply discovery credit.

Use a restrained data-visualization-inspired visual, not fabricated scientific results.

---

## 11. Professional experience

### Frontend Developer — Abra

**Product context:** EL AL Airlines web platform  
**Dates:** 2025–Present, subject to final verification

#### Verified experience

- Developed production features in a large Angular/Nx monorepo
- Worked with Angular, TypeScript, RxJS, SCSS, and REST APIs
- Built and maintained responsive, pixel-precise interfaces
- Worked on booking and passenger-management experiences
- Implemented and debugged complex reactive flows
- Integrated frontend behavior with backend API models
- Investigated production issues
- Used Git and Bitbucket
- Handled rebasing and merge conflicts
- Participated in pull requests and code reviews
- Used Jira and Confluence
- Collaborated with backend, product, design, and QA

Possible high-level areas:

- Manage My Booking
- Passenger management
- Flight-related user journeys
- Forms and validation
- API integration
- State and reactive behavior
- Responsive behavior
- Production debugging

Mandatory confidentiality note:

> Professional work is described at a high level. Source code and internal product details are proprietary.

Do not expose:

- Proprietary code
- Internal ticket numbers
- Internal URLs
- Non-public architecture
- Replicas of the production interface
- Fake public repositories
- Invented metrics

---

## 12. About

Position Keren as:

- Frontend and Full-Stack Developer
- Production Angular developer
- Experienced with React, Node.js, Python, FastAPI, MongoDB, SQLite, Go, and AI integrations
- Former professional fashion photographer from 2014–2020
- Visually precise
- Product-minded
- Curious and independently motivated
- Focused on maintainability and user experience

Connect photography experience to:

- Composition
- Hierarchy
- Spacing
- Color relationships
- Visual rhythm
- Retouching precision
- Art direction
- Responsive layout
- Pixel-precise implementation
- Designer collaboration

Avoid clichés such as:

- I turn coffee into code
- Ninja
- Rockstar
- Pixel pusher
- Creating magic
- Code is my passion

---

## 13. Skills

Do not use percentages or self-ratings.

### Production frontend

- Angular
- TypeScript
- JavaScript
- RxJS
- SCSS
- HTML
- Responsive Design
- Component Architecture
- REST API Integration
- Nx Monorepo
- Debugging
- Reactive Forms
- Cross-device UI development
- Pixel-precise implementation

### Full-stack and backend

- React
- Node.js
- Express
- FastAPI
- Python
- MongoDB
- SQLite
- Zod
- Pydantic
- Client-server communication

### AI engineering

- OpenAI API integration
- Structured AI output
- Function calling
- Prompt construction
- AI-output validation
- Human-review workflows
- Evidence validation
- Prompt-injection awareness
- AI-assisted debugging
- AI-assisted refactoring
- Cursor

### Additional languages and systems

- Go
- C#
- C++
- C
- Linux
- Git
- WebSockets
- Unity
- ShaderLab
- HLSL

### Workflow

- Git
- Bitbucket
- Jira
- Confluence
- Code reviews
- Merge-conflict resolution
- Agile collaboration
- Production debugging
- Cross-functional collaboration

---

## 14. Engineering approach

Create a section based on four principles:

### Understand the flow

Map user journeys, states, contracts, and failure paths before polishing the interface.

### Design for real states

Build loading, empty, error, validation, success, and recovery behavior.

### Treat boundaries seriously

Validate data between client, application API, backend services, and AI systems.

### Refine the experience

Improve responsiveness, accessibility, hierarchy, feedback, and maintainability.

---

## 15. Required interactions

- Smooth route transitions
- Section reveals
- Active-navigation indicator
- Project-card hover and focus states
- Theme transition
- Accessible command menu
- Project filtering
- Expandable architecture diagrams
- Responsive project media
- Keyboard-accessible simulations
- Meaningful loading and empty states
- Reduced-motion alternatives

Rules:

- Every hover interaction needs a keyboard equivalent
- Essential content must never depend on hover
- Prefer transform and opacity animation
- No custom cursor replacement
- No scroll hijacking
- No hidden scrollbar
- No autoplay sound
- Pause nonessential animation outside the viewport where practical

---

## 16. Responsive requirements

Test at approximately:

- 320px
- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Requirements:

- No horizontal overflow
- No clipped titles
- Readable metadata
- Touch targets around 44px minimum
- No hover-only mobile interaction
- Vertical architecture-flow fallback
- Safe table handling
- Mobile-friendly simulations
- Simplified hero visual on mobile
- Container queries where useful
- Reasonable landscape behavior

Do not merely stack every desktop component without reconsidering hierarchy.

---

## 17. Accessibility

Target WCAG 2.2 AA.

Implement:

- Semantic landmarks
- Logical headings
- Skip link
- Visible focus
- Keyboard navigation
- Accessible dialogs
- Focus trapping when required
- Focus restoration
- Escape behavior
- Correct native semantics
- Accessible names
- Form labels
- Error descriptions
- Status announcements
- Sufficient contrast
- No color-only meaning
- Reduced-motion mode
- Correct language metadata
- Appropriate alt text
- Decorative image handling
- Minimal and correct ARIA

Test navigation, command menu, filters, theme switcher, simulations, and contact actions by keyboard.

---

## 18. Performance

Target excellent Core Web Vitals.

- Keep initial JavaScript small
- Server-render static content
- Dynamically import demonstrations
- Lazy-load below-the-fold media
- Reserve media dimensions
- Optimize images
- Subset fonts
- Avoid unnecessary rerenders
- Prefer CSS for simple animation
- Avoid hydration mismatches
- Avoid layout thrashing
- Preserve back/forward navigation
- Remain functional without optional animation APIs

Document performance decisions and budgets in the project README.

---

## 19. SEO

Implement:

- Page-specific titles and descriptions
- Configurable canonical site URL
- Open Graph metadata
- Social-card metadata
- Project metadata
- Sitemap
- Robots file
- Structured `Person` data
- Appropriate `CreativeWork` or `SoftwareSourceCode` data
- Favicon and application icons
- Generated social-preview image

Never insert fake ratings, employers, links, or metrics.

---

## 20. Contact

Invite conversations about:

- Frontend development
- Full-stack development
- Product engineering
- Complex UI work

Use:

- Email
- LinkedIn
- GitHub
- CV

Do not add a fake contact backend.

If a form exists, use a transparent mailto or external provider only after configuration is supplied.

---

## 21. Project media

Support typed media:

- Image
- Video
- Interactive demo
- Code sample
- Architecture diagram
- Caption

Before real assets are provided:

- Use abstract HTML/CSS/SVG visuals
- Label simulations
- Do not fabricate screenshots
- Do not use unrelated stock images
- Do not show fake repository statistics
- Do not use copyrighted game or airline assets

Suggested folders:

```text
public/projects/clinical-follow-up-detector/
public/projects/academease/
public/projects/realtime-gpt-cli/
public/projects/taptap-avengers/
public/projects/overthewire-bandit/
public/projects/atlas-research/
```

---

## 22. Suggested architecture

```text
src/
  app/
    page.tsx
    work/
      page.tsx
      [slug]/
        page.tsx
    about/
      page.tsx
    contact/
      page.tsx
    not-found.tsx
  components/
    layout/
    navigation/
    hero/
    projects/
    case-study/
    diagrams/
    interactions/
    command-menu/
    contact/
    ui/
  data/
    portfolio.ts
    projects.ts
    experience.ts
    skills.ts
  lib/
    motion.ts
    metadata.ts
    project-utils.ts
    cn.ts
  styles/
    tokens.css
    globals.css
```

Adapt this only when repository evidence supports a better architecture.

Use discriminated unions for project media and demonstrations.

Do not over-abstract one-off editorial layouts.

---

## 23. Code quality

- Strict TypeScript
- Avoid `any`
- Clear naming
- Focused components
- Explicit server/client boundaries
- No dead code
- No unused dependency
- No console errors
- No hydration warnings
- No broken links
- No lorem ipsum
- No fake data
- No secrets
- No committed `.env`
- No unnecessary state library
- No index keys for dynamic collections
- No duplicated animation logic

Use comments only for genuinely non-obvious behavior.

---

## 24. Testing

At minimum, test:

- Mobile navigation
- Escape-to-close
- Focus restoration
- Command-menu search
- Project filtering
- Theme persistence
- Reduced-motion behavior
- Project rendering
- Missing links are not rendered
- Terminal simulation
- Clinical simulation uses fictional static content only
- Clinical simulation exposes no arbitrary medical-data submission field

Playwright coverage:

- Homepage loads
- Main navigation works
- Mobile menu works
- Case-study route works
- Command menu is keyboard accessible
- No horizontal overflow at mobile size

---

## 25. Repository README requirements

Document:

- Portfolio purpose
- Stack
- Architecture
- Routes
- Content editing
- Adding projects
- Replacing media
- Configuring links
- Local development
- Production build
- Tests
- Deployment
- Accessibility decisions
- Reduced-motion strategy
- Performance decisions
- Missing-content checklist

Checklist:

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

---

## 26. Definition of done

Before completion:

1. Format code.
2. Run ESLint.
3. Run TypeScript checking.
4. Run unit tests.
5. Run Playwright when configured.
6. Run production build.
7. Fix warnings and errors.
8. Confirm no secrets.
9. Confirm no fake links render.
10. Confirm team projects are attributed accurately.
11. Confirm clinical safety disclaimer.
12. Confirm proprietary work is separated from public repositories.
13. Confirm keyboard accessibility.
14. Confirm reduced-motion behavior.
15. Confirm mobile layouts.
16. Confirm no horizontal overflow.
17. Confirm no console errors.
18. Confirm readability without animation.
19. Confirm each featured project has a distinct visual treatment.
20. Summarize files changed and validation commands.

The finished website should feel:

- Premium
- Precise
- Original
- Technically credible
- Visually sophisticated
- Fast
- Accessible
- Responsive
- Personal without being informal
- Interactive without being distracting
