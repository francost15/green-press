import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vite-plus/test";
import { Footer } from "../components/Footer";

describe("Footer", () => {
  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders social links with aria-labels", () => {
    render(<Footer />);
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("linkedin link has security attributes", () => {
    render(<Footer />);
    const linkedin = screen.getByLabelText("LinkedIn");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });
});
