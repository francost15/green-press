export interface Award {
  title: { es: string; en: string };
  organization: string;
  year: string;
  type: "award" | "certification";
  description?: { es: string; en: string };
}

export const awards: Award[] = [
  {
    title: { es: "AI Engineering Certificate", en: "AI Engineering Certificate" },
    organization: "Anthropic",
    year: "2024",
    type: "certification",
  },
  {
    title: { es: "Next.js Certification", en: "Next.js Certification" },
    organization: "Vercel",
    year: "2024",
    type: "certification",
  },
  {
    title: { es: "Premio FEPRO a la Innovación", en: "FEPRO Innovation Award" },
    organization: "FEPRO",
    year: "2024",
    type: "award",
  },
  {
    title: { es: "Talent Land Speaker", en: "Talent Land Speaker" },
    organization: "Talent Land",
    year: "2023",
    type: "award",
  },
];
