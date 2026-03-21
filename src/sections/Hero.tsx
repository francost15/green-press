import { motion } from "framer-motion";
import { CaretDown, DownloadSimple } from "@phosphor-icons/react";
import { useLang } from "../i18n";
import { profile } from "../data/profile";

const floatingShapes = [
  { size: 300, x: "10%", y: "20%", color: "var(--color-accent-blue)", delay: 0 },
  { size: 200, x: "70%", y: "15%", color: "var(--color-accent-purple)", delay: 2 },
  { size: 250, x: "80%", y: "60%", color: "var(--color-accent-cyan)", delay: 4 },
  { size: 180, x: "20%", y: "70%", color: "var(--color-accent-purple)", delay: 1 },
];

const geometricShapes = [
  { type: "triangle", x: "15%", y: "25%", size: 40, rotation: 15, delay: 0, color: "var(--color-accent-blue)" },
  { type: "square", x: "85%", y: "20%", size: 30, rotation: 45, delay: 1.5, color: "var(--color-accent-purple)" },
  { type: "circle", x: "75%", y: "75%", size: 25, rotation: 0, delay: 3, color: "var(--color-accent-cyan)" },
  { type: "triangle", x: "90%", y: "45%", size: 35, rotation: -30, delay: 0.5, color: "var(--color-accent-purple)" },
  { type: "square", x: "8%", y: "60%", size: 28, rotation: 20, delay: 2.5, color: "var(--color-accent-blue)" },
  { type: "circle", x: "50%", y: "85%", size: 20, rotation: 0, delay: 1, color: "var(--color-accent-purple)" },
  { type: "hexagon", x: "30%", y: "10%", size: 32, rotation: 0, delay: 2, color: "var(--color-accent-cyan)" },
  { type: "hexagon", x: "65%", y: "90%", size: 28, rotation: 30, delay: 3.5, color: "var(--color-accent-blue)" },
];

function GeometricShape({ type, size, color }: { type: string; size: number; color: string }) {
  const stroke = color;
  const sw = 1.5;

  switch (type) {
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <polygon points="20,4 36,36 4,36" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <rect x="4" y="4" width="32" height="32" rx="2" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
  }
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg">
      {/* Soft blobs */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={`blob-${i}`}
          className="pointer-events-none absolute rounded-full opacity-[0.07] blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric wireframe shapes */}
      {geometricShapes.map((shape, i) => (
        <motion.div
          key={`geo-${i}`}
          className="pointer-events-none absolute opacity-[0.12]"
          style={{ left: shape.x, top: shape.y, rotate: shape.rotation }}
          animate={{
            y: [0, -15, 5, 0],
            rotate: [shape.rotation, shape.rotation + 20, shape.rotation - 10, shape.rotation],
            opacity: [0.12, 0.18, 0.08, 0.12],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          <GeometricShape type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

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
