import { useRef, useState } from "react";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { experience } from "../data/experience";

export function Experience() {
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
      id="experiencia"
      title={t("Experiencia", "Experience")}
      subtitle={t(
        "Liderazgo técnico y ejecución estratégica en entornos de alto crecimiento",
        "Technical leadership and strategic execution in high-growth environments",
      )}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative mx-auto max-w-4xl grid gap-[1px] overflow-hidden bg-border"
      >
        {/* The Glow Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-accent), transparent 80%)`,
          }}
        />

        {experience.map((item) => (
          <div
            key={item.company}
            className="relative z-10 bg-bg grid gap-6 py-12 px-8 md:grid-cols-[180px_1fr] md:gap-12 md:px-12 transition-colors hover:bg-bg/80"
          >
            <div className="font-mono text-xs font-bold tracking-widest text-text-tertiary uppercase pt-1">
              {item.period}
            </div>
            <div>
              <h3 className="mb-2 font-[family-name:var(--color-font-display)] text-2xl font-black tracking-tight text-text-primary md:text-3xl">
                {t(item.role.es, item.role.en)}
              </h3>
              <p className="mb-4 text-base font-semibold text-accent">{item.company}</p>
              <p className="mb-6 text-[16px] leading-relaxed text-text-secondary">
                {t(item.description.es, item.description.en)}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] font-medium tracking-wider text-text-tertiary uppercase">
                {item.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-border" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
