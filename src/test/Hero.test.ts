import { describe, it, expect } from "vitest";
import Hero from "../sections/Hero.astro";
import { renderAstro } from "./render";

describe("Hero", () => {
  it("renders the name in the top-level heading", async () => {
    const { container } = await renderAstro(Hero, { lang: "en" });
    const heading = container.querySelector("h1");
    // One text node with a real space: extraction pipelines that read
    // textContent must not see the single token "FrancoSanchez".
    expect(heading?.textContent?.trim()).toBe("Franco Sanchez");
  });

  it("annotates the margin with the role", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("AI & Software Engineer")).toBeInTheDocument();
  });

  it("renders the English CTAs by default", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("See the record")).toBeInTheDocument();
    expect(getByText("Download CV")).toBeInTheDocument();
  });

  it("renders the Spanish CTAs for es", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "es" });
    expect(getByText("Ver el registro")).toBeInTheDocument();
    expect(getByText("Descargar CV")).toBeInTheDocument();
  });

  it("marks the CV link as a download", async () => {
    const { getByText } = await renderAstro(Hero, { lang: "en" });
    expect(getByText("Download CV").closest("a")).toHaveAttribute("download");
  });

  it("counts the shipped systems from the data rather than hard-coding them", async () => {
    const { getByText, queryByText } = await renderAstro(Hero, { lang: "en" });
    const { projects } = await import("../data/projects");
    expect(getByText(new RegExp(`^${projects.length} systems`))).toBeInTheDocument();
    // Project count and employment start are different records. Welding them
    // into "5 systems · since 2020" overclaimed production AI back to 2020.
    expect(queryByText(/systems · since/i)).toBeNull();
  });

  it("keeps one subtext and no availability line in the first viewport", async () => {
    const { getByText, queryByText } = await renderAstro(Hero, { lang: "en" });
    expect(
      getByText("Five AI systems in production: plant floor, CFDI, university, recruitment."),
    ).toBeInTheDocument();
    expect(getByText("Franco Alessandro Sanchez Trinidad")).toBeInTheDocument();
    expect(getByText("Puebla, Mexico")).toBeInTheDocument();
    expect(queryByText("Puebla, México")).toBeNull();
    expect(queryByText(/Available for full-time/i)).toBeNull();
    expect(queryByText("Languages")).toBeNull();
  });
});
