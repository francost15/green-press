export interface Education {
  degree: { es: string; en: string };
  institution: string;
  location?: string;
  period: { start: string; end: string };
  status: "completed" | "in-progress";
  description?: { es: string; en: string };
  highlights?: string[];
}

export const education: Education[] = [
  {
    degree: {
      es: "Maestría en Inteligencia Artificial",
      en: "Master's in Artificial Intelligence",
    },
    institution: "UNIR México | Universidad Internacional de La Rioja",
    period: { start: "2026", end: "" },
    status: "in-progress",
    description: {
      es: "Programa enfocado en las 5 ramas principales de IA: machine learning, deep learning, NLP, visión por computador y desarrollo de algoritmos. Herramientas: Python, TensorFlow, Keras, AWS, Azure.",
      en: "Program focused on 5 main AI branches: machine learning, deep learning, NLP, computer vision, and algorithm development. Tools: Python, TensorFlow, Keras, AWS, Azure.",
    },
    highlights: ["Machine Learning", "Deep Learning", "NLP", "Visión por Computador"],
  },
  {
    degree: { es: "Diplomado en Inteligencia Artificial", en: "Artificial Intelligence Diploma" },
    institution: "Universidad Anáhuac Puebla",
    location: "Puebla, México",
    period: { start: "Sept. 2024", end: "Jun. 2025" },
    status: "completed",
    description: {
      es: "Diplomado enfocado en el diseño, desarrollo e implementación de soluciones de IA en entornos empresariales. Herramientas: Python, scikit-learn, TensorFlow. Desarrollo de modelos de clasificación, análisis predictivo y NLP.",
      en: "Diploma focused on designing, developing, and implementing AI solutions in enterprise environments. Tools: Python, scikit-learn, TensorFlow. Classification models, predictive analysis, and NLP.",
    },
    highlights: ["Aprendizaje profundo", "Aprendizaje automático"],
  },
  {
    degree: {
      es: "Ingeniería en Sistemas y Tecnología de la Información",
      en: "Systems and Information Technology Engineering",
    },
    institution: "Universidad del Valle de Puebla (UVP)",
    location: "Puebla, México",
    period: { start: "Ago. 2021", end: "Jun. 2025" },
    status: "completed",
    description: {
      es: "Desarrollo de habilidades en programación, análisis de datos, IA y gestión de proyectos tecnológicos. Proyectos incluyen aplicaciones web, sistemas de automatización y soluciones basadas en IA.",
      en: "Development of skills in programming, data analysis, AI, and technological project management. Projects include web applications, automation systems, and AI-based solutions.",
    },
    highlights: [
      "Participación en hackatones universitarios",
      "Organización de eventos estudiantiles",
      "Integrante del grupo IEEE",
    ],
  },
];
