import { describe, it, expect } from "vitest";
import ProjectPage from "../layouts/ProjectPage.astro";
import { projects } from "../data/projects";
import { renderAstro } from "./render";

const cfdi = projects.find((p) => p.slug === "smart-cfdi-billing-system")!;

describe("ProjectPage", () => {
  it("renders the project as the page heading", async () => {
    const { container } = await renderAstro(ProjectPage, { lang: "en", project: cfdi });
    expect(container.querySelector("h1")?.textContent?.trim()).toBe(cfdi.title.en);
  });

  it("puts the detail prose in the document, not behind a hidden subtree", async () => {
    const { container } = await renderAstro(ProjectPage, { lang: "en", project: cfdi });
    expect(container.textContent).toContain(cfdi.problem.en);
    expect(container.textContent).toContain(cfdi.solution.en);
    expect(container.querySelector("[hidden]:not([data-mobile-menu]):not([data-icon-close])"))
      .toBeNull();
  });

  it("localizes the prose", async () => {
    const { container } = await renderAstro(ProjectPage, { lang: "es", project: cfdi });
    expect(container.textContent).toContain(cfdi.problem.es);
    expect(container.textContent).not.toContain(cfdi.problem.en);
  });

  // Regression guard: the language switch used to drop the reader on the locale home page
  // instead of the same project in the other language.
  it("switches language to the same project, not the home page", async () => {
    const en = await renderAstro(ProjectPage, { lang: "en", project: cfdi });
    expect(en.container.querySelector("[data-lang-switch]")).toHaveAttribute(
      "href",
      `/es/proyectos/${cfdi.slug}/`,
    );

    const es = await renderAstro(ProjectPage, { lang: "es", project: cfdi });
    expect(es.container.querySelector("[data-lang-switch]")).toHaveAttribute(
      "href",
      `/projects/${cfdi.slug}/`,
    );
  });

  it("gives every screenshot intrinsic dimensions", async () => {
    const { container } = await renderAstro(ProjectPage, { lang: "en", project: cfdi });
    const images = [...container.querySelectorAll("main img")];
    expect(images).toHaveLength(cfdi.images!.length);
    for (const img of images) {
      expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
    }
  });

  it("offers a phone-sized variant of every screenshot", async () => {
    const { container } = await renderAstro(ProjectPage, { lang: "en", project: cfdi });
    for (const img of container.querySelectorAll("main img")) {
      const src = img.getAttribute("src")!;
      expect(img.getAttribute("srcset")).toBe(
        `${src.replace(/\.webp$/, "-sm.webp")} 768w, ${src} 1536w`,
      );
      expect(img).toHaveAttribute("sizes");
    }
  });
});
