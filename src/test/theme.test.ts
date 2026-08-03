import { describe, it, expect, beforeEach } from "vitest";
import ThemeToggle from "../components/ThemeToggle.astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { initThemeToggle, THEME_STORAGE_KEY } from "../scripts/theme";

// Real component markup driven by the real script, so the two stay in sync.
async function mount() {
  const container = await AstroContainer.create();
  document.body.innerHTML = await container.renderToString(ThemeToggle);
  initThemeToggle(document);
  return document.querySelector<HTMLButtonElement>("[data-theme-toggle]")!;
}

describe("theme toggle", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("renders as a switch", async () => {
    const button = await mount();
    expect(button).toHaveAttribute("role", "switch");
  });

  it("reflects the current theme in aria state", async () => {
    const button = await mount();
    expect(button).toHaveAttribute("aria-checked", "false");
    expect(button.getAttribute("aria-label")).toMatch(/^(Light|Dark) mode$/);
  });

  it("flips the theme on click", async () => {
    const button = await mount();
    button.click();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(button).toHaveAttribute("aria-checked", "true");

    button.click();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(button).toHaveAttribute("aria-checked", "false");
  });

  it("persists the choice", async () => {
    const button = await mount();
    button.click();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });
});
