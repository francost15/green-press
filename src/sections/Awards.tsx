import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { awards } from "../data/awards";

export function Awards() {
  const { t } = useLang();
  const awardItems = awards.filter((a) => a.type === "award");
  const certItems = awards.filter((a) => a.type === "certification");

  return (
    <Section id="reconocimientos" title={t("Reconocimientos", "Recognition")}>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {certItems.map((cert) => (
          <span key={cert.title.es}>
            <span className="text-text-primary">{t(cert.title.es, cert.title.en)}</span>
            <span className="text-text-tertiary">
              {" "}
              — {cert.organization}, {cert.year}
            </span>
          </span>
        ))}
        {awardItems.map((award) => (
          <span key={award.title.es}>
            <span className="text-text-primary">{t(award.title.es, award.title.en)}</span>
            <span className="text-text-tertiary">
              {" "}
              — {award.organization}, {award.year}
            </span>
          </span>
        ))}
      </div>
    </Section>
  );
}
