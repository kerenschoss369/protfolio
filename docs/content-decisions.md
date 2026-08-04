# Content Decisions and Verified Facts

This file is the content guardrail for every agent.

Do not add a claim because it sounds impressive. Add it only when it is listed here, present in repository evidence, or later supplied by Keren.

## 1. Personal positioning

Verified name:

- Keren Schoss

Primary title:

- Frontend & Full-Stack Developer

Location wording allowed:

- Tel Aviv, Israel

Background:

- Professional fashion photographer from 2014–2020
- B.Sc. in Computer Science at the Academic College of Tel Aviv–Yaffo (graduated Oct 2024)
- Alpha Research Program in the Sciences at Tel Aviv University (2015–2018)
- Current production frontend work through Abra on EL AL’s web platform

Do not infer:

- Years of software-industry experience beyond verified dates
- Management responsibility
- Team size
- Revenue impact
- User counts
- Conversion improvements
- Performance metrics
- Awards
- Security certifications

---

## 2. Central placeholders

Use configuration values, never hard-coded fake links.

Configured contact links (as of Keren-supplied values):

```ts
export const externalLinks = {
  githubUrl: "https://github.com/kerenschoss369",
  linkedinUrl: "https://www.linkedin.com/in/kerenschoss/",
  email: "kerenschoss369@gmail.com",
  cvPath: "/cv/keren-schoss-cv.pdf",
  siteUrl: null, // production domain not set yet
} as const;
```

Configured public repository links:

- Clinical Follow-Up Detector — `https://github.com/kerenschoss369/clinical-follow-up-detector` (collaboration remains `pending-verification`)
- Realtime GPT-4o-mini CLI — `https://github.com/kerenschoss369/go-gpt-realtime-cli` (collaboration remains `pending-verification`)
- TapTap Avengers — `https://github.com/uvw222/TapTapAvengers` (team repository; collaboration stays `team`)

Still `null` (do not invent links):

- AcademEase — no confirmed public repository yet
- OverTheWire Bandit — engineering-practice item; no repository link
- ATLAS Research — educational research; not a GitHub software repository
- All `liveUrl` values — no live-demo links yet

Behavior:

- `null` means do not render the action.
- Never use `#`.
- Never use `example.com`.
- Never display `[GITHUB_URL]` or similar text publicly.
- Do not change collaboration/ownership solely because a repo is under Keren’s GitHub account.

---

## 3. Professional experience

Role:

- Frontend Developer at Abra

Product context:

- EL AL Airlines web platform

Current working dates:

- 2025–Present
- Must remain easy to update if Keren provides different final dates

Verified technologies and workflow:

- Angular
- TypeScript
- RxJS
- SCSS
- REST API integration
- Nx monorepo
- Git
- Bitbucket
- Jira
- Confluence
- Responsive design
- Production debugging
- Pull requests
- Code reviews
- Merge conflicts and rebasing
- Cross-functional collaboration

Verified work areas at a safe high level:

- Manage My Booking
- Passenger-management experiences
- Booking-related user flows
- Forms and validation
- API integration
- Reactive behavior
- Responsive UI
- Production issue investigation

Mandatory note:

> Professional work is described at a high level. Source code and internal product details are proprietary.

Never include:

- Internal ticket numbers
- Internal repository names
- Internal service URLs
- Proprietary code
- Screenshots copied from internal environments
- Confidential architecture
- Fake public repository links
- Exact internal business rules unless Keren explicitly approves them

---

## 4. Clinical Follow-Up Detector

The content is based on Keren’s supplied project documentation.

Verified summary:

- Full-stack demonstration application
- Analyzes fictional clinical text
- Extracts explicit treatment and follow-up actions
- Produces structured, reviewable tasks

Mandatory safety facts:

- Not clinically validated
- Not for medical decision-making
- Not for real patient data
- Not HIPAA compliant
- Human review is required
- AI output is not automatically confirmed

Verified frontend:

- React
- TypeScript
- Vite
- Vitest
- Testing Library

Verified Node API:

- Node.js
- Express
- TypeScript
- Zod
- better-sqlite3

Verified AI service:

- Python
- FastAPI
- Pydantic
- OpenAI SDK

Verified persistence:

- SQLite
- Node owns persistence
- Analyze writes note and actions atomically

Verified flow:

- Note input
- `.txt` upload
- Client validation
- Analyze
- Action cards
- Evidence
- Needs-review display
- Confirm
- Reject
- Edit
- Complete
- Saved-note reload
- URL `noteId` reload
- Manual note-ID reload

Verified architecture:

- Browser talks only to Node
- Node calls Python
- Python calls OpenAI
- Node validates Python output
- Python performs AI-specific validation
- Evidence is checked against source text
- LLM output is untrusted
- Review workflow remains deterministic
- Test suites mock the LLM

Known limitation:

- The app does not automatically restore the most recently opened note when the URL has no `noteId`

Portfolio demo restrictions:

- Fictional static data only
- No arbitrary medical input
- No OpenAI request
- Persistent safety label

---

## 5. AcademEase

Verified:

- Team project
- 2023–2024
- React
- TypeScript
- FastAPI
- MongoDB
- AWS EC2
- AWS S3
- College-email login
- Registration
- Profile
- Password reset
- Persistent authentication
- Course materials
- Past exams
- Summaries
- Questions and answers
- Filtering
- Schedule builder
- Saved-schedule comparison
- English
- French
- Hebrew
- RTL support
- Responsive interface

Contribution language allowed:

- Led frontend development after independently learning React
- Built significant parts of the interface and user flows
- Contributed to backend development
- Contributed to deployment work

Do not claim:

- Sole ownership
- Production user metrics
- Commercial deployment
- Institution-wide adoption

---

## 6. Realtime GPT-4o-mini CLI

Repository name:

- `go-home-assignment`

Verified:

- Go
- WebSocket connection
- OpenAI realtime endpoint
- `OPENAI_API_KEY`
- Reader goroutine
- JSON event decoding
- Go channel
- Main goroutine request/event handling
- `conversation.item.create`
- `response.create`
- Local `multiply(a, b)`
- Streamed function arguments
- Local execution
- Function-call output
- Follow-up response request
- `exit` command

Do not:

- Include a real key
- Claim production usage
- Make the portfolio simulation call OpenAI
- Present predetermined browser responses as a live model

---

## 7. TapTap Avengers

Verified:

- Team project
- August–October 2024
- Unity
- C#
- ShaderLab
- HLSL
- Rhythm mechanics
- Audio synchronization
- Beat mapping
- Custom 2D animation
- Multiplayer functionality
- Scoring
- Song selection
- Shader work

Repository language metadata mentioned:

- C#
- ShaderLab
- HLSL

Only show percentages if retrieved directly from current repository metadata at implementation time.

Do not use:

- Copyrighted music
- Marvel-owned character artwork
- Unlicensed game assets
- Sole-author language

---

## 8. OverTheWire Bandit

Verified:

- Completed all 33 levels

Skills:

- Linux
- SSH
- Permissions
- Shell commands
- Text processing
- Basic scripting
- System exploration
- Security fundamentals
- Problem solving

Never publish:

- Passwords
- Flags
- Exact challenge solutions

---

## 9. ATLAS research

Verified context:

- Alpha Research Program in the Sciences
- Tel Aviv University
- ATLAS two-photon invariant-mass analysis
- Higgs-related evidence context
- C++
- Scientific data analysis
- Research methodology
- Analytical problem solving

Do not imply:

- Discovery credit
- Employment by CERN
- Publication authorship
- A new scientific result
- Ownership of ATLAS data

---

## 10. Skills vocabulary

Allowed skill groups:

### Production frontend

- Angular
- TypeScript
- JavaScript
- HTML
- SCSS
- RxJS
- Responsive Design
- Component-Based Architecture
- Cross-Device UI Development
- Pixel-Precise Implementation
- REST API Integration
- Nx Monorepo
- Reactive Forms
- Debugging

### Backend and full-stack

- React
- Node.js
- Express
- Python
- FastAPI
- MongoDB
- SQLite
- Zod
- Pydantic
- Client-Server Communication

### AI engineering

- OpenAI API Integration
- Structured AI Output
- Function Calling
- Prompt Construction
- AI Output Validation
- Human-Review Workflows
- Evidence Validation
- Prompt-Injection Awareness
- AI-Assisted Debugging
- AI-Assisted Refactoring
- Cursor

### Additional

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

- Bitbucket
- Jira
- Confluence
- Code Reviews
- Merge Conflict Resolution
- Agile Collaboration
- Production Debugging
- Cross-Functional Collaboration

Do not assign percentages or labels such as “expert” unless Keren supplies them.

---

## 11. Tone

Use:

- Direct
- Intelligent
- Grounded
- Personal
- Precise
- Confident

Avoid:

- Rockstar
- Ninja
- Guru
- Wizard
- Pixel pusher
- Code magician
- Coffee-to-code jokes
- Generic passion statements
- Unsupported superlatives
- “World-class”
- “Award-winning” when describing Keren

The site design may aspire to award-level quality. The copy must not falsely claim awards.

---

## 12. Team attribution

For every project, include a field such as:

```ts
collaboration: "solo" | "team" | "professional";
```

Use:

- Clinical Follow-Up Detector: verify repository history before selecting; do not guess
- AcademEase: team
- Realtime GPT CLI: verify before selecting; likely individual assignment, but repository evidence should decide
- TapTap Avengers: team
- OverTheWire Bandit: individual practice
- ATLAS research: individual educational research within a program
- EL AL work: professional team environment

Do not render “solo” until verified.

---

## 13. Missing content checklist

Resolved:

- GitHub profile — https://github.com/kerenschoss369
- LinkedIn profile — https://www.linkedin.com/in/kerenschoss/
- Email — kerenschoss369@gmail.com
- CV PDF — `/cv/keren-schoss-cv.pdf`
- Confirmed education dates — B.Sc. graduated Oct 2024; Alpha research 2015–2018

Partially resolved:

- Public repository links — Clinical, Realtime GPT CLI, and TapTap configured; AcademEase still pending

Still unresolved:

- Domain / site URL
- AcademEase public repository link
- Live demos
- Project screenshots
- Optional profile photograph
- Confirmed employment dates (CV shows 2025–2026; site currently uses 2025–Present pending confirmation)
- Confirmation of public/private repository status
- Confirmation of ownership / individual attribution for the clinical and Go repositories
