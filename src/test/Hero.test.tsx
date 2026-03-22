import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vite-plus/test";
import { Hero } from "../sections/Hero";
import { I18nProvider } from "../i18n";

function renderHero() {
  return render(
    <I18nProvider>
      <Hero />
    </I18nProvider>,
  );
}

describe("Hero", () => {
  it("renders the name", () => {
    renderHero();
    expect(screen.getByText("Franco Sanchez")).toBeInTheDocument();
  });

  it("renders the title", () => {
    renderHero();
    expect(screen.getByText("AI & Software Engineer")).toBeInTheDocument();
  });

  it("renders project link", () => {
    renderHero();
    expect(screen.getByText("Ver Proyectos")).toBeInTheDocument();
  });

  it("renders CV download link", () => {
    renderHero();
    const cvLink = screen.getByText("Descargar CV");
    expect(cvLink).toBeInTheDocument();
    expect(cvLink.closest("a")).toHaveAttribute("download");
  });

  it("has hero-entrance animation class on grid", () => {
    const { container } = renderHero();
    expect(container.querySelector(".hero-entrance")).toBeInTheDocument();
  });

  it("starts with opacity 0 for FOUC prevention", () => {
    const { container } = renderHero();
    const grid = container.querySelector(".hero-entrance");
    expect(grid).toHaveStyle({ opacity: "0" });
  });

  it("galaxy section is hidden on mobile", () => {
    const { container } = renderHero();
    const galaxy = container.querySelector("[aria-hidden='true']");
    expect(galaxy).toHaveClass("hidden");
  });
});
