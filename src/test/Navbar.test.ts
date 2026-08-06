import { describe, it, expect } from "vitest";
import Navbar from "../components/Navbar.astro";
import { renderAstro } from "./render";

describe("Navbar markup", () => {
  it("renders a navigation landmark", async () => {
    const { getByRole } = await renderAstro(Navbar, { lang: "en" });
    expect(getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the nav links in the active language", async () => {
    const en = await renderAstro(Navbar, { lang: "en" });
    expect(en.getAllByText("Projects").length).toBeGreaterThan(0);
    expect(en.getAllByText("Experience").length).toBeGreaterThan(0);
    expect(en.getAllByText("Contact").length).toBeGreaterThan(0);

    const es = await renderAstro(Navbar, { lang: "es" });
    expect(es.getAllByText("Proyectos").length).toBeGreaterThan(0);
    expect(es.getAllByText("Experiencia").length).toBeGreaterThan(0);
    expect(es.getAllByText("Contacto").length).toBeGreaterThan(0);
  });

  it("points the language switch at the other locale", async () => {
    const en = await renderAstro(Navbar, { lang: "en" });
    for (const el of en.getAllByLabelText("Cambiar a Español")) {
      expect(el).toHaveAttribute("href", "/es/");
    }

    const es = await renderAstro(Navbar, { lang: "es" });
    for (const el of es.getAllByLabelText("Switch to English")) {
      expect(el).toHaveAttribute("href", "/");
    }
  });

  it("starts with the mobile menu closed", async () => {
    const { container } = await renderAstro(Navbar, { lang: "en" });
    const button = container.querySelector("[data-menu-button]");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-menu");
    expect(container.querySelector("[data-mobile-menu]")).toHaveAttribute("hidden");
  });

  it("exposes the mobile menu as a disclosure, not a modal", async () => {
    // It does not cover the page and the rest of the document stays reachable,
    // so aria-modal would tell a screen reader something untrue.
    const { container } = await renderAstro(Navbar, { lang: "en" });
    const menu = container.querySelector("[data-mobile-menu]");
    expect(menu).not.toHaveAttribute("aria-modal");
    expect(menu).not.toHaveAttribute("role", "dialog");
    expect(container.querySelector("[data-menu-button]")).toHaveAttribute(
      "aria-controls",
      "mobile-menu",
    );
  });
});
