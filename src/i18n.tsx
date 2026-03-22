import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

type Lang = "es" | "en";

interface I18nContextType {
  lang: Lang;
  toggle: () => void;
  t: (es: string, en: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "es",
  toggle: () => {},
  t: (es) => es,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    // Check local storage first
    const saved = localStorage.getItem("app-lang") as Lang;
    if (saved === "es" || saved === "en") return saved;
    // Then check browser language
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language || navigator.languages[0];
      return browserLang.toLowerCase().startsWith("es") ? "es" : "en";
    }
    return "es"; // Fallback default
  });

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("app-lang", next);
      return next;
    });
  }, []);

  const t = useCallback((es: string, en: string) => (lang === "es" ? es : en), [lang]);

  return <I18nContext.Provider value={{ lang, toggle, t }}>{children}</I18nContext.Provider>;
}

export function useLang() {
  return useContext(I18nContext);
}
