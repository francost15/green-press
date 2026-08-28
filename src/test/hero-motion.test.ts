import { describe, it, expect, afterEach } from "vitest";
import Hero from "../sections/Hero.astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { initHero } from "../scripts/hero";

async function mount() {
  const container = await AstroContainer.create();
  document.body.innerHTML = await container.renderToString(Hero, { props: { lang: "en" } });
  return document.querySelector<HTMLElement>("#inicio")!;
}

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("hero motion", () => {
  it("lifts whole words and leaves extractable text intact", async () => {
    const hero = await mount();
    const handle = initHero(document);

    expect(hero.dataset.heroMotion).toBe("gsap");
    expect(hero.querySelector(".hero-ch")).toBeNull();
    expect(hero.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "Franco Sanchez",
    );

    handle.kill();
  });

  it("skips GSAP when motion is reduced", async () => {
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

    const hero = await mount();
    initHero(document);

    expect(hero.dataset.heroMotion).toBeUndefined();
    expect(hero.querySelector("h1")?.textContent?.trim()).toBe("Franco Sanchez");
  });
});
