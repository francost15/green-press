import type { Period } from "../lib/dates";

export interface ExperienceItem {
  company: string;
  role: { es: string; en: string };
  period: Period;
  description: { es: string; en: string };
  tags: { es: string[]; en: string[] };
}

export const experience: ExperienceItem[] = [
  {
    company: "Towel S.A. de C.V.",
    role: { es: "Ingeniero de Software", en: "Software Engineer" },
    period: { start: "2025-10", end: "present" },
    description: {
      es: "Desarrollo de un sistema integral para la gestión de procesos en planta textil. Arquitectura e implementación de un dashboard administrativo para el análisis en tiempo real de ventas y métricas de producción mediante visualización avanzada de datos.",
      en: "Development of a comprehensive system for textile plant process management. Architecture and implementation of an administrative dashboard for real-time analysis of sales and production metrics using advanced data visualization.",
    },
    tags: {
      es: ["Sistemas de Gestión", "Visualización de Datos", "Dashboards"],
      en: ["Management Systems", "Data Visualization", "Dashboards"],
    },
  },
  {
    company: "Idea15",
    role: { es: "Ingeniero de Software", en: "Software Engineer" },
    period: { start: "2025-08", end: "2025-09" },
    description: {
      es: "Diseño y desarrollo de un sistema de facturación (CFDI) y timbrado. Integración de Inteligencia Artificial mediante modelos OCR para la predicción y extracción automática de datos contables, optimizando el flujo de trabajo financiero.",
      en: "Design and development of an invoicing (CFDI) and stamping system. Integrated Artificial Intelligence via OCR models for the prediction and automatic extraction of accounting data, optimizing the financial workflow.",
    },
    tags: {
      es: ["Facturación Electrónica", "IA / OCR", "Automatización Financiera"],
      en: ["Electronic Invoicing", "AI / OCR", "Financial Automation"],
    },
  },
  {
    company: "Universidad del Valle de Puebla (UVP)",
    role: { es: "Desarrollador de IA & Mentor Técnico", en: "AI Developer & Tech Mentor" },
    period: { start: "2024-02", end: "2025-06" },
    description: {
      es: "Diseño y despliegue de un asistente virtual impulsado por IA para atención institucional 24/7, optimizando los tiempos de respuesta operativos. Paralelamente, ejercí como mentor técnico guiando a estudiantes en desarrollo de software, hackathones y proyectos tecnológicos.",
      en: "Design and deployment of an AI-powered virtual assistant for 24/7 institutional support, optimizing operational response times. Simultaneously acted as a technical mentor, guiding students in software development, hackathons, and tech projects.",
    },
    tags: {
      es: ["IA", "Chatbots", "Liderazgo", "Mentoría"],
      en: ["AI", "Chatbots", "Leadership", "Mentoring"],
    },
  },
  {
    company: "Telesecundaria Lázaro Cárdenas del Río",
    role: {
      es: "Especialista TI & Gestión de Proyectos",
      en: "IT Specialist & Project Management",
    },
    period: { start: "2023-09", end: "2024-02" },
    description: {
      es: "Liderazgo en la planeación y ejecución de proyectos tecnológicos escolares. Optimización de la gestión de información administrativa y coordinación de recursos para la mejora continua de procesos.",
      en: "Leadership in the planning and execution of school technology projects. Optimization of administrative information management and coordination of resources for continuous process improvement.",
    },
    tags: {
      es: ["Gestión de Proyectos", "Soporte TI", "Optimización"],
      en: ["Project Management", "IT Support", "Optimization"],
    },
  },
  {
    company: "WimxTelecom",
    role: { es: "Ingeniero de Software", en: "Software Engineer" },
    period: { start: "2020-09", end: "2023-09" },
    description: {
      es: "Gestión integral del ciclo de vida de aplicaciones empresariales. Administración, monitoreo y optimización de infraestructura de redes de telecomunicaciones asegurando alta disponibilidad.",
      en: "End-to-end management of the enterprise application lifecycle. Administration, monitoring, and optimization of telecommunications network infrastructure ensuring high availability.",
    },
    tags: {
      es: ["Desarrollo de Software", "Redes", "Infraestructura", "Alta Disponibilidad"],
      en: ["Software Development", "Networking", "Infrastructure", "High Availability"],
    },
  },
];
