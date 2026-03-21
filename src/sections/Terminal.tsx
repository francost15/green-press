import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

const PROMPT = "franco@portfolio ~ % ";

export function Terminal() {
  const { t } = useLang();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-type welcome message
  useEffect(() => {
    const welcome = t(
      "Bienvenido al portfolio interactivo de Franco Sanchez.\nEscribe 'help' para ver los comandos disponibles.",
      "Welcome to Franco Sanchez's interactive portfolio.\nType 'help' to see available commands.",
    );
    const timer = setTimeout(() => {
      setLines([{ type: "output", content: welcome }]);
      setReady(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [t]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function processCommand(cmd: string): string {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "help":
        return [
          t("Comandos disponibles:", "Available commands:"),
          "",
          "  about      — " + t("Sobre mí", "About me"),
          "  skills     — " + t("Tecnologías", "Technologies"),
          "  projects   — " + t("Proyectos destacados", "Featured projects"),
          "  contact    — " + t("Información de contacto", "Contact info"),
          "  clear      — " + t("Limpiar terminal", "Clear terminal"),
        ].join("\n");

      case "about":
        return [
          "Franco Sanchez",
          "AI & Software Engineer | Puebla, MX",
          "",
          t(
            "Ingeniero de software especializado en IA y visión por computadora. Construyo productos con impacto medible — desde inspección industrial hasta plataformas multi-agente.",
            "Software engineer specialized in AI and computer vision. I build products with measurable impact — from industrial inspection to multi-agent platforms.",
          ),
        ].join("\n");

      case "skills":
        return [
          t("AI & Visión:", "AI & Vision:") +
            "    Python, YOLO, OpenCV, TensorFlow, LangChain, Claude API",
          t("Backend:", "Backend:") + "          FastAPI, NestJS, Node.js, PostgreSQL, Redis",
          t("Frontend:", "Frontend:") +
            "         React, Next.js, TypeScript, React Native, Tailwind",
          t("Infra:", "Infra:") + "            Docker, AWS, Linux, GitHub Actions, Vercel",
        ].join("\n");

      case "projects":
        return [
          "1. PCB Visual Inspector     — " +
            t("Inspección automatizada con IA", "AI-powered automated inspection"),
          "2. evArchitect AI           — " +
            t("Arquitectura enterprise con IA", "AI enterprise architecture"),
          "3. AgriVision ML            — " +
            t("Detección de enfermedades agrícolas", "Crop disease detection"),
          "4. Multi-Agent Support      — " +
            t("Sistema multi-agente de soporte", "Multi-agent support system"),
          "",
          t(
            "Visita la sección de proyectos para más detalles.",
            "Visit the projects section for more details.",
          ),
        ].join("\n");

      case "contact":
        return [
          "Email:    franco@example.com",
          "GitHub:   github.com/fsanchez",
          "LinkedIn: linkedin.com/in/fsanchez",
          t("Tel:", "Phone:") + "      +52 222 123 4567",
        ].join("\n");

      case "clear":
        return "__CLEAR__";

      case "":
        return "";

      default:
        return `${trimmed}: ${t("comando no encontrado. Escribe 'help' para ayuda.", "command not found. Type 'help' for help.")}`;
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const output = processCommand(input);

    if (output === "__CLEAR__") {
      setLines([]);
      setInput("");
      return;
    }

    const newLines: TerminalLine[] = [...lines, { type: "input", content: PROMPT + input }];

    if (output) {
      newLines.push({ type: "output", content: output });
    }

    setLines(newLines);
    setInput("");
  }

  return (
    <section id="terminal" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal window */}
          <div
            className="overflow-hidden rounded-xl border border-black/10 shadow-2xl"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 bg-[#1e1e2e] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-white/50">franco@portfolio ~ %</span>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="h-[360px] overflow-y-auto bg-[#1e1e2e] px-5 py-4 font-mono text-sm leading-relaxed"
            >
              {lines.map((line, i) => (
                <div key={i} className={line.type === "input" ? "text-green-400" : "text-gray-300"}>
                  {line.content.split("\n").map((text, j) => (
                    <div key={j} className={text === "" ? "h-4" : ""}>
                      {text}
                    </div>
                  ))}
                </div>
              ))}

              {/* Input line */}
              {ready && (
                <div className="flex items-center text-green-400">
                  <span className="shrink-0">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border-none bg-transparent text-green-400 caret-green-400 outline-none"
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-text-tertiary">
            {t("Escribe un comando y presiona Enter", "Type a command and press Enter")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
