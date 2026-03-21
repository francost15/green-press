import { Sun, Moon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, theme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode. Current: ${theme}`}
      className="relative h-9 w-16 rounded-full border border-card-border bg-bg-secondary hover:border-accent-blue/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <motion.span
        className="absolute top-1 flex h-7 w-7 items-center justify-center rounded-full shadow-lg"
        initial={false}
        animate={{
          left: isDark ? 33 : 4,
          backgroundColor: isDark ? "var(--color-accent-purple)" : "var(--color-accent-blue)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={false}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1] }}
          transition={{ duration: 0.2 }}
          className="absolute flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={16} weight="fill" className="text-white" />
          ) : (
            <Sun size={16} weight="fill" className="text-white" />
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}
