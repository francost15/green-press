export interface Service {
  title: { es: string; en: string };
  audience: { es: string; en: string };
  deliverable: { es: string; en: string };
  proof: { es: string; en: string };
}

export interface ProcessStep {
  title: { es: string; en: string };
  detail: { es: string; en: string };
}

/** Buyable offers. Every proof line traces to a published project impact. No price, no timeline. */
export const services: Service[] = [
  {
    title: { es: "Asistentes de IA", en: "AI assistants" },
    audience: {
      es: "Para negocios que contestan las mismas preguntas todo el día.",
      en: "For businesses that answer the same questions all day.",
    },
    deliverable: {
      es: "Un asistente que responde con tu información —precios, políticas, catálogo— y pasa a una persona cuando hace falta.",
      en: "An assistant that answers from your own information —prices, policies, catalog— and hands off to a person when it should.",
    },
    proof: {
      es: "En la UVP, el asistente resuelve solo cerca del 65% de las consultas.",
      en: "At UVP, the assistant resolves about 65% of questions on its own.",
    },
  },
  {
    title: { es: "Tableros y herramientas internas", en: "Internal tools and dashboards" },
    audience: {
      es: "Para equipos que arman reportes a mano o no ven la operación hasta fin de mes.",
      en: "For teams that build reports by hand, or only see the operation at month-end.",
    },
    deliverable: {
      es: "Un panel con tus números, conectado al sistema que ya usas.",
      en: "A panel of your numbers, connected to the system you already run.",
    },
    proof: {
      es: "En Towel S.A. de C.V., el reporte semanal de ventas toma cerca de un 90% menos de tiempo.",
      en: "At Towel S.A. de C.V., the weekly sales report takes about 90% less time.",
    },
  },
  {
    title: { es: "Primera versión de un producto con IA", en: "A first version of an AI product" },
    audience: {
      es: "Para quien necesita una versión funcional antes de invertir en grande.",
      en: "For someone who needs a working version before a larger investment.",
    },
    deliverable: {
      es: "Una primera versión desplegada, lista para enseñar a usuarios reales.",
      en: "A first version, deployed and ready to show to real users.",
    },
    proof: {
      es: "En LTC, la bolsa con IA redujo cerca del 75% el filtrado inicial de candidatos.",
      en: "At LTC, the AI job board cut initial candidate screening by about 75%.",
    },
  },
];

/** Sequence matters: each step is what happens next. No durations or prices. */
export const processSteps: ProcessStep[] = [
  {
    title: { es: "Llamada", en: "A call" },
    detail: {
      es: "Entiendo el problema y te digo si la IA de verdad ayuda.",
      en: "I learn the problem and tell you whether AI actually helps.",
    },
  },
  {
    title: { es: "Propuesta", en: "A proposal" },
    detail: {
      es: "Alcance, precio cerrado y fechas.",
      en: "Scope, a fixed price, and dates.",
    },
  },
  {
    title: { es: "Construcción", en: "The build" },
    detail: {
      es: "Ves el avance mientras se construye.",
      en: "You see the work while it is being built.",
    },
  },
  {
    title: { es: "Entrega", en: "Handoff" },
    detail: {
      es: "Capacitación y documentación.",
      en: "Training and documentation.",
    },
  },
];
