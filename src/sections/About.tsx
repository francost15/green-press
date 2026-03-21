import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "../components/Section";
import { GlassCard } from "../components/GlassCard";
import { useLang } from "../i18n";
import { profile } from "../data/profile";

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="p-6 text-center" hover={false}>
        <div className="mb-1 bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-4xl font-bold text-transparent">
          {count}{suffix}
        </div>
        <div className="text-sm text-text-secondary">{label}</div>
      </GlassCard>
    </motion.div>
  );
}

export function About() {
  const { t } = useLang();

  return (
    <Section
      id="sobre-mi"
      title={t("Sobre Mí", "About Me")}
      subtitle={t(
        "Conoce un poco más sobre mi trayectoria y lo que me motiva",
        "Learn more about my journey and what drives me",
      )}
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-6 text-lg leading-relaxed text-text-secondary">
            {t(profile.bio.es, profile.bio.en)}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-card-border bg-bg-alt px-4 py-2 text-text-secondary shadow-sm">
              {profile.location}
            </span>
            <span className="rounded-full border border-card-border bg-bg-alt px-4 py-2 text-text-secondary shadow-sm">
              {profile.email}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {profile.stats.map((stat) => (
            <AnimatedCounter
              key={stat.label.es}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.label.es, stat.label.en)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
