import { describe, it, expect } from "vitest";
import Section from "../components/Section.astro";
import { renderAstro } from "./render";

describe("Section", () => {
  it("renders title and subtitle", async () => {
    const { getByText } = await renderAstro(Section, {
      id: "test",
      title: "Test Title",
      subtitle: "Test subtitle",
    });
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders no heading when there is no title", async () => {
    const { queryByRole } = await renderAstro(Section, { id: "test" });
    expect(queryByRole("heading")).not.toBeInTheDocument();
  });

  it("sets the id on the section element", async () => {
    const { container } = await renderAstro(Section, { id: "my-section" });
    expect(container.querySelector("section#my-section")).toBeInTheDocument();
  });

  it("applies a custom class", async () => {
    const { container } = await renderAstro(Section, { id: "test", class: "custom-class" });
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("renders the marginal annotation beside the heading", async () => {
    const { getByText } = await renderAstro(Section, {
      id: "test",
      title: "T",
      meta: "5 entries",
    });
    expect(getByText("5 entries")).toBeInTheDocument();
  });
});
