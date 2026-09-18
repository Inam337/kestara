# Handoff: Kestara Website (Home, About, Contact, Design System)

## Overview

Kestara is an AI-powered software engineering platform that orchestrates the complete
development lifecycle — from idea and requirements to production — through a structured
methodology called **AI-DLC** (AI Development Lifecycle).

- **Brand:** Kestara
- **Tagline:** Build with Precision. Move with Speed.
- **Visual metaphor:** the kestrel — precision, focus, agility, observation, controlled execution
- **Target platform:** WordPress (custom lightweight theme)
- **Audience:** software engineers, engineering teams, CTOs, technical founders, agencies

This bundle covers four designed pages plus the brand foundations.

---

## About the Design Files

The files in `pages/` are **design references created in HTML** — prototypes that show the
intended look, content and behaviour. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment**
(here: a WordPress custom theme with PHP templates, or React/Vue if the front end is
decoupled) using that codebase's established patterns, component conventions and build
pipeline. Where no environment exists yet, choose the appropriate stack for the project and
implement the designs there.

The prototypes use inline styles for streaming-preview reasons. **Do not port inline styles
into production.** Convert them to the theme's stylesheet structure (`styles/base`,
`styles/components`, `styles/layouts`, `styles/pages`) using the tokens listed below, and
build each repeated element once as a reusable component.

## Fidelity

**High-fidelity (hifi).** Final colours, typography, spacing, motion and copy. Recreate the
UI faithfully using the codebase's existing libraries. All hex values, sizes and easing
curves in this document are authoritative.

---

## Files

| File | What it is |
|---|---|
| `pages/Kestara Home.dc.html` | Home / landing page |
| `pages/Kestara About.dc.html` | About Us page |
| `pages/Kestara Contact.dc.html` | Contact Us page (with working form states) |
| `pages/Kestara Design System.dc.html` | Living design-system reference page |
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
| Panel (dark) | `#0B1220`, border `#1E293B` |
| Text | Graphite | `#111827` |
| Body text | Slate 700 | `#334155` |
| Muted text | Slate | `#64748B` |
| Faint text | Slate 400 | `#94A3B8` / `#475569` (on dark) |
| Border | Light Slate | `#E2E8F0` |
| Success | Forest Green | `#16A34A` |
| Error | Signal Red | `#DC2626` |

**Usage balance:** 60% white/light · 25% graphite · 10% Kestrel Blue · 5% copper/amber.
Copper is a precision accent (eyebrows, milestones, logo sliver, hover details) — never a
dominant fill.

**Hero gradient:** `linear-gradient(180deg, #080D16 0%, #111827 52%, #172554 100%)`
**Final-CTA gradient:** `linear-gradient(135deg, #080D16 0%, #111827 45%, #172554 100%)`
**Primary button gradient:** `linear-gradient(135deg, #60A5FA 0%, #2563EB 45%, #1E3A8A 100%)`
— hover `linear-gradient(135deg, #3B82F6 0%, #1E3A8A 60%, #111827 100%)`

**AI-DLC stage indicator colours** (small dots/rules only, never large blocks):

| Stage | Hex | Stage | Hex |
|---|---|---|---|
| Discovery | `#64748B` | QA / Testing | `#16A34A` |
| Requirements | `#475569` | Security | `#B45309` |
| Architecture | `#2563EB` | Performance | `#D97706` |
| Design | `#7C3AED` | Deployment | `#2563EB` |
| Development | `#0F766E` | Production | `#111827` |
| CMS / Backend | `#0891B2` | | |

### Typography

Two families only.

- **Montserrat** (400 / 500 / 600 / 700) — all headings and body copy.
- **JetBrains Mono** (400 / 500) — eyebrows, phase numbers, metrics, code, machine output.

| Token | Size (clamp) | Weight | Tracking | Line height |
|---|---|---|---|---|
| Display / hero H1 | `clamp(38px, 5.2vw, 62px)` | 700 | `-.025em` | 1.06 |
| Page H1 | `clamp(32px, 4.4vw, 54px)` | 700 | `-.025em` | 1.08 |
| Section H2 | `clamp(28px, 3.4vw, 44px)` | 700 | `-.025em` | 1.10 |
| Card H3 | 17–21px | 600 | `-.01em` | 1.30 |
| Body large | `clamp(16px, 1.35vw, 18.5px)` | 400 | 0 | 1.65–1.70 |
| Body base | 14–14.5px | 400 | 0 | 1.60 |
| Mono eyebrow | 11–12px | 600 | `.2em` | 1 (uppercase) |
| Mono micro | 10.5–11.5px | 500 | `.14–.20em` | 1 |

### Spacing, radius, elevation

- **Base rhythm:** 4px. Section padding `clamp(60px, 7vw, 104px)` vertical, 24px horizontal.
- **Container:** `max-width: 1280px`, centered.
- **Header height:** 72px, sticky, `rgba(11,18,32,.92)` + `backdrop-filter: blur(8px)`.
- **Radius:** 8px (chips), 10px (buttons, inputs), 12–14px (cards), 16–20px (large panels),
  999px (pills).
- **Elevation:**
  - `sm` `0 2px 4px rgba(17,24,39,.06)`
  - `md` `0 2px 12px rgba(17,24,39,.05–.06)` — default card
  - `lg` `0 24px 60px rgba(8,13,22,.18–.28)` — lifecycle console
  - Button glow `0 8px 24px rgba(37,99,235,.28)`

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
| Rise | 700ms ease, 16px translate + fade | hero and section entrances (staggered 0 / .08 / .16 / .24 / .32s) |
| Draw | 800ms `cubic-bezier(.4,0,.2,1)`, `scaleX` from left | copper underline under "Precision." |
| Pulse | 2.0–2.4s ease-in-out infinite | live status dots |
| Wing beat | 1.7s ease-in-out infinite, staggered 0 / .06 / .12 / .2s | loader logo wings |
| Float | 3s ease-in-out infinite, ±7px | loader logo body |
| Spin | 6s / 9s (reverse) / 64s linear | loader and hero HUD rings |
| Loader bar | 1.6–2.0s `cubic-bezier(.4,0,.2,1)` `scaleX` | progress fill |
| Page transition | 720ms hold, then navigate | link-click loader |

**All animation, autoplay and the loader itself are disabled under
`prefers-reduced-motion: reduce`.**

---

## Global Components

### Header (all pages)
Sticky, 72px, graphite `rgba(11,18,32,.92)` with 8px backdrop blur, 1px bottom hairline
`rgba(248,250,252,.08)`. Left: mark (34×28) + `KESTARA` at 17px/600, `letter-spacing:.24em`.
Right: nav links 13.5px/500 `#CBD5E1` → `#F8FAFC` on hover; the current page is 600 `#F8FAFC`
with a 2px `#F59E0B` bottom border. Far right: GitHub button, 40px tall, radius 8px, blue
gradient, 16px GitHub glyph.

> **Sticky note for implementation:** the header's containing block must be as tall as the
> page content, or `position: sticky` clamps to the viewport. Wrap header + main + footer in
> one block-level element.

### Footer
Midnight `#080D16`, 1px top hairline. Home uses a 4-column link grid (brand blurb +
PLATFORM / DEVELOPERS / COMPANY columns); About, Contact and Design System use a single
row. Copyright band: `Copyright © Kestara. All Rights Reserved.`

### Full-screen loader
Fixed overlay, `z-index:200`, `radial-gradient(ellipse 70% 60% at 50% 40%, #111827, #080D16 70%)`.
Contents, centered and stacked:
1. 220px HUD — two counter-rotating ring layers (blue `#3B82F6` and copper `#F59E0B` arcs via
   `stroke-dasharray`, plus a dotted inner ring), with the mark at 46% width.
2. The mark floats (`kFloat`) while its two blue wing shapes rotate (`kWingA` −8°, `kWingB` −5°)
   and the copper sliver fades/slips — staggered, `transform-box: fill-box`.
3. `KESTARA` at `clamp(18px,3vw,24px)`/600, `letter-spacing:.42em`.
4. Tagline `Build with Precision. Move with Speed.` 13.5px `#94A3B8`.
5. 300×3px track `rgba(148,163,184,.16)` with a `#1E3A8A → #3B82F6 → #F59E0B` fill animating
   `scaleX` from the left.
6. `INITIALIZING KESTARA` — 11.5px mono, `.2em`, `#475569`.

**Behaviour:** shows ~900ms on page load (Home shows a longer ~1.9s intro, once per session
via `sessionStorage`), then fades over 500ms. A capture-phase document click listener
intercepts internal page links, shows the loader, waits 720ms, then navigates — producing a
continuous transition. `role="status"`, `aria-label="Loading Kestara"`.

### Section heading (used for all seven Home sections and both upper About sections)
A three-part construction, repeated exactly:
1. **Index rail** — flex column, `NN` in 12px mono/600 with `.12em` tracking, then a 2px
   vertical rule with `linear-gradient(<accent>, transparent)`, min-height 60px.
2. **Eyebrow** — 11.5px mono/600, `.2em`, uppercase.
3. **H2** — `clamp(28px,3.4vw,44px)`/700, `-.025em`, deliberately broken to two lines.

Accent is copper `#D97706` on light sections and amber `#F59E0B` on dark.

### Buttons
48–52px tall, radius 10px, 14.5–15px/600, `white-space: nowrap`.
- **Primary** — blue gradient, white ink, `0 8px 24px rgba(37,99,235,.28)`.
- **Secondary (dark)** — `rgba(248,250,252,.05)` fill, `rgba(248,250,252,.18)` border, `#E2E8F0` ink.
- **Secondary (light)** — white fill, `#E2E8F0` border → `#111827` on hover.
- **Developer** — transparent with a 1px dashed `rgba(148,163,184,.4)` border; hover turns the
  border copper.
- **Accent** — `#F59E0B` fill with `#111827` ink (used in the design-system page only).
- **Focus** — 2px `#2563EB` outline, 2px offset, on every interactive element.

### Cards
White, radius 14px, 1px `#E2E8F0`, `shadow-md`. Hover: border → `#3B82F6`,
shadow → `0 8px 24px rgba(37,99,235,.1)`. Dark variant: `rgba(248,250,252,.055 → .02)`
vertical fade, 1px `rgba(248,250,252,.1)`, hover border `rgba(59,130,246,.55)`.

### Icons
Inline SVG only, 20px viewBox, `fill:none`, `stroke:currentColor`, `stroke-width:1.6`,
`stroke-linecap:round`; rendered at 16–18px. Icon chips are 38px squares, radius 10px,
`#EFF6FF` fill with a `#DBEAFE` border on light, `rgba(248,250,252,.06)` on dark.
**No emoji, no icon fonts, no Unicode glyph icons.**

---

## Screens

### 1. Home — `pages/Kestara Home.dc.html`

**Purpose:** explain what Kestara is, present AI-DLC, and drive to the GitHub repository.

**Sections in order:**

1. **Hero** — two columns (`minmax(380px,1fr)`), hero gradient + a 64px technical grid masked
   by a radial ellipse.
   - Amber pill badge with a pulsing dot: `AI-DLC · DEVELOPMENT LIFECYCLE`
   - H1 `Build with Precision.` — "Precision." carries a copper underline bar (4px, radius 2px,
     `linear-gradient(90deg,#F59E0B,transparent)`) that draws itself in after 0.7s
   - Second line `Move with Speed.` — gradient text
     `linear-gradient(92deg,#DBEAFE 0%,#60A5FA 45%,#F59E0B 105%)` with `background-clip:text`
   - Body copy (verbatim): *"Kestara orchestrates the software development lifecycle with AI —
     helping teams move from requirements and design to development, testing, deployment and
     production with a structured engineering workflow."*
   - Three CTAs on one line: **Explore Kestara** (primary + arrow), **How AI-DLC Works**
     (secondary), **Clone on GitHub** (developer/dashed)
   - **Live lifecycle ticker** above a hairline: green pulsing dot, `LIFECYCLE` label, the
     current phase number in copper mono + name in white, a blinking 8×15px blue cursor, and a
     right-aligned `12 PHASES →` anchor. It reads the same state as the lifecycle rail below.
   - Right column: 440px HUD — a 64s-rotating outer ring with blue and copper arc segments, a
     dotted inner ring, a static copper arc, and the mark at 58% with a blue drop shadow.
   - Bottom rail inside the hero: `DISCOVER · REQUIREMENTS · DESIGN · DEVELOP · TEST ·
     OPTIMIZE · DEPLOY` in 11.5px mono `#64748B`.

2. **01 · What is Kestara** — heading block is two columns: the index rail + a four-line H2
   (`Software / Engineering, / orchestrated by / intelligence.`) where *orchestrated* is 400
   italic `#2563EB`; right column holds the paragraph plus a metric row
   (`12` lifecycle phases · `8` specialist agents · `1` approval gate per page).

   Below it, the **lifecycle console** — the signature component:
   - Dark panel `#0B1220`, radius 20px, 1px `#1E293B`, `shadow-lg`, a masked 48px grid, and a
     blue radial glow bleeding from the top edge.
   - Upper area (min-height 196px): `PHASE NN / 12` in copper mono with a rule and an `AI-DLC`
     label; the phase name at `clamp(24px,2.8vw,36px)`/700; a 640px-max description; and two
     small panels on the right — **OWNER** (white) and **OUTPUT** (`#93C5FD`).
   - Lower area: a horizontal rail in an `overflow-x:auto` wrapper with `min-width:1020px`
     (≈85px per phase). A 2px `#1E293B` track sits at `top:52px` with a fill of
     `linear-gradient(90deg,#1E3A8A,#3B82F6 70%,#F59E0B)` whose width animates to the active
     position. Twelve `<button>` nodes each hold a 14px dot, the phase number and the phase
     name (`width:100%; overflow-wrap:break-word` so labels wrap inside their slot).
     - Future dot: `#0B1220` fill, `#334155` border
     - Completed dot: `#1E3A8A` fill, `#3B82F6` border
     - Active dot: stage colour fill, `#F59E0B` border, `0 0 0 6px rgba(245,158,11,.16)` halo
   - The **mark glides** above the rail to the active node (`left: ((i+0.5)/12)*100%`,
     `translateX(-50%)`, 550ms cubic).
   - Autoplay advances every 2800ms and **stops permanently on the first click**.
   - Caption: *"Select a phase to inspect it · advances automatically until you do"*.

   Twelve phases: Idea, Discovery, Requirements, Architecture, Design, Development,
   CMS / Backend, Testing, Security, Performance, Deployment, Production — each with a note,
   a long description, an owning agent and an output artifact (see the prototype's data array).

3. **02 · AI-DLC** — graphite section. Heading block plus a right-aligned
   `Read the methodology` link. Below: nine phase cards in a 3-up grid — large phase number in
   the stage colour (mono/700/28px), a 34px icon chip, name, description, and a
   `NEXT · <PHASE>` footer with an arrow.

4. **03 · Why Kestara** — eight feature cards, `[data-grid]` 4-up: icon chip, 17px/600 title,
   14px description. Categories: Structured Development, AI Orchestration, Design-to-Code
   Workflow, Reusable Components, CMS Architecture, Automated QA, Performance Optimization,
   Deployment Workflow.

5. **04 · Kestrel Principles** — white section; five cells in a bordered `[data-grid]` (1px
   `#E2E8F0` right/bottom rules, hover `#F8FAFC`), each with a small greyscale mark whose
   sliver stays copper, a 19px/600 title and a description. Precision, Focus, Agility,
   Observation, Execution.

6. **05 · How Kestara Works** — four graphite cards, radius 14px, each with an oversized
   `rgba(248,250,252,.045)` watermark numeral bleeding off the top-right corner, a copper
   `NN — KICKER` label, a 21px/600 name and a description. Define, Design, Build,
   Validate & Launch.

7. **06 · Agent Ecosystem** — midnight gradient. Left-aligned heading; centered diagram: the
   **AI Orchestrator** card (copper border + `rgba(245,158,11,.08)` fill, `KESTARA` label
   above the name), a 44px vertical connector fading copper → blue, then eight agent cards in
   a 4-up `[data-grid]` (blue dot, name, one-line role): Architect, Designer, Developer, CMS,
   SEO, QA, Performance, Deployment.

8. **07 · Open the Workflow (GitHub)** — white, two columns. Left: heading, copy, a graphite
   **View Repository on GitHub** button, a **Read the Documentation** outline button, and the
   repository URL in mono below. Right: a terminal-style card (`#0B1220`, three grey dots, a
   `quick start` title) listing five rows — Clone / Configure / Connect / Run Kestara / Build —
   each with a copper step number and a right-aligned mono note.

9. **Final CTA** — 135° midnight→blue gradient with a masked grid: the mark at 54px, H2
   *"Turn Your Next Idea Into Production."*, supporting line, then **Start Building with
   Kestara** (primary) and **Explore AI-DLC** (outline, copper border on hover).

10. **Footer** — brand blurb + PLATFORM / DEVELOPERS / COMPANY columns; COMPANY links to
    About, Contact and Design System.

### 2. About — `pages/Kestara About.dc.html`

1. **Hero** — two columns; eyebrow `ABOUT KESTARA`, H1 *"Engineering the Future of Software
   Development."*, supporting line, and a 380px HUD with the mark (80s ring rotation).
2. **01 · What Kestara is** — two columns, both starting at the top.
   - Left: the numbered index rail + a two-line H2 (`A lifecycle, / not a code generator.`), and
     beneath it a four-row **ordering list** on 1px `#E2E8F0` rules: a mono `NN` (26px column),
     a 14.5px/600 label, and a right-aligned mono tag in `#2563EB` —
     *Discovery before requirements* `ORDERED` · *Requirements before architecture* `ORDERED` ·
     *Approved design before code* `GATED` · *One page built, tested, approved* `PER PAGE`.
   - Right: three paragraphs (max 640px) — what it is, why it exists, why structured workflows
     matter. First paragraph `#334155`, the rest `#64748B`.
3. **02 · Our Philosophy** — heading block (index rail + two-line H2 `Four commitments that /
   shape every phase.`) with a 380px supporting line pulled to the right edge, baseline-aligned
   to the headline. Below: four bordered cells in a `[data-grid]` — *Precision over guesswork ·
   Structure over chaos · Validation over assumptions · Engineering over code generation alone*,
   each numbered `01–04` in mono.
4. **The Kestrel Connection** — midnight gradient, two columns. Left: `Why the Kestrel?` with
   two paragraphs and five pills (Focused observation, Agility, Precision, Controlled movement,
   Adaptability). Right: the five principles as stacked rows, each with a 26px mark, a 16px/600
   name and a description; hover turns the border copper.
5. **AI-DLC Journey** — H2 *"Understand → Plan → Design → Build → Validate → Launch"*, then a
   white card with nine rows: phase number in the stage colour (44px column), phase name
   (`clamp(120px,16vw,200px)` column, 16px/600) and description (flex 1, 14.5px `#64748B`).
   Rows hover to `#F8FAFC`.
6. **CTA** — *"Build Better. Build with Purpose."* → **Explore the Kestara Platform** /
   **Contact Us**.

### 3. Contact — `pages/Kestara Contact.dc.html`

1. **Hero** — midnight gradient, masked grid, and a node-network SVG bleeding off the
   bottom-right at 50% opacity (three blue nodes and two copper nodes joined by
   `rgba(59,130,246,.35)` hairlines — a kestrel's path toward a destination node). H1
   *"Let's Build Something Precise."*
2. **Contact categories** — four cards in a `[data-grid]`: General Enquiries, Product,
   Partnerships, Support. Each has an icon chip, a title, a description and a mono placeholder
   token (`[GENERAL_EMAIL]`, `[PRODUCT_EMAIL]`, `[PARTNERSHIPS_EMAIL]`, `[SUPPORT_CHANNEL]`)
   pinned to the card bottom. A note reads *"Contact addresses are placeholders pending
   confirmed channels."* **No email addresses, phone numbers, offices or social URLs are
   invented — replace the tokens with real channels before launch.**
3. **Form** — two columns. Left: heading, a required-fields note, and a bordered GitHub panel
   (*"Found a bug or have an idea?"* → **Open Kestara on GitHub**). Right: the form card
   (white, radius 16px, 1px `#E2E8F0`, `shadow-md`, padding `clamp(24px,3vw,36px)`).
   - Fields: **Full Name\*** and **Email Address\*** side by side; **Company** (optional) and
     **Subject\*** (select) side by side; **Message\*** (textarea, min-height 132px, vertical
     resize only). The two-up rows collapse to one column below 640px.
   - Subject options: General enquiry · Product and AI-DLC · Partnership · Support · Contribution
   - Labels 13.5px/600 `#334155`; required marked with a `#DC2626` asterisk; inputs 44px,
     radius 10px, 1px `#E2E8F0`, placeholder `#94A3B8`.
4. **CTA** — *"Ready to Build with Precision?"* → **Explore AI-DLC** / **View on GitHub**.

### 4. Design System — `pages/Kestara Design System.dc.html`

A living reference, not a marketing page. Six numbered sections: **01 Logo** (dark, light,
lockup, app icon), **02 Colour** (core palette with usage notes, semantic swatches, the
60/25/10/5 usage bar, AI-DLC stage indicators, hero gradient), **03 Typography** (the full
scale with token names and specs), **04 Components** (buttons light and dark, form fields
including the error state, badges, a sample card), **05 Space, radius, elevation**, and
**06 Motion & accessibility**. A pill row at the top jumps to each section.

---

## Interactions & Behaviour

| Interaction | Behaviour |
|---|---|
| Lifecycle rail node click | Sets the active phase; updates the detail panel, rail fill, dot states and the gliding mark; **cancels autoplay permanently** |
| Lifecycle autoplay | Advances every 2800ms from phase 01; disabled under reduced motion |
| Hero ticker | Mirrors the lifecycle active phase (single source of truth — do not duplicate the state) |
| Internal link click | Loader appears, 720ms hold, then navigation |
| Page load | Loader ~900ms (Home ~1.9s, once per session) then a 500ms fade |
| Card hover | Border to `#3B82F6`, shadow to `0 8px 24px rgba(37,99,235,.1)` |
| Button hover | Gradient deepens / fill darkens one step; no scale effect |
| Nav link hover | `#CBD5E1 → #F8FAFC` |
| Dashed developer button hover | Border turns copper, ink turns white |
| Form field change | Clears that field's error immediately |
| Form field blur | Validates that field only |
| Form submit (invalid) | Validates all, renders the error summary alert, flips invalid borders to `#DC2626`, sets `aria-invalid` |
| Form submit (valid) | Replaces the form with the success card |
| Success card | Green check disc, *"Message sent"*, and **Send another message** which clears all state |
| Rail on narrow screens | Horizontal scroll (never collapses) |

### Validation rules

| Field | Rule | Message |
|---|---|---|
| Full Name | required, non-blank | "Please enter your full name." |
| Email Address | required + `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | "Please enter your email address." / "Enter a valid email address." |
| Company | optional | — |
| Subject | required selection | "Please select a subject." |
| Message | ≥ 10 characters | "Please provide at least a sentence about your project." |

Summary alert (`role="alert"`): *"Please correct the highlighted fields before sending."*

---

## State Management

**Home**
- `active: number` (0–11) — current lifecycle phase
- `auto: boolean` — autoplay on/off, latches to `false` on first pick
- `loading` / `loaderOut: boolean` — loader visibility and fade
- One 2800ms interval; cleared on unmount

**Contact**
- `form: { fullName, email, company, subject, message }`
- `errors: Record<field, string>`
- `submitted: boolean`
- `loading` / `loaderOut`

**About / Design System**
- `loading` / `loaderOut` only

No data fetching. The contact form needs wiring to the approved WordPress form solution
(server-side validation must mirror the rules above; keep nonces and sanitisation on submit).

---

## Assets

All in `assets/`, all hand-built SVG — no raster, no photography.

| File | Use |
|---|---|
| `kestara-mark-dark.svg` | Primary mark for dark backgrounds (blue wings, copper sliver, white body) |
| `kestara-mark-light.svg` | Mark for light backgrounds (graphite body, slate wings, blue sliver) |
| `kestara-mark-mono-white.svg` | Single-colour white — for photography or dense contexts |
| `kestara-mark-mono-graphite.svg` | Single-colour graphite |
| `kestara-lockup-dark.svg` | Horizontal mark + `KESTARA` wordmark, dark backgrounds |
| `kestara-lockup-light.svg` | Horizontal lockup, light backgrounds |
| `kestara-app-icon.svg` | 512px rounded graphite tile with the mark |
| `kestara-favicon.svg` | 64px favicon tile |

The mark is a geometric kestrel built from five straight-edged paths on a `0 0 128 104`
viewBox: two swept wings (deep blue, Kestrel Blue), a copper precision sliver, a white
head/body pointing right, and a blue tail sweeping down-left. Minimum size **24px tall**;
clear space equal to the mark's height on all sides. The lockups reference Montserrat by
name — **convert the wordmark to outlines** before shipping, or keep the mark SVG and set the
wordmark as live text.

> The lockups are geometric interpretations of the supplied Kestara brand board. If a
> production logo file exists, swap these out and keep the layout, sizes and clear space.

---

## WordPress / CMS Content Model

**Static design content** (hardcoded in templates): section eyebrows and index numbers,
principle names, philosophy headings, footer copyright, all iconography and the loader.

**Dynamic CMS content** (ACF Pro):

| Group | Fields |
|---|---|
| Global Options | `kestara_github_url` (single source of truth for every GitHub link), `kestara_docs_url` |
| Home Hero | `hero_badge`, `hero_title`, `hero_title_accent`, `hero_description`, `hero_cta_primary_{label,url}`, `hero_cta_secondary_{label,url}`, `hero_rail_stages` (repeater: `label`) |
| AI-DLC Phases | Repeater or CPT: `number`, `name`, `short_note`, `description`, `owner`, `output`, `indicator_color`, `icon` |
| Home Features | Repeater: `title`, `description`, `icon` |
| Kestrel Principles | Repeater: `name`, `description` |
| How It Works | Repeater: `number`, `kicker`, `name`, `description` |
| Agents | Repeater or CPT: `name`, `role`, `tier` |
| Quick Start | Repeater: `number`, `label`, `note` |
| Final CTA | `heading`, `description`, `cta_primary_{label,url}`, `cta_secondary_{label,url}` |
| About | `hero_{title,description}`, `about_body` (WYSIWYG), `philosophy` repeater, `kestrel_story`, `traits` repeater, `journey` repeater, `cta_*` |
| Contact | `hero_{title,description}`, `contact_categories` repeater (`title`, `description`, `channel`), `form_subjects` repeater, `cta_*` |

The AI-DLC phase set is shared by the Home rail, the Home phase cards and the About journey —
model it **once** (repeater on an options page, or a `dlc_phase` CPT) and query it in all
three places. Handle empty fields gracefully: no field should render an empty wrapper, a
stray separator or a broken link.

---

## SEO

| Page | Field | Value |
|---|---|---|
| **Home** | URL | `/` |
| | SEO title | Kestara — AI Software Engineering Platform \| Build with Precision |
| | Meta description | Kestara orchestrates the software development lifecycle with AI — from requirements and design to development, testing, deployment and production. |
| | H1 | Build with Precision. Move with Speed. |
| | OG title / description | Kestara — Build with Precision. Move with Speed. / An AI-orchestrated development lifecycle: AI-DLC, from idea to production. |
| | Schema | `SoftwareApplication` + `Organization` |
| **About** | URL | `/about/` |
| | SEO title | About Kestara — Engineering the Future of Software Development |
| | Meta description | Kestara brings intelligence, structure and precision to the software development lifecycle through the AI-DLC methodology. |
| | H1 | Engineering the Future of Software Development. |
| | Schema | `AboutPage` + `Organization` |
| **Contact** | URL | `/contact/` |
| | SEO title | Contact Kestara — Let's Build Something Precise |
| | Meta description | Have a project, partnership, question or idea? Connect with the Kestara team. |
| | H1 | Let's Build Something Precise. |
| | Schema | `ContactPage` + `ContactPoint` |

Internal links: Home → About, Contact, Design System, GitHub; About → Home#platform,
Home#aidlc, Contact; Contact → Home#aidlc, About, GitHub. One canonical URL per page, one H1
per page, ordered H2/H3 below it, alt text on every non-decorative graphic, and
`aria-hidden="true"` on decorative SVG.

---

## Accessibility Requirements

- Body text meets 4.5:1 against its background; headline-scale type meets at least 3:1. The
  gradient headline and the amber-on-graphite badge were chosen to clear this at their sizes.
- Visible 2px `#2563EB` focus ring with 2px offset on every link, button, input and rail node.
- The lifecycle rail nodes are real `<button>` elements with `aria-label`; the rail is keyboard
  reachable and its scroll container is focusable.
- One H1 per page; ordered H2/H3 beneath.
- Form fields use real `<label for>`, `aria-required`, `aria-invalid` and inline error text;
  the summary carries `role="alert"`.
- Status is never colour-alone — every dot is paired with a text label.
- Loader is `role="status"` with an accessible label and is skipped under reduced motion.
- All decorative SVG is `aria-hidden="true"`; the logo carries `role="img"` + `aria-label`.

---

## Testing Requirements

- **Viewports:** 320 · 375 · 390 · 430 · 768 · 820 · 1024 · 1280 · 1440 · 1920. No horizontal
  overflow at any width (the lifecycle rail is the only intentional horizontal scroller, and
  it is contained).
- **Grids:** confirm 4 / 2 / 1 columns at the documented breakpoints — rows must fill evenly
  with no orphan row.
- **Sticky header:** verify it stays pinned through full-page scroll on every page.
- **Lifecycle rail:** labels never collide (each slot ≥85px); autoplay stops on click; the
  mark lands centered over the active node.
- **Form:** every validation rule, the error summary, the success state and keyboard-only
  completion.
- **Loader:** appears on load and on internal link clicks; never traps focus; absent under
  reduced motion.
- **Browsers:** Chrome, Firefox, Edge, Safari.
- **Performance:** run PageSpeed on mobile and desktop before and after optimization; lazy-load
  below-the-fold imagery; do not preload ordinary page images; subset Montserrat and JetBrains
  Mono to the weights listed above (400/500/600/700 and 400/500) and self-host them.

---

## Open Decisions for the Developer

1. **GitHub repository URL** — every link currently renders the literal placeholder
   `[KESTARA_GITHUB_REPOSITORY_URL]`. Store it once in global site settings.
2. **Contact channels** — the four category tokens and the form's destination address are
   placeholders. Nothing was invented.
3. **Production logo** — replace the geometric SVGs here if an official file exists.
4. **Form solution** — which WordPress form plugin (or custom handler) the contact form posts to.
5. **Documentation URL** — the "Read the Documentation" button currently points at the
   repository placeholder.
