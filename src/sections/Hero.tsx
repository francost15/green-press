import { ArrowRight, DownloadSimple, EnvelopeSimple, Phone } from "../components/Icons";
import { useLang } from "../i18n";
import { profile } from "../data/profile";
import { HeroAnimation } from "../components/HeroAnimation";

export function Hero() {
  const { t } = useLang();
  const heroContacts: {
    href: string;
    label: string;
    icon: React.ComponentType<{ size?: number; weight?: string; className?: string }>;
    external?: boolean;
  }[] = [
    {
      href: `mailto:${profile.email}`,
      label: profile.email,
      icon: EnvelopeSimple,
    },
    {
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
      label: profile.phone,
      icon: Phone,
    },
  ];

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-bg">
      {/* Background Animation - Fixed to screen for full immersion */}
      <div className="absolute inset-0 z-0">
        <HeroAnimation />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent pointer-events-none" />
      </div>

      <div
        className="hero-entrance relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-32 lg:grid-cols-[1.2fr_0.8fr]"
        style={{ opacity: 0 }}
      >
        {/* Left: content */}
        <div>
          <p className="mb-6 font-mono text-sm tracking-widest text-accent uppercase">
            {profile.title}
          </p>

          <h1 className="mb-8 font-[family-name:var(--color-font-display)] text-5xl font-black leading-[1.05] tracking-tighter text-text-primary whitespace-nowrap md:text-7xl lg:text-[80px]">
            {profile.name}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
            {heroContacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-bg-alt/50 px-4 py-2 backdrop-blur-sm transition-all hover:border-accent hover:bg-bg-alt hover:text-text-primary"
              >
                <contact.icon size={16} weight="bold" className="text-text-tertiary" />
                {contact.label}
              </a>
            ))}
          </div>

          <p className="mb-12 max-w-xl text-xl font-light leading-relaxed tracking-wide text-text-secondary">
            {t(profile.tagline.es, profile.tagline.en)}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#proyectos" className="btn-primary">
              {t("Ver Proyectos", "View Projects")}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="btn-secondary backdrop-blur-sm bg-bg-alt/50 hover:bg-bg-alt"
            >
              <DownloadSimple size={18} />
              {t("Descargar CV", "Download CV")}
            </a>
          </div>
        </div>

        {/* Right: Empty space to let the canvas animation show through on desktop */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
