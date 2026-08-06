import { describe, it, expect } from "vitest";
import Footer from "../components/Footer.astro";
import { renderAstro } from "./render";

describe("Footer", () => {
  it("renders copyright with the current year", async () => {
    const { getByText } = await renderAstro(Footer);
    expect(getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("labels the social links", async () => {
    const { getByRole } = await renderAstro(Footer);
    expect(getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Email" })).toBeInTheDocument();
  });

  it("opens external links safely", async () => {
    const { getByRole } = await renderAstro(Footer);
    const linkedin = getByRole("link", { name: "LinkedIn" });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the mailto link in the same tab", async () => {
    const { getByRole } = await renderAstro(Footer);
    expect(getByRole("link", { name: "Email" })).not.toHaveAttribute("target");
  });
});
