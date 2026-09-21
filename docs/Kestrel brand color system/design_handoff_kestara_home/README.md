# Handoff: Kestara — Home Page

## Overview

Kestara is an AI-powered software engineering platform that orchestrates the complete
development lifecycle — from idea and requirements to production — through a structured
methodology called **AI-DLC** (AI Development Lifecycle). It is also a tool for developing
any type of WordPress website: the **WordPress Kestara Agent is developed by Claude** and
runs inside Claude Code, interviewing the developer and building the site phase by phase.

- **Brand:** Kestara
- **Tagline:** Build with Precision. Move with Speed.
- **Visual metaphor:** the kestrel — precision, focus, agility, observation, controlled execution
- **Target platform:** WordPress (custom lightweight theme)
- **Audience:** software engineers, engineering teams, CTOs, technical founders, agencies

This bundle covers the **Home page only**. About, Contact and the Design System page are
documented separately.

---

## About the Design Files

`pages/Kestara Home.dc.html` is a **design reference created in HTML** — a prototype that
shows the intended look, content and behaviour. It is **not production code to copy
directly**.

The task is to **recreate this design in the target codebase's existing environment**
(here: a WordPress custom theme with PHP templates, or React/Vue if the front end is
decoupled) using that codebase's established patterns, component conventions and build
pipeline. Where no environment exists yet, choose the appropriate stack and implement the
design there.

The prototype uses inline styles for streaming-preview reasons. **Do not port inline styles
into production.** Convert them to the theme's stylesheet structure (`styles/base`,
`styles/components`, `styles/layouts`, `styles/pages`) using the tokens below, and build each
repeated element once as a reusable component.

## Fidelity

**High-fidelity (hifi).** Final colours, typography, spacing, motion and copy. Recreate the
UI faithfully using the codebase's existing libraries. All hex values, sizes and easing
curves in this document are authoritative.

---

## Files

| File | What it is |
|---|---|
| `pages/Kestara Home.dc.html` | The Home page design reference |
| `assets/*.svg` | Logo, lockups, app icon, favicon (see Assets) |

---

## Design Tokens

### Colour

| Role | Name | Hex |
|---|---|---|
| Primary | Deep Graphite | `#111827` |
| Primary dark | Midnight | `#080D16` |
| Secondary | Kestrel Blue | `#2563EB` |
| Secondary deep | Deep Blue | `#1E3A8A` |
| Secondary light | Sky | `#3B82F6` / `#60A5FA` / `#93C5FD` |
| Accent | Copper Gold | `#D97706` |
| Accent light | Kestrel Amber | `#F59E0B` / `#FBBF24` |
| Background | Cloud White | `#F8FAFC` |
| Surface | Pure White | `#FFFFFF` |
| Panel (dark) | Console | `#0B1220`, border `#1E293B` |
| Text | Graphite | `#111827` |
| Body text | Slate 700 | `#334155` |
| Muted text | Slate | `#64748B` |
| Faint text | Slate 400 | `#94A3B8` |
| Border | Light Slate | `#E2E8F0` |
| Success | Forest Green | `#16A34A` |
| Error | Signal Red | `#DC2626` |
| Third-party | Claude orange | `#D97757` (Claude mark only) |

**Usage balance:** 60% white/light · 25% graphite · 10% Kestrel Blue · 5% copper/amber.
Copper is a precision accent — never a dominant fill.

**Gradients**
- Hero: `linear-gradient(180deg, #080D16 0%, #111827 52%, #172554 100%)`
- Final CTA: `linear-gradient(135deg, #080D16 0%, #111827 45%, #172554 100%)`
- Agent section: `linear-gradient(180deg, #080D16, #111827)`
- Primary button: `linear-gradient(135deg, #60A5FA 0%, #2563EB 45%, #1E3A8A 100%)`
  — hover `linear-gradient(135deg, #3B82F6 0%, #1E3A8A 60%, #111827 100%)`
- Headline text: `linear-gradient(92deg, #DBEAFE 0%, #60A5FA 45%, #F59E0B 105%)` + `background-clip:text`
- Rail fill: `linear-gradient(90deg, #1E3A8A, #3B82F6 70%, #F59E0B)`

**AI-DLC stage indicator colours** (small dots/rules only, never large blocks):

| Stage | Hex | Stage | Hex |
|---|---|---|---|
| Idea / Discovery | `#64748B` | Security | `#B45309` |
| Requirements | `#475569` | Performance | `#D97706` |
| Architecture | `#2563EB` | Deployment | `#2563EB` |
| Design | `#7C3AED` | Production | `#111827` |
| Development | `#0F766E` | Testing / QA | `#16A34A` |
| CMS / Backend | `#0891B2` | | |

### Typography

Two families only. **Montserrat** (400/500/600/700) for all headings and body copy;
**JetBrains Mono** (400/500) for eyebrows, phase numbers, metrics, console text and any
machine output.

| Token | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Hero H1 | `clamp(38px, 5.2vw, 62px)` | 700 | `-.025em` | 1.06 |
| Section H2 | `clamp(28px, 3.4vw, 44px)` | 700 | `-.025em` | 1.10 |
| Console phase name | `clamp(24px, 2.8vw, 36px)` | 700 | `-.02em` | 1.15 |
| Card H3 | 16–21px | 600 | `-.01em` | 1.30 |
| Body large | `clamp(16px, 1.35vw, 18.5px)` | 400 | 0 | 1.65–1.70 |
| Body base | 14–14.5px | 400 | 0 | 1.60 |
| Mono eyebrow | 11.5px | 600 | `.2em` | 1 (uppercase) |
| Mono index | 12px | 600 | `.12em` | 1 |
| Mono console | 12.5px | 400 | 0 | 1.60 |
| Mono micro | 10.5–11.5px | 500 | `.14–.20em` | 1 |

### Spacing, radius, elevation

- **Base rhythm:** 4px. Section padding `clamp(64px, 7vw, 104px)` vertical, 24px horizontal.
- **Container:** `max-width: 1280px`, centered (agent section uses 1080px).
- **Header:** 72px, sticky, `rgba(11,18,32,.92)` + `backdrop-filter: blur(8px)`.
- **Radius:** 8px (chips, header button), 9–10px (icon chips, buttons, inputs), 12–14px (cards),
  16–20px (console panels), 999px (pills).
- **Elevation:**
  - `sm` `0 2px 4px rgba(17,24,39,.06)`
  - `md` `0 2px 12px rgba(17,24,39,.05)` — default card
  - `lg` `0 24px 60px rgba(8,13,22,.18)` — lifecycle + Claude consoles
  - Button glow `0 8px 24px rgba(37,99,235,.28)`
  - Card hover `0 8px 24px rgba(37,99,235,.1)`

### Grid behaviour

Card grids are fixed-column, not `auto-fit`, so rows always fill evenly:

```css
[data-grid] { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); }
@media (max-width:1000px) { [data-grid] { grid-template-columns:repeat(2, minmax(0,1fr)); } }
@media (max-width:560px)  { [data-grid] { grid-template-columns:minmax(0,1fr); } }
```

### Motion

| Token | Value | Used for |
|---|---|---|
| Hover | 160ms ease | colour / border transitions |
| Rail | 550ms `cubic-bezier(.4,0,.2,1)` | lifecycle marker + progress fill |
| Rise | 700ms ease, 16px translate + fade | hero entrance, staggered 0 / .08 / .16 / .24 / .32s |
| Draw | 800ms `cubic-bezier(.4,0,.2,1)`, `scaleX` from left, 0.7s delay | copper underline under "Precision." |
| Pulse | 2.0–2.4s ease-in-out infinite | live status dots |
| Blink | 1.1s `step-end` infinite | terminal cursors |
| Wing beat | 1.7s ease-in-out infinite, staggered 0 / .06 / .12 / .2s | loader logo wings |
| Float | 3s ease-in-out infinite, ±7px | loader logo body |
| Spin | 6s / 9s (reverse) / 64s linear | loader and hero HUD rings |
| Loader bar | 1.6–2.0s `cubic-bezier(.4,0,.2,1)` `scaleX` | progress fill |
| Page transition | 720ms hold, then navigate | link-click loader |

**All animation, autoplay and the loader are disabled under `prefers-reduced-motion: reduce`.**

---

## Global Components

### Header
Sticky, 72px, `rgba(11,18,32,.92)` with 8px backdrop blur, 1px bottom hairline
`rgba(248,250,252,.08)`. Left: mark (34×28) + `KESTARA` at 17px/600, `letter-spacing:.24em`.
Right: nav links 13.5px/500 `#CBD5E1` → `#F8FAFC` on hover, then the GitHub button (40px tall,
radius 8px, blue gradient, 16px GitHub glyph, `flex:none`).

**Responsive nav (required — it wraps otherwise):**

```css
[data-nav]   { display:flex; align-items:center; gap:22px; margin-left:auto; }
[data-nav] a { white-space:nowrap; }
@media (max-width:1180px) { [data-nav] { gap:16px; } }
@media (max-width:1040px) { [data-nav] [data-nav-opt]  { display:none; } }  /* Platform, Why Kestara, Agents */
@media (max-width:760px)  { [data-nav] [data-nav-core] { display:none; } }  /* AI-DLC, Claude, About, Contact */
```

Nav items in order: Platform · AI-DLC · Why Kestara · Agents · Claude · About · Contact ·
GitHub button.

> **Sticky note:** the header's containing block must be as tall as the page content, or
> `position: sticky` clamps to the viewport. Wrap header + main + footer in one block element.

### Full-screen loader
Fixed overlay, `z-index:200`, `radial-gradient(ellipse 70% 60% at 50% 40%, #111827, #080D16 70%)`.
Stacked and centered:
1. 220px HUD — two counter-rotating ring layers (blue `#3B82F6` and copper `#F59E0B` arcs via
   `stroke-dasharray`, plus a dotted inner ring), mark at 46% width.
2. The mark floats (`kFloat`) while its two blue wing shapes rotate (`kWingA` −8°, `kWingB` −5°)
   and the copper sliver fades/slips — staggered, `transform-box: fill-box`.
3. `KESTARA` at `clamp(18px,3vw,24px)`/600, `letter-spacing:.42em`.
4. Tagline `Build with Precision. Move with Speed.` 13.5px `#94A3B8`.
5. 300×3px track `rgba(148,163,184,.16)` with a `#1E3A8A → #3B82F6 → #F59E0B` fill animating
   `scaleX` from the left.
6. `INITIALIZING KESTARA` — 11.5px mono, `.2em`, `#475569`.

**Behaviour:** ~1.9s on first visit (stored once per session in `sessionStorage` under
`kestara_loader_v1`), ~900ms otherwise, then a 500ms fade. A capture-phase document click
listener intercepts internal page links, shows the loader, waits 720ms, then navigates.
`role="status"`, `aria-label="Loading Kestara"`.

### Section heading (all eight Home sections)
A three-part construction, repeated exactly:
1. **Index rail** — flex column: `NN` in 12px mono/600, `.12em` tracking, then a 2px vertical
   rule `linear-gradient(<accent>, transparent)`, min-height 60px.
2. **Eyebrow** — 11.5px mono/600, `.2em`, uppercase.
3. **H2** — `clamp(28px,3.4vw,44px)`/700, `-.025em`, deliberately broken to two lines.

Accent is copper `#D97706` on light sections, amber `#F59E0B` on dark.

### Buttons
48–52px tall, radius 10px, 14.5–15px/600, `white-space: nowrap`.
- **Primary** — blue gradient, white ink, `0 8px 24px rgba(37,99,235,.28)`.
- **Secondary (dark)** — `rgba(248,250,252,.05)` fill, `rgba(248,250,252,.18)` border, `#E2E8F0` ink.
- **Secondary (light)** — white fill, `#E2E8F0` border → `#111827` on hover.
- **Developer** — transparent, 1px dashed `rgba(148,163,184,.4)`; hover border turns copper.
- **Graphite** — `#111827` fill, `#F8FAFC` ink (GitHub CTA).
- **Focus** — 2px `#2563EB` outline, 2px offset, on every interactive element.

### Cards
White, radius 14px, 1px `#E2E8F0`, `shadow-md`. Hover: border → `#3B82F6`, shadow →
`0 8px 24px rgba(37,99,235,.1)`. Dark variant: `rgba(248,250,252,.055 → .02)` vertical fade,
1px `rgba(248,250,252,.1)`, hover border `rgba(59,130,246,.55)`.

### Icons
Inline SVG only, 20px viewBox, `fill:none`, `stroke:currentColor`, `stroke-width:1.6`,
`stroke-linecap:round`; rendered at 16–18px. Icon chips are 34–38px squares, radius 9–10px,
`#EFF6FF` fill with a `#DBEAFE` border on light, `rgba(248,250,252,.06)` on dark.
**No emoji, no icon fonts, no Unicode glyph icons.**

---

## Home Page — Section by Section

### Hero

Two columns (`repeat(auto-fit, minmax(min(100%,380px), 1fr))`), hero gradient plus a 64px
technical grid masked by `radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent)`.
Padding `clamp(64px,8vw,116px)` top, `clamp(72px,8vw,120px)` bottom.

**Left column** (each child animates in on its own delay):
- Amber pill badge, 1px `rgba(245,158,11,.4)`, fill `rgba(245,158,11,.08)`, with a 6px pulsing
  `#F59E0B` dot and the label `AI-DLC · DEVELOPMENT LIFECYCLE` (11.5px mono/600, `.18em`, `#FBBF24`).
- H1 line 1: **Build with Precision.** — "Precision." is wrapped in a relative inline-block
  carrying an absolutely positioned 4px bar (`left:2px; right:6px; bottom:2px`, radius 2px,
  `linear-gradient(90deg,#F59E0B,transparent)`) that animates `scaleX` from the left after 0.7s.
- H1 line 2: **Move with Speed.** — gradient text via `background-clip:text`, `color:transparent`.
- Body copy (verbatim): *"Kestara orchestrates the software development lifecycle with AI —
  helping teams move from requirements and design to development, testing, deployment and
  production with a structured engineering workflow."*
- Three CTAs on one line (50px tall, `gap:10px`, `nowrap`): **Explore Kestara** (primary +
  arrow icon) · **How AI-DLC Works** (secondary) · **Clone on GitHub** (dashed developer).
- **Live lifecycle ticker**, above a 1px `rgba(248,250,252,.08)` rule: a pulsing `#16A34A` dot,
  the label `LIFECYCLE`, the active phase number in copper mono, the phase name in white 14px/600,
  a blinking 8×15px `#3B82F6` cursor, and a right-aligned `12 PHASES →` anchor to `#platform`.
  **It reads the same `active` state as the lifecycle rail — do not duplicate the state.**

**Right column:** a 440px square HUD — a 64s-rotating outer ring (`r=186`) with blue and copper
arc segments via `stroke-dasharray`, a dotted inner ring (`r=158`), a static copper arc
(`r=132`), and the mark at 58% width with `drop-shadow(0 14px 40px rgba(37,99,235,.45))`.

**Hero footer rail:** inside the hero, above a 1px hairline —
`DISCOVER · REQUIREMENTS · DESIGN · DEVELOP · TEST · OPTIMIZE · DEPLOY`, 11.5px mono `#64748B`,
centered, wrapping.

### 01 · What is Kestara

Light section `#F8FAFC`, 1px `#E2E8F0` bottom border.

Heading block is two columns, `align-items:end`:
- Left: index rail `01` + eyebrow `WHAT IS KESTARA` + a four-line H2 at `clamp(30px,3.8vw,50px)`
  — `Software / Engineering, / orchestrated by / intelligence.` — where *orchestrated* is
  400 italic `#2563EB`.
- Right (max 540px): the paragraph *"Kestara is not a code generator. It runs a controlled,
  phase-by-phase development lifecycle: every stage has defined inputs, a documented decision
  record and an approval gate before the next stage begins."* plus a metric row —
  `12` lifecycle phases · `8` specialist agents · `1` approval gate per page (value 20px mono/700
  `#111827`, label 12px `#64748B`).

**The lifecycle console** — the page's signature component:
- Dark panel `#0B1220`, radius 20px, 1px `#1E293B`, `shadow-lg`, a masked 48px grid, and a blue
  radial glow bleeding from the top edge.
- **Upper area** (min-height 196px): `PHASE NN / 12` in copper mono with a rule and an `AI-DLC`
  label; the phase name at `clamp(24px,2.8vw,36px)`/700 white; a 640px-max description; and two
  small panels on the right — **OWNER** (white ink) and **OUTPUT** (`#93C5FD`).
- **Lower area:** a horizontal rail in an `overflow-x:auto` wrapper with `min-width:1020px`
  (≈85px per phase). A 2px `#1E293B` track sits at `top:52px`; the fill uses the rail gradient
  and animates its width to the active position. Twelve `<button>` nodes each hold a 14px dot,
  the phase number, and the phase name with `width:100%; overflow-wrap:break-word` so labels
  wrap inside their slot instead of colliding.
  - Future dot: `#0B1220` fill, `#334155` border
  - Completed dot: `#1E3A8A` fill, `#3B82F6` border
  - Active dot: stage colour fill, `#F59E0B` border, `0 0 0 6px rgba(245,158,11,.16)` halo
- The **mark glides** above the rail to the active node: `left: ((i + 0.5) / 12) * 100%`,
  `translateX(-50%)`, 550ms cubic.
- Autoplay advances every 2800ms and **stops permanently on the first click**.
- Caption: *"Select a phase to inspect it · advances automatically until you do"*.

Twelve phases — Idea, Discovery, Requirements, Architecture, Design, Development, CMS / Backend,
Testing, Security, Performance, Deployment, Production — each with a short note, a long
description, an owning agent and an output artifact (see the prototype's data array).

### 02 · AI-DLC

Graphite `#111827`. Heading block (index rail `02`, amber accent, two-line H2 *"A Smarter
Development / Lifecycle"*) with a right-aligned `Read the methodology` link in `#93C5FD`.

Below: nine phase cards in `repeat(auto-fit, minmax(min(100%,300px), 1fr))`, 20px gap. Each card
carries the large phase number in its stage colour (28px mono/700), a 34px icon chip, the name
(18px/600), the description, and a `NEXT · <PHASE>` footer with an arrow.

### 03 · Why Kestara

Light section. Heading block (index rail `03`, two-line H2 *"Capabilities defined by the /
workflow, not by claims."*), then eight feature cards in a 4-up `[data-grid]`: icon chip,
17px/600 title, 14px description.

Structured Development · AI Orchestration · Design-to-Code Workflow · Reusable Components ·
CMS Architecture · Automated QA · Performance Optimization · Deployment Workflow.

### 04 · Kestrel Principles

White section, 1px `#E2E8F0` top and bottom. Heading block (index rail `04`, two-line H2
*"Inspired by Precision. / Designed for Progress."*), then five cells in a bordered
`[data-grid]` (1px `#E2E8F0` right + bottom rules, hover `#F8FAFC`). Each cell: a 30px
greyscale mark whose copper sliver stays `#F59E0B`, a 19px/600 title, a description.

Precision · Focus · Agility · Observation · Execution.

### 05 · How Kestara Works

Light section. Heading block (index rail `05`, two-line H2 *"Four movements, each / with an
approval gate."*), then four graphite cards, radius 14px, each with an oversized 110px
`rgba(248,250,252,.045)` watermark numeral bleeding off the top-right corner, a copper
`NN — KICKER` label, a 21px/600 name and a description.

Define · Design · Build · Validate & Launch.

### 06 · Agent Ecosystem

Midnight gradient, 1080px container. Heading block left-aligned (index rail `06`, amber accent,
two-line H2 *"One orchestrator. / Specialist agents per phase."*) with a 620px supporting line.

Diagram, centered: the **AI Orchestrator** card (copper border `rgba(245,158,11,.45)`, fill
`rgba(245,158,11,.08)`, a `KESTARA` label above the 18px/600 name), a 44px vertical connector
fading copper → blue, then eight agent cards in a 4-up `[data-grid]` — each with a blue dot,
a 14.5px/600 name and a one-line role.

Architect · Designer · Developer · CMS · SEO · QA · Performance · Deployment.

### 07 · Open the Workflow (GitHub)

White, two columns. Left: heading block (index rail `07`, H2 *"Build with Kestara."*), copy, a
graphite **View Repository on GitHub** button, a **Read the Documentation** outline button, and
the repository URL in mono below (`word-break: break-all`).

Right: a terminal-style card (`#0B1220`, three grey dots, a `quick start` title) listing five
rows — Clone / Configure / Connect / Run Kestara / Build — each with a copper step number,
a 14.5px label and a right-aligned mono note.

### 08 · Built on Claude

Light section `#F8FAFC`, 1px `#E2E8F0` top border. **This is the WordPress / Claude message.**

Heading block: index rail `08`, then a row containing the **Claude mark** — a 34px rounded tile
(radius 9px) filled `#D97757` with the white Claude sunburst SVG at 19px — beside the eyebrow
`BUILT ON CLAUDE`. Below, a two-line H2 *"A WordPress development agent, / powered by Claude."*
and the lede (verbatim):

> Kestara is a tool for developing any type of WordPress website. The WordPress Kestara Agent
> is developed by Claude and runs inside Claude Code — it asks the questions, records the
> decisions and builds the site phase by phase, from the command line.

Below, two columns (`repeat(auto-fit, minmax(min(100%,340px), 1fr))`, `align-items: stretch`
so both columns end on the same line).

**Left column** — `display:flex; flex-direction:column; justify-content:space-between`. Five
white step cards (radius 12px, 1px `#E2E8F0`, `shadow-md`, hover border `#3B82F6`), each with a
34px blue mono number chip, a 16px/600 title and a 14px description:

| # | Title | Description |
|---|---|---|
| 01 | Install the agent in Claude Code | Clone the repository into your project and Claude Code picks the Kestara Agent up as its working instructions. |
| 02 | The agent interviews you | It asks the discovery and requirements questions one at a time — purpose, users, pages, integrations, constraints — and waits for your answers. |
| 03 | Decisions are written down | Every answer becomes a recorded decision in the project files, so nothing is assumed and nothing is re-litigated later. |
| 04 | It builds phase by phase | Architecture, design handoff, theme development, CMS fields, testing, security, performance, deployment — in that order. |
| 05 | You approve each gate | Each phase closes with a report in the console. The agent stops and waits for your approval before opening the next one. |

**Right column** — the **Claude Code console illustration**. `#0B1220`, radius 16px, 1px
`#1E293B`, `shadow-lg`, `display:flex; flex-direction:column` with the body at `flex:1` so the
panel matches the left column's height.
- **Title bar:** three 10px `#334155` dots, the 15px Claude sunburst in `#D97757`,
  `claude · kestara-agent` in 11.5px mono `#94A3B8`, and a right-aligned `PHASE 02 / 12` in
  copper mono.
- **Body:** 12.5px mono rows, 9px gap. Each row is a 16px gutter mark plus wrapping text:

| Mark | Mark colour | Text colour | Line |
|---|---|---|---|
| `$` | `#F59E0B` | `#E2E8F0` | `claude` |
| `>` | `#F59E0B` | `#E2E8F0` | `start the kestara wordpress agent` |
| `·` | `#3B82F6` | `#94A3B8` | `Kestara Agent loaded · AI-DLC · 12 phases` |
| `?` | `#3B82F6` | `#F8FAFC` | `Phase 01 — Discovery. What is this website for, and who uses it?` |
| `›` | `#475569` | `#94A3B8` | `A directory for regional export consultants. Public visitors plus an admin team.` |
| `?` | `#3B82F6` | `#F8FAFC` | `Which pages and features are in scope for the first release?` |
| `›` | `#475569` | `#94A3B8` | `Home, directory listing, consultant profile, contact. Admin can edit listings.` |
| `?` | `#3B82F6` | `#F8FAFC` | `Custom theme, or extend an existing one?` |
| `›` | `#475569` | `#94A3B8` | `Custom lightweight theme.` |
| `✓` | `#16A34A` | `#CBD5E1` | `Phase 01 complete — 6 decisions recorded in /docs/discovery.md` |
| `✓` | `#16A34A` | `#CBD5E1` | `Phase 02 complete — scope, pages and integrations confirmed` |
| `·` | `#D97706` | `#94A3B8` | `Gate — review the phase report before Architecture begins.` |
| `·` | `#64748B` | `#94A3B8` | `approve · revise · ask` |

  Then a live prompt row: copper `>`, `Architecture` in `#64748B`, and a blinking 8×15px
  `#3B82F6` cursor.
- **Footer bar:** 1px `#1E293B` top border, `ANSWER · APPROVE · ADVANCE` in 11px mono `#94A3B8`
  (`.14em`), and a right-aligned `install the agent →` link in `#93C5FD` → `#F59E0B` on hover.

> The console content is **illustrative copy**, not a transcript. Replace the command name,
> repo path and question wording with the agent's real strings before launch.

### Final CTA

135° midnight→blue gradient with a masked 56px grid. Centered: the mark at 54px, H2
*"Turn Your Next Idea Into Production."* at `clamp(30px,4vw,50px)`, the line *"Bring structure,
intelligence and precision to every stage of software development."*, then **Start Building
with Kestara** (primary) and **Explore AI-DLC** (outline, copper border on hover).

### Footer

Midnight `#080D16`, 1px top hairline. Four columns: brand blurb (mark + `KESTARA` + tagline
sentence), then **PLATFORM** (What is Kestara, AI-DLC, Why Kestara, Agents), **DEVELOPERS**
(GitHub Repository, Documentation, Quick Start), **COMPANY** (About Us, Contact Us, Design
System). Bottom band: `Copyright © Kestara. All Rights Reserved.` and `AI-DLC · v1`.

---

## Interactions & Behaviour

| Interaction | Behaviour |
|---|---|
| Lifecycle rail node click | Sets the active phase; updates the detail panel, rail fill, dot states and the gliding mark; **cancels autoplay permanently** |
| Lifecycle autoplay | Advances every 2800ms from phase 01; disabled under reduced motion |
| Hero ticker | Mirrors the lifecycle active phase — single source of truth |
| Internal link click | Loader appears, 720ms hold, then navigation |
| Page load | Loader ~1.9s on first session visit, ~900ms after, then a 500ms fade |
| Card hover | Border to `#3B82F6`, shadow to `0 8px 24px rgba(37,99,235,.1)` |
| Button hover | Gradient deepens / fill darkens one step; no scale effect |
| Nav link hover | `#CBD5E1 → #F8FAFC` |
| Dashed developer button hover | Border turns copper, ink turns white |
| Rail on narrow screens | Horizontal scroll (never collapses) |
| Nav below 1040 / 760px | Progressive link hiding per the `[data-nav]` rules above |

---

## State Management

Home needs four state values and one interval:

- `active: number` (0–11) — the current lifecycle phase
- `auto: boolean` — autoplay on/off; latches to `false` on the first user pick and never resumes
- `loading: boolean` — loader mounted
- `loaderOut: boolean` — loader fading (drives `opacity`, separate from unmount)

One 2800ms interval plus two timeouts, all cleared on unmount. A capture-phase `click` listener
on `document` handles the page-transition loader and is removed on unmount. No data fetching.

---

## Assets

All in `assets/`, all hand-built SVG — no raster, no photography.

| File | Use |
|---|---|
| `kestara-mark-dark.svg` | Primary mark for dark backgrounds (blue wings, copper sliver, white body) |
| `kestara-mark-light.svg` | Mark for light backgrounds (graphite body, slate wings, blue sliver) |
| `kestara-mark-mono-white.svg` | Single-colour white |
| `kestara-mark-mono-graphite.svg` | Single-colour graphite |
| `kestara-lockup-dark.svg` | Horizontal mark + `KESTARA` wordmark, dark backgrounds |
| `kestara-lockup-light.svg` | Horizontal lockup, light backgrounds |
| `kestara-app-icon.svg` | 512px rounded graphite tile with the mark |
| `kestara-favicon.svg` | 64px favicon tile |

The mark is a geometric kestrel built from five straight-edged paths on a `0 0 128 104`
viewBox: two swept wings (deep blue, Kestrel Blue), a copper precision sliver, a white
head/body pointing right, and a blue tail sweeping down-left. Minimum size **24px tall**;
clear space equal to the mark's height. The lockups reference Montserrat by name — **convert
the wordmark to outlines** before shipping, or keep the mark SVG and set the wordmark as live
text.

> The Kestara marks are geometric interpretations of the supplied brand board. If a production
> logo file exists, swap them out and keep the layout, sizes and clear space.

> **Claude mark:** the sunburst in section 08 is an inline SVG approximation in Claude's orange
> `#D97757`. It is Anthropic's trademark — **replace it with the official Claude logo file and
> follow Anthropic's brand guidelines before launch**, or remove it and keep the wordmark only.

---

## WordPress / CMS Content Model (Home)

**Static** (hardcoded in templates): section eyebrows and index numbers, the loader, all
iconography, the footer copyright.

**Dynamic** (ACF Pro):

| Group | Fields |
|---|---|
| Global Options | `kestara_github_url` (single source of truth for every GitHub link), `kestara_docs_url` |
| Hero | `hero_badge`, `hero_title`, `hero_title_accent`, `hero_description`, `hero_cta_primary_{label,url}`, `hero_cta_secondary_{label,url}`, `hero_cta_tertiary_{label,url}`, `hero_rail_stages` (repeater: `label`) |
| Platform intro | `platform_heading`, `platform_heading_accent`, `platform_body`, `platform_facts` repeater (`value`, `label`) |
| AI-DLC Phases | Repeater or `dlc_phase` CPT: `number`, `name`, `short_note`, `description`, `owner`, `output`, `indicator_color`, `icon` |
| Features | Repeater: `title`, `description`, `icon` |
| Kestrel Principles | Repeater: `name`, `description` |
| How It Works | Repeater: `number`, `kicker`, `name`, `description` |
| Agents | Repeater or CPT: `name`, `role` |
| Quick Start | Repeater: `number`, `label`, `note` |
| Built on Claude | `claude_heading`, `claude_body`, `claude_steps` repeater (`number`, `title`, `description`), `console_lines` repeater (`mark`, `mark_color`, `text_color`, `text`), `console_phase_label`, `console_footer_label`, `console_cta_{label,url}` |
| Final CTA | `heading`, `description`, `cta_primary_{label,url}`, `cta_secondary_{label,url}` |

The AI-DLC phase set feeds the hero ticker, the lifecycle rail and the phase cards — model it
**once** and query it in all three places. Handle empty fields gracefully: no field should
render an empty wrapper, a stray separator or a broken link.

---

## SEO (Home)

| Field | Value |
|---|---|
| URL | `/` |
| SEO title | Kestara — AI Software Engineering Platform \| Build with Precision |
| Meta description | Kestara orchestrates the software development lifecycle with AI — from requirements and design to development, testing, deployment and production. |
| H1 | Build with Precision. Move with Speed. |
| OG title | Kestara — Build with Precision. Move with Speed. |
| OG description | An AI-orchestrated development lifecycle: AI-DLC, from idea to production. |
| Schema | `SoftwareApplication` + `Organization` |

Internal links out: About, Contact, Design System, GitHub. One canonical URL, one H1, ordered
H2/H3 below it, alt text on every non-decorative graphic, `aria-hidden="true"` on decorative SVG.

---

## Accessibility Requirements

- Body text meets 4.5:1 against its background; headline-scale type meets at least 3:1. Console
  micro-labels must be `#94A3B8` or lighter on `#0B1220` — `#475569` fails at 2.47:1.
- Visible 2px `#2563EB` focus ring with 2px offset on every link, button and rail node.
- Lifecycle rail nodes are real `<button>` elements with `aria-label`; the rail is keyboard
  reachable and its scroll container is focusable.
- One H1; ordered H2/H3 beneath.
- Status is never colour-alone — every dot is paired with a text label.
- Loader is `role="status"` with an accessible label and is skipped under reduced motion.
- Decorative SVG is `aria-hidden="true"`; the logo and Claude marks carry `role="img"` +
  `aria-label`.

---

## Testing Requirements

- **Viewports:** 320 · 375 · 390 · 430 · 760 · 768 · 820 · 1024 · 1040 · 1180 · 1280 · 1440 · 1920.
  No horizontal overflow at any width — the lifecycle rail is the only intentional horizontal
  scroller and it is contained.
- **Header:** verify no nav wrapping at 900–1100px specifically (the failure window), and that
  it stays pinned through full-page scroll.
- **Grids:** confirm 4 / 2 / 1 columns at the documented breakpoints — no orphan row.
- **Lifecycle rail:** labels never collide (each slot ≥85px); autoplay stops on click; the mark
  lands centered over the active node.
- **Section 08:** both columns end on the same line at desktop widths; the console body grows,
  the title and footer bars do not.
- **Loader:** appears on load and on internal link clicks; never traps focus; absent under
  reduced motion.
- **Browsers:** Chrome, Firefox, Edge, Safari.
- **Performance:** run PageSpeed on mobile and desktop before and after optimization; subset and
  self-host Montserrat (400/500/600/700) and JetBrains Mono (400/500).

---

## Open Decisions for the Developer

1. **GitHub repository URL** — every link renders the literal placeholder
   `[KESTARA_GITHUB_REPOSITORY_URL]`. Store it once in global site settings.
2. **Claude Code console copy** — the command name, repo path and question wording in section 08
   are illustrative. Replace with the agent's real strings.
3. **Official Claude logo** — swap the approximated sunburst for Anthropic's asset and follow
   their brand guidelines.
4. **Production Kestara logo** — replace the geometric SVGs if an official file exists.
5. **Documentation URL** — the "Read the Documentation" button currently points at the
   repository placeholder.
