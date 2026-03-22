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
          <p className="text-lg leading-relaxed text-text-secondary">
            {t(profile.bio.es, profile.bio.en)}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-tertiary">
            <span>{profile.location}</span>
            <span>{profile.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
          {profile.stats.map((stat) => (
            <div key={stat.label.es}>
              <div className="font-[family-name:var(--color-font-display)] text-5xl font-bold text-text-primary md:text-6xl">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                {t(stat.label.es, stat.label.en)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
