import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-bg-alt py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <p className="font-mono text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Franco Sanchez. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/fsanchez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="GitHub"
          >
            <GithubLogo size={22} weight="duotone" />
          </a>
          <a
            href="https://linkedin.com/in/fsanchez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="LinkedIn"
          >
            <LinkedinLogo size={22} weight="duotone" />
          </a>
          <a
            href="mailto:franco@example.com"
            className="text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="Email"
          >
            <EnvelopeSimple size={22} weight="duotone" />
          </a>
        </div>
      </div>
    </footer>
  );
}
