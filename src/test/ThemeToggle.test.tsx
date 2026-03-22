import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vite-plus/test";
import { ThemeToggle } from "../components/ThemeToggle";
import { ThemeProvider } from "../context/ThemeContext";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders as a switch", () => {
    renderToggle();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("has concise aria-label", () => {
    renderToggle();
    const toggle = screen.getByRole("switch");
    const label = toggle.getAttribute("aria-label");
    expect(label).toMatch(/^(Light|Dark) mode$/);
  });

  it("toggles theme on click", () => {
    renderToggle();
    const toggle = screen.getByRole("switch");
    const initialChecked = toggle.getAttribute("aria-checked");
    fireEvent.click(toggle);
    const newChecked = toggle.getAttribute("aria-checked");
    expect(newChecked).not.toBe(initialChecked);
  });

  it("persists theme to localStorage", () => {
    renderToggle();
    fireEvent.click(screen.getByRole("switch"));
    expect(localStorage.getItem("theme-preference")).toBeTruthy();
  });
});
