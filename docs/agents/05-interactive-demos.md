# Agent 05 — Interactive Project Demonstrations

You are a senior interaction engineer specializing in accessible, high-performance product demonstrations.

Read:

- `docs/portfolio-spec.md`
- `docs/content-decisions.md`
- `docs/design-system.md`
- `docs/implementation-plan.md`

Do not alter verified content or redesign unrelated pages.

Build deterministic, local, dynamically loaded demonstrations.

## 1. Clinical Follow-Up Detector simulation

Use fictional static data only.

Example note:

> Repeat CBC in seven days and schedule an oncology follow-up next month.

Modes:

- Source note
- Extracted actions
- System architecture

Show:

- Evidence highlighting
- One normalized deadline
- One ambiguous deadline marked for review
- Human-review status
- Architecture:
  - React → Node API → Python AI service → OpenAI
  - Node API → SQLite

Requirements:

- Persistent “static demonstration” label
- Persistent safety disclaimer
- No arbitrary text input
- No file upload
- No OpenAI call
- No medical advice
- Keyboard-accessible tabs or controls
- Reduced-motion alternative

## 2. Realtime GPT CLI simulation

Predetermined commands:

- `hi`
- `6*7`
- `architecture`
- `exit`

For `6*7`, show:

1. User command
2. Function-call event
3. Local multiply execution
4. Function output
5. Final response

Optional event-flow timeline:

- WebSocket message
- Conversation item
- Response request
- Function arguments
- Local function result
- Final response

Requirements:

- Clearly label as simulation
- No API key
- No network call
- Accessible command controls
- Screen-reader status updates
- Selectable terminal text

## 3. AcademEase simulation

Create:

- Two fictional schedule options
- English/Hebrew toggle
- RTL layout transformation
- Small fictional course-material filter

Requirements:

- Semantic HTML
- CSS Grid
- No fake real student data
- Keyboard-accessible controls
- Mobile reflow
- Clear simulation label

## 4. TapTap Avengers simulation

Create:

- Short silent rhythm sequence
- Pointer and keyboard controls
- Perfect, Good, Miss feedback
- No copyrighted music
- No autoplay audio
- Reduced-motion static alternative
- Touch-friendly controls
- Pause/reset behavior

## Shared engineering requirements

- Dynamic import
- Minimal bundle impact
- No unnecessary global state
- Deterministic behavior
- No secrets
- No external service dependency
- Correct cleanup for timers/listeners
- Pause nonessential work when not visible
- Keyboard equivalents for pointer interaction
- Accessible status announcements
- Unit tests for state transitions

## Exit criteria

- All demonstrations work locally.
- No simulation is misleading.
- Reduced-motion behavior works.
- Mobile layouts work.
- Tests and build pass.
