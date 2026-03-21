export interface ExperienceItem {
  company: string;
  role: { es: string; en: string };
  period: string;
  description: { es: string; en: string };
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "evArchitect",
    role: { es: "Co-Fundador & Lead Engineer", en: "Co-Founder & Lead Engineer" },
    period: "2024 — Present",
    description: {
      es: "Liderando el desarrollo de una plataforma de arquitectura empresarial impulsada por IA. Diseño de la arquitectura del sistema, implementación de pipelines de ML y gestión del equipo técnico.",
      en: "Leading the development of an AI-powered enterprise architecture platform. System architecture design, ML pipeline implementation, and technical team management.",
    },
    tags: ["Next.js", "Python", "AWS", "OpenAI"],
  },
  {
    company: "Startup Studio MX",
    role: { es: "Senior Full-Stack Developer", en: "Senior Full-Stack Developer" },
    period: "2022 — 2024",
    description: {
      es: "Desarrollo de múltiples productos digitales desde cero para clientes enterprise. Implementación de microservicios, APIs REST y aplicaciones React de alto rendimiento.",
      en: "Built multiple digital products from scratch for enterprise clients. Implemented microservices, REST APIs, and high-performance React applications.",
    },
    tags: ["React", "NestJS", "Docker", "PostgreSQL"],
  },
  {
    company: "Tech Consulting Firm",
    role: { es: "Software Developer", en: "Software Developer" },
    period: "2021 — 2022",
    description: {
      es: "Consultoría técnica y desarrollo de soluciones para empresas del sector financiero y retail. Migración de sistemas legacy a arquitecturas modernas.",
      en: "Technical consulting and custom solutions for financial and retail sector companies. Legacy system migration to modern architectures.",
    },
    tags: ["Node.js", "React", "MongoDB", "AWS"],
  },
  {
    company: "Universidad / Freelance",
    role: { es: "Junior Developer & Investigador", en: "Junior Developer & Researcher" },
    period: "2019 — 2021",
    description: {
      es: "Proyectos de investigación en IA aplicada y desarrollo freelance. Participación en hackathons y competencias de programación.",
      en: "Applied AI research projects and freelance development. Participated in hackathons and programming competitions.",
    },
    tags: ["Python", "JavaScript", "TensorFlow", "Flask"],
  },
];
