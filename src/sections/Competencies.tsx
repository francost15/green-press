import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, CodeBlock, UsersThree } from "@phosphor-icons/react";
import { Section } from "../components/Section";
import { GlassCard } from "../components/GlassCard";
import { useLang } from "../i18n";

const competencies = [
  {
    icon: Brain,
    title: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: {
      es: "Diseño e implementación de soluciones de IA/ML, desde visión por computadora hasta sistemas multi-agente autónomos.",
      en: "Design and implementation of AI/ML solutions, from computer vision to autonomous multi-agent systems.",
    },
    techs: ["OpenAI", "Claude API", "YOLO", "LangChain", "TensorFlow"],
  },
  {
    icon: CodeBlock,
    title: { es: "Desarrollo Full-Stack", en: "Full-Stack Development" },
    description: {
      es: "Arquitectura y desarrollo de aplicaciones web y móviles escalables, desde el frontend hasta la infraestructura cloud.",
      en: "Architecture and development of scalable web and mobile applications, from frontend to cloud infrastructure.",
    },
    techs: ["React", "Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    icon: UsersThree,
    title: { es: "Liderazgo Técnico", en: "Technical Leadership" },
    description: {
      es: "Gestión de equipos de desarrollo, definición de roadmaps técnicos y mentoría de developers.",
      en: "Development team management, technical roadmap definition, and developer mentoring.",
    },
    techs: ["Scrum", "Architecture", "CI/CD", "Code Review", "Mentoring"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export function Competencies() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section
      id="competencias"
      title={t("Competencias", "Competencies")}
      subtitle={t(
        "Áreas de especialización donde genero mayor impacto",
        "Areas of specialization where I generate the most impact",
      )}
    >
      <div ref={ref} className="grid gap-6 md:grid-cols-3">
        {competencies.map((comp, i) => (
          <motion.div
            key={comp.title.es}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <GlassCard className="p-8 transition-transform duration-300 hover:-translate-y-1">
              <comp.icon className="mb-4 h-10 w-10 text-accent-purple" weight="duotone" />
              <h3 className="mb-3 text-xl font-semibold text-text-primary">
                {t(comp.title.es, comp.title.en)}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                {t(comp.description.es, comp.description.en)}
              </p>
              <div className="flex flex-wrap gap-2">
                {comp.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-accent-purple/[0.06] px-3 py-1 font-mono text-xs text-accent-purple"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
