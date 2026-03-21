import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "@phosphor-icons/react";
import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { experience } from "../data/experience";

function TimelineItem({ item, index }: { item: (typeof experience)[number]; index: number }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-12 pb-12 last:pb-0">
      <div className="absolute top-0 left-[17px] h-full w-px bg-card-border" />

      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent-purple"
      >
        <Briefcase size={14} weight="fill" className="text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <span className="mb-1 inline-block font-mono text-xs text-accent-blue">{item.period}</span>
        <h3 className="text-lg font-semibold text-text-primary">{t(item.role.es, item.role.en)}</h3>
        <p className="mb-3 text-sm font-medium text-accent-purple">{item.company}</p>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
          {t(item.description.es, item.description.en)}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-accent-blue/[0.06] px-2 py-1 font-mono text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Experience() {
  const { t } = useLang();

  return (
    <Section
      id="experiencia"
      title={t("Experiencia", "Experience")}
      subtitle={t(
        "Mi trayectoria profesional en el mundo del software y la IA",
        "My professional journey in software and AI",
      )}
    >
      <div className="mx-auto max-w-3xl">
        {experience.map((item, index) => (
          <TimelineItem key={item.company} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
