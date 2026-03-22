import { Sun, Moon } from "./Icons";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Light mode" : "Dark mode"}
      className="relative h-8 w-14 rounded-full border border-border bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span
        className="absolute top-0.5 left-px flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-all duration-200"
        style={{
          transform: `translateX(${isDark ? 24 : 0}px)`,
          backgroundColor: isDark ? "var(--color-accent)" : "var(--color-text-primary)",
        }}
      >
        <span className="flex items-center justify-center">
          {isDark ? (
            <Moon size={14} className="text-white" />
          ) : (
            <Sun size={14} className="text-white" />
          )}
        </span>
      </span>
    </button>
  );
}
