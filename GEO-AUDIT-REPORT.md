# GEO Audit Report: fsanchezt.com

**Audit Date:** 2026-08-27 (lote GEO/peso/hero; scores recalculated on local `dist/`)
**URL:** https://www.fsanchezt.com
**Business Type:** Personal portfolio / individual practitioner brand (AI & software engineer)
**Pages Analyzed:** 12 built (indexable; preview routes deleted); 1 live
**Repo state:** branch `migrate-to-astro`, working tree after lote (not a new HEAD)
**Prior reports:** `GEO-AUDIT-REPORT.md` (2026-08-05), `GEO-AUDIT-REPORT-2026-08-02.md`, `GEO-AUDIT-REPORT-2026-06-25.md`

---

## Executive Summary

**There are still two sites, and the wrong one is serving.**

For the third audit in a row, the score that matters is the one nobody can see. Production at
`https://www.fsanchezt.com/` returns 4,241 bytes whose entire body is
`<div id="root"><!-- Empty root — React handles all rendering --></div>` — verified by `curl` as
GPTBot on 2026-08-05. Zero words of body text. `/es/` returns **404**. The live canonical points
at the bare apex, which 308-redirects to the `www` host that actually answers. The Astro rewrite
committed on 2026-08-02 has never been deployed, and neither has today's redesign.

**Live GEO Score: 11.4/100 (Critical). Local build: 48.4/100 (Poor). Production is still not this build.**

Verified 2026-08-27: `curl -A GPTBot https://www.fsanchezt.com/` → 200, 4,241 bytes, empty `#root`.
`/es/` → 404. C1 is unchanged. The 48.4 score is theoretical until `dist/` is deployed.

The 2026-08-27 lote moved the **build** 47.1 → 48.4 (+1.3). That is the correct magnitude: C2, C3,
H8 and M7 were honesty/index-file bugs, not content. Extractable English home copy went **731 → 701**
because the hero was destilled (one 12-word subtitle, four meta facts). Project pages remain captions
(98–118 words). Brand Authority is still 9. This lote did not write 400 words per project, did not
add Wikidata/ORCID, and did not ship.

The binding constraints have not moved and cannot be moved by a build system:

- **Brand Authority: 9/100.** No Wikipedia, no Wikidata, no Reddit, no YouTube, no published
  writing. The GitHub account in `sameAs` still has a null name, null bio, null location and one
  follower, last touched 2026-06-26 — flagged in the previous audit, untouched since.
- **Content depth: ~1,223 extractable English words site-wide**, with project pages carrying
  48–59 words of *unique* prose each. That is a caption, not a page.

### Score Breakdown

| Category | Live (State A) | Build (State B) | Weight | Weighted (build) |
|---|---|---|---|---|
| AI Citability | 0/100 | 56/100 | 25% | 14.00 |
| Brand Authority | 9/100 | 9/100 | 20% | 1.80 |
| Content E-E-A-T | 5/100 | 48/100 | 20% | 9.60 |
| Technical GEO | 30/100 | 92/100 | 15% | 13.80 |
| Schema & Structured Data | 33/100 | 52/100 | 10% | 5.20 |
| Platform Optimization | 8/100 | 40/100 | 10% | 4.00 |
| **Overall GEO Score** | **11.4/100** | | | **48.4/100** |

### Change since 2026-08-05 (this lote)

| Category | Then | Now | Δ | Driver |
|---|---|---|---|---|
| AI Citability | 54 | 56 | +2 | Honest meta/`llms.txt` links; home is *thinner*, so the bump is small |
| Brand Authority | 9 | 9 | 0 | Nothing off-site. GitHub profile still empty |
| Content E-E-A-T | 45 | 48 | +3 | Deleted 85%; split “5 systems” from “since 2020”; no new prose |
| Technical GEO | 91 | 92 | +1 | 12 routes, one font, dead icon/preview payload gone |
| Schema | 52 | 52 | 0 | C4, H6, M3, M4 untouched |
| Platform | 39 | 40 | +1 | `llms.txt` is now a real link index; still no third-party platforms |
| **Overall** | **47.1** | **48.4** | **+1.3** | Honesty + index files. Not a content win. |

### Change since 2026-08-02

| Category | Then | Now | Δ | Driver |
|---|---|---|---|---|
| AI Citability | 55 | 54 | −1 | Noise. Content unchanged; redesign moved it around |
| Brand Authority | 8 | 9 | +1 | Noise. Nothing off-site changed |
| Content E-E-A-T | 38 | 45 | **+7** | Deleted the false-claim bio; fixed Spanish leakage |
| Technical GEO | 78 | 91 | **+13** | Canonical host unified, i18n routing, static build verified |
| Schema | 42 | 52 | **+10** | Both vocabulary violations genuinely fixed |
| Platform | 27 | 39 | **+12** | Crawler access + static rendering now clean across the board |
| **Overall** | **41.6** | **47.1** | **+5.5** | |

### What genuinely got fixed since the last audit — verified, not assumed

- ✅ `programmingLanguage` on `SoftwareApplication` — **gone.** All five list items are now
  `CreativeWork`; the string appears nowhere in any built page.
- ✅ `author` on `ItemList` — **gone.** The parsed `ItemList` key set is exactly
  `['@context','@id','@type','description','itemListElement','itemListOrder','name','numberOfItems']`.
- ✅ The "5+ years shipping production AI" overclaim in `Person.description` — **reworded** to
  "5+ years in software engineering, building production AI systems since 2024." Now consistent.
- ✅ Spanish leakage into the English page — **fixed.** 43 tokens → 9, and all 9 are inside proper
  nouns ("Universidad del Valle de Puebla", "Telesecundaria Lázaro Cárdenas del Río"). Correct.
- ✅ Canonical host unified on `www`. All 6 canonicals, 12 sitemap `<loc>`s, hreflang hrefs,
  `og:url` and both JSON-LD `@id` roots agree. `npx vitest run` → **11 files, 56 tests, all pass**,
  including `canonical-host.test.ts` 3/3.
- ✅ The three `/preview/*` design explorations are correctly `noindex, nofollow` and correctly
  absent from the sitemap. Not an indexation leak.

---

## Critical Issues (Fix Immediately)

### C1 — Nothing is deployed. Every other finding in this report is theoretical.

Verified 2026-08-05 via `curl -A GPTBot https://www.fsanchezt.com/`: 200, 4,241 bytes,
`<html lang="es">`, body = empty `#root`. `/es/` → 404. Live `robots.txt` advertises
`Sitemap: https://fsanchezt.com/sitemap.xml` (apex), which 308-redirects, landing crawlers on a
sitemap whose URLs disagree with the live canonicals.

This is the third consecutive audit reporting this. The June memo recorded C1 as "FIXED via Vite
SSR prerender"; it was never deployed. The August rewrite was never deployed. **Deploying `dist/`
is worth more than every other item in this report combined** — it is the difference between
11.4 and 48.4.

**Fix:** deploy, then verify with `curl https://www.fsanchezt.com/` — not with a local build. No
code change is required; `dist/robots.txt` already points at the correct host.

### C2 — "Cutting operational costs by up to 85%" is supported by nothing on the site.

**CLOSED in local build, 2026-08-27.** The string is gone from `profile.ts`, `BaseLayout.astro`,
`structuredData.ts`, `llms.txt`, and `dist/`. Live still serves the old SPA, so crawlers have not
seen the fix. Original finding kept below.

Verified locations (2026-08-05): `src/layouts/BaseLayout.astro:34,36,43,45` (both locales' meta description and
OG description), `src/data/profile.ts:5-6` (`tagline`), and `public/llms.txt:3`.

`grep` across all five `impact` fields in `src/data/projects.ts` for cost/costo returns **nothing**.
The six real metrics are 90% report time, 80% workflow automation, 92% projection accuracy, 65% L1
resolution, 40% visibility, 75% screening. There is no path from any of them to 85%, and no
project claims a cost reduction at all.

The number appears *only* on the surfaces humans don't read and machines read first. This is the
identical failure mode as the "5+ years" overclaim that was correctly fixed in the JSON-LD — caught
in one place, missed in three others.

**Fix:** delete "85%" from `BaseLayout.astro` (4 sites), `profile.ts`, and `llms.txt`, or attach it
to a named project with a stated baseline. Given the precedent already set, delete.

### C3 — "5 systems · since 2020" is contradicted by the site's own timeline.

**CLOSED in local build, 2026-08-27.** Hero meta is two facts: “In production / 5 systems” and
“Engineering since / 2020”. The welded `N systems · since 2020` string is gone. Original finding:

`src/sections/Hero.astro:16-17` (as of 2026-08-05):

```ts
const shipped = projects.length;                                    // 5
const since   = experience[experience.length - 1].period.start.slice(0, 4);  // "2020"
```

The code comment says the value is "counted from the record rather than typed, so the margin can
never claim a number the data does not support." It does the opposite: it welds a **project count**
to an **unrelated employment start date**. All five listed systems trace to Feb 2024 or later
(RAG→UVP 2024-02, CFDI→Idea15 2025-08, dashboard+ERP→Towel 2025-10). 2020 is the WimxTelecom start.

This reintroduces, through a new mechanism, the exact overclaim that was just fixed in the JSON-LD.
Renders on both `/` and `/es/`.

**Fix:** split the two facts — `In production 5 systems` / `Engineering since 2020` — or derive
`since` from project evidence: `5 systems · since 2024`.

### C4 — Zero temporal signals anywhere in the build.

`grep -rlo 'datePublished\|dateModified\|<time' dist/` → **0 files**. No date properties in any of
the 12 JSON-LD blocks, no `<time>` element on any page. The only date on the entire site is the
footer's `Colophon Franco Sanchez · 2026`.

The site was substantially rewritten today and nothing says so. Perplexity and ChatGPT both discount
undated content, and for a portfolio in an AI market where 2024 stacks already read as dated, a
model has no way to know whether these claims are current.

Related but *not* a defect: `sitemap.xml` `lastmod` is `2026-08-06` on all 12 URLs — that is the
correct current UTC date, not a future date. The real issue is that it's a uniform build timestamp
that changes on every deploy regardless of content, which crawlers learn to ignore.

**Fix:** add `datePublished`/`dateModified` to the `CreativeWork` nodes, a visible `<time>` per
project page, and per-entry `updated` fields in `src/data/projects.ts` driving `lastmod`.

---

## High Priority Issues

### H1 — Every headline metric is an un-quotable sentence fragment.

`src/data/projects.ts`, all five `impact.en`/`impact.es`. Each is a subjectless noun phrase:

> "90% reduction in report generation time and increased speed in strategic decision-making."

Extracted from context this answers nothing — no actor, no system, no client, no year, no baseline.
A model that lifts it has to supply the subject itself, which is the step models avoid because it's
the step that invents facts. These are the site's strongest assets and they are structurally
un-citable.

**Rewrite pattern** (same fact, self-contained — estimated block citability 46 → 78):

> "Franco Sanchez's AI Business Intelligence Dashboard cut report generation time by 90% at a
> Puebla textile manufacturer, replacing analyst-produced static reports with a LangGraph agent
> that answers SQL questions in natural language. In production since 2025."

Highest citability return per line of diff on the entire site.

### H2 — Project pages carry 48–59 words of unique prose.

| Slug | Unique EN prose | problem / solution / impact |
|---|---|---|
| ai-business-intelligence-dashboard | 52w | 17 / 23 / 12 |
| smart-cfdi-billing-system | 51w | 20 / 18 / 13 |
| rag-institutional-assistant | 51w | 19 / 15 / 17 |
| textile-production-erp | 48w | 15 / 18 / 15 |
| ai-powered-job-matching-board | 59w | 18 / 27 / 14 |

The 92–107-word page totals are ~50% nav and footer chrome. Each page is exactly three sentences.
Entirely absent: architecture (which vector store? which model? chunking strategy? how was the
LangGraph agent constrained from writing SQL?), the constraint that shaped the design (latency
budget, on-prem requirement, SAT *timbrado* compliance), what was tried and abandoned, and how each
metric was measured.

Root cause is structural — the `Project` interface has no field that would force any of it to exist:

```ts
export interface Project { id, slug, title, problem, solution, impact, tags, link?, github?, images? }
```

**Fix:** add `period`, `client`, `role`, `scale`, `architecture`, `measurement` to the interface;
target 400–600 body words per project. Both locales render automatically.

### H3 — The one entity edge the site publishes points at an anonymous account.

`Person.sameAs[0]` = `github.com/francost15`. Verified today via the GitHub API: `name: null`,
`bio: null`, `location: null`, `blog: ""`, 37 repos, **1 follower**, `updated_at: 2026-06-26` —
i.e. untouched since before the previous audit, which already flagged it.

With no Wikipedia, no Wikidata, no Reddit and no published writing, this is the only outbound edge a
crawler can traverse, and it terminates in an account that cannot be connected to any human being.

**Fix (15 minutes, not in this repo):** on `github.com/francost15` set Name to
`Franco Alessandro Sanchez Trinidad`, Location `Puebla, Mexico`, Website `https://www.fsanchezt.com`,
Bio to the exact `jobTitle` string; create a `francost15/francost15` profile README summarizing the
five systems and linking the site.

### H4 — The name-collision problem is confirmed and unchanged.

Searching `"Franco Sanchez" AI engineer Puebla` returns, ahead of anything of his: a **SR Full Stack
AI Engineer at nivii.ai** with the same first and last name in the same field (indexed on both
LinkedIn and RocketReach, so two entity databases already hold that mapping); the academic
**Francisco Franco-Sánchez** (Universidad de Alicante); and six further distinct LinkedIn profiles.

`"Franco Alessandro Sanchez Trinidad"` still has **zero exact matches** anywhere on the open web
except this site's own `alternateName` — a unique identifier that identifies nobody, because it
appears in exactly one place and not in any visible body text.

**Fix, in leverage order** — a Wikidata item (`instance of: human`, `occupation: software engineer`,
`residence: Puebla`, `employer: Towel S.A. de C.V.`, `educated at: Universidad del Valle de Puebla`,
`official website`); an ORCID iD (free, and the in-progress UNIR Master's in AI justifies it); one
standardized handle across all platforms; and the full legal name in visible page text.

### H5 — Author references on all 10 project pages are dangling stubs.

`ProjectPage.astro:45-46` emits `"author": {"@id": "https://www.fsanchezt.com/#person"}`, but the
`Person` node is defined only on the two home pages (`BaseLayout.astro:27`). Verified:
`grep -c '"@type": *"Person"' dist/projects/rag-institutional-assistant/index.html` → **0**.

A crawler reading one project page in isolation gets a work by nobody. Google requires `author.name`.

**Fix:** inline a lean self-describing stub that still merges with the full node:

```jsonc
"author": { "@type": "Person", "@id": "https://www.fsanchezt.com/#person",
            "name": "Franco Sanchez", "url": "https://www.fsanchezt.com/" }
```

### H6 — The Spanish home page ships entirely English structured data.

`BaseLayout.astro:27` passes the same frozen schema objects to both locales. The parsed `Person` and
`ItemList` nodes in `dist/index.html` and `dist/es/index.html` are **byte-identical**. So `/es/` — a
page with `<html lang="es">` and 823 Spanish words — declares an English `description` and five
English project descriptions. Neither node carries `inLanguage`.

**Fix:** parameterize by lang (`personSchema(lang)`, `projectsSchema(lang)`); add `inLanguage`; keep
`@id`, `name` and `alternateName` byte-identical across locales — that identity is the dedup signal.

### H7 — The author bio was deleted and nothing replaced it.

`src/data/profile.ts` still defines `bio` and `stats`, but `grep -rn "profile.bio\|profile\.stats" src/`
returns **nothing**. The homepage now has no first-person statement of who Franco is or how he works.

Deleting it was correct in one respect — it carried "accuracy above **97%**" (no project exceeds
92%), "**10+** projects delivered" (5 shown), "**5** awards won" (none named anywhere), "**4**
certifications" (`education.ts` has 2 degrees + 1 diploma), and "**4** AI products" (the site says
5). Removing those four false claims from the render is most of the +7 on E-E-A-T. But the fix was
amputation, not repair — and the false numbers still sit in the repo where they can leak back into a
future `llms.txt` or meta description.

**Fix:** write a 120–180 word bio containing only timeline-supported claims and render it. Delete
`bio` and `stats` from `profile.ts` outright.

### H8 — `llms.txt` overclaims seniority against its own timeline, and links nothing.

**CLOSED in local build, 2026-08-27.** Canonical title is `AI & Software Engineer`; projects are
markdown links to `/projects/<slug>/` plus `/es/proyectos/` mirrors; no `—` in the file. M2 is only
partially closed: meta still says “AI Engineer and Software Architect” in places. Original finding:

`public/llms.txt:7` — "Franco Sanchez is a **Senior** AI & Software Engineer **and Tech Lead**" —
while the employment block six lines below lists the current role as "Software Engineer" and no
prior role carries a lead or senior title. The site's own JSON-LD says `jobTitle: "AI & Software
Engineer"`. AI systems weight `llms.txt` heavily *and* cross-check it against schema; a
self-contradiction across two files on the same domain costs more than the title gains.

Separately, all five projects are listed as prose bullets with **no URLs**, even though each has a
dedicated indexable page in the sitemap. `llms.txt` is fundamentally a link index.

**Fix:** reword line 7 to match `jobTitle` (keep the leadership signal as a capability, drop the
title); convert projects to `- [Title](url): description` form; add the `/es/proyectos/` mirrors.

### H9 — Six unsourced quantitative claims carry no methodology.

90%, 80%, 92%, 65%, 40%, 75% — none carries a client, a date, a baseline, a sample size, or a
measurement method. To an evaluator these read as self-reported round numbers, and they are
simultaneously the most quotable sentences on the site.

**Fix:** one sentence of measurement context per figure. Minimum viable, for the RAG assistant:
`Universidad del Valle de Puebla · Feb 2024 – Jun 2025 · sole developer · 65% measured over three
months of ticket logs`.

---

## Medium Priority Issues

### M1 — `fsanchezt.dev` / `fsanchezt.com` identity split (this is not a typo — do not "fix" it as one)

`contacto@fsanchezt.dev` appears in `src/data/profile.ts:15`, `src/data/structuredData.ts:22`,
`public/llms.txt`, and the rendered contact section. The domain **resolves** (`64.29.17.65`) and has
live Hostinger MX records — the mailbox works.

The cost is entity-signal split: the canonical site, sitemap, `sameAs` graph and `Person.url` all say
`www.fsanchezt.com`, while the only contact identifier says `.dev`. For an entity already losing to
eight same-name LinkedIn profiles, splitting the identifier across two domains discards the one NAP
consistency signal that was free to get right.

**Fix:** standardize on one domain across all four locations at once. If the `.dev` mailbox must
stay, at minimum keep `llms.txt`'s `Website:` line and everything else on `.com`.

### M2 — Three different job titles across four surfaces

`<h1>` context + `Person.jobTitle`: "AI & Software Engineer" · meta description: "AI Engineer and
Software Architect" · `llms.txt`: "Senior AI & Software Engineer and Tech Lead". `llms.txt` also
lists React Native, Docker, GitHub Actions and Linux, none of which appear in `competencies.ts`.

**Fix:** one canonical title string sourced from `profile.title`, used verbatim in all four places.

### M3 — The same project exists as three unrelated schema nodes

`structuredData.ts:99` → `#project-ai-dashboard`; `ProjectPage.astro:39` (EN) →
`/projects/<slug>/#project`; the ES page mints a third. No `sameAs`, no `translationOfWork`, nothing
connects them. A consumer building a graph sees **15 distinct works, not 5**.

**Fix:** make the work identity slug-based and locale-independent
(`https://www.fsanchezt.com/#work-<slug>`), have each localized page describe *that* node with
`inLanguage` + `url` + `mainEntityOfPage`, and derive the fragment from `project.slug` in both files
so they cannot drift.

### M4 — Missing `BreadcrumbList`, `WebSite`, and `ProfilePage` nodes

Project pages render a visible "Back to home" link (`ProjectPage.astro:69-72`) so the hierarchy
exists in the UI but not in markup. There is no root `WebSite` entity at all — the `Person` floats
unattached to the site describing it.

Do **not** add `FAQPage` — Google restricted FAQ rich results to government/health authorities in
Aug 2023 and the site has no honest Q&A content to mark up. Skip `SearchAction` too; there is no
on-site search.

### M5 — No IndexNow key file, no Bing verification meta

`dist/` contains only `llms.txt`, `robots.txt`, `sitemap.xml`. Bing feeds **both** Copilot and
ChatGPT search, and for a site with near-zero inbound links IndexNow is the fastest route into that
index — the best effort-to-impact ratio available.

### M6 — Missing security and cache headers in `vercel.json`

`vercel.json:6-14` sets X-Content-Type-Options, X-Frame-Options, Referrer-Policy and
Permissions-Policy, but omits `Strict-Transport-Security` and `Content-Security-Policy`. For a static
site with zero third-party origins a strict CSP is nearly free. There are also no `Cache-Control`
rules, so content-hashed `_astro/*` assets, the 38 KB font and all WebP images are re-fetched on
repeat visits under Vercel's default revalidate policy.

`X-XSS-Protection` (line 10) is deprecated and should be removed when the CSP lands.

### M7 — `<meta name="keywords">` asserts "CTO" and "Tech Lead"

**CLOSED in local build, 2026-08-27.** The tag is deleted. Original finding:

Neither appears anywhere else on the site or in the schema. Search engines ignore keywords entirely,
but LLM extractors read them — so this is claim inconsistency with none of the upside. Delete the tag.

### M8 — Contact form collects PII with no privacy notice

The form posts name/email/message to `formspree.io/f/mpqyeonn`. No privacy or *aviso de privacidad*
page exists in `dist/`. Mexico's LFPDPPP expects a notice at the point of collection, and a missing
privacy policy is a standard trust deduction. ~200 words at `/privacy/` + `/es/privacidad/`.

### M9 — `worksFor` is an anonymous nested node

`structuredData.ts:41-45` gives the organization a `name` and `address` but no `@id` and no `url`, so
it cannot be reconciled against any external record. Purely mechanical: add
`"@id": "https://www.fsanchezt.com/#employer"` and the company URL.

### M10 — Headings carry no query intent

Every H2 on the homepage is a nav label ("Projects", "Competencies", "Experience"). No question-form
heading exists anywhere in the build. Question headings with a self-contained ~45-word answer beneath
are the only AI-Overviews mechanism a 97-word page can realistically use.

---

## Low Priority Issues

- **L1 — `profile.location` renders "Puebla, México"** with the Spanish accent on the English page.
  Localize it: `{ es: "Puebla, México", en: "Puebla, Mexico" }`. Last residue of the i18n cleanup.
- **L2 — Image alt text is positional, not descriptive.** All 18 screenshots use
  `alt="<Project> — screenshot N"`. Not an accessibility failure, but zero content signal.
- **L3 — `textile-production-erp` has no images** and is the shortest page (48 unique words). It's
  the system tied to the current employer — the one a recruiter checks first.
- **L4 — Competency blurbs are the weakest new prose on the site** ("solve real business problems",
  "handle high concurrency with minimal latency"). Interchangeable with any engineer's portfolio, and
  the only section of the redesign that reads generic. Ground each in a named system or cut it.
- **L5 — No `speakable` specification.** The impact lines are already self-contained paragraphs and
  are the natural targets.
- **L6 — Education is richer on the page than in the graph.** Three credentials render; only
  `alumniOf` names exist. Add `hasCredential`.
- **L7 — Shallow internal link graph.** Hub-and-spoke only, no project-to-project links. Five orphan
  stubs read as a résumé; an interlinked cluster reads as topical authority.
- **L8 — No `llms-full.txt`.** The entire English corpus is ~1,223 words; a complete-content version
  is trivial and lets a model ingest the whole site in one fetch.
- **L9 — 165 KB of unused fonts in `public/fonts/`.** `cabinet-grotesk-var.woff2` (41,920 B) is
  referenced by nothing in `src/` or `dist/`; three others serve only the `noindex` preview routes.
- **L10 — The apex→www redirect lives only in the Vercel dashboard.** `vercel.json` has no
  `redirects` array, so the most load-bearing routing rule on the site is untracked in git — unlike
  `SITE`, which has a test guarding it.

---

## Category Deep Dives

### AI Citability (54/100)

Higher than the content volume alone would suggest, because the genuinely citable material is
concentrated where nobody looks for it — **Experience and Education**. Those blocks have what the
project blocks lack: a named organization, a date range, and a specific claim in one place.

> "Feb 2024 — Jun 2025 · AI Developer & Tech Mentor · Universidad del Valle de Puebla (UVP) —
> Design and deployment of an AI-powered virtual assistant for 24/7 institutional support."

That is quotable verbatim. A model asked "who built UVP's AI assistant" can lift it directly. Scored
~68 as a block.

The project impact lines score 42–46 for the structural reason in H1. The gap between those two
numbers is the whole citability story: the site already knows how to write a citable sentence, it
just doesn't do it where the impressive numbers live.

### Brand Authority (9/100)

| Signal | Weight | Status |
|---|---|---|
| Wikipedia | 30 | Absent — `srsearch="Franco Sanchez Trinidad"` → `totalhits: 0` |
| Wikidata | — | Absent — `wbsearchentities` → empty |
| Reddit | 20 | Absent |
| YouTube | 15 | Absent |
| LinkedIn | 10 | Minimal — one URL, does not rank for the name |
| Industry / niche | 25 | Absent — no dev.to, Medium, Hashnode, talks, OSS, or press |
| GitHub | — | Present but inert (H3) |

Nothing here is fixable on-site. It is also the category with the highest weight after citability, at
20% — which is why the overall score barely moves despite a full technical rewrite.

### Content E-E-A-T (45/100)

Experience 11/25 · Expertise 12/25 · Authoritativeness **5/25** · Trustworthiness 11/25 · Content
metrics 8/15 · AI-content signal 8/10 · Topical authority 4/10 · Freshness 2/5.

**AI-content assessment: Highly Likely Human.** The redesign copy has genuine voice — *"Where I have
worked, and what was still running when I left"*, *"Each one solved a problem somebody was paying
for"*, *"Five systems in production, not demos."* The only mechanical tell is that all five projects
are the identical three-sentence problem/solution/impact shape ending in a round percentage. Fixing
H2 removes it.

Fixing C2, C3 and H1–H9 puts this at roughly **68–72**. The gap above that is Authoritativeness
(5/25), which no edit to existing files can close — it requires published external artifacts.

### Technical GEO (91/100)

The strongest category by a wide margin, and genuinely earned.

Fully static: `dist/index.html` is 39,844 bytes of prerendered markup with **zero** `<script src>`.
Two inline modules only (nav/IntersectionObserver, contact validation), both progressive enhancement
over markup that already exists. AI crawlers see 100% of the content. Every `<img>` carries
`width`/`height`, `srcset` (768w/1536w), `sizes`, `decoding="async"`, first `eager` and rest `lazy`,
WebP only. One font face on production pages (38 KB, `font-display: swap`, preloaded). Homepage LCP
candidate is the `<h1>` — text, not an image. `robots.txt` blocks no AI crawler.

The 9 points lost are M5, M6, M7 and the `lastmod` granularity issue in C4.

### Schema & Structured Data (52/100)

Person 15/15 · content schema 9/15 · Organization edge 8/20 · `sameAs` 5/15 · `speakable` 0/10 ·
`BreadcrumbList` 0/5 · `WebSite` 0/5 · no deprecated 5/5 · JSON-LD only 5/5 · validation clean 5/5.

All 12 blocks parse as valid JSON, all properties are legal on their declared types, and both
previously-reported violations are genuinely fixed. `Person` is the strongest node on the site —
`hasOccupation`, `alumniOf`, `knowsAbout`, `knowsLanguage`, `nationality` are all correctly typed.
The deductions are structural (M3, H5, H6) rather than syntactic: the vocabulary is right, the graph
is fragmented.

### Platform Optimization (39/100)

| Platform | Score | Actual blocker |
|---|---|---|
| Bing Copilot | 52 | No index-submission signals; thin content |
| ChatGPT Web Search | 49 | No entity recognition |
| Perplexity | 37 | No third-party corroboration; zero freshness |
| Google AI Overviews | 36 | No content surface to cite |
| Google Gemini | 23 | No Google-ecosystem footprint at all |

**Strongest is Bing Copilot by default, not merit** — hiring-adjacent lookups are its home turf and
the LinkedIn edge is the one real entity signal. **Weakest is Gemini**, which blends Knowledge Graph,
YouTube, Business Profile, News and Scholar; there is presence in exactly none.

**The realistic citation surface, honestly stated:**

- **Winnable on deploy alone:** `"Franco Alessandro Sanchez Trinidad"` (zero competing exact matches
  — a free win the site does not currently own, because the full name appears only in JSON-LD);
  `Franco Sanchez AI engineer Puebla` / `ingeniero IA Puebla`; hiring lookups via Copilot/ChatGPT.
- **Winnable with 3–6 months of niche writing:** CFDI + OCR fiscal automation —
  `extracción OCR de CFDI`, `automatizar timbrado CFDI 4.0 Python`,
  `parsear XML CFDI complemento de pago`. Mexico-specific, real developer demand, almost no quality
  English content and thin Spanish content. Engines answering these today are scraping SAT
  documentation and forum threads.
- **Not winnable, do not invest:** `what is RAG`, `LangGraph tutorial`, `natural language to SQL`.
  Globally saturated. The current project pages are effectively targeting these and will never place.

---

## Quick Wins (Implement This Week)

1. **Deploy `dist/`.** 11.4 → 48.4 in one action. Verify with `curl`, not a local build.
2. **Delete the 85% claim** from `BaseLayout.astro` (×4), `profile.ts`, `llms.txt`. ~6 lines. **Done in repo (2026-08-27).**
3. **Fix the Hero "since 2020" derivation** in `Hero.astro:16-17`. ~2 lines. **Done in repo (2026-08-27).**
4. **Populate the `francost15` GitHub profile** — name, bio, location, website, profile README.
   15 minutes, off-repo, and it repairs the site's only traversable entity edge.
5. **Create a Wikidata item and register an ORCID iD.** Free, same-day, and the only disambiguation
   levers available given the positioning constraint below.
6. **Fix `llms.txt` line 7** (seniority) and add per-project URLs. One file, one edit. **Done in repo (2026-08-27).** `bio`/`stats` still exist unused (H7).
7. **Delete `<meta name="keywords">`** and the dead `bio`/`stats` from `profile.ts`. Keywords **done**; `bio`/`stats` **not** deleted (out of lote).

## 30-Day Action Plan

### Week 1 — Ship, then stop lying to machines
- [ ] Deploy `dist/`; verify with `curl -A GPTBot https://www.fsanchezt.com/` and `/es/`
- [x] Remove the 85% claim from all six locations (repo 2026-08-27; not live)
- [x] Fix Hero `since` derivation (repo 2026-08-27; not live)
- [ ] Delete `profile.bio` / `profile.stats` (`<meta name="keywords">` deleted 2026-08-27)
- [x] Rewrite `llms.txt` line 7; add project URLs and `/es/` mirrors (repo 2026-08-27; not live)
- [ ] Standardize on one job-title string and one contact domain

### Week 2 — Entity anchoring
- [ ] Populate the `francost15` GitHub profile + profile README
- [ ] Create the Wikidata item; register ORCID; add both to `sameAs`
- [ ] Put the full legal name in visible body text on `/` and `/es/`
- [ ] Add `datePublished`/`dateModified` to all `CreativeWork` nodes + visible `<time>`
- [ ] Per-project `updated` fields driving `lastmod`

### Week 3 — Schema graph and technical cleanup
- [ ] Unify work `@id`s on `#work-<slug>`; link locale pairs via `url` + `sameAs`
- [ ] Inline the self-describing `author` stub on project pages
- [ ] Parameterize schema by locale; add `inLanguage`
- [ ] Add `BreadcrumbList`, `WebSite`, `ProfilePage`, `hasCredential`, `speakable`
- [ ] `vercel.json`: HSTS, CSP, `Cache-Control`; drop `X-XSS-Protection`
- [ ] IndexNow key file + submission on deploy; `msvalidate.01`
- [ ] Add `/privacy/` and `/es/privacidad/`

### Week 4 — Content depth (the actual constraint)
- [ ] Extend the `Project` interface: `period`, `client`, `role`, `scale`, `architecture`,
      `measurement`
- [ ] Rewrite all five `impact` lines as self-contained sentences (H1 pattern)
- [ ] Expand each project page to 400–600 words; add a question-form H2 + ~45-word answer block
- [ ] Add a measurement sentence behind each of the six percentages
- [ ] Write and render a 120–180 word bio with only timeline-supported claims
- [ ] Screenshots for `textile-production-erp`
- [ ] Draft the first CFDI/OCR technical article (ES primary, EN mirror) for `/articles/`

### Beyond 30 days — the only path above ~70
Authoritativeness (5/25) and Brand Authority (9/100) cannot be fixed by editing this repo. They need
published external artifacts: the CFDI/OCR article series, Stack Overflow answers on the
`cfdi`/`sat-mexico`/`facturacion-electronica` tags, one open-source CFDI parsing utility with a real
README, two short technical walkthroughs on YouTube with `VideoObject` schema, and a written
attestation from UVP or Idea15 referencing a delivered system. One external corroboration of a
project claim would move Brand Authority more than any on-site change available.

---

## Scope Note

Two constraints were applied throughout this audit at your instruction:

1. `Towel S.A. de C.V.` is an ordinary employer, cleared to remain in both the visible experience
   section and JSON-LD `worksFor`. It was not flagged.
2. Your separate venture is deliberately kept off this portfolio's discovery path. No recommendation
   in this report proposes adding it to `sameAs`, JSON-LD, `llms.txt`, or any disambiguation
   strategy, and it is not named anywhere in this document. One same-name/same-city entity collision
   surfaced during brand analysis and resolves to that company; per your instruction the finding was
   dropped rather than acted on, and it is scored neither for nor against.

Consequence worth restating: an attached company name is normally the strongest single token for
separating same-name professionals. Removing it makes the **Wikidata item load-bearing rather than
optional** — it, ORCID, one standardized handle, and the cleared Towel edge are the entire
disambiguation toolkit.

---

## Appendix: Pages Analyzed

### Live (State A) — 1 page
| URL | Status | Issues |
|---|---|---|
| `https://www.fsanchezt.com/` | 200, empty `#root`, 0 body words | C1 |
| `https://www.fsanchezt.com/es/` | **404** | C1 |

### Build (State B) — 12 pages (2026-08-27 lote)
| URL | Visible words | Issues |
|---|---|---|
| `/` | 701 | C4, H1, H6, H7, H9, M1, M2, M10 |
| `/es/` | 775 | C4, H1, H6, H7, H9, M1, M2, M10 |
| `/projects/ai-business-intelligence-dashboard/` | 107 | C4, H1, H2, H5, M3 |
| `/projects/ai-powered-job-matching-board/` | 118 | C4, H1, H2, H5, M3 |
| `/projects/rag-institutional-assistant/` | 103 | C4, H1, H2, H5, M3 |
| `/projects/smart-cfdi-billing-system/` | 103 | C4, H1, H2, H5, M3 |
| `/projects/textile-production-erp/` | 98 | C4, H1, H2, H5, M3, L3 |
| `/es/proyectos/<slug>/` ×5 | ~similar | C4, H1, H2, H5, H6, M3 |

Preview routes deleted from the tree (2026-08-27). Not a GEO win beyond removing `noindex` noise.

**Fetch failures:** none. **Test suite after lote:** 11 files, 57 tests, `pnpm check` 0 errors.

---

## F0 — Deploy (2026-08-27, roadmap 10)

Not executed from this machine: no Vercel CLI and no `VERCEL_TOKEN`. Production is still the
empty SPA (`curl -A GPTBot` → 4,241 bytes, `#root`; `/es/` 404). C1 remains open.

`vercel.json` now has apex→www 308, HSTS, CSP (self + Formspree), immutable cache on `/_astro/*`
and fonts. Deploying this branch to the www project is the only action that moves live GEO.

Verify after a human deploy:

```
curl -A GPTBot https://www.fsanchezt.com/
curl -sI -A GPTBot https://www.fsanchezt.com/es/
curl -sI https://www.fsanchezt.com/llms.txt
curl -sI https://www.fsanchezt.com/sitemap.xml
curl -sI https://fsanchezt.com/   # expect 308 to www
```

## F6 — Off-site checklist (Brand Authority)

The repo will not invent Wikidata Q-ids, ORCID, or YouTube URLs. Franco does this off-site, then
pastes real URLs into `personSchema` `sameAs`.

- GitHub `francost15`: name, bio, location Puebla, website `https://www.fsanchezt.com`, profile README.
- Wikidata item for Franco Alessandro Sanchez Trinidad + ORCID; add both to `sameAs`.
- One CFDI/OCR article (ES primary, EN mirror). Do not write “what is RAG”.
- Optional: CFDI XML parsing utility with a real README.
- Optional: written attestation from UVP or Idea15 of a delivered system.
- Optional: YouTube walkthrough + `VideoObject` only if the video exists.

Until those URLs exist, Brand Authority stays ~9 and the composite cannot honestly cross ~76.
