import { describe, it, expect, afterEach } from "vitest";
import Hero from "../sections/Hero.astro";
import Projects from "../sections/Projects.astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { initAtelier } from "../scripts/atelier";

async function mount() {
  const container = await AstroContainer.create();
  const hero = await container.renderToString(Hero, { props: { lang: "en" } });
  const projects = await container.renderToString(Projects, { props: { lang: "en" } });
  document.body.innerHTML = hero + projects;
}

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  delete document.documentElement.dataset.atelierReady;
  document.body.innerHTML = "";
});

describe("atelier motion", () => {
  it("leaves project titles extractable", async () => {
    await mount();
    const handle = initAtelier(document);
    expect(document.querySelector("[data-project-index]")).toBeTruthy();
    expect(document.body.textContent).toContain("AI Business Intelligence Dashboard");
    handle.kill();
  });

  it("skips looping motion when reduced motion is on", async () => {
    window.matchMedia = (query: string) =>
      ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;

    await mount();
    const handle = initAtelier(document);
    expect(document.querySelector("[data-panel]")?.classList.contains("is-open")).toBe(true);
    handle.kill();
  });
});
