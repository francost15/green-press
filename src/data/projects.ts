export interface Project {
  id: string;
  /** URL segment for /projects/<slug>/ and /es/proyectos/<slug>/ */
  slug: string;
  title: string;
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  impact: { es: string; en: string };
  tags: { es: string[]; en: string[] };
  link?: string;
  github?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: "ai-dashboard-towel",
    slug: "ai-business-intelligence-dashboard",
    title: "AI Business Intelligence Dashboard",
    problem: {
      es: "La toma de decisiones gerenciales era lenta por la dependencia de analistas para cruzar datos de ventas y generar reportes estáticos.",
      en: "Managerial decision-making was slow due to reliance on analysts to cross-reference sales data and generate static reports.",
    },
    solution: {
      es: "Dashboard interactivo con un agente autónomo (LangGraph) capaz de consultar la base de datos SQL en lenguaje natural, predecir ventas y generar gráficas dinámicas al instante.",
      en: "Interactive dashboard with an autonomous agent (LangGraph) capable of querying the SQL database in natural language, predicting sales, and generating dynamic charts instantly.",
    },
    impact: {
      es: "Reducción del 90% en el tiempo de generación de reportes e incremento de la velocidad en toma de decisiones estratégicas.",
      en: "90% reduction in report generation time and increased speed in strategic decision-making.",
    },
    tags: {
      es: ["React", "Python", "LangGraph", "LLMs", "Visualización de Datos"],
      en: ["React", "Python", "LangGraph", "LLMs", "Data Visualization"],
    },
    images: [
      "/projects/ai-dashboard-1.webp",
      "/projects/ai-dashboard-2.webp",
      "/projects/ai-dashboard-3.webp",
      "/projects/ai-dashboard-4.webp",
      "/projects/ai-dashboard-5.webp",
    ],
  },
  {
    id: "cfdi-billing-ai",
    slug: "smart-cfdi-billing-system",
    title: "Smart CFDI Billing System",
    problem: {
      es: "La facturación manual y el registro de ingresos consumía horas de trabajo administrativo, con un alto margen de error humano en la captura.",
      en: "Manual billing and income registration consumed hours of administrative work, with a high margin of human error in data entry.",
    },
    solution: {
      es: "Plataforma de facturación electrónica y timbrado automatizado, integrando OCR para extracción de datos y modelos predictivos para proyectar flujos de ingresos.",
      en: "Electronic billing and automated stamping platform, integrating OCR for data extraction and predictive models to project income flows.",
    },
    impact: {
      es: "Automatización del 80% del flujo contable y proyección financiera con una precisión superior al 92%.",
      en: "80% automation of the accounting workflow and financial projection with over 92% accuracy.",
    },
    tags: {
      es: ["Node.js", "Python", "OCR", "APIs", "Predicción"],
      en: ["Node.js", "Python", "OCR", "APIs", "Forecasting"],
    },
    images: [
      "/projects/cfdi-1.webp",
      "/projects/cfdi-2.webp",
      "/projects/cfdi-3.webp",
      "/projects/cfdi-4.webp",
      "/projects/cfdi-5.webp",
      "/projects/cfdi-6.webp",
      "/projects/cfdi-7.webp",
      "/projects/cfdi-8.webp",
    ],
  },
  {
    id: "rag-chatbot-uvp",
    slug: "rag-institutional-assistant",
    title: "RAG Institutional Assistant",
    problem: {
      es: "El equipo de atención escolar estaba saturado respondiendo las mismas dudas sobre trámites y normativas a miles de estudiantes diariamente.",
      en: "The school support team was overwhelmed answering the same questions about procedures and regulations to thousands of students daily.",
    },
    solution: {
      es: "Asistente virtual 24/7 utilizando arquitectura RAG (Retrieval-Augmented Generation) conectado a las bases de conocimiento y normativas institucionales.",
      en: "24/7 virtual assistant using RAG (Retrieval-Augmented Generation) architecture connected to institutional knowledge bases and regulations.",
    },
    impact: {
      es: "Resolución autónoma del 65% de las consultas nivel 1 (L1), liberando cientos de horas de soporte al mes.",
      en: "Autonomous resolution of 65% of level 1 (L1) queries, freeing up hundreds of support hours per month.",
    },
    tags: {
      es: ["LangChain", "RAG", "Vector DB", "Chatbots", "OpenAI"],
      en: ["LangChain", "RAG", "Vector DB", "Chatbots", "OpenAI"],
    },
    images: ["/projects/rag-chatbot-1.webp", "/projects/rag-chatbot-2.webp"],
  },
  {
    id: "textile-erp",
    slug: "textile-production-erp",
    title: "Textile Production ERP",
    problem: {
      es: "Falta de trazabilidad en tiempo real en la línea de producción textil, causando cuellos de botella no detectados e inventarios desfasados.",
      en: "Lack of real-time traceability on the textile production line, causing undetected bottlenecks and outdated inventories.",
    },
    solution: {
      es: "Sistema de gestión integral (ERP) enfocado a la sección productiva, permitiendo control de piso, trazabilidad de materiales y optimización de estaciones.",
      en: "Comprehensive management system (ERP) focused on the production section, allowing shop floor control, material traceability, and station optimization.",
    },
    impact: {
      es: "Mejora del 40% en la visibilidad del flujo de trabajo y eliminación casi total del uso de papel en planta.",
      en: "40% improvement in workflow visibility and near-total elimination of paper use on the plant floor.",
    },
    tags: {
      es: ["React", "PostgreSQL", "Arquitectura", "Gestión Industrial"],
      en: ["React", "PostgreSQL", "Architecture", "Industrial Management"],
    },
  },
  {
    id: "ltc-job-board-ai",
    slug: "ai-powered-job-matching-board",
    title: "AI-Powered Job Matching Board",
    problem: {
      es: "El equipo de reclutamiento invertía cientos de horas revisando CVs no estructurados para encontrar el perfil adecuado para vacantes técnicas.",
      en: "The recruitment team spent hundreds of hours reviewing unstructured CVs to find the right profile for technical vacancies.",
    },
    solution: {
      es: "Bolsa de trabajo inteligente (para LTC) que analiza y extrae datos de los CVs subidos, utilizando IA para hacer un 'match' automático entre las habilidades del candidato y las vacantes abiertas.",
      en: "Smart job board (for LTC) that parses and extracts data from uploaded CVs, using AI to perform an automatic 'match' between the candidate's skills and open vacancies.",
    },
    impact: {
      es: "Reducción del 75% en el tiempo de filtrado inicial (screening) y un proceso de postulación sin fricción para el candidato.",
      en: "75% reduction in initial screening time and a frictionless application process for the candidate.",
    },
    tags: {
      es: ["Next.js", "Python", "NLP", "Algoritmos de Match", "AWS"],
      en: ["Next.js", "Python", "NLP", "Matching Algorithms", "AWS"],
    },
    images: [
      "/projects/ltc-job-board-1.webp",
      "/projects/ltc-job-board-2.webp",
      "/projects/ltc-job-board-3.webp",
    ],
  },
];
