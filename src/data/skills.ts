export interface SkillCategory {
  name: { es: string; en: string };
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: { es: "AI & Visión por Computadora", en: "AI & Computer Vision" },
    icon: "brain",
    skills: ["Python", "OpenCV", "YOLO", "TensorFlow", "LangChain", "LlamaIndex", "Claude API", "OpenAI API"],
  },
  {
    name: { es: "Backend & APIs", en: "Backend & APIs" },
    icon: "server",
    skills: ["FastAPI", "NestJS", "Node.js", "Laravel", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    name: { es: "Frontend & Mobile", en: "Frontend & Mobile" },
    icon: "monitor",
    skills: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: { es: "Infraestructura & DevOps", en: "Infrastructure & DevOps" },
    icon: "wrench",
    skills: ["Docker", "AWS", "Linux", "GitHub Actions", "Vercel", "Git", "SQL Server"],
  },
];
