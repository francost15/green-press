import { ArrowSquareOut, GithubLogo } from "../components/Icons";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { projects } from "../data/projects";
import { techIcons } from "../data/techIcons";

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { t } = useLang();

  return (
    <div
      className={`grid gap-8 border-b border-border py-12 md:grid-cols-[1fr_1.5fr] md:gap-16 ${index === 0 ? "border-t" : ""}`}
    >
      {/* Left: title + meta */}
      <div>
        <span className="mb-3 block font-mono text-xs text-text-tertiary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mb-4 font-[family-name:var(--color-font-display)] text-2xl font-semibold text-text-primary md:text-3xl">
          {project.title}
        </h3>
        <div className="mb-6 flex flex-wrap gap-3">
          {project.tags.map((tag) => {
            const Icon = techIcons[tag];
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs text-text-tertiary"
                title={tag}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {tag}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
              aria-label={`${project.title} GitHub`}
            >
              <GithubLogo size={16} weight="bold" />
              GitHub
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
              aria-label={`${project.title} Live`}
            >
              <ArrowSquareOut size={16} weight="bold" />
              Live
            </a>
          )}
        </div>
      </div>

      {/* Right: problem/solution/impact */}
      <div className="space-y-6">
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-accent uppercase">
            {t("Problema", "Problem")}
          </p>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            {t(project.problem.es, project.problem.en)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-accent uppercase">
            {t("Solución", "Solution")}
          </p>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            {t(project.solution.es, project.solution.en)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-accent uppercase">
            {t("Impacto", "Impact")}
          </p>
          <p className="text-[15px] leading-relaxed text-text-primary font-medium">
            {t(project.impact.es, project.impact.en)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useLang();

  return (
    <Section
      id="proyectos"
      title={t("Proyectos", "Projects")}
      subtitle={t("Soluciones reales con impacto medible", "Real solutions with measurable impact")}
    >
      <div>
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
