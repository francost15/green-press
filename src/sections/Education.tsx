import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { education } from "../data/education";

export function Education() {
  const { t } = useLang();

  return (
    <Section id="educacion" title={t("Educación", "Education")}>
      <div className="mx-auto max-w-3xl">
        {education.map((edu, index) => (
          <div
            key={edu.degree.es}
            className={`relative grid gap-4 py-10 md:grid-cols-[140px_1fr] md:gap-10 ${
              index < education.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="font-mono text-sm text-text-tertiary">
              {edu.period.end ? `${edu.period.start} — ${edu.period.end}` : edu.period.start}
            </div>
            <div>
              <h3 className="mb-1 font-[family-name:var(--color-font-display)] text-lg font-semibold text-text-primary">
                {t(edu.degree.es, edu.degree.en)}
                {edu.status === "in-progress" && (
                  <span className="ml-2 text-xs text-accent">({t("en curso", "in progress")})</span>
                )}
              </h3>
              <p className="mb-3 text-sm font-medium text-accent">
                {edu.institution}
                {edu.location && ` — ${edu.location}`}
              </p>
              {edu.description && (
                <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
                  {t(edu.description.es, edu.description.en)}
                </p>
              )}
              {edu.highlights && edu.highlights.length > 0 && (
                <p className="font-mono text-xs text-text-tertiary">{edu.highlights.join(" · ")}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
