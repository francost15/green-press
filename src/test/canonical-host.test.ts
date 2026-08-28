import { describe, it, expect } from "vitest";
import Portfolio from "../layouts/Portfolio.astro";
import ProjectPage from "../layouts/ProjectPage.astro";
import { projects } from "../data/projects";
import { personSchema, projectsSchema } from "../data/structuredData";
import { SITE } from "../i18n";
import { renderAstro } from "./render";

// Every self-referencing absolute URL — canonical, hreflang, og:url, sitemap, JSON-LD @id —
// must sit on exactly one host. When they disagree, canonicals point at a redirect and the
// entity graph splits across two origins. This caught a real production defect.
const selfUrls = (html: string) =>
  [...html.matchAll(/https:\/\/[a-z.]*fsanchezt\.com[^"'\s<)]*/g)].map((m) => m[0]);

describe("canonical host", () => {
  it("is a single origin across the home page", async () => {
    const { html } = await renderAstro(Portfolio, { lang: "en" });
    const offHost = selfUrls(html).filter((url) => !url.startsWith(SITE));
    expect(offHost).toEqual([]);
  });

  it("is a single origin across a project page", async () => {
    const { html } = await renderAstro(ProjectPage, { lang: "es", project: projects[0] });
    const offHost = selfUrls(html).filter((url) => !url.startsWith(SITE));
    expect(offHost).toEqual([]);
  });

  it("builds schema ids from SITE, with no missing separator", () => {
    const json = JSON.stringify([personSchema("en"), projectsSchema("en")]);
    for (const url of selfUrls(json)) {
      expect(url.startsWith(SITE)).toBe(true);
      // `${SITE}${path}` without a leading slash produced "fsanchezt.comprojects/…".
      expect(url.slice(SITE.length)).toMatch(/^(\/|#|$)/);
    }
    expect(json).toContain(`${SITE}/#work-ai-business-intelligence-dashboard`);
  });
});
