import { motion } from "framer-motion";
import { CaretDown, DownloadSimple } from "@phosphor-icons/react";
import { useLang } from "../i18n";
import { profile } from "../data/profile";

const orbs = [
  { size: 400, x: "5%", y: "10%", color: "--color-accent-blue", delay: 0, duration: 20 },
  { size: 350, x: "60%", y: "5%", color: "--color-accent-purple", delay: 3, duration: 25 },
  { size: 300, x: "75%", y: "50%", color: "--color-accent-cyan", delay: 6, duration: 22 },
  { size: 280, x: "10%", y: "55%", color: "--color-accent-purple", delay: 4, duration: 18 },
  { size: 250, x: "40%", y: "70%", color: "--color-accent-blue", delay: 8, duration: 24 },
];

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 5,
}));

const lines = [
  { x1: "10%", y1: "20%", x2: "30%", y2: "40%", delay: 0 },
  { x1: "70%", y1: "15%", x2: "85%", y2: "35%", delay: 1 },
  { x1: "60%", y1: "60%", x2: "80%", y2: "75%", delay: 2 },
  { x1: "20%", y1: "70%", x2: "40%", y2: "85%", delay: 3 },
  { x1: "45%", y1: "10%", x2: "55%", y2: "30%", delay: 4 },
  { x1: "15%", y1: "45%", x2: "35%", y2: "55%", delay: 5 },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg"
    >
      {/* Animated gradient mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {orbs.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-[120px]"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `var(${orb.color})`,
              opacity: 0.08,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [0.08, 0.12, 0.06, 0.08],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Particle field */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-accent-blue"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Connecting lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]">
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--color-accent-purple)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: line.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Subtle animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating geometric accents */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[15%] opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <polygon points="30,5 55,50 5,50" stroke="var(--color-accent-blue)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[12%] top-[20%] opacity-10"
        animate={{
          y: [0, 15, 0],
          rotate: [45, 55, 45],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect
            x="5"
            y="5"
            width="40"
            height="40"
            stroke="var(--color-accent-purple)"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[25%] right-[20%] opacity-10"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="15" stroke="var(--color-accent-cyan)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-[20%] bottom-[15%] opacity-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
          <polygon
            points="22.5,3 42,15 42,32 22.5,44 3,32 3,15"
            stroke="var(--color-accent-blue)"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 font-mono text-sm tracking-widest text-accent-purple uppercase"
        >
          {profile.title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-6 text-5xl font-bold tracking-tight text-text-primary md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mb-10 max-w-xl text-lg text-text-secondary"
        >
          {t(profile.tagline.es, profile.tagline.en)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#proyectos"
            className="rounded-lg bg-accent-purple px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("Ver Proyectos", "View Projects")}
          </a>
          <a
            href={profile.cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-bg-alt px-8 py-3 font-medium text-text-primary shadow-sm transition-colors hover:bg-bg"
          >
            <DownloadSimple size={18} weight="bold" />
            {t("Descargar CV", "Download CV")}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CaretDown className="text-text-tertiary" size={24} weight="bold" />
      </motion.div>
    </section>
  );
}
