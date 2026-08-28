# GEO Audit Report: fsanchezt.com

**Audit Date:** 2026-08-02
**URL:** https://fsanchezt.com
**Business Type:** Personal Portfolio (Agency/Services pattern)
**Pages Analyzed:** 2 built routes (`/`, `/es/`) + live production origin
**Previous Audit:** 2026-06-25 — 40.3/100 (preserved as `GEO-AUDIT-REPORT-2026-06-25.md`)

---

## Executive Summary

**This audit reports two scores, because the site has two states.**

| State | Score | Rating |
|---|---|---|
| **Live production today** | **11/100** | Critical |
| **New Astro build, once deployed** | **42/100** | Poor |

The headline finding is not about the code. It is that **two consecutive audits have now scored a build that was never deployed.** The June audit recorded the SPA-with-no-SSR problem as "fixed via Vite SSR prerender." It was never shipped. Since then the site has been fully rewritten in Astro — also not shipped. Production has served the same React shell since 2026-07-17.

Verified by fetching the origin as GPTBot:

```
$ curl -sI https://fsanchezt.com/
HTTP/2 308
location: https://www.fsanchezt.com/

$ curl -s https://www.fsanchezt.com/   # 4,241 bytes total
<body>
  <div id="root">
    <!-- Empty root — React handles all rendering with its own fade-in animation -->
  </div>
</body>
```

Seven indexable words. No `<h1>`. One minimal `Person` block. `/es/` returns 404. Every AI crawler is permitted and every one of them finds nothing.

**The second finding is that deploying does not rescue the score.** The new build is a genuine engineering improvement — fully prerendered, zero external JavaScript, ~30 KB gzipped critical path, valid per-locale hreflang — and it lifts Technical GEO from 25 to 78. But the composite moves only from 40.3 to 42, because the binding constraints are not architectural. Brand Authority scores **8/100** and Content E-E-A-T scores **38/100**, and neither is fixable by a build system.

The blunt version: this site is now technically excellent at delivering content that no AI system has a reason to cite, about a person no AI system can reliably identify.

### Score Breakdown (post-deploy)

| Category | Score | Weight | Weighted |
|---|---|---|---|
| AI Citability | 55/100 | 25% | 13.75 |
| Brand Authority | 8/100 | 20% | 1.60 |
| Content E-E-A-T | 38/100 | 20% | 7.60 |
| Technical GEO | 78/100 | 15% | 11.70 |
| Schema & Structured Data | 42/100 | 10% | 4.20 |
| Platform Optimization | 27/100 | 10% | 2.70 |
| **Overall GEO Score** | | | **41.6/100** |

### Change since 2026-06-25

| Category | June | Now | Δ | Why |
|---|---|---|---|---|
| AI Citability | 52 | 55 | +3 | Content is real HTML now, but 71% of it is hidden (C3) |
| Brand Authority | 7 | 8 | +1 | Nothing off-site changed |
| Content E-E-A-T | 52 | 38 | **−14** | Re-scored by verifying claims; mixed-language contamination is new |
| Technical GEO | 68 | 78 | +10 | The Astro build — scored against an undeployed artifact both times |
| Schema | 48 | 42 | −6 | Two vocabulary violations found on strict validation |
| Platform | 19 | 27 | +8 | Post-deploy readiness only; live is 17 |

E-E-A-T fell because this audit verified claims rather than counting fields, and because the migration introduced 43 Spanish-language tokens into the English page.

---

## Critical Issues (Fix Immediately)

### C1 — Nothing is deployed

Production serves a React shell with 7 indexable words. Every finding below describes an artifact sitting in `dist/`, uncommitted and gitignored. **No other action on this list produces any measurable effect until this one is done.** This is the third cycle in which the fix exists locally and not in production.

### C2 — The apex domain 308-redirects to `www`, and the entire build declares apex

`https://fsanchezt.com/` → `308` → `https://www.fsanchezt.com/` (which serves 200). Meanwhile the new build declares the apex in: both canonicals, all three `hreflang` links, `og:url`, all six sitemap URLs, the `Sitemap:` line in `robots.txt`, and the JSON-LD `@id`/`url` values.

Deploy as-is and 100% of sitemap URLs return 308, every canonical points at a redirect, and the entity `@id` resolves through a hop. Worse, the `www` host that actually answers currently serves the English page under `<html lang="es">`.

**Fix before deploying, not after.** In Vercel → Project → Domains, make `fsanchezt.com` primary and redirect `www` to it. Verify `curl -I https://fsanchezt.com/` returns `200`.

### C3 — 71% of the page's words are inside `[hidden]` subtrees

Measured on `dist/index.html`:

| Region | Words |
|---|---|
| Total body text | 1,000 |
| Inside `<div data-modal="…" hidden>` | **708** |
| Visible / extractable | **292** |

This is a self-inflicted regression from the Astro migration, introduced on the explicit belief that it *helped* GEO. It does not. Readability, trafilatura, and the boilerplate-removal stage that most AI retrieval pipelines run before embedding all drop `[hidden]` subtrees by design. The effective corpus is ~292 words: navigation, the tagline, three stat numbers, headings, and form labels.

The compounding problem is that the hidden 708 words are the *good* ones. Every problem/solution/impact narrative — the highest-citability content on the site — sits inside a modal.

**Fix:** give each project a real route (`/projects/<slug>/`). Astro's `getStaticPaths` makes this ~30 lines. Five indexable 300–500-word pages beat one 292-word page. Do **not** swap `hidden` for `sr-only` or `opacity:0`; that is cloaking-adjacent, and extractors that apply CSS still drop it.

### C4 — No third-party corroboration of the entity, anywhere

Wikidata `wbsearchentities`: empty array. Wikipedia: nothing. Reddit, YouTube (channel exists, 0 videos), Dev.to, Medium (404), Hashnode ("User not found"), Stack Overflow, Crunchbase, Clutch, Upwork, Contra, Workana, Torre: nothing. No talks, no press, no published writing.

AI systems resolve entities by cross-source agreement. There are exactly two sources here, both self-controlled, and they use different identifiers.

### C5 — The name does not resolve to this person

"Franco Sanchez" is a high-collision name and nothing currently on the site breaks the tie. Verified collisions: a Franco Sanchez doing AI/LLM platform engineering at **nivii.ai** — same field; **Francisco Franco-Sánchez**, a University of Alicante academic with Academia.edu and Cervantes Virtual pages, who dominates the surname cluster; and **eight other Franco Sanchez LinkedIn profiles that rank above his** in a name search. Also in the result set: a Foot Mercato journalist and a DataCamp data portfolio.

The exact string `"Franco Alessandro Sanchez Trinidad"` returns **zero** web matches. The `alternateName` in the JSON-LD is therefore an assertion with no corroborating edge — it cannot disambiguate anything by itself.

**A constraint that shapes the fix:** the owner runs a separate venture that he does not want used as a discovery path for this portfolio. That is a legitimate call, but it removes the easiest disambiguation shortcut — an attached company name is normally the strongest single token for separating same-name professionals. Disambiguation therefore has to come entirely from identifiers he controls directly: the **Wikidata item**, an **ORCID iD**, one **standardized handle** used everywhere, and the **Towel S.A. de C.V.** employment edge. That set is sufficient, but it means the Wikidata item moves from "recommended" to **non-optional** — it is now the load-bearing signal rather than a supporting one.

Worth stating plainly: search engines and AI systems build associations from public data regardless of preference, so separation is a matter of what this site *asserts and links*, not something the site can enforce. The practical goal is that queries for this portfolio resolve here — not that other associations never form.

### C6 — Schema contains a claim the page contradicts

```json
"description": "AI & Software Engineer with 5+ years shipping production AI systems…"
```

Cross-checked against the site's own Experience section: WimxTelecom (2020–2023) was application lifecycle and telecom network infrastructure; Telesecundaria (2023–2024) was IT support and project management. AI work begins at UVP in Feb 2024. **The page supports ~2 years of production AI, not 5+.**

"5+ Years of Experience" in the hero is accurate. The schema narrows it to AI and thereby overstates. Structured data contradicting visible content is exactly what Google's quality guidelines penalize.

**Fix:** `"5+ years in software engineering, building production AI systems since 2024."`

### C7 — Mixed-language contamination on the English page

43 Spanish token occurrences across 24 distinct untranslated strings on `/`: `Predicción`, `Arquitectura`, `Gestión Industrial`, `Algoritmos de Match`, `Sistemas de Gestión`, `Facturación Electrónica`, `IA / OCR`, `Automatización Financiera`, `Liderazgo`, `Mentoría`, `Gestión de Proyectos`, `Soporte TI`, `Optimización`, `Desarrollo de Software`, `Redes`, `Infraestructura`, `Alta Disponibilidad`, `Aprendizaje profundo`, `Aprendizaje automático`, `Visión por Computadora`, `Mentor de Carrera`, `Hackatones`, `Eventos Estudiantiles`, `Miembro IEEE` — plus Spanish dates in **all five** experience periods and both education periods (`Oct. 2025 — Presente`, `Ago. 2025 — Sept. 2025`).

Root cause: in `src/data/`, `tags`, `period`, and `highlights` are typed `string[]` / `string`, while the adjacent `role` and `description` correctly use `{ es, en }`. 56 monolingual strings total.

This is worse *because* the hreflang setup is correct: the site tells crawlers "this is the English version" and then serves half-Spanish content. It degrades language detection, splits the English keyword surface (an English query for "computer vision" never matches `Visión por Computadora`), and reads to a human evaluator as an unfinished machine translation.

**Fix:** localize the types. For dates, store ISO (`start: "2025-10"`) and format with `Intl.DateTimeFormat(lang, {month:"short", year:"numeric"})` so localization is structural rather than hand-maintained.

---

## High Priority Issues

### H1 — The GitHub identity is split, and the linked account is anonymous

Verified via the GitHub API:

| | `francost15` (the one in `sameAs`) | `FrancoSanchez9` |
|---|---|---|
| name | `null` | `Franco Alessandro Sanchez Trinidad` |
| bio / blog / location | all empty | all empty |
| company | `null` | `Fusion AI Software` |
| public repos | 37 | 2 |
| followers | 1 | 0 |
| **total stars** | **0** | 0 |
| profile README | 404 | 404 |
| repos with a description | 4 of 37 | — |

The strongest entity edge the site has points at an account with no name, no bio, no location, and no link back to the site. The account carrying the real name is referenced nowhere and claims a *different* employer than the portfolio does (Fusion AI Software vs. Towel S.A. de C.V.).

This is the highest authority gain per minute available anywhere on this list: roughly 30 minutes to set the profile fields, create `francost15/francost15` with a README, and cross-link or consolidate the second account.

### H2 — Two invalid schema properties, confirmed against the vocabulary

1. **`programmingLanguage` on `SoftwareApplication`** — 5 occurrences. Its `domainIncludes` is `SoftwareSourceCode` only. (`React` and `Next.js` are also not programming languages; `runtimePlatform` is the right property.)
2. **`author` on `ItemList`** — `author` requires `CreativeWork` or `Rating`; `ItemList` is an `Intangible`. A parser drops this triple, orphaning the project list from the Person node. The per-item `author` refs are valid, so the graph survives.

### H3 — `SoftwareApplication` is the wrong type for private client systems

These are internal/client-delivered systems with no download and no public instance. Google's Software App rich result requires `offers`, `aggregateRating`/`review`, and `operatingSystem` — none of which can be honestly supplied here. **Do not add them to chase eligibility; that would be fabrication.** Retype to `CreativeWork`, or `SoftwareSourceCode` where a public repo exists (dropping `applicationCategory`, which is `SoftwareApplication`-only).

### H4 — No question-shaped content anywhere

All 26 headings are noun labels: `Competencies`, `Projects`, `Impact`, `Problem`. Zero `How…`, `What is…`, `Why…`. Zero `<ul>`/`<ol>`/`<table>`. One definitional statement on the entire site — the RAG parenthetical — and notably that block scores highest on citability precisely because of it. Definitions and Q&A are the two most-extracted sentence shapes in AI answers.

### H5 — Impact metrics are unattributed sentence fragments

The rendered HTML says `Impact` / `90% reduction in report generation time…` — no subject, no verb, no actor, no date, no client. An LLM cannot lift this without inventing the attribution. Self-containment scores 30–35 across all five.

Perversely, **the JSON-LD is more citable than the visible page**: the schema says `"Reduced report generation time by 90%."` — a complete sentence bound to an author `@id`. That is backwards, because retrieval systems chunk rendered text.

### H6 — Authoritativeness infrastructure is absent (5/25)

21 links on the page; 6 external, resolving to 2 unique URLs, both self-owned. Zero citations, zero testimonials, zero named clients, zero named awards, zero named certifications, zero articles. The `Project` interface defines `link?` and `github?` and **not one of the five projects populates either** — an AI engineer's portfolio with no code and no demo.

### H7 — The written bio is never rendered

`profile.ts` contains a 150-word first-person bio in both languages. `grep` for `profile.bio` across all `.astro` files returns nothing. The site's longest self-description is the 13-word tagline.

A related correction to the working assumption: the "5 Awards" and "4 Certifications" hero stats are **also never rendered** — `Hero.astro` hardcodes only three stats, leaving `profile.stats[2]` and `[3]` dead. So there is no credibility cost from unnamed credentials today; there is a missed opportunity. **Ship the names, not the counters.**

⚠️ The dead bio claims accuracy **"above 97%"** while every rendered project and `llms.txt` cap at **92%**. Correct that number before rendering it.

### H8 — Below-hero content is `opacity:0` until JavaScript runs

`.anim-enter` and `.stagger-item` are `opacity:0` in the stylesheet, restored only by the IntersectionObserver script. The `prefers-reduced-motion` block resets `.hero-item` but **not** those two — 23 elements. If JS fails, a human sees a hero and a blank page.

```css
@media (scripting: none) {
  .anim-enter, .stagger-item, .hero-item {
    opacity: 1 !important; filter: none !important; transform: none !important;
  }
}
@media (prefers-reduced-motion: reduce) {
  .anim-enter, .stagger-item { opacity: 1; filter: none; transform: none; }
}
```

### H9 — No privacy policy despite collecting PII

The Formspree form collects name, email, and message. Grepping both builds for `privacy|privacidad|terms|aviso` returns zero matches. Mexico's LFPDPPP requires an *aviso de privacidad* at the point of collection, and Trustworthiness is the E-E-A-T dimension weighted most heavily.

### H10 — Bing signals still absent, unchanged since June

`/indexnow.txt` → 404. No `msvalidate.01` meta tag. No Webmaster Tools verification. DuckDuckGo (Bing-derived) returns *"No results found"* for `"fsanchezt.com"`. Bing's own `site:` query served a CAPTCHA, so indexation is **unknown, not confirmed-zero** — but the signal is not encouraging. Bing Copilot is the weakest platform at 18/100.

---

## Medium Priority Issues

- **M1 — 21 duplicated tokens in extracted text.** `TechIcon.astro` gives a decorative glyph `role="img"`, `aria-label={name}`, *and* a `<title>`, while it sits beside a visible label with identical text. Extraction reads `Python Python` (×6), `React React` (×3), and so on. `Python` appears 12 times on a 1,000-word page — the shape of keyword stuffing. `Icon.astro` already does this correctly with `aria-hidden="true"`; TechIcon is the outlier. One-line fix.
- **M2 — `llms.txt` has no link targets (55/100).** The spec calls for a curated `- [Title](url): Description` index; this file is prose with essentially no URLs. The CV PDF — the richest document in the build — is unreferenced. No `llms-full.txt` (404).
- **M3 — No freshness signals at all.** No `datePublished`/`dateModified` on any node, no visible last-updated line. The `lastmod` in `sitemap.xml` is hardcoded and will rot.
- **M4 — Entity inconsistencies.** Email is `contacto@fsanchezt.dev` on a `.com` site. `llms.txt` says "Senior AI & Software Engineer and Tech Lead"; the page and schema say "AI & Software Engineer". The live `llms.txt` is a stale Spanish version diverging from the build.
- **M5 — `<h1>` extracts as `FrancoSanchez`.** `Franco<br><span>Sanchez</span>` yields no whitespace in text extraction, so every extractor sees a single token that matches no query for his name. It is also a bare name with no descriptor.
- **M6 — Identical English schema on the Spanish page,** byte-for-byte including `@id`s. To be precise: a shared `@id` for the *Person* is correct modeling and should be kept — one person is one entity regardless of page language. The damage is that `<html lang="es">` disagrees with English schema literals, all Spanish entity signal is lost, and `#projects` — genuinely a per-document construct — claims the same `@id` on both pages. Fix with language-tagged literals on Person and per-locale `@id` + `inLanguage` on the page and list nodes.
- **M7 — Missing high-value schema:** no `WebSite`, no `ProfilePage` (the textbook type for a portfolio), no `mainEntityOfPage`, no `hasCredential` for three documented degrees, no `speakable`. Employer and university nodes are stubs with no `@id`/`url`/`sameAs`.
- **M8 — `vercel.json` gaps:** no CSP, no explicit HSTS, deprecated `X-XSS-Protection` still present, no `immutable` caching for content-hashed `/_astro/*`.
- **M9 — LCP is deliberately delayed.** The H1 is the LCP candidate and animates up from `opacity:0` with an 80–450 ms delay; a 100 px `-webkit-text-stroke` headline swaps from a third-party Google Font with no metric override. `aspect-ratio` appears 0 times in 47 KB of CSS, and the four `<img>` carry no `width`/`height`.
- **M10 — 3.7 MB of unreferenced PNG/JPEG ship in `dist/projects/`.** No HTML file references them; only the 988 KB of `.webp` is used.
- **M11 — Duplicated project `<h3>`s** (card + modal) put each project title twice in the heading outline.
- **M12 — Readability ~17 Flesch.** Not the sentence length (11.9 words average) but nominalized noun-stacking with no verbs: *"Optimization of administrative information management and coordination of resources for continuous process improvement."*

---

## Low Priority Issues

- **L1** — No `Content-Signal:` directive in robots.txt.
- **L2** — Only 4 `<img>` render for 18 existing screenshots; 14 sit in `data-images` JSON attributes.
- **L3** — "10+ Projects Delivered" with 5 shown, unsupported on-page.
- **L4** — LinkedIn vanity URL unclaimed (`-2320742a3` auto-slug); the profile does not surface in name searches — eight other Franco Sanchez profiles rank above it.
- **L5** — English loanwords on the Spanish page (`Data Visualization`, `Vector DB`). Low severity; accepted in Spanish technical writing.
- **L6** — Missing `og:image:width/height/alt`, `twitter:site/creator`, `og:locale:alternate`; `og:title` is identical across locales while `og:description` is localized.
- **L7** — The canvas animation reschedules `requestAnimationFrame` even when off-screen, and has no `devicePixelRatio` scaling. `prefers-reduced-motion` *is* correctly honoured up front.
- **L8** — Dormant YouTube channel (0 videos); EDteam profile with no posts.

---

## Category Deep Dives

### AI Citability — 55/100

Two measurements, and the gap between them is the story. Block-level scoring gives **68/100** across the top five blocks and **52/100** across all twelve. But the five strongest blocks are all inside `[hidden]` modals (C3). Discounting for extraction-pipeline removal lands the effective score at **55**.

The raw material is genuinely good: five first-party outcome metrics (90%, 80%, 92%, 65%, 75%, 40%) that exist nowhere else on the web, scoring 80–95 on statistical density. The RAG block scores highest, at 75, for one reason — it is the only place the page defines its own terms, expanding both "RAG (Retrieval-Augmented Generation)" and "level 1 (L1)".

The ceiling is structural: fragments instead of sentences (H5), no question-shaped entry points (H4), no definitions, and no dates or baselines on any metric.

**Highest-value rewrite** — turn each impact fragment into a self-contained sentence:

> Franco Sanchez's AI business intelligence dashboard, deployed at Towel S.A. de C.V. in 2025, cut report generation time by 90% — from multi-hour analyst turnaround to instant natural-language queries — by replacing static SQL reporting with a LangGraph agent that queries the production database directly.

Self-containment goes 30 → 85. Then convert project `<h3>`s to question form with an immediate answer paragraph, and add a real FAQ section. The single highest-leverage question is **"What is CFDI and how does OCR automate Mexican e-invoicing?"** — a low-competition, geographically specific, genuinely technical query where this site could plausibly become a cited source. Nothing else on it has that property.

### Brand Authority — 8/100

Wikipedia 0/30, Reddit 0/20, YouTube 0/15, LinkedIn 4/10, industry presence 4/25. This is the binding constraint on the whole audit, compounded by the name-resolution problem (C5).

Searching `fsanchezt.com Franco Sanchez portfolio` returns **zero results for the site**. It does not rank for its own name.

In leverage order: create a **Wikidata item** (free, no Wikipedia-grade notability bar, the disambiguation substrate most LLM pipelines consume, and — per C5 — the load-bearing signal here rather than an optional one) → fix the **GitHub identity split** (H1) → claim the LinkedIn vanity URL → **standardize on one handle** across every platform (currently three: `francost15`, `fsanchezt`, `franco-alessandro-sanchez-trinidad-2320742a3`) → register **ORCID** → adopt a disambiguating qualifier used verbatim everywhere, built from name + role + city + employer rather than from any other venture → publish technical articles.

### Content E-E-A-T — 38/100

Experience 12/25, Expertise 11/25, **Authoritativeness 5/25**, Trustworthiness 11/25, topical authority 2/10, freshness 1/5.

Experience is asserted rather than demonstrated: every project is exactly three sentences with a bare percentage. Nothing states how anything was built, what was tried and abandoned, what the constraints were, or how any number was measured. Authoritativeness is near-floor because nothing on the page can be corroborated by any third party (H6).

Topical authority is 2/10 because the site is one page in two languages with four anchor links. The five projects map cleanly onto five high-value topics; `/projects/{id}` pages of 1,200–1,800 words each would move this to 6–7 on its own.

Realistic ceiling: fixing every mechanical issue (C7, M1, M3, M5, H9) lands around 50–55. Breaking 65 requires long-form content and external corroboration. There is no shortcut past that.

### Technical GEO — 78/100

The best-performing category, and the fundamentals are genuinely right: fully prerendered HTML, **zero external JavaScript**, a 21 KB gzip HTML + 9 KB gzip CSS critical path, valid per-locale hreflang with correct self-referencing alternates in the sitemap, correct `<html lang>` per locale, and a permissive robots.txt with all 12 tracked AI crawlers allowed.

What holds it at 78 is a domain misconfiguration (C2) and a content-architecture decision (C3) — not the build system. Post-remediation ceiling is 90–92.

Live production scores **25/100** on the same rubric.

### Schema & Structured Data — 42/100

Both blocks are in raw HTML with no JS injection, which is the single most important thing and the reason this is not in the 20s. Beyond that: two confirmed vocabulary violations (H2), a wrong type choice (H3), an unsubstantiated claim (C6), only 2 `sameAs` entries against a highly ambiguous name, no page-level node binding the Person to a URL, and no dates.

Validated as correct, no action needed: `occupationLocation` with `City`, `nationality` with `Country`, `skills` as Text on `Occupation`, `keywords` on a `CreativeWork` subclass, `knowsLanguage` with BCP-47 `alternateName`, `numberOfItems` as Integer.

Correctly absent — do not "fix" these: no `FAQPage` (there is no on-page FAQ, and marking one up without visible Q&A is a violation), no `SearchAction` (there is no site search), no fake `BreadcrumbList`.

Post-fix ceiling: 82–85, held down by the absence of any article surface and by the single-page architecture.

### Platform Optimization — 27/100 post-deploy (17/100 live)

| Platform | Live | Post-deploy | Highest-leverage action |
|---|---|---|---|
| Google AI Overviews | 6 | 30 | Q&A block with question-form H2s + 40–60 word answers |
| ChatGPT / SearchGPT | 20 | 34 | Fix the GitHub identity split |
| Perplexity | 8 | 28 | Attach verifiable evidence to the % claims |
| Google Gemini | 6 | 26 | Publish public repos for the 3 missing projects |
| Bing Copilot | 6 | 18 | Register Bing Webmaster Tools + IndexNow |

Crawler access is fully solved and is **not** the bottleneck — GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Googlebot and bingbot all return 200. Every platform's crawler sub-score is near-maximum; every platform's authority sub-score is near-zero.

**On AI Overviews specifically, set expectations:** AIO rarely triggers on person-name navigational queries for non-notable individuals, and for "hire an AI engineer in Puebla" Google prefers directories over individual portfolios. The realistic surface is narrow technical how-to queries — which means AIO readiness depends on publishing articles, not on tuning the portfolio page. Perplexity and ChatGPT are the more realistic near-term targets, and both are gated on entity resolution rather than page structure.

---

## Remediation Applied — 2026-08-02 (same day, post-audit)

The following were fixed immediately after the audit and verified against a fresh build. Scores above are **pre-remediation** and have not been re-run.

| Fix | Finding | Verified result |
|---|---|---|
| `TechIcon.astro` made decorative (`aria-hidden`, no `role`/`aria-label`/`<title>`) | M1 | Duplicate tokens in extracted text: **21 → 1** (the remaining pair is the desktop + mobile language switch, which is legitimate) |
| H1 split into two block spans instead of `<br>` | M5 | H1 now extracts as **`Franco Sanchez`**, not `FrancoSanchez` |
| `Person.description` rewritten to match the page timeline | C6 | Now reads "5+ years in software engineering, building production AI systems since 2024" |
| `author` removed from `ItemList` | H2 | Confirmed absent |
| `programmingLanguage` removed; projects retyped `SoftwareApplication` → `CreativeWork`; `applicationCategory` dropped; tech moved into `keywords`; per-project `@id` added | H2, H3 | 0 invalid properties across all 5 items; 5/5 now carry an `@id` |
| `@media (scripting: none)` fallback added; `prefers-reduced-motion` extended to `.anim-enter` / `.stagger-item` | H8 | Both present in the emitted CSS |

### Week 3 items, also applied the same day

| Fix | Finding | Verified result |
|---|---|---|
| Five `/projects/<slug>/` routes per locale; hidden modals removed | **C3** | Extractable English content **292 → 1,173 words**; `[hidden]` subtrees on the home page: **0** |
| `tags`, `highlights` localized to `{ es, en }`; dates stored ISO and formatted via `Intl.DateTimeFormat` in `src/lib/dates.ts` | **C7** | Spanish tokens on the English page: **43 → 0** |
| Sitemap generated at build time (`src/pages/sitemap.xml.ts`); static `public/sitemap.xml` deleted | M3 | 12 URLs with per-locale alternates and a build-stamped `lastmod` |
| All 18 screenshots rendered as real `<img>` with intrinsic `width`/`height` | M9, L2 | Was 4 images with no dimensions |
| `og:image:width/height/alt` and `og:locale:alternate` added | L6 | Present on every page |
| Duplicate project `<h3>`s removed with the modals | M11 | Each project title appears once per page |

Two bugs were found and fixed during verification: the per-project schema `@id` was building as `https://fsanchezt.comprojects/…` (missing separator), and the language switch on a project page dropped the reader on the locale home page instead of the same project in the other language. Both now have regression tests.

Test suite: **62/62 passing** (was 48; new coverage for date formatting, project routing, and the language switch). `astro check`: 0 errors, 0 warnings, 0 hints.

**Caveat on the new project pages:** they are ~92 words each, well under the 300–500 the audit calls for. The structural problem (content trapped in hidden subtrees, no indexable URLs) is solved; the depth problem is not. Expanding them is Week 4 work and needs real writing, not restructuring.

### C2 resolved in code rather than in the dashboard

The audit proposed making the apex primary in Vercel. It was fixed the other way round, because that direction needs no dashboard access and matches what the infrastructure already does: **the declared origin now follows the host that actually answers.**

- `SITE` in `src/i18n.ts` is the single source of truth and is set to `https://www.fsanchezt.com`.
- `src/data/structuredData.ts` had the domain hardcoded **19 times**; all of it now derives from `SITE`.
- `astro.config.mjs`, `public/robots.txt`, and `public/llms.txt` follow.

Verified across the whole build: **250 self-referencing URLs, all on one host**, and `curl -I https://www.fsanchezt.com/` returns `200`. No canonical, hreflang, sitemap entry, or JSON-LD `@id` points at a redirect any more.

If the bare apex is preferred as the brand URL, it is a one-line change to `SITE` **plus** flipping the primary domain in Vercel → Project → Domains. Both, or the mismatch returns. `src/test/canonical-host.test.ts` fails if the two ever drift apart again.

**Still open** — these need account access or a deploy decision and were not done: the deploy itself (C1), and Search Console / Bing Webmaster Tools / IndexNow registration (H10).

## Quick Wins (Implement This Week)

1. **Deploy the build.** Live 11 → ~42. Nothing else counts until this happens.
2. **Fix apex vs. `www` in Vercel** so the host serving 200 matches every canonical, sitemap URL, and `@id`. About an hour, and it must precede the deploy.
3. **Fill in the GitHub profile** (`francost15`): name, bio, location, blog → fsanchezt.com; create `francost15/francost15` with a README; cross-link or consolidate `FrancoSanchez9`. About 30 minutes, the highest authority-per-minute item on the list.
4. **Strip `role`/`aria-label`/`<title>` from `TechIcon.astro`.** One line; removes 21 duplicate tokens.
5. **Fix the schema description** from "5+ years shipping production AI systems" to "5+ years in software engineering, building production AI systems since 2024," and delete `programmingLanguage` from the five items and `author` from the `ItemList`.

## 30-Day Action Plan

### Week 1 — Ship it and stop the bleeding
- [ ] Fix apex/`www` in Vercel; verify `curl -I https://fsanchezt.com/` → 200
- [ ] Commit and deploy the Astro build
- [ ] Correct the schema `description`; remove the two invalid properties; retype projects to `CreativeWork`
- [ ] Fix `TechIcon.astro`; fix the `FrancoSanchez` H1 spacing
- [ ] Add the `@media (scripting: none)` fallback
- [ ] Register Google Search Console **and** Bing Webmaster Tools; submit the sitemap; add IndexNow

### Week 2 — Repair the entity
- [ ] Complete the GitHub profile and profile README; consolidate the two accounts
- [ ] Create a **Wikidata item** (human, occupation, employer, educated at, GitHub username, official website)
- [ ] Claim the LinkedIn vanity URL; standardize on one handle everywhere
- [ ] Register ORCID; expand `sameAs` to every profile
- [ ] Unify the email to one domain; align the job title verbatim across page, schema, and `llms.txt`

### Week 3 — Get the content out of hiding
- [ ] Build `/projects/<slug>/` routes; move the 708 modal-locked words onto real URLs; add them to the sitemap
- [ ] Localize `tags`, `period`, and `highlights` to `{ es, en }`; format dates with `Intl.DateTimeFormat`
- [ ] Render the bio (corrected to 92%); name the 5 awards and 4 certifications; add `hasCredential`
- [ ] Add `ProfilePage` + `WebSite` schema, `mainEntityOfPage`, `dateModified`, and `inLanguage`
- [ ] Add `/privacy` and `/es/privacidad`, linked from the footer and the contact form

### Week 4 — Become citable
- [ ] Rewrite the five impact metrics as self-contained sentences with actor, employer, year, and mechanism
- [ ] Convert project headings to question form; add a real FAQ section, then mark it up
- [ ] Publish public repos with real READMEs for the CFDI, RAG, and dashboard projects — or sanitized case studies if client work prevents it
- [ ] Publish the first technical article (CFDI/OCR is the highest-leverage topic)
- [ ] Self-host fonts, preload the display face, un-gate the H1 from `opacity:0`
- [ ] Add link targets and an `llms-full.txt` to `llms.txt`

---

## Appendix: Pages Analyzed

| URL | State | Words | Issues |
|---|---|---|---|
| `https://fsanchezt.com/` | Live — 308 → www | 7 | C1, C2 |
| `https://www.fsanchezt.com/` | Live — 200, empty SPA shell | 7 | C1, wrong `lang`, no `<h1>` |
| `https://fsanchezt.com/es/` | Live — **404** | — | C1 |
| `dist/index.html` | Built, undeployed | 1,000 (292 visible) | C3, C6, C7, H2–H8, M1–M12 |
| `dist/es/index.html` | Built, undeployed | 1,120 (~330 visible) | C3, M6, L5 |
| `public/robots.txt` | Live | — | Correct; L1 only |
| `public/llms.txt` | Live (stale vs. build) | — | M2, M4 |
| `public/sitemap.xml` | Built, undeployed | — | C2, M3 |

**Fetch failures and evidence limits:** LinkedIn returned HTTP 999 (anti-scrape) and Bing's `site:` query served a CAPTCHA, so LinkedIn profile details come from search snippets and Bing indexation status is unknown rather than confirmed-zero. Reddit, Stack Overflow, and X were auth- or fetch-blocked; targeted searches surfaced no accounts there, but absence is not proven.
