import { useState, useEffect } from "react";
import { List, X, DownloadSimple, Translate } from "@phosphor-icons/react";
import { useLang } from "../i18n";

const navLinks = [
  { href: "#inicio", es: "Inicio", en: "Home" },
  { href: "#proyectos", es: "Proyectos", en: "Projects" },
  { href: "#tecnologia", es: "Tecnología", en: "Tech Stack" },
  { href: "#experiencia", es: "Experiencia", en: "Experience" },
  { href: "#contacto", es: "Contacto", en: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-alt/80 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#inicio"
          className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text font-mono text-xl font-bold text-transparent"
        >
          FS
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {lang === "es" ? link.es : link.en}
            </a>
          ))}

          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Toggle language"
          >
            <Translate size={16} weight="duotone" />
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a
            href="/cv-franco-sanchez.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <DownloadSimple size={16} weight="bold" />
            {t("Descargar CV", "Download CV")}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-card-border px-2 py-1.5 text-xs font-medium text-text-secondary"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            type="button"
            className="text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-card-border bg-bg-alt/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                {lang === "es" ? link.es : link.en}
              </a>
            ))}
            <a
              href="/cv-franco-sanchez.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white"
            >
              <DownloadSimple size={16} weight="bold" />
              {t("Descargar CV", "Download CV")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
