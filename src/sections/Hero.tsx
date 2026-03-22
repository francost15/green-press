import { ArrowRight, DownloadSimple } from "../components/Icons";
import { useLang } from "../i18n";
import { profile } from "../data/profile";

/* Inline hero-only icons — 4 SVGs, ~1KB. Avoids loading the full 22KB tech icon bundle eagerly. */
const heroIcons = {
  python:
    "M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.914 0zM8.708 1.85a1.06 1.06 0 110 2.12 1.06 1.06 0 010-2.12z M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.123s3.9.445 3.9-5.735c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.453s-3.24-.052-3.24 3.148v5.292S5.72 24 12.086 24zm3.206-1.85a1.06 1.06 0 110-2.12 1.06 1.06 0 010 2.12z",
  nextjs:
    "M11.572 0c-.176.001-.347.004-.521.009C4.878.158.017 5.225.017 11.573c0 5.67 3.639 10.469 8.703 12.212l.19.055 8.19-11.39V14H15.5v-4h1.6v-.745c0-2.064.758-3.755 3.097-3.755H22V8h-1.803c-1.247 0-2.097.726-2.097 2.126V10H22v4h-3.9l-8.483 11.79a12.167 12.167 0 002.053.186c6.528 0 11.826-5.373 11.826-11.986C23.498 5.303 18.123 0 11.572 0z",
  openai:
    "M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.726 0a6.04 6.04 0 00-5.765 4.18 5.985 5.985 0 00-3.998 2.9 6.05 6.05 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.04 6.04 0 006.51 2.9A6.04 6.04 0 0013.274 24a6.04 6.04 0 005.765-4.18 5.985 5.985 0 003.998-2.9 6.05 6.05 0 00-.755-7.099zm-9.022 12.6a4.52 4.52 0 01-2.907-1.053l.144-.082 4.832-2.79a.786.786 0 00.395-.682v-6.81l2.043 1.18a.071.071 0 01.038.052v5.64a4.545 4.545 0 01-4.544 4.544zM3.57 18.34a4.505 4.505 0 01-.54-3.032l.144.084 4.83 2.79a.779.779 0 00.788 0l5.9-3.407v2.358a.072.072 0 01-.029.062l-4.887 2.822a4.545 4.545 0 01-6.206-1.676zm-1.49-10.515a4.51 4.51 0 012.367-1.986v5.74a.775.775 0 00.392.68l5.9 3.405-2.044 1.18a.072.072 0 01-.067.006l-4.888-2.824a4.545 4.545 0 01-1.66-6.2zM19.504 12.2l-5.9-3.407 2.044-1.18a.072.072 0 01.067-.007l4.888 2.824a4.545 4.545 0 01-.7 8.197v-5.747a.78.78 0 00-.399-.68zm2.034-3.048l-.143-.082-4.832-2.79a.78.78 0 00-.788 0l-5.9 3.407V7.33a.072.072 0 01.029-.062l4.887-2.824a4.545 4.545 0 016.747 4.707zM7.665 13.56l-2.043-1.18a.071.071 0 01-.038-.052V6.69a4.545 4.545 0 017.452-3.493l-.144.082-4.832 2.79a.786.786 0 00-.395.683zm1.11-2.392l2.627-1.517 2.627 1.517v3.034l-2.627 1.517-2.627-1.517z",
  tensorflow:
    "M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-3.079 1.791-3.074-1.79zm21.416 0L12.46 0v24l4.095-2.378V14.87l3.079 1.791 3.074-1.79v-3.58l-3.074-1.79-3.079 1.79v-3.58l3.079-1.79 3.074 1.79z",
};

function HeroIcon({ d, label }: { d: string; label: string }) {
  return (
    <div className="np-icon-wrap" aria-label={label}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d={d} />
      </svg>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="inicio" className="flex min-h-screen items-center bg-bg overflow-hidden">
      <div
        className="hero-entrance mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-32 lg:grid-cols-[1fr_1fr]"
        style={{ opacity: 0 }}
      >
        {/* Left: content */}
        <div>
          <p className="mb-6 font-mono text-sm tracking-widest text-accent uppercase">
            {profile.title}
          </p>

          <h1 className="mb-8 font-[family-name:var(--color-font-display)] text-5xl font-bold leading-[1.05] tracking-tight text-text-primary whitespace-nowrap md:text-7xl lg:text-[80px]">
            {profile.name}
          </h1>

          <p className="mb-12 max-w-xl text-xl font-light leading-relaxed tracking-wide text-text-secondary">
            {t(profile.tagline.es, profile.tagline.en)}
          </p>

          <div className="flex items-center gap-8">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(109,40,217,0.4)]"
            >
              {t("Ver Proyectos", "View Projects")}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-base text-text-secondary transition-all hover:border-accent hover:text-text-primary"
            >
              <DownloadSimple size={18} />
              {t("Descargar CV", "Download CV")}
            </a>
          </div>
        </div>

        {/* Right: Neural Processor Visualization */}
        <div
          className="neural-processor relative hidden aspect-square items-center justify-center lg:flex"
          aria-hidden="true"
        >
          {/* Background grid */}
          <div className="np-grid" />

          {/* Circuit traces — horizontal */}
          <div className="np-trace np-trace-h np-trace-h1">
            <div className="np-signal np-signal-h" />
          </div>
          <div className="np-trace np-trace-h np-trace-h2">
            <div className="np-signal np-signal-h np-signal-delay-1" />
          </div>
          <div className="np-trace np-trace-h np-trace-h3">
            <div className="np-signal np-signal-h np-signal-delay-2" />
          </div>
          <div className="np-trace np-trace-h np-trace-h4">
            <div className="np-signal np-signal-h np-signal-delay-3" />
          </div>

          {/* Circuit traces — vertical */}
          <div className="np-trace np-trace-v np-trace-v1">
            <div className="np-signal np-signal-v np-signal-delay-2" />
          </div>
          <div className="np-trace np-trace-v np-trace-v2">
            <div className="np-signal np-signal-v np-signal-delay-1" />
          </div>
          <div className="np-trace np-trace-v np-trace-v3">
            <div className="np-signal np-signal-v np-signal-delay-3" />
          </div>
          <div className="np-trace np-trace-v np-trace-v4">
            <div className="np-signal np-signal-v" />
          </div>

          {/* Diagonal traces */}
          <div className="np-trace np-trace-d np-trace-d1">
            <div className="np-signal np-signal-d np-signal-delay-2" />
          </div>
          <div className="np-trace np-trace-d np-trace-d2">
            <div className="np-signal np-signal-d np-signal-delay-1" />
          </div>

          {/* Cardinal tech icons — replace the 4 large nodes */}
          <div className="np-cardinal np-cardinal-right">
            <HeroIcon d={heroIcons.python} label="Python" />
          </div>
          <div className="np-cardinal np-cardinal-left">
            <HeroIcon d={heroIcons.nextjs} label="Next.js" />
          </div>
          <div className="np-cardinal np-cardinal-top">
            <HeroIcon d={heroIcons.openai} label="OpenAI" />
          </div>
          <div className="np-cardinal np-cardinal-bottom">
            <HeroIcon d={heroIcons.tensorflow} label="TensorFlow" />
          </div>

          {/* Neural nodes — mid ring */}
          <div className="np-node np-node-md np-node-5" />
          <div className="np-node np-node-md np-node-6" />
          <div className="np-node np-node-md np-node-7" />
          <div className="np-node np-node-md np-node-8" />
          <div className="np-node np-node-md np-node-9" />
          <div className="np-node np-node-md np-node-10" />
          <div className="np-node np-node-md np-node-11" />
          <div className="np-node np-node-md np-node-12" />

          {/* Neural nodes — small accent */}
          <div className="np-node np-node-sm np-node-13" />
          <div className="np-node np-node-sm np-node-14" />
          <div className="np-node np-node-sm np-node-15" />
          <div className="np-node np-node-sm np-node-16" />
          <div className="np-node np-node-sm np-node-17" />
          <div className="np-node np-node-sm np-node-18" />

          {/* Central processor chip */}
          <div className="np-chip">
            <div className="np-chip-inner" />
            <div className="np-chip-pins np-chip-pins-top" />
            <div className="np-chip-pins np-chip-pins-right" />
            <div className="np-chip-pins np-chip-pins-bottom" />
            <div className="np-chip-pins np-chip-pins-left" />
          </div>
          <div className="np-chip-glow" />

          {/* Concentric rings */}
          <div className="np-ring np-ring-1" />
          <div className="np-ring np-ring-2" />
          <div className="np-ring np-ring-3" />
        </div>
      </div>
    </section>
  );
}
