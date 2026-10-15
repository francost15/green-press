import { describe, it, expect } from "vitest";
import Hero from "../sections/Hero.astro";
import { renderAstro } from "./render";

describe("Hero", () => {
  it("renders the value proposition in the top-level heading", async () => {
    const { container } = await renderAstro(Hero, { lang: "en" });
    const heading = container.querySelector("h1");
    expect(heading?.textContent).toContain("Production AI");
    expect(heading?.textContent).toContain("your business.");
    expect(heading?.textContent).toContain("ship");
  });

  it("puts real project captures next to the name", async () => {
    const { container } = await renderAstro(Hero, { lang: "en" });
    const shots = container.querySelectorAll("[data-work-shot] img");
    expect(shots.length).toBe(3);
    expect(shots[0]?.getAttribute("src")?.startsWith("/projects/")).toBe(true);
  });

  it("renders the English sales CTAs and fanned deck by default", async () => {
    const { getByText, queryByText, container } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("Start a project")).toBeInTheDocument();
    expect(getByText("Explore projects")).toBeInTheDocument();
    expect(queryByText("Download CV")).toBeNull();
    expect(container.querySelectorAll("[data-fan-card]").length).toBe(5);
    expect(container.querySelectorAll("[data-anno]").length).toBe(0);
  });

  it("renders the Spanish sales CTAs for es", async () => {
    const { getByText, queryByText } = await renderAstro(Hero, { lang: "es" });
    expect(getByText("Iniciar un proyecto")).toBeInTheDocument();
    expect(getByText("Ver proyectos")).toBeInTheDocument();
    expect(queryByText("Descargar CV")).toBeNull();
  });

  it("keeps one subtext and no availability line in the first viewport", async () => {
    const { getByText, queryByText } = await renderAstro(Hero, { lang: "en" });
    expect(
      getByText("Five AI systems in production: plant floor, CFDI, university, recruitment."),
    ).toBeInTheDocument();
    expect(queryByText("Franco Alessandro Sanchez Trinidad")).toBeNull();
    expect(queryByText(/Mtro/i)).toBeNull();
    expect(queryByText(/Available for full-time/i)).toBeNull();
    expect(queryByText("Languages")).toBeNull();
    expect(getByText("AI Business Intelligence Dashboard")).toBeInTheDocument();
  });
});
