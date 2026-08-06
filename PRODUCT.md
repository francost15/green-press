# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: technical recruiters and hiring managers** screening Franco Sanchez for a
full-time engineering position. They arrive from a job application, a LinkedIn profile, or a
search, scan fast, and are looking for verifiable trajectory, stack, and credentials. The CV
download is their conversion.

**Secondary: founders, CTOs, and managers** evaluating Franco to build an AI product for
them. They read for delivered outcomes and execution risk; the contact form is their
conversion.

Both audiences are served. **When a design decision cannot satisfy both, the recruiter
wins.** The site currently carries signals aimed at the client audience — an "available for
projects" badge, cost-reduction framing in the tagline — which is a deliberate secondary
track, not the primary one.

Audience is bilingual: Spanish and English are equal-priority, not a translation of a
primary. Franco is based in Puebla, México, which puts Spanish-first local readers and
English-first remote/international readers in the same funnel.

## Product Purpose

A personal portfolio at `fsanchezt.com` that gets Franco Sanchez hired or contracted. It
exists to compress five years of work into something a recruiter can verify in under a
minute and a client can trust in under five. Success is a CV download or a contact-form
submission from someone qualified.

A second, explicit purpose: **being found and cited correctly by AI search engines.** The
site is under active Generative Engine Optimization work — every page must ship complete,
extractable static HTML, and the project has already rejected one architecture (prerendered
hidden modals) on measured extraction grounds.

## Positioning

Franco works at the intersection of **AI, software engineering, and product** — the claim is
not "I know machine learning" but "I take AI products from concept to production and measure
what they saved." Every project in the record is framed as problem → solution → impact, with
a number attached to the impact. That framing, applied consistently across five shipped
systems in real companies (textile manufacturing, accounting/CFDI, university operations,
recruitment), is the differentiator a neighboring portfolio could not truthfully copy.

The work is concentrated in **operational Mexican businesses**, not consumer products or
research: ERP, electronic invoicing under CFDI regulation, plant-floor traceability,
institutional support. Domain fluency in that context is part of the position.

## Operating Context

- Read on both desktop and mobile, often in a fast comparison pass against other candidates.
- Recruiters frequently arrive with the CV as the goal and the site as verification.
- Reached in two languages via URL, not client state: English at `/`, Spanish at `/es/`.
- Increasingly reached indirectly — summarized or cited by an AI assistant rather than read
  directly. Extractable content is a functional requirement, not an SEO nicety.

## Capabilities and Constraints

- **Twelve prerendered routes**: home plus five project detail pages per language, plus a
  build-time sitemap. Project detail lives at its own URL, never in a modal.
- **JavaScript is permitted for animation** as of 2026-08-05, at Franco's direction (GSAP
  was explicitly allowed). The constraint that remains: no UI framework, and no `client:*`
  directive, which would reintroduce a component runtime. The current build still ships
  **zero external JavaScript** — all motion is native CSS (masked entrances, scroll-driven
  timelines, the aurora). Reach for a library only when CSS genuinely cannot do the job.
- **All content in `src/data/` must be bilingual** (`{ es, en }`) and all dates ISO. A
  monolingual string leaks onto the wrong locale.
- **`SITE` in `src/i18n.ts` is the single source of the origin** — canonicals, hreflang,
  `og:url`, sitemap, and every JSON-LD `@id` derive from it. Set to `https://www.fsanchezt.com`
  because the apex 308-redirects there. Guarded by a test.
- **Content must never be hidden to expose it to crawlers.** No `[hidden]`, `sr-only`, or
  `opacity:0` as an extraction strategy — the extraction pipelines AI systems run discard
  hidden subtrees before embedding.
- Deployed as static output to Vercel. Contact form posts to Formspree.
- **The site has one appearance.** Dark mode and the theme toggle were removed on
  2026-08-04 at Franco's direction: no stored preference, no theme-init script, no
  `prefers-color-scheme` branch. Reintroducing theming is a product decision, not a
  styling one.

**Resolved 2026-08-04:** the recruiter leads the first viewport; the contract-work line stays
but sits below the actions at lower weight.

## Brand Commitments

- Name: **Franco Sanchez**. Title: **AI & Software Engineer**.
- Voice: direct, outcome-first, numeric. First person. No hedging, no marketing inflation.
- Palette pinned by Franco: **white and neon violet.** Confirmed again 2026-08-05 against a
  dark neon reference — white ground won, neon violet is the light. The pre-redesign site was
  violet on near-black, so this carries the existing brand recognition into light.
- Franco asked for "a more designer feel with better animation" on 2026-08-05. Motion is
  part of the brand now, not decoration.
- Bilingual parity is an identity commitment, not a feature.
- `Towel S.A. de C.V.` is a normal employer and stays in both the visible experience section
  and the JSON-LD `worksFor`. Confirmed 2026-08-02 — do not re-raise.
- Existing assets: `public/cv-franco-sanchez.pdf`, `public/og-image.png`, `public/favicon.svg`.
- No logo or wordmark exists beyond the name set in type.

## Evidence on Hand

**Real and specific — safe to build on:**

- Five shipped projects with named problem, solution, and impact, at `src/data/projects.ts`.
  Four have real screenshots in `public/projects/` (responsive WebP, two sizes). **Textile
  Production ERP has no images.**
- Five roles with dates and descriptions at `src/data/experience.ts`: Towel S.A. de C.V.
  (Oct 2025–present), Idea15, Universidad del Valle de Puebla, Telesecundaria Lázaro Cárdenas
  del Río, WimxTelecom (Sep 2020–Sep 2023).
- Three education entries at `src/data/education.ts`: Master's in AI at UNIR México (in
  progress, 2026), AI Diploma at Universidad Anáhuac Puebla (completed), Systems and IT
  Engineering at UVP (completed). IEEE member.
- Real contact channels: `contacto@fsanchezt.dev`, `+52 220 157 0694`, GitHub, LinkedIn.

**Qualified — use with care:**

- The headline metrics (85% cost reduction, 97%+ accuracy, 90% report-time reduction, 92%
  forecast accuracy, 80% workflow automation, 75% screening reduction, 65% L1 resolution,
  40% visibility improvement) are **good-faith estimates of real outcomes, not formally
  measured benchmarks.** Confirmed 2026-08-02. They may be stated as Franco states them.
  They must never be presented as audited, third-party-verified, or benchmark figures, and
  no new metric may be invented alongside them.

**Asserted but unsupported — do not amplify:**

- `src/data/profile.ts` declares `5 Awards Won` and `4 Certifications`. Neither is listed,
  named, or evidenced anywhere on the site, and neither currently renders. Do not surface
  these as claims, and do not invent the specific awards or certificates.

**Absent — must not be fabricated:** no testimonials, no client quotes, no case studies
beyond the five project records, no pricing, no availability calendar, no press.

## Product Principles

1. **Verifiable beats impressive.** Every claim traces to a named company, a dated role, or a
   shipped system. A number without a project behind it does not belong on this site.
2. **The recruiter's minute is the budget.** Trajectory, stack, and credentials must be
   reachable without scrolling patience. Depth is available, never required.
3. **Both languages are the product.** Neither locale is a translation of the other's
   experience; a defect in one is a defect in the product.
4. **Extractable or it does not exist.** Content that a text-extraction pipeline drops is
   content that AI search cannot cite. Nothing important may depend on script or on being
   visually revealed.
5. **The performance budget is an identity, not a setting.** Zero shipped framework
   JavaScript is a claim this site makes about its author by existing.

## Accessibility & Inclusion

WCAG 2.2 Level AA is the target. Established as a product requirement
because the primary audience includes recruiters using assistive technology and keyboard-only
navigation, and because the site's own credibility argument is undermined by an engineer's
portfolio that fails an automated accessibility check.

The 2026-08-02 audit measured the pre-redesign site at 11/20, with AA failures in both
themes. The redesign addresses those findings at the source rather than by patching: colour
roles are assigned from measured contrast before they are used, the masthead no longer
translates out of view while holding focusable links, targets are built at 44px, and the
contact form identifies errors per field with a named recovery.
