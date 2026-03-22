import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { techIcons } from "../data/techIcons";

const competencies = [
  {
    title: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: {
      es: "Diseño e implementación de soluciones de IA/ML, desde visión por computadora hasta sistemas multi-agente autónomos.",
      en: "Design and implementation of AI/ML solutions, from computer vision to autonomous multi-agent systems.",
    },
    techs: ["OpenAI", "Claude API", "YOLO", "LangChain", "TensorFlow"],
  },
  {
    title: { es: "Desarrollo Full-Stack", en: "Full-Stack Development" },
    description: {
      es: "Arquitectura y desarrollo de aplicaciones web y móviles escalables, desde el frontend hasta la infraestructura cloud.",
      en: "Architecture and development of scalable web and mobile applications, from frontend to cloud infrastructure.",
    },
    techs: ["React", "Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    title: { es: "Liderazgo Técnico", en: "Technical Leadership" },
    description: {
      es: "Gestión de equipos de desarrollo, definición de roadmaps técnicos y mentoría de developers.",
      en: "Development team management, technical roadmap definition, and developer mentoring.",
    },
    techs: ["Docker", "AWS", "GitHub Actions", "Vercel", "Linux"],
  },
];

export function Competencies() {
  const { t } = useLang();

  return (
    <Section
      id="competencias"
      title={t("Competencias", "Competencies")}
      subtitle={t("Lo que me contratarías para resolver", "What you'd hire me to solve")}
    >
      <div className="grid gap-0 border-t border-border md:grid-cols-3">
        {competencies.map((comp, i) => (
          <div
            key={comp.title.es}
            className={`border-b border-border py-10 ${
              i < competencies.length - 1 ? "md:border-r md:pr-10" : ""
            } ${i > 0 ? "md:pl-10" : ""}`}
          >
            <h3 className="mb-4 font-[family-name:var(--color-font-display)] text-xl font-semibold text-text-primary">
              {t(comp.title.es, comp.title.en)}
            </h3>
            <p className="mb-6 text-[15px] leading-relaxed text-text-secondary">
              {t(comp.description.es, comp.description.en)}
            </p>
            <div className="flex flex-wrap gap-3">
              {comp.techs.map((tech) => {
                const Icon = techIcons[tech];
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 text-xs text-text-tertiary"
                    title={tech}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
