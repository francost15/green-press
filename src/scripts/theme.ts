export const THEME_STORAGE_KEY = "theme-preference";

export type Theme = "light" | "dark";

/**
 * Wires up every [data-theme-toggle] button. The knob itself is styled from
 * html[data-theme] in CSS, so this only flips the attribute and the aria state.
 */
export function initThemeToggle(doc: Document = document) {
  const root = doc.documentElement;
  const buttons = Array.from(doc.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]"));

  const sync = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    for (const button of buttons) {
      button.setAttribute("aria-checked", String(isDark));
      button.setAttribute("aria-label", isDark ? "Light mode" : "Dark mode");
    }
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const next: Theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
      sync();
    });
  }

  // Follow the OS only while the reader has not made an explicit choice.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    root.setAttribute("data-theme", e.matches ? "dark" : "light");
    sync();
  });

  sync();
}
