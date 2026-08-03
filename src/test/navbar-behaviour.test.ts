import { describe, it, expect } from "vitest";
import Navbar from "../components/Navbar.astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { initNavbar } from "../scripts/navbar";

async function mount(lang: "en" | "es" = "es") {
  const container = await AstroContainer.create();
  document.body.innerHTML = await container.renderToString(Navbar, { props: { lang } });
  initNavbar(document);
  return {
    button: document.querySelector<HTMLButtonElement>("[data-menu-button]")!,
    menu: document.querySelector<HTMLElement>("[data-mobile-menu]")!,
  };
}

describe("navbar behaviour", () => {
  it("opens the mobile menu on click", async () => {
    const { button, menu } = await mount();
    expect(menu.hidden).toBe(true);

    button.click();
    expect(menu.hidden).toBe(false);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-label", "Cerrar menú");
  });

  it("closes on a second click", async () => {
    const { button, menu } = await mount();
    button.click();
    button.click();
    expect(menu.hidden).toBe(true);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-label", "Abrir menú");
  });

  it("closes on Escape", async () => {
    const { button, menu } = await mount();
    button.click();
    menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(menu.hidden).toBe(true);
  });

  it("closes when a menu link is followed", async () => {
    const { button, menu } = await mount();
    button.click();
    menu.querySelector("a")!.click();
    expect(menu.hidden).toBe(true);
  });

  it("swaps the button icon with the open state", async () => {
    const { button } = await mount();
    const open = button.querySelector<HTMLElement>("[data-icon-open]")!;
    const close = button.querySelector<HTMLElement>("[data-icon-close]")!;

    expect(open.hidden).toBe(false);
    expect(close.hidden).toBe(true);

    button.click();
    expect(open.hidden).toBe(true);
    expect(close.hidden).toBe(false);
  });

  it("adds the scrolled class past the threshold", async () => {
    await mount();
    const nav = document.querySelector(".site-nav")!;
    expect(nav.classList.contains("is-scrolled")).toBe(false);
  });
});
