import { describe, it, expect } from "vitest";
import Hero from "../sections/Hero.astro";
import { renderAstro } from "./render";

describe("Hero", () => {
  it("renders the name in the top-level heading", async () => {
    const { container } = await renderAstro(Hero, { lang: "en" });
    // The display treatment breaks the name across two lines, so the text
    // nodes sit either side of a <br> rather than forming one string.
    const heading = container.querySelector("h1");
    expect(heading?.textContent).toContain("Franco");
    expect(heading?.textContent).toContain("Sanchez");
  });

  it("renders the title", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("AI & Software Engineer")).toBeInTheDocument();
  });

  it("renders the English CTAs by default", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("View Projects")).toBeInTheDocument();
    expect(getByText("Download CV")).toBeInTheDocument();
  });

  it("renders the Spanish CTAs for es", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "es" });
    expect(getByText("Ver Proyectos")).toBeInTheDocument();
    expect(getByText("Descargar CV")).toBeInTheDocument();
  });

  it("marks the CV link as a download", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("Download CV").closest("a")).toHaveAttribute("download");
  });

  it("staggers six hero items", async () => {
    const { container } = await renderAstro(Hero, { lang: "en" });
    expect(container.querySelectorAll(".hero-item").length).toBeGreaterThanOrEqual(6);
  });
});
