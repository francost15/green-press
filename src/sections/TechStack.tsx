import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Database, Brain, Wrench } from "@phosphor-icons/react";
import { Section } from "../components/Section";
import { GlassCard } from "../components/GlassCard";
import { useLang } from "../i18n";
import { skillCategories } from "../data/skills";

const iconMap: Record<string, typeof Monitor> = {
  monitor: Monitor,
  server: Database,
  brain: Brain,
  wrench: Wrench,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.04 },
  }),
};

export function TechStack() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section
      id="tecnologia"
      title={t("Stack Tecnológico", "Tech Stack")}
      subtitle={t(
        "Herramientas organizadas por área — sin barras de progreso, solo experiencia real",
        "Tools organized by area — no progress bars, just real experience",
      )}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillCategories.map((category) => {
          const Icon = iconMap[category.icon] ?? Monitor;
          return (
            <motion.div key={category.name.es} variants={cardVariants}>
              <GlassCard className="p-6 transition-transform duration-300 hover:-translate-y-1">
                <Icon className="mb-3 h-8 w-8 text-accent-blue" weight="duotone" />
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  {t(category.name.es, category.name.en)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      custom={i}
                      variants={pillVariants}
                      className="rounded-md bg-accent-blue/[0.06] px-3 py-1 font-mono text-xs text-text-secondary"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
