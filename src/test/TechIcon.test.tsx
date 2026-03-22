import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { TechIcon } from "../data/techIcons";

describe("TechIcon", () => {
  it("renders brand-safe icons with brand variant metadata", () => {
    render(<TechIcon name="React" variant="brand" className="h-6 w-6" />);

    const icon = screen.getByLabelText("React");
    expect(icon).toHaveAttribute("data-variant", "brand");
  });

  it("supports brand variant on stack icons promoted to hover color", () => {
    render(<TechIcon name="FastAPI" variant="brand" className="h-6 w-6" />);

    const icon = screen.getByLabelText("FastAPI");
    expect(icon).toHaveAttribute("data-variant", "brand");
  });

  it("returns null for unknown technologies", () => {
    const { container } = render(<TechIcon name="Unknown Tech" variant="brand" />);

    expect(container.firstChild).toBeNull();
  });
});
