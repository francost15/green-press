import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { experience } from "../data/experience";

export function Experience() {
  const { t } = useLang();

  return (
    <Section
      id="experiencia"
      title={t("Experiencia", "Experience")}
      subtitle={t(
        "De investigador a cofundador — cada rol me acercó más al producto",
        "From researcher to co-founder — each role brought me closer to the product",
      )}
    >
      <div className="mx-auto max-w-3xl">
        {experience.map((item, index) => (
          <div
            key={item.company}
            className={`relative grid gap-4 py-10 md:grid-cols-[140px_1fr] md:gap-10 ${
              index < experience.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="font-mono text-sm text-text-tertiary">{item.period}</div>
            <div>
              <h3 className="mb-1 font-[family-name:var(--color-font-display)] text-lg font-semibold text-text-primary">
                {t(item.role.es, item.role.en)}
              </h3>
              <p className="mb-3 text-sm font-medium text-accent">{item.company}</p>
              <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
                {t(item.description.es, item.description.en)}
              </p>
              <p className="font-mono text-xs text-text-tertiary">{item.tags.join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
