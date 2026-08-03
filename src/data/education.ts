import type { Period } from "../lib/dates";

export interface Education {
  degree: { es: string; en: string };
  institution: string;
  location?: string;
  period: Period;
  status: "completed" | "in-progress";
  description?: { es: string; en: string };
  highlights?: { es: string[]; en: string[] };
}

export const education: Education[] = [
  {
    degree: {
      es: "Maestría en Inteligencia Artificial",
      en: "Master's in Artificial Intelligence",
    },
    institution: "UNIR México | Universidad Internacional de La Rioja",
    period: { start: "2026" },
    status: "in-progress",
    description: {
      es: "Especialización avanzada en las 5 ramas principales de IA: machine learning, deep learning, NLP, visión por computadora y desarrollo de algoritmos. Ecosistema tecnológico: Python, TensorFlow, Keras, AWS, Azure.",
      en: "Advanced specialization in the 5 main branches of AI: machine learning, deep learning, NLP, computer vision, and algorithm development. Tech ecosystem: Python, TensorFlow, Keras, AWS, Azure.",
    },
    highlights: {
      es: ["Machine Learning", "Deep Learning", "NLP", "Visión por Computadora"],
      en: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
    },
  },
  {
    degree: { es: "Diplomado en Inteligencia Artificial", en: "Artificial Intelligence Diploma" },
    institution: "Universidad Anáhuac Puebla",
    location: "Puebla, México",
    period: { start: "2024-09", end: "2025-06" },
    status: "completed",
    description: {
      es: "Especialización en diseño y despliegue de soluciones de IA para entornos empresariales. Creación de modelos de clasificación, análisis predictivo y NLP utilizando Python, scikit-learn y TensorFlow.",
      en: "Specialization in designing and deploying AI solutions for enterprise environments. Creation of classification models, predictive analysis, and NLP using Python, scikit-learn, and TensorFlow.",
    },
    highlights: {
      es: ["Aprendizaje profundo", "Aprendizaje automático"],
      en: ["Deep Learning", "Machine Learning"],
    },
  },
  {
    degree: {
      es: "Ingeniería en Sistemas y Tecnología de la Información",
      en: "Systems and Information Technology Engineering",
    },
    institution: "Universidad del Valle de Puebla (UVP)",
    location: "Puebla, México",
    period: { start: "2021-08", end: "2025-06" },
    status: "completed",
    description: {
      es: "Fundamentos sólidos en ingeniería de software, arquitectura de sistemas e IA. Liderazgo en proyectos de desarrollo web, automatización de procesos y soluciones de machine learning.",
      en: "Solid foundations in software engineering, systems architecture, and AI. Leadership in web development projects, process automation, and machine learning solutions.",
    },
    highlights: {
      es: ["Mentor de Carrera", "Hackatones", "Eventos Estudiantiles", "Miembro IEEE"],
      en: ["Career Mentor", "Hackathons", "Student Events", "IEEE Member"],
    },
  },
];
