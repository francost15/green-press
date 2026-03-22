import { useRef, useState } from "react";
import { ArrowSquareOut, GithubLogo } from "../components/Icons";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { projects } from "../data/projects";
import { TechIcon } from "../data/techIcons";

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { t } = useLang();

  return (
    <div className="relative z-10 grid gap-8 bg-bg py-16 md:grid-cols-[1fr_1.5fr] md:gap-16">
      {/* Left: title + meta */}
      <div>
        <span className="mb-3 block font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
          Project {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mb-6 font-[family-name:var(--color-font-display)] text-3xl font-black tracking-tighter text-text-primary md:text-4xl lg:text-5xl">
          {project.title}
        </h3>
        <div className="mb-8 flex flex-wrap gap-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 text-xs font-medium text-text-tertiary"
              title={tag}
            >
              <TechIcon name={tag} variant="mono" className="h-4 w-4 opacity-70" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
            >
              <GithubLogo size={20} weight="bold" />
              <span>GitHub</span>
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowSquareOut size={20} weight="bold" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Right: problem/solution/impact */}
      <div className="space-y-8">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
            {t("Problema", "The Problem")}
          </p>
          <p className="text-lg leading-relaxed text-text-secondary">
            {t(project.problem.es, project.problem.en)}
          </p>
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
            {t("Solución", "The Solution")}
          </p>
          <p className="text-lg leading-relaxed text-text-secondary">
            {t(project.solution.es, project.solution.en)}
          </p>
        </div>
        <div className="rounded-2xl bg-bg-secondary p-6 transition-colors hover:bg-accent/5">
          <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
            {t("Impacto Medible", "Measurable Impact")}
          </p>
          <p className="text-xl font-bold leading-tight text-text-primary md:text-2xl">
            {t(project.impact.es, project.impact.en)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
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
      id="proyectos"
      title={t("Proyectos", "Projects")}
      subtitle={t("Soluciones reales con impacto medible", "Real solutions with measurable impact")}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative grid gap-[1px] overflow-hidden bg-border"
      >
        {/* The Glow Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-accent), transparent 80%)`,
          }}
        />

        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
