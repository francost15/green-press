export interface Competency {
  title: { es: string; en: string };
  description: { es: string; en: string };
  techs: string[];
}

export const competencies: Competency[] = [
  {
    title: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: {
      es: "Desarrollo de sistemas de IA que resuelven problemas de negocio reales. Especializado en agentes autónomos, LLMs y visión por computadora listos para producción.",
      en: "Development of AI systems that solve real business problems. Specialized in production-ready autonomous agents, LLMs, and computer vision.",
    },
    techs: ["LangGraph", "LangChain", "TensorFlow", "Pandas", "OpenCV"],
  },
  {
    title: { es: "Arquitectura Full-Stack", en: "Full-Stack Architecture" },
    description: {
      es: "Construcción de plataformas escalables de principio a fin. Diseño arquitecturas en la nube que soportan alta concurrencia con latencia mínima.",
      en: "End-to-end construction of scalable platforms. I design cloud architectures that handle high concurrency with minimal latency.",
    },
    techs: ["React", "Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    title: { es: "Liderazgo Técnico & PM", en: "Tech Leadership & PM" },
    description: {
      es: "Alineación entre tecnología y objetivos de negocio. Defino roadmaps, optimizo flujos ágiles y guío equipos hacia el cumplimiento de OKRs.",
      en: "Aligning technology with business goals. I define roadmaps, optimize agile workflows, and guide teams toward OKRs.",
    },
    techs: ["Scrum & Kanban", "Jira", "Product Strategy", "OKRs", "Mentoring"],
  },
];
