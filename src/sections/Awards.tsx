import { Trophy, Certificate } from "@phosphor-icons/react";
import { Section } from "../components/Section";
import { GlassCard } from "../components/GlassCard";
import { useLang } from "../i18n";
import { awards } from "../data/awards";

export function Awards() {
  const { t } = useLang();
  const awardItems = awards.filter((a) => a.type === "award");
  const certItems = awards.filter((a) => a.type === "certification");

  return (
    <Section
      id="premios"
      title={t("Premios y Certificaciones", "Awards & Certifications")}
      subtitle={t(
        "Reconocimientos que validan mi trayectoria profesional",
        "Recognitions that validate my professional trajectory",
      )}
    >
      <div className="mb-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-text-primary">
          <Trophy className="text-accent-purple" size={22} weight="duotone" />
          {t("Premios", "Awards")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {awardItems.map((award) => (
            <GlassCard key={award.title.es} className="p-6">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold text-text-primary">
                  {t(award.title.es, award.title.en)}
                </h4>
                <span className="shrink-0 font-mono text-xs text-accent-blue">{award.year}</span>
              </div>
              <p className="mb-1 text-sm font-medium text-accent-purple">{award.organization}</p>
              {award.description && (
                <p className="text-sm text-text-secondary">
                  {t(award.description.es, award.description.en)}
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-text-primary">
          <Certificate className="text-accent-blue" size={22} weight="duotone" />
          {t("Certificaciones", "Certifications")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certItems.map((cert) => (
            <GlassCard key={cert.title.es} className="p-5 text-center">
              <p className="mb-1 font-semibold text-text-primary">
                {t(cert.title.es, cert.title.en)}
              </p>
              <p className="text-xs text-text-secondary">
                {cert.organization} · {cert.year}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
