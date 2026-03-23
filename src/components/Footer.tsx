import { profile } from "../data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-border pt-12 md:flex-row md:gap-0">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-[family-name:var(--color-font-display)] text-lg font-black tracking-tighter text-text-primary">
              Franco Sanchez
            </span>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-text-secondary uppercase">
              AI & Software Engineering — {currentYear}
            </span>
          </div>

          <div className="flex items-center gap-12">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1"
              aria-label="LinkedIn"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-text-tertiary uppercase transition-colors group-hover:text-accent">
                LinkedIn
              </span>
              <div className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group flex flex-col items-center gap-1"
              aria-label="Email"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-text-tertiary uppercase transition-colors group-hover:text-accent">
                Email
              </span>
              <div className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        <div className="mt-12 text-center md:text-left">
          <p className="font-mono text-[11px] leading-relaxed text-text-tertiary uppercase">
            Built with React, TypeScript & Passion for Product.
            <br />
            Designed for high-impact AI implementation.
          </p>
        </div>
      </div>
    </footer>
  );
}
