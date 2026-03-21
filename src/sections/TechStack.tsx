import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { skills } from "../data/skills";

const skillIconColors: Record<string, string> = {
  Python: "#3776AB",
  TensorFlow: "#FF6F00",
  LangChain: "#1C3C3C",
  FastAPI: "#009688",
  NestJS: "#E0234E",
  "Node.js": "#339933",
  Laravel: "#FF2D20",
  React: "#61DAFB",
  "Next.js": "#ffffff",
  TypeScript: "#3178C6",
  "React Native": "#ffffff",
  "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#FF0054",
};

export function TechStack() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section
      id="tecnologia"
      title={t("Stack Tecnológico", "Tech Stack")}
      subtitle={t("Lenguajes y frameworks que domino", "Languages and frameworks I master")}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto pb-4 scrollbar-hide"
      >
        <div className="flex gap-3">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex shrink-0 flex-col items-center gap-2 rounded-xl border border-card-border bg-bg-secondary/50 px-5 py-3 backdrop-blur-sm transition-all duration-200 hover:border-accent-blue/30 hover:bg-bg-secondary/80 hover:shadow-lg hover:shadow-accent-blue/5"
            >
              <skill.icon className="h-7 w-7" color={skillIconColors[skill.name] ?? "#888"} />
              <span className="whitespace-nowrap text-xs font-medium text-text-secondary">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
