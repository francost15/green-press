import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowSquareOut, GithubLogo, Play, Lightning, Target, Crosshair, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Section } from "../components/Section";
import { GlassCard } from "../components/GlassCard";
import { useLang } from "../i18n";
import { projects } from "../data/projects";

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const { t } = useLang();

  return (
    <div className="w-[340px] shrink-0 snap-center sm:w-[420px]">
      <GlassCard className="h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        <div className="h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan" />

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-lg font-bold text-text-primary">{project.title}</h3>
            <div className="flex shrink-0 gap-2">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent-purple/[0.08] p-1.5 text-accent-purple transition-colors hover:bg-accent-purple/[0.15]" aria-label="Demo">
                  <Play size={16} weight="fill" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent-blue/[0.08] p-1.5 text-accent-blue transition-colors hover:bg-accent-blue/[0.15]" aria-label="GitHub">
                  <GithubLogo size={16} weight="duotone" />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent-cyan/[0.08] p-1.5 text-accent-cyan transition-colors hover:bg-accent-cyan/[0.15]" aria-label="Live">
                  <ArrowSquareOut size={16} weight="duotone" />
                </a>
              )}
            </div>
          </div>

          <div className="mb-5 space-y-3">
            <div className="flex gap-3">
              <Crosshair size={18} weight="duotone" className="mt-0.5 shrink-0 text-red-400" />
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="font-medium text-text-primary">{t("Problema", "Problem")}:</span>{" "}
                {t(project.problem.es, project.problem.en)}
              </p>
            </div>
            <div className="flex gap-3">
              <Lightning size={18} weight="duotone" className="mt-0.5 shrink-0 text-accent-purple" />
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="font-medium text-text-primary">{t("Solución", "Solution")}:</span>{" "}
                {t(project.solution.es, project.solution.en)}
              </p>
            </div>
            <div className="flex gap-3">
              <Target size={18} weight="duotone" className="mt-0.5 shrink-0 text-green-500" />
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="font-medium text-text-primary">{t("Impacto", "Impact")}:</span>{" "}
                {t(project.impact.es, project.impact.en)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-accent-blue/[0.06] px-2.5 py-1 font-mono text-xs text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export function Projects() {
  const { t } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -440 : 440;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <Section
      id="proyectos"
      title={t("Proyectos Destacados", "Featured Projects")}
      subtitle={t(
        "Soluciones reales con impacto medible — desliza para explorar",
        "Real solutions with measurable impact — swipe to explore",
      )}
    >
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Navigation arrows */}
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-card-border bg-bg-alt p-2 shadow-md transition-opacity disabled:opacity-0 md:block"
          aria-label="Previous"
        >
          <CaretLeft size={20} weight="bold" className="text-text-secondary" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-card-border bg-bg-alt p-2 shadow-md transition-opacity disabled:opacity-0 md:block"
          aria-label="Next"
        >
          <CaretRight size={20} weight="bold" className="text-text-secondary" />
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-4"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const el = scrollRef.current;
                if (el) el.scrollTo({ left: i * 460, behavior: "smooth" });
              }}
              className="h-2 w-2 rounded-full bg-text-tertiary transition-colors hover:bg-accent-purple"
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
