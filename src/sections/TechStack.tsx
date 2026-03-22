import { Section } from "../components/Section";
import { useLang } from "../i18n";
import { techIcons } from "../data/techIcons";

const techList = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "TensorFlow",
  "LangChain",
  "OpenAI",
  "OpenCV",
  "Redis",
  "Linux",
];

export function TechStack() {
  const { t } = useLang();

  return (
    <Section
      id="tecnologia"
      title={t("Stack Tecnológico", "Tech Stack")}
      subtitle={t("Herramientas con las que construyo", "Tools I build with")}
    >
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {techList.map((name) => {
          const Icon = techIcons[name];
          return (
            <div
              key={name}
              className="flex flex-col items-center gap-2 py-2 transition-opacity hover:opacity-70"
            >
              {Icon && <Icon className="h-7 w-7 text-text-tertiary" />}
              <span className="text-center text-xs text-text-secondary">{name}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
