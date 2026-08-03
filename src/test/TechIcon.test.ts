import { describe, it, expect } from "vitest";
import TechIcon from "../components/TechIcon.astro";
import { renderAstro } from "./render";

// The glyph is decorative — every call site pairs it with a visible text label — so it
// carries no accessible name. Query it structurally, not by label.
const svg = (container: HTMLElement) => container.querySelector("svg");

describe("TechIcon", () => {
  it("renders brand-safe icons with brand variant metadata", async () => {
    const { container } = await renderAstro(TechIcon, { name: "React", variant: "brand" });
    expect(svg(container)).toHaveAttribute("data-variant", "brand");
  });

  it("supports the brand variant on stack icons", async () => {
    const { container } = await renderAstro(TechIcon, { name: "FastAPI", variant: "brand" });
    expect(svg(container)).toHaveAttribute("data-variant", "brand");
  });

  it("falls back to mono for icons that are not brand-safe", async () => {
    const { container } = await renderAstro(TechIcon, { name: "YOLO", variant: "brand" });
    expect(svg(container)).toHaveAttribute("data-variant", "mono");
  });

  it("renders nothing for unknown technologies", async () => {
    const { container } = await renderAstro(TechIcon, { name: "Unknown Tech", variant: "brand" });
    expect(svg(container)).toBeNull();
  });

  it("exposes the brand colour as a custom property", async () => {
    const { container } = await renderAstro(TechIcon, { name: "React", variant: "brand" });
    expect(svg(container)?.getAttribute("style")).toContain("--icon-brand");
  });

  it("is hidden from assistive technology and carries no duplicate name", async () => {
    const { container, html } = await renderAstro(TechIcon, { name: "Python" });
    expect(svg(container)).toHaveAttribute("aria-hidden", "true");
    expect(svg(container)).not.toHaveAttribute("aria-label");
    expect(html).not.toContain("<title>");
  });
});
