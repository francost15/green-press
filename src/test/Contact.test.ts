import { describe, it, expect } from "vitest";
import Contact from "../sections/Contact.astro";
import { renderAstro } from "./render";

describe("Contact", () => {
  it("renders the required form fields", async () => {
    const { getByLabelText } = await renderAstro(Contact, { lang: "es" });
    expect(getByLabelText(/Nombre/)).toBeRequired();
    expect(getByLabelText(/Email/)).toBeRequired();
    expect(getByLabelText(/Mensaje/)).toBeRequired();
  });

  it("labels the fields in English for en", async () => {
    const { getByLabelText } = await renderAstro(Contact, { lang: "en" });
    expect(getByLabelText(/Name/)).toBeRequired();
    expect(getByLabelText(/Message/)).toBeRequired();
  });

  it("renders the submit button", async () => {
    const { getByRole } = await renderAstro(Contact, { lang: "en" });
    expect(getByRole("button", { name: /Send Message/ })).toBeInTheDocument();
  });

  it("posts to formspree", async () => {
    const { container } = await renderAstro(Contact, { lang: "en" });
    const form = container.querySelector("[data-contact-form]");
    expect(form?.getAttribute("data-endpoint")).toMatch(/^https:\/\/formspree\.io\/f\//);
  });

  it("renders contact links", async () => {
    const { getByText } = await renderAstro(Contact, { lang: "en" });
    const linkedin = getByText("LinkedIn").closest("a");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has an aria-live region for status messages", async () => {
    const { container } = await renderAstro(Contact, { lang: "en" });
    expect(container.querySelector("[aria-live='polite']")).toBeInTheDocument();
  });
});
