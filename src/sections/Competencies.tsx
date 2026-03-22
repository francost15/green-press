import { useRef, useState } from "react";
import { Section } from "../components/Section";
import { useLang } from "../i18n";

const competencies = [
  {
    title: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: {
      es: "Desarrollo de sistemas de IA que resuelven problemas de negocio. Especializado en agentes autónomos, LLMs y visión por computadora listos para producción.",
      en: "Development of AI systems that solve business problems. Specialized in production-ready autonomous agents, LLMs, and computer vision.",
    },
    techs: ["LangGraph", "LangChain", "TensorFlow", "Pandas", "OpenCV"],
  },
  {
    title: { es: "Arquitectura Full-Stack", en: "Full-Stack Architecture" },
    description: {
      es: "Construcción de plataformas escalables de principio a fin. Diseño arquitecturas robustas en la nube que soportan alta concurrencia con latencia mínima.",
      en: "End-to-end construction of scalable platforms. I design robust cloud architectures that handle high concurrency with minimal latency.",
    },
    techs: ["React", "React Native", "Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    title: { es: "Liderazgo Técnico & PM", en: "Tech Leadership & PM" },
    description: {
      es: "Alineación entre tecnología y objetivos de negocio. Defino roadmaps de producto, optimizo flujos de trabajo ágiles y guío a los equipos hacia el cumplimiento de OKRs.",
      en: "Aligning technology with business goals. I define product roadmaps, optimize agile workflows, and guide teams toward achieving OKRs.",
    },
    techs: ["Scrum & Kanban", "Jira", "Product Strategy", "OKRs", "Mentoring"],
  },
];

export function Competencies() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Section
      id="competencias"
      title={t("Competencias", "Competencies")}
      subtitle={t("Lo que me contratarías para resolver", "What you'd hire me to solve")}
    >
      {/*
          Spotlight Grid Trick: 
          - The container has a background that acts as the "glow".
          - The grid items have their own background, and a gap of 1px creates the "border".
      */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative grid gap-[1px] overflow-hidden bg-border md:grid-cols-3"
      >
        {/* The Glow Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-accent), transparent 80%)`,
          }}
        />

        {competencies.map((comp) => (
          <div
            key={comp.title.es}
            className="relative z-10 bg-bg px-8 py-12 transition-colors hover:bg-bg/80 md:px-10"
          >
            <h3 className="mb-4 font-[family-name:var(--color-font-display)] text-xl font-bold tracking-tight text-text-primary">
              {t(comp.title.es, comp.title.en)}
            </h3>
            <p className="mb-8 text-[15px] leading-relaxed text-text-secondary">
              {t(comp.description.es, comp.description.en)}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {comp.techs.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center text-xs font-mono font-medium tracking-widest uppercase text-text-tertiary"
                  title={tech}
                >
                  <span className="mr-2 h-1 w-1 rounded-full bg-border" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
