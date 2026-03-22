import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vite-plus/test";
import { Navbar } from "../components/Navbar";
import { I18nProvider } from "../i18n";
import { ThemeProvider } from "../context/ThemeContext";

function renderNavbar() {
  return render(
    <I18nProvider>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders navigation landmark", () => {
    renderNavbar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    renderNavbar();
    expect(screen.getAllByText("Proyectos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Experiencia").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sobre Mí").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contacto").length).toBeGreaterThan(0);
  });

  it("renders language toggle button", () => {
    renderNavbar();
    expect(screen.getByLabelText("Toggle language")).toBeInTheDocument();
  });

  it("mobile menu button has correct aria attributes", () => {
    renderNavbar();
    const menuBtn = screen.getByLabelText("Abrir menú");
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    expect(menuBtn).toHaveAttribute("aria-controls", "mobile-menu");
  });

  it("opens mobile menu on click", () => {
    renderNavbar();
    const menuBtn = screen.getByLabelText("Abrir menú");
    fireEvent.click(menuBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Cerrar menú")).toHaveAttribute("aria-expanded", "true");
  });

  it("mobile menu has focus trap attributes", () => {
    renderNavbar();
    fireEvent.click(screen.getByLabelText("Abrir menú"));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("closes mobile menu on Escape", () => {
    renderNavbar();
    fireEvent.click(screen.getByLabelText("Abrir menú"));
    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
