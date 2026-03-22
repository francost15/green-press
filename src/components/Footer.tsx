import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm text-text-tertiary">
          &copy; {new Date().getFullYear()} Franco Sanchez
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/fsanchez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary transition-opacity hover:opacity-60"
            aria-label="GitHub"
          >
            <GithubLogo size={18} weight="bold" />
          </a>
          <a
            href="https://linkedin.com/in/fsanchez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary transition-opacity hover:opacity-60"
            aria-label="LinkedIn"
          >
            <LinkedinLogo size={18} weight="bold" />
          </a>
          <a
            href="mailto:franco@example.com"
            className="text-text-tertiary transition-opacity hover:opacity-60"
            aria-label="Email"
          >
            <EnvelopeSimple size={18} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
