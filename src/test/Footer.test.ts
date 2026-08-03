import { describe, it, expect } from "vitest";
import Footer from "../components/Footer.astro";
import { renderAstro } from "./render";

describe("Footer", () => {
  it("renders copyright with the current year", async () => {
    const { getByText } = await renderAstro(Footer);
    expect(getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("labels the social links", async () => {
    const { getByLabelText } = await renderAstro(Footer);
    expect(getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(getByLabelText("GitHub")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
  });

  it("opens external links safely", async () => {
    const { getByLabelText } = await renderAstro(Footer);
    const linkedin = getByLabelText("LinkedIn");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the mailto link in the same tab", async () => {
    const { getByLabelText } = await renderAstro(Footer);
    expect(getByLabelText("Email")).not.toHaveAttribute("target");
  });
});
