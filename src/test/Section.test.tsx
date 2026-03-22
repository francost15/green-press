import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vite-plus/test";
import { Section } from "../components/Section";

describe("Section", () => {
  it("renders with title and subtitle", () => {
    render(
      <Section id="test" title="Test Title" subtitle="Test subtitle">
        <p>Content</p>
      </Section>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <Section id="test">
        <p>Content only</p>
      </Section>,
    );
    expect(screen.getByText("Content only")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("sets the correct id", () => {
    const { container } = render(
      <Section id="my-section">
        <p>children</p>
      </Section>,
    );
    expect(container.querySelector("#my-section")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Section id="test" className="custom-class">
        <p>children</p>
      </Section>,
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});
