# green-press — fsanchezt.com portfolio

Astro 7 static site. No UI framework: every component is `.astro`, and the little
interactivity there is runs as plain TypeScript modules. Package manager is pnpm.

## Architecture

Twelve prerendered routes: a home page and five project pages per language, plus a
generated sitemap.

- `src/pages/index.astro` — English, the default locale, unprefixed
- `src/pages/es/index.astro` — Spanish
- `src/pages/projects/[slug].astro` and `src/pages/es/proyectos/[slug].astro` — one page per
  project, from `getStaticPaths` over `src/data/projects.ts`
- `src/pages/sitemap.xml.ts` — generated at build time, so routes and `lastmod` cannot drift.
  There is deliberately no `public/sitemap.xml`.
- `src/layouts/Portfolio.astro` — the shared page body; takes `lang` and passes it down
- `src/layouts/BaseLayout.astro` — `<head>`: per-locale SEO meta, hreflang, JSON-LD, the
  self-hosted font preloads, and the direction contract as the first child of `<body>`

`src/i18n.ts` holds the whole translation layer: `useTranslations(lang)` returns
`t(spanish, english)`. The argument order is deliberate — it matches how the copy was
originally authored, so the markup reads the same as before the migration. Language is a
URL, not client state; the toggle in the navbar is an `<a>` to the other locale.

Sections live in `src/sections/*.astro`, shared pieces in `src/components/*.astro`.
Content comes from `src/data/*.ts`.

## Interactivity

There is no client framework. Behaviour lives in two places:

- `src/scripts/navbar.ts` — imported by the `<script>` block of `Navbar.astro`. It is a
  separate module specifically so the test suite can drive it against real rendered markup.
- One inline `<script>` block, in `Contact.astro`, for form validation and submission.

**Two compiler traps this project has already hit, both silent:**

1. Base element styles MUST stay inside `@layer base`. An unlayered `p { margin: 0 }`
   outranks every Tailwind utility and collapsed the hero's margins to zero.
2. Lightning CSS folds `animation-*` longhands into the `animation` shorthand, and that
   shorthand RESETS `animation-timeline` — producing invalid CSS that Chrome drops whole.
   Scroll-driven animations therefore route the timeline through `var(--tl-view)`, which
   cannot be folded. Do not "simplify" that back to a shorthand.

The build ships **zero external JavaScript** — Astro inlines all of it. Keep it that way:
adding a UI framework component with a `client:*` directive would pull a runtime back in.

**The site has one appearance.** Dark mode, the theme toggle, `scripts/theme.ts` and the
inline theme-init script were removed on 2026-08-04 by product decision. There is no
`data-theme` attribute and no `prefers-color-scheme` branch anywhere.

`src/index.css` carries the visual system. Its base element styles live inside `@layer base`
on purpose: an unlayered `p { margin: 0 }` outranks every Tailwind utility and silently
collapses margins to zero.

## SEO / GEO

Every page ships complete static HTML, and all of it must stay extractable.

**Never put content behind `[hidden]`, `sr-only`, or `opacity:0` to "expose it to
crawlers".** The site used to prerender project detail into hidden modals on the strength of
that reasoning. The 2026-08-02 audit measured it: 708 of the home page's 1000 words were
inside those subtrees, and the boilerplate-removal pipelines AI retrieval systems run
(Readability, trafilatura) discard hidden subtrees before embedding — so effective
extractable content was ~292 words. The modals are gone; project detail now lives on
`/projects/<slug>/`, which took extractable English content to ~1,170 words.

**`SITE` in `src/i18n.ts` is the only place the origin is written.** Canonicals, hreflang,
`og:url`, the sitemap, and every JSON-LD `@id` derive from it. It is set to
`https://www.fsanchezt.com` because the apex 308-redirects there — declaring the apex would
point all of those at a redirect. Changing to the apex means editing that constant *and*
flipping the Vercel primary domain. `src/test/canonical-host.test.ts` guards this.

**Content in `src/data/` must be bilingual.** `tags`, `highlights`, and prose fields are all
`{ es, en }`, and dates are ISO (`{ start: "2025-10", end: "present" }`) formatted through
`src/lib/dates.ts`. A monolingual string leaks onto the wrong locale — 43 Spanish tokens
were shipping on the English page before this was enforced. `src/test/dates.test.ts` guards
the date half of that.

## Commands

- `pnpm dev` — dev server on http://localhost:4321 (a daemon; `pnpm exec astro dev stop`)
- `pnpm build` — static build into `dist/`
- `pnpm check` — `astro check`
- `pnpm test` — Vitest

## Testing

`.astro` components are rendered through the Astro container API; `src/test/render.ts`
wraps it and returns Testing Library queries. Two constraints are easy to trip over:

- `vitest.config.mts` sets `testTransformMode: { ssr: ["**/*"] }`. Without it the jsdom
  (web) transform compiles `.astro` into a browser stub that throws on render.
- `renderAstro` appends to `document.body`, because `toBeInTheDocument` fails on a
  detached node.

Container rendering does not execute a component's `<script>`, which is why the theme and
navbar logic sit in `src/scripts/` — those are unit-tested directly. The Projects lightbox
and the Contact form submit path are only covered by their static markup.

## Notes

- Tailwind 4 is wired through `@tailwindcss/vite` in `astro.config.mjs`.
- `src/data/iconMarkup.ts` is generated — it was produced by rendering the old React icon
  components once. Do not hand-edit the path data.
- Deployment is Vercel, static output from `dist/` (see `vercel.json`).
