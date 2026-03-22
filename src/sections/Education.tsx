import { useRef, useState } from "react";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { education } from "../data/education";

export function Education() {
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
    <Section id="educacion" title={t("Educación", "Education")}>
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

        {education.map((edu) => (
          <div
            key={edu.degree.es}
            className="relative z-10 bg-bg grid gap-6 py-12 px-8 md:grid-cols-[180px_1fr] md:gap-12 md:px-12 transition-colors hover:bg-bg/80"
          >
            <div className="font-mono text-xs font-bold tracking-widest text-text-tertiary uppercase pt-1">
              {edu.period.end ? `${edu.period.start} — ${edu.period.end}` : edu.period.start}
            </div>
            <div>
              <h3 className="mb-2 font-[family-name:var(--color-font-display)] text-2xl font-black tracking-tight text-text-primary md:text-3xl">
                {t(edu.degree.es, edu.degree.en)}
                {edu.status === "in-progress" && (
                  <span className="ml-3 font-mono text-[10px] font-bold tracking-widest text-accent uppercase">
                    [{t("en curso", "in progress")}]
                  </span>
                )}
              </h3>
              <p className="mb-4 text-base font-semibold text-accent">
                {edu.institution}
                {edu.location && ` — ${edu.location}`}
              </p>
              {edu.description && (
                <p className="mb-6 text-[16px] leading-relaxed text-text-secondary">
                  {t(edu.description.es, edu.description.en)}
                </p>
              )}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
                  {edu.highlights.map((high) => (
                    <span key={high} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-border" />
                      {high}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
