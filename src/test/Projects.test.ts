import { describe, it, expect } from "vitest";
import Projects from "../sections/Projects.astro";
import { projects } from "../data/projects";
import { renderAstro } from "./render";

describe("Projects section", () => {
  it("links every card to its English project route", async () => {
    const { container } = await renderAstro(Projects, { lang: "en" });
    for (const project of projects) {
      expect(container.querySelector(`a[href="/projects/${project.slug}/"]`)).toBeInTheDocument();
    }
  });

  it("links every card to its Spanish project route", async () => {
    const { container } = await renderAstro(Projects, { lang: "es" });
    for (const project of projects) {
      expect(
        container.querySelector(`a[href="/es/proyectos/${project.slug}/"]`),
      ).toBeInTheDocument();
    }
  });

  // Regression guard: project detail used to sit in [hidden] modals, which AI extraction
  // pipelines discard. It now lives on its own routes and nothing here may be hidden.
  it("renders no hidden subtrees", async () => {
    const { container } = await renderAstro(Projects, { lang: "en" });
    expect(container.querySelector("[hidden]")).toBeNull();
    expect(container.querySelector("[data-modal]")).toBeNull();
  });

  it("uses the localized tag set", async () => {
    const en = await renderAstro(Projects, { lang: "en" });
    expect(en.container.textContent).toContain("Industrial Management");
    expect(en.container.textContent).not.toContain("Gestión Industrial");

    const es = await renderAstro(Projects, { lang: "es" });
    expect(es.container.textContent).toContain("Gestión Industrial");
  });

  it("shows each project's impact on the card", async () => {
    const { container } = await renderAstro(Projects, { lang: "en" });
    expect(container.textContent).toContain("90%");
  });
});
