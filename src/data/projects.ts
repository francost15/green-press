import type { Period } from "../lib/dates";

export interface Project {
  id: string;
  slug: string;
  title: { es: string; en: string };
  period: Period;
  /** Last content revision (ISO date). Drives sitemap lastmod and dateModified. */
  updated: string;
  client: { es: string; en: string };
  role: { es: string; en: string };
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  architecture: { es: string; en: string };
  impact: { es: string; en: string };
  measurement: { es: string; en: string };
  faq: { q: { es: string; en: string }; a: { es: string; en: string } };
  body: { es: string; en: string };
  related: string[];
  tags: { es: string[]; en: string[] };
  imageAlts?: { es: string[]; en: string[] };
  link?: string;
  github?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: "ai-dashboard-towel",
    slug: "ai-business-intelligence-dashboard",
    title: { es: "Dashboard de Inteligencia de Negocio con IA", en: "AI Business Intelligence Dashboard" },
    period: { start: "2025-10", end: "present" },
    updated: "2026-08-27",
    client: { es: "Towel S.A. de C.V.", en: "Towel S.A. de C.V." },
    role: { es: "Ingeniero de software, único en el dashboard", en: "Software engineer, sole builder of the dashboard" },
    problem: {
      es: "La toma de decisiones gerenciales era lenta por la dependencia de analistas para cruzar datos de ventas y generar reportes estáticos.",
      en: "Managerial decision-making was slow due to reliance on analysts to cross-reference sales data and generate static reports.",
    },
    solution: {
      es: "Dashboard interactivo con un agente autónomo (LangGraph) capaz de consultar la base de datos SQL en lenguaje natural, predecir ventas y generar gráficas dinámicas al instante.",
      en: "Interactive dashboard with an autonomous agent (LangGraph) capable of querying the SQL database in natural language, predicting sales, and generating dynamic charts instantly.",
    },
    architecture: {
      es: "Front en React sobre PostgreSQL. Un grafo LangGraph orquesta herramientas de consulta SQL y de gráfico: el usuario escribe en español, el agente planifica, ejecuta lecturas parametrizadas y devuelve una figura. No hay un LLM pegado al string SQL crudo; las herramientas exponen operaciones permitidas. El mismo almacén alimenta el ERP de planta.",
      en: "React front end on PostgreSQL. A LangGraph graph orchestrates SQL and chart tools: the user writes in Spanish, the agent plans, runs parameterized reads, and returns a figure. The LLM is not glued to a raw SQL string; tools expose allowed operations. The same store feeds the plant ERP.",
    },
    impact: {
      es: "En Towel S.A. de C.V., el tiempo de generar un reporte semanal de ventas bajó alrededor del 90% cuando el dashboard con LangGraph sustituyó las exportaciones estáticas del analista.",
      en: "At Towel S.A. de C.V., time to produce a weekly sales report fell by about 90% after the LangGraph dashboard replaced analyst-built static exports.",
    },
    measurement: {
      es: "Cifra reportada por el operador (ingeniero único del dashboard), Towel S.A. de C.V., oct 2025–presente. Comparó el tiempo de armar el reporte semanal de ventas antes (exportación y cruce manual) con el tiempo de preguntar al agente y renderizar la gráfica. No es un estudio controlado ni una auditoría de terceros.",
      en: "Operator-reported by the sole dashboard engineer at Towel S.A. de C.V., Oct 2025–present. Compared time to assemble the weekly sales report before (manual export and join) with time to ask the agent and render the chart. Not a controlled study; no third-party audit.",
    },
    faq: {
      q: {
        es: "¿Cómo un gerente consulta ventas sin esperar al analista?",
        en: "How does a manager query sales without waiting on an analyst?",
      },
      a: {
        es: "Escribe la pregunta en el dashboard. Un agente LangGraph usa herramientas de SQL parametrizado y de gráfico sobre PostgreSQL y devuelve la figura. El analista deja de ser el cuello de botella del reporte semanal.",
        en: "They type the question in the dashboard. A LangGraph agent uses parameterized SQL and chart tools on PostgreSQL and returns the figure. The analyst is no longer the bottleneck for the weekly report.",
      },
    },
    body: {
      es: "Towel S.A. de C.V. fabrica textil en Puebla. Antes de este trabajo, un gerente que quería cruzar ventas con producción pedía un reporte a un analista. El analista exportaba, unía tablas y devolvía una lámina estática. Si la pregunta cambiaba, el ciclo empezaba otra vez. Eso no es un problema de “más gráficos”: es un problema de quién puede hacer la pregunta y cuánto tarda la respuesta. El viernes se volvía un mini-proyecto. El lunes la cifra ya era historia.\n\nEl sistema que construí es un dashboard en React que habla con PostgreSQL a través de un agente LangGraph. El usuario escribe en español. El grafo decide qué herramienta llamar: una lectura SQL con parámetros, no una concatenación de strings, y una herramienta de gráfico que pinta el resultado. El modelo no tiene vía libre al esquema; ve operaciones que yo expuse. Eso es deliberado en una planta donde una consulta mal formada no es un incidente de blog, es inventario mal leído. Cada herramienta nueva es una decisión de producto: o la pregunta se repetirá, o se responde una vez y se olvida.\n\nEl mismo almacén alimenta el ERP de piso. Dashboard y ERP no son dos productos de marketing: son dos caras de un registro. Si el piso carga estaciones y materiales, la gerencia puede preguntar por esas cifras sin un segundo almacén “para BI”. La predicción de ventas es un modelo sobre ese historial, no un widget desconectado. Cuando el piso y la gerencia discuten, discuten el mismo número.\n\nMi rol fue de extremo a extremo: modelado, herramientas del agente, UI, y el criterio de qué pregunta merece una herramienta nueva frente a un reporte de una sola vez. No hubo un equipo de datos aparte. Sigo en Towel desde octubre de 2025; el dashboard sigue en uso porque el reporte semanal dejó de ser un proyecto cada viernes. Las capturas de esta página son de ese UI, no de un mock.\n\nLo que no es: un producto SaaS público, un notebook de demostración, ni un LLM con acceso irrestricto a producción. Es un sistema interno, pagado, con un operador que midió el antes y el después del reporte semanal y reportó una caída de alrededor del 90% en ese tiempo. Esa cifra no tiene auditoría externa. Si un reclutador quiere el detalle del método, está en esta misma página, en “Cómo se midió”.",
      en: "Towel S.A. de C.V. is a textile manufacturer in Puebla. Before this work, a manager who wanted sales crossed with production asked an analyst for a report. The analyst exported, joined tables, and returned a static slide. If the question changed, the cycle started again. That is not a “more charts” problem. It is a problem of who is allowed to ask and how long the answer takes. Friday became a mini-project. By Monday the figure was history.\n\nThe system I built is a React dashboard that talks to PostgreSQL through a LangGraph agent. The user types in Spanish. The graph decides which tool to call: a parameterized SQL read, not string concatenation, and a chart tool that draws the result. The model does not have a free path to the schema; it sees operations I exposed. That is deliberate on a plant floor, where a malformed query is not a blog incident. It is a misread inventory. Each new tool is a product decision: either the question will recur, or it is answered once and forgotten.\n\nThe same store feeds the shop-floor ERP. Dashboard and ERP are not two marketing products. They are two faces of one record. If the floor loads stations and materials, management can ask about those figures without a second “BI” warehouse. Sales forecasting is a model on that history, not a disconnected widget. When the floor and management argue, they argue the same number.\n\nI owned the work end to end: modeling, agent tools, UI, and the judgment of which question deserves a new tool versus a one-off report. There was no separate data team. I have been at Towel since October 2025; the dashboard is still in use because the weekly report stopped being a Friday project. The screenshots on this page are that UI, not a mock.\n\nWhat it is not: a public SaaS product, a demo notebook, or an LLM with unrestricted production access. It is an internal, paid system. The operator who timed the weekly report before and after reported about a 90% drop in that time. That figure has no external audit. If a recruiter wants the method, it is on this page under “How it was measured.”",
    },
    related: ["textile-production-erp", "smart-cfdi-billing-system"],
    tags: {
      es: ["React", "Python", "LangGraph", "LLMs", "Visualización de Datos"],
      en: ["React", "Python", "LangGraph", "LLMs", "Data Visualization"],
    },
    imageAlts: {
      es: [
        "Dashboard de ventas: pregunta en lenguaje natural y gráfica generada",
        "Vista de métricas de producción cruzadas con ventas",
        "Panel de predicción de ventas sobre el historial de PostgreSQL",
        "Detalle de una consulta del agente LangGraph y su resultado tabular",
        "Layout del dashboard en escritorio con filtros de periodo",
      ],
      en: [
        "Sales dashboard: natural-language question and generated chart",
        "Production metrics crossed with sales",
        "Sales forecast panel on the PostgreSQL history",
        "LangGraph agent query detail and tabular result",
        "Desktop dashboard layout with period filters",
      ],
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
    title: { es: "Sistema Inteligente de Facturación CFDI", en: "Smart CFDI Billing System" },
    period: { start: "2025-08", end: "2025-09" },
    updated: "2026-08-27",
    client: { es: "Idea15", en: "Idea15" },
    role: { es: "Ingeniero de software, diseño y desarrollo", en: "Software engineer, design and development" },
    problem: {
      es: "La facturación manual y el registro de ingresos consumía horas de trabajo administrativo, con un alto margen de error humano en la captura.",
      en: "Manual billing and income registration consumed hours of administrative work, with a high margin of human error in data entry.",
    },
    solution: {
      es: "Plataforma de facturación electrónica y timbrado automatizado, integrando OCR para extracción de datos y modelos predictivos para proyectar flujos de ingresos.",
      en: "Electronic billing and automated stamping platform, integrating OCR for data extraction and predictive models to project income flows.",
    },
    architecture: {
      es: "Servicios Node.js para el flujo CFDI (emisión, timbrado, XML). Python para OCR sobre comprobantes de entrada y para el modelo de proyección de ingresos. APIs hacia el PAC y hacia el almacén contable. El OCR no “adivina” el folio: extrae campos y un humano confirma los dudosos antes del timbrado.",
      en: "Node.js services for the CFDI flow (issuance, stamping, XML). Python for OCR on inbound receipts and for the income-projection model. APIs to the PAC and to the accounting store. OCR does not guess the folio: it extracts fields and a human confirms doubtful ones before stamping.",
    },
    impact: {
      es: "En Idea15 (ago–sep 2025), el flujo contable cubierto por captura automática llegó a alrededor del 80%, y la proyección de ingresos del modelo se midió por encima del 92% de acierto sobre el historial interno.",
      en: "At Idea15 (Aug–Sep 2025), the accounting flow covered by automatic capture reached about 80%, and the income-projection model scored above 92% accuracy on internal history.",
    },
    measurement: {
      es: "Cifras reportadas por el ingeniero del sistema en Idea15, ago–sep 2025. El 80% es la porción del flujo de captura/timbrado que dejó de teclearse a mano. El 92% es acierto de la proyección de ingresos contra el historial interno de la firma, no contra un benchmark público. Sin auditoría de terceros.",
      en: "Figures reported by the system engineer at Idea15, Aug–Sep 2025. The 80% is the share of the capture/stamping flow that stopped being typed by hand. The 92% is projection accuracy against the firm's internal history, not a public benchmark. No third-party audit.",
    },
    faq: {
      q: {
        es: "¿Cómo se extrae un CFDI o un comprobante sin teclear el XML a mano?",
        en: "How do you extract a CFDI or a receipt without typing the XML by hand?",
      },
      a: {
        es: "Un servicio Python corre OCR sobre el documento de entrada, propone campos, y un humano confirma los dudosos. Node.js arma el XML, llama al PAC para el timbrado y guarda el resultado en el almacén contable.",
        en: "A Python service runs OCR on the inbound document, proposes fields, and a human confirms the doubtful ones. Node.js builds the XML, calls the PAC for stamping, and stores the result in the accounting store.",
      },
    },
    body: {
      es: "Idea15 necesitaba dejar de teclear facturación. En México eso no es “un formulario bonito”: es CFDI, XML, complemento, PAC, y un error de captura que el SAT no perdona. El trabajo duró agosto y septiembre de 2025. Diseñé y desarrollé el flujo de emisión y timbrado, la extracción por OCR y un modelo que proyecta ingresos a partir del historial ya timbrado. Seis semanas. No un trimestre de discovery.\n\nLa arquitectura parte el problema. Node.js posee el trámite: armar el comprobante, hablar con el PAC, persistir el XML. Python posee la visión y la proyección: leer un papel o un PDF de entrada, proponer campos, y estimar flujo. Las APIs entre ambos son explícitas. El OCR no timbra solo. Si la confianza del campo es baja, un humano confirma. Eso es más lento que un demo de “100% automático” y más honesto que mandar un folio inventado al PAC. La cola de confirmación es parte del producto, no un “después”.\n\nEl 80% que reporto es la porción del flujo de captura y timbrado que dejó de ser tecleo. El resto sigue siendo juicio: excepciones, complementos raros, casos que no merecían un modelo. El 92% es el acierto de la proyección de ingresos contra el historial interno de Idea15, no contra un dataset público ni contra el SAT. Nadie externo auditó esas dos cifras. Vivieron seis semanas de ingeniería y un operador que las midió. Un reclutador que pida el notebook del 92% no lo va a encontrar en GitHub: el historial es de la firma.\n\nEste es el sistema más específico de México en el portafolio. No es un tutorial de RAG. Es timbrado, OCR y un modelo de caja. Si más adelante publico un artículo o un utilitario de parseo de XML CFDI, este será el trabajo del que sale. Hasta entonces, esta página es la fuente. El aviso de privacidad de este sitio no cubre los datos fiscales de Idea15; cubre el formulario de contacto de Franco.",
      en: "Idea15 needed to stop typing invoices. In Mexico that is not “a nicer form.” It is CFDI, XML, complements, a PAC, and a capture error the SAT will not forgive. The work ran August–September 2025. I designed and built the issuance and stamping flow, OCR extraction, and a model that projects income from already-stamped history. Six weeks. Not a quarter of discovery.\n\nThe architecture splits the problem. Node.js owns the procedure: build the voucher, talk to the PAC, persist the XML. Python owns vision and projection: read inbound paper or PDF, propose fields, and estimate cash. APIs between them are explicit. OCR does not stamp alone. If field confidence is low, a human confirms. That is slower than a “100% automatic” demo and more honest than sending a made-up folio to the PAC. The confirmation queue is part of the product, not a later phase.\n\nThe 80% I report is the share of the capture and stamping flow that stopped being typed. The rest is still judgment: exceptions, odd complements, cases that did not deserve a model. The 92% is projection accuracy against Idea15's internal history, not a public dataset and not the SAT. Nobody outside audited those two figures. They lived through six weeks of engineering and an operator who measured them. A recruiter who asks for the 92% notebook will not find it on GitHub: the history belongs to the firm.\n\nThis is the most Mexico-specific system in the portfolio. It is not a RAG tutorial. It is stamping, OCR, and a cash model. If I later publish an article or a CFDI XML parsing utility, this is the work it comes from. Until then, this page is the source. This site's privacy notice does not cover Idea15's fiscal data; it covers Franco's contact form.",
    },
    related: ["ai-business-intelligence-dashboard", "rag-institutional-assistant"],
    tags: {
      es: ["Node.js", "Python", "OCR", "APIs", "Predicción"],
      en: ["Node.js", "Python", "OCR", "APIs", "Forecasting"],
    },
    imageAlts: {
      es: [
        "Formulario de emisión CFDI con campos extraídos por OCR",
        "Vista del XML timbrado y el folio fiscal",
        "Cola de comprobantes pendientes de confirmación humana",
        "Panel de proyección de ingresos sobre historial timbrado",
        "Detalle de error de captura bloqueado antes del PAC",
        "Listado de facturas emitidas con estatus de timbrado",
        "Integración de API hacia el almacén contable",
        "Resumen mensual de flujo automático frente a tecleo manual",
      ],
      en: [
        "CFDI issuance form with OCR-extracted fields",
        "Stamped XML view and fiscal folio",
        "Queue of receipts pending human confirmation",
        "Income projection panel on stamped history",
        "Capture error blocked before the PAC",
        "Issued invoices list with stamping status",
        "API integration into the accounting store",
        "Monthly summary of automatic flow versus manual typing",
      ],
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
    title: { es: "Asistente Institucional RAG", en: "RAG Institutional Assistant" },
    period: { start: "2024-02", end: "2025-06" },
    updated: "2026-08-27",
    client: { es: "Universidad del Valle de Puebla (UVP)", en: "Universidad del Valle de Puebla (UVP)" },
    role: { es: "Desarrollador de IA, único del asistente", en: "AI developer, sole builder of the assistant" },
    problem: {
      es: "El equipo de atención escolar estaba saturado respondiendo las mismas dudas sobre trámites y normativas a miles de estudiantes diariamente.",
      en: "The school support team was overwhelmed answering the same questions about procedures and regulations to thousands of students daily.",
    },
    solution: {
      es: "Asistente virtual 24/7 utilizando arquitectura RAG (Retrieval-Augmented Generation) conectado a las bases de conocimiento y normativas institucionales.",
      en: "24/7 virtual assistant using RAG (Retrieval-Augmented Generation) architecture connected to institutional knowledge bases and regulations.",
    },
    architecture: {
      es: "Ingesta de normativas y trámites hacia una base vectorial. LangChain arma el retrieve-then-generate: recupera pasajes, condiciona al modelo y cita la fuente institucional. No se inventa reglamento. El chat corre contra ese índice, no contra la web abierta.",
      en: "Ingest of regulations and procedures into a vector store. LangChain runs retrieve-then-generate: it retrieves passages, conditions the model, and cites the institutional source. It does not invent policy. Chat hits that index, not the open web.",
    },
    impact: {
      es: "En la Universidad del Valle de Puebla (feb 2024–jun 2025), el asistente resolvió de forma autónoma alrededor del 65% de las consultas de nivel 1, según el operador del sistema.",
      en: "At Universidad del Valle de Puebla (Feb 2024–Jun 2025), the assistant autonomously resolved about 65% of level-1 queries, as reported by the system operator.",
    },
    measurement: {
      es: "Cifra reportada por el desarrollador único del asistente en UVP, feb 2024–jun 2025. El 65% es la porción de consultas L1 (horarios, trámites, normativa repetida) que el bot cerró sin escalar a un humano, sobre el tráfico observado en ese periodo. No hay tamaño de muestra publicado ni auditoría de la universidad en esta página.",
      en: "Figure reported by the sole assistant developer at UVP, Feb 2024–Jun 2025. The 65% is the share of L1 queries (hours, procedures, repeated policy) the bot closed without escalating to a human, on traffic observed in that period. No published sample size; no university audit on this page.",
    },
    faq: {
      q: {
        es: "¿Quién construyó el asistente de IA de la UVP y qué resuelve?",
        en: "Who built UVP's AI assistant and what does it resolve?",
      },
      a: {
        es: "Franco Sanchez, como desarrollador de IA y mentor técnico en la Universidad del Valle de Puebla, feb 2024–jun 2025. Un RAG sobre normativa institucional responde 24/7 las dudas L1 de trámites y deja al equipo humano las excepciones.",
        en: "Franco Sanchez, as AI developer and tech mentor at Universidad del Valle de Puebla, Feb 2024–Jun 2025. A RAG over institutional policy answers L1 procedure questions 24/7 and leaves exceptions to the human team.",
      },
    },
    body: {
      es: "La Universidad del Valle de Puebla tenía un equipo de atención respondiendo las mismas preguntas de trámites todos los días. Horarios, documentos, normativa que ya estaba escrita. Eso es tráfico L1: no es consejo académico, es lookup. De febrero de 2024 a junio de 2025 fui el desarrollador de IA del asistente y, en paralelo, mentor técnico de estudiantes. Dieciséis meses, no un hackathon.\n\nLa arquitectura es RAG, no un modelo al que se le pidió “sé la universidad”. Ingesta de bases de conocimiento y reglamentos hacia vectores. LangChain recupera pasajes, condiciona la generación y mantiene la respuesta atada a esos pasajes. Si el índice no tiene el trámite, el bot no debe inventar una fecha de titulación. El canal es 24/7 porque los estudiantes no preguntan solo en ventanilla. Lo que no resuelve L1 se escala: el bot no es el coordinador.\n\nEl 65% es la porción de L1 que el operador (yo) vio cerrarse sin escalar. No publiqué el recuento de tickets ni un informe de la UVP. Un evaluador debe tratar esa cifra como auto-reportada. Lo que sí está en el record laboral es el rol, las fechas y que el asistente existió para bajar la carga repetida, no para sustituir a un coordinador. Si UVP firma una atestación algún día, irá a sameAs. Hoy no está inventada en el JSON-LD.\n\nTambién mentoreé. Eso no es el producto, pero explica por qué el sistema está escrito para que un estudiante pueda mantener el índice: documentos institucionales cambian. Un RAG que no se reingesta es un rumor al mes siguiente. El mentoring y el bot se prestaban el mismo criterio: no dejes texto muerto en producción.\n\nEsta página no es un tutorial de “qué es RAG”. Es el sistema de una universidad, con un nombre, un intervalo y un porcentaje que declara su método y sus límites. Quien busque un curso de LangChain debe irse a otra URL.",
      en: "Universidad del Valle de Puebla had a support team answering the same procedure questions every day. Hours, documents, policy that was already written. That is L1 traffic: not academic advice, lookup. From February 2024 to June 2025 I was the AI developer of the assistant and, in parallel, a technical mentor to students. Sixteen months, not a hackathon.\n\nThe architecture is RAG, not a model asked to “be the university.” Ingest of knowledge bases and regulations into vectors. LangChain retrieves passages, conditions generation, and keeps the answer tied to those passages. If the index does not have the procedure, the bot must not invent a graduation date. The channel is 24/7 because students do not only ask at the window. What it does not resolve as L1 escalates: the bot is not the coordinator.\n\nThe 65% is the share of L1 the operator (me) saw close without escalation. I did not publish a ticket count or a UVP report. An evaluator should treat that figure as self-reported. What is on the employment record is the role, the dates, and that the assistant existed to cut repeated load, not to replace a coordinator. If UVP ever signs an attestation, it will go in sameAs. It is not invented in the JSON-LD today.\n\nI also mentored. That is not the product, but it is why the system is written so a student can keep the index: institutional documents change. A RAG that is not re-ingested is a rumor a month later. Mentoring and the bot borrowed the same rule: do not leave dead text in production.\n\nThis page is not a “what is RAG” tutorial. It is one university's system, with a name, a date range, and a percentage that states its method and its limits. Anyone looking for a LangChain course should leave this URL.",
    },
    related: ["ai-powered-job-matching-board", "smart-cfdi-billing-system"],
    tags: {
      es: ["LangChain", "RAG", "Vector DB", "Chatbots", "OpenAI"],
      en: ["LangChain", "RAG", "Vector DB", "Chatbots", "OpenAI"],
    },
    imageAlts: {
      es: [
        "Chat del asistente institucional respondiendo un trámite con cita al reglamento",
        "Vista de administración del índice de documentos de la UVP",
      ],
      en: [
        "Institutional assistant chat answering a procedure with a policy citation",
        "Admin view of the UVP document index",
      ],
    },
    images: ["/projects/rag-chatbot-1.webp", "/projects/rag-chatbot-2.webp"],
  },
  {
    id: "textile-erp",
    slug: "textile-production-erp",
    title: { es: "ERP de Producción Textil", en: "Textile Production ERP" },
    period: { start: "2025-10", end: "present" },
    updated: "2026-08-27",
    client: { es: "Towel S.A. de C.V.", en: "Towel S.A. de C.V." },
    role: { es: "Ingeniero de software, arquitectura e implementación", en: "Software engineer, architecture and implementation" },
    problem: {
      es: "Falta de trazabilidad en tiempo real en la línea de producción textil, causando cuellos de botella no detectados e inventarios desfasados.",
      en: "Lack of real-time traceability on the textile production line, causing undetected bottlenecks and outdated inventories.",
    },
    solution: {
      es: "Sistema de gestión integral (ERP) enfocado a la sección productiva, permitiendo control de piso, trazabilidad de materiales y optimización de estaciones.",
      en: "Comprehensive management system (ERP) focused on the production section, allowing shop floor control, material traceability, and station optimization.",
    },
    architecture: {
      es: "Aplicación React y PostgreSQL. El piso registra estaciones, materiales y avances. El esquema privilegia trazabilidad sobre un CRM genérico. El dashboard de gerencia lee el mismo almacén; no hay un segundo sistema “para reportes”.",
      en: "React application and PostgreSQL. The floor records stations, materials, and progress. The schema privileges traceability over a generic CRM. The management dashboard reads the same store; there is no second system “for reports.”",
    },
    impact: {
      es: "En Towel S.A. de C.V., la visibilidad del flujo de trabajo en planta mejoró alrededor del 40% y el uso de papel en piso casi desapareció, según el operador del ERP.",
      en: "At Towel S.A. de C.V., shop-floor workflow visibility improved by about 40% and paper use on the floor nearly disappeared, as reported by the ERP operator.",
    },
    measurement: {
      es: "Cifras reportadas por el ingeniero del ERP en Towel S.A. de C.V., oct 2025–presente. El 40% compara la visibilidad del flujo (estaciones y materiales visibles en el sistema frente a pizarras y hojas) antes y después del despliegue. La eliminación de papel es observación de planta, no un conteo publicado de hojas. Sin auditoría de terceros. No hay capturas en esta página: el sistema corre en piso y no se fotografió para el portafolio.",
      en: "Figures reported by the ERP engineer at Towel S.A. de C.V., Oct 2025–present. The 40% compares workflow visibility (stations and materials visible in the system versus boards and sheets) before and after deployment. Paper elimination is plant-floor observation, not a published sheet count. No third-party audit. No screenshots on this page: the system runs on the floor and was not photographed for the portfolio.",
    },
    faq: {
      q: {
        es: "¿Qué ve el piso textil en tiempo real que antes era papel?",
        en: "What does the textile floor see in real time that used to be paper?",
      },
      a: {
        es: "Estaciones, materiales y avance de la orden en un ERP React/PostgreSQL. El cuello de botella deja de vivir en una hoja que alguien actualiza al final del turno. La gerencia pregunta al mismo registro desde el dashboard.",
        en: "Stations, materials, and order progress in a React/PostgreSQL ERP. The bottleneck no longer lives on a sheet someone updates at the end of the shift. Management queries the same record from the dashboard.",
      },
    },
    body: {
      es: "El ERP es el trabajo actual. Towel S.A. de C.V., desde octubre de 2025. La planta no tenía trazabilidad en tiempo real: el cuello de botella se veía cuando ya había pasado, el inventario en sistema no coincidía con lo que había en piso, y el medio de registro era papel. Un ERP genérico de “todo el negocio” no era el pedido. El pedido era la sección productiva: estaciones, materiales, avance. Turno a turno, no un dashboard de gerencia que se actualiza de noche.\n\nConstruí la arquitectura y la implementación en React y PostgreSQL. El piso carga el estado. El esquema está hecho para seguir un lote, no para un CRM de clientes. El dashboard de inteligencia de negocio, en otra página de este sitio, lee este mismo almacén. Si las dos caras divergieran, la gerencia volvería a pedir un Excel y el piso volvería al papel. Esa es la única razón de existir del vínculo interno entre las dos URLs.\n\nEl 40% de visibilidad es la comparación que hice como operador entre “saber qué estación está bloqueada ahora” y “enterarse en la reunión de la tarde”. No es un KPI de un consultor. El papel casi desapareció porque el registro vive en el sistema; no conté resmas. Un reclutador que quiera prueba visual no la va a encontrar aquí: no inventé capturas. El sistema corre en una planta, con gente y máquinas, y no hay un staging público que fotografiar sin permiso. Si mañana hay fotos reales, se añaden. Hasta entonces la prosa carga el peso.\n\nSi esta es la primera página que abre un hiring manager, está bien. Es el empleo vigente, el almacén compartido con el dashboard, y un impacto que declara método y ausencia de screenshots en la misma respiración. El resto del portafolio se puede leer después.",
      en: "The ERP is the current job. Towel S.A. de C.V., from October 2025. The plant did not have real-time traceability: the bottleneck showed up after it had already happened, inventory in the system did not match the floor, and the recording medium was paper. A generic “whole business” ERP was not the request. The request was the production section: stations, materials, progress. Shift by shift, not a management dashboard that updates overnight.\n\nI owned architecture and implementation in React and PostgreSQL. The floor loads state. The schema is built to follow a lot, not to be a customer CRM. The business-intelligence dashboard, on another page of this site, reads this same store. If the two faces diverged, management would ask for a spreadsheet again and the floor would go back to paper. That is the only reason the internal link between the two URLs exists.\n\nThe 40% visibility figure is the comparison I made as operator between “knowing which station is blocked now” and “hearing about it in the afternoon meeting.” It is not a consultant KPI. Paper nearly disappeared because the record lives in the system; I did not count reams. A recruiter who wants visual proof will not find it here: I did not invent screenshots. The system runs in a plant, with people and machines, and there is no public staging environment to photograph without permission. If real photos exist later, they get added. Until then the prose carries the weight.\n\nIf this is the first page a hiring manager opens, that is fine. It is the current employment, the store shared with the dashboard, and an impact that states its method and the absence of screenshots in the same breath. The rest of the portfolio can wait.",
    },
    related: ["ai-business-intelligence-dashboard"],
    tags: {
      es: ["React", "PostgreSQL", "Arquitectura", "Gestión Industrial"],
      en: ["React", "PostgreSQL", "Architecture", "Industrial Management"],
    },
  },
  {
    id: "ltc-job-board-ai",
    slug: "ai-powered-job-matching-board",
    title: { es: "Bolsa de Trabajo con IA", en: "AI-Powered Job Matching Board" },
    period: { start: "2024", end: "2025" },
    updated: "2026-08-27",
    client: { es: "LTC", en: "LTC" },
    role: { es: "Ingeniero de software, matching y parseo de CVs", en: "Software engineer, matching and CV parsing" },
    problem: {
      es: "El equipo de reclutamiento invertía cientos de horas revisando CVs no estructurados para encontrar el perfil adecuado para vacantes técnicas.",
      en: "The recruitment team spent hundreds of hours reviewing unstructured CVs to find the right profile for technical vacancies.",
    },
    solution: {
      es: "Bolsa de trabajo inteligente (para LTC) que analiza y extrae datos de los CVs subidos, utilizando IA para hacer un match automático entre las habilidades del candidato y las vacantes abiertas.",
      en: "Smart job board (for LTC) that parses and extracts data from uploaded CVs, using AI to perform an automatic match between the candidate's skills and open vacancies.",
    },
    architecture: {
      es: "Front en Next.js. Un servicio Python de NLP parsea CVs no estructurados a un perfil. El matching puntúa habilidades contra vacantes. AWS hospeda el cómputo. El candidato postula sin rellenar el mismo formulario que el parser acaba de leer.",
      en: "Next.js front end. A Python NLP service parses unstructured CVs into a profile. Matching scores skills against vacancies. AWS hosts compute. The candidate applies without filling the same form the parser just read.",
    },
    impact: {
      es: "En la bolsa de LTC, el tiempo de filtrado inicial (screening) bajó alrededor del 75% cuando el parser y el matching sustituyeron la lectura lineal de CVs, según el operador.",
      en: "On LTC's job board, initial screening time fell by about 75% after parsing and matching replaced linear CV reading, as reported by the operator.",
    },
    measurement: {
      es: "Cifra reportada por el ingeniero del matching, sobre el flujo de screening inicial de LTC. El 75% compara lectura lineal de CVs no estructurados con el ranquin que produce el modelo. El año del encargo se registra como 2024–2025; no hay un mes de inicio en el expediente público. Sin auditoría de terceros.",
      en: "Figure reported by the matching engineer, on LTC's initial screening flow. The 75% compares linear reading of unstructured CVs with the ranking the model produces. The engagement is recorded as 2024–2025; there is no public start month. No third-party audit.",
    },
    faq: {
      q: {
        es: "¿Cómo se acorta el screening de CVs técnicos sin un formulario eterno?",
        en: "How do you shorten screening of technical CVs without an endless form?",
      },
      a: {
        es: "El candidato sube el CV. Un servicio Python extrae habilidades; un matching las puntúa contra vacantes abiertas en Next.js sobre AWS. El reclutador parte de un ranquin, no de una pila sin estructura.",
        en: "The candidate uploads the CV. A Python service extracts skills; matching scores them against open vacancies in Next.js on AWS. The recruiter starts from a ranking, not an unstructured pile.",
      },
    },
    body: {
      es: "LTC tenía un equipo leyendo CVs técnicos sin estructura. Cientos de horas de screening inicial: abrir PDF, buscar un stack, descartar. El candidato, del otro lado, volvía a teclear lo que el PDF ya decía. La bolsa que construí parsea el archivo, arma un perfil y puntúa el match contra vacantes abiertas. El candidato no rellena el mismo formulario que el parser acaba de leer.\n\nNext.js es la cara. Python hace el NLP. AWS hospeda. El matching no es un embedding mágico de “cultura”: es habilidades contra requisitos de una vacante técnica. Los PDF llegan sucios: columnas, tablas, encabezados. El parser falla en silencio peor que un humano; por eso el reclutador ve el ranquin y el archivo, no un veredicto. El 75% es el tiempo de filtrado inicial que el operador midió entre la pila lineal y el ranquin. No es tiempo-hasta-contratar, no es calidad de hire, y no hay un estudio de RR.HH. adjunto.\n\nLas fechas en el expediente público son 2024–2025, sin mes de inicio. Prefiero un año honesto a un mes inventado. LTC aparece en el copy original del portafolio como el destinatario del tablero; no es un empleo listado en la sección de experiencia de este sitio, y no lo disfrazo como tal. Quien busque Towel o UVP en esta página se equivocó de URL.\n\nRelación con el resto del record: el RAG de la UVP también es retrieve-and-rank sobre documentos. Aquí el documento es un CV y el índice es una vacante. No es el mismo producto. Es la misma negativa a hacer que un humano sea el parser. Las capturas son de esa bolsa, no de un template de job board genérico.",
      en: "LTC had a team reading unstructured technical CVs. Hundreds of hours of initial screening: open PDF, hunt for a stack, reject. On the other side, the candidate retyped what the PDF already said. The board I built parses the file, builds a profile, and scores the match against open vacancies. The candidate does not fill the same form the parser just read.\n\nNext.js is the face. Python does the NLP. AWS hosts. Matching is not a magical “culture” embedding. It is skills against a technical vacancy's requirements. PDFs arrive dirty: columns, tables, headers. A parser that fails silently is worse than a human, so the recruiter sees the ranking and the file, not a verdict. The 75% is initial screening time the operator measured between the linear pile and the ranking. It is not time-to-hire, not hire quality, and there is no HR study attached.\n\nPublic dates are 2024–2025, with no start month. I would rather publish an honest year than an invented month. LTC appears in the original portfolio copy as the board's recipient; it is not a listed job in this site's experience section, and I do not dress it as one. Anyone looking for Towel or UVP on this page has the wrong URL.\n\nRelation to the rest of the record: UVP's RAG is also retrieve-and-rank over documents. Here the document is a CV and the index is a vacancy. It is not the same product. It is the same refusal to make a human the parser. The screenshots are that board, not a generic job-board template.",
    },
    related: ["rag-institutional-assistant", "ai-business-intelligence-dashboard"],
    tags: {
      es: ["Next.js", "Python", "NLP", "Algoritmos de Match", "AWS"],
      en: ["Next.js", "Python", "NLP", "Matching Algorithms", "AWS"],
    },
    imageAlts: {
      es: [
        "Bolsa de trabajo: vacante técnica y ranquin de candidatos parseados",
        "Flujo de subida de CV y habilidades extraídas",
        "Detalle de match entre perfil del candidato y requisitos de la vacante",
      ],
      en: [
        "Job board: technical vacancy and ranking of parsed candidates",
        "CV upload flow and extracted skills",
        "Match detail between candidate profile and vacancy requirements",
      ],
    },
    images: [
      "/projects/ltc-job-board-1.webp",
      "/projects/ltc-job-board-2.webp",
      "/projects/ltc-job-board-3.webp",
    ],
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function relatedProjects(project: Project): Project[] {
  return project.related
    .map((slug) => projectBySlug(slug))
    .filter((item): item is Project => item !== undefined);
}
