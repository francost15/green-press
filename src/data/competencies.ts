export interface Competency {
  title: { es: string; en: string };
  description: { es: string; en: string };
  techs: string[];
}

export const competencies: Competency[] = [
  {
    title: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    description: {
      es: "Agentes LangGraph y RAG en producción: el dashboard de Towel, el asistente de la UVP, OCR de CFDI en Idea15. No un notebook.",
      en: "LangGraph and RAG agents in production: Towel's dashboard, UVP's assistant, CFDI OCR at Idea15. Not a notebook.",
    },
    techs: ["LangGraph", "LangChain", "TensorFlow", "Pandas", "OpenCV"],
  },
  {
    title: { es: "Arquitectura Full-Stack", en: "Full-Stack Architecture" },
    description: {
      es: "React y PostgreSQL de extremo a extremo en el ERP de planta y el dashboard de Towel; Next.js y AWS en la bolsa de LTC.",
      en: "End-to-end React and PostgreSQL on Towel's plant ERP and dashboard; Next.js and AWS on LTC's job board.",
    },
    techs: ["React", "Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    title: { es: "Liderazgo Técnico & PM", en: "Tech Leadership & PM" },
    description: {
      es: "En la UVP mentoreé al tiempo que entregaba el asistente. En planta y en Idea15 el trabajo fue scoping, entrega y la medición que está en cada página de proyecto.",
      en: "At UVP I mentored while shipping the assistant. On the plant floor and at Idea15 the work was scoping, delivery, and the measurement on each project page.",
    },
    techs: ["Scrum & Kanban", "Jira", "Product Strategy", "OKRs", "Mentoring"],
  },
];
