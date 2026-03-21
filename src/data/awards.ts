export interface Award {
  title: { es: string; en: string };
  organization: string;
  year: string;
  type: "award" | "certification";
  description?: { es: string; en: string };
}

export const awards: Award[] = [
  {
    title: { es: "Premio FEPRO a la Innovación", en: "FEPRO Innovation Award" },
    organization: "FEPRO",
    year: "2024",
    type: "award",
    description: {
      es: "Reconocimiento por proyecto de IA aplicada a la educación.",
      en: "Recognition for applied AI project in education.",
    },
  },
  {
    title: { es: "Ganador Hackathon ITZAMNÁ", en: "ITZAMNÁ Hackathon Winner" },
    organization: "ITZAMNÁ",
    year: "2023",
    type: "award",
    description: {
      es: "Primer lugar en categoría de Inteligencia Artificial.",
      en: "First place in the Artificial Intelligence category.",
    },
  },
  {
    title: { es: "Talent Land Speaker", en: "Talent Land Speaker" },
    organization: "Talent Land",
    year: "2023",
    type: "award",
    description: {
      es: "Ponencia sobre el futuro de la IA en el desarrollo de software.",
      en: "Talk on the future of AI in software development.",
    },
  },
  {
    title: { es: "Congreso UNAM — Ponente Invitado", en: "UNAM Congress — Invited Speaker" },
    organization: "UNAM",
    year: "2022",
    type: "award",
    description: {
      es: "Presentación de investigación sobre NLP en español.",
      en: "Research presentation on Spanish NLP.",
    },
  },
  {
    title: { es: "Next.js Certification", en: "Next.js Certification" },
    organization: "Vercel",
    year: "2024",
    type: "certification",
  },
  {
    title: { es: "NestJS Fundamentals", en: "NestJS Fundamentals" },
    organization: "NestJS",
    year: "2023",
    type: "certification",
  },
  {
    title: { es: "Professional Scrum Master I", en: "Professional Scrum Master I" },
    organization: "Scrum.org",
    year: "2023",
    type: "certification",
  },
  {
    title: { es: "AI Engineering Certificate", en: "AI Engineering Certificate" },
    organization: "Anthropic",
    year: "2024",
    type: "certification",
  },
];
