import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowSquareOut, CaretLeft, CaretRight, Eye, GithubLogo, X } from "../components/Icons";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { projects, type Project } from "../data/projects";
import { TechIcon } from "../data/techIcons";

/* ── Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const images = project.images ?? [];

  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-bg shadow-2xl ring-1 ring-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="font-[family-name:var(--color-font-display)] text-xl font-black tracking-tight text-text-primary md:text-2xl">
              {project.title}
            </h3>
            <div className="mt-1 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-tertiary"
                >
                  <TechIcon name={tag} variant="mono" className="h-3.5 w-3.5 opacity-60" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Image carousel */}
          {images.length > 0 && (
            <div className="relative bg-black/5 dark:bg-white/5">
              <img
                src={images[current]}
                alt={`${project.title} screenshot ${current + 1}`}
                className="mx-auto max-h-[50vh] w-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-bg/80 p-2 text-text-secondary shadow-lg backdrop-blur-sm transition-colors hover:bg-bg hover:text-text-primary"
                    aria-label="Previous image"
                  >
                    <CaretLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-bg/80 p-2 text-text-secondary shadow-lg backdrop-blur-sm transition-colors hover:bg-bg hover:text-text-primary"
                    aria-label="Next image"
                  >
                    <CaretRight size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === current ? "w-6 bg-accent" : "w-1.5 bg-text-tertiary/40"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Description */}
          <div className="grid gap-6 p-6 md:grid-cols-3">
            <div>
              <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
                {t("Problema", "The Problem")}
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(project.problem.es, project.problem.en)}
              </p>
            </div>
            <div>
              <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
                {t("Solucion", "The Solution")}
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(project.solution.es, project.solution.en)}
              </p>
            </div>
            <div className="rounded-xl bg-bg-secondary p-4">
              <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
                {t("Impacto Medible", "Measurable Impact")}
              </p>
              <p className="text-base font-bold leading-tight text-text-primary">
                {t(project.impact.es, project.impact.en)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        {(project.github || project.link) && (
          <div className="flex items-center gap-4 border-t border-border px-6 py-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                <GithubLogo size={18} weight="bold" />
                GitHub
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowSquareOut size={18} weight="bold" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useScrollReveal } from "../hooks/useScrollReveal";

/* ── Project Row ── */
function ProjectRow({
  project,
  index,
  onPreview,
}: {
  project: Project;
  index: number;
  onPreview: () => void;
}) {
  const { t } = useLang();
  const revealRef = useScrollReveal({ threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={revealRef as React.RefObject<HTMLDivElement>}
      className="reveal-hidden relative z-10 grid gap-8 bg-bg py-16 md:grid-cols-[1fr_1.5fr] md:gap-16"
    >
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
          {project.images && project.images.length > 0 && (
            <button
              onClick={onPreview}
              className="group inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-2 text-sm font-semibold text-accent ring-1 ring-accent/40 transition-all hover:bg-accent hover:text-white hover:ring-accent hover:shadow-lg hover:shadow-accent/25"
            >
              <Eye size={18} />
              <span>{t("Ver Preview", "View Preview")}</span>
            </button>
          )}
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
            {t("Solucion", "The Solution")}
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

/* ── Section ── */
export function Projects() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <Section
        id="proyectos"
        title={t("Proyectos", "Projects")}
        subtitle={t(
          "Soluciones reales con impacto medible",
          "Real solutions with measurable impact",
        )}
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
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onPreview={() => setPreviewProject(project)}
            />
          ))}
        </div>
      </Section>

      {previewProject && (
        <ProjectModal project={previewProject} onClose={() => setPreviewProject(null)} />
      )}
    </>
  );
}
