# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built world on 2026-08-05, not from intention. Where this file and
`src/index.css` disagree, the CSS is right and this file is stale.

## World

**Editorial Rule.** Swiss editorial minimalism: the page is a ruled sheet. A visible
twelve-column grid drawn in hairlines, a marginal meta column, and content set in rows —
never cards. One grotesk across the whole site. The ornament *is* the grid.

Chosen by the user from three fully built previews (`/preview/editorial/`, `/preview/`,
`/preview/stage/`, all kept, all `noindex`), then fused with a name-first masthead at
their explicit direction. User-pinned: the concept-seed roll was set aside.

The contract lives as an HTML comment at the top of `<body>` in
`src/layouts/BaseLayout.astro` and survives the production build — grep
`DIRECTION CONTRACT — user-pinned` to audit any route against it.

## Colour

Roles assigned from **measured contrast on white**, before use:

| Token | Value | On white | Role |
|---|---|---|---|
| `--ink` | `#0A0A0B` | 19.3:1 | body and display |
| `--mid` | `#6B6B76` | 5.1:1 | secondary text, tags, meta |
| `--violet` | `#6D28D9` | 7.1:1 | the accent — spent deliberately, about once per viewport — and the focus ring |
| `--rule` | `#E6E6EA` | — | hairlines and the drawn grid |
| `--paper-dim` | `#FAFAFA` | — | row hover, invalid-field tint |

**Colour fields (user-pinned 2026-08-05):** two full-bleed bands pace the sheet — ink
`#0A0A0B` on Competencies, deep violet `#5B21B6` on Contact. A field is a token override:
`--ink/--mid/--rule/--paper-dim/--violet` re-resolve inside it, so every class works
unchanged; only the violet band's white inputs carry literal overrides so their internals
never inherit light-on-light. The bleed pair (`margin-inline`/`padding-inline` calc) breaks
the 1320px sheet to the viewport edge; `overflow-x: clip` on `html` absorbs the
scrollbar-width excess. This supersedes the original once-per-viewport violet budget.

**Red is not in this system** and may not return, including as an error state. Errors
signal with a doubled ink border, a field tint, an icon, and a named recovery message.

**One appearance.** No dark mode, no toggle, no `prefers-color-scheme` branch.
Reintroducing theming is a product decision, not a styling one.

## Type

One self-hosted variable face: **General Sans** (100–900), 38 KB, no third-party origin.
Declared under `--font-*` — never `--color-*`, where Tailwind silently ignores it (the
pre-redesign build shipped system fonts for months because of exactly that).

Four steps, no more:

| Class | Size | Weight | Tracking |
|---|---|---|---|
| `.t-display` | `clamp(3.2rem, 9vw, 9rem)` | 500 | `-0.045em` |
| `.t-head` | `clamp(1.75rem, 3.4vw, 3.25rem)` | 500 | `-0.035em` |
| `.t-sub` | `clamp(1.05rem, 1.5vw, 1.35rem)` | 500 | `-0.02em` |
| `.t-meta` | 12px uppercase, `0.08em`, tabular | 500 | — |

Body is 16px/1.5; `.t-body` caps at 62ch in `--mid`.

## Structure

- `.sheet` — the 1320px measure. `.grid-lines` draws its twelve columns as fixed,
  pointer-inert hairlines (four below 900px). **It shares `.cols`' `column-gap`** — the
  drawn grid and the layout grid are the same grid, measured to the pixel, or neither is
  worth drawing. Navbar and footer sit on the sheet too; no second container width exists.
- `.cols` / `.c-meta` / `.c-main` — the marginal-meta grid (columns 1–2 / 4–11).
- `.row` / `.row-n` / `.row-t` / `.row-d` — record rows: number or period | setting |
  annotation (columns 1–2 / 4–8 / 9–12). `.row-mark` is the violet hairline that draws
  under a linked row.
- `.band` — a section; hairline top rule, generous block padding.
- `.social-rail` — ink capsule, fixed right, vertically centred, ≥1200px only. Rendered
  AFTER the page slot so the skip link stays the first focusable element on every route.

**The layout breakpoint is 900px everywhere.** Order utilities that pair with these grids
must use `min-[900px]:`, never Tailwind's `md:` (768px) — mixing them once inverted the
hero across the 768–899 band and turned the meta column into a banned eyebrow.

**Cascade rule (this bit twice):** element resets live in `@layer base`; any custom class
that components combine with Tailwind utilities (`.t-meta`, `.tags`) lives in
`@layer components`. An unlayered class silently beats every utility.

## Controls

- `.act` / `.act-ghost` — 48px min height, squared, ink-filled or hairline-ghosted; hover
  turns violet, `:active` confirms the press at `scale(0.97)` in 160ms.
- `.field` — 48px min height. Invalid: 2px ink border + tint + icon + message naming the
  problem and the recovery, per field, bilingual; focus moves to the first invalid field.
- `.row-link` — stretched link: the whole row is clickable, one target in the
  accessibility tree, underline drawn by `.row-mark` rather than text decoration.
- Focus is `2px solid var(--violet)` at 3px offset. `.skip-link` is off-canvas, a real
  target once focused; both layouts share it.

## Motion

Calibrated by frequency, not by taste (the Emil Kowalski pass):

- **Hero entrance** (once per visit): lines lift from behind masks, 800ms strong ease-out,
  60ms stagger (`.mask`, `.d1–.d4`). Markup ships whole — extraction reads clean text.
- **Scroll reveals**: native `animation-timeline: view()`, linear on purpose (the easing
  IS the scroll position), opt-in inside `@supports` so extraction and old browsers see
  fully visible content. The timeline routes through `var(--tl)` because Lightning CSS
  folds `animation-*` longhands into the shorthand, which resets `animation-timeline` and
  makes Chrome drop the declaration whole. Do not "simplify" it back.
- **Hovers** (seen tens of times): 150–200ms plain `ease` for colour, 200ms strong
  ease-out for movement. The `.row-mark` underline is asymmetric — draws in at 420ms,
  retracts at 180ms.
- **Press**: every `.act` scales to 0.97 in 160ms.
- **Aurora** (`.aurora`, hero only): three light-violet gradient lobes (#C4B5FD/#A78BFA/#DDD6FE)
  under one 80px blur, drifting on 18–28s clocks. Decorative, pointer-inert, no script.
  Its opacity is a contrast budget: cores sit right of the reading column and the worst
  case (violet display over the densest lavender) measures 3.9:1 against the 3:1 large-text
  floor. Re-measure the sweep before touching these values.
- **Reading progress** (`.progress`): 2px violet bar on `animation-timeline: scroll()`,
  zero JS, invisible in browsers without support. It complements the scrollbar — the
  scrollbar is thinned and tinted, never removed: position affordance and drag stay.
- **Image unveil** (`.img-reveal`): project screenshots clip-path-reveal on their own
  view() timeline.
- `prefers-reduced-motion`: the page stops moving without stopping responding — no global
  duration kill; state feedback survives.

## Budget

15 routes (12 production + 3 noindex previews) · **0 bytes of external JavaScript** ·
one CSS bundle · 38 KB production font. The only scripts are inlined: `navbar.ts`
(scroll spy, disclosure menu, language-switch hash preservation) and the Contact
validator. Aurora, reading progress, reveals and unveils are all CSS.

## Verified

Measured on the built output at 1440, 816 and 390px, both locales: **zero WCAG AA
contrast failures**, no horizontal overflow, no target under 24×24, name-first order
below 900px, detector at 0 anti-patterns, 56/56 tests.

Standing measurement traps, so they are not rediscovered: `serve -s` rewrites every route
to the root `index.html` (verify locales against `dist/es/` or a non-rewriting server);
a contrast script must parse `color(srgb …)` and composite alpha down the ancestor stack;
`visibilityState` is `hidden` during automated JS calls, which freezes
`IntersectionObserver`-driven state.
