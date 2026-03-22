import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { profile } from "../data/profile";

export function About() {
  const { t } = useLang();

  return (
    <Section
      id="sobre-mi"
      title={t("Sobre Mí", "About Me")}
      subtitle={t("Números que hablan por sí solos", "Numbers that speak for themselves")}
    >
      <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p
            className="text-xl leading-relaxed text-text-secondary md:text-2xl"
            dangerouslySetInnerHTML={{ __html: t(profile.bio.es, profile.bio.en) }}
          />
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 font-mono text-sm tracking-widest text-text-tertiary uppercase">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {profile.location}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {profile.email}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-12">
          {profile.stats.map((stat) => (
            <div key={stat.label.es} className="group">
              <div className="font-[family-name:var(--color-font-display)] text-6xl font-black tracking-tighter text-text-primary transition-transform duration-300 group-hover:-translate-y-1 md:text-7xl lg:text-8xl">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="mt-4 max-w-[140px] font-mono text-[11px] font-medium tracking-[0.2em] text-text-tertiary uppercase">
                {t(stat.label.es, stat.label.en)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
