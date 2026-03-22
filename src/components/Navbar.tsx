import { useState, useEffect, useRef, useCallback } from "react";
import { List, X, Translate } from "./Icons";
import { useLang } from "../i18n";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#proyectos", es: "Proyectos", en: "Projects" },
  { href: "#experiencia", es: "Experiencia", en: "Experience" },
  { href: "#contacto", es: "Contacto", en: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { lang, toggle } = useLang();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Focus trap for mobile menu
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      toggleBtnRef.current?.focus();
      return;
    }
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "translate-y-0 bg-bg/80 shadow-[0_1px_0_var(--color-border)] backdrop-blur-xl"
          : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <a
          href="#inicio"
          className={`font-[family-name:var(--color-font-display)] text-lg font-bold text-text-primary transition-all duration-300 ${
            scrolled ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          Franco Sanchez
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href ? "true" : undefined}
              className={`text-sm transition-colors hover:text-accent ${
                activeSection === link.href ? "text-accent" : "text-text-secondary"
              }`}
            >
              {lang === "es" ? link.es : link.en}
            </a>
          ))}

          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-full border border-border/50 bg-bg-secondary px-3 py-1.5 text-[11px] font-bold tracking-widest text-text-secondary transition-all hover:border-accent hover:text-text-primary uppercase"
            aria-label="Toggle language"
          >
            <Translate size={14} weight="bold" className="text-accent" />
            <span className="flex w-5 justify-center">{lang === "es" ? "EN" : "ES"}</span>
          </button>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center justify-center rounded-full border border-border/50 bg-bg-secondary px-2.5 py-1 text-[11px] font-bold tracking-widest text-text-secondary transition-all hover:border-accent hover:text-text-primary uppercase"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <ThemeToggle />
          <button
            ref={toggleBtnRef}
            type="button"
            className="text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={handleMenuKeyDown}
          className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-5 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg transition-colors hover:text-accent ${
                  activeSection === link.href ? "text-accent" : "text-text-secondary"
                }`}
              >
                {lang === "es" ? link.es : link.en}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
