export interface Project {
  id: string;
  title: string;
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  impact: { es: string; en: string };
  tags: string[];
  link?: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "pcb-inspector",
    title: "PCB Visual Inspector",
    problem: {
      es: "Detectar defectos microscópicos en placas PCB a simple vista es lento, propenso a errores y no escala en producción industrial.",
      en: "Detecting microscopic defects on PCB boards by eye is slow, error-prone, and doesn't scale in industrial production.",
    },
    solution: {
      es: "Sistema automatizado de inspección visual con modelos YOLO y OpenCV que analiza imágenes de alta resolución en tiempo real.",
      en: "Automated visual inspection system using YOLO models and OpenCV that analyzes high-resolution images in real-time.",
    },
    impact: {
      es: "Reducción del 85% en tiempo de inspección y aumento de la tasa de detección de defectos al 97%.",
      en: "85% reduction in inspection time and defect detection rate increased to 97%.",
    },
    tags: ["Python", "YOLO", "OpenCV", "FastAPI", "Docker"],
    github: "https://github.com/fsanchez/pcb-inspector",
    demo: "/demos/pcb-inspector.mp4",
  },
  {
    id: "evarchitect",
    title: "evArchitect AI",
    problem: {
      es: "Diseñar arquitecturas empresariales cloud-native requiere semanas de análisis manual y documentación que se desactualiza rápido.",
      en: "Designing cloud-native enterprise architectures requires weeks of manual analysis and documentation that quickly becomes outdated.",
    },
    solution: {
      es: "Plataforma impulsada por IA que genera arquitecturas de solución, diagramas y documentación técnica automáticamente a partir de requerimientos.",
      en: "AI-powered platform that automatically generates solution architectures, diagrams, and technical documentation from requirements.",
    },
    impact: {
      es: "De semanas a horas en generación de propuestas técnicas. Adoptado por 3 consultoras como herramienta interna.",
      en: "From weeks to hours for technical proposals. Adopted by 3 consulting firms as an internal tool.",
    },
    tags: ["Next.js", "Python", "OpenAI", "AWS", "PostgreSQL"],
    link: "https://evarchitect.ai",
  },
  {
    id: "agri-vision",
    title: "AgriVision ML",
    problem: {
      es: "Los agricultores de vainilla y cítricos pierden hasta el 30% de su cosecha por enfermedades detectadas demasiado tarde.",
      en: "Vanilla and citrus farmers lose up to 30% of their harvest due to diseases detected too late.",
    },
    solution: {
      es: "Sistema de análisis de cultivos con visión por computadora que identifica enfermedades en hojas y frutos desde fotografías de campo.",
      en: "Crop analysis system using computer vision that identifies diseases in leaves and fruits from field photographs.",
    },
    impact: {
      es: "Detección temprana con 92% de precisión. Piloto activo con cooperativas agrícolas en Puebla.",
      en: "Early detection with 92% accuracy. Active pilot with agricultural cooperatives in Puebla.",
    },
    tags: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React Native"],
    github: "https://github.com/fsanchez/agri-vision",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Support System",
    problem: {
      es: "Los equipos de soporte técnico manejan cientos de tickets diarios con información dispersa en múltiples sistemas.",
      en: "Technical support teams handle hundreds of daily tickets with information scattered across multiple systems.",
    },
    solution: {
      es: "Sistema multi-agente con LangChain que orquesta agentes especializados para clasificar, priorizar y resolver tickets automáticamente.",
      en: "Multi-agent system with LangChain that orchestrates specialized agents to automatically classify, prioritize, and resolve tickets.",
    },
    impact: {
      es: "Resolución automática del 40% de tickets L1. Tiempo promedio de respuesta reducido de 4h a 15min.",
      en: "Automatic resolution of 40% of L1 tickets. Average response time reduced from 4h to 15min.",
    },
    tags: ["Python", "LangChain", "Claude API", "NestJS", "PostgreSQL"],
    github: "https://github.com/fsanchez/multi-agent-support",
  },
];
