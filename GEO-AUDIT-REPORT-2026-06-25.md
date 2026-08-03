# GEO Audit Report: fsanchezt.com

**Audit Date:** 2026-06-25
**URL:** https://fsanchezt.com
**Business Type:** Personal Portfolio / Agency-Services Hybrid
**Pages Analyzed:** 1 (Single-Page Application)

---

## Executive Summary

**Overall GEO Score: 40/100 — Poor**

fsanchezt.com has solid foundations — a well-structured `llms.txt`, permissive robots.txt, Person schema in static HTML, and real project metrics that are genuinely citation-worthy — but a single architectural decision undermines all of it: the site is a React SPA with no server-side rendering. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) receive an empty `<div id="root"></div>` and nothing else. The `llms.txt` file is the only substantive content AI systems can actually read. Compounding this, "Franco Sanchez" as an entity has essentially zero third-party validation across AI-cited platforms — no Wikipedia, no Reddit, no YouTube, no Dev.to — which makes it nearly impossible for AI systems to confidently cite or recommend this portfolio. The schema markup, while present and served correctly from static HTML, is missing 8 critical properties and has no project-level structured data.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 52/100 | 25% | 13.0 |
| Brand Authority | 7/100 | 20% | 1.4 |
| Content E-E-A-T | 52/100 | 20% | 10.4 |
| Technical GEO | 56/100 | 15% | 8.4 |
| Schema & Structured Data | 52/100 | 10% | 5.2 |
| Platform Optimization | 19/100 | 10% | 1.9 |
| **Overall GEO Score** | | | **40.3/100** |

---

## Critical Issues (Fix Immediately)

### C1 — React SPA with No Server-Side Rendering

**Severity:** CRITICAL
**Affected URL:** https://fsanchezt.com (every section)
**Impact:** All AI crawlers see an empty HTML shell. 100% of body content — bio, project metrics (90%, 80%, 65%, 75%, 40%), competencies, experience, education — is invisible without JavaScript execution.

The HTML body delivered to any non-JS crawler is literally:
```html
<body>
  <div id="root">
    <!-- Empty root — React handles all rendering with its own fade-in animation -->
  </div>
</body>
```

GPTBot, ClaudeBot, PerplexityBot, CCBot, and all AI training crawlers do not execute JavaScript. They cannot see any of the portfolio content. The `llms.txt` file partially compensates but cannot replace crawlable HTML.

**Fix:** Migrate to Next.js with `output: 'export'` (static site generation) or use `vite-plugin-ssg`. This produces flat HTML files with all content visible in the initial response. At minimum, add a `<noscript>` fallback block inside `<div id="root">` with core bio, project metrics, and competency headings as plain HTML — this is a 2-hour fix that unlocks all five AI platforms simultaneously.

---

### C2 — Brand Entity Is Virtually Unrecognizable to AI Systems

**Severity:** CRITICAL
**Impact:** Brand Authority score 7/100. AI systems have no way to reliably identify "Franco Sanchez" as a distinct entity from dozens of other Franco Sanchez profiles worldwide.

| Platform | Status |
|---|---|
| Wikipedia | Absent — required for entity grounding in ChatGPT and Gemini |
| Wikidata | Absent — no structured entity anchor |
| Reddit | Zero mentions or posts |
| YouTube | No channel found |
| DEV.to / Medium / Hashnode | Zero articles or profile found |
| Hacker News | Zero submissions or comments |
| Stack Overflow | No verified profile found |
| GitHub | Exists (37 repos, Pro badge) but 1 follower, no profile README, no stars |
| LinkedIn | Exists but competes with multiple Franco Sanchez profiles |

**Fix:** See Brand Authority section for prioritized actions. The minimum viable move is: (1) create a GitHub profile README, (2) publish one technical article on DEV.to, (3) create a Wikidata entity.

---

## High Priority Issues (Fix Within 1 Week)

### H1 — Canonical URL Mismatch with Live Serving URL

**Severity:** HIGH
**Details:** `<link rel="canonical" href="https://fsanchezt.com">` (no www, no trailing slash) but the live server performs a 308 redirect to `https://www.fsanchezt.com/`. The canonical points to a redirecting URL. All `og:url` values and hreflang `href` attributes have the same mismatch.

**Fix:** Choose one canonical form (www or non-www) and apply it consistently to: `<link rel="canonical">`, all `og:url` meta tags, all three hreflang `href` attributes, the `<loc>` in sitemap.xml, and the `Sitemap:` directive in robots.txt.

---

### H2 — Person Schema Missing 8 Critical Properties

**Severity:** HIGH
**Details:** The existing Person JSON-LD is syntactically valid but semantically thin. The schema is the **only** content AI crawlers can parse from this SPA — its completeness matters disproportionately.

Missing properties: `@id`, `image`, `description`, `email`, `alumniOf` (3 institutions in education data), `worksFor` (Towel S.A. de C.V.), `hasOccupation`, `knowsLanguage`, `award`, `alternateName`.

**Fix:** Replace the existing schema block with the enhanced version in the Schema section below.

---

### H3 — No Project-Level Structured Data

**Severity:** HIGH
**Details:** Five projects with measurable outcomes (90%, 80%, 65%, 75%, 40%) exist in `src/data/projects.ts` but are completely invisible to AI crawlers due to SPA rendering. There is no `ItemList` or `SoftwareApplication` schema encoding these projects in static HTML.

**Fix:** Add an `ItemList` + `SoftwareApplication` JSON-LD block to `index.html` covering all 5 projects. This makes project metrics machine-readable regardless of JavaScript rendering. Full template in Schema section below.

---

### H4 — Bing Webmaster Tools Not Registered / IndexNow Not Implemented

**Severity:** HIGH
**Impact:** ChatGPT web search and Bing Copilot have no confirmed awareness of fsanchezt.com. The `msvalidate.01` meta tag is absent from `index.html`.

**Fix (30 minutes total):**
1. Register at bing.com/webmasters, add `<meta name="msvalidate.01" content="[KEY]">` to `index.html`
2. Generate an IndexNow key at indexnow.org, add `<meta name="indexnow-key" content="[KEY]">` to `index.html`
3. Add a Vercel deploy webhook that pings `https://api.indexnow.org/IndexNow?url=https://www.fsanchezt.com&key=[KEY]` on each deployment

---

### H5 — sameAs Only Has 2 Platforms (GitHub + LinkedIn)

**Severity:** HIGH
**Details:** Strong entity grounding requires 5+ `sameAs` links. Currently only GitHub and LinkedIn are listed. The LinkedIn URL uses the verbose UUID-style slug instead of a clean vanity URL.

**Fix:** Add DEV.to, Twitter/X (if applicable), and Stack Overflow profiles to `sameAs`. Create a Wikidata entity and add it to `sameAs` — this is the single highest-value entity signal available without Wikipedia notability.

---

## Medium Priority Issues (Fix Within 1 Month)

### M1 — llms.txt Missing Markdown Links and English Tagline

**Details:** The llms.txt Contact section uses plain text URLs, not the `[Title](url): Description` format the spec requires. The hero tagline is Spanish-only (`"Transformo complejidad técnica en rentabilidad, reduciendo costos operativos hasta un 85%."`) — English AI systems cannot extract and cite this.

**Fix:** 
- Update Contact section to: `- [Portfolio](https://www.fsanchezt.com): Personal portfolio and project showcase`
- Add English version of tagline: `"I turn technical complexity into measurable ROI — reducing operational costs by up to 85% through production AI systems."`

---

### M2 — No Privacy Policy Page

**Details:** The contact form collects name, email, and message. No privacy policy exists. This is both a GDPR/LFPDPPP compliance gap and a trust signal failure (Google Quality Rater Guidelines: trustworthiness requires disclosed data practices).

**Fix:** Add a minimal `/privacy` page. Even a single-paragraph policy covering what data is collected and how it is used satisfies the baseline requirement.

---

### M3 — 5 Awards and 4 Certifications Are Unnamed

**Details:** `profile.stats` shows `{ awards: 5, certifications: 4 }` but these are rendered as anonymous counters. Named credentials are the site's highest-authority signals currently trapped behind a number widget.

**Fix:** Name each award (hackathon wins, recognition events) and certification (Credly badge, AWS cert, Coursera completion) in both the visible UI and the schema `award` array. A "1st Place — HackMTY 2024" is far more citable than "5 awards."

---

### M4 — Security Headers Missing

**Details:** Five headers absent: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. HSTS is present but incomplete (missing `includeSubDomains; preload`).

**Fix:** Add a `headers` block to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://formspree.io;" }
      ]
    }
  ]
}
```

---

### M5 — Sitemap lastmod Date is Stale

**Details:** Sitemap declares `<lastmod>2026-03-21</lastmod>` but the live server reports `Last-Modified: 2026-05-29`. Stale `lastmod` causes crawlers to deprioritize re-crawling.

**Fix:** Add a build script or pre-deploy hook to update the sitemap `lastmod` to the current date on every deployment.

---

### M6 — No GitHub Profile README

**Details:** The `francost15/francost15` repository does not exist. A GitHub profile README provides crawlable Markdown content (indexed by Bing, Google, Perplexity) that establishes the technical brand. With 37 repos but 1 follower, the account has no social proof signals.

**Fix:** Create `https://github.com/francost15/francost15/README.md` with: name, role, 5 project headlines with metrics, tech stack as Markdown bullet lists, and a link to fsanchezt.com.

---

### M7 — Project Images Use Generic Alt Text

**Details:** `Projects.tsx:106` uses `alt={\`${project.title} screenshot ${current + 1}\`}` — this describes what number the screenshot is, not what it shows. Gemini specifically uses image alt text for multi-modal content understanding.

**Fix:** Replace with descriptive alt text per project per image. Example: `alt="LangGraph agent interface showing natural language SQL query being converted to live chart"`.

---

## Low Priority Issues (Optimize When Possible)

### L1 — No WebSite + WebPage Schema

No `WebSite` or `WebPage` schema type defined. These help AI systems understand the site as an entity and enable `speakable` markup for voice search citation.

### L2 — No speakable Markup

The hero bio and project metrics are ideal candidates for `speakable` schema, which signals to Google Assistant and AI Overviews which content blocks are safe to quote.

### L3 — AI Crawlers Not Named Explicitly in robots.txt

All crawlers are allowed via `User-agent: *` but GPTBot, ClaudeBot, anthropic-ai, PerplexityBot are not named explicitly. Explicit rules signal GEO awareness and protect against future Vercel firewall rules accidentally blocking AI crawlers.

### L4 — hreflang Points to a Redirecting URL

All three hreflang `href` values (`es`, `en`, `x-default`) point to `https://fsanchezt.com` which 308-redirects to `https://www.fsanchezt.com/`. Update to the canonical www URL.

### L5 — Domain Inconsistency: .com vs .dev

Site domain is `fsanchezt.com` but the contact email is `contacto@fsanchezt.dev`. Both are valid but fragment brand disambiguation for AI models. Add `email` to the Person schema so the relationship is explicit.

---

## Category Deep Dives

### AI Citability — 52/100

The citability score operates on a dual-track reality. The `llms.txt` is static and machine-readable, yielding moderate citability. The main `https://fsanchezt.com` URL returns only an HTML shell to non-JS crawlers — zero body text.

**Content blocks (source: llms.txt — only static content available):**

| Content Block | Citability | Reason |
|---|---|---|
| Projects + Metrics list | 79/100 | 6 distinct percentages, named systems, one-sentence impact format — citation-ready |
| Spanish tagline with 85% claim | 60/100 | Distinctive metric but Spanish-only limits English AI citation |
| Overview paragraph | 56/100 | Clear identity claim but describes thousands of senior engineers globally |
| Core Competencies list | 58/100 | Distinctive tech combination but reads as keyword list with no numbers |
| Experience timeline | 55/100 | Employer names + dates are clear but no quantified outcomes |

**Main site URL citability: ~5/100** — only `<title>` tag visible to AI crawlers.

---

### Brand Authority — 7/100

This is the ceiling risk for the entire GEO Score. "Franco Sanchez" is one of the most common Spanish-language name combinations. Without authoritative third-party mentions, AI systems cannot reliably identify this individual as a distinct entity.

| Platform | Score | Details |
|---|---|---|
| Wikipedia | 0/30 | No article — top results are historical figures |
| Reddit | 0/20 | Zero mentions or activity |
| YouTube | 0/15 | No channel |
| LinkedIn | 5/10 | Profile exists but competes with multiple same-name profiles |
| Industry sources | 2/25 | No DEV.to, Medium, HN, Stack Overflow presence |

**Critical disambiguation problem:** An AI asked "Who is Franco Sanchez, AI engineer?" would encounter profiles at nivii.ai, GAIAX, and others before surfacing fsanchezt.com. Schema `sameAs` helps but cannot overcome zero external corroboration.

---

### Content E-E-A-T — 52/100

| Dimension | Score | Key Finding |
|---|---|---|
| Experience | 16/25 | 5 projects with named employers and specific outcomes — solid foundation |
| Expertise | 14/25 | Correct technical vocabulary (LangGraph, RAG, OCR) but no methodology depth, unnamed certifications |
| Authoritativeness | 8/25 | 0 external citations, unnamed awards, no press mentions |
| Trustworthiness | 13/25 | HTTPS, visible email + phone, consistent identity — but no privacy policy, no testimonials |

**Topical authority: Minimal.** Single page, zero blog posts, zero case studies, zero articles. AI models discover authority through density of interconnected content around a topic — this site provides none.

---

### Technical GEO — 56/100

| Check | Status | Score |
|---|---|---|
| Server-Side Rendering | CRITICAL FAIL — React SPA, empty body | 15/100 |
| Meta Tags & Indexability | Meta description Spanish-only, canonical mismatch | 65/100 |
| robots.txt / llms.txt | Both present and permissive | 72/100 |
| Security Headers | 5 headers missing | 67/100 |
| Core Web Vitals Risk | Vite + Vercel CDN, but JS-dependent LCP | 60/100 |
| Mobile Optimization | Viewport, responsive, touch targets — well done | 88/100 |
| URL Structure | Clean domain, www inconsistency | 70/100 |

**Positive finding:** JSON-LD Person schema is in `<head>` (static), not in React-rendered JSX — it IS readable by AI crawlers without JavaScript. This is the one bright spot in the technical picture.

---

### Schema & Structured Data — 52/100

**Detected schemas:** 1 (Person)
**Missing schema types:** WebSite, WebPage, ItemList, SoftwareApplication, WorkHistory, speakable

| Property | Status |
|---|---|
| `@id` | Missing — required for cross-block referencing |
| `image` | Missing — critical for rich cards and E-E-A-T |
| `description` | Missing — AI models use for summarization |
| `alumniOf` | Missing — 3 institutions in education.ts, none in schema |
| `worksFor` | Missing — current employer not declared |
| `hasOccupation` | Missing |
| `knowsLanguage` | Missing — bilingual site, undeclared |
| `award` | Missing — 5 awards unnamed |
| `sameAs` | Partial — only 2 platforms |

---

### Platform Optimization — 19/100

| Platform | Score | Blocker |
|---|---|---|
| Google AI Overviews | 13/100 | No indexable body text, no question-based headings, not ranking for target queries |
| ChatGPT Web Search | 11/100 | No Wikipedia/Wikidata, no Bing WMT, no Reddit authority |
| Perplexity AI | 19/100 | No community validation (Reddit, HN, DEV.to) |
| Google Gemini | 17/100 | No YouTube, no Knowledge Panel, incomplete schema |
| Bing Copilot | 35/100 | Best performer — benefits from meta description, LinkedIn schema, Vercel CDN speed |

**Strongest signal:** Bing Copilot at 35/100. Adding Bing WMT + IndexNow would immediately improve this to ~55/100.

---

## Quick Wins (Implement This Week)

1. **Enhanced Person schema** — Replace the existing JSON-LD block in `index.html` with the full template below. Zero deploy risk, zero SSR needed, affects every AI crawler. (+8 Schema score)

2. **ItemList + SoftwareApplication schema** — Add project-level JSON-LD covering all 5 projects with their impact metrics. Makes the 90%/80%/65%/75%/40% figures machine-readable by AI crawlers. (+10 Schema score, +5 Citability score)

3. **Bing Webmaster Tools + IndexNow** — 30-minute registration unlocks ChatGPT web search and Bing Copilot indexing. Add `msvalidate.01` meta tag and IndexNow key to `index.html`. (+10 Platform score)

4. **GitHub profile README** — Create `francost15/francost15/README.md` with role, tech stack as Markdown bullets, project metrics, and fsanchezt.com link. Indexed by Bing, Google, and Perplexity. (+5 Brand score)

5. **llms.txt improvements** — Add English tagline, convert Contact section to proper Markdown links. 20-minute edit with immediate AI readability benefit.

6. **Fix canonical + www consistency** — Update `index.html` canonical, `og:url`, all hreflang `href` attributes, sitemap `<loc>`, and `robots.txt Sitemap:` to use `https://www.fsanchezt.com/` consistently. Eliminates canonical signal confusion.

7. **Security headers in vercel.json** — Add the 5 missing headers. Copy-paste the template from M4 above.

---

## 30-Day Action Plan

### Week 1: Schema & Technical Fixes (Zero SSR Required)
- [ ] Replace Person JSON-LD in `index.html` with enhanced version (template below)
- [ ] Add ItemList + SoftwareApplication JSON-LD block to `index.html` (template below)
- [ ] Fix canonical/www inconsistency across `index.html`, `sitemap.xml`, `robots.txt`
- [ ] Register Bing Webmaster Tools, add `msvalidate.01` tag
- [ ] Implement IndexNow key + Vercel deploy webhook
- [ ] Add 5 missing security headers to `vercel.json`
- [ ] Update sitemap `lastmod` to auto-update on deploy

### Week 2: Brand Signals (Zero Code Required)
- [ ] Create GitHub profile README at `francost15/francost15/README.md`
- [ ] Create a Wikidata entity at wikidata.org for Franco Sanchez (1 hour)
- [ ] Add Wikidata URL to `sameAs` in Person schema
- [ ] Update llms.txt: English tagline, Markdown links in Contact section
- [ ] Optimize LinkedIn profile: add fsanchezt.com as website, keyword-rich headline
- [ ] Request LinkedIn vanity URL change to `/in/fsanchezt` or `/in/franco-sanchez-ai-engineer`

### Week 3: Content Creation (Highest Long-Term Impact)
- [ ] Write one technical article on DEV.to: "Building a RAG Institutional Assistant: 65% Query Deflection in Production with LangChain" (800+ words, link back to fsanchezt.com)
- [ ] Add named awards to both UI (`profile.ts`) and schema
- [ ] Add named certifications with Credly/provider links
- [ ] Name each award in `award` array in Person schema
- [ ] Add `alt` text descriptions to all project images in `Projects.tsx`

### Week 4: SSR or Fallback Content
- [ ] Evaluate migration to Next.js `output: 'export'` vs. `<noscript>` fallback approach
- [ ] Implement chosen approach — either static export or `<noscript>` block with core bio, project metrics, competency headings
- [ ] Add WebSite + WebPage + speakable schema block to `index.html`
- [ ] Add minimal Privacy Policy page
- [ ] Publish "Show HN" post on Hacker News linking to portfolio with technical description

---

## Schema Templates for Immediate Implementation

### Template 1: Enhanced Person Schema (replace existing block in `index.html`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.fsanchezt.com/#person",
  "name": "Franco Sanchez",
  "alternateName": "Franco Alessandro Sanchez Trinidad",
  "jobTitle": "AI & Software Engineer",
  "url": "https://www.fsanchezt.com",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.fsanchezt.com/og-image.png",
    "description": "Franco Sanchez — AI & Software Engineer"
  },
  "description": "AI & Software Engineer with 5+ years shipping production AI systems from concept to deployment. Specializes in LangChain, LangGraph, RAG pipelines, and full-stack architecture. Reduces operational costs by up to 85% and builds systems with accuracy above 92%.",
  "email": "contacto@fsanchezt.dev",
  "telephone": "+52-220-157-0694",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Puebla",
    "addressCountry": "MX"
  },
  "nationality": { "@type": "Country", "name": "Mexico" },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Universidad del Valle de Puebla",
      "alternateName": "UVP"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Universidad Anáhuac Puebla"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "UNIR México — Universidad Internacional de La Rioja"
    }
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Towel S.A. de C.V.",
    "address": { "@type": "PostalAddress", "addressLocality": "Puebla", "addressCountry": "MX" }
  },
  "hasOccupation": {
    "@type": "Occupation",
    "name": "AI & Software Engineer",
    "occupationLocation": { "@type": "City", "name": "Puebla" },
    "skills": "LangChain, LangGraph, RAG, TensorFlow, React, NestJS, AWS, PostgreSQL, Python, Computer Vision, OCR, NLP"
  },
  "knowsAbout": [
    "Artificial Intelligence", "Machine Learning", "Full-Stack Development",
    "Computer Vision", "Retrieval-Augmented Generation", "LangChain", "LangGraph",
    "Large Language Models", "Natural Language Processing", "TensorFlow",
    "AWS Cloud Architecture", "PostgreSQL", "React", "NestJS", "Software Architecture"
  ],
  "knowsLanguage": [
    { "@type": "Language", "name": "Spanish", "alternateName": "es" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ],
  "award": [
    "REPLACE_WITH_ACTUAL_AWARD_1",
    "REPLACE_WITH_ACTUAL_AWARD_2",
    "REPLACE_WITH_ACTUAL_AWARD_3",
    "REPLACE_WITH_ACTUAL_AWARD_4",
    "REPLACE_WITH_ACTUAL_AWARD_5"
  ],
  "sameAs": [
    "https://github.com/francost15",
    "https://www.linkedin.com/in/franco-alessandro-sanchez-trinidad-2320742a3/",
    "REPLACE_WITH_WIKIDATA_URL_ONCE_CREATED"
  ]
}
```

### Template 2: ItemList + SoftwareApplication (add as 2nd `<script>` block after Person)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.fsanchezt.com/#projects",
  "name": "Portfolio Projects — Franco Sanchez",
  "description": "AI and software engineering projects by Franco Sanchez with measurable business outcomes.",
  "numberOfItems": 5,
  "author": { "@id": "https://www.fsanchezt.com/#person" },
  "itemListElement": [
    {
      "@type": "ListItem", "position": 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": "AI Business Intelligence Dashboard",
        "description": "LangGraph agent that queries SQL databases via natural language, generates dynamic charts, and predicts sales. Reduced report generation time by 90%.",
        "applicationCategory": "BusinessApplication",
        "author": { "@id": "https://www.fsanchezt.com/#person" },
        "programmingLanguage": ["React", "Python", "LangGraph"],
        "keywords": "AI dashboard, LangGraph, business intelligence, natural language SQL, LLMs"
      }
    },
    {
      "@type": "ListItem", "position": 2,
      "item": {
        "@type": "SoftwareApplication",
        "name": "Smart CFDI Billing System",
        "description": "Electronic billing platform with OCR-based accounting data extraction and predictive income flow modeling. Automated 80% of accounting workflows with 92% projection accuracy.",
        "applicationCategory": "BusinessApplication",
        "author": { "@id": "https://www.fsanchezt.com/#person" },
        "programmingLanguage": ["Node.js", "Python"],
        "keywords": "CFDI billing, OCR, electronic invoicing, Mexico fintech, predictive models"
      }
    },
    {
      "@type": "ListItem", "position": 3,
      "item": {
        "@type": "SoftwareApplication",
        "name": "RAG Institutional Assistant",
        "description": "24/7 virtual assistant using Retrieval-Augmented Generation connected to university knowledge bases. Autonomously resolved 65% of level-1 support queries.",
        "applicationCategory": "EducationalApplication",
        "author": { "@id": "https://www.fsanchezt.com/#person" },
        "programmingLanguage": ["Python", "LangChain"],
        "keywords": "RAG chatbot, LangChain, vector database, university assistant, AI support automation"
      }
    },
    {
      "@type": "ListItem", "position": 4,
      "item": {
        "@type": "SoftwareApplication",
        "name": "Textile Production ERP",
        "description": "ERP system for real-time textile production traceability and shop floor control. Improved workflow visibility by 40% and eliminated paper use on the plant floor.",
        "applicationCategory": "BusinessApplication",
        "author": { "@id": "https://www.fsanchezt.com/#person" },
        "programmingLanguage": ["React", "PostgreSQL"],
        "keywords": "ERP, textile industry, production management, real-time tracking, PostgreSQL"
      }
    },
    {
      "@type": "ListItem", "position": 5,
      "item": {
        "@type": "SoftwareApplication",
        "name": "AI-Powered Job Matching Board",
        "description": "Job board that parses CVs with NLP to automatically match candidate skills to technical vacancies. Reduced initial screening time by 75%.",
        "applicationCategory": "BusinessApplication",
        "author": { "@id": "https://www.fsanchezt.com/#person" },
        "programmingLanguage": ["Next.js", "Python", "AWS"],
        "keywords": "job matching, AI recruitment, NLP, CV parsing, AWS, Next.js"
      }
    }
  ]
}
```

---

## Appendix: Pages Analyzed

| URL | Title | Status | GEO Issues |
|---|---|---|---|
| https://www.fsanchezt.com/ | Franco Sanchez — AI & Software Engineer | 200 OK | C1, C2, H1, H2, H3, H4, H5 |
| https://www.fsanchezt.com/llms.txt | — (plain text) | 200 OK | M1 (minor format issues) |
| https://www.fsanchezt.com/sitemap.xml | — (XML) | 200 OK | M5 (stale lastmod) |
| https://www.fsanchezt.com/robots.txt | — (plain text) | 200 OK | L3 (no explicit AI crawler rules) |

**Note:** This is a single-page application with one indexable URL. The `llms.txt`, `sitemap.xml`, and `robots.txt` are supporting files, not content pages.

---

*Generated by Claude Code GEO Audit — 2026-06-25*
*Audit methodology: 5-subagent parallel analysis (AI Visibility, Platform Analysis, Technical GEO, Content E-E-A-T, Schema & Structured Data)*
